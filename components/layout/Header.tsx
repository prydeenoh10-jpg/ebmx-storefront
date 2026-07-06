'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useScrolled } from '@/lib/hooks/useScrolled'
import { useCart } from '@/lib/context/CartContext'
import { useAuth } from '@/lib/context/AuthContext'
import MobileMenu from './MobileMenu'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Bikes', href: '/bikes' },
  { label: 'Upgrades', href: '/bikes' },
  { label: 'Custom Builds', href: '/custom-builds' },
  { label: 'Blog', href: '/blog' },
]

export default function Header() {
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cart, openCart } = useCart()
  const { customer, isLoading, logout } = useAuth()

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Electric Dirt Bike home">
          <span className={styles.logoMark} aria-hidden="true">E</span>
          <span className={styles.logoText}>
            ELECTRIC<span>DIRTBIKE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className={styles.navLink}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {!isLoading && customer ? (
            <>
              <Link href="/account" className={styles.loginBtn}>Account</Link>
              <button className={styles.loginBtn} onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/account/login" className={styles.loginBtn} aria-label="Log in">Login</Link>
          )}

          <button className={styles.cartBtn} aria-label={`Cart, ${cart.count} items`} onClick={openCart}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
              <path d="M2 3h2.2l2.1 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L20.5 7H6" />
            </svg>
            {cart.count > 0 && (
              <span className={styles.cartBadge} aria-hidden="true">{cart.count}</span>
            )}
          </button>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
