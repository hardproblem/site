"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import type { GalleryImage } from "@/types/gallery"

interface LightboxProps {
  images: GalleryImage[]
  initialIndex?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Lightbox({ images, initialIndex = 0, open, onOpenChange }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  // Скидання налаштувань при зміні зображення
  useEffect(() => {
    setZoom(1)
    setRotation(0)
  }, [currentIndex])

  // Скидання індексу при відкритті
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
    }
  }, [open, initialIndex])

  const currentImage = images[currentIndex]

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  // Обробка клавіатурних подій
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case "ArrowRight":
          goToNext()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "Escape":
          onOpenChange(false)
          break
        case "+":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
        case "r":
          handleRotate()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  if (!currentImage) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90 border-none">
        <div className="relative flex flex-col h-[90vh]">
          {/* Верхня панель з інформацією та кнопками */}
          <div className="flex items-center justify-between p-4 bg-black/50 text-white">
            <DialogTitle className="text-white">
              {currentImage.name} ({currentIndex + 1}/{images.length})
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleZoomOut} className="text-white hover:bg-white/20">
                <ZoomOut className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleZoomIn} className="text-white hover:bg-white/20">
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleRotate} className="text-white hover:bg-white/20">
                <RotateCw className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Основний контейнер для зображення */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div
              className="relative transition-transform duration-200 ease-in-out"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            >
              <Image
                src={currentImage.url || "/placeholder.svg"}
                alt={currentImage.name}
                width={1200}
                height={800}
                className="max-h-[70vh] w-auto object-contain"
                priority
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
                }}
              />
            </div>
          </div>

          {/* Опис зображення */}
          {currentImage.description && (
            <div className="p-4 bg-black/50 text-white">
              <p>{currentImage.description}</p>
            </div>
          )}

          {/* Кнопки навігації */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
