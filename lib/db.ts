// Проверим, что файл существует и содержит правильные методы
import type { Category, GalleryImage } from "@/types/gallery"

// Временное хранилище данных в памяти
const inMemoryDb = {
  categories: [
    {
      id: "uncategorized",
      name: "Без категорії",
      description: "Зображення без категорії",
      createdAt: new Date().toISOString(),
    },
  ] as Category[],
  images: [] as GalleryImage[],
}

// Экспортируем объект базы данных с методами для работы с категориями и изображениями
export const db = {
  categories: {
    getAll: async () => {
      console.log("Getting all categories from in-memory DB")
      return inMemoryDb.categories
    },
    getById: async (id: string) => {
      return inMemoryDb.categories.find((category) => category.id === id)
    },
    create: async (category: Category) => {
      inMemoryDb.categories.push(category)
      return category
    },
    update: async (id: string, data: Partial<Category>) => {
      const index = inMemoryDb.categories.findIndex((category) => category.id === id)
      if (index === -1) return null
      inMemoryDb.categories[index] = { ...inMemoryDb.categories[index], ...data }
      return inMemoryDb.categories[index]
    },
    delete: async (id: string) => {
      const index = inMemoryDb.categories.findIndex((category) => category.id === id)
      if (index === -1) return false
      inMemoryDb.categories.splice(index, 1)
      return true
    },
  },
  images: {
    getAll: async (category?: string) => {
      if (category && category !== "all") {
        return inMemoryDb.images.filter((image) => image.category === category)
      }
      return inMemoryDb.images
    },
    getById: async (id: string) => {
      return inMemoryDb.images.find((image) => image.id === id)
    },
    create: async (image: GalleryImage) => {
      inMemoryDb.images.push(image)
      return image
    },
    createMany: async (images: GalleryImage[]) => {
      inMemoryDb.images.push(...images)
      return images
    },
    update: async (id: string, data: Partial<GalleryImage>) => {
      const index = inMemoryDb.images.findIndex((image) => image.id === id)
      if (index === -1) return null
      inMemoryDb.images[index] = { ...inMemoryDb.images[index], ...data }
      return inMemoryDb.images[index]
    },
    delete: async (id: string) => {
      const index = inMemoryDb.images.findIndex((image) => image.id === id)
      if (index === -1) return false
      inMemoryDb.images.splice(index, 1)
      return true
    },
    search: async (query: string) => {
      const lowerQuery = query.toLowerCase()
      return inMemoryDb.images.filter(
        (image) =>
          image.name.toLowerCase().includes(lowerQuery) || image.description.toLowerCase().includes(lowerQuery),
      )
    },
  },
}
