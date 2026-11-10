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

const SITE_URL = "https://sushipanda-str.ru"

/* Quiet-Type (DESIGN.md v2): один гротеск Onest на все роли */
const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Суши Панда — доставка суши и роллов в Стерлитамаке",
    template: "%s — Суши Панда",
  },
  description:
    "Суши Панда: доставка суши, роллов, сетов, пиццы и WOK в Стерлитамаке. Заказ от 700 ₽, бесплатная доставка от 900 ₽. Ежедневно 11:00–0:00.",
  keywords: [
    "суши Стерлитамак",
    "роллы Стерлитамак",
    "доставка суши Стерлитамак",
    "Суши Панда",
    "пицца и WOK Стерлитамак",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Суши Панда",
    title: "Суши Панда — доставка суши и роллов в Стерлитамаке",
    description:
      "Суши, роллы, сеты, пицца и WOK с доставкой по Стерлитамаку. Заказ от 700 ₽, бесплатно от 900 ₽.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Суши Панда — доставка по Стерлитамаку",
    description:
      "Суши, роллы, сеты, пицца и WOK с доставкой по Стерлитамаку.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo-96.png" },
}

const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Суши Панда",
  url: SITE_URL,
  telephone: "+7 965 641-67-57",
  servesCuisine: ["Japanese", "Sushi", "Pizza", "Wok"],
  priceRange: "₽₽",
  image: `${SITE_URL}/logo-96.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Артёма, 151",
    addressLocality: "Стерлитамак",
    addressRegion: "Республика Башкортостан",
    addressCountry: "RU",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "00:00",
  }],
  sameAs: ["https://vk.com/pandastr"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }}
        />
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
