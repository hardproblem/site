"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AdminSectionsPage() {
  const [hero, setHero] = useState({
    title: "",
    description: "",
    imageUrl: "",
  })
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/sections")
      .then((res) => res.json())
      .then((data) => {
        if (data.hero) {
          setHero(data.hero)
        }
      })
  }, [])

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("section", "hero")

    setUploading(true)
    setUploadProgress(10)

    const res = await fetch("/api/sections/upload", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      const newHero = { ...hero, imageUrl: data.url }
      setHero(newHero)
      await saveHero(newHero)
      toast({ title: "Банер оновлено" })
    } else {
      toast({ title: "Помилка завантаження", variant: "destructive" })
    }

    setUploading(false)
    setUploadProgress(100)
  }

  const saveHero = async (heroData: typeof hero) => {
    const payload = {
      hero: heroData,
    }

    await fetch("/api/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Головний банер</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Головний банер</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                placeholder="Заголовок"
              />
              <Textarea
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                placeholder="Опис"
              />

              <div className="relative h-48 w-full border rounded-md overflow-hidden">
                <Image
                  src={hero.imageUrl || "/placeholder.svg?height=700&width=1400"}
                  alt="банер"
                  fill
                  className="object-cover"
                />
              </div>

              <Input type="file" ref={fileInputRef} />
              {uploading && <Progress value={uploadProgress} />}
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Завантаження..." : "Завантажити новий банер"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
