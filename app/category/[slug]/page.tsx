import { createClient } from 'next-sanity'
import { POSTS_BY_CATEGORY_QUERY } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import Link from 'next/link'
import Image from 'next/image'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await client.fetch(POSTS_BY_CATEGORY_QUERY, { categorySlug: slug })

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 border-b-2 border-red-600 pb-3">
        <h1 className="text-3xl font-extrabold text-gray-900 uppercase">
          Rubrique : <span className="text-red-600">{categoryName}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tous les articles et analyses de la catégorie {categoryName}
        </p>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500 text-lg">
            Aucun article n'a encore été publié dans cette rubrique.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm font-semibold text-red-600 hover:underline"
          >
            ← Retourner à la page d'accueil
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <article
              key={post._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              {post.mainImage && (
                <div className="relative w-full h-48">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mt-1 mb-2 hover:text-red-600 transition leading-snug">
                    <Link href={`/posts/${post.slug?.current}`}>
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                {post.author?.name && (
                  <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                    Par {post.author.name}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}