import type { Metadata } from 'next'
import { Saira, Saira_Condensed, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/context/CartContext'
import { AuthProvider } from '@/lib/context/AuthContext'
import Marquee from '@/components/layout/Marquee'
import Header from '@/components/layout/Header'
import CartDrawer from '@/components/layout/CartDrawer'
import Footer from '@/components/layout/Footer'

const saira = Saira({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-saira',
  display: 'swap',
})

const sairaCondensed = Saira_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-saira-condensed',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Electric Dirt Bike Australia | SurRon E Bike & E Motorbike Specialists',
  description:
    "Australia's leading electric dirt bike store. Shop the SurRon e bike range, e motorbikes, custom builds and aftermarket upgrades — built, tuned and serviced in-house.",
  keywords: ['electric dirt bike', 'e motorbike', 'surron e bike', 'surron australia', 'surron top speed'],
  openGraph: {
    title: 'Electric Dirt Bike Australia | SurRon E Bike & E Motorbike Specialists',
    description:
      "Shop the SurRon e bike range, e motorbikes, custom builds and aftermarket upgrades — built, tuned and serviced in-house.",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${saira.variable} ${sairaCondensed.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <AuthProvider>
          <CartProvider>
            <Marquee />
            <Header />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
