import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">Маленькі Дослідники</span>
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
          <Button className="hidden md:flex">Записатися</Button>
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
              src="/placeholder.svg?height=700&width=1400"
              alt="Щасливі діти граються та навчаються"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex items-center">
              <div className="container">
                <div className="max-w-lg space-y-4 text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Де навчання зустрічається з грою</h1>
                  <p className="text-lg md:text-xl">
                    Виховуємо допитливі уми в безпечному, веселому та стимулюючому середовищі з 2005 року.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                      Записатися зараз
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                      Відвідати екскурсію
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pro-nas" className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ласкаво просимо до Маленьких Дослідників</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Де потенціал кожної дитини розвивається через гру, дослідження та відкриття.
              </p>
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
                  <h3 className="text-xl font-bold mb-2">Навчання, орієнтоване на дитину</h3>
                  <p className="text-muted-foreground">
                    Наша програма розроблена з урахуванням унікальних інтересів, здібностей та стилю навчання кожної
                    дитини.
                  </p>
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
                  <h3 className="text-xl font-bold mb-2">Кваліфіковані педагоги</h3>
                  <p className="text-muted-foreground">
                    Наші вчителі — сертифіковані педагоги дошкільної освіти, які захоплені розвитком дітей.
                  </p>
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
                  <h3 className="text-xl font-bold mb-2">Безпечне середовище</h3>
                  <p className="text-muted-foreground">
                    Безпека — наш головний пріоритет із захищеними приміщеннями, регулярними навчаннями з безпеки та
                    суворими протоколами здоров'я.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="programy" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Наші програми</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Комплексні освітні програми, розроблені для сприяння росту та розвитку на кожному етапі.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Програма для малюків"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Програма для малюків (2-3 роки)</h3>
                  <p className="text-muted-foreground mb-4">
                    Дбайливе знайомство зі шкільним життям, зосереджене на соціальних навичках, розвитку мови та
                    сенсорному дослідженні.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Південні заняття (9:00-12:00)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>2, 3 або 5 днів на тиждень</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Дошкільна програма"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Дошкільна програма (3-5 років)</h3>
                  <p className="text-muted-foreground mb-4">
                    Комплексна програма, яка готує дітей до дитячого садка, з акцентом на грамотність, лічбу та творче
                    самовираження.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Повний день (9:00-15:00) або південні варіанти</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>3 або 5 днів на тиждень</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="vchyteli" className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Познайомтеся з нашими вчителями</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Наші віддані педагоги щодня приносять досвід, пристрасть і творчість до класу.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=150&width=150"
                      alt="Пані Оксана"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Пані Оксана</h3>
                  <p className="text-primary font-medium mb-2">Головний вчитель</p>
                  <p className="text-muted-foreground">
                    З 10-річним досвідом дошкільної освіти, пані Оксана створює сприятливе середовище, де діти
                    процвітають.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=150&width=150" alt="Пан Тарас" fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">Пан Тарас</h3>
                  <p className="text-primary font-medium mb-2">Музика і рух</p>
                  <p className="text-muted-foreground">
                    Пан Тарас приносить музику, рух і радість у наші класи завдяки своєму досвіду в музичній освіті.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=150&width=150" alt="Пані Марія" fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">Пані Марія</h3>
                  <p className="text-primary font-medium mb-2">Спеціаліст з мистецтва</p>
                  <p className="text-muted-foreground">
                    Пані Марія заохочує творчість і самовираження через різні художні засоби та техніки.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="galereya" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Галерея нашого дитячого садка</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Зазирніть у наше яскраве навчальне середовище та радісні моменти, які ми створюємо щодня.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Фото+${item}`}
                    alt={`Фото галереї ${item}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakty" className="py-16 bg-primary/10">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Зв'яжіться з нами</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ми будемо раді почути від вас! Зв'яжіться з нами з будь-якими питаннями про наші програми або щоб
                запланувати екскурсію.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Зв'язатися</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Адреса</p>
                        <p className="text-muted-foreground">вул. Навчальна 123, Київ, 01001</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Телефон</p>
                        <p className="text-muted-foreground">(044) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Електронна пошта</p>
                        <p className="text-muted-foreground">info@malenkidoslidnyky.ua</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Години роботи</p>
                        <p className="text-muted-foreground">Понеділок - П'ятниця: 7:30 - 17:30</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Надіслати повідомлення</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          Ім'я
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Іван"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Прізвище
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Петренко"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Електронна пошта
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="ivan.petrenko@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Повідомлення
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Як ми можемо вам допомогти?"
                      />
                    </div>
                    <Button className="w-full">Надіслати повідомлення</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Готові приєднатися до нашої родини?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Запис на наступний навчальний рік вже відкрито. Забезпечте місце вашої дитини в нашій дбайливій навчальній
              спільноті.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Записатися зараз
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Запланувати екскурсію
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-primary">Маленькі Дослідники</span>
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
            <p>&copy; {new Date().getFullYear()} Маленькі Дослідники Дитячий садок. Усі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
