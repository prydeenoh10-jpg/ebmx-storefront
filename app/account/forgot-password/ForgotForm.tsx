'use client'
import { type FormEvent, useState } from 'react'
import AuthCard, { AuthField, AuthSubmit, AuthLink } from '@/components/auth/AuthCard'
import styles from './forgot.module.css'

export default function ForgotForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className={styles.sentCard}>
        <div className={styles.sentIcon}>✓</div>
        <h2 className={styles.sentTitle}>Check your inbox</h2>
        <p className={styles.sentText}>
          If an account exists for that email, a reset link is on its way.
          (Email sending wires up in the backend phase.)
        </p>
        <AuthLink href="/account/login">← Back to login</AuthLink>
      </div>
    )
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email and we'll send a reset link"
      onSubmit={handleSubmit}
      footer={
        <AuthLink href="/account/login">← Back to login</AuthLink>
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
      <AuthSubmit>Send Reset Link</AuthSubmit>
    </AuthCard>
  )
}
