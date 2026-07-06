'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/context/AuthContext'
import type { MedusaOrder } from '@/lib/medusa/auth'
import styles from './account.module.css'

export default function AccountClient() {
  const { customer, token, isLoading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<MedusaOrder[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  // Redirect to login if not authenticated after loading
  useEffect(() => {
    if (!isLoading && !customer) {
      router.replace('/account/login?next=/account')
    }
  }, [isLoading, customer, router])

  // Load orders once we have a token
  useEffect(() => {
    if (!token) return
    setOrdersLoading(true)
    import('@/lib/medusa/auth').then(({ getCustomerOrders }) => {
      getCustomerOrders(token).then(list => {
        setOrders(list)
        setOrdersLoading(false)
      }).catch(() => setOrdersLoading(false))
    })
  }, [token])

  if (isLoading || !customer) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Checking session…</div>
      </div>
    )
  }

  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.greeting}>
              {customer.first_name ? `Hey, ${customer.first_name}.` : 'My Account'}
            </h1>
            <div className={styles.email}>{customer.email}</div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
        </div>

        <h2 className={styles.sectionTitle}>Order History</h2>

        {ordersLoading && (
          <p className={styles.noOrders}>Loading orders…</p>
        )}

        {!ordersLoading && orders.length === 0 && (
          <p className={styles.noOrders}>
            No orders yet.{' '}
            <Link href="/bikes" style={{ color: 'var(--red)', textDecoration: 'none' }}>
              Browse the catalogue →
            </Link>
          </p>
        )}

        {orders.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderId}>#{order.display_id}</div>
            <div className={styles.orderInfo}>
              <div className={styles.orderDate}>
                {new Date(order.created_at).toLocaleDateString('en-AU', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </div>
              <div className={styles.orderStatus}>{order.status}</div>
            </div>
            <div className={styles.orderTotal}>
              A${order.total.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
