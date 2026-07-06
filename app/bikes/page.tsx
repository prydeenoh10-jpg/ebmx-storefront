import type { Metadata } from 'next'
import { getProducts, getCollections } from '@/lib/commerce'
import ShopClient from '@/components/shop/ShopClient'

export const metadata: Metadata = {
  title: 'Shop Electric Dirt Bikes & Parts | EBMX Australia',
  description: 'Browse SurRon, Talaria, and electric dirt bike parts, modifications, and complete bikes. Australia\'s largest e-bike parts catalogue.',
}

export default async function BikesPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ])

  return <ShopClient initialProducts={products} collections={collections} />
}
