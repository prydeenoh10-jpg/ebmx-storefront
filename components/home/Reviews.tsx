import styles from './Reviews.module.css'

const REVIEWS = [
  {
    text: 'Picked up an LBX build from these guys and it absolutely rips. Workshop tuned it before handover, runs flawless. The whole team clearly actually ride — that comes through in every conversation.',
    name: 'Jaxon M.',
    loc: 'NEWCASTLE NSW',
    initial: 'J',
  },
  {
    text: 'Best in the business for SurRon mods. Ordered a Stage 2 kit, arrived fast, fitment was perfect and the instructions were clear. Asked a question on Instagram and got an actual useful answer within an hour.',
    name: 'Priya S.',
    loc: 'GOLD COAST QLD',
    initial: 'P',
  },
  {
    text: "Custom build came dyno-tuned and the power delivery is incredible. Been to three other shops before these guys and none of them came close. Worth every cent — this is my third bike from EBMX now.",
    name: 'Liam R.',
    loc: 'GEELONG VIC',
    initial: 'L',
  },
]

export default function Reviews() {
  return (
    <section className={styles.section} aria-label="Customer Reviews">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>RIDER REVIEWS</p>
            <h2 className={styles.h2}>Trusted By The Pack</h2>
          </div>
          <div className={styles.badge} aria-label="4.9 out of 5, 620 Google Reviews">
            <span className={styles.badgeStars}>★★★★★</span>
            <span className={styles.badgeScore}>4.9</span>
            <span className={styles.badgeCount}>620 GOOGLE REVIEWS</span>
          </div>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={styles.card} style={{ ['--delay' as string]: `${i * 120}ms` }}>
              <div className={styles.stars} aria-label="5 stars">★★★★★</div>
              <p className={styles.quote}>&ldquo;{r.text}&rdquo;</p>
              <div className={styles.reviewer}>
                <div className={styles.avatar} aria-hidden="true">{r.initial}</div>
                <div>
                  <div className={styles.reviewerName}>{r.name}</div>
                  <div className={styles.reviewerLoc}>{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
