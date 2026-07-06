import type { Metadata } from 'next'
import CartPageClient from './CartPageClient'

export const metadata: Metadata = {
  title: 'Cart | EBMX',
  description: 'Review your cart and proceed to checkout.',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  return <CartPageClient />
}
