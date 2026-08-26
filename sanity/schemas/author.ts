export const author = {
  name: 'author',
  title: 'Auteur',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Photo de profil',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Biographie',
      type: 'text',
    },
  ],
}