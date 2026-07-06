export interface Product {
  id: string
  handle: string
  name: string
  category: string
  image: string
  price: number | null
  priceDisplay: string
  wasPrice: number | null
  wasPriceDisplay: string | null
  inStock: boolean
  description: string
}

export interface Collection {
  handle: string
  name: string
  count: number
}

export interface GetProductsOptions {
  category?: string
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'name'
  inStock?: boolean
  search?: string
  limit?: number
}

export interface CommerceAPI {
  getCollections(): Promise<Collection[]>
  getCollection(handle: string): Promise<Collection | null>
  getProducts(opts?: GetProductsOptions): Promise<Product[]>
  getProduct(handle: string): Promise<Product | null>
  searchProducts(q: string): Promise<Product[]>
}
