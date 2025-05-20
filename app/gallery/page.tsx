import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/lib/db"
import type { Category } from "@/types/gallery"

// Компонент для відображення галереї на фронтенді сайту
export default function GalleryPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Галерея нашого дитячого садка</h1>

      <Suspense fallback={<div className="text-center py-12">Завантаження галереї...</div>}>
        <GalleryContent />
      </Suspense>
    </div>
  )
}

async function GalleryContent() {
  // Отримання категорій та зображень
  const categories = await db.categories.getAll()
  const images = await db.gallery.getAll()

  // Групування зображень за категоріями
  const imagesByCategory = categories.map((category) => {
    const categoryImages = images.filter((image) => image.category === category.id)
    return {
      category,
      images: categoryImages,
    }
  })

  // Додавання зображень без категорії
  const uncategorizedImages = images.filter((image) => !categories.some((category) => category.id === image.category))

  if (uncategorizedImages.length > 0) {
    imagesByCategory.push({
      category: { id: "uncategorized", name: "Інші фотографії", description: "", createdAt: "" } as Category,
      images: uncategorizedImages,
    })
  }

  return (
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
                  <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 text-white w-full">
                        <h3 className="font-medium">{image.name}</h3>
                        {image.description && <p className="text-sm text-white/80 line-clamp-2">{image.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
      )}

      <div className="text-center mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  )
}
