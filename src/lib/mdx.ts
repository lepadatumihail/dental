import type { ImageProps } from 'next/image'

import { createPageMetadata } from '@/lib/canonical'
import logoSmall from '../../public/logo-small.png'

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export type MDXEntry<T> = T & { href: string; metadata: T }

export interface Article {
  slug: string
  date: string
  title: string
  description: string
  author: {
    name: string
    role: string
    image: ImagePropsWithOptionalAlt
  }
}

// Articles are credited to the clinic. Swap in the reviewing clinician (name,
// role, photo) once they have signed off on a post.
const CLINIC_AUTHOR: Article['author'] = {
  name: 'Prisma Clinic Marbella',
  role: 'Clinical team',
  image: { src: logoSmall },
}

// Single source for article data: the blog index reads this list and each
// `page.mdx` picks its own entry with `getArticle(slug)`.
const ARTICLES: Array<Article> = [
  {
    slug: 'botox-myths',
    date: '2025-04-06',
    title: 'Debunking Common Neuromodulator Myths: What You Need to Know in 2025',
    description:
      "Let's explore the most persistent misconceptions about neuromodulator treatments and provide evidence-based facts that can help you make informed decisions about aesthetic procedures.",
    author: CLINIC_AUTHOR,
  },
  {
    slug: 'top-3-innovations-transforming-dental-patient-care',
    date: '2025-02-18',
    title: 'Top 3 Innovations Transforming Dental Patient Care in 2025',
    description:
      'Discover the latest advances in dental care that are making treatments more comfortable, effective, and affordable. From pain-free injections to same-day restorations, these innovations are changing the dental experience.',
    author: CLINIC_AUTHOR,
  },
  {
    slug: 'dermal-fillers-types-and-longevity',
    date: '2025-02-01',
    title: 'A Complete Guide to Dermal Fillers: Types and Longevity',
    description:
      'Understanding the different types of dermal fillers available and how long each lasts can help you make informed decisions about your aesthetic treatments. This guide breaks down what you need to know.',
    author: CLINIC_AUTHOR,
  },
]

const ENTRIES: Array<MDXEntry<Article>> = ARTICLES.map((article) => ({
  ...article,
  metadata: article,
  href: `/blog/${article.slug}`,
})).sort((a, b) => b.date.localeCompare(a.date))

export function loadArticles(): Array<MDXEntry<Article>> {
  return ENTRIES
}

export function getArticle(slug: string): MDXEntry<Article> {
  const entry = ENTRIES.find((article) => article.slug === slug)
  if (!entry) {
    throw new Error(`Unknown blog article: ${slug}`)
  }
  return entry
}

// Posts are written in English only, so every locale canonicalises to `/en`.
export function createArticleMetadata(article: Article) {
  return createPageMetadata({
    path: `blog/${article.slug}`,
    locale: 'en',
    englishOnly: true,
    title: article.title,
    description: article.description,
    type: 'article',
    publishedTime: article.date,
    authors: [article.author.name],
  })
}
