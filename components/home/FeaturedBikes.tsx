'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import styles from './FeaturedBikes.module.css'

interface FeaturedBike {
  id: number
  badge: string
  sub: string
  name: string
  chips: string[]
  price: string
  was?: string
  img: string
}

const BIKES: FeaturedBike[] = [
  {
    id: 2,
    badge: '2026',
    sub: 'TRAIL · 2026 MODEL',
    name: 'SurRon Light Bee X',
    chips: ['60V', '75 KM/H', '6 KW'],
    price: '$6,809',
    img: 'https://ebmx.com.au/wp-content/uploads/2026/06/MY26_LBX_BLACK.jpg',
  },
  {
    id: 62,
    badge: 'ROAD REG',
    sub: 'ROAD REGISTERABLE',
    name: 'SurRon Ultra Bee HP',
    chips: ['74V', '90 KM/H', '12.5 KW'],
    price: '$9,536',
    img: 'https://ebmx.com.au/wp-content/uploads/2025/09/ULTRA_BEE_HP_6.png',
  },
  {
    id: 111,
    badge: 'IN STOCK',
    sub: 'LIGHTWEIGHT · IN STOCK',
    name: 'SurRon Hyperbee 72V',
    chips: ['72V', '70 KM/H', '5 KW'],
    price: '$4,082',
    img: 'https://ebmx.com.au/wp-content/uploads/2026/06/ezgif.com-webp-to-png-converter-31.png',
  },
  {
    id: 98,
    badge: 'CUSTOM',
    sub: 'WORKSHOP BUILD',
    name: 'Custom Build LBX',
    chips: ['72V', '85 KM/H', '8 KW'],
    price: '$8,591',
    img: 'https://ebmx.com.au/wp-content/uploads/2022/11/ae8dbf15-5fa8-459b-84d3-96d40c5dddb5.png',
  },
  {
    id: 30,
    badge: 'FLAGSHIP',
    sub: 'FLAGSHIP BUILD',
    name: 'Stage 3 Ultra Bee',
    chips: ['84V', '110 KM/H', '15 KW'],
    price: '$20,909',
    img: 'https://ebmx.com.au/wp-content/uploads/2025/09/ULTRA_BEE_HP_6.png',
  },
  {
    id: 122,
    badge: 'SALE',
    sub: 'KIDS · YOUTH',
    name: 'Warrior Kids SX-E500',
    chips: ['48V', '45 KM/H', '1.5 KW'],
    price: '$1,726',
    was: '$2,090',
    img: 'https://ebmx.com.au/wp-content/uploads/2022/11/ae8dbf15-5fa8-459b-84d3-96d40c5dddb5.png',
  },
]

function toHandle(id: number, name: string): string {
  const slug = name
    .replace(/[^\x20-\x7E]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64)
  return `${id}-${slug || 'product'}`
}

export default function FeaturedBikes() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let down = false, sx = 0, sl = 0
    const onDown = (e: PointerEvent) => {
      down = true; sx = e.pageX; sl = el.scrollLeft
      el.style.cursor = 'grabbing'
    }
    const onUp = () => { down = false; el.style.cursor = 'grab' }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      e.preventDefault()
      el.scrollLeft = sl - (e.pageX - sx)
    }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointermove', onMove)
    }
  }, [])

  const scrollPrev = () => scrollRef.current?.scrollBy({ left: -382, behavior: 'smooth' })
  const scrollNext = () => scrollRef.current?.scrollBy({ left: 382, behavior: 'smooth' })

  return (
    <section className={styles.section} aria-label="Featured Bikes">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>THE LINEUP</p>
          <h2 className={styles.h2}>Featured Bikes</h2>
        </div>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={scrollPrev} aria-label="Previous">‹</button>
          <button className={styles.arrow} onClick={scrollNext} aria-label="Next">›</button>
        </div>
      </div>

      <div className={styles.track} ref={scrollRef}>
        {BIKES.map(bike => {
          const handle = toHandle(bike.id, bike.name)
          return (
            <Link key={bike.id} href={`/bikes/${handle}`} className={styles.card}>
              <div
                className={styles.cardImg}
                style={{ backgroundImage: `url('${bike.img}')` }}
                role="img"
                aria-label={bike.name}
              >
                <span className={styles.badge}>{bike.badge}</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardSub}>{bike.sub}</p>
                <h3 className={styles.cardName}>{bike.name.toUpperCase()}</h3>
                <div className={styles.chips}>
                  {bike.chips.map(c => (
                    <span key={c} className={styles.chip}>{c}</span>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.priceCol}>
                    {bike.was && <span className={styles.wasPrice}>{bike.was}</span>}
                    <span className={`${styles.price} ${bike.was ? styles.priceRed : ''}`}>{bike.price}</span>
                  </div>
                  <span className={styles.viewLink}>View Bike →</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
