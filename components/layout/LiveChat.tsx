'use client'
import Script from 'next/script'

const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID

export default function LiveChat() {
  if (!PROPERTY_ID || !WIDGET_ID) return null
  return (
    <Script
      src={`https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  )
}
