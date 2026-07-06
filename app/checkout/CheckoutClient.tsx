'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { useAuth } from '@/lib/context/AuthContext'
import {
  getAusRegionId, createMedusaCart, addMedusaLineItem,
  updateMedusaCart, autoSelectShipping, initializePayment, completeMedusaCart,
  getVariantIdForHandle,
} from '@/lib/medusa/cart'
import styles from './checkout.module.css'

// Stripe Elements — loaded lazily so they don't break mock mode
import type { StripeElementsOptions } from '@stripe/stripe-js'

const IS_MEDUSA = process.env.NEXT_PUBLIC_DATA_SOURCE === 'medusa'
const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''

type Step = 'contact' | 'address' | 'payment' | 'complete'

interface AddressData {
  firstName: string; lastName: string
  address1: string; city: string; province: string; postalCode: string
}

const EMPTY_ADDRESS: AddressData = {
  firstName: '', lastName: '', address1: '', city: '', province: '', postalCode: '',
}

export default function CheckoutClient() {
  const { cart, clearCart } = useCart()
  const { token, customer, isLoading: authLoading } = useAuth()
  const [step, setStep] = useState<Step>('contact')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState<AddressData>(EMPTY_ADDRESS)
  const [medusaCartId, setMedusaCartId] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // When logged in: pre-fill email and skip the contact step
  useEffect(() => {
    if (!authLoading && customer && step === 'contact') {
      setEmail(customer.email)
      setStep('address')
    }
  }, [authLoading, customer, step])

  const gst = cart.subtotal * (1 / 11)

  // ---- Step 1: Contact → Step 2 ----
  async function handleContact(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStep('address')
  }

  // ---- Step 2: Address → create Medusa cart, init payment → Step 3 ----
  async function handleAddress(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const regionId = await getAusRegionId()
      if (!regionId) throw new Error('Australia region not found. Run the backend setup steps.')

      // Create Medusa cart — pass auth token so it's associated with the customer
      const mCart = await createMedusaCart(regionId, email, token ?? undefined)

      // Add each line item (resolve variant_id by product handle)
      for (const line of cart.lines) {
        const variantId = await getVariantIdForHandle(line.handle)
        if (!variantId) {
          console.warn(`No variant found for handle: ${line.handle}`)
          continue
        }
        await addMedusaLineItem(mCart.id, variantId, line.quantity)
      }

      // Update cart with shipping address
      await updateMedusaCart(mCart.id, {
        email,
        shipping_address: {
          first_name: address.firstName,
          last_name: address.lastName,
          address_1: address.address1,
          city: address.city,
          province: address.province,
          postal_code: address.postalCode,
          country_code: 'au',
        },
      })

      // Attach first available shipping method (required before cart completion)
      await autoSelectShipping(mCart.id)

      // Initialise Stripe payment session → client_secret
      const secret = await initializePayment(mCart.id)
      if (!secret) throw new Error('Could not initialise Stripe payment session. Ensure Stripe is configured in the backend.')

      setMedusaCartId(mCart.id)
      setClientSecret(secret)
      setStep('payment')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  // ---- Step 3: Payment confirmation callback ----
  const handlePaymentSuccess = useCallback(async () => {
    if (!medusaCartId) return
    setLoading(true)
    setError(null)
    try {
      const result = await completeMedusaCart(medusaCartId)
      if (result.type === 'order') {
        clearCart()
        setOrderId(`#${result.data.display_id}`)
        setStep('complete')
      } else {
        throw new Error('Cart completion did not return an order.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not complete order')
    } finally {
      setLoading(false)
    }
  }, [medusaCartId])

  // ---- No-backend mock notice ----
  if (!IS_MEDUSA) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.mockNote}>
            <h1 className={styles.mockTitle}>Checkout</h1>
            <p className={styles.mockText}>
              Online checkout requires the Medusa backend. Set{' '}
              <code>NEXT_PUBLIC_DATA_SOURCE=medusa</code> and complete the
              backend setup steps, or call us on{' '}
              <strong>1300 003 269</strong> to order.
            </p>
            <Link href="/contact" className={styles.mockLink}>Contact the Workshop</Link>
          </div>
        </div>
      </div>
    )
  }

  // ---- Order complete ----
  if (step === 'complete') {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.confirm}>
            <div className={styles.confirmIcon}>✓</div>
            <h1 className={styles.confirmTitle}>Order Placed!</h1>
            <div className={styles.confirmOrder}>Order {orderId}</div>
            <p className={styles.confirmText}>
              Thanks — we&apos;ll be in touch within one business day to confirm
              your order and arrange delivery or pickup.
            </p>
            <Link href="/bikes" className={styles.mockLink}>Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Checkout</h1>
        <div className={styles.layout}>
          {/* Left: steps */}
          <div className={styles.steps}>
            {/* Step 1 — Contact */}
            <div className={styles.stepBlock}>
              <div className={styles.stepHeader}>
                <div className={`${styles.stepNum} ${step !== 'contact' ? styles.done : ''}`}>1</div>
                <span className={styles.stepLabel}>Contact</span>
                {step !== 'contact' && <span className={styles.stepSummary}>{email}</span>}
              </div>
              {step === 'contact' && (
                <form className={styles.stepBody} onSubmit={handleContact}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="coEmail">Email address</label>
                    <input
                      id="coEmail" type="email" className={styles.input}
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com" required
                    />
                  </div>
                  <button className={styles.nextBtn} type="submit">Continue to Address</button>
                </form>
              )}
            </div>

            {/* Step 2 — Shipping address */}
            <div className={styles.stepBlock}>
              <div className={styles.stepHeader}>
                <div className={`${styles.stepNum} ${step === 'payment' ? styles.done : ''}`}>2</div>
                <span className={styles.stepLabel}>Shipping Address</span>
                {step === 'payment' && (
                  <span className={styles.stepSummary}>{address.city}, NSW</span>
                )}
              </div>
              {step === 'address' && (
                <form className={styles.stepBody} onSubmit={handleAddress}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>First name</label>
                      <input className={styles.input} required value={address.firstName}
                        onChange={e => setAddress(a => ({ ...a, firstName: e.target.value }))}
                        placeholder="Jordan" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Last name</label>
                      <input className={styles.input} required value={address.lastName}
                        onChange={e => setAddress(a => ({ ...a, lastName: e.target.value }))}
                        placeholder="Blake" />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Street address</label>
                    <input className={styles.input} required value={address.address1}
                      onChange={e => setAddress(a => ({ ...a, address1: e.target.value }))}
                      placeholder="123 Street Name" />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>City / Suburb</label>
                      <input className={styles.input} required value={address.city}
                        onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                        placeholder="Warners Bay" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>State</label>
                      <select className={styles.select} value={address.province}
                        onChange={e => setAddress(a => ({ ...a, province: e.target.value }))}>
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.field} style={{ maxWidth: 140 }}>
                    <label className={styles.label}>Postcode</label>
                    <input className={styles.input} required value={address.postalCode}
                      onChange={e => setAddress(a => ({ ...a, postalCode: e.target.value }))}
                      placeholder="2282" maxLength={4} />
                  </div>
                  {error && <div className={styles.error}>{error}</div>}
                  <button className={styles.nextBtn} type="submit" disabled={loading}>
                    {loading ? 'Setting up payment…' : 'Continue to Payment'}
                  </button>
                </form>
              )}
            </div>

            {/* Step 3 — Payment */}
            <div className={styles.stepBlock}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNum}>3</div>
                <span className={styles.stepLabel}>Payment</span>
              </div>
              {step === 'payment' && clientSecret && STRIPE_PK && (
                <StripePaymentStep
                  clientSecret={clientSecret}
                  stripePk={STRIPE_PK}
                  onSuccess={handlePaymentSuccess}
                  loading={loading}
                  error={error}
                />
              )}
              {step === 'payment' && !STRIPE_PK && (
                <div className={styles.stepBody}>
                  <div className={styles.error}>
                    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Add it to .env.local.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: order summary */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            {cart.lines.map(line => (
              <div key={line.lineId} className={styles.summaryLine}>
                <div
                  className={styles.summaryImg}
                  style={{ backgroundImage: `url(${line.image})` }}
                />
                <span className={styles.summaryName}>{line.name}</span>
                <span className={styles.summaryQty}>×{line.quantity}</span>
              </div>
            ))}
            <div className={styles.summaryDiv} />
            <div className={styles.summaryRow}>
              <span>Subtotal (ex. GST)</span>
              <span>A${(cart.subtotal - gst).toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>GST (10%)</span>
              <span>A${gst.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total (inc. GST)</span>
              <span>A${cart.subtotal.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ----- Stripe Elements sub-component (lazy-imported) -----
// Rendered only when we have clientSecret and stripePk

function StripePaymentStep({
  clientSecret, stripePk, onSuccess, loading, error,
}: {
  clientSecret: string
  stripePk: string
  onSuccess: () => Promise<void>
  loading: boolean
  error: string | null
}) {
  // Dynamic imports keep Stripe out of the initial bundle
  const [StripeComponents, setStripeComponents] = useState<{
    Elements: typeof import('@stripe/react-stripe-js').Elements
    PaymentElement: typeof import('@stripe/react-stripe-js').PaymentElement
    useStripe: typeof import('@stripe/react-stripe-js').useStripe
    useElements: typeof import('@stripe/react-stripe-js').useElements
    stripePromise: ReturnType<typeof import('@stripe/stripe-js').loadStripe>
  } | null>(null)

  useEffect(() => {
    Promise.all([
      import('@stripe/react-stripe-js'),
      import('@stripe/stripe-js').then(m => m.loadStripe(stripePk)),
    ]).then(([reactStripe, stripe]) => {
      setStripeComponents({
        Elements: reactStripe.Elements,
        PaymentElement: reactStripe.PaymentElement,
        useStripe: reactStripe.useStripe,
        useElements: reactStripe.useElements,
        stripePromise: Promise.resolve(stripe),
      })
    })
  }, [stripePk])

  if (!StripeComponents) {
    return <div className={styles.stepBody}><p style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--font-jetbrains)' }}>Loading payment form…</p></div>
  }

  const { Elements, stripePromise } = StripeComponents

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
      variables: { colorPrimary: '#ff2d20', borderRadius: '0px' },
    },
  }

  return (
    <div className={styles.stepBody}>
      <Elements stripe={stripePromise} options={options}>
        <StripeForm
          useStripe={StripeComponents.useStripe}
          useElements={StripeComponents.useElements}
          PaymentElement={StripeComponents.PaymentElement}
          onSuccess={onSuccess}
          loading={loading}
          error={error}
        />
      </Elements>
    </div>
  )
}

function StripeForm({
  useStripe, useElements, PaymentElement, onSuccess, loading, error,
}: {
  useStripe: ReturnType<typeof import('@stripe/react-stripe-js').useStripe> extends infer R ? () => R : never
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useElements: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PaymentElement: any
  onSuccess: () => Promise<void>
  loading: boolean
  error: string | null
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [stripeError, setStripeError] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setPaying(true)
    setStripeError(null)

    const { error: stripeErr } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (stripeErr) {
      setStripeError(stripeErr.message ?? 'Payment failed')
      setPaying(false)
      return
    }

    await onSuccess()
    setPaying(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className={styles.stripeWrapper}>
        <PaymentElement />
      </div>
      {(stripeError || error) && (
        <div className={styles.error}>{stripeError ?? error}</div>
      )}
      <button className={styles.nextBtn} type="submit" disabled={!stripe || paying || loading}>
        {paying || loading ? 'Processing…' : 'Pay Now'}
      </button>
    </form>
  )
}
