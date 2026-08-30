import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { Resend } from 'resend'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(request: Request) {
  try {
    const { name, email, comment, postId } = await request.json()

    if (!name || !email || !comment || !postId) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants.' },
        { status: 400 }
      )
    }

    // Enregistrement du commentaire dans Sanity
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: postId,
      },
      name,
      email,
      comment,
      approved: false,
      createdAt: new Date().toISOString(),
    })

    // Envoi de notification uniquement si la clé existe
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'Leaders Press Africa <onboarding@resend.dev>',
        to: 'learderspressafrica@gmail.com',
        subject: `Nouveau commentaire à valider de ${name}`,
        html: `
          <h2>Nouveau commentaire soumis</h2>
          <p><strong>Auteur :</strong> ${name} (${email})</p>
          <p><strong>Commentaire :</strong></p>
          <p>${comment}</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erreur API Comment:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la soumission du commentaire.' },
      { status: 500 }
    )
  }
}