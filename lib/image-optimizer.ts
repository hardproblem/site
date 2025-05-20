// Симуляція оптимізації зображень
// В реальному додатку тут був би код для оптимізації зображень за допомогою бібліотек як sharp

export async function optimizeImage(file: File): Promise<{
  thumbnail: string
  medium: string
  large: string
}> {
  // Симуляція процесу оптимізації
  return new Promise((resolve) => {
    // Створення URL для симуляції різних розмірів
    const url = URL.createObjectURL(file)

    // В реальному додатку тут був би код для створення різних розмірів зображення
    // та оптимізації для різних пристроїв

    setTimeout(() => {
      resolve({
        thumbnail: url + "?width=150&height=150",
        medium: url + "?width=800&height=600",
        large: url + "?width=1920&height=1080",
      })
    }, 500)
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
