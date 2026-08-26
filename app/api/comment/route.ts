import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Jetons d'écriture Sanity
})

export async function POST(req: Request) {
  try {
    const { _id, name, email, comment } = await req.json()

    if (!_id || !name || !comment) {
      return NextResponse.json({ message: 'Champs requis manquants' }, { status: 400 })
    }

    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
      approved: true, // Ou false si tu souhaites une modération préalable
    })

    return NextResponse.json({ message: 'Commentaire envoyé avec succès' }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Erreur lors de la création du commentaire' }, { status: 500 })
  }
}