// Medusa v2 customer auth helpers (client-side).
// Registration: creates auth identity, then customer profile.
// Login: returns JWT stored in AuthContext (localStorage).

import { BACKEND, storeHeaders } from './config'

async function post<T>(path: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    method: 'POST',
    headers: storeHeaders(token ? { Authorization: `Bearer ${token}` } : {}),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text().catch(() => '')
    throw new Error(err || `POST ${path} → ${res.status}`)
  }
  return res.json() as Promise<T>
}

async function get<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    headers: {
      ...storeHeaders(),
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

// --- Auth ---

export async function loginCustomer(email: string, password: string): Promise<string> {
  const { token } = await post<{ token: string }>('/auth/customer/emailpass', { email, password })
  return token
}

export async function registerCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<string> {
  // Step 1: create auth identity → returns JWT
  const { token } = await post<{ token: string }>('/auth/customer/emailpass/register', {
    email,
    password,
  })

  // Step 2: create customer profile using the JWT
  await post<unknown>(
    '/store/customers',
    { email, first_name: firstName, last_name: lastName },
    token,
  )

  return token
}

// --- Customer ---

export interface MedusaCustomer {
  id: string
  email: string
  first_name: string
  last_name: string
}

export async function getCustomer(token: string): Promise<MedusaCustomer | null> {
  try {
    const { customer } = await get<{ customer: MedusaCustomer }>('/store/customers/me', token)
    return customer
  } catch {
    return null
  }
}

// --- Orders ---

export interface MedusaOrder {
  id: string
  display_id: number
  status: string
  total: number
  currency_code: string
  created_at: string
  items?: { id: string; title: string; quantity: number; unit_price: number }[]
}

export async function getCustomerOrders(token: string): Promise<MedusaOrder[]> {
  const { orders = [] } = await get<{ orders: MedusaOrder[] }>(
    '/store/orders?limit=20',
    token,
  )
  return orders
}
