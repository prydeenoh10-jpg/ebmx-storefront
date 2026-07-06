import type { CommerceAPI, Product, Collection, GetProductsOptions } from './types'
import { CATALOG, type RawProduct } from '@/data/catalog-data'

function toHandle(id: number, name: string): string {
  const slug = name
    .replace(/[^\x20-\x7E]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64)
  return `${id}-${slug || 'product'}`
}

function toProduct(raw: RawProduct): Product {
  return {
    id: String(raw.id),
    handle: toHandle(raw.id, raw.name),
    name: raw.name,
    category: raw.cat,
    image: raw.img,
    price: raw.priceNum > 0 ? raw.priceNum : null,
    priceDisplay: raw.price ?? 'Price on request',
    wasPrice: raw.was ? parseFloat(raw.was.replace(/[^0-9.]/g, '')) : null,
    wasPriceDisplay: raw.was ?? null,
    inStock: raw.inStock,
    description: raw.short ?? '',
  }
}

export const mockAPI: CommerceAPI = {
  async getCollections(): Promise<Collection[]> {
    const counts = new Map<string, number>()
    for (const p of CATALOG) {
      counts.set(p.cat, (counts.get(p.cat) ?? 0) + 1)
    }
    return Array.from(counts.entries()).map(([name, count]) => ({
      handle: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      name,
      count,
    }))
  },

  async getCollection(handle: string): Promise<Collection | null> {
    const colls = await this.getCollections()
    return colls.find(c => c.handle === handle) ?? null
  },

  async getProducts(opts: GetProductsOptions = {}): Promise<Product[]> {
    let list = CATALOG.map(toProduct)

    if (opts.category) {
      list = list.filter(p => p.category === opts.category)
    }
    if (opts.inStock === true) {
      list = list.filter(p => p.inStock)
    }
    if (opts.search) {
      const q = opts.search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

    if (opts.sort === 'price-asc') {
      list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    } else if (opts.sort === 'price-desc') {
      list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    } else if (opts.sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    }

    if (opts.limit !== undefined) {
      list = list.slice(0, opts.limit)
    }

    return list
  },

  async getProduct(handle: string): Promise<Product | null> {
    const idStr = handle.split('-')[0]
    const id = parseInt(idStr, 10)
    if (isNaN(id)) return null
    const raw = CATALOG.find(p => p.id === id)
    return raw ? toProduct(raw) : null
  },

  async searchProducts(q: string): Promise<Product[]> {
    return this.getProducts({ search: q })
  },
}
