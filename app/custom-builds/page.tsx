import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './custom-builds.module.css'

export const metadata: Metadata = {
  title: 'Custom Builds | EBMX — Warners Bay, NSW',
  description: 'We build bespoke SurRon and electric dirt bike setups from scratch. Tell us what you ride, where you ride it, and what you want it to do — we handle the rest.',
}

const steps = [
  {
    num: '01',
    title: 'Consultation',
    body: "Tell us your use case — trail riding, track days, backyard ripping, or something more ambitious. We'll match you with the right base platform and parts combination.",
  },
  {
    num: '02',
    title: 'Spec Sheet',
    body: "We build a full parts list: motor stage, battery upgrade path, suspension, wheels/tyres, controls, and any cosmetic work. You see costs upfront with no surprises.",
  },
  {
    num: '03',
    title: 'Build & Test',
    body: "Our workshop in Warners Bay handles everything in-house. Every build is dyno-checked and test-ridden before it leaves the bay door.",
  },
  {
    num: '04',
    title: 'Handover',
    body: "Pickup in person or freight anywhere in Australia. We walk you through the build, cover break-in procedure, and set up your controller profiles if applicable.",
  },
]

const examples = [
  {
    label: 'Trail Ripper',
    spec: 'Light Bee X · Stage 2 motor · extended battery · 19"/16" Excel rims · Tusk suspension',
    note: 'Built for weekend trail riding. Improved low-end torque, longer range, and a planted feel over roots and rocks.',
  },
  {
    label: 'Track Day Ultra',
    spec: 'Ultra Bee · Stage 3 controller · Pirelli MX tyres · billet triple clamp · data logger',
    note: 'Purpose-built for dedicated MX/enduro days. Higher peak power, aggressive suspension tune, and real-time power monitoring.',
  },
  {
    label: 'Backyard Ripper',
    spec: 'Light Bee · Eco controller tune · knobby tyres · bash plate · lowered suspension',
    note: 'Budget-conscious build for private property. Smooth power delivery, protected bottom end, beginner-friendly ergonomics.',
  },
]

export default function CustomBuildsPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Custom Builds</span>
          <h1 className={styles.heroTitle}>
            Your Bike.<br />
            <span className={styles.red}>Your Rules.</span>
          </h1>
          <p className={styles.heroSub}>
            Stock bikes are a starting point. We build SurRon and electric dirt bike setups
            specced exactly for how and where you ride — from a mild power bump to a full
            ground-up race build.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>Start a Build Enquiry</Link>
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.steps}>
            {steps.map(s => (
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNum}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example builds */}
      <section className={styles.examples}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Example Builds</h2>
          <p className={styles.sectionSub}>
            Every build is different. These are starting points, not templates.
          </p>
          <div className={styles.exampleGrid}>
            {examples.map(e => (
              <div key={e.label} className={styles.exampleCard}>
                <div className={styles.exampleLabel}>{e.label}</div>
                <div className={styles.exampleSpec}>{e.spec}</div>
                <p className={styles.exampleNote}>{e.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.bottomCta}>
        <div className={styles.sectionInner}>
          <h2 className={styles.ctaTitle}>Ready to spec your build?</h2>
          <p className={styles.ctaSub}>
            Drop us a message or call the workshop directly. We respond within one business day.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className={styles.ctaBtn}>Get in Touch</Link>
            <Link href="/bikes" className={styles.ctaSecondary}>Browse Stock Bikes</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
