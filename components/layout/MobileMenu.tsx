'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/context/AuthContext'
import styles from './MobileMenu.module.css'

const MENU_ITEMS = [
  { label: 'Electric Dirt Bikes', href: '/bikes' },
  { label: 'Upgrades & Parts', href: '/bikes' },
  { label: 'Custom Builds', href: '/custom-builds' },
  { label: 'Blog', href: '/blog' },
  { label: 'Workshop Services', href: '/workshop-services' },
  { label: 'Battery Upgrades', href: '/bikes' },
  { label: 'Contact Us', href: '/contact' },
]

interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const { customer, logout } = useAuth()
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      id={id}
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.drawerHead}>
          <span className={styles.menuLabel}>MENU</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            &times;
          </button>
        </div>

        <nav>
          {MENU_ITEMS.map(({ label, href }) => (
            <Link key={label} href={href} className={styles.menuItem} onClick={onClose}>
              {label}
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          ))}

          {customer ? (
            <>
              <Link href="/account" className={`${styles.menuItem} ${styles.loginItem}`} onClick={onClose}>
                My Account
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
              <button
                className={`${styles.menuItem} ${styles.loginItem}`}
                onClick={() => { logout(); onClose() }}
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
              >
                Log Out
                <span className={styles.arrow} aria-hidden="true">→</span>
              </button>
            </>
          ) : (
            <Link href="/account/login" className={`${styles.menuItem} ${styles.loginItem}`} onClick={onClose}>
              Log In / Register
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          )}
        </nav>

        <div className={styles.contact}>
          1300 003 269<br />
          SHOWROOM 9/5 WALKER ST, WARNERS BAY NSW<br />
          SALES@ELECTRICDIRTBIKE.COM.AU
        </div>
      </div>
    </div>
  )
}
