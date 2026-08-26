const newsletter = {
  name: 'newsletter',
  title: 'Abonnés Newsletter',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Adresse E-mail',
      type: 'string',
    },
    {
      name: 'createdAt',
      title: "Date d'abonnement",
      type: 'datetime',
    },
  ],
}

export default newsletter