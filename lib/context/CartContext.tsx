'use client'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '@/lib/commerce/types'

export interface CartLine {
  lineId: string
  productId: string
  handle: string
  name: string
  image: string
  price: number
  priceDisplay: string
  quantity: number
}

interface Cart {
  lines: CartLine[]
  subtotal: number
  count: number
}

interface CartContextValue {
  cart: Cart
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addLine: (product: Product, qty?: number) => void
  updateLine: (lineId: string, quantity: number) => void
  removeLine: (lineId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function calcCart(lines: CartLine[]): Cart {
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0)
  const count = lines.reduce((s, l) => s + l.quantity, 0)
  return { lines, subtotal, count }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addLine = useCallback((product: Product, qty = 1) => {
    setLines(prev => {
      const existing = prev.find(l => l.productId === product.id)
      if (existing) {
        return prev.map(l =>
          l.productId === product.id ? { ...l, quantity: l.quantity + qty } : l
        )
      }
      return [...prev, {
        lineId: `${product.id}-${Date.now()}`,
        productId: product.id,
        handle: product.handle,
        name: product.name,
        image: product.image,
        price: product.price ?? 0,
        priceDisplay: product.priceDisplay,
        quantity: qty,
      }]
    })
    setIsOpen(true)
  }, [])

  const updateLine = useCallback((lineId: string, quantity: number) => {
    if (quantity <= 0) {
      setLines(prev => prev.filter(l => l.lineId !== lineId))
    } else {
      setLines(prev => prev.map(l => l.lineId === lineId ? { ...l, quantity } : l))
    }
  }, [])

  const removeLine = useCallback((lineId: string) => {
    setLines(prev => prev.filter(l => l.lineId !== lineId))
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  return (
    <CartContext.Provider value={{
      cart: calcCart(lines),
      isOpen, openCart, closeCart,
      addLine, updateLine, removeLine, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
