// Симуляція бази даних для демонстрації
// В реальному додатку тут був би код для підключення до справжньої бази даних

import type { GalleryImage, Category } from "@/types/gallery"

// Початкові дані для демонстрації
let galleryImages: GalleryImage[] = [
  {
    id: "1",
    name: "Діти граються",
    description: "Діти граються в ігровій кімнаті",
    category: "activities",
    url: "/placeholder.svg?height=300&width=300&text=Фото+1",
    size: 1024000,
    type: "image/jpeg",
    createdAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Урок малювання",
    description: "Діти на уроці малювання",
    category: "activities",
    url: "/placeholder.svg?height=300&width=300&text=Фото+2",
    size: 1536000,
    type: "image/jpeg",
    createdAt: "2023-01-02T10:00:00Z",
  },
  {
    id: "3",
    name: "Ігровий майданчик",
    description: "Діти на ігровому майданчику",
    category: "facilities",
    url: "/placeholder.svg?height=300&width=300&text=Фото+3",
    size: 2048000,
    type: "image/jpeg",
    createdAt: "2023-01-03T10:00:00Z",
  },
  {
    id: "4",
    name: "Святкування дня народження",
    description: "Святкування дня народження в садочку",
    category: "events",
    url: "/placeholder.svg?height=300&width=300&text=Фото+4",
    size: 1843200,
    type: "image/jpeg",
    createdAt: "2023-01-04T10:00:00Z",
  },
  {
    id: "5",
    name: "Музичний урок",
    description: "Діти на музичному уроці",
    category: "activities",
    url: "/placeholder.svg?height=300&width=300&text=Фото+5",
    size: 1638400,
    type: "image/jpeg",
    createdAt: "2023-01-05T10:00:00Z",
  },
  {
    id: "6",
    name: "Їдальня",
    description: "Діти обідають в їдальні",
    category: "facilities",
    url: "/placeholder.svg?height=300&width=300&text=Фото+6",
    size: 1433600,
    type: "image/jpeg",
    createdAt: "2023-01-06T10:00:00Z",
  },
  {
    id: "7",
    name: "Новорічне свято",
    description: "Святкування Нового року",
    category: "events",
    url: "/placeholder.svg?height=300&width=300&text=Фото+7",
    size: 1945600,
    type: "image/jpeg",
    createdAt: "2023-01-07T10:00:00Z",
  },
  {
    id: "8",
    name: "Спортивні ігри",
    description: "Діти на спортивних іграх",
    category: "activities",
    url: "/placeholder.svg?height=300&width=300&text=Фото+8",
    size: 1740800,
    type: "image/jpeg",
    createdAt: "2023-01-08T10:00:00Z",
  },
]

let categories: Category[] = [
  {
    id: "activities",
    name: "Заняття",
    description: "Фотографії з різних занять",
    createdAt: "2023-01-01T09:00:00Z",
  },
  {
    id: "facilities",
    name: "Приміщення",
    description: "Фотографії приміщень та обладнання",
    createdAt: "2023-01-01T09:00:00Z",
  },
  {
    id: "events",
    name: "Події",
    description: "Фотографії з різних подій та свят",
    createdAt: "2023-01-01T09:00:00Z",
  },
]

// Симуляція операцій з базою даних
export const db = {
  gallery: {
    getAll: async (): Promise<GalleryImage[]> => {
      return [...galleryImages]
    },
    getById: async (id: string): Promise<GalleryImage | undefined> => {
      return galleryImages.find((image) => image.id === id)
    },
    create: async (image: Omit<GalleryImage, "id"> & { id: string }): Promise<GalleryImage> => {
      const newImage = { ...image }
      galleryImages.push(newImage)
      return newImage
    },
    update: async (id: string, data: Partial<GalleryImage>): Promise<GalleryImage> => {
      const index = galleryImages.findIndex((image) => image.id === id)
      if (index === -1) throw new Error("Image not found")

      const updatedImage = { ...galleryImages[index], ...data }
      galleryImages[index] = updatedImage
      return updatedImage
    },
    delete: async (id: string): Promise<void> => {
      galleryImages = galleryImages.filter((image) => image.id !== id)
    },
  },
  categories: {
    getAll: async (): Promise<Category[]> => {
      return [...categories]
    },
    getById: async (id: string): Promise<Category | undefined> => {
      return categories.find((category) => category.id === id)
    },
    create: async (category: Omit<Category, "id"> & { id: string }): Promise<Category> => {
      const newCategory = { ...category }
      categories.push(newCategory)
      return newCategory
    },
    update: async (id: string, data: Partial<Category>): Promise<Category> => {
      const index = categories.findIndex((category) => category.id === id)
      if (index === -1) throw new Error("Category not found")

      const updatedCategory = { ...categories[index], ...data }
      categories[index] = updatedCategory
      return updatedCategory
    },
    delete: async (id: string): Promise<void> => {
      categories = categories.filter((category) => category.id !== id)
    },
  },
}
