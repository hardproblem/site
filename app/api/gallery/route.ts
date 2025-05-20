import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { uploadToBlob, blobToGalleryImage } from "@/lib/blob-storage"

// GET /api/gallery - получить все изображения
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let images = await db.gallery.getAll()

    if (category && category !== "all") {
      images = images.filter((image) => image.category === category)
    }

    return NextResponse.json({ images }, { status: 200 })
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}

// POST /api/gallery - добавить новое изображение
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const category = formData.get("category") as string
    const description = formData.get("description") as string

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const uploadedImages = []

    for (const file of files) {
      // Генерируем уникальное имя файла
      const fileName = file.name.replace(/\s+/g, "-").toLowerCase()
      const timestamp = Date.now()
      const pathname = `${timestamp}-${fileName}`

      // Загружаем файл в Vercel Blob Storage
      const blob = await uploadToBlob(file, pathname)

      // Создаем запись в базе данных
      const galleryImage = blobToGalleryImage(blob, file.name, description || "", category || "uncategorized")

      const newImage = await db.gallery.create(galleryImage)
      uploadedImages.push(newImage)
    }

    revalidatePath("/admin/dashboard/gallery")
    return NextResponse.json({ images: uploadedImages }, { status: 201 })
  } catch (error) {
    console.error("Error uploading images:", error)
    return NextResponse.json({ error: "Failed to upload images" }, { status: 500 })
  }
}
