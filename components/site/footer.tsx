import Image from "next/image"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 pb-28 md:grid-cols-[1.4fr_1fr_1fr] lg:pb-10">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex w-fit items-center gap-2.5"
            aria-label="Суши Панда — на главную"
          >
            <Image src="/logo.png" alt="" width={40} height={40} className="size-10" />
            <span className="text-lg font-semibold">
              Суши <span className="text-primary">Панда</span>
            </span>
          </Link>
          <p className="max-w-[34ch] text-sm text-muted-foreground">
            Доставка суши и роллов в Стерлитамаке. Готовим из охлаждённой рыбы
            каждый день.
          </p>
        </div>

        <nav aria-label="Разделы сайта" className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Разделы</h3>
          <Link className="w-fit py-1 text-sm text-muted-foreground hover:text-foreground" href="/#menu">
            Меню
          </Link>
          <Link className="w-fit py-1 text-sm text-muted-foreground hover:text-foreground" href="/#delivery">
            Доставка и оплата
          </Link>
          <Link className="w-fit py-1 text-sm text-muted-foreground hover:text-foreground" href="/#reviews">
            Отзывы
          </Link>
          <Link className="w-fit py-1 text-sm text-muted-foreground hover:text-foreground" href="/#contacts">
            Контакты
          </Link>
        </nav>

        <address className="flex flex-col gap-2 text-sm not-italic text-muted-foreground">
          <h3 className="text-sm font-semibold text-foreground">Связаться</h3>
          <a href="tel:+79656416757" className="w-fit py-1 font-semibold text-foreground">
            +7 965 641-67-57
          </a>
          <span>Стерлитамак, Артёма 151</span>
          <span>Ежедневно 11:00–0:00</span>
        </address>
      </div>
      <Separator />
      <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
        © Суши Панда, Стерлитамак
      </p>
    </footer>
  )
}
