"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Тип для программы
type Program = {
  id: number
  title: string
  description: string
  ageGroup: string
  schedule: string
  days: string
  image: string
}

export default function ProgramsAdmin() {
  // Демо-данные для программ
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: 1,
      title: "Програма для малюків (2-3 роки)",
      description:
        "Дбайливе знайомство зі шкільним життям, зосереджене на соціальних навичках, розвитку мови та сенсорному дослідженні.",
      ageGroup: "2-3 роки",
      schedule: "Південні заняття (9:00-12:00)",
      days: "2, 3 або 5 днів на тиждень",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      title: "Дошкільна програма (3-5 років)",
      description:
        "Комплексна програма, яка готує дітей до дитячого садка, з акцентом на грамотність, лічбу та творче самовираження.",
      ageGroup: "3-5 років",
      schedule: "Повний день (9:00-15:00) або південні варіанти",
      days: "3 або 5 днів на тиждень",
      image: "/placeholder.svg?height=300&width=500",
    },
  ])

  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newProgram, setNewProgram] = useState<Omit<Program, "id">>({
    title: "",
    description: "",
    ageGroup: "",
    schedule: "",
    days: "",
    image: "/placeholder.svg?height=300&width=500",
  })

  const handleAddProgram = () => {
    const id = Math.max(0, ...programs.map((p) => p.id)) + 1
    setPrograms([...programs, { id, ...newProgram }])
    setNewProgram({
      title: "",
      description: "",
      ageGroup: "",
      schedule: "",
      days: "",
      image: "/placeholder.svg?height=300&width=500",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditProgram = () => {
    if (!editingProgram) return

    setPrograms(programs.map((program) => (program.id === editingProgram.id ? editingProgram : program)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteProgram = (id: number) => {
    if (confirm("Ви впевнені, що хочете видалити цю програму?")) {
      setPrograms(programs.filter((program) => program.id !== id))
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
          <h1 className="text-2xl font-bold">Керування освітніми програмами</h1>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Додати програму
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Додати нову програму</DialogTitle>
              <DialogDescription>Заповніть інформацію про нову освітню програму.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Назва програми</Label>
                <Input
                  id="title"
                  value={newProgram.title}
                  onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                  placeholder="Програма для малюків"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Опис</Label>
                <Textarea
                  id="description"
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                  placeholder="Детальний опис програми..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ageGroup">Вікова група</Label>
                  <Input
                    id="ageGroup"
                    value={newProgram.ageGroup}
                    onChange={(e) => setNewProgram({ ...newProgram, ageGroup: e.target.value })}
                    placeholder="2-3 роки"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Розклад</Label>
                  <Input
                    id="schedule"
                    value={newProgram.schedule}
                    onChange={(e) => setNewProgram({ ...newProgram, schedule: e.target.value })}
                    placeholder="9:00-12:00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="days">Дні</Label>
                <Input
                  id="days"
                  value={newProgram.days}
                  onChange={(e) => setNewProgram({ ...newProgram, days: e.target.value })}
                  placeholder="2, 3 або 5 днів на тиждень"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Зображення</Label>
                <Input id="image" type="file" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={handleAddProgram}>Додати програму</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {programs.map((program) => (
          <Card key={program.id}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative h-48 md:h-full rounded-md overflow-hidden">
                  <Image src={program.image || "/placeholder.svg"} alt={program.title} fill className="object-cover" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{program.title}</h3>
                    <p className="text-muted-foreground mt-2">{program.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Вікова група</p>
                      <p className="text-muted-foreground">{program.ageGroup}</p>
                    </div>
                    <div>
                      <p className="font-medium">Розклад</p>
                      <p className="text-muted-foreground">{program.schedule}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Дні</p>
                    <p className="text-muted-foreground">{program.days}</p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Dialog
                      open={isEditDialogOpen && editingProgram?.id === program.id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open)
                        if (open) setEditingProgram(program)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-1">
                          <Pencil className="h-4 w-4" />
                          Редагувати
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Редагувати програму</DialogTitle>
                          <DialogDescription>Змініть інформацію про освітню програму.</DialogDescription>
                        </DialogHeader>

                        {editingProgram && (
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-title">Назва програми</Label>
                              <Input
                                id="edit-title"
                                value={editingProgram.title}
                                onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Опис</Label>
                              <Textarea
                                id="edit-description"
                                value={editingProgram.description}
                                onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-ageGroup">Вікова група</Label>
                                <Input
                                  id="edit-ageGroup"
                                  value={editingProgram.ageGroup}
                                  onChange={(e) => setEditingProgram({ ...editingProgram, ageGroup: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-schedule">Розклад</Label>
                                <Input
                                  id="edit-schedule"
                                  value={editingProgram.schedule}
                                  onChange={(e) => setEditingProgram({ ...editingProgram, schedule: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-days">Дні</Label>
                              <Input
                                id="edit-days"
                                value={editingProgram.days}
                                onChange={(e) => setEditingProgram({ ...editingProgram, days: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-image">Зображення</Label>
                              <Input id="edit-image" type="file" />
                            </div>
                          </div>
                        )}

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Скасувати
                          </Button>
                          <Button onClick={handleEditProgram}>Зберегти зміни</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="destructive"
                      className="flex items-center gap-1"
                      onClick={() => handleDeleteProgram(program.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Видалити
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
