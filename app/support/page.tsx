import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './support.module.css'

export const metadata: Metadata = {
  title: 'Support | EBMX',
  description: 'Get help with your SurRon or electric dirt bike. Manuals, FAQs, warranty information, and direct contact with the EBMX workshop.',
}

const faqs = [
  {
    q: 'What warranty comes with a new SurRon?',
    a: "SurRon Australia provides a 12-month manufacturer's warranty on all new bikes. This covers manufacturing defects in motor, battery, controller, and frame. Wear items (tyres, brake pads, chain) are excluded. We process all warranty claims in-house — you don't need to deal with the distributor directly.",
  },
  {
    q: 'Are SurRons road-legal in NSW?',
    a: 'No — standard SurRons do not meet Australian Design Rules for road registration in NSW or any other state. They are designed for private property, dedicated trails, and approved off-road venues. See our blog post for a full state-by-state breakdown.',
  },
  {
    q: 'How do I charge the Light Bee X?',
    a: 'The Light Bee X charges via the DC charging port on the right side of the frame using the included charger. A full charge from flat takes approximately 3–4 hours with the stock charger. Do not leave on charge unattended for extended periods.',
  },
  {
    q: 'My controller is showing error codes — what should I do?',
    a: 'Connect the SurRon app (Android) via Bluetooth to read error codes. Common codes relate to phase current faults or hall sensor issues. Note the code and call the workshop — most faults can be diagnosed remotely before you bring the bike in.',
  },
  {
    q: 'What oil does the Light Bee X use?',
    a: 'The Light Bee X motor is sealed and does not require oil. The gearbox/reducer takes a small amount of gear oil — check your model year manual for the specific grade and quantity. We recommend checking the level at each annual service.',
  },
  {
    q: 'Can I upgrade my stock SurRon?',
    a: "Yes — most SurRon models have a well-supported aftermarket. Stage 1–3 motor and controller upgrades are available, as are extended battery packs, suspension upgrades, and wheel/tyre options. See our Custom Builds page or contact the workshop to spec a build.",
  },
]

const resources = [
  { title: 'Light Bee X Owner Manual', note: 'PDF · 2023 model year', href: '#' },
  { title: 'Ultra Bee Owner Manual', note: 'PDF · 2024 model year', href: '#' },
  { title: 'SurRon App Setup Guide', note: 'Android · Bluetooth pairing', href: '#' },
  { title: 'Controller Error Code List', note: 'All models · English', href: '#' },
]

export default function SupportPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>Support</span>
          <h1 className={styles.heroTitle}>How Can We Help?</h1>
          <p className={styles.heroSub}>
            Manuals, FAQs, and direct access to the workshop. If you can&apos;t find what
            you need here, call us or send a message.
          </p>
          <div className={styles.heroContacts}>
            <a href="tel:+61249530000" className={styles.heroPhone}>+61 2 4953 0000</a>
            <Link href="/contact" className={styles.heroContactLink}>Send a message →</Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className={styles.resources}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>Manuals & Guides</h2>
          <div className={styles.resourceGrid}>
            {resources.map(r => (
              <a key={r.title} href={r.href} className={styles.resourceCard}>
                <div className={styles.resourceIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <div className={styles.resourceTitle}>{r.title}</div>
                  <div className={styles.resourceNote}>{r.note}</div>
                </div>
                <span className={styles.resourceArrow}>↓</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map(faq => (
              <div key={faq.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{faq.q}</h3>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still stuck */}
      <section className={styles.contact}>
        <div className={styles.inner}>
          <h2 className={styles.contactTitle}>Still Need Help?</h2>
          <p className={styles.contactSub}>
            Our workshop team knows these bikes inside out. Call during business hours or
            send a message and we&apos;ll get back to you within one business day.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>Contact the Workshop</Link>
        </div>
      </section>
    </main>
  )
}
