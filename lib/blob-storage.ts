import { put, del, list, head } from "@vercel/blob"
import type { PutBlobResult } from "@vercel/blob"
import type { GalleryImage } from "@/types/gallery"

/**
 * Загружает файл в Vercel Blob Storage
 * @param file Файл для загрузки
 * @param pathname Путь для сохранения (например, 'gallery/image.jpg')
 * @returns Promise с результатом загрузки
 */
export async function uploadToBlob(file: File, pathname: string): Promise<PutBlobResult> {
  try {
    // Создаем путь в формате 'gallery/[имя_файла]'
    const fullPathname = `gallery/${pathname}`

    // Загружаем файл в Vercel Blob
    const blob = await put(fullPathname, file, {
      access: "public",
      addRandomSuffix: true, // Добавляем случайный суффикс для уникальности
    })

    return blob
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)
    throw new Error("Failed to upload file to storage")
  }
}

/**
 * Удаляет файл из Vercel Blob Storage
 * @param url URL файла для удаления
 * @returns Promise с результатом удаления
 */
export async function deleteFromBlob(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting from Vercel Blob:", error)
    throw new Error("Failed to delete file from storage")
  }
}

/**
 * Получает список всех файлов в галерее
 * @returns Promise со списком файлов
 */
export async function listBlobFiles(prefix = "gallery/"): Promise<PutBlobResult[]> {
  try {
    const { blobs } = await list({ prefix })
    return blobs
  } catch (error) {
    console.error("Error listing Vercel Blob files:", error)
    throw new Error("Failed to list files from storage")
  }
}

/**
 * Проверяет существование файла в Vercel Blob
 * @param url URL файла для проверки
 * @returns Promise с результатом проверки
 */
export async function checkBlobExists(url: string): Promise<boolean> {
  try {
    const result = await head(url)
    return !!result
  } catch (error) {
    return false
  }
}

/**
 * Преобразует результат загрузки в Blob в объект GalleryImage
 */
export function blobToGalleryImage(
  blob: PutBlobResult,
  name: string,
  description: string,
  category: string,
): GalleryImage {
  return {
    id: blob.pathname.split("/").pop()?.split(".")[0] || blob.url,
    name,
    description,
    category,
    url: blob.url,
    size: blob.size,
    type: blob.contentType || "image/jpeg",
    createdAt: new Date().toISOString(),
  }
}
