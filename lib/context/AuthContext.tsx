'use client'
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { MedusaCustomer } from '@/lib/medusa/auth'

const STORAGE_KEY = 'ebmx_auth_token'

interface AuthContextValue {
  token: string | null
  customer: MedusaCustomer | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [customer, setCustomer] = useState<MedusaCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      setToken(saved)
      import('@/lib/medusa/auth').then(({ getCustomer }) => {
        getCustomer(saved).then(c => {
          if (c) {
            setCustomer(c)
          } else {
            // Token expired or invalid
            localStorage.removeItem(STORAGE_KEY)
            setToken(null)
          }
          setIsLoading(false)
        })
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { loginCustomer, getCustomer } = await import('@/lib/medusa/auth')
    const jwt = await loginCustomer(email, password)
    localStorage.setItem(STORAGE_KEY, jwt)
    setToken(jwt)
    const c = await getCustomer(jwt)
    setCustomer(c)
  }, [])

  const register = useCallback(async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    const { registerCustomer, getCustomer } = await import('@/lib/medusa/auth')
    const jwt = await registerCustomer(email, password, firstName, lastName)
    localStorage.setItem(STORAGE_KEY, jwt)
    setToken(jwt)
    const c = await getCustomer(jwt)
    setCustomer(c)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setCustomer(null)
  }, [])

  return (
    <AuthContext.Provider value={{ token, customer, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
