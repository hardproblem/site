export interface GalleryImage {
  id: string
  name: string
  description: string
  category: string
  url: string
  size: number
  type: string
  createdAt: string
  optimized?: {
    thumbnail: string
    medium: string
    large: string
  }
}

export interface Category {
  id: string
  name: string
  description: string
  createdAt: string
}
