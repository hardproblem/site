import { type NextRequest, NextResponse } from "next/server"
import { checkBlobExists } from "@/lib/blob-storage"
import { db } from "@/lib/db"

/**
 * API-эндпоинт для проверки доступности изображений в галерее
 * GET /api/gallery/validate - проверяет все изображения
 * GET /api/gallery/validate?id=123 - проверяет конкретное изображение
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    // Если указан ID, проверяем только одно изображение
    if (id) {
      const image = await db.gallery.getById(id)
      if (!image) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 })
      }

      // Для placeholder изображений всегда возвращаем true
      const isValid = image.url.includes("/placeholder.svg") ? true : await checkBlobExists(image.url)

      return NextResponse.json(
        {
          id: image.id,
          url: image.url,
          isValid,
        },
        { status: 200 },
      )
    }

    // Иначе проверяем все изображения
    const images = await db.gallery.getAll()
    const results = await Promise.all(
      images.map(async (image) => {
        // Для placeholder изображений всегда возвращаем true
        const isValid = image.url.includes("/placeholder.svg") ? true : await checkBlobExists(image.url)

        return {
          id: image.id,
          url: image.url,
          isValid,
        }
      }),
    )

    // Статистика
    const validCount = results.filter((r) => r.isValid).length
    const invalidCount = results.length - validCount

    return NextResponse.json(
      {
        total: results.length,
        valid: validCount,
        invalid: invalidCount,
        results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error validating gallery images:", error)
    return NextResponse.json({ error: "Failed to validate gallery images" }, { status: 500 })
  }
}
