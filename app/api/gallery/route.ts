import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

// GET /api/gallery - отримати всі зображення
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

// POST /api/gallery - додати нове зображення
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
      // В реальному додатку тут був би код для завантаження файлу в хмарне сховище
      // const uploadResult = await uploadToStorage(file)

      // Симуляція завантаження
      const fileName = file.name
      const fileSize = file.size
      const fileType = file.type
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 9)
      const url = URL.createObjectURL(file) // В реальному додатку тут був би URL з хмарного сховища

      // Створення запису в базі даних
      const newImage = await db.gallery.create({
        id,
        name: fileName,
        description: description || "",
        category: category || "uncategorized",
        url,
        size: fileSize,
        type: fileType,
        createdAt: new Date().toISOString(),
      })

      uploadedImages.push(newImage)
    }

    revalidatePath("/admin/dashboard/gallery")
    return NextResponse.json({ images: uploadedImages }, { status: 201 })
  } catch (error) {
    console.error("Error uploading images:", error)
    return NextResponse.json({ error: "Failed to upload images" }, { status: 500 })
  }
}
