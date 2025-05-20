import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { readSectionsDataFromFile, writeSectionsDataToFile } from "@/lib/file-storage"

// GET /api/sections - получить все разделы
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get("section")

    // Читаем данные из файла
    const sectionsData = readSectionsDataFromFile()
    console.log("Reading sections data from file:", sectionsData)

    if (section && section in sectionsData) {
      return NextResponse.json(
        { [section]: sectionsData[section as keyof typeof sectionsData] },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    return NextResponse.json(sectionsData, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error fetching sections data:", error)
    return NextResponse.json({ error: "Failed to fetch sections data" }, { status: 500 })
  }
}

// POST /api/sections - обновить разделы
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Received data to update:", data)

    // Читаем текущие данные из файла
    const currentData = readSectionsDataFromFile()

    // Обновляем данные
    const updatedData = { ...currentData, ...data }

    // Записываем обновленные данные в файл
    writeSectionsDataToFile(updatedData)
    console.log("Updated sections data in file:", updatedData)

    // Обновляем кеш для страниц с более агрессивной стратегией
    revalidatePath(`/admin/dashboard/sections`, "layout")
    revalidatePath(`/`, "layout")

    return NextResponse.json(
      { success: true, data: updatedData },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error updating sections:", error)
    return NextResponse.json({ error: "Failed to update sections" }, { status: 500 })
  }
}
