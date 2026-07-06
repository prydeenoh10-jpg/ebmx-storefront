'use client'
import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import type { Product, Collection } from '@/lib/commerce/types'
import { useCart } from '@/lib/context/CartContext'
import styles from './ShopClient.module.css'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'

function catShort(cat: string): string {
  return (cat || '')
    .replace('SurRon ', '')
    .replace('Modifications', 'Mods')
    .replace(' and ', ' & ')
    .replace('Bikes & E-Motos', 'Bikes')
    .toUpperCase()
}

function fmt(p: Product): string {
  if (!p.price) return 'POA'
  return p.priceDisplay
}

interface Props {
  initialProducts: Product[]
  collections: Collection[]
}

export default function ShopClient({ initialProducts, collections }: Props) {
  const { addLine } = useCart()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [sort, setSort] = useState<SortKey>('featured')
  const [added, setAdded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = initialProducts

    if (activeCategory) {
      list = list.filter(p => p.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }
    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    }

    return list
  }, [initialProducts, activeCategory, search, sort])

  const handleAdd = useCallback((e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.price) return
    addLine(product)
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1400)
  }, [addLine])

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHead}>
        <div className={styles.pageHeadInner}>
          <p className={styles.eyebrow}>SHOP — {initialProducts.length} PRODUCTS</p>
          <h1 className={styles.h1}>Everything Electric</h1>
        </div>
      </div>

      {/* Controls bar */}
      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>

          {/* Sort */}
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
            aria-label="Sort products"
          >
            <option value="featured">FEATURED</option>
            <option value="price-asc">PRICE: LOW → HIGH</option>
            <option value="price-desc">PRICE: HIGH → LOW</option>
            <option value="name">NAME A → Z</option>
          </select>
        </div>
      </div>

      {/* Category chips */}
      <div className={styles.chips}>
        <div className={styles.chipsInner}>
          <button
            className={`${styles.chip} ${activeCategory === '' ? styles.chipActive : ''}`}
            onClick={() => setActiveCategory('')}
          >
            ALL · {initialProducts.length}
          </button>
          {collections.map(c => (
            <button
              key={c.handle}
              className={`${styles.chip} ${activeCategory === c.name ? styles.chipActive : ''}`}
              onClick={() => setActiveCategory(activeCategory === c.name ? '' : c.name)}
            >
              {catShort(c.name)} · {c.count}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.main}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No products match your filters.</p>
            <button className={styles.clearBtn} onClick={() => { setSearch(''); setActiveCategory('') }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(p => (
              <Link key={p.id} href={`/bikes/${p.handle}`} className={styles.card}>
                <div className={styles.cardImg} style={{ backgroundImage: `url('${p.image}')` }}>
                  <span className={styles.catBadge}>{catShort(p.category)}</span>
                  <span className={`${styles.stockBadge} ${p.inStock ? styles.inStock : styles.order}`}>
                    {p.inStock ? 'IN STOCK' : 'ORDER'}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardName}>{p.name}</div>
                  <div className={styles.cardFooter}>
                    <div className={styles.priceCol}>
                      {p.wasPrice && (
                        <span className={styles.wasPrice}>{p.wasPriceDisplay}</span>
                      )}
                      <span className={`${styles.price} ${p.wasPrice ? styles.priceRed : ''}`}>
                        {fmt(p)}
                      </span>
                    </div>
                    <button
                      className={`${styles.addBtn} ${added === p.id ? styles.addBtnDone : ''}`}
                      onClick={e => handleAdd(e, p)}
                      aria-label={`Add ${p.name} to cart`}
                      disabled={!p.price}
                    >
                      {added === p.id ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
