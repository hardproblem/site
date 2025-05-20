import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"
import type { GalleryImage } from "@/types/gallery"

// Функция для загрузки файла в Vercel Blob Storage
export async function uploadToBlob(file: File, pathname: string) {
  try {
    console.log(`Uploading file ${file.name} to Vercel Blob Storage...`)

    // Проверяем, что у нас есть токен для Vercel Blob
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not defined")
      throw new Error("BLOB_READ_WRITE_TOKEN is not defined")
    }

    // Загружаем файл в Vercel Blob Storage
    const blob = await put(pathname, file, {
      access: "public",
    })

    console.log(`File uploaded successfully: ${blob.url}`)
    return blob
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)

    // Возвращаем заглушку вместо ошибки
    return {
      url: `/placeholder.svg?height=300&width=300&text=Error+${file.name}`,
      pathname,
      contentType: file.type,
      contentDisposition: `inline; filename="${file.name}"`,
      size: file.size,
    }
  }
}

// Функция для преобразования Blob в объект GalleryImage
export function blobToGalleryImage(blob: any, name: string, description: string, category: string): GalleryImage {
  return {
    id: uuidv4(),
    name,
    description,
    category,
    url: blob.url,
    size: blob.size,
    type: blob.contentType,
    createdAt: new Date().toISOString(),
  }
}
