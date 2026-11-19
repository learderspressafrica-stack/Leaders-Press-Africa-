import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'flashInfo',
  title: 'Flash Info (Bandeau défilant)',
  type: 'document',
  fields: [
    defineField({
      name: 'message',
      title: 'Texte du bandeau défilant',
      type: 'string',
      description: 'Écris ici l’information ou l’annonce qui défilera en haut du site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Lien optionnel (ex: /posts/mon-article)',
      type: 'string',
      description: 'Laisse vide si le texte est une simple annonce sans lien.',
    }),
    defineField({
      name: 'active',
      title: 'Afficher sur le site',
      type: 'boolean',
      description: 'Décoche pour retirer temporairement ce texte du bandeau.',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: 'Ordre / Priorité',
      type: 'number',
      description: 'Plus le chiffre est petit (ex: 1), plus le message passe en premier.',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Priorité croissante',
      name: 'priorityAsc',
      by: [{ field: 'priority', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'message',
      active: 'active',
      priority: 'priority',
    },
    prepare({ title, active, priority }) {
      return {
        title: title || 'Sans texte',
        subtitle: `${active ? 'Actif' : 'Masqué'} • Ordre ${priority ?? 1}`,
      }
    },
  },
})