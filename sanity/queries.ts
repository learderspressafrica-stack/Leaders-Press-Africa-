import { groq } from 'next-sanity'

// Récupérer tous les articles pour la page d'accueil
export const POSTS_QUERY = groq`
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    "category": coalesce(category->title, category),
    "categorySlug": coalesce(category->slug.current, category),
    author->{name}
  }
`

// Récupérer un seul article par son slug
export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    publishedAt,
    "category": coalesce(category->title, category),
    author->{name, image}
  }
`

// Récupérer les articles d'une catégorie spécifique
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && (
    lower(coalesce(category->slug.current, category->title, category)) == lower($categorySlug)
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