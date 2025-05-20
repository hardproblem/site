import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { defaultSectionsData } from "@/lib/default-sections-data"
import { readSectionsDataFromFile } from "@/lib/file-storage"

// Функция для получения данных разделов
async function getSectionsData() {
  try {
    // Сначала пробуем получить данные из файла
    const fileData = readSectionsDataFromFile()
    if (fileData) {
      return fileData
    }

    // Если не удалось получить данные из файла, пробуем получить через API
    const response = await fetch(`/api/sections`, {
      cache: "no-store",
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch sections data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching sections data:", error)
    // Возвращаем дефолтные данные в случае ошибки
    return defaultSectionsData
  }
}

export default async function Home() {
  // Получаем данные разделов
  const sectionsData = await getSectionsData()
  const { hero, about, cta } = sectionsData

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="/images/kalyna-icon.png" alt="Калинонька" fill className="object-contain" />
            </div>
            <span className="text-2xl font-bold text-primary">Калинонька</span>
            <span className="text-2xl font-bold">Дитячий садок</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#golovna" className="text-lg font-medium hover:text-primary transition-colors">
              Головна
            </Link>
            <Link href="#pro-nas" className="text-lg font-medium hover:text-primary transition-colors">
              Про нас
            </Link>
            <Link href="#programy" className="text-lg font-medium hover:text-primary transition-colors">
              Програми
            </Link>
            <Link href="#vchyteli" className="text-lg font-medium hover:text-primary transition-colors">
              Вчителі
            </Link>
            <Link href="#galereya" className="text-lg font-medium hover:text-primary transition-colors">
              Галерея
            </Link>
            <Link href="#kontakty" className="text-lg font-medium hover:text-primary transition-colors">
              Контакти
            </Link>
          </nav>
          <Link href="/signup">
            <Button className="hidden md:flex">Записатися</Button>
          </Link>
          <Button variant="outline" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Відкрити меню</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section id="golovna" className="relative">
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
            <Image
              src={hero.imageUrl || "/placeholder.svg?height=700&width=1400"}
              alt="Щасливі діти граються та навчаються"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex items-center">
              <div className="container">
                <div className="max-w-lg space-y-4 text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{hero.title}</h1>
                  <p className="text-lg md:text-xl">{hero.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/signup">
                      <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                        {hero.buttonText}
                      </Button>
                    </Link>
                    <Link href="/tour">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                        {hero.buttonText2}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pro-nas" className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{about.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{about.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                      <path d="M22 12A10 10 0 0 0 12 2v10z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{about.feature1Title}</h3>
                  <p className="text-muted-foreground">{about.feature1Desc}</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{about.feature2Title}</h3>
                  <p className="text-muted-foreground">{about.feature2Desc}</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                      <path d="M12 3v6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{about.feature3Title}</h3>
                  <p className="text-muted-foreground">{about.feature3Desc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Остальные секции остаются без изменений */}

        <section className="py-16 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{cta.title}</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">{cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Записатися зараз
                </Button>
              </Link>
              <Link href="/tour">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Запланувати екскурсію
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-6 h-6">
                  <Image src="/images/kalyna-icon.png" alt="Калинонька" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold text-primary">Калинонька</span>
                <span className="text-xl font-bold">Дитячий садок</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Виховуємо допитливі уми в безпечному, веселому та стимулюючому середовищі з 2005 року.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Швидкі посилання</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#golovna" className="text-muted-foreground hover:text-primary transition-colors">
                  Головна
                </Link>
                <Link href="#pro-nas" className="text-muted-foreground hover:text-primary transition-colors">
                  Про нас
                </Link>
                <Link href="#programy" className="text-muted-foreground hover:text-primary transition-colors">
                  Програми
                </Link>
                <Link href="#vchyteli" className="text-muted-foreground hover:text-primary transition-colors">
                  Вчителі
                </Link>
                <Link href="#galereya" className="text-muted-foreground hover:text-primary transition-colors">
                  Галерея
                </Link>
                <Link href="#kontakty" className="text-muted-foreground hover:text-primary transition-colors">
                  Контакти
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Розсилка</h3>
              <p className="text-muted-foreground mb-4">
                Підпишіться на нашу розсилку для отримання оновлень та порад для батьків.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Ваша електронна адреса"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="w-full">Підписатися</Button>
              </form>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Калинонька Дитячий садок. Усі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
