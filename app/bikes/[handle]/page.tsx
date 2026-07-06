import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProduct, getProducts } from '@/lib/commerce'
import Gallery from '@/components/product/Gallery'
import BuyBox from '@/components/product/BuyBox'
import RelatedProducts from '@/components/product/RelatedProducts'
import styles from './page.module.css'

interface Props {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.handle)
  if (!product) return {}
  return {
    title: `${product.name} | EBMX Australia`,
    description: product.description || `Buy ${product.name} at Electric Dirt Bike Australia.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const [product, allBikes] = await Promise.all([
    getProduct(params.handle),
    getProducts({ category: 'Bikes and E-Motos', limit: 8 }),
  ])

  if (!product) notFound()

  const related = allBikes.filter(p => p.id !== product.id).slice(0, 4)

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <span>HOME</span>
          <span className={styles.sep}>/</span>
          <span>BIKES</span>
          <span className={styles.sep}>/</span>
          <span className={styles.breadCurrent}>{product.name}</span>
        </nav>

        {/* Product layout */}
        <div className={styles.layout}>
          <Gallery product={product} />
          <BuyBox product={product} />
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && <RelatedProducts products={related} />}
    </div>
  )
}
