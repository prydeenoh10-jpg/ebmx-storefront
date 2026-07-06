import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  readTime: string
  featured: boolean
  image?: string
}

export interface PostData extends PostMeta {
  content: string
}

export function getAllPostMeta(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(f => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: f.replace('.mdx', ''),
        title: (data.title as string) ?? '',
        date: (data.date as string) ?? '',
        excerpt: (data.excerpt as string) ?? '',
        category: (data.category as string) ?? '',
        readTime: (data.readTime as string) ?? '',
        featured: data.featured === true,
        image: (data.image as string) || undefined,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostData(slug: string): PostData {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: (data.title as string) ?? '',
    date: (data.date as string) ?? '',
    excerpt: (data.excerpt as string) ?? '',
    category: (data.category as string) ?? '',
    readTime: (data.readTime as string) ?? '',
    featured: data.featured === true,
    image: (data.image as string) || undefined,
    content,
  }
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}
