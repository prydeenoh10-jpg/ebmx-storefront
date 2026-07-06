// Shared Medusa v2 fetch helper used by both server and client code.
// Server-side code (RSC) can use MEDUSA_BACKEND_URL (not exposed to browser).
// Client-side code falls back to the NEXT_PUBLIC_ variant.

export const BACKEND =
  process.env.MEDUSA_BACKEND_URL ??
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ??
  'http://localhost:9000'

export const PK = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ''

export function storeHeaders(extra?: Record<string, string>) {
  return {
    'Content-Type': 'application/json',
    'x-publishable-api-key': PK,
    ...extra,
  }
}

export async function storeFetch<T>(
  path: string,
  init?: RequestInit & { noCache?: boolean },
): Promise<T> {
  const { noCache, ...rest } = init ?? {}
  const res = await fetch(`${BACKEND}${path}`, {
    ...rest,
    headers: storeHeaders(rest.headers as Record<string, string>),
    ...(noCache ? {} : { next: { revalidate: 60 } }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Medusa ${path} → ${res.status}: ${body.slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}
