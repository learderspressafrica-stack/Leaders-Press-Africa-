import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { createClient } from 'next-sanity'
import { FLASH_INFOS_QUERY } from '@/sanity/queries'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import FlashTicker, { FlashInfoItem } from './components/FlashTicker'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "CIME | L'information africaine en temps réel",
    template: '%s | CIME',
  },
  description:
    "Média d'actualité, d'analyse et de décryptage des enjeux africains et internationaux.",
}

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dc6zf0ru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let flashInfos: FlashInfoItem[] = []

  try {
    flashInfos = await sanityClient.fetch(FLASH_INFOS_QUERY, {}, { cache: 'no-store' })
  } catch {
    flashInfos = []
  }

  return (
    <html lang="fr">
      <body
        className={`${inter.className} bg-gray-50 min-h-screen text-gray-900 flex flex-col overflow-x-hidden`}
      >
        <Header />
        <FlashTicker items={flashInfos} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
