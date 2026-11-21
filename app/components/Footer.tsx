'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('Merci pour votre abonnement !')
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Une erreur est survenue.')
      }
    } catch {
      setStatus('error')
      setMessage('Erreur de connexion.')
    }
  }

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold tracking-wider text-red-500 mb-4">CIME</h3>
          <p className="text-gray-400 text-sm">
            Média d&apos;actualité, d&apos;analyse et de décryptage. L&apos;information africaine en temps réel avec une vision indépendante.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 border-b border-gray-700 pb-2">
            Rubriques
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition">À la une</Link></li>
            <li><Link href="/category/economie" className="hover:text-white transition">Économie</Link></li>
            <li><Link href="/category/politique" className="hover:text-white transition">Politique</Link></li>
            <li><Link href="/category/societe" className="hover:text-white transition">Société</Link></li>
            <li><Link href="/category/tech-innovation" className="hover:text-white transition">Tech &amp; Innovation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 border-b border-gray-700 pb-2">
            Information &amp; Légal
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-white transition">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact &amp; Rédaction</Link></li>
            <li><Link href="/confidentialite" className="hover:text-white transition">Politique de confidentialité</Link></li>
            <li><Link href="/conditions" className="hover:text-white transition">Conditions générales</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 border-b border-gray-700 pb-2">
            Restez informé
          </h4>
          <p className="text-gray-400 text-sm mb-4">
            Recevez les analyses majeures directement dans votre boîte mail.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-red-500 text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-sm transition uppercase"
            >
              {status === 'loading' ? 'Envoi...' : "S'abonner"}
            </button>
          </form>
          {message && (
            <p className={`text-xs mt-2 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} CIME. Tous droits réservés.</p>
        <div className="flex items-center gap-4">
          <Link href="/confidentialite" className="hover:text-gray-300 transition">
            Politique de confidentialité
          </Link>
          <span>•</span>
          <Link href="/conditions" className="hover:text-gray-300 transition">
            Conditions générales
          </Link>
        </div>
      </div>
    </footer>
  )
}
