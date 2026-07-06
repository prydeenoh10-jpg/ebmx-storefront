import styles from './PlatformStrip.module.css'

const PLATFORMS = ['SUR-RON', 'TALARIA', 'LIGHT BEE', 'ULTRA BEE', 'E-RIDE PRO']

export default function PlatformStrip() {
  return (
    <div className={styles.strip}>
      <div className={styles.inner}>
        <span className={styles.label}>BUILT &amp; TUNED FOR</span>
        {PLATFORMS.map((p) => (
          <span key={p} className={styles.platform}>{p}</span>
        ))}
      </div>
    </div>
  )
}
