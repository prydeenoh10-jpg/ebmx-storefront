import styles from './BlogHero.module.css'

export default function BlogHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>THE WORKSHOP JOURNAL</p>
        <h1 className={styles.h1}>
          <span className={styles.line1}>SurRon Speed,</span>
          <span className={styles.line2}>
            Specs &amp; <span className={styles.red}>The Law</span>
          </span>
        </h1>
        <p className={styles.sub}>
          Straight answers on how fast a SurRon goes, real top-speed numbers for
          every model, and whether SurRons are legal to ride in Australia — from
          the team that builds them.
        </p>
      </div>
    </div>
  )
}
