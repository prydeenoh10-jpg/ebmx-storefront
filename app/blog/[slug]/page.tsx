import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllSlugs, getPostData } from '@/lib/blog'
import PostBody from '@/components/blog/PostBody'
import PostCard from '@/components/blog/PostCard'
import { getAllPostMeta } from '@/lib/blog'
import styles from './page.module.css'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPostData(params.slug)
    return {
      title: post.title,
      description: post.excerpt,
    }
  } catch {
    return {}
  }
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPostPage({ params }: Props) {
  let post
  try {
    post = getPostData(params.slug)
  } catch {
    notFound()
  }

  const related = getAllPostMeta()
    .filter(p => p.slug !== params.slug)
    .slice(0, 3)

  return (
    <div className={styles.page}>
      {/* Post header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadLink}>HOME</Link>
            <span className={styles.sep}>/</span>
            <Link href="/blog" className={styles.breadLink}>BLOG</Link>
            <span className={styles.sep}>/</span>
            <span className={styles.breadCurrent}>{post.category.toUpperCase()}</span>
          </nav>

          <div className={styles.meta}>
            <span className={styles.catBadge}>{post.category}</span>
            <span className={styles.readTime}>{post.readTime}</span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          <p className={styles.dateLine}>
            <span>{fmtDate(post.date)}</span>
            <span className={styles.author}>EBMX Workshop Team</span>
          </p>
        </div>
      </header>

      {/* Article */}
      <div className={styles.article}>
        <div className={styles.articleInner}>
          {post.image && (
            <div
              className={styles.heroImg}
              style={{ backgroundImage: `url('${post.image}')` }}
              role="img"
              aria-label={post.title}
            />
          )}
          {!post.image && (
            <div className={styles.heroImgPlaceholder} aria-hidden="true" />
          )}

          <PostBody source={post.content} />
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <p className={styles.relatedLabel}>MORE FROM THE WORKSHOP JOURNAL</p>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
