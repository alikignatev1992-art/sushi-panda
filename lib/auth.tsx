"use client"

import * as React from "react"

/* Демо-режим: аккаунты и заказы живут в localStorage браузера.
   Настоящая авторизация появится вместе с бэкендом. */

export type OrderItem = { slug: string; name: string; qty: number; price: number }

export type Order = {
  id: string
  date: string // ISO
  items: OrderItem[]
  sum: number
  mode: "delivery" | "pickup"
  address?: string
  pay: string
}

export type User = {
  name: string
  phone: string
  address?: string
}

type UserContextValue = {
  user: User | null
  register: (user: User) => void
  login: (phone: string) => boolean
  logout: () => void
  updateUser: (patch: Partial<User>) => void
  orders: Order[]
  addOrder: (order: Order) => void
}

const UserContext = React.createContext<UserContextValue | null>(null)

const USER_KEY = "sushi-panda-user"
const USERS_KEY = "sushi-panda-users"
const ORDERS_KEY = "sushi-panda-orders"

const normPhone = (phone: string) => phone.replace(/\D/g, "")

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [orders, setOrders] = React.useState<Order[]>([])

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY)
      if (raw) setUser(JSON.parse(raw))
      const rawOrders = localStorage.getItem(ORDERS_KEY)
      if (rawOrders) setOrders(JSON.parse(rawOrders))
    } catch {}
  }, [])

  const persistUser = (next: User | null) => {
    setUser(next)
    try {
      if (next) localStorage.setItem(USER_KEY, JSON.stringify(next))
      else localStorage.removeItem(USER_KEY)
    } catch {}
  }

  const register = React.useCallback((newUser: User) => {
    const cleaned = { ...newUser, phone: normPhone(newUser.phone) }
    persistUser(cleaned)
    try {
      const known: User[] = JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]")
      const rest = known.filter((u) => u.phone !== cleaned.phone)
      localStorage.setItem(USERS_KEY, JSON.stringify([...rest, cleaned]))
    } catch {}
  }, [])

  const login = React.useCallback((phone: string) => {
    try {
      const known: User[] = JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]")
      const found = known.find((u) => u.phone === normPhone(phone))
      if (found) {
        persistUser(found)
        return true
      }
    } catch {}
    return false
  }, [])

  const logout = React.useCallback(() => persistUser(null), [])

  const updateUser = React.useCallback(
    (patch: Partial<User>) => {
      if (!user) return
      const next = { ...user, ...patch }
      persistUser(next)
      try {
        const known: User[] = JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]")
        const rest = known.filter((u) => u.phone !== next.phone)
        localStorage.setItem(USERS_KEY, JSON.stringify([...rest, next]))
      } catch {}
    },
    [user]
  )

  const addOrder = React.useCallback((order: Order) => {
    setOrders((prev) => {
      const next = [order, ...prev]
      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  return (
    <UserContext.Provider
      value={{ user, register, login, logout, updateUser, orders, addOrder }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = React.useContext(UserContext)
  if (!ctx) throw new Error("useUser must be used within UserProvider")
  return ctx
}
