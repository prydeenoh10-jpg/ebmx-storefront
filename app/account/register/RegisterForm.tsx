'use client'
import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthCard, { AuthField, AuthSubmit, AuthLink } from '@/components/auth/AuthCard'
import { useAuth } from '@/lib/context/AuthContext'

export default function RegisterForm() {
  const { register } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const fd = new FormData(e.target as HTMLFormElement)
    const email = fd.get('email') as string
    const password = fd.get('password') as string
    const firstName = fd.get('firstName') as string
    const lastName = fd.get('lastName') as string
    try {
      await register(email, password, firstName, lastName)
      router.push('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Email may already be in use.')
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join the EBMX community"
      onSubmit={handleSubmit}
      footer={
        <span>
          Already have an account?{' '}
          <AuthLink href="/account/login">Log in</AuthLink>
        </span>
      }
    >
      <AuthField
        label="First name"
        name="firstName"
        placeholder="Jordan"
        required
        autoComplete="given-name"
      />
      <AuthField
        label="Last name"
        name="lastName"
        placeholder="Blake"
        required
        autoComplete="family-name"
      />
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
        placeholder="Min. 8 characters"
        required
        autoComplete="new-password"
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
      <AuthSubmit>{loading ? 'Creating account…' : 'Create Account'}</AuthSubmit>
    </AuthCard>
  )
}
