import Link from 'next/link'
import type { PostMeta } from '@/lib/blog'
import styles from './PostCard.module.css'

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.img} role="img" aria-label={post.title}>
        {post.image ? (
          <div className={styles.imgBg} style={{ backgroundImage: `url('${post.image}')` }} />
        ) : (
          <div className={styles.imgPlaceholder} />
        )}
        <span className={styles.catBadge}>{post.category.toUpperCase()}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{fmtDate(post.date)}</span>
          <span className={styles.readTime}>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}
