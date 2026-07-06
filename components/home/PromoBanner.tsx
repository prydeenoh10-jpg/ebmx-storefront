'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { useReveal } from '@/lib/hooks/useReveal'
import styles from './PromoBanner.module.css'

export default function PromoBanner() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} data-reveal="up" className={styles.banner}>
      <div className={styles.circle} aria-hidden="true" />
      <div className={styles.inner}>
        <div>
          <p className={styles.eyebrow}>OUR PROMISE</p>
          <p className={styles.promise}>
            We exist to support the Australian electric dirt-bike scene with
            parts, builds and tuning at prices every rider can afford.
          </p>
        </div>

        <div className={styles.ctas}>
          <Link href="#" className={styles.ctaPrimary}>
            Shop Kool Rides Collection
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="#" className={styles.ctaGhost}>
            EDB V3 X-9000 Controller Kit
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
