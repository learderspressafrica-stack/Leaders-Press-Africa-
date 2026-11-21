import { createClient, groq } from 'next-sanity'
import { urlFor } from '@/sanity/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import Comments from '@/app/components/Comments'
import ShareButtons from '@/app/components/ShareButtons'
import AdBanner from '@/app/components/AdBanner'
import { estimateReadingTime } from '@/app/lib/readingTime'

export const revalidate = 0

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const ARTICLE_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    publishedAt,
    excerpt,
    "category": coalesce(category->title, category),
    author->{name, image},
    "comments": *[_type == "comment" && references(^._id) && approved == true] | order(_createdAt asc) {
      _id,
      name,
      comment,
      _createdAt
    }
  }
`

const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && slug.current != $slug] | order(_createdAt desc)[0..2] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    "category": coalesce(category->title, category),
    author->{name}
  }
`

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await client.fetch(ARTICLE_QUERY, { slug }, { cache: 'no-store' })
  const relatedPosts = await client.fetch(RELATED_POSTS_QUERY, { slug }, { cache: 'no-store' })

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Article non trouvé</h1>
        <Link href="/" className="mt-4 inline-block text-red-600 hover:underline">
          ← Retour à l&apos;accueil
        </Link>
      </main>
    )
  }

  const readingTime = estimateReadingTime(post.body || post.excerpt || '')
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-xs font-semibold text-red-600 hover:underline">
          ← Retour aux actualités
        </Link>
      </div>

      {post.category && (
        <span className="inline-block text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
          {post.category}
        </span>
      )}

      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 mb-6 pb-4 border-b border-gray-200">
        {post.author?.name && (
          <span className="font-semibold text-gray-800">Par {post.author.name}</span>
        )}
        {formattedDate && (
          <>
            <span>•</span>
            <span>{formattedDate}</span>
          </>
        )}
        <span>•</span>
        <span className="inline-flex items-center font-semibold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full">
          {readingTime}
        </span>
      </div>

      {post.mainImage && (
        <div className="relative w-full h-[260px] sm:h-[420px] rounded-lg overflow-hidden shadow-sm mb-6">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {post.excerpt && (
        <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mb-6 bg-gray-100 p-4 rounded-lg border-l-4 border-red-600">
          {post.excerpt}
        </p>
      )}

      <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed space-y-4 mb-8">
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>

      <div className="my-6">
        <ShareButtons title={post.title} />
      </div>

      <AdBanner format="inline" />

      {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
        <section className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">À lire aussi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((item: any) => (
              <Link
                key={item._id}
                href={`/posts/${item.slug?.current}`}
                className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-red-500 transition"
              >
                {item.mainImage && (
                  <div className="relative w-full h-28">
                    <Image
                      src={urlFor(item.mainImage).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-3">
                  {item.category && (
                    <span className="text-[10px] font-bold text-red-600 uppercase block mb-1">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-xs font-bold text-gray-900 group-hover:text-red-600 transition line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 pt-8 border-t border-gray-200">
        <Comments postId={post._id} comments={post.comments || []} />
      </div>
    </article>
  )
}

