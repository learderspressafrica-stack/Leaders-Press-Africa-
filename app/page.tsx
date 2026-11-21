export const revalidate = 0

import { createClient } from 'next-sanity'
import { POSTS_QUERY } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { estimateReadingTime } from '@/app/lib/readingTime'
import Link from 'next/link'
import Image from 'next/image'
import AdBanner from '@/app/components/AdBanner'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export default async function HomePage() {
  const posts = await client.fetch(POSTS_QUERY, {}, { next: { revalidate: 0 } })

  if (!posts || posts.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Aucun article disponible pour le moment.</p>
      </main>
    )
  }

  const mainPost = posts[0]
  const recentPosts = posts.slice(1, 4)
  const mainReadingTime = estimateReadingTime(mainPost.body || mainPost.excerpt || mainPost.title || '')

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* BANNIÈRE PUBLICITAIRE HAUT DE PAGE */}
      <AdBanner format="horizontal" />

      {/* SECTION PRINCIPALE : À LA UNE + FIL D'ACTUALITÉ (SIDEBAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 border-b border-gray-200 pb-10">

        {/* BLOC GAUCHE : UNE + RECENTS (8 COLS) */}
        <div className="lg:col-span-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-4 border-l-4 border-red-600 pl-2">
            À la une
          </h2>

          <div className="mb-8">
            {mainPost.mainImage && (
              <div className="relative w-full aspect-[16/10] max-h-[420px] rounded-lg overflow-hidden shadow-sm mb-4 bg-gray-100">
                <Image
                  src={urlFor(mainPost.mainImage).url()}
                  alt={mainPost.title || 'Article à la une CIME'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
              {mainPost.category && (
                <span className="text-red-600">
                  {mainPost.category}
                </span>
              )}
              {mainPost.category && <span className="text-gray-300">•</span>}
              <span className="text-gray-500 font-semibold normal-case">
                {mainReadingTime}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1 mb-3 hover:text-red-600 transition leading-snug">
              <Link href={`/posts/${mainPost.slug?.current}`}>
                {mainPost.title}
              </Link>
            </h1>
            {mainPost.excerpt && (
              <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3 mb-3">
                {mainPost.excerpt}
              </p>
            )}
            {mainPost.author?.name && (
              <p className="text-xs text-gray-500 font-medium">
                Par <span className="text-gray-800">{mainPost.author.name}</span>
              </p>
            )}
          </div>

          {/* Grille secondaire sous la UNE */}
          {recentPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              {recentPosts.map((post: any) => (
                <article key={post._id} className="flex flex-col">
                  {post.mainImage && (
                    <div className="relative w-full aspect-[16/10] rounded overflow-hidden mb-2 bg-gray-100">
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title || 'Article récent CIME'}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  {post.category && (
                    <span className="text-[10px] font-bold text-red-600 uppercase">
                      {post.category}
                    </span>
                  )}
                  <h3 className="text-xs font-bold text-gray-900 mt-1 hover:text-red-600 transition leading-snug line-clamp-2">
                    <Link href={`/posts/${post.slug?.current}`}>
                      {post.title}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* BLOC DROITE : SIDEBAR FIL D'ACTUALITÉ (4 COLS) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-4 border-b border-gray-300 pb-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                Fil d&apos;actualité / Flash Info
              </h2>
            </div>

            <div className="space-y-4 divide-y divide-gray-200">
              {posts.slice(0, 6).map((post: any, index: number) => (
                <div key={post._id} className={`${index !== 0 ? 'pt-3' : ''}`}>
                  <span className="text-[10px] font-semibold text-gray-400 block mb-0.5">
                    Dernières minutes
                  </span>
                  <Link
                    href={`/posts/${post.slug?.current}`}
                    className="text-xs font-bold text-gray-800 hover:text-red-600 transition leading-tight block"
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* BANNIÈRE PUBLICITAIRE LATÉRALE (SIDEBAR) */}
          <AdBanner format="sidebar" />
        </aside>

      </div>
    </main>
  )
}
