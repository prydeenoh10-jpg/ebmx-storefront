import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgGradient} />
        <div className={styles.bgGrid} />
        <div className={styles.streak1} />
        <div className={styles.streak2} />
        <div className={styles.streak3} />
        <div className={styles.reel}>
          <span className={styles.reelLabel}>[ HERO REEL — RIDER ACTION ]</span>
        </div>
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>HIGH-PERFORMANCE ELECTRIC DIRT BIKES</p>

        <h1 className={styles.h1}>
          <span className={styles.h1Line1}>Think Electric.</span>
          <span className={styles.h1Line2}>
            Ride <span className={styles.h1Red}>Harder.</span>
          </span>
        </h1>

        <p className={styles.sub}>
          Australia&apos;s home of the SurRon e bike and every electric dirt bike worth
          riding. Race-grade torque, trail-ready range, and the country&apos;s deepest
          parts catalogue — every e motorbike built, tuned and serviced in-house.
        </p>

        <div className={styles.buttons}>
          <Link href="/bikes" className={styles.btnPrimary}>
            Shop The Lineup
          </Link>
          <Link href="#" className={styles.btnGhost}>
            Build Your Own
          </Link>
        </div>

        <div className={styles.badgeRow}>
          <div className={styles.googleBadge}>
            <span className={styles.googleG} aria-hidden="true">G</span>
            <div>
              <span className={styles.badgeStars} aria-label="5 stars">★★★★★</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className={styles.badgeScore}>4.9</span>
              </span>
              <span className={styles.badgeSub}>TOP-RATED SERVICE 2026</span>
            </div>
          </div>
          <span className={styles.riderCount}>2,400+ riders served</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollBar}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  )
}
