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
  images: [] as GalleryImage[], // 🟡 вот массив изображений
}

// ✅ Добавьте этот блок внутрь export const db:
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
      const index = inMemoryDb.categories.findIndex((c) => c.id === id)
      if (index !== -1) {
        inMemoryDb.categories[index] = { ...inMemoryDb.categories[index], ...data }
      }
    },
    delete: async (id: string) => {
      const index = inMemoryDb.categories.findIndex((c) => c.id === id)
      if (index !== -1) {
        inMemoryDb.categories.splice(index, 1)
      }
    },
  },

  // 🔧 ДОБАВЬТЕ ЭТО:
  gallery: {
    getAll: async () => {
      console.log("Getting all gallery images from in-memory DB")
      return inMemoryDb.images
    },
    getById: async (id: string) => {
      return inMemoryDb.images.find((img) => img.id === id)
    },
    create: async (image: GalleryImage) => {
      inMemoryDb.images.push(image)
      return image
    },
    update: async (id: string, data: Partial<GalleryImage>) => {
      const index = inMemoryDb.images.findIndex((img) => img.id === id)
      if (index !== -1) {
        inMemoryDb.images[index] = { ...inMemoryDb.images[index], ...data }
      }
    },
    delete: async (id: string) => {
      const index = inMemoryDb.images.findIndex((img) => img.id === id)
      if (index !== -1) {
        inMemoryDb.images.splice(index, 1)
      }
    },
  },
}
