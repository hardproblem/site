import type React from "react"
/**
 * Утилиты для работы с изображениями
 */

/**
 * Проверяет доступность изображения по URL
 * @param url URL изображения для проверки
 * @returns Promise<boolean> - true если изображение доступно, false если нет
 */
export async function checkImageExists(url: string): Promise<boolean> {
  // Не проверяем placeholder изображения
  if (url.includes("/placeholder.svg")) {
    return true
  }

  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error("Error checking image:", error)
    return false
  }
}

/**
 * Создает URL для placeholder изображения с текстом
 * @param text Текст для отображения на placeholder
 * @returns URL для placeholder изображения
 */
export function createPlaceholder(text = "Зображення недоступне"): string {
  return `/placeholder.svg?text=${encodeURIComponent(text)}`
}

/**
 * Обработчик ошибок загрузки изображений для компонента Image
 * @param event Событие ошибки
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>): void {
  event.currentTarget.src = createPlaceholder("Помилка завантаження")
}
