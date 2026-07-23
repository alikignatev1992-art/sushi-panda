"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartSheet } from "@/components/site/cart-sheet"
import { useCart } from "@/lib/cart"
import { fmt } from "@/lib/catalog"

export function SiteHeader() {
  const { sum, setOpen } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2">
        <Link
          href="/"
          className="flex min-h-11 w-fit items-center gap-2.5"
          aria-label="Суши Панда — на главную"
        >
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="size-11"
          />
          <span className="hidden text-lg font-semibold sm:block">
            Суши <span className="text-primary">Панда</span>
          </span>
        </Link>

        <p className="hidden text-sm text-muted-foreground md:block">
          Доставка суши и роллов · Стерлитамак
        </p>
        <span className="md:hidden" />

        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="lg"
            className="rounded-full font-semibold tabular-nums"
            onClick={() => setOpen(true)}
            aria-label="Корзина заказа"
          >
            <ShoppingBag data-icon="inline-start" />
            {fmt(sum)}
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            className="rounded-full"
            nativeButton={false}
            render={<Link href="/account" aria-label="Личный кабинет" />}
          >
            <User />
          </Button>
        </div>
      </div>
      <CartSheet />
    </header>
  )
}
