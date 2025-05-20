"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditSections() {
  // Початкові дані для демонстрації
  const [heroData, setHeroData] = useState({
    title: "Де навчання зустрічається з грою",
    description: "Виховуємо допитливі уми в безпечному, веселому та стимулюючому середовищі з 2005 року.",
    buttonText: "Записатися зараз",
    buttonText2: "Відвідати екскурсію",
  })

  const [aboutData, setAboutData] = useState({
    title: "Ласкаво просимо до Маленьких Дослідників",
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

  const handleSave = () => {
    // Тут буде логіка збереження даних на сервері
    alert("Зміни збережено успішно!")
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
          <h1 className="text-2xl font-bold">Редагування розділів</h1>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Зберегти зміни
        </Button>
      </div>

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
              <div className="space-y-2">
                <Label htmlFor="hero-image">Зображення банера</Label>
                <div className="flex items-center gap-4">
                  <Input id="hero-image" type="file" />
                  <Button variant="outline">Завантажити</Button>
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
            <CardContent>
              <p className="text-muted-foreground mb-4">Редагуйте секцію заклику до дії в нижній частині сторінки</p>

              {/* Тут буде форма для редагування CTA */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cta-title">Заголовок</Label>
                  <Input id="cta-title" defaultValue="Готові приєднатися до нашої родини?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-description">Опис</Label>
                  <Textarea
                    id="cta-description"
                    defaultValue="Запис на наступний навчальний рік вже відкрито. Забезпечте місце вашої дитини в нашій дбайливій навчальній спільноті."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
