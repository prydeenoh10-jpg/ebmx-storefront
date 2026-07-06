import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './workshop.module.css'

export const metadata: Metadata = {
  title: 'Workshop Services | EBMX — Warners Bay, NSW',
  description: 'SurRon and electric dirt bike servicing, upgrades, controller tuning, and pre-purchase inspections. Based in Warners Bay, NSW.',
}

const services = [
  {
    code: '01',
    name: 'Stage Upgrades',
    desc: "Motor and controller upgrades for more power, torque, or top speed — done right, not just flashed. We'll spec the right stage for your riding style and battery setup.",
    items: ['Stage 1 / 2 / 3 motor kits', 'Controller swap and programming', 'Dyno verification before and after'],
  },
  {
    code: '02',
    name: 'Battery Services',
    desc: 'Range and capacity upgrades, cell health checks, and BMS diagnostics. We also install extended-range battery packs on Light Bee and Ultra Bee platforms.',
    items: ['Extended-range battery installation', 'BMS diagnostics and reset', 'Cell balance check and report'],
  },
  {
    code: '03',
    name: 'Suspension Setup',
    desc: 'Factory suspension is set up for average rider weights. We set sag, rebound, and compression to your weight, speed, and terrain.',
    items: ['Sag setting and spring rate check', 'Fork and shock rebound/compression tune', 'Aftermarket suspension fitting'],
  },
  {
    code: '04',
    name: 'Wheels & Tyres',
    desc: 'Wheel builds, tyre fitting, and spoke tension check. We stock a range of knobby and semi-knobby fitments for trail, MX, and dual-purpose riding.',
    items: ['Tyre fitting and balancing', 'Aftermarket rim lacing', 'Excel, D.I.D, and Talon rim stocking'],
  },
  {
    code: '05',
    name: 'General Service',
    desc: "Annual service for bikes used regularly. We check everything that moves, lubricate what needs it, and flag anything that's on its way out before it becomes a problem.",
    items: ['Chain, sprocket, and brake inspection', 'Bearing and pivot lube', 'Electrical connector inspection and sealing'],
  },
  {
    code: '06',
    name: 'Pre-Purchase Inspection',
    desc: "Buying a used SurRon or other electric dirt bike? Bring it in before you hand over cash. We'll give you a written condition report covering motor, battery, frame, and electrics.",
    items: ['Motor condition and phase check', 'Battery state-of-health report', 'Frame and swingarm inspection'],
  },
]

export default function WorkshopServicesPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Workshop Services</span>
          <h1 className={styles.heroTitle}>
            Warners Bay&apos;s<br />
            <span className={styles.red}>Electric Dirt Bike</span><br />
            Workshop
          </h1>
          <p className={styles.heroSub}>
            From a quick tyre change to a full Stage 3 build — our workshop handles SurRon
            and electric dirt bike service work for riders across the Hunter and beyond.
            Everything done in-house. No subcontracting.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className={styles.services}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            {services.map(s => (
              <div key={s.code} className={styles.card}>
                <div className={styles.cardCode}>{s.code}</div>
                <h2 className={styles.cardName}>{s.name}</h2>
                <p className={styles.cardDesc}>{s.desc}</p>
                <ul className={styles.cardItems}>
                  {s.items.map(item => (
                    <li key={item} className={styles.cardItem}>
                      <span className={styles.bullet} aria-hidden="true">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book */}
      <section className={styles.book}>
        <div className={styles.inner}>
          <h2 className={styles.bookTitle}>Book Your Service</h2>
          <p className={styles.bookSub}>
            Call the workshop or send us a message with your bike model and what you need.
            We&apos;ll confirm availability and give you a quote before any work starts.
          </p>
          <div className={styles.bookContact}>
            <a href="tel:+61249530000" className={styles.bookPhone}>+61 2 4953 0000</a>
            <span className={styles.bookOr}>or</span>
            <Link href="/contact" className={styles.bookLink}>Send a message →</Link>
          </div>
          <div className={styles.hours}>
            <div className={styles.hoursRow}><span>Mon – Fri</span><span>8:00 am – 5:00 pm</span></div>
            <div className={styles.hoursRow}><span>Saturday</span><span>9:00 am – 2:00 pm</span></div>
            <div className={styles.hoursRow}><span>Sunday</span><span>Closed</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
