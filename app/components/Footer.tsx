'use client'

import { useState } from 'react'

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
          <h3 className="text-xl font-bold tracking-wider text-red-500 mb-4">LEADERS PRESS AFRICA</h3>
          <p className="text-gray-400 text-sm">
            Média d'actualité, d'analyse et de décryptage. L'information africaine en temps réel avec une vision indépendante.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 border-b border-gray-700 pb-2">Rubriques</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white transition">À la une</a></li>
            <li><a href="/category/economie" className="hover:text-white transition">Économie</a></li>
            <li><a href="/category/politique" className="hover:text-white transition">Politique</a></li>
            <li><a href="/category/societe" className="hover:text-white transition">Société</a></li>
            <li><a href="/category/tech-innovation" className="hover:text-white transition">Tech & Innovation</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 border-b border-gray-700 pb-2">Information</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-white transition">À propos</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact & Rédaction</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 border-b border-gray-700 pb-2">Restez informé</h4>
          <p className="text-gray-400 text-sm mb-4">Recevez les analyses majeures directement dans votre boîte mail.</p>
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
    </footer>
  )
}