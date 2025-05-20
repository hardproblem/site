"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsAdmin() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Калинонька",
    siteDescription: "Дитячий садок",
    siteEmail: "info@kalynon.ua",
    sitePhone: "(044) 123-4567",
    siteAddress: "вул. Навчальна 123, Київ, 01001",
  })

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Калинонька - Дитячий садок",
    metaDescription: "Виховуємо допитливі уми в безпечному, веселому та стимулюючому середовищі з 2005 року.",
    ogImage: "/placeholder.svg?height=630&width=1200",
    keywords: "дитячий садок, дошкільна освіта, Калинонька, Київ, розвиток дітей",
  })

  const [featuresSettings, setFeaturesSettings] = useState({
    enableGallery: true,
    enableBlog: false,
    enableTestimonials: true,
    enableNewsletter: true,
  })

  const handleSave = () => {
    // Тут буде логіка збереження даних на сервері
    alert("Налаштування збережено успішно!")
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Налаштування сайту</h1>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Зберегти зміни
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Загальні</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="features">Функції</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Загальні налаштування</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Назва сайту</Label>
                <Input
                  id="site-name"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Опис сайту</Label>
                <Input
                  id="site-description"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-email">Електронна пошта</Label>
                <Input
                  id="site-email"
                  type="email"
                  value={generalSettings.siteEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-phone">Телефон</Label>
                <Input
                  id="site-phone"
                  value={generalSettings.sitePhone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, sitePhone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-address">Адреса</Label>
                <Input
                  id="site-address"
                  value={generalSettings.siteAddress}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteAddress: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO налаштування</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={seoSettings.metaTitle}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoSettings.metaDescription}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Ключові слова</Label>
                <Textarea
                  id="keywords"
                  value={seoSettings.keywords}
                  onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                  rows={2}
                  placeholder="Розділіть ключові слова комами"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-image">Open Graph зображення</Label>
                <div className="flex items-center gap-4">
                  <Input id="og-image" type="file" />
                  <Button variant="outline">Завантажити</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Функції сайту</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Галерея</h3>
                  <p className="text-sm text-muted-foreground">Увімкнути розділ галереї на сайті</p>
                </div>
                <Switch
                  checked={featuresSettings.enableGallery}
                  onCheckedChange={(checked) => setFeaturesSettings({ ...featuresSettings, enableGallery: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Блог</h3>
                  <p className="text-sm text-muted-foreground">Увімкнути розділ блогу на сайті</p>
                </div>
                <Switch
                  checked={featuresSettings.enableBlog}
                  onCheckedChange={(checked) => setFeaturesSettings({ ...featuresSettings, enableBlog: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Відгуки</h3>
                  <p className="text-sm text-muted-foreground">Увімкнути розділ відгуків на сайті</p>
                </div>
                <Switch
                  checked={featuresSettings.enableTestimonials}
                  onCheckedChange={(checked) =>
                    setFeaturesSettings({ ...featuresSettings, enableTestimonials: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Розсилка</h3>
                  <p className="text-sm text-muted-foreground">Увімкнути форму підписки на розсилку</p>
                </div>
                <Switch
                  checked={featuresSettings.enableNewsletter}
                  onCheckedChange={(checked) => setFeaturesSettings({ ...featuresSettings, enableNewsletter: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
