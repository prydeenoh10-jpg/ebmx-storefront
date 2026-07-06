'use client'
import { useRef } from 'react'
import { useReveal } from '@/lib/hooks/useReveal'
import styles from './BrandStory.module.css'

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} data-reveal="up" className={styles.section} aria-label="Brand Story">
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>EST. 2019 — WARNERS BAY, NSW</p>
          <h2 className={styles.h2}>We Live This Stuff</h2>
          <p className={styles.body}>
            EBMX started in a garage in Warners Bay with a SurRon, a set of tools,
            and a group of mates who wanted to push the limits of what electric dirt bikes
            could do. Seven years later we&apos;re still the same crew — just with more bikes,
            a bigger workshop, and 1,800+ builds shipped across Australia.
          </p>
          <p className={styles.body}>
            Every product we stock, we&apos;ve run on our own bikes first. Every build we sign
            off on leaves our workshop tuned and ready to rip. No dropshipping, no fluff —
            just riders selling to riders.
          </p>
          <div className={styles.inlineStats}>
            <div className={styles.inlineStat}>
              <span className={styles.inlineNum}>7<span className={styles.inlinePlus}>+</span></span>
              <span className={styles.inlineLabel}>YEARS RIDING</span>
            </div>
            <div className={styles.inlineStat}>
              <span className={styles.inlineNum}>1,800</span>
              <span className={styles.inlineLabel}>BUILDS SHIPPED</span>
            </div>
          </div>
        </div>

        <div className={styles.photo}>
          <div className={styles.photoPlaceholder}>
            <span className={styles.photoLabel}>[ WORKSHOP PHOTO — WARNERS BAY ]</span>
          </div>
        </div>
      </div>
    </section>
  )
}
