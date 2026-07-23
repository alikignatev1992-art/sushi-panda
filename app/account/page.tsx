"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, LogOut, PackageOpen } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/lib/auth"
import { fmt } from "@/lib/catalog"

export default function AccountPage() {
  const { user } = useUser()

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <Button variant="ghost" className="h-11 rounded-full" nativeButton={false} render={<Link href="/" />}>
        <ArrowLeft data-icon="inline-start" />
        На главную
      </Button>
      <div className="pt-4">{user ? <Profile /> : <AuthForms />}</div>
    </main>
  )
}

function AuthForms() {
  const { register, login } = useUser()
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [loginPhone, setLoginPhone] = React.useState("")
  const [invalid, setInvalid] = React.useState(false)

  const doRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, "")
    if (!name.trim() || digits.length < 10) {
      setInvalid(true)
      toast("Укажите имя и телефон — по нему мы найдём ваши заказы")
      return
    }
    setInvalid(false)
    register({ name: name.trim(), phone: digits })
    toast.success(`Добро пожаловать, ${name.trim()}!`)
  }

  const doLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!login(loginPhone)) {
      toast("Не нашли аккаунт с таким телефоном. Зарегистрируйтесь — это быстро")
    }
  }

  return (
    <Tabs defaultValue="register">
      <TabsList className="w-full">
        <TabsTrigger value="register" className="h-10 flex-1">
          Регистрация
        </TabsTrigger>
        <TabsTrigger value="login" className="h-10 flex-1">
          Вход
        </TabsTrigger>
      </TabsList>

      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Регистрация</CardTitle>
            <CardDescription>
              Имя и телефон — этого достаточно. Адрес доставки сохраним после
              первого заказа.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={doRegister} noValidate>
              <FieldGroup>
                <Field data-invalid={invalid || undefined}>
                  <FieldLabel htmlFor="reg-name">Имя</FieldLabel>
                  <Input
                    id="reg-name"
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field data-invalid={invalid || undefined}>
                  <FieldLabel htmlFor="reg-phone">Телефон</FieldLabel>
                  <Input
                    id="reg-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+7 ___ ___-__-__"
                    value={phone}
                    aria-invalid={invalid || undefined}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11"
                  />
                  <FieldDescription>
                    Демо-режим: данные хранятся только в вашем браузере.
                  </FieldDescription>
                </Field>
                <Button type="submit" className="h-12 w-full rounded-full font-semibold">
                  Создать аккаунт
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Вход</CardTitle>
            <CardDescription>Введите телефон, который указывали при регистрации.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={doLogin} noValidate>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="login-phone">Телефон</FieldLabel>
                  <Input
                    id="login-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+7 ___ ___-__-__"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="h-11"
                  />
                </Field>
                <Button type="submit" className="h-12 w-full rounded-full font-semibold">
                  Войти
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function Profile() {
  const { user, logout, updateUser, orders } = useUser()
  const [address, setAddress] = React.useState(user?.address ?? "")

  if (!user) return null

  const saveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({ address: address.trim() || undefined })
    toast.success("Адрес сохранён")
  }

  const phonePretty = user.phone.replace(
    /^7?(\d{3})(\d{3})(\d{2})(\d{2})$/,
    "+7 $1 $2-$3-$4"
  )

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Здравствуйте, {user.name}!</CardTitle>
          <CardDescription>{phonePretty}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form onSubmit={saveAddress}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="acc-address">Адрес доставки</FieldLabel>
                <Input
                  id="acc-address"
                  autoComplete="street-address"
                  placeholder="Улица, дом, квартира, этаж, подъезд"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-11"
                />
                <FieldDescription>
                  Подставится в форму заказа автоматически.
                </FieldDescription>
              </Field>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" className="h-11 rounded-full px-6 font-semibold">
                  Сохранить
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-full px-6"
                  onClick={() => {
                    logout()
                    toast("Вы вышли из аккаунта")
                  }}
                >
                  <LogOut data-icon="inline-start" />
                  Выйти
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <section aria-label="История заказов" className="flex flex-col gap-3">
        <h2 className="text-2xl">История заказов</h2>
        {orders.length === 0 ? (
          <Empty className="border rounded-3xl">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageOpen />
              </EmptyMedia>
              <EmptyTitle>Заказов пока нет</EmptyTitle>
              <EmptyDescription>
                Первый заказ появится здесь сразу после оформления.
              </EmptyDescription>
            </EmptyHeader>
            <Button className="h-11 rounded-full px-6 font-semibold" nativeButton={false} render={<Link href="/#menu" />}>
              Смотреть меню
            </Button>
          </Empty>
        ) : (
          orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  Заказ от{" "}
                  {new Date(order.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardTitle>
                <CardDescription>
                  {order.mode === "delivery"
                    ? `Доставка: ${order.address}`
                    : "Самовывоз, Артёма 151"}{" "}
                  · {order.pay}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {order.items.map((it) => (
                  <p key={it.slug} className="flex justify-between text-sm">
                    <span>
                      {it.name} × {it.qty}
                    </span>
                    <span className="tabular-nums">{fmt(it.price * it.qty)}</span>
                  </p>
                ))}
                <Separator />
                <p className="flex justify-between font-bold">
                  <span>Итого</span>
                  <span className="text-chart-2 tabular-nums">{fmt(order.sum)}</span>
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  )
}
