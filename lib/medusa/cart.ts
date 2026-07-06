// Client-side Medusa v2 cart operations.
// Uses raw fetch against the Store API — no SDK version dependency.
// All functions are safe to call from 'use client' components.

import { BACKEND, storeHeaders } from './config'

// --- shared post helper (no-cache, always fresh) ---

async function post<T>(path: string, body?: unknown, authToken?: string): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    method: 'POST',
    headers: storeHeaders(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.text().catch(() => '')
    throw new Error(`POST ${path} → ${res.status}: ${err.slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

async function patch<T>(path: string, body?: unknown, authToken?: string): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    method: 'PATCH',
    headers: storeHeaders(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.text().catch(() => '')
    throw new Error(`PATCH ${path} → ${res.status}: ${err.slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

async function get<T>(path: string, authToken?: string): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    headers: storeHeaders(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

async function del<T>(path: string, authToken?: string): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    method: 'DELETE',
    headers: storeHeaders(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  })
  if (!res.ok) throw new Error(`DELETE ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

// --- Regions ---

export async function getAusRegionId(): Promise<string | null> {
  const { regions = [] } = await get<{ regions: { id: string; currency_code: string; name: string }[] }>(
    '/store/regions?limit=50'
  )
  const aus = regions.find(r => r.currency_code === 'aud' || r.name.toLowerCase().includes('australia'))
  return aus?.id ?? null
}

// --- Cart lifecycle ---

export async function createMedusaCart(regionId: string, email?: string, authToken?: string) {
  const { cart } = await post<{ cart: MedusaCart }>('/store/carts', {
    region_id: regionId,
    ...(email ? { email } : {}),
  }, authToken)
  return cart
}

export async function getMedusaCart(cartId: string) {
  const { cart } = await get<{ cart: MedusaCart }>(
    `/store/carts/${cartId}?fields=*items,*items.variant,*items.variant.prices,*payment_collection,*payment_collection.payment_sessions`
  )
  return cart
}

export async function updateMedusaCart(cartId: string, data: Record<string, unknown>) {
  // Medusa v2 uses POST for cart updates in some versions, PATCH in others.
  // We try PATCH first and fall back to POST if it fails.
  try {
    const { cart } = await patch<{ cart: MedusaCart }>(`/store/carts/${cartId}`, data)
    return cart
  } catch {
    const { cart } = await post<{ cart: MedusaCart }>(`/store/carts/${cartId}`, data)
    return cart
  }
}

// --- Line items ---

export async function addMedusaLineItem(cartId: string, variantId: string, quantity: number) {
  const { cart } = await post<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items`, {
    variant_id: variantId,
    quantity,
  })
  return cart
}

export async function updateMedusaLineItem(cartId: string, lineItemId: string, quantity: number) {
  const { cart } = await patch<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    quantity,
  })
  return cart
}

export async function deleteMedusaLineItem(cartId: string, lineItemId: string) {
  const { cart } = await del<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items/${lineItemId}`)
  return cart
}

// --- Product variant lookup (needed to resolve variant_id from handle) ---

export async function getVariantIdForHandle(handle: string): Promise<string | null> {
  const { products = [] } = await get<{ products: { variants?: { id: string }[] }[] }>(
    `/store/products?handle=${encodeURIComponent(handle)}&fields=*variants`
  )
  return products[0]?.variants?.[0]?.id ?? null
}

// --- Shipping ---

export async function autoSelectShipping(cartId: string): Promise<void> {
  const { shipping_options = [] } = await get<{ shipping_options: { id: string }[] }>(
    `/store/shipping-options?cart_id=${encodeURIComponent(cartId)}`
  )
  if (!shipping_options.length) {
    throw new Error('No shipping methods available. Run `npm run setup:shipping` in ebmx-backend, then restart the storefront.')
  }
  await post(`/store/carts/${cartId}/shipping-methods`, { option_id: shipping_options[0].id })
}

// --- Payment ---

export async function initializePayment(cartId: string): Promise<string | null> {
  // Step 1: Create payment collection for the cart
  let payColId: string
  try {
    const { payment_collection } = await post<{ payment_collection: { id: string } }>(
      '/store/payment-collections',
      { cart_id: cartId }
    )
    payColId = payment_collection.id
  } catch {
    // Payment collection may already exist — fetch it from the cart
    const cart = await getMedusaCart(cartId)
    payColId = cart.payment_collection?.id ?? ''
    if (!payColId) throw new Error('Could not get payment collection')
  }

  // Step 2: Create Stripe payment session
  const { payment_collection } = await post<{
    payment_collection: { payment_sessions?: { data?: { client_secret?: string } }[] }
  }>(
    `/store/payment-collections/${payColId}/payment-sessions`,
    { provider_id: 'pp_stripe_stripe' }
  )

  return payment_collection.payment_sessions?.[0]?.data?.client_secret ?? null
}

// --- Complete ---

export async function completeMedusaCart(cartId: string) {
  const raw = await post<{
    type: string
    order?: { id: string; display_id: number }
    cart?: unknown
  }>(`/store/carts/${cartId}/complete`)
  // Medusa v2 returns { type: "order", order: {...} } on success
  return { type: raw.type, data: raw.order }
}

// --- Types ---

export interface MedusaCart {
  id: string
  email?: string
  region_id?: string
  payment_collection?: {
    id: string
    payment_sessions?: { data?: { client_secret?: string } }[]
  }
  items?: {
    id: string
    variant_id: string
    quantity: number
    unit_price?: number
    title?: string
    thumbnail?: string
    variant?: { title?: string; prices?: { amount: number; currency_code: string }[] }
  }[]
  subtotal?: number
  total?: number
}
