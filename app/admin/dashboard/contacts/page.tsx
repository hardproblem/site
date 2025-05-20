"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactsAdmin() {
  // Початкові дані для демонстрації
  const [contactData, setContactData] = useState({
    address: "вул. Навчальна 123, Київ, 01001",
    phone: "(044) 123-4567",
    email: "info@kalynon.ua",
    hours: "Понеділок - П'ятниця: 7:30 - 17:30",
  })

  const handleSave = () => {
    // Тут буде логіка збереження даних на сервері
    alert("Контактні дані збережено успішно!")
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
          <h1 className="text-2xl font-bold">Керування контактною інформацією</h1>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Зберегти зміни
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Контактна інформація</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Адреса</Label>
            <Input
              id="address"
              value={contactData.address}
              onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={contactData.phone}
              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Електронна пошта</Label>
            <Input
              id="email"
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Години роботи</Label>
            <Textarea
              id="hours"
              value={contactData.hours}
              onChange={(e) => setContactData({ ...contactData, hours: e.target.value })}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Налаштування форми зворотного зв'язку</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form-title">Заголовок форми</Label>
            <Input id="form-title" defaultValue="Надіслати повідомлення" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-button">Текст кнопки</Label>
            <Input id="form-button" defaultValue="Надіслати повідомлення" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-success">Повідомлення про успішне відправлення</Label>
            <Textarea
              id="form-success"
              defaultValue="Дякуємо за ваше повідомлення! Ми зв'яжемося з вами найближчим часом."
              rows={2}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="form-active" className="h-4 w-4 rounded border-gray-300" defaultChecked />
            <Label htmlFor="form-active">Форма активна</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
