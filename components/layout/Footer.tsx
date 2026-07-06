import Link from 'next/link'
import styles from './Footer.module.css'

const SHOP_LINKS = [
  { label: 'Bikes & E-Motos', href: '/bikes' },
  { label: 'Batteries & Chargers', href: '/bikes' },
  { label: 'Motors & Controllers', href: '/bikes' },
  { label: 'Wheels & Tyres', href: '/bikes' },
  { label: 'OEM Parts', href: '/bikes' },
  { label: 'Kool Rides Collection', href: '/bikes' },
]

const SUPPORT_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQs', href: '/support' },
  { label: 'Workshop Booking', href: '/workshop-services' },
  { label: 'Warranty & Support', href: '/support' },
  { label: 'Shipping Policy', href: '/support' },
]

const COMPANY_LINKS = [
  { label: 'Custom Builds', href: '/custom-builds' },
  { label: 'Workshop Services', href: '/workshop-services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandName}>
            ELECTRIC<span>DIRTBIKE</span>
          </div>
          <p className={styles.brandDesc}>
            Australia&apos;s leading provider of high-performance electric dirt bikes,
            custom builds and premium aftermarket upgrades.
          </p>
          <address className={styles.brandContact} style={{ fontStyle: 'normal' }}>
            SHOWROOM 9/5 WALKER ST, WARNERS BAY NSW<br />
            1300 003 269 · 0411 422 882<br />
            SALES@ELECTRICDIRTBIKE.COM.AU
          </address>
        </div>

        {/* Shop */}
        <div className={styles.col}>
          <div className={styles.colHead}>SHOP</div>
          {SHOP_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className={styles.colLink}>{label}</Link>
          ))}
        </div>

        {/* Support */}
        <div className={styles.col}>
          <div className={styles.colHead}>SUPPORT</div>
          {SUPPORT_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className={styles.colLink}>{label}</Link>
          ))}
        </div>

        {/* Company */}
        <div className={styles.col}>
          <div className={styles.colHead}>COMPANY</div>
          {COMPANY_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className={styles.colLink}>{label}</Link>
          ))}
        </div>
      </div>

      <div className={styles.legal}>
        <div className={styles.legalInner}>
          <span>© 2026 ELECTRICDIRTBIKE PTY LTD. ALL RIGHTS RESERVED.</span>
          <span>
            ABN 50 641 568 612 · MOTOR DEALER LICENCE MD083674 · MVRL59062 · PRICES INCL. GST
          </span>
        </div>
      </div>
    </footer>
  )
}
