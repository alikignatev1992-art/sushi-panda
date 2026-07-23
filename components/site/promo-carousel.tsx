"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const PROMOS = [
  {
    badge: "Выгода 824 ₽",
    title: "Сет под солнцем",
    body: (
      <p className="flex flex-wrap items-center gap-3 text-sm font-medium">
        <span className="rounded-full bg-background px-4 py-1.5 text-base font-bold text-chart-3 tabular-nums">
          1399 ₽ <s className="font-normal text-muted-foreground">2223 ₽</s>
        </span>
        1370 г | 56 шт
      </p>
    ),
  },
  {
    badge: "0 ₽ за доставку",
    title: "Доставка — за наш счёт",
    body: <p className="text-sm font-medium">От 900 ₽ доставка бесплатна</p>,
  },
  {
    badge: "Подарки от 1700 ₽",
    title: "Подарки к заказу",
    body: (
      <p className="text-sm font-medium">
        От 1700 ₽ — один, от 2600 ₽ — два, от 3000 ₽ — три
      </p>
    ),
  },
]

export function PromoCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  /* Автопрокрутка уважает prefers-reduced-motion */
  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  )
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.current.stop()
    }
  }, [])

  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <section aria-label="Акции" className="mx-auto max-w-6xl px-4 pt-4">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        plugins={[autoplay.current]}
        className="group/promo"
      >
        <CarouselContent>
          {PROMOS.map((promo) => (
            <CarouselItem key={promo.title} className="md:basis-1/2">
              <div className="flex min-h-44 flex-col justify-center gap-2.5 rounded-3xl bg-gradient-to-br from-primary to-chart-2 p-6 text-primary-foreground">
                <Badge className="w-fit bg-foreground text-background">
                  {promo.badge}
                </Badge>
                <h2 className="text-2xl">{promo.title}</h2>
                {promo.body}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          aria-label="Предыдущая акция"
          className="left-2 size-11 opacity-0 transition-opacity group-hover/promo:opacity-100 focus-visible:opacity-100"
        />
        <CarouselNext
          aria-label="Следующая акция"
          className="right-2 size-11 opacity-0 transition-opacity group-hover/promo:opacity-100 focus-visible:opacity-100"
        />
      </Carousel>

      <div className="flex justify-center gap-2 pt-3" role="tablist" aria-label="Переключение акций">
        {PROMOS.map((promo, i) => (
          <button
            key={promo.title}
            type="button"
            role="tab"
            aria-selected={current === i}
            aria-label={`Акция ${i + 1}: ${promo.title}`}
            onClick={() => api?.scrollTo(i)}
            className="flex size-6 cursor-pointer items-center justify-center"
          >
            <span
              className={cn(
                "size-2.5 rounded-full transition-colors",
                current === i ? "bg-primary" : "bg-border"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
