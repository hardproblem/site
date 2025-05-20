"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Save, Upload, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getSectionsData, setSectionsData } from "@/lib/client-storage"

export default function EditSections() {
  // Початкові дані для демонстрації
  const [heroData, setHeroData] = useState({
    title: "Де навчання зустрічається з грою",
    description: "Виховуємо допитливі уми в безпечному, веселому та стимулюючому середовищі з 2005 року.",
    buttonText: "Записатися зараз",
    buttonText2: "Відвідати екскурсію",
    imageUrl: "/placeholder.svg?height=700&width=1400",
  })

  const [aboutData, setAboutData] = useState({
    title: "Ласкаво просимо до Калиноньки",
    description: "Де потенціал кожної дитини розвивається через гру, дослідження та відкриття.",
    feature1Title: "Навчання, орієнтоване на дитину",
    feature1Desc:
      "Наша програма розроблена з урахуванням унікальних інтересів, здібностей та стилю навчання кожної дитини.",
    feature2Title: "Кваліфіковані педагоги",
    feature2Desc: "Наші вчителі — сертифіковані педагоги дошкільної освіти, які захоплені розвитком дітей.",
    feature3Title: "Безпечне середовище",
    feature3Desc:
      "Безпека — наш головний пріоритет із захищеними приміщеннями, регулярними навчаннями з безпеки та суворими протоколами здоров'я.",
  })

  const [ctaData, setCtaData] = useState({
    title: "Готові приєднатися до нашої родини?",
    description:
      "Запис на наступний навчальний рік вже відкрито. Забезпечте місце вашої дитини в нашій дбайливій навчальній спільноті.",
  })

  // Состояния для загрузки файлов
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Добавляем состояние загрузки
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Загрузка данных при первом рендере
  useEffect(() => {
    // Сначала пробуем загрузить из localStorage
    const localData = getSectionsData()
    if (localData.hero) setHeroData(localData.hero)
    if (localData.about) setAboutData(localData.about)
    if (localData.cta) setCtaData(localData.cta)

    // Затем пробуем загрузить с сервера
    fetchSectionsData()
  }, [])

  const fetchSectionsData = async () => {
    setIsLoading(true)
    try {
      // Используем уникальный параметр запроса для предотвращения кэширования
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/sections?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Loaded data from server:", data) // Добавляем логирование

        if (data.hero) {
          console.log("Setting hero data:", data.hero) // Логируем данные героя
          setHeroData(data.hero)
        }
        if (data.about) setAboutData(data.about)
        if (data.cta) setCtaData(data.cta)

        // Сохраняем данные в localStorage
        setSectionsData(data)
      } else {
        throw new Error("Failed to fetch sections data")
      }
    } catch (error) {
      console.error("Error fetching sections data:", error)
      toast({
        title: "Помилка завантаження",
        description: "Не вдалося завантажити дані розділів",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Сохраняем данные в localStorage
      const updatedData = {
        hero: heroData,
        about: aboutData,
        cta: ctaData,
      }

      setSectionsData(updatedData)

      // Отправляем данные на сервер
      const response = await fetch("/api/sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify(updatedData),
      })

      if (response.ok) {
        toast({
          title: "Зміни збережено",
          description: "Зміни успішно збережено! Оновіть головну сторінку, щоб побачити зміни.",
        })
      } else {
        // Если сервер вернул ошибку, но данные сохранены в localStorage
        toast({
          title: "Часткове збереження",
          description: "Зміни збережено локально, але не на сервері. Вони будуть доступні в цьому браузері.",
        })
      }
    } catch (error) {
      console.error("Помилка збереження:", error)

      // Проверяем, сохранились ли данные локально
      if (
        setSectionsData({
          hero: heroData,
          about: aboutData,
          cta: ctaData,
        })
      ) {
        toast({
          title: "Локальне збереження",
          description: "Зміни збережено локально, але не на сервері через помилку мережі.",
        })
      } else {
        toast({
          title: "Помилка збереження",
          description: error instanceof Error ? error.message : "Не вдалося зберегти зміни",
          variant: "destructive",
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  // После успешной загрузки добавьте кнопку для обновления страницы
  const handleRefreshPage = () => {
    fetchSectionsData() // Сначала загружаем данные с сервера
    toast({
      title: "Оновлення даних",
      description: "Дані оновлено з сервера",
    })
  }

  // Функция для открытия главной страницы в новой вкладке
  const openHomePage = () => {
    window.open("/", "_blank")
  }

  const handleUpload = async (section: string) => {
    if (!selectedFile) {
      toast({
        title: "Помилка",
        description: "Будь ласка, виберіть файл для завантаження",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Создание FormData для отправки файла
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("section", section)

      // Симуляция прогресса загрузки
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 5
        })
      }, 100)

      // Отправка на сервер
      const response = await fetch("/api/sections/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.ok) {
        const data = await response.json()
        console.log("Upload response:", data) // Добавляем логирование

        // Обновляем URL изображения в зависимости от раздела
        if (section === "hero") {
          const updatedHeroData = { ...heroData, imageUrl: data.url }
          console.log("Updating hero data with new image URL:", updatedHeroData) // Логируем обновленные данные
          setHeroData(updatedHeroData)

          // Сохраняем обновленные данные в localStorage
          const currentData = getSectionsData()
          setSectionsData({
            ...currentData,
            hero: updatedHeroData,
          })
        }

        // Очистка после загрузки
        setTimeout(() => {
          setIsUploading(false)
          setSelectedFile(null)
          if (fileInputRef.current) fileInputRef.current.value = ""

          toast({
            title: "Завантаження завершено",
            description: "Зображення успішно завантажено. Оновіть сторінку, щоб побачити зміни.",
          })

          // Загружаем данные с сервера после успешной загрузки
          fetchSectionsData()
        }, 500)
      } else {
        const error = await response.json()
        throw new Error(error.error || "Помилка завантаження зображення")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      setIsUploading(false)
      toast({
        title: "Помилка завантаження",
        description: error instanceof Error ? error.message : "Не вдалося завантажити зображення",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Редагування розділів</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefreshPage} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Оновити дані
          </Button>
          <Button onClick={openHomePage} variant="outline">
            Відкрити головну сторінку
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Збереження...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Зберегти зміни
              </>
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Завантаження даних...</span>
        </div>
      ) : (
        <Tabs defaultValue="hero">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="hero">Головний банер</TabsTrigger>
            <TabsTrigger value="about">Про нас</TabsTrigger>
            <TabsTrigger value="programs">Програми</TabsTrigger>
            <TabsTrigger value="cta">Заклик до дії</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Головний банер</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Заголовок</Label>
                  <Input
                    id="hero-title"
                    value={heroData.title}
                    onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-description">Опис</Label>
                  <Textarea
                    id="hero-description"
                    value={heroData.description}
                    onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="button1">Текст кнопки 1</Label>
                    <Input
                      id="button1"
                      value={heroData.buttonText}
                      onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="button2">Текст кнопки 2</Label>
                    <Input
                      id="button2"
                      value={heroData.buttonText2}
                      onChange={(e) => setHeroData({ ...heroData, buttonText2: e.target.value })}
                    />
                  </div>
                </div>

                {/* Предпросмотр текущего изображения */}
                <div className="space-y-2">
                  <Label>Поточне зображення</Label>
                  <div className="relative h-40 w-full overflow-hidden rounded-md border">
                    <Image
                      src={heroData.imageUrl || "/placeholder.svg?height=700&width=1400"}
                      alt="Зображення банера"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        console.error("Error loading image:", heroData.imageUrl)
                        e.currentTarget.src = "/placeholder.svg?text=Помилка+завантаження"
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground break-all">
                    URL: {heroData.imageUrl || "Не встановлено"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-image">Зображення банера</Label>
                  <div className="flex flex-col gap-4">
                    <Input
                      id="hero-image"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Завантаження...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => handleUpload("hero")}
                      disabled={isUploading || !selectedFile}
                      className="w-full md:w-auto"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Завантаження...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Завантажити
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Розділ "Про нас"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-title">Заголовок розділу</Label>
                  <Input
                    id="about-title"
                    value={aboutData.title}
                    onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-description">Опис розділу</Label>
                  <Textarea
                    id="about-description"
                    value={aboutData.description}
                    onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Особливості</h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="feature1-title">Особливість 1 - Заголовок</Label>
                      <Input
                        id="feature1-title"
                        value={aboutData.feature1Title}
                        onChange={(e) => setAboutData({ ...aboutData, feature1Title: e.target.value })}
                      />
                      <Label htmlFor="feature1-desc" className="mt-2">
                        Особливість 1 - Опис
                      </Label>
                      <Textarea
                        id="feature1-desc"
                        value={aboutData.feature1Desc}
                        onChange={(e) => setAboutData({ ...aboutData, feature1Desc: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feature2-title">Особливість 2 - Заголовок</Label>
                      <Input
                        id="feature2-title"
                        value={aboutData.feature2Title}
                        onChange={(e) => setAboutData({ ...aboutData, feature2Title: e.target.value })}
                      />
                      <Label htmlFor="feature2-desc" className="mt-2">
                        Особливість 2 - Опис
                      </Label>
                      <Textarea
                        id="feature2-desc"
                        value={aboutData.feature2Desc}
                        onChange={(e) => setAboutData({ ...aboutData, feature2Desc: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feature3-title">Особливість 3 - Заголовок</Label>
                      <Input
                        id="feature3-title"
                        value={aboutData.feature3Title}
                        onChange={(e) => setAboutData({ ...aboutData, feature3Title: e.target.value })}
                      />
                      <Label htmlFor="feature3-desc" className="mt-2">
                        Особливість 3 - Опис
                      </Label>
                      <Textarea
                        id="feature3-desc"
                        value={aboutData.feature3Desc}
                        onChange={(e) => setAboutData({ ...aboutData, feature3Desc: e.target.value })}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Програми</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Редагуйте інформацію про освітні програми</p>

                {/* Тут буде форма для редагування програм */}
                <div className="flex justify-center py-8">
                  <Button>Додати нову програму</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cta" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Заклик до дії</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cta-title">Заголовок</Label>
                  <Input
                    id="cta-title"
                    value={ctaData.title}
                    onChange={(e) => setCtaData({ ...ctaData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-description">Опис</Label>
                  <Textarea
                    id="cta-description"
                    value={ctaData.description}
                    onChange={(e) => setCtaData({ ...ctaData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
