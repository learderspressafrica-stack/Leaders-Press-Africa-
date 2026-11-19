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

    const payload = await req.json()
    
    // Supporte le format direct { title, slug } ET le format natif Sanity { title, slug: { current } }
    const title = payload?.title
    const slug = typeof payload?.slug === 'string' ? payload.slug : payload?.slug?.current
    const excerpt = payload?.excerpt || ''

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

    // Envoi en copie cachée (bcc) pour protéger la confidentialité des abonnés
    const { error } = await resend.emails.send({
      from: 'CIME <onboarding@resend.dev>',
      to: 'learderspressafrica@gmail.com',
      bcc: uniqueEmails,
      subject: `Nouvelle publication sur CIME : ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Nouvel article publié sur CIME</h2>
          <h3 style="color: #111827;">${title}</h3>
          ${excerpt ? `<p style="color: #4b5563;">${excerpt}</p>` : ''}
          <p style="margin-top: 24px;">
            <a href="${articleUrl}" style="background-color: #dc2626; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Lire l’article complet sur CIME
            </a>
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Erreur envoi Resend abonnés:', error)
      return NextResponse.json(
        { error: 'Échec de l’envoi aux abonnés.', details: error },
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