'use client'
import { useState } from 'react'
import type { Product } from '@/lib/commerce/types'
import styles from './Gallery.module.css'

const THUMB_LABELS = ['MAIN', 'SIDE', 'DETAIL', 'ANGLE']

export default function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0)
  const [imgError, setImgError] = useState(false)

  const imgStyle = imgError
    ? {}
    : { backgroundImage: `url('${product.image}')` }

  return (
    <div className={styles.gallery}>
      {/* Main image */}
      <div className={styles.main} style={imgStyle} role="img" aria-label={product.name}>
        {imgError && (
          <div className={styles.placeholder}>
            <span className={styles.placeholderLabel}>[ {product.name.slice(0, 30)} ]</span>
          </div>
        )}
        {!imgError && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className={styles.hiddenImg}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className={styles.thumbs} role="list">
        {THUMB_LABELS.map((label, i) => (
          <button
            key={i}
            role="listitem"
            className={`${styles.thumb} ${active === i ? styles.thumbActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`View ${label}`}
            style={imgError ? {} : { backgroundImage: `url('${product.image}')` }}
          >
            <span className={styles.thumbLabel}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
