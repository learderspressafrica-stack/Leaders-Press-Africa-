import { createClient, groq } from 'next-sanity'
import { urlFor } from '@/sanity/image'
import Link from 'next/link'
import Image from 'next/image'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const SEARCH_QUERY = groq`
  *[_type == "post" && (
    title match $searchTerm || 
    excerpt match $searchTerm
  )] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    "category": coalesce(category->title, category),
    author->{name}
  }
`

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ''
  const posts = query ? await client.fetch(SEARCH_QUERY, { searchTerm: `*${query}*` }) : []

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 border-b-2 border-red-600 pb-3">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Résultats de recherche pour : <span className="text-red-600">"{query}"</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {posts.length} article(s) trouvé(s)
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          Aucun article ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <article key={post._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
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
                  {post.category && (
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                      {post.category}
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-gray-900 mt-1 mb-2 hover:text-red-600 transition">
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