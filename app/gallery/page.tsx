"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2, AlertTriangle } from "lucide-react"
import { Lightbox } from "./lightbox"
import type { GalleryImage, Category } from "@/types/gallery"

// Обновим компонент для отображения изображений с обработкой ошибок
const ImageComponent = ({ image, onClick }: { image: GalleryImage; onClick: () => void }) => {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer" onClick={onClick}>
      {hasError ? (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4 text-center">
          <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
          <p className="text-sm text-gray-600">Помилка завантаження зображення</p>
        </div>
      ) : (
        <Image
          src={image.url || "/placeholder.svg"}
          alt={image.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            setHasError(true)
            e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
          }}
        />
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
        <div className="p-4 text-white w-full">
          <h3 className="font-medium">{image.name}</h3>
          {image.description && <p className="text-sm text-white/80 line-clamp-2">{image.description}</p>}
        </div>
      </div>
    </div>
  )
}

// Компонент для відображення галереї на фронтенді сайту
export default function GalleryPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Завантаження даних при першому рендері
  useEffect(() => {
    fetchGalleryData()
  }, [])

  // Фільтрація зображень при зміні категорії або пошукового запиту
  useEffect(() => {
    filterImages()
  }, [selectedCategory, searchQuery, images])

  const fetchGalleryData = async () => {
    setIsLoading(true)
    try {
      // Завантаження категорій
      const categoriesResponse = await fetch("/api/gallery/categories")
      const categoriesData = await categoriesResponse.json()
      setCategories(categoriesData.categories)

      // Завантаження зображень
      const imagesResponse = await fetch("/api/gallery")
      const imagesData = await imagesResponse.json()
      setImages(imagesData.images)
    } catch (error) {
      console.error("Error fetching gallery data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterImages = () => {
    let filtered = [...images]

    // Фільтрація за категорією
    if (selectedCategory !== "all") {
      filtered = filtered.filter((image) => image.category === selectedCategory)
    }

    // Фільтрація за пошуковим запитом
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (image) => image.name.toLowerCase().includes(query) || image.description.toLowerCase().includes(query),
      )
    }

    setFilteredImages(filtered)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Групування зображень за категоріями для відображення на вкладці "За категоріями"
  const imagesByCategory = categories.map((category) => {
    const categoryImages = filteredImages.filter((image) => image.category === category.id)
    return {
      category,
      images: categoryImages,
    }
  })

  // Додавання зображень без категорії
  const uncategorizedImages = filteredImages.filter(
    (image) => !categories.some((category) => category.id === image.category),
  )

  if (uncategorizedImages.length > 0) {
    imagesByCategory.push({
      category: { id: "uncategorized", name: "Інші фотографії", description: "", createdAt: "" } as Category,
      images: uncategorizedImages,
    })
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Галерея нашого дитячого садка</h1>

      {/* Пошук та фільтрація */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Пошук у галереї..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              Усі
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Немає зображень, що відповідають вашому запиту</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
          >
            Скинути фільтри
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="grid" className="mb-6">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="grid">Сітка</TabsTrigger>
              <TabsTrigger value="categories">За категоріями</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <ImageComponent key={image.id} image={image} onClick={() => openLightbox(index)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="space-y-12">
              {imagesByCategory.map(
                ({ category, images }) =>
                  images.length > 0 && (
                    <div key={category.id} className="space-y-4">
                      <div className="text-center">
                        <h2 className="text-2xl font-bold">{category.name}</h2>
                        {category.description && <p className="text-muted-foreground mt-2">{category.description}</p>}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                          <div
                            key={image.id}
                            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                            onClick={() => {
                              const indexInFiltered = filteredImages.findIndex((img) => img.id === image.id)
                              openLightbox(indexInFiltered)
                            }}
                          >
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                              <div className="p-4 text-white w-full">
                                <h3 className="font-medium">{image.name}</h3>
                                {image.description && (
                                  <p className="text-sm text-white/80 line-clamp-2">{image.description}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}

      <div className="text-center mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Повернутися на головну
        </Link>
      </div>

      {/* Лайтбокс для перегляду зображень */}
      <Lightbox
        images={filteredImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  )
}
