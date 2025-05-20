"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react"

interface ValidationResult {
  id: string
  url: string
  isValid: boolean
}

interface ValidationResponse {
  total: number
  valid: number
  invalid: number
  results: ValidationResult[]
}

// Обновим компонент для проверки доступности изображений
export function ValidateGallery() {
  const [isValidating, setIsValidating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<ValidationResponse | null>(null)

  const validateImages = async () => {
    setIsValidating(true)
    setProgress(0)

    try {
      // Имитация прогресса
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 5
        })
      }, 200)

      const response = await fetch("/api/gallery/validate")
      clearInterval(progressInterval)
      setProgress(100)

      if (response.ok) {
        const data = await response.json()
        setResults(data)

        if (data.invalid > 0) {
          toast({
            title: "Знайдено проблемні зображення",
            description: `${data.invalid} з ${data.total} зображень недоступні у Vercel Blob Storage`,
            variant: "destructive",
          })
        } else {
          toast({
            title: "Перевірка завершена",
            description: "Усі зображення доступні у Vercel Blob Storage",
          })
        }
      } else {
        throw new Error("Помилка перевірки зображень")
      }
    } catch (error) {
      console.error("Error validating images:", error)
      toast({
        title: "Помилка перевірки",
        description: "Не вдалося перевірити зображення галереї",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Перевірка зображень у Vercel Blob Storage</CardTitle>
        <CardDescription>Перевірте доступність усіх зображень у галереї</CardDescription>
      </CardHeader>
      <CardContent>
        {isValidating ? (
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Перевірка зображень у Vercel Blob Storage...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        ) : results ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Загальна кількість: {results.total}</p>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Доступні: {results.valid}</span>
                </div>
                {results.invalid > 0 && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Недоступні: {results.invalid}</span>
                  </div>
                )}
              </div>
              <Button onClick={validateImages} disabled={isValidating}>
                Перевірити знову
              </Button>
            </div>

            {results.invalid > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Проблемні зображення:</h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {results.results
                    .filter((result) => !result.isValid)
                    .map((result) => (
                      <div key={result.id} className="text-sm p-2 bg-red-50 rounded border border-red-200">
                        <p className="font-medium">ID: {result.id}</p>
                        <p className="text-xs truncate">{result.url}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              Запустіть перевірку, щоб виявити недоступні або пошкоджені зображення в Vercel Blob Storage
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={validateImages} disabled={isValidating} className="w-full">
          {isValidating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Перевірка...
            </>
          ) : (
            "Перевірити зображення"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
