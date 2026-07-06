import Link from 'next/link'
import type { PostMeta } from '@/lib/blog'
import styles from './FeaturedPost.module.css'

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.img} role="img" aria-label={post.title}>
        {post.image ? (
          <div className={styles.imgBg} style={{ backgroundImage: `url('${post.image}')` }} />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span className={styles.imgLabel}>[ FEATURED ]</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.badge}>FEATURED</span>
          <span className={styles.metaText}>{post.category.toUpperCase()} · {post.readTime.toUpperCase()}</span>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{fmtDate(post.date)}</span>
          <span className={styles.readMore}>Read Article →</span>
        </div>
      </div>
    </Link>
  )
}
