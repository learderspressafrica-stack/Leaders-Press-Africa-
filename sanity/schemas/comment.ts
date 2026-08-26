import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Commentaire',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de l\'auteur',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Adresse E-mail',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Commentaire',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approuvé',
      type: 'boolean',
      description: 'Cochez cette case pour afficher le commentaire publiquement sur le site.',
      initialValue: true,
    }),
    defineField({
      name: 'post',
      title: 'Article associé',
      type: 'reference',
      to: [{ type: 'post' }],
    }),
  ],
})