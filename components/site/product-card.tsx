"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/lib/cart"
import { fmt, type Product } from "@/lib/catalog"

/* Карточка кликабельна целиком (Link-оверлей), кнопки корзины — поверх */
export function ProductCard({ product }: { product: Product }) {
  const { items, add, setOpen } = useCart()
  const qty = items[product.slug] ?? 0

  return (
    <Card className="relative gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`${product.name} — открыть карточку`}
      />
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 border bg-background"
        >
          {product.cat}
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col gap-1 px-3 pt-3">
        <h3 className="text-[0.95rem] leading-snug font-semibold">
          {product.name}
        </h3>
        {product.desc ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.desc}
          </p>
        ) : null}
        <p className="mt-auto pt-1 text-lg font-bold text-chart-2 tabular-nums">
          {fmt(product.price)}
        </p>
      </CardContent>
      <CardFooter className="px-3 pt-2 pb-3">
        {qty === 0 ? (
          <Button
            className="pointer-events-auto relative z-20 h-11 w-full rounded-full font-semibold"
            onClick={() => {
              add(product.slug)
              toast(`${product.name} — в корзине`)
            }}
          >
            <ShoppingBag data-icon="inline-start" />В корзину
          </Button>
        ) : (
          <div className="pointer-events-auto relative z-20 flex h-11 w-full items-center justify-between rounded-full bg-secondary p-1">
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-full"
              aria-label={`Убрать одну порцию «${product.name}»`}
              onClick={() => add(product.slug, -1)}
            >
              <Minus />
            </Button>
            <button
              type="button"
              className="font-bold tabular-nums"
              onClick={() => setOpen(true)}
              aria-label="Открыть корзину"
            >
              {qty}
            </button>
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-full"
              aria-label={`Добавить ещё одну порцию «${product.name}»`}
              onClick={() => add(product.slug)}
            >
              <Plus />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
