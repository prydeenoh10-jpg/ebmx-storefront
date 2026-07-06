import type { Metadata } from 'next'
import { getAllPostMeta } from '@/lib/blog'
import BlogHero from '@/components/blog/BlogHero'
import FeaturedPost from '@/components/blog/FeaturedPost'
import PostCard from '@/components/blog/PostCard'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'The Workshop Journal | EBMX — SurRon & Electric Dirt Bike Blog',
  description:
    'Real answers on SurRon speeds, Australian legality, upgrade guides and build stories — from the team that builds them at EBMX in Warners Bay NSW.',
}

export default function BlogPage() {
  const posts = getAllPostMeta()
  const featured = posts.find(p => p.featured) ?? posts[0]
  const grid = posts.filter(p => p.slug !== featured?.slug)

  return (
    <div className={styles.page}>
      <BlogHero />

      <div className={styles.inner}>
        {featured && (
          <section className={styles.featuredSection} aria-label="Featured post">
            <FeaturedPost post={featured} />
          </section>
        )}

        {grid.length > 0 && (
          <section className={styles.gridSection} aria-label="All posts">
            <p className={styles.sectionLabel}>ALL ARTICLES</p>
            <div className={styles.grid}>
              {grid.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
