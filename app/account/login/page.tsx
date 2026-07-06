import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginForm from './LoginForm'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Login | EBMX',
  description: 'Log in to your EBMX account to track orders, manage your builds and access exclusive content.',
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.graphic} aria-hidden="true">
        <div className={styles.graphicGrid} />
        <div className={styles.graphicGlow} />
        <div className={styles.graphicLabel}>EBMX · WARNERS BAY NSW</div>
      </div>
      <div className={styles.formCol}>
        {/* Suspense required because LoginForm uses useSearchParams() */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
