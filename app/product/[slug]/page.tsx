import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { AddToCart } from "@/components/site/add-to-cart"
import { ProductCard } from "@/components/site/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PRODUCTS, bySlug, fmt } from "@/lib/catalog"

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = bySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — ${fmt(product.price)} · Суши Панда`,
    description: `${product.name}: заказать с доставкой по Стерлитамаку. ${product.desc ?? ""}`.trim(),
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = bySlug(slug)
  if (!product) notFound()

  const related = PRODUCTS.filter(
    (p) => p.cat === product.cat && p.slug !== product.slug
  ).slice(0, 4)

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <Button
        variant="ghost"
        className="h-11 rounded-full"
        nativeButton={false}
        render={<Link href="/#menu" />}
      >
        <ArrowLeft data-icon="inline-start" />
        На главную
      </Button>

      <div className="grid gap-6 pt-4 md:grid-cols-2 md:gap-10">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
          <Image
            src={product.img}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Badge variant="secondary" className="w-fit">
            {product.cat}
          </Badge>
          <h1 className="text-3xl md:text-4xl">{product.name}</h1>
          {product.desc ? (
            <p className="text-muted-foreground">{product.desc}</p>
          ) : (
            <p className="text-muted-foreground">
              Готовим из охлаждённой рыбы в день заказа. Состав уточняйте по
              телефону{" "}
              <a href="tel:+79656416757" className="font-medium text-foreground">
                +7 965 641-67-57
              </a>
              .
            </p>
          )}
          <p className="text-3xl font-bold text-chart-2 tabular-nums">
            {fmt(product.price)}
          </p>

          <AddToCart slug={product.slug} name={product.name} />

          <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
            Минимальный заказ — 700 ₽ · бесплатная доставка от 900 ₽ ·
            ежедневно 11:00–0:00
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-label="Похожие позиции" className="pt-12">
          <h2 className="text-2xl">Ещё из категории «{product.cat}»</h2>
          <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
