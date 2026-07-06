import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Create Account | EBMX',
  description: 'Create an EBMX account to track orders, save builds and get early access to new products.',
}

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.graphic} aria-hidden="true">
        <div className={styles.graphicGrid} />
        <div className={styles.graphicGlow} />
        <div className={styles.graphicLabel}>EBMX · WARNERS BAY NSW</div>
      </div>
      <div className={styles.formCol}>
        <RegisterForm />
      </div>
    </div>
  )
}
