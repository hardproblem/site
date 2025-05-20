import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { deleteFromBlob } from "@/lib/blob-storage"

// GET /api/gallery/[id] - получить конкретное изображение
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const image = await db.gallery.getById(id)

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json({ image }, { status: 200 })
  } catch (error) {
    console.error("Error fetching image:", error)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}

// PATCH /api/gallery/[id] - обновить метаданные изображения
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    const image = await db.gallery.getById(id)
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    const updatedImage = await db.gallery.update(id, data)
    revalidatePath("/admin/dashboard/gallery")
    return NextResponse.json({ image: updatedImage }, { status: 200 })
  } catch (error) {
    console.error("Error updating image:", error)
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 })
  }
}

// DELETE /api/gallery/[id] - удалить изображение
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const image = await db.gallery.getById(id)

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Удаляем файл из Vercel Blob Storage
    if (image.url && !image.url.includes("/placeholder.svg")) {
      await deleteFromBlob(image.url)
    }

    await db.gallery.delete(id)
    revalidatePath("/admin/dashboard/gallery")
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
