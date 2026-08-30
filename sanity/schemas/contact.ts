export default {
  name: 'contact',
  title: 'Messages de Contact',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nom', type: 'string' },
    { name: 'email', title: 'E-mail', type: 'string' },
    { name: 'subject', title: 'Sujet', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'createdAt', title: 'Date d\'envoi', type: 'datetime' },
  ],
}