'use client'
import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import styles from './CartDrawer.module.css'

const fmt = (n: number) =>
  '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateLine, removeLine } = useCart()

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeCart()
  }, [closeCart])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKey])

  if (!isOpen) return null

  return (
    <div className={styles.backdrop} onClick={closeCart} aria-modal="true" role="dialog" aria-label="Shopping cart">
      <div className={styles.drawer} onClick={e => e.stopPropagation()}>

        <div className={styles.head}>
          <div className={styles.headLeft}>
            <span className={styles.headTitle}>YOUR CART</span>
            {cart.count > 0 && (
              <span className={styles.headCount}>{cart.count} {cart.count === 1 ? 'item' : 'items'}</span>
            )}
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        {cart.lines.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
                <path d="M2 3h2.2l2.1 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L20.5 7H6" />
              </svg>
            </div>
            <p className={styles.emptyText}>Your cart is empty.</p>
            <button className={styles.browseBtn} onClick={closeCart}>
              <Link href="/bikes" onClick={closeCart}>Browse Bikes →</Link>
            </button>
          </div>
        ) : (
          <>
            <div className={styles.lines}>
              {cart.lines.map(line => (
                <div key={line.lineId} className={styles.line}>
                  <div
                    className={styles.lineImg}
                    style={{ backgroundImage: `url('${line.image}')` }}
                    role="img"
                    aria-label={line.name}
                  />
                  <div className={styles.lineBody}>
                    <Link href={`/bikes/${line.handle}`} className={styles.lineName} onClick={closeCart}>
                      {line.name}
                    </Link>
                    <div className={styles.linePrice}>{line.priceDisplay}</div>
                    <div className={styles.lineActions}>
                      <div className={styles.qtyRow}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateLine(line.lineId, line.quantity - 1)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className={styles.qtyNum}>{line.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateLine(line.lineId, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeLine(line.lineId)}
                      >Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.subtotalRow}>
                <span className={styles.subtotalLabel}>SUBTOTAL (INCL. GST)</span>
                <span className={styles.subtotalAmt}>{fmt(cart.subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className={styles.checkoutBtn}
                onClick={closeCart}
              >
                Proceed to Checkout
              </Link>
              <p className={styles.checkoutNote}>
                Secure checkout · Call 1300&nbsp;003&nbsp;269 to order by phone
              </p>
              <button className={styles.continueBtn} onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
