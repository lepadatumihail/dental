import type { Metadata } from 'next'

import { FinalCta } from '@/components/FinalCta'
import { PageIntro } from '@/components/PageIntro'
import { Link } from '@/i18n/navigation'
import { createPageMetadata } from '@/lib/canonical'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'
import { Arrow } from '@/lib/rich'

interface PageProps {
  params: { locale: string }
}

// Generate static params for all locales
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params

  // The index and its articles are English only, so every locale
  // canonicalises to `/en/blog`.
  return createPageMetadata({
    path: 'blog',
    locale,
    englishOnly: true,
    title: 'Health News & Clinical Updates',
    description:
      'Stay up-to-date with the latest health news, treatments, and advice from our experienced medical team.',
  })
}

export default async function Blog() {
  const articles = loadArticles()

  return (
    <>
      <PageIntro eyebrow="Blog" title="Health News & Clinical Updates">
        <p>
          Stay informed with the latest health information, treatment
          innovations, and medical advice from our expert clinical team.
        </p>
      </PageIntro>

      <section className="section-block">
        <div className="article-list">
          {articles.map((article) => (
            <Link key={article.href} href={article.href}>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <small>
                  {article.author.name} · {article.author.role}
                </small>
              </div>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  )
}
