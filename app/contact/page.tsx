'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<{ loading: boolean; error: string | null; success: boolean }>({
    loading: false,
    error: null,
    success: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ loading: true, error: null, success: false })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l’envoi.')
      }

      setStatus({ loading: false, error: null, success: true })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: false })
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
        Contact & Rédaction
      </h1>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1 mb-8">
        Leaders Press Africa — À votre écoute
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* INFOS DE CONTACT */}
        <div className="space-y-6 text-sm text-gray-600">
          <p>
            Vous souhaitez soumettre une information, réagir à un article ou entrer en contact avec notre équipe rédactionnelle ? N&apos;hésitez pas à nous joindre.
          </p>

          <div className="space-y-4 pt-4">
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-xs">Siège Social</h3>
              <p>Bobo-Dioulasso, Burkina Faso</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-xs">Téléphone / WhatsApp</h3>
              <p>+226 69 31 67 24</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase text-xs">E-mail Rédaction</h3>
              <p>learderspressafrica@gmail.com</p>
            </div>
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-sm font-extrabold uppercase text-gray-900 mb-4 border-l-4 border-red-600 pl-2">
            Envoyer un message
          </h2>

          {status.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded">
              {status.error}
            </div>
          )}

          {status.success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 text-xs rounded">
              Votre message a été envoyé avec succès !
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-red-600 focus:outline-none text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Adresse e-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-red-600 focus:outline-none text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Sujet</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-red-600 focus:outline-none text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-red-600 focus:outline-none text-gray-900"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 uppercase tracking-wider rounded transition disabled:opacity-50"
            >
              {status.loading ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}