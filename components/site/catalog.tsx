"use client"

import * as React from "react"

import { ProductCard } from "@/components/site/product-card"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CATEGORIES, PRODUCTS, fmt } from "@/lib/catalog"
import { MIN_ORDER } from "@/lib/cart"

export function Catalog() {
  const [filter, setFilter] = React.useState<string>("Все")

  const cats = CATEGORIES.filter((c) => filter === "Все" || c === filter)

  return (
    <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl">Меню</h2>
        <Badge variant="secondary" className="rounded-full px-4 py-2 text-sm font-medium">
          Заказ от {fmt(MIN_ORDER)}
        </Badge>
      </div>

      <ToggleGroup
        value={[filter]}
        onValueChange={(v: string[]) => v[0] && setFilter(v[0])}
        className="mt-5 flex w-full flex-wrap justify-start gap-2 overflow-x-auto"
      >
        {["Все", ...CATEGORIES].map((c) => (
          <ToggleGroupItem
            key={c}
            value={c}
            className="h-11 shrink-0 rounded-full border px-4 data-[pressed]:border-primary data-[pressed]:bg-primary data-[pressed]:text-primary-foreground"
          >
            {c}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="flex flex-col gap-8 pt-6">
        {cats.map((cat) => {
          const list = PRODUCTS.filter((p) => p.cat === cat)
          if (list.length === 0) return null
          return (
            <div key={cat} className="flex flex-col gap-4">
              <h3 className="text-xl">{cat}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                {list.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
