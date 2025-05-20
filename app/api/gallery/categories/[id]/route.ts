import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

// PATCH /api/gallery/categories/[id] - оновити категорію
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()
    const { name, description } = data

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }

    const category = await db.categories.getById(id)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const updatedCategory = await db.categories.update(id, { name, description })
    revalidatePath("/admin/dashboard/gallery")
    return NextResponse.json({ category: updatedCategory }, { status: 200 })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

// DELETE /api/gallery/categories/[id] - видалити категорію
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const category = await db.categories.getById(id)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Перевірка, чи є зображення в цій категорії
    const images = await db.gallery.getAll()
    const hasImages = images.some((image) => image.category === id)

    if (hasImages) {
      return NextResponse.json(
        { error: "Cannot delete category that contains images. Move or delete the images first." },
        { status: 400 },
      )
    }

    await db.categories.delete(id)
    revalidatePath("/admin/dashboard/gallery")
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
