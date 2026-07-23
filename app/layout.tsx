import type { Metadata } from "next"
import { Onest } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart"
import { UserProvider } from "@/lib/auth"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

/* Quiet-Type (DESIGN.md v2): один гротеск Onest на все роли */
const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Суши Панда — доставка суши и роллов в Стерлитамаке",
  description:
    "Суши Панда: доставка суши, роллов и сетов в Стерлитамаке. Готовим из охлаждённой рыбы каждый день. Минимальный заказ 700 ₽, бесплатная доставка от 900 ₽. Ежедневно 11:00–0:00.",
  icons: { icon: "/logo-96.png" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn("antialiased font-sans", onest.variable)}
      style={{ ["--font-heading" as string]: "var(--font-sans)" }}
    >
      <body>
        {/* White-Stage: тема всегда светлая */}
        <ThemeProvider forcedTheme="light">
          <UserProvider>
            <CartProvider>
              <SiteHeader />
              {children}
              <SiteFooter />
              <Toaster position="top-center" />
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
