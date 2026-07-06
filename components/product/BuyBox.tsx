'use client'
import { useState } from 'react'
import type { Product } from '@/lib/commerce/types'
import { useCart } from '@/lib/context/CartContext'
import styles from './BuyBox.module.css'

type Tab = 'description' | 'shipping'

export default function BuyBox({ product }: { product: Product }) {
  const { addLine } = useCart()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<Tab>('description')
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (!product.price) return
    addLine(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const isBike = product.category === 'Bikes and E-Motos' || product.category === 'Showroom Builds for Sale'
  const weeklyFinance = product.price ? Math.ceil((product.price / 104) * 100) / 100 : null

  return (
    <div className={styles.buybox}>
      {/* Sub label */}
      <p className={styles.sub}>{product.category.toUpperCase()}</p>

      {/* Title */}
      <h1 className={styles.title}>{product.name}</h1>

      {/* Rating */}
      <div className={styles.rating}>
        <span className={styles.stars} aria-label="4.9 out of 5 stars">★★★★★</span>
        <span className={styles.ratingText}>4.9 · 128 reviews</span>
      </div>

      {/* Price */}
      <div className={styles.priceRow}>
        {product.wasPrice && (
          <span className={styles.rrp}>RRP {product.wasPriceDisplay}</span>
        )}
        <span className={styles.price}>
          {product.price ? product.priceDisplay : 'Price on request'}
        </span>
      </div>

      {/* Stock */}
      <div className={`${styles.stock} ${product.inStock ? styles.stockIn : styles.stockOut}`}>
        {product.inStock
          ? '✓ IN STOCK — ships in 3–5 business days'
          : '✗ OUT OF STOCK — contact us to order'
        }
      </div>

      {/* Finance note */}
      {weeklyFinance && (
        <p className={styles.financeNote}>
          Or from <strong>${weeklyFinance}/week</strong> with Afterpay — 0% interest, no fees
        </p>
      )}

      {/* Divider */}
      <div className={styles.divider} />

      {/* Qty + Add to cart */}
      <div className={styles.addRow}>
        <div className={styles.qtyWrap}>
          <button
            className={styles.qtyBtn}
            onClick={() => setQty(q => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >−</button>
          <span className={styles.qtyNum}>{qty}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => setQty(q => q + 1)}
            aria-label="Increase quantity"
          >+</button>
        </div>

        <button
          className={`${styles.addBtn} ${added ? styles.addBtnDone : ''}`}
          onClick={handleAdd}
          disabled={!product.price || !product.inStock}
          aria-disabled={!product.price || !product.inStock}
        >
          {added ? '✓ Added to Cart' : product.price ? 'Add to Cart' : 'Contact for Pricing'}
        </button>
      </div>

      {/* Buy Now (placeholder) */}
      {product.price && product.inStock && (
        <button className={styles.buyNowBtn} disabled aria-disabled="true">
          Buy Now — Coming Soon
        </button>
      )}

      {/* Trust badges */}
      <div className={styles.trust}>
        <span>2-YR WARRANTY</span>
        <span className={styles.trustDot}>·</span>
        <span>FREE SHIPPING AUS</span>
        <span className={styles.trustDot}>·</span>
        <span>WORKSHOP-TUNED</span>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${tab === 'description' ? styles.tabActive : ''}`}
          onClick={() => setTab('description')}
        >Description</button>
        <button
          className={`${styles.tabBtn} ${tab === 'shipping' ? styles.tabActive : ''}`}
          onClick={() => setTab('shipping')}
        >Shipping & Warranty</button>
      </div>

      <div className={styles.tabContent}>
        {tab === 'description' ? (
          <div className={styles.description}>
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <p className={styles.noDesc}>
                {isBike
                  ? `The ${product.name} is available from EBMX, Australia's electric dirt bike specialists. Workshop-tuned and ready to ride.`
                  : `High-quality ${product.category.toLowerCase()} — contact us for fitment advice and compatibility queries.`
                }
              </p>
            )}
          </div>
        ) : (
          <div className={styles.description}>
            <p><strong>Shipping:</strong> Free express shipping Australia-wide on orders over $100. VIP Motor Courier Service available — contact us for details.</p>
            <p><strong>Warranty:</strong> 2-year warranty on all bikes. Parts carry a 90-day warranty. Workshop builds include a full PDI and 30-day return-to-base support.</p>
            <p><strong>Returns:</strong> 14-day change-of-mind returns on unused parts. Bikes must be returned unridden.</p>
          </div>
        )}
      </div>
    </div>
  )
}
