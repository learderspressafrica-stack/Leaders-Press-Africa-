import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { Resend } from 'resend'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-notify-secret')
    if (process.env.NOTIFY_SECRET && secret !== process.env.NOTIFY_SECRET) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })
    }

    const { title, slug, excerpt } = await req.json()
    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Titre et slug de l’article requis.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY non configurée.' },
        { status: 500 }
      )
    }

    const subscribers: string[] = await sanityClient.fetch(
      `*[_type == "newsletter" && defined(email)].email`
    )

    const uniqueEmails = Array.from(
      new Set(
        subscribers
          .map((e) => (typeof e === 'string' ? e.trim().toLowerCase() : ''))
          .filter((e) => e.includes('@'))
      )
    )

    if (uniqueEmails.length === 0) {
      return NextResponse.json(
        { message: 'Aucun abonné à notifier.', sent: 0 },
        { status: 200 }
      )
    }

    const resend = new Resend(apiKey)
    const articleUrl = `https://leaders-press-africa.vercel.app/posts/${slug}`

    const { error } = await resend.emails.send({
      from: 'CIME <onboarding@resend.dev>',
      to: uniqueEmails,
      subject: `Nouvelle publication sur CIME : ${title}`,
      html: `
        <h2>Nouvel article publié sur CIME</h2>
        <p><strong>${title}</strong></p>
        ${excerpt ? `<p>${excerpt}</p>` : ''}
        <p><a href="${articleUrl}">Lire l’article complet sur CIME</a></p>
      `,
    })

    if (error) {
      console.error('Erreur envoi Resend abonnés:', error)
      return NextResponse.json(
        { error: 'Échec de l’envoi aux abonnés.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Notifications envoyées.', sent: uniqueEmails.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur route notify-subscribers:', error)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}