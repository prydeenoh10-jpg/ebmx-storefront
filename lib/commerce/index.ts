import { mockAPI } from './mock'
import type { CommerceAPI, GetProductsOptions } from './types'

function getAPI(): CommerceAPI {
  if (process.env.DATA_SOURCE === 'medusa') {
    // Use a dynamic import-equivalent via module resolution.
    // We re-export lazily so the Medusa adapter is only initialised in medusa mode.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { medusaAPI } = require('./medusa') as typeof import('./medusa')
    return medusaAPI
  }
  return mockAPI
}

export const getCollections = () => getAPI().getCollections()
export const getCollection = (handle: string) => getAPI().getCollection(handle)
export const getProducts = (opts?: GetProductsOptions) => getAPI().getProducts(opts)
export const getProduct = (handle: string) => getAPI().getProduct(handle)
export const searchProducts = (q: string) => getAPI().searchProducts(q)

export type { Product, Collection, GetProductsOptions } from './types'
