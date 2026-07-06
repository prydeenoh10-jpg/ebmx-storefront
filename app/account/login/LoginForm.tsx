'use client'
import { type FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthCard, { AuthField, AuthSubmit, AuthLink } from '@/components/auth/AuthCard'
import { useAuth } from '@/lib/context/AuthContext'

export default function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const fd = new FormData(e.target as HTMLFormElement)
    const email = fd.get('email') as string
    const password = fd.get('password') as string
    try {
      await login(email, password)
      const next = searchParams.get('next') ?? '/account'
      router.push(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Check your credentials.')
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Log in to your EBMX account"
      onSubmit={handleSubmit}
      footer={
        <>
          <span>
            Don&apos;t have an account?{' '}
            <AuthLink href="/account/register">Create one</AuthLink>
          </span>
          <AuthLink href="/account/forgot-password">Forgot your password?</AuthLink>
        </>
      }
    >
      <AuthField
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
        autoComplete="email"
      />
      <AuthField
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />
      {error && (
        <p style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 12,
          color: '#ff6b6b',
          margin: 0,
          padding: '8px 12px',
          background: 'rgba(255,107,107,0.08)',
          border: '1px solid rgba(255,107,107,0.2)',
        }}>{error}</p>
      )}
      <AuthSubmit>{loading ? 'Logging in…' : 'Log In'}</AuthSubmit>
    </AuthCard>
  )
}
