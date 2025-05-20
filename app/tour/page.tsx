"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TourPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    numberOfChildren: "",
    additionalInfo: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="container py-12">
      <div className="flex items-center mb-6">
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Повернутися на головну
        </Link>
      </div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Запланувати екскурсію</h1>
        <p className="text-muted-foreground text-center mb-8">
          Запрошуємо вас відвідати наш дитячий садок "Калинонька" та познайомитися з нашими програмами, вчителями та
          приміщеннями
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Дитячий садок Калинонька"
                fill
                className="object-cover"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Про екскурсію</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Тривалість</p>
                    <p className="text-muted-foreground">Приблизно 45-60 хвилин</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Доступний час</p>
                    <p className="text-muted-foreground">Понеділок - П'ятниця: 10:00 - 15:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Адреса</p>
                    <p className="text-muted-foreground">вул. Навчальна 123, Київ, 01001</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {isSubmitted ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Дякуємо за запит!</CardTitle>
                  <CardDescription className="text-center">
                    Ми отримали ваш запит на екскурсію і зв'яжемося з вами найближчим часом для підтвердження дати та
                    часу.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Link href="/">
                    <Button>Повернутися на головну</Button>
                  </Link>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Запланувати екскурсію</CardTitle>
                  <CardDescription>Заповніть форму, щоб запланувати екскурсію</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ім'я</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Прізвище</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Електронна пошта</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Бажана дата</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Бажаний час</Label>
                        <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)}>
                          <SelectTrigger id="time">
                            <SelectValue placeholder="Виберіть час" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                            <SelectItem value="13:00">13:00</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                            <SelectItem value="15:00">15:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numberOfChildren">Кількість дітей</Label>
                      <Select
                        value={formData.numberOfChildren}
                        onValueChange={(value) => handleSelectChange("numberOfChildren", value)}
                      >
                        <SelectTrigger id="numberOfChildren">
                          <SelectValue placeholder="Виберіть кількість" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 дитина</SelectItem>
                          <SelectItem value="2">2 дитини</SelectItem>
                          <SelectItem value="3">3 дитини</SelectItem>
                          <SelectItem value="4+">4 або більше</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Додаткова інформація</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Будь-які особливі запити або питання"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Відправка..." : "Запланувати екскурсію"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
