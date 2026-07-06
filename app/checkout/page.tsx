import type { Metadata } from 'next'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Checkout | EBMX',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
