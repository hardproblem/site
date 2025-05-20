import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

// GET /api/gallery/categories - отримати всі категорії
export async function GET() {
  try {
    // Проверяем, существует ли метод getAll в db.categories
    if (!db || !db.categories || typeof db.categories.getAll !== "function") {
      console.error("DB or categories.getAll method is not available")
      // Возвращаем пустой массив категорий, чтобы избежать ошибок на клиенте
      return NextResponse.json({ categories: [] }, { status: 200 })
    }

    const categories = await db.categories.getAll()
    return NextResponse.json({ categories }, { status: 200 })
  } catch (error) {
    console.error("Error fetching categories:", error)
    // Возвращаем пустой массив категорий, чтобы избежать ошибок на клиенте
    return NextResponse.json({ categories: [] }, { status: 200 })
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

    // Проверяем, существует ли метод create в db.categories
    if (!db || !db.categories || typeof db.categories.create !== "function") {
      console.error("DB or categories.create method is not available")
      return NextResponse.json({ error: "Database error" }, { status: 500 })
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
