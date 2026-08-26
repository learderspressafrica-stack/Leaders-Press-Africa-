import { createClient, groq } from 'next-sanity'
import { urlFor } from '@/sanity/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import Comments from '@/app/components/Comments'
import ShareButtons from '@/app/components/ShareButtons'
import AdBanner from '@/app/components/AdBanner'

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
  const post = await client.fetch(ARTICLE_QUERY, { slug })
  const relatedPosts = await client.fetch(RELATED_POSTS_QUERY, { slug })

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Article non trouvé</h1>
        <Link href="/" className="mt-4 inline-block text-red-600 hover:underline">
          ← Retourner à l'accueil
        </Link>
      </main>
    )
  }

  // BALISAGE STRUCTURÉ GOOGLE NEWSARTICLE (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    image: post.mainImage ? [urlFor(post.mainImage).url()] : [],
    datePublished: post.publishedAt || new Date().toISOString(),
    dateModified: post.publishedAt || new Date().toISOString(),
    description: post.excerpt || post.title,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Rédaction Leaders Press Africa',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Leaders Press Africa',
      logo: {
        '@type': 'ImageObject',
        url: 'https://leaderspressafrica.com/logo.png',
      },
    },
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* SCRIPT DE BALISAGE GOOGLE NEWS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* En-tête de l'article */}
      <article className="border-b border-gray-200 pb-12">
        {post.category && (
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6">
          {post.author?.name && (
            <span>
              Par <strong className="text-gray-800">{post.author.name}</strong>
            </span>
          )}
          {post.publishedAt && (
            <span>• {new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
          )}
        </div>

        {/* BOUTONS DE PARTAGE RÉSEAUX SOCIAUX */}
        <ShareButtons title={post.title} />

        {post.mainImage && (
          <div className="relative w-full h-[350px] md:h-[480px] rounded-lg overflow-hidden my-6 shadow-sm">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Corps du texte */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {post.body && <PortableText value={post.body} />}
        </div>
      </article>

      {/* BANNIÈRE PUBLICITAIRE FIN D'ARTICLE */}
      <AdBanner format="inline" />

      {/* ESPACE COMMENTAIRES */}
      <Comments postId={post._id} comments={post.comments || []} />

      {/* SECTION ARTICLES SIMILAIRES */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-6 border-l-4 border-red-600 pl-2">
            À lire aussi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related: any) => (
              <article key={related._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                {related.mainImage && (
                  <div className="relative w-full h-36">
                    <Image
                      src={urlFor(related.mainImage).url()}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    {related.category && (
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">
                        {related.category}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-gray-900 mt-1 hover:text-red-600 transition leading-snug line-clamp-2">
                      <Link href={`/posts/${related.slug?.current}`}>
                        {related.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}