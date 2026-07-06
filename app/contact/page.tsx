import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact | EBMX — Warners Bay, NSW',
  description: 'Get in touch with the EBMX workshop in Warners Bay NSW. Call, email, or use the contact form for sales, service, and build enquiries.',
}

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Contact</span>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.sub}>
            We&apos;re based in Warners Bay, NSW. Call during business hours, send a message,
            or drop in if you want to see the workshop.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Contact details */}
          <div className={styles.details}>
            <div className={styles.detailBlock}>
              <div className={styles.detailLabel}>Phone</div>
              <a href="tel:+61249530000" className={styles.detailValue}>+61 2 4953 0000</a>
            </div>
            <div className={styles.detailBlock}>
              <div className={styles.detailLabel}>Email</div>
              <a href="mailto:info@ebmx.com.au" className={styles.detailValue}>info@ebmx.com.au</a>
            </div>
            <div className={styles.detailBlock}>
              <div className={styles.detailLabel}>Address</div>
              <address className={styles.detailAddress}>
                EBMX<br />
                Warners Bay NSW 2282<br />
                Australia
              </address>
            </div>
            <div className={styles.detailBlock}>
              <div className={styles.detailLabel}>Workshop Hours</div>
              <div className={styles.hours}>
                <div className={styles.hoursRow}><span>Mon – Fri</span><span>8:00 am – 5:00 pm</span></div>
                <div className={styles.hoursRow}><span>Saturday</span><span>9:00 am – 2:00 pm</span></div>
                <div className={styles.hoursRow}><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
            <div className={styles.detailBlock}>
              <div className={styles.detailLabel}>Enquiry Types</div>
              <ul className={styles.enquiryList}>
                <li>New bike sales</li>
                <li>Parts and accessories orders</li>
                <li>Custom build projects</li>
                <li>Workshop service bookings</li>
                <li>Warranty and support</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
