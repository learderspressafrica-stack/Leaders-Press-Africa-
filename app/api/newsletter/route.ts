import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const normalizedEmail =
      typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      return NextResponse.json(
        { message: 'Adresse e-mail invalide.' },
        { status: 400 }
      )
    }

    // Vérifier si l'adresse est déjà abonnée (insensible à la casse)
    const existing = await client.fetch(
      `*[_type == "newsletter" && lower(email) == $email][0]{ _id }`,
      { email: normalizedEmail }
    )

    if (existing?._id) {
      return NextResponse.json(
        { message: 'Cette adresse est déjà abonnée à la newsletter de CIME.' },
        { status: 409 }
      )
    }

    await client.create({
      _type: 'newsletter',
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ message: 'Abonnement réussi !' }, { status: 201 })
  } catch (error) {
    console.error('Erreur API Newsletter:', error)
    return NextResponse.json({ message: 'Erreur serveur.' }, { status: 500 })
  }
}