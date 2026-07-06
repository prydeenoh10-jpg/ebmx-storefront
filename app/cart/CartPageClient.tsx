'use client'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import styles from './cart.module.css'

export default function CartPageClient() {
  const { cart, updateLine, removeLine } = useCart()

  const gst = cart.subtotal * (1 / 11)
  const subtotalExGst = cart.subtotal - gst

  if (cart.count === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h1 className={styles.emptyTitle}>Your cart is empty</h1>
        <p className={styles.emptyText}>Add some bikes or parts to get started.</p>
        <Link href="/bikes" className={styles.browseBtn}>Browse the Catalogue</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Your Cart</h1>
        <div className={styles.layout}>
          {/* Line items */}
          <div className={styles.lines}>
            {cart.lines.map(line => (
              <div key={line.lineId} className={styles.line}>
                <div
                  className={styles.lineImg}
                  style={{ backgroundImage: `url(${line.image})` }}
                />
                <div className={styles.lineInfo}>
                  <Link href={`/bikes/${line.handle}`} className={styles.lineName}>
                    {line.name}
                  </Link>
                  <div className={styles.linePrice}>{line.priceDisplay}</div>
                </div>
                <div className={styles.lineControls}>
                  <div className={styles.qty}>
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
                  <div className={styles.lineTotal}>
                    {line.price !== null
                      ? `A$${(line.price * line.quantity).toLocaleString('en-AU', { minimumFractionDigits: 2 })}`
                      : 'POA'}
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeLine(line.lineId)}
                    aria-label="Remove item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal (ex. GST)</span>
              <span>A${subtotalExGst.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>GST (10%)</span>
              <span>A${gst.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.summaryRow + ' ' + styles.summaryTotal}>
              <span>Total (inc. GST)</span>
              <span>A${cart.subtotal.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
            </div>
            <Link href="/checkout" className={styles.checkoutBtn}>
              Proceed to Checkout
            </Link>
            <Link href="/bikes" className={styles.continueLink}>← Continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
