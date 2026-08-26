export const post = {
  name: 'post',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: "Titre de l'article",
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Politique', value: 'Politique' },
          { title: 'Économie', value: 'Économie' },
          { title: 'Société', value: 'Société' },
          { title: 'Technologie', value: 'Technologie' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'excerpt',
      title: 'Chapeau / Résumé',
      type: 'text',
      rows: 3,
    },
    {
      name: 'body',
      title: "Corps de l'article",
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
}