'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="border-b-2 border-red-600 pb-4 mb-8">
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
          Contact & Rédaction
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
          Leaders Press Africa — À votre écoute
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Colonne Coordonnées */}
        <div className="space-y-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            Vous souhaitez soumettre une information, réagir à un article ou entrer en contact avec notre équipe rédactionnelle ? N'hésitez pas à nous joindre.
          </p>

          <div className="space-y-4 text-xs text-gray-800">
            <div className="flex items-start space-x-3">
              <span className="text-base">📍</span>
              <div>
                <strong className="block font-bold uppercase text-gray-900">Siège social</strong>
                <span>Bobo-Dioulasso, Burkina Faso</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-base">📞</span>
              <div>
                <strong className="block font-bold uppercase text-gray-900">Téléphone / WhatsApp</strong>
                <a href="tel:+22669316724" className="hover:text-red-600 transition">
                  +226 69 31 67 24
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-base">✉️</span>
              <div>
                <strong className="block font-bold uppercase text-gray-900">E-mail Rédaction</strong>
                <a href="mailto:learderspressafrica@gmail.com" className="hover:text-red-600 transition">
                  learderspressafrica@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Formulaire */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 mb-4 border-l-4 border-red-600 pl-2">
            Envoyer un message
          </h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded text-xs">
              Merci ! Votre message a bien été envoyé à notre équipe.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Adresse e-mail</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Sujet</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition uppercase tracking-wider text-[11px]"
              >
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}