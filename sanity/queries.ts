import { groq } from 'next-sanity'

// Récupérer tous les articles pour la page d'accueil
export const POSTS_QUERY = groq`
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    "category": coalesce(category->title, category, categories[0]->title, categories[0]),
    "categorySlug": coalesce(category->slug.current, category, categories[0]->slug.current, categories[0]),
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
    "category": coalesce(category->title, category, categories[0]->title, categories[0]),
    author->{name, image}
  }
`

// Récupérer les articles d'une catégorie spécifique
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    category,
    "categoryTitle": coalesce(category->title, category),
    "categorySlug": coalesce(category->slug.current, category),
    "categoriesList": coalesce(categories[]->slug.current, categories[]->title, categories[], []),
    author->{name}
  }
`