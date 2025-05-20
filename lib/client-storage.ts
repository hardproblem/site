"use client"

import { defaultSectionsData } from "./default-sections-data"

// Ключи для localStorage
const SECTIONS_KEY = "kindergarten_sections_data"

// Функция для получения данных из localStorage
export function getSectionsData() {
  if (typeof window === "undefined") {
    return defaultSectionsData
  }

  try {
    const data = localStorage.getItem(SECTIONS_KEY)
    return data ? JSON.parse(data) : defaultSectionsData
  } catch (error) {
    console.error("Error reading sections data from localStorage:", error)
    return defaultSectionsData
  }
}

// Функция для сохранения данных в localStorage
export function setSectionsData(data: any) {
  if (typeof window === "undefined") {
    return false
  }

  try {
    localStorage.setItem(SECTIONS_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error writing sections data to localStorage:", error)
    return false
  }
}
