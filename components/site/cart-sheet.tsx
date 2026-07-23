"use client"

import * as React from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useUser } from "@/lib/auth"
import { FREE_DELIVERY, MIN_ORDER, useCart } from "@/lib/cart"
import { bySlug, fmt } from "@/lib/catalog"

const PAY_OPTIONS = ["Наличными курьеру", "Картой курьеру", "Переводом на карту"]

export function CartSheet() {
  const { items, add, clear, sum, open, setOpen } = useCart()
  const { user, addOrder } = useUser()

  const [mode, setMode] = React.useState<"delivery" | "pickup">("delivery")
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [comment, setComment] = React.useState("")
  const [pay, setPay] = React.useState(PAY_OPTIONS[0])
  const [invalid, setInvalid] = React.useState<{ phone?: boolean; address?: boolean }>({})

  /* профиль подставляется в форму */
  React.useEffect(() => {
    if (user) {
      setName((v) => v || user.name)
      setPhone((v) => v || user.phone)
      setAddress((v) => v || user.address || "")
    }
  }, [user])

  const lines = Object.entries(items)
    .map(([slug, qty]) => ({ product: bySlug(slug), qty }))
    .filter((l) => l.product)

  const orderText = () =>
    [
      "Здравствуйте! Хочу заказать в Суши Панда:",
      "",
      ...lines.map((l) => `${l.product!.name} × ${l.qty} — ${fmt(l.product!.price * l.qty)}`),
      "",
      `Итого: ${fmt(sum)}`,
      `Получение: ${mode === "delivery" ? "доставка" : "самовывоз"}`,
      mode === "delivery" ? `Адрес: ${address || "—"}` : null,
      `Имя: ${name || "—"}`,
      `Телефон: ${phone || "—"}`,
      `Оплата: ${pay}`,
      comment ? `Комментарий: ${comment}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n")

  const validate = () => {
    if (sum < MIN_ORDER) {
      toast(`Минимальный заказ — ${fmt(MIN_ORDER)}. Добавьте ещё что-нибудь вкусное`)
      return false
    }
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 10) {
      setInvalid({ phone: true })
      toast("Укажите телефон, чтобы мы могли подтвердить заказ")
      return false
    }
    if (mode === "delivery" && !address.trim()) {
      setInvalid({ address: true })
      toast("Укажите адрес доставки")
      return false
    }
    setInvalid({})
    return true
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    addOrder({
      id: Math.random().toString(36).slice(2, 8),
      date: new Date().toISOString(),
      items: lines.map((l) => ({
        slug: l.product!.slug,
        name: l.product!.name,
        qty: l.qty,
        price: l.product!.price,
      })),
      sum,
      mode,
      address: mode === "delivery" ? address : undefined,
      pay,
    })
    clear()
    setOpen(false)
    toast.success("Заказ принят. Мы свяжемся с вами в течение 5 минут.")
  }

  const waHref = lines.length
    ? `https://wa.me/79656416757?text=${encodeURIComponent(orderText())}`
    : "https://wa.me/79656416757"

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Ваш заказ</SheetTitle>
          <SheetDescription>
            Минимальный заказ — {fmt(MIN_ORDER)} · бесплатная доставка от {fmt(FREE_DELIVERY)}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ShoppingBag />
              </EmptyMedia>
              <EmptyTitle>Корзина пока пустая</EmptyTitle>
              <EmptyDescription>
                Панда точит палочки — выбирайте, что по вкусу.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ScrollArea className="min-h-0 flex-1 px-4">
            <ul className="flex flex-col gap-3 py-2">
              {lines.map(({ product, qty }) => (
                <li key={product!.slug} className="flex items-center gap-3">
                  <Image
                    src={product!.img}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{product!.name}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {fmt(product!.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon-lg"
                      className="rounded-full"
                      aria-label={`Убрать одну порцию «${product!.name}»`}
                      onClick={() => add(product!.slug, -1)}
                    >
                      <Minus />
                    </Button>
                    <span className="w-6 text-center font-bold tabular-nums">{qty}</span>
                    <Button
                      variant="outline"
                      size="icon-lg"
                      className="rounded-full"
                      aria-label={`Добавить ещё одну порцию «${product!.name}»`}
                      onClick={() => add(product!.slug)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <Separator className="my-2" />
            <div className="flex items-baseline justify-between py-2">
              <span className="text-sm">Итого</span>
              <span className="text-xl font-bold text-chart-2 tabular-nums">{fmt(sum)}</span>
            </div>

            <form onSubmit={submit} noValidate className="pb-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="order-name">Имя</FieldLabel>
                  <Input
                    id="order-name"
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field data-invalid={invalid.phone || undefined}>
                  <FieldLabel htmlFor="order-phone">Телефон</FieldLabel>
                  <Input
                    id="order-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Ваш телефон"
                    value={phone}
                    aria-invalid={invalid.phone || undefined}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field>
                  <FieldLabel>Способ получения</FieldLabel>
                  <ToggleGroup
                    value={[mode]}
                    onValueChange={(v: string[]) =>
                      v[0] && setMode(v[0] as "delivery" | "pickup")
                    }
                    className="w-full"
                  >
                    <ToggleGroupItem value="delivery" className="h-11 flex-1">
                      Доставка
                    </ToggleGroupItem>
                    <ToggleGroupItem value="pickup" className="h-11 flex-1">
                      Самовывоз
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Field>
                {mode === "delivery" ? (
                  <Field data-invalid={invalid.address || undefined}>
                    <FieldLabel htmlFor="order-address">Адрес доставки</FieldLabel>
                    <Input
                      id="order-address"
                      autoComplete="street-address"
                      placeholder="Улица, дом, квартира, этаж, подъезд"
                      value={address}
                      aria-invalid={invalid.address || undefined}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-11"
                    />
                  </Field>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Самовывоз: Стерлитамак, Артёма 151 (здание Basconi)
                  </p>
                )}
                <Field>
                  <FieldLabel htmlFor="order-comment">Комментарий</FieldLabel>
                  <Textarea
                    id="order-comment"
                    placeholder="Комментарий к заказу (по желанию)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel>Оплата</FieldLabel>
                  <RadioGroup value={pay} onValueChange={(v) => setPay(String(v))}>
                    {PAY_OPTIONS.map((option) => (
                      <FieldLabel
                        key={option}
                        className="flex items-center gap-2 font-normal"
                      >
                        <RadioGroupItem value={option} />
                        {option}
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </Field>
                <Button type="submit" className="h-12 w-full rounded-full font-semibold">
                  Оформить заказ
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full font-semibold"
                  nativeButton={false}
                  render={
                    <a href={waHref} target="_blank" rel="noopener noreferrer" />
                  }
                >
                  Заказать в WhatsApp
                </Button>
              </FieldGroup>
            </form>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  )
}
