'use client'
import { useRef, useState, useEffect } from 'react'
import styles from './StatsSection.module.css'

const STATS = [
  { value: 110, unit: 'KM/H', label: 'TOP SPEED', dec: false },
  { value: 140, unit: 'KM', label: 'MAX RANGE', dec: false },
  { value: 12.5, unit: 'KW', label: 'PEAK POWER', dec: true },
  { value: 580, unit: 'NM', label: 'WHEEL TORQUE', dec: false },
]

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [fired, setFired] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          setFired(true)
          const start = performance.now()
          const dur = 1500
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur)
            setProgress(easeOut(p))
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [fired])

  return (
    <section ref={ref} className={styles.section} aria-label="Statistics">
      <div className={styles.inner}>
        {STATS.map(s => {
          const display = s.dec
            ? (progress * s.value).toFixed(1)
            : Math.round(progress * s.value)
          return (
            <div key={s.label} className={styles.stat}>
              <div className={styles.num} aria-label={`${s.value} ${s.unit}`}>
                {display}<span className={styles.unit}>{s.unit}</span>
              </div>
              <div className={styles.label}>{s.label}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
