import Link from 'next/link'
import styles from './PartsModifications.module.css'

const CATEGORIES = [
  {
    name: 'Light Bee Mods',
    shot: 'LIGHT BEE',
    img: 'https://ebmx.com.au/wp-content/uploads/2026/06/ezgif.com-webp-to-png-converter-31.png',
    href: '/bikes?cat=SurRon+Light+Bee+Modifications',
  },
  {
    name: 'Ultra Bee Mods',
    shot: 'ULTRA BEE',
    img: 'https://ebmx.com.au/wp-content/uploads/2026/04/520-chain.jpeg',
    href: '/bikes?cat=SurRon+Ultra+Bee+Modifications',
  },
  {
    name: 'Talaria Mods',
    shot: 'TALARIA',
    img: 'https://ebmx.com.au/wp-content/uploads/2023/04/Talaria-Foot-Pegs.png',
    href: '/bikes?cat=Talaria+Modifications',
  },
  {
    name: 'Batteries & Chargers',
    shot: 'BATTERY',
    img: 'https://ebmx.com.au/wp-content/uploads/2024/11/ezgif.com-webp-to-png-converter-7.png',
    href: '/bikes?cat=Batteries+and+Chargers',
  },
  {
    name: 'Motors & Controllers',
    shot: 'CONTROLLER',
    img: 'https://ebmx.com.au/wp-content/uploads/2025/10/V3-2-1-Harness.jpeg',
    href: '/bikes?cat=Motors+and+Controllers',
  },
  {
    name: 'Wheels & Tyres',
    shot: 'WHEELSET',
    img: 'https://ebmx.com.au/wp-content/uploads/2026/05/16-Complete-Rear-Wheel.jpeg',
    href: '/bikes?cat=Wheels+and+Tyres',
  },
]

export default function PartsModifications() {
  return (
    <section className={styles.section} aria-label="Parts and Modifications">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>SHOP BY CATEGORY</p>
          <h2 className={styles.h2}>Parts & Modifications</h2>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map(cat => (
            <Link key={cat.name} href={cat.href} className={styles.tile}>
              <div
                className={styles.tileImg}
                style={{ backgroundImage: `url('${cat.img}')` }}
                role="img"
                aria-label={cat.name}
              />
              <div className={styles.overlay} />
              <div className={styles.tileBar}>
                <span className={styles.tileName}>{cat.name.toUpperCase()}</span>
                <div className={styles.tileArrow} aria-hidden="true">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
