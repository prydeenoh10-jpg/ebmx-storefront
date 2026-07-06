import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import styles from './PostBody.module.css'

const components = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className={styles.h2} {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className={styles.h3} {...props} />,
  h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 className={styles.h4} {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className={styles.p} {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className={styles.ul} {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className={styles.ol} {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className={styles.li} {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className={styles.verify} {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className={styles.tableWrap}>
      <table className={styles.table} {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => <th className={styles.th} {...props} />,
  td: (props: ComponentPropsWithoutRef<'td'>) => <td className={styles.td} {...props} />,
  tr: (props: ComponentPropsWithoutRef<'tr'>) => <tr className={styles.tr} {...props} />,
  a: ({ href, ...props }: ComponentPropsWithoutRef<'a'>) => {
    if (href?.startsWith('/')) {
      return <Link href={href} className={styles.a} {...props} />
    }
    return <a href={href} className={styles.a} target="_blank" rel="noopener noreferrer" {...props} />
  },
  strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong className={styles.strong} {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className={styles.em} {...props} />,
  hr: () => <hr className={styles.hr} />,
  code: (props: ComponentPropsWithoutRef<'code'>) => <code className={styles.code} {...props} />,
}

export default function PostBody({ source }: { source: string }) {
  return (
    <div className={styles.body}>
      <MDXRemote source={source} components={components} />
    </div>
  )
}
