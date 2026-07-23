import { Star } from "lucide-react"

import { Catalog } from "@/components/site/catalog"
import { PromoCarousel } from "@/components/site/promo-carousel"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/* Отзывы — реальные, из VK-сообщества бренда (01-research/sushi-panda-vk) */
const REVIEWS = [
  {
    name: "Вероника",
    note: "заказ в мае",
    text: "Привезли роллы очень быстро! Роллы сочные, вкусные, большие, а качество и количество красной рыбы просто на высоте.",
  },
  {
    name: "Илина",
    note: "первый заказ",
    text: "Впервые попробовали с девочками ваши роллы и остались довольны: быстрая доставка, роллы настолько разнообразные и вкусные. Будем заказывать снова.",
  },
  {
    name: "Самат",
    note: "постоянный гость",
    text: "Доставили меньше чем за полчаса, роллы вкусные.",
  },
  {
    name: "Регина",
    note: "заказ в мае",
    text: "Очень вкусные роллы и быстрая доставка.",
  },
]

const FACTS = [
  {
    title: "Ежедневно с 11:00 до 0:00",
    text: "Доставляем по Стерлитамаку, самовывоз — Артёма 151",
  },
  {
    title: "Заказ от 700 ₽",
    text: "Бесплатная доставка по городу от 900 ₽ (кроме отдалённых районов)",
  },
  {
    title: "Оплата как удобно",
    text: "Наличными курьеру, картой курьеру или переводом на карту",
  },
]

export default function Home() {
  return (
    <main>
      {/* Промо — карусель с автопрокруткой */}
      <PromoCarousel />

      {/* Каталог */}
      <Catalog />

      {/* Доставка и оплата */}
      <section id="delivery" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
        <h2 className="text-3xl">Доставка и оплата</h2>
        <div className="grid gap-3 pt-5 md:grid-cols-3">
          {FACTS.map((f) => (
            <Card key={f.title} className="border-0 bg-muted shadow-none">
              <CardContent className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Отзывы */}
      <section id="reviews" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
        <h2 className="text-3xl">Отзывы гостей</h2>
        <div className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <Card key={r.name} className="border-0 bg-muted shadow-none">
              <CardContent className="flex h-full flex-col gap-3">
                <div className="flex gap-0.5 text-primary" role="img" aria-label="Оценка 5 из 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm">{r.text}</p>
                <div className="mt-auto flex items-center gap-3 pt-1">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                      {r.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-muted-foreground">{r.note}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
        <h2 className="text-3xl">Контакты</h2>
        <div className="grid gap-6 pt-5 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-chart-3">Адрес</p>
              <p>Стерлитамак, Артёма 151, вход через «Суши Панда» (здание Basconi)</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-chart-3">Режим работы</p>
              <p>Ежедневно с 11:00 до 0:00</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-chart-3">Телефон</p>
              <a
                href="tel:+79656416757"
                className="inline-block py-1 text-2xl font-semibold hover:text-chart-2"
              >
                +7 965 641-67-57
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                className="h-12 rounded-full px-6 font-semibold"
                nativeButton={false}
                render={
                  <a
                    href="https://wa.me/79656416757"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Написать в WhatsApp
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full px-6 font-semibold"
                nativeButton={false}
                render={
                  <a
                    href="https://vk.com/pandastr"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Мы во ВКонтакте
              </Button>
            </div>
          </div>
          <div className="flex min-h-60 flex-col items-center justify-center gap-2 rounded-3xl bg-muted p-6 text-center">
            <p className="font-semibold">Стерлитамак, Артёма 151</p>
            <p className="text-sm text-muted-foreground">
              вход через «Суши Панда», здание Basconi
            </p>
            <Button
              variant="link"
              nativeButton={false}
              render={
                <a
                  href="https://yandex.ru/maps/?text=%D0%A1%D1%82%D0%B5%D1%80%D0%BB%D0%B8%D1%82%D0%B0%D0%BC%D0%B0%D0%BA%2C%20%D0%90%D1%80%D1%82%D1%91%D0%BC%D0%B0%20151"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Показать на Яндекс.Картах
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
