import type { ImageProps } from 'next/image'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export type MDXEntry<T> = T & { href: string; metadata: T }

export interface Article {
  date: string
  title: string
  description: string
  author: {
    name: string
    role: string
    image: ImagePropsWithOptionalAlt
  }
}

export interface CaseStudy {
  date: string
  client: string
  title: string
  description: string
  summary: Array<string>
  logo: ImageProps['src']
  image: ImagePropsWithOptionalAlt
  service: string
  testimonial: {
    author: {
      name: string
      role: string
    }
    content: string
  }
}

// Hardcoded blog articles for production reliability
export function loadArticles(): Array<MDXEntry<Article>> {
  const articles: Array<MDXEntry<Article>> = [
    {
      date: '2025-04-06',
      title: 'Debunking Common Botox Myths: What You Need to Know in 2025',
      description:
        "Let's explore the most persistent misconceptions about Botox treatments and provide evidence-based facts that can help you make informed decisions about aesthetic procedures.",
      author: {
        name: 'Chelsea Hagon',
        role: 'Aesthetic Specialist',
        image: { src: imageChelseaHagon },
      },
      metadata: {
        date: '2025-04-06',
        title: 'Debunking Common Botox Myths: What You Need to Know in 2025',
        description:
          "Let's explore the most persistent misconceptions about Botox treatments and provide evidence-based facts that can help you make informed decisions about aesthetic procedures.",
        author: {
          name: 'Chelsea Hagon',
          role: 'Aesthetic Specialist',
          image: { src: imageChelseaHagon },
        },
      },
      href: '/blog/botox-myths',
    },
    {
      date: '2025-02-18',
      title: 'Top 3 Innovations Transforming Dental Patient Care in 2025',
      description:
        'Discover the latest advances in dental care that are making treatments more comfortable, effective, and affordable. From pain-free injections to same-day restorations, these innovations are changing the dental experience.',
      author: {
        name: 'Leslie Alexander',
        role: 'Co-Founder / Lead Dentist',
        image: { src: imageLeslieAlexander },
      },
      metadata: {
        date: '2025-02-18',
        title: 'Top 3 Innovations Transforming Dental Patient Care in 2025',
        description:
          'Discover the latest advances in dental care that are making treatments more comfortable, effective, and affordable. From pain-free injections to same-day restorations, these innovations are changing the dental experience.',
        author: {
          name: 'Leslie Alexander',
          role: 'Co-Founder / Lead Dentist',
          image: { src: imageLeslieAlexander },
        },
      },
      href: '/blog/top-3-innovations-transforming-dental-patient-care',
    },
    {
      date: '2025-02-01',
      title: 'A Complete Guide to Dermal Fillers: Types and Longevity',
      description:
        'Understanding the different types of dermal fillers available and how long each lasts can help you make informed decisions about your aesthetic treatments. This guide breaks down what you need to know.',
      author: {
        name: 'Angela Fisher',
        role: 'Aesthetic Nurse Specialist',
        image: { src: imageAngelaFisher },
      },
      metadata: {
        date: '2025-02-01',
        title: 'A Complete Guide to Dermal Fillers: Types and Longevity',
        description:
          'Understanding the different types of dermal fillers available and how long each lasts can help you make informed decisions about your aesthetic treatments. This guide breaks down what you need to know.',
        author: {
          name: 'Angela Fisher',
          role: 'Aesthetic Nurse Specialist',
          image: { src: imageAngelaFisher },
        },
      },
      href: '/blog/a-short-guide-to-component-naming',
    },
  ]

  // Sort by date (newest first)
  return articles.sort((a, b) => b.date.localeCompare(a.date))
}

// Keep the old function for case studies (if you have any)
async function loadEntries<T extends { date: string }>(
  directory: string,
  metaName: string,
): Promise<Array<MDXEntry<T>>> {
  const glob = (await import('fast-glob')).default
  return (
    await Promise.all(
      (await glob('**/page.mdx', { cwd: `src/app/[locale]/${directory}` })).map(
        async (filename) => {
          const metadata = (
            await import(`../app/[locale]/${directory}/${filename}`)
          )[metaName] as T
          return {
            ...metadata,
            metadata,
            href: `/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
          }
        },
      ),
    )
  ).sort((a, b) => b.date.localeCompare(a.date))
}

export function loadCaseStudies() {
  return loadEntries<CaseStudy>('work', 'caseStudy')
}
