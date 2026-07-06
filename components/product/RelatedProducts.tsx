import Link from 'next/link'
import type { Product } from '@/lib/commerce/types'
import styles from './RelatedProducts.module.css'

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>YOU MIGHT ALSO LIKE</p>
        <h2 className={styles.h2}>Related Products</h2>

        <div className={styles.grid}>
          {products.map(p => (
            <Link key={p.id} href={`/bikes/${p.handle}`} className={styles.card}>
              <div
                className={styles.cardImg}
                style={{ backgroundImage: `url('${p.image}')` }}
                role="img"
                aria-label={p.name}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardName}>{p.name}</div>
                <div className={styles.cardPrice}>{p.priceDisplay}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
