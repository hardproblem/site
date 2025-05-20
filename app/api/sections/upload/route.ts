import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { readSectionsDataFromFile, writeSectionsDataToFile } from "@/lib/file-storage"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const section = formData.get("section") as string

    if (!file || !section) {
      return NextResponse.json({ error: "File and section are required" }, { status: 400 })
    }

    // Создаем путь в формате 'sections/[section]/[имя_файла]'
    const fileName = file.name.replace(/\s+/g, "-").toLowerCase()
    const timestamp = Date.now()
    const pathname = `sections/${section}/${timestamp}-${fileName}`

    // Загружаем файл в Vercel Blob
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false, // Не добавляем случайный суффикс, так как мы уже добавили timestamp
    })

    console.log(`Uploaded image to ${blob.url}`)

    // Обновляем данные в файле
    if (section === "hero") {
      const sectionsData = readSectionsDataFromFile()
      if (!sectionsData.hero) {
        sectionsData.hero = {}
      }
      sectionsData.hero.imageUrl = blob.url
      writeSectionsDataToFile(sectionsData)
      console.log(`Updated hero.imageUrl to ${blob.url} in file storage`)
    }

    // Обновляем кеш для страниц с более агрессивной стратегией
    revalidatePath(`/admin/dashboard/sections`, "layout")
    revalidatePath(`/`, "layout") // Обновляем главную страницу тоже

    return NextResponse.json({ success: true, url: blob.url }, { status: 200 })
  } catch (error) {
    console.error("Error uploading section image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
