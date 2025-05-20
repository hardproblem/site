import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

// GET /api/gallery/categories - отримати всі категорії
export async function GET() {
  try {
    const categories = await db.categories.getAll()
    return NextResponse.json({ categories }, { status: 200 })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

// POST /api/gallery/categories - створити нову категорію
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, description } = data

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }

    const newCategory = await db.categories.create({
      id: Date.now().toString(),
      name,
      description: description || "",
      createdAt: new Date().toISOString(),
    })

    revalidatePath("/admin/dashboard/gallery")
    return NextResponse.json({ category: newCategory }, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
