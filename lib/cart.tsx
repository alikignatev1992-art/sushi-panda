"use client"

import * as React from "react"

import { PRODUCTS } from "@/lib/catalog"

export const MIN_ORDER = 700
export const FREE_DELIVERY = 900

type CartState = Record<string, number> // slug -> qty

type CartContextValue = {
  items: CartState
  add: (slug: string, delta?: number) => void
  setQty: (slug: string, qty: number) => void
  clear: () => void
  count: number
  sum: number
  open: boolean
  setOpen: (open: boolean) => void
}

const CartContext = React.createContext<CartContextValue | null>(null)

const STORAGE_KEY = "sushi-panda-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartState>({})
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const add = React.useCallback((slug: string, delta = 1) => {
    setItems((prev) => {
      const next = { ...prev }
      const qty = (next[slug] ?? 0) + delta
      if (qty <= 0) delete next[slug]
      else next[slug] = qty
      return next
    })
  }, [])

  const setQty = React.useCallback((slug: string, qty: number) => {
    setItems((prev) => {
      const next = { ...prev }
      if (qty <= 0) delete next[slug]
      else next[slug] = qty
      return next
    })
  }, [])

  const clear = React.useCallback(() => setItems({}), [])

  const { count, sum } = React.useMemo(() => {
    let count = 0
    let sum = 0
    for (const [slug, qty] of Object.entries(items)) {
      const p = PRODUCTS.find((p) => p.slug === slug)
      if (!p) continue
      count += qty
      sum += p.price * qty
    }
    return { count, sum }
  }, [items])

  return (
    <CartContext.Provider
      value={{ items, add, setQty, clear, count, sum, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
