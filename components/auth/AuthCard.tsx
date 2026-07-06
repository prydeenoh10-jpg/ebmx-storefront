'use client'
import Link from 'next/link'
import { type ReactNode, type FormEvent } from 'react'
import styles from './AuthCard.module.css'

interface AuthCardProps {
  title: string
  subtitle: string
  onSubmit: (e: FormEvent) => void
  children: ReactNode
  footer?: ReactNode
}

export default function AuthCard({ title, subtitle, onSubmit, children, footer }: AuthCardProps) {
  return (
    <div className={styles.card}>
      <Link href="/" className={styles.logoMark} aria-label="EBMX home">
        <span className={styles.logoE}>E</span>
        <span className={styles.logoText}>EBMX</span>
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        {children}
      </form>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

interface FieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
}

export function AuthField({ label, name, type = 'text', placeholder, required, autoComplete }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={styles.input}
      />
    </div>
  )
}

export function AuthSubmit({ children }: { children: ReactNode }) {
  return (
    <button type="submit" className={styles.submit}>
      {children}
    </button>
  )
}

export function AuthLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={styles.authLink}>{children}</Link>
  )
}
