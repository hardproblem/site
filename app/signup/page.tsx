"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    program: "",
    startDate: "",
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

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Записатися до дитячого садка</h1>
        <p className="text-muted-foreground text-center mb-8">
          Заповніть форму нижче, щоб записати вашу дитину до дитячого садка "Калинонька"
        </p>

        {isSubmitted ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Дякуємо за заявку!</CardTitle>
              <CardDescription className="text-center">
                Ми отримали вашу заявку і зв'яжемося з вами найближчим часом для підтвердження запису.
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
              <CardTitle>Форма запису</CardTitle>
              <CardDescription>Будь ласка, заповніть всі необхідні поля</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ім'я батька/матері</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Прізвище батька/матері</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="childName">Ім'я дитини</Label>
                    <Input
                      id="childName"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childAge">Вік дитини</Label>
                    <Select value={formData.childAge} onValueChange={(value) => handleSelectChange("childAge", value)}>
                      <SelectTrigger id="childAge">
                        <SelectValue placeholder="Виберіть вік" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 роки</SelectItem>
                        <SelectItem value="3">3 роки</SelectItem>
                        <SelectItem value="4">4 роки</SelectItem>
                        <SelectItem value="5">5 років</SelectItem>
                        <SelectItem value="6">6 років</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Програма</Label>
                  <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)}>
                    <SelectTrigger id="program">
                      <SelectValue placeholder="Виберіть програму" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toddler">Програма для малюків (2-3 роки)</SelectItem>
                      <SelectItem value="preschool">Дошкільна програма (3-5 років)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Бажаний графік відвідування</Label>
                  <RadioGroup defaultValue="full">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full">Повний день (9:00-17:30)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="half" id="half" />
                      <Label htmlFor="half">Півдня (9:00-12:00)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Бажана дата початку</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Додаткова інформація</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Особливі потреби, алергії, побажання тощо"
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Відправка..." : "Відправити заявку"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
