// Medusa v2 implementation of CommerceAPI — server-side product browsing.
// Used when DATA_SOURCE=medusa. Cart/auth are handled separately in lib/medusa/.

import type { CommerceAPI, Product, Collection, GetProductsOptions } from './types'
import { storeFetch } from '../medusa/config'

// --- Medusa response shape types ---

interface MPrice { amount: number; currency_code: string }
interface MVariant {
  id: string; title: string
  prices?: MPrice[]
  inventory_quantity?: number
  manage_inventory?: boolean
}
interface MCat { id: string; name: string; handle: string; products_count?: number }
interface MImage { url: string }
interface MProd {
  id: string; title: string; handle: string | null
  description: string | null; thumbnail: string | null; status: string
  variants?: MVariant[]; categories?: MCat[]; images?: MImage[]
}

// --- Mapping helpers ---

function audPrice(variants?: MVariant[]): number | null {
  if (!variants?.length) return null
  const prices = variants
    .flatMap(v => v.prices ?? [])
    .filter(p => p.currency_code === 'aud')
    .sort((a, b) => a.amount - b.amount)
  return prices.length ? prices[0].amount : null
}

function inStock(variants?: MVariant[]): boolean {
  if (!variants?.length) return true
  return variants.some(v => {
    if (!v.manage_inventory) return true
    // inventory_quantity is a computed field — if the API didn't return it, assume in stock
    if (v.inventory_quantity === undefined || v.inventory_quantity === null) return true
    return v.inventory_quantity > 0
  })
}

function fmtAud(n: number | null): string {
  if (n === null) return 'Price on request'
  return `A$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function toProduct(p: MProd): Product {
  const price = audPrice(p.variants)
  return {
    id: p.id,
    handle: p.handle ?? p.id,
    name: p.title,
    category: p.categories?.[0]?.name ?? 'Uncategorised',
    image: p.thumbnail ?? p.images?.[0]?.url ?? '',
    price,
    priceDisplay: fmtAud(price),
    wasPrice: null,
    wasPriceDisplay: null,
    inStock: inStock(p.variants),
    description: p.description ?? '',
  }
}

const FIELDS = 'handle,thumbnail,*images,*variants,*variants.prices,*categories,variants.inventory_quantity,variants.manage_inventory'

export const medusaAPI: CommerceAPI = {
  async getCollections(): Promise<Collection[]> {
    const { product_categories = [] } = await storeFetch<{ product_categories: MCat[] }>(
      '/store/product-categories?limit=100'
    )
    return product_categories.map(c => ({
      handle: c.handle,
      name: c.name,
      count: c.products_count ?? 0,
    }))
  },

  async getCollection(handle: string): Promise<Collection | null> {
    const { product_categories = [] } = await storeFetch<{ product_categories: MCat[] }>(
      `/store/product-categories?handle=${encodeURIComponent(handle)}`
    )
    const c = product_categories[0]
    if (!c) return null
    return { handle: c.handle, name: c.name, count: c.products_count ?? 0 }
  },

  async getProducts(opts: GetProductsOptions = {}): Promise<Product[]> {
    const params = new URLSearchParams({
      fields: FIELDS,
      limit: String(opts.limit ?? 250),
    })

    if (opts.search) params.set('q', opts.search)

    if (opts.category) {
      // Resolve category name → ID
      const { product_categories = [] } = await storeFetch<{ product_categories: MCat[] }>(
        '/store/product-categories?limit=200'
      )
      const match = product_categories.find(c => c.name === opts.category)
      if (match) params.append('category_id[]', match.id)
    }

    const { products = [] } = await storeFetch<{ products: MProd[] }>(
      `/store/products?${params.toString()}`
    )

    let list = products.map(toProduct)

    if (opts.inStock === true) list = list.filter(p => p.inStock)
    if (opts.sort === 'price-asc') list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    else if (opts.sort === 'price-desc') list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    else if (opts.sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))

    return list
  },

  async getProduct(handle: string): Promise<Product | null> {
    const params = new URLSearchParams({ handle, fields: FIELDS })
    const { products = [] } = await storeFetch<{ products: MProd[] }>(
      `/store/products?${params.toString()}`
    )
    if (products[0]) return toProduct(products[0])

    // Fallback: if the grid fell back to product ID (null handle), fetch by ID
    if (handle.startsWith('prod_')) {
      const idParams = new URLSearchParams({ fields: FIELDS })
      const res = await storeFetch<{ product: MProd }>(
        `/store/products/${handle}?${idParams.toString()}`
      ).catch(() => null)
      if (res?.product) return toProduct(res.product)
    }

    return null
  },

  async searchProducts(q: string): Promise<Product[]> {
    return this.getProducts({ search: q })
  },
}
