import fs from "fs"
import path from "path"
import { defaultSectionsData } from "./default-sections-data"

// Путь к файлу для хранения данных
const DATA_DIR = path.join(process.cwd(), "data")
const SECTIONS_FILE = path.join(DATA_DIR, "sections.json")

// Убедимся, что директория существует
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
} catch (error) {
  console.error("Error creating data directory:", error)
}

// Функция для чтения данных из файла
export function readSectionsDataFromFile() {
  try {
    if (fs.existsSync(SECTIONS_FILE)) {
      const data = fs.readFileSync(SECTIONS_FILE, "utf8")
      return JSON.parse(data)
    }
    // Если файл не существует, создаем его с начальными данными
    writeSectionsDataToFile(defaultSectionsData)
    return defaultSectionsData
  } catch (error) {
    console.error("Error reading sections data from file:", error)
    return defaultSectionsData
  }
}

// Функция для записи данных в файл
export function writeSectionsDataToFile(data: any) {
  try {
    fs.writeFileSync(SECTIONS_FILE, JSON.stringify(data, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error writing sections data to file:", error)
    return false
  }
}
