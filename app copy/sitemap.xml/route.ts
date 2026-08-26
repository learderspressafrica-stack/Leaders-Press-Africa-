import { NextResponse } from 'next/server'
import { createClient, groq } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function GET() {
  const baseUrl = 'https://leaderspressafrica.com'

  const posts = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      title
    }`
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .map((post: any) => {
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : new Date().toISOString()
      return `
  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Leaders Press Africa</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${post.title.replace(/&/g, '&amp;')}</news:title>
    </news:news>
    <priority>0.9</priority>
  </url>`
    })
    .join('')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=60, stale-while-revalidate',
    },
  })
}