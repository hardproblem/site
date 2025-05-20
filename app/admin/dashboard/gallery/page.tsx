"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  X,
  Loader2,
  Pencil,
  Filter,
  FolderPlus,
  RefreshCw,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatFileSize } from "@/lib/image-optimizer"
import type { GalleryImage, Category } from "@/types/gallery"
// Добавьте импорт компонента ValidateGallery
import { ValidateGallery } from "./validate"

// Создаем заглушку для категорий, если API не работает
const fallbackCategories: Category[] = [
  {
    id: "uncategorized",
    name: "Без категорії",
    description: "Зображення без категорії",
    createdAt: new Date().toISOString(),
  },
]

// Создаем заглушку для изображений, если API не работает
const fallbackImages: GalleryImage[] = [
  {
    id: "fallback-1",
    name: "Приклад зображення 1",
    description: "Це приклад зображення для демонстрації",
    category: "uncategorized",
    url: "/placeholder.svg?height=300&width=300&text=Приклад+1",
    size: 1024000,
    type: "image/jpeg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    name: "Приклад зображення 2",
    description: "Це приклад зображення для демонстрації",
    category: "uncategorized",
    url: "/placeholder.svg?height=300&width=300&text=Приклад+2",
    size: 1536000,
    type: "image/jpeg",
    createdAt: new Date().toISOString(),
  },
]

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [apiError, setApiError] = useState<boolean>(false)
  const [imagesApiError, setImagesApiError] = useState<boolean>(false)

  // Завантаження даних при першому рендері
  useEffect(() => {
    fetchGalleryData()
  }, [])

  // Завантаження даних при зміні категорії
  useEffect(() => {
    if (!apiError) {
      fetchGalleryData()
    }
  }, [selectedCategory, apiError])

  // Фільтрація зображень при зміні пошукового запиту
  useEffect(() => {
    filterImages()
  }, [searchQuery, images])

  const fetchGalleryData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Завантаження категорій
      console.log("Fetching categories...")
      let categoriesData

      try {
        const categoriesResponse = await fetch("/api/gallery/categories", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        })

        if (!categoriesResponse.ok) {
          console.error("Categories API returned error:", categoriesResponse.status, categoriesResponse.statusText)
          throw new Error(`API returned ${categoriesResponse.status}: ${categoriesResponse.statusText}`)
        }

        categoriesData = await categoriesResponse.json()
        console.log("Categories data:", categoriesData)

        if (!categoriesData || !categoriesData.categories) {
          console.error("Invalid categories data format:", categoriesData)
          throw new Error("Invalid categories data format")
        }

        setCategories(categoriesData.categories)
        setApiError(false)
      } catch (categoryError) {
        console.error("Error fetching categories:", categoryError)
        // Используем заглушку для категорий
        setCategories(fallbackCategories)
        setApiError(true)
        // Не выбрасываем ошибку дальше, чтобы продолжить загрузку изображений
      }

      // Завантаження зображень
      console.log("Fetching images...")
      try {
        const imagesResponse = await fetch(
          `/api/gallery${selectedCategory !== "all" ? `?category=${selectedCategory}` : ""}`,
          {
            cache: "no-store",
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          },
        )

        if (!imagesResponse.ok) {
          console.error("Images API returned error:", imagesResponse.status, imagesResponse.statusText)
          throw new Error(`API returned ${imagesResponse.status}: ${imagesResponse.statusText}`)
        }

        const imagesData = await imagesResponse.json()
        console.log("Images data:", imagesData)

        if (!imagesData || !imagesData.images) {
          console.error("Invalid images data format:", imagesData)
          throw new Error("Invalid images data format")
        }

        setImages(imagesData.images)
        setFilteredImages(imagesData.images)
        setImagesApiError(false)
      } catch (imagesError) {
        console.error("Error fetching images:", imagesError)
        // Используем заглушку для изображений
        setImages(fallbackImages)
        setFilteredImages(fallbackImages)
        setImagesApiError(true)
        toast({
          title: "Помилка завантаження зображень",
          description: "Використовуються демонстраційні зображення",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("General error in fetchGalleryData:", error)
      setError(error instanceof Error ? error.message : "Не вдалося завантажити дані галереї")
      toast({
        title: "Помилка завантаження",
        description: error instanceof Error ? error.message : "Не вдалося завантажити дані галереї",
        variant: "destructive",
      })
      // Инициализируем заглушками в случае ошибки
      setImages(fallbackImages)
      setFilteredImages(fallbackImages)
      setCategories(fallbackCategories)
    } finally {
      setIsLoading(false)
    }
  }

  const filterImages = () => {
    if (!images || images.length === 0) {
      setFilteredImages([])
      return
    }

    if (!searchQuery.trim()) {
      setFilteredImages(images)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = images.filter(
      (image) => image.name.toLowerCase().includes(query) || image.description.toLowerCase().includes(query),
    )
    setFilteredImages(filtered)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const files = Array.from(e.target.files)
    setSelectedFiles(files)

    // Створення URL для попереднього перегляду
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  const removePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeleteImage = async (id: string) => {
    // Проверяем, является ли изображение заглушкой
    if (id.startsWith("fallback-")) {
      toast({
        title: "Демонстраційний режим",
        description: "Видалення демонстраційних зображень недоступне",
        variant: "destructive",
      })
      return
    }

    if (confirm("Ви впевнені, що хочете видалити це зображення?")) {
      try {
        const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" })

        if (response.ok) {
          setImages((prevImages) => prevImages.filter((img) => img.id !== id))
          toast({
            title: "Зображення видалено",
            description: "Зображення було успішно видалено з галереї",
          })
        } else {
          const error = await response.json()
          throw new Error(error.error || "Помилка видалення зображення")
        }
      } catch (error) {
        console.error("Error deleting image:", error)
        toast({
          title: "Помилка видалення",
          description: error instanceof Error ? error.message : "Не вдалося видалити зображення",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Помилка",
        description: "Будь ласка, виберіть файли для завантаження",
        variant: "destructive",
      })
      return
    }

    // Проверяем, находимся ли мы в демонстрационном режиме
    if (imagesApiError) {
      toast({
        title: "Демонстраційний режим",
        description: "Завантаження зображень недоступне в демонстраційному режимі",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Создание FormData для отправки файлов
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("files", file)
      })
      formData.append("category", selectedCategory === "all" ? "uncategorized" : selectedCategory)
      formData.append("description", "") // Можно добавить поле для описания

      // Симуляция прогресса загрузки
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 5
        })
      }, 200)

      // Отправка на сервер
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.ok) {
        const data = await response.json()

        // Добавление новых изображений к галерее
        setImages((prev) => [...prev, ...(data.images || [])])

        // Очистка после загрузки
        setTimeout(() => {
          setIsUploading(false)
          setSelectedFiles([])
          setPreviews([])
          if (fileInputRef.current) fileInputRef.current.value = ""

          toast({
            title: "Завантаження завершено",
            description: `Успішно завантажено ${data.images ? data.images.length : 0} зображень у Vercel Blob Storage`,
          })
        }, 500)
      } else {
        const error = await response.json()
        throw new Error(error.error || "Помилка завантаження зображень")
      }
    } catch (error) {
      console.error("Error uploading images:", error)
      setIsUploading(false)
      toast({
        title: "Помилка завантаження",
        description: error instanceof Error ? error.message : "Не вдалося завантажити зображення",
        variant: "destructive",
      })
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Помилка",
        description: "Назва категорії обов'язкова",
        variant: "destructive",
      })
      return
    }

    // Проверяем, находимся ли мы в демонстрационном режиме
    if (apiError) {
      toast({
        title: "Демонстраційний режим",
        description: "Додавання категорій недоступне в демонстраційному режимі",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/gallery/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      })

      if (response.ok) {
        const data = await response.json()
        setCategories((prevCategories) => [...prevCategories, data.category])
        setNewCategory({ name: "", description: "" })
        setIsAddCategoryOpen(false)
        toast({
          title: "Категорію додано",
          description: `Категорію "${data.category.name}" успішно створено`,
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || "Помилка створення категорії")
      }
    } catch (error) {
      console.error("Error adding category:", error)
      toast({
        title: "Помилка створення категорії",
        description: error instanceof Error ? error.message : "Не вдалося створити категорію",
        variant: "destructive",
      })
    }
  }

  const handleUpdateImage = async () => {
    if (!editingImage) return

    // Проверяем, является ли изображение заглушкой
    if (editingImage.id.startsWith("fallback-")) {
      toast({
        title: "Демонстраційний режим",
        description: "Редагування демонстраційних зображень недоступне",
        variant: "destructive",
      })
      setIsEditDialogOpen(false)
      return
    }

    try {
      const response = await fetch(`/api/gallery/${editingImage.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingImage.name,
          description: editingImage.description,
          category: editingImage.category,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setImages((prevImages) => prevImages.map((img) => (img.id === editingImage.id ? data.image : img)))
        setIsEditDialogOpen(false)
        toast({
          title: "Зображення оновлено",
          description: "Метадані зображення успішно оновлено",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || "Помилка оновлення зображення")
      }
    } catch (error) {
      console.error("Error updating image:", error)
      toast({
        title: "Помилка оновлення",
        description: error instanceof Error ? error.message : "Не вдалося оновити зображення",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Керування галереєю</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={fetchGalleryData} title="Оновити">
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Додати зображення
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Завантажити зображення</DialogTitle>
                <DialogDescription>Виберіть зображення для завантаження в галерею</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="gallery-images">Виберіть зображення</Label>
                  <Input
                    id="gallery-images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={isUploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Категорія</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={isUploading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Виберіть категорію" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uncategorized">Без категорії</SelectItem>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {previews.length > 0 && (
                  <div className="space-y-2">
                    <Label>Попередній перегляд</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                          <Image
                            src={preview || "/placeholder.svg"}
                            alt={`Попередній перегляд ${index}`}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
                            }}
                          />
                          <button
                            className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white"
                            onClick={() => removePreview(index)}
                            disabled={isUploading}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Завантаження...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPreviews([])
                    setSelectedFiles([])
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                  disabled={isUploading}
                >
                  Скасувати
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading || selectedFiles.length === 0}
                  className="flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Завантаження...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Завантажити
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FolderPlus className="h-4 w-4" />
                Нова категорія
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Створити нову категорію</DialogTitle>
                <DialogDescription>Додайте нову категорію для організації зображень</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Назва категорії</Label>
                  <Input
                    id="category-name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Наприклад: Свята, Заняття, тощо"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-description">Опис (необов'язково)</Label>
                  <Textarea
                    id="category-description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Короткий опис категорії"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                  Скасувати
                </Button>
                <Button onClick={handleAddCategory}>Створити категорію</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {(apiError || imagesApiError) && (
        <div className="mb-6 p-4 border border-yellow-200 bg-yellow-50 rounded-md">
          <p className="text-yellow-800 font-medium">
            Увага: Виникли проблеми з завантаженням {apiError && "категорій"}
            {apiError && imagesApiError ? " та " : ""}
            {imagesApiError && "зображень"}.
          </p>
          <p className="text-yellow-700">Використовуються демонстраційні дані. Деякі функції можуть бути недоступні.</p>
          <Button variant="outline" className="mt-2" onClick={fetchGalleryData}>
            Спробувати знову
          </Button>
        </div>
      )}

      {/* Новий блок пошуку */}
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Пошук за назвою або описом..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Виберіть категорію" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Усі категорії</SelectItem>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Зображення галереї
            {searchQuery && (
              <span className="text-sm font-normal ml-2 text-muted-foreground">
                Результати пошуку: {filteredImages ? filteredImages.length : 0}
              </span>
            )}
          </h2>
          <TabsList>
            <TabsTrigger value="grid">Сітка</TabsTrigger>
            <TabsTrigger value="list">Список</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-destructive">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={fetchGalleryData}>
                Спробувати знову
              </Button>
            </div>
          ) : !filteredImages || filteredImages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? (
                <p>Немає зображень, що відповідають пошуковому запиту "{searchQuery}"</p>
              ) : (
                <p>Немає зображень у цій категорії</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <p className="text-white text-center px-2 font-medium">{image.name}</p>
                    <div className="flex gap-2">
                      <Dialog
                        open={isEditDialogOpen && editingImage?.id === image.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (open) setEditingImage(image)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="sm" className="flex items-center gap-1">
                            <Pencil className="h-3 w-3" />
                            Редагувати
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Редагувати зображення</DialogTitle>
                            <DialogDescription>Змініть метадані зображення</DialogDescription>
                          </DialogHeader>
                          {editingImage && (
                            <div className="grid gap-4 py-4">
                              <div className="relative aspect-video rounded-md overflow-hidden border mb-2">
                                <Image
                                  src={editingImage.url || "/placeholder.svg"}
                                  alt={editingImage.name}
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Назва</Label>
                                <Input
                                  id="edit-name"
                                  value={editingImage.name}
                                  onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-description">Опис</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingImage.description}
                                  onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-category">Категорія</Label>
                                <Select
                                  value={editingImage.category}
                                  onValueChange={(value) => setEditingImage({ ...editingImage, category: value })}
                                >
                                  <SelectTrigger id="edit-category">
                                    <SelectValue placeholder="Виберіть категорію" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="uncategorized">Без категорії</SelectItem>
                                    {categories &&
                                      categories.length > 0 &&
                                      categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Інформація про файл</Label>
                                <div className="text-sm text-muted-foreground">
                                  <p>Розмір: {formatFileSize(editingImage.size)}</p>
                                  <p>Тип: {editingImage.type}</p>
                                  <p>
                                    Додано:{" "}
                                    {new Date(editingImage.createdAt).toLocaleDateString("uk-UA", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Скасувати
                            </Button>
                            <Button onClick={handleUpdateImage}>Зберегти зміни</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                        Видалити
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-destructive">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={fetchGalleryData}>
                Спробувати знову
              </Button>
            </div>
          ) : !filteredImages || filteredImages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? (
                <p>Немає зображень, що відповідають пошуковому запиту "{searchQuery}"</p>
              ) : (
                <p>Немає зображень у цій категорії</p>
              )}
            </div>
          ) : (
            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                <div className="col-span-1">Фото</div>
                <div className="col-span-3">Назва</div>
                <div className="col-span-3">Опис</div>
                <div className="col-span-2">Категорія</div>
                <div className="col-span-1">Розмір</div>
                <div className="col-span-2">Дії</div>
              </div>
              {filteredImages.map((image) => (
                <div key={image.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                  <div className="col-span-1">
                    <div className="relative w-12 h-12 rounded overflow-hidden">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-3 truncate" title={image.name}>
                    {image.name}
                  </div>
                  <div className="col-span-3 truncate" title={image.description}>
                    {image.description || "—"}
                  </div>
                  <div className="col-span-2">
                    {categories && categories.length > 0
                      ? categories.find((c) => c.id === image.category)?.name || "Без категорії"
                      : "Без категорії"}
                  </div>
                  <div className="col-span-1">{formatFileSize(image.size)}</div>
                  <div className="col-span-2 flex gap-2">
                    <Dialog
                      open={isEditDialogOpen && editingImage?.id === image.id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open)
                        if (open) setEditingImage(image)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Pencil className="h-3 w-3" />
                          Редагувати
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Редагувати зображення</DialogTitle>
                          <DialogDescription>Змініть метадані зображення</DialogDescription>
                        </DialogHeader>
                        {editingImage && (
                          <div className="grid gap-4 py-4">
                            <div className="relative aspect-video rounded-md overflow-hidden border mb-2">
                              <Image
                                src={editingImage.url || "/placeholder.svg"}
                                alt={editingImage.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Назва</Label>
                              <Input
                                id="edit-name"
                                value={editingImage.name}
                                onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Опис</Label>
                              <Textarea
                                id="edit-description"
                                value={editingImage.description}
                                onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-category">Категорія</Label>
                              <Select
                                value={editingImage.category}
                                onValueChange={(value) => setEditingImage({ ...editingImage, category: value })}
                              >
                                <SelectTrigger id="edit-category">
                                  <SelectValue placeholder="Виберіть категорію" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="uncategorized">Без категорії</SelectItem>
                                  {categories &&
                                    categories.length > 0 &&
                                    categories.map((category) => (
                                      <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Інформація про файл</Label>
                              <div className="text-sm text-muted-foreground">
                                <p>Розмір: {formatFileSize(editingImage.size)}</p>
                                <p>Тип: {editingImage.type}</p>
                                <p>
                                  Додано:{" "}
                                  {new Date(editingImage.createdAt).toLocaleDateString("uk-UA", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Скасувати
                          </Button>
                          <Button onClick={handleUpdateImage}>Зберегти зміни</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      Видалити
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Керування категоріями</CardTitle>
            <CardDescription>Перегляд та редагування категорій для зображень</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!categories || categories.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Немає категорій</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {categories.map((category) => (
                    <Card key={category.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.description || "Без опису"}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCategory(category.id)}
                              className="flex items-center gap-1"
                            >
                              <Filter className="h-3 w-3" />
                              Фільтрувати
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsAddCategoryOpen(true)} className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              Додати категорію
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Добавьте этот блок */}
      <div className="mt-8">
        <ValidateGallery />
      </div>
    </div>
  )
}
