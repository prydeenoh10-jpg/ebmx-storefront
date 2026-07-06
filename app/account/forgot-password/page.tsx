import type { Metadata } from 'next'
import ForgotForm from './ForgotForm'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Reset Password | EBMX',
  description: "Forgot your EBMX password? Enter your email and we'll send a reset link.",
}

export default function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      <div className={styles.graphic} aria-hidden="true">
        <div className={styles.graphicGrid} />
        <div className={styles.graphicGlow} />
        <div className={styles.graphicLabel}>EBMX · WARNERS BAY NSW</div>
      </div>
      <div className={styles.formCol}>
        <ForgotForm />
      </div>
    </div>
  )
}
