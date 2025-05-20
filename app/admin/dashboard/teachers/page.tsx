"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Типи для вчителів
type Teacher = {
  id: number
  name: string
  role: string
  bio: string
  image: string
}

export default function TeachersAdmin() {
  // Демо-дані для вчителів
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "Пані Оксана",
      role: "Головний вчитель",
      bio: "З 10-річним досвідом дошкільної освіти, пані Оксана створює сприятливе середовище, де діти процвітають.",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "Пан Тарас",
      role: "Музика і рух",
      bio: "Пан Тарас приносить музику, рух і радість у наші класи завдяки своєму досвіду в музичній освіті.",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "Пані Марія",
      role: "Спеціаліст з мистецтва",
      bio: "Пані Марія заохочує творчість і самовираження через різні художні засоби та техніки.",
      image: "/placeholder.svg?height=150&width=150",
    },
  ])

  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, "id">>({
    name: "",
    role: "",
    bio: "",
    image: "/placeholder.svg?height=150&width=150",
  })

  const handleAddTeacher = () => {
    const id = Math.max(0, ...teachers.map((t) => t.id)) + 1
    setTeachers([...teachers, { id, ...newTeacher }])
    setNewTeacher({
      name: "",
      role: "",
      bio: "",
      image: "/placeholder.svg?height=150&width=150",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditTeacher = () => {
    if (!editingTeacher) return

    setTeachers(teachers.map((teacher) => (teacher.id === editingTeacher.id ? editingTeacher : teacher)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteTeacher = (id: number) => {
    if (confirm("Ви впевнені, що хочете видалити цього вчителя?")) {
      setTeachers(teachers.filter((teacher) => teacher.id !== id))
    }
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
          <h1 className="text-2xl font-bold">Керування вчителями</h1>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Додати вчителя
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Додати нового вчителя</DialogTitle>
              <DialogDescription>Заповніть інформацію про нового вчителя нижче.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <Input
                  id="name"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder="Пані Оксана"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Посада</Label>
                <Input
                  id="role"
                  value={newTeacher.role}
                  onChange={(e) => setNewTeacher({ ...newTeacher, role: e.target.value })}
                  placeholder="Головний вчитель"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Біографія</Label>
                <Textarea
                  id="bio"
                  value={newTeacher.bio}
                  onChange={(e) => setNewTeacher({ ...newTeacher, bio: e.target.value })}
                  placeholder="Короткий опис вчителя..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Фото</Label>
                <Input id="image" type="file" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={handleAddTeacher}>Додати вчителя</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                  <Image src={teacher.image || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">{teacher.name}</h3>
                <p className="text-primary font-medium mb-2">{teacher.role}</p>
                <p className="text-muted-foreground mb-4">{teacher.bio}</p>

                <div className="flex gap-2 mt-2">
                  <Dialog
                    open={isEditDialogOpen && editingTeacher?.id === teacher.id}
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (open) setEditingTeacher(teacher)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Pencil className="h-3 w-3" />
                        Редагувати
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Редагувати вчителя</DialogTitle>
                        <DialogDescription>Змініть інформацію про вчителя.</DialogDescription>
                      </DialogHeader>

                      {editingTeacher && (
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Ім'я</Label>
                            <Input
                              id="edit-name"
                              value={editingTeacher.name}
                              onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-role">Посада</Label>
                            <Input
                              id="edit-role"
                              value={editingTeacher.role}
                              onChange={(e) => setEditingTeacher({ ...editingTeacher, role: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-bio">Біографія</Label>
                            <Textarea
                              id="edit-bio"
                              value={editingTeacher.bio}
                              onChange={(e) => setEditingTeacher({ ...editingTeacher, bio: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-image">Фото</Label>
                            <Input id="edit-image" type="file" />
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Скасувати
                        </Button>
                        <Button onClick={handleEditTeacher}>Зберегти зміни</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleDeleteTeacher(teacher.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    Видалити
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
