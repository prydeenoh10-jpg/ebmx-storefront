'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { useReveal } from '@/lib/hooks/useReveal'
import styles from './CustomBuildsCTA.module.css'

export default function CustomBuildsCTA() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} className={styles.section} data-reveal="up" aria-label="Custom Builds">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>CUSTOM BUILDS</p>
        <h2 className={styles.h2}>
          Your Bike.<br />
          Your Rules.
        </h2>
        <p className={styles.sub}>
          Every EBMX custom build starts with a conversation. We spec it, source it,
          build it, tune it — then hand it over ready to rip. Workshop-built in Warners Bay.
        </p>
        <Link href="#" className={styles.cta}>
          Start A Build
        </Link>
      </div>
    </section>
  )
}
