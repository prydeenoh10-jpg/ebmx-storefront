'use client'
import { useState } from 'react'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setDone(true)
  }

  return (
    <section className={styles.section} aria-label="Newsletter signup">
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.h2}>Get The Drop First</h2>
          <p className={styles.sub}>
            New bikes, restocks, build reveals and deals — straight to your inbox.
            No spam, no BS. Unsubscribe any time.
          </p>
        </div>

        <div className={styles.right}>
          {done ? (
            <div className={styles.thanks}>
              <span className={styles.thanksIcon}>✓</span>
              <span className={styles.thanksText}>You&apos;re on the list. See you in the inbox.</span>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} aria-label="Newsletter signup form">
              <input
                type="email"
                className={styles.emailInput}
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button type="submit" className={styles.submitBtn}>
                Subscribe
              </button>
            </form>
          )}
          <p className={styles.privacy}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
