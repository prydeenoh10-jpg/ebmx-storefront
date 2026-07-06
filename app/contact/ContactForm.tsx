'use client'
import { type FormEvent, useState } from 'react'
import styles from './contactForm.module.css'

const SUBJECTS = [
  'New bike sales',
  'Parts order',
  'Custom build enquiry',
  'Workshop service booking',
  'Warranty / support',
  'General enquiry',
]

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className={styles.sent}>
        <div className={styles.sentIcon}>✓</div>
        <h2 className={styles.sentTitle}>Message Received</h2>
        <p className={styles.sentText}>
          Thanks for getting in touch. We&apos;ll respond within one business day.
          (Form submission wires up in the backend phase.)
        </p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contactName">Name</label>
          <input id="contactName" name="name" type="text" className={styles.input} placeholder="Jordan Blake" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contactEmail">Email</label>
          <input id="contactEmail" name="email" type="email" className={styles.input} placeholder="you@example.com" required />
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contactPhone">Phone (optional)</label>
        <input id="contactPhone" name="phone" type="tel" className={styles.input} placeholder="+61 4XX XXX XXX" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contactSubject">Subject</label>
        <select id="contactSubject" name="subject" className={styles.select} required>
          <option value="">Select a subject…</option>
          {SUBJECTS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contactMessage">Message</label>
        <textarea
          id="contactMessage"
          name="message"
          className={styles.textarea}
          placeholder="Tell us what you need…"
          rows={6}
          required
        />
      </div>
      <button type="submit" className={styles.submit}>Send Message</button>
    </form>
  )
}
