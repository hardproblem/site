"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, Users, BookOpen, ImageIcon, Mail, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/admin")
  }

  return (
    <div className="flex min-h-screen bg-muted/50">
      {/* Бічна панель */}
      <div className="w-64 bg-background border-r p-4 hidden md:block">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary">Адмін-панель</h2>
          <p className="text-sm text-muted-foreground">Калинонька</p>
        </div>
        <nav className="space-y-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-primary font-medium"
          >
            <Home size={18} />
            <span>Головна</span>
          </Link>
          <Link href="/admin/dashboard/sections" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <BookOpen size={18} />
            <span>Розділи</span>
          </Link>
          <Link href="/admin/dashboard/teachers" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <Users size={18} />
            <span>Вчителі</span>
          </Link>
          <Link href="/admin/dashboard/gallery" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <ImageIcon size={18} />
            <span>Галерея</span>
          </Link>
          <Link href="/admin/dashboard/contacts" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <Mail size={18} />
            <span>Контакти</span>
          </Link>
          <Link href="/admin/dashboard/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <Settings size={18} />
            <span>Налаштування</span>
          </Link>
        </nav>
        <div className="absolute bottom-4">
          <Button variant="ghost" className="flex items-center gap-2" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Вийти</span>
          </Button>
        </div>
      </div>

      {/* Основний вміст */}
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Ласкаво просимо до адмін-панелі</h1>
          <p className="text-muted-foreground">Керуйте вмістом вашого сайту дитячого садка</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Розділи сайту</CardTitle>
              <CardDescription>Редагуйте основні розділи сайту</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/dashboard/sections">
                <Button className="w-full">Редагувати розділи</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Вчителі</CardTitle>
              <CardDescription>Керуйте інформацією про вчителів</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/dashboard/teachers">
                <Button className="w-full">Керувати вчителями</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Галерея</CardTitle>
              <CardDescription>Додавайте та видаляйте фотографії</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/dashboard/gallery">
                <Button className="w-full">Керувати галереєю</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Контактна інформація</CardTitle>
              <CardDescription>Оновіть контактні дані</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/dashboard/contacts">
                <Button className="w-full">Редагувати контакти</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Програми</CardTitle>
              <CardDescription>Керуйте освітніми програмами</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/dashboard/programs">
                <Button className="w-full">Редагувати програми</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Налаштування сайту</CardTitle>
              <CardDescription>Змініть загальні налаштування</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/dashboard/settings">
                <Button className="w-full">Налаштування</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
