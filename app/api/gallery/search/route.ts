import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/gallery/search?query=текст&category=категорія
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const category = searchParams.get("category")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    let images = await db.gallery.getAll()

    // Фільтрація за категорією, якщо вказана
    if (category && category !== "all") {
      images = images.filter((image) => image.category === category)
    }

    // Пошук за назвою та описом
    const searchQuery = query.toLowerCase()
    const filteredImages = images.filter(
      (image) =>
        image.name.toLowerCase().includes(searchQuery) || image.description.toLowerCase().includes(searchQuery),
    )

    return NextResponse.json({ images: filteredImages }, { status: 200 })
  } catch (error) {
    console.error("Error searching gallery images:", error)
    return NextResponse.json({ error: "Failed to search gallery images" }, { status: 500 })
  }
}
