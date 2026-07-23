"use client"

import { Minus, Plus, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"

export function AddToCart({ slug, name }: { slug: string; name: string }) {
  const { items, add, setOpen } = useCart()
  const qty = items[slug] ?? 0

  if (qty === 0) {
    return (
      <Button
        className="h-12 w-full rounded-full font-semibold sm:w-72"
        onClick={() => {
          add(slug)
          toast(`${name} — в корзине`)
        }}
      >
        <ShoppingBag data-icon="inline-start" />В корзину
      </Button>
    )
  }

  return (
    <div className="flex w-full items-center gap-3 sm:w-72">
      <div className="flex h-12 flex-1 items-center justify-between rounded-full bg-secondary p-1">
        <Button
          variant="outline"
          size="icon-lg"
          className="size-10 rounded-full"
          aria-label={`Убрать одну порцию «${name}»`}
          onClick={() => add(slug, -1)}
        >
          <Minus />
        </Button>
        <span className="text-lg font-bold tabular-nums">{qty}</span>
        <Button
          variant="outline"
          size="icon-lg"
          className="size-10 rounded-full"
          aria-label={`Добавить ещё одну порцию «${name}»`}
          onClick={() => add(slug)}
        >
          <Plus />
        </Button>
      </div>
      <Button
        variant="secondary"
        className="h-12 rounded-full px-5 font-semibold"
        onClick={() => setOpen(true)}
      >
        Оформить
      </Button>
    </div>
  )
}
