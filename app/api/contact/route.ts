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
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants.' },
        { status: 400 }
      )
    }

    // 1. Enregistrement dans Sanity Studio
    await client.create({
      _type: 'contact',
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    })

    // 2. Envoi d'e-mail uniquement si la clé Resend est présente
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'Leaders Press Africa <onboarding@resend.dev>',
        to: 'learderspressafrica@gmail.com',
        subject: `Nouveau message de contact : ${subject || 'Sans sujet'}`,
        html: `
          <h2>Nouveau message reçu depuis le site Leaders Press Africa</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject || 'Non renseigné'}</p>
          <hr />
          <p><strong>Message :</strong></p>
          <p>${message}</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erreur API Contact:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l’envoi du message.' },
      { status: 500 }
    )
  }
}