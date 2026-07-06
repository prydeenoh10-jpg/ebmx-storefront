import styles from './Marquee.module.css'

const ITEMS = [
  'FREE SHIPPING AUSTRALIA-WIDE',
  '2-YEAR BATTERY WARRANTY',
  'FINANCE FROM $39 / WEEK',
  'AUSTRALIAN OWNED & SERVICED',
]

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center' }}
      aria-hidden={hidden ?? undefined}
    >
      {ITEMS.map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span className={styles.item}>{item}</span>
          <span className={styles.dot} />
        </span>
      ))}
    </span>
  )
}

export default function Marquee() {
  return (
    <div className={styles.bar} aria-label="Announcements">
      <div className={styles.track}>
        <Track />
        <Track hidden />
      </div>
    </div>
  )
}
