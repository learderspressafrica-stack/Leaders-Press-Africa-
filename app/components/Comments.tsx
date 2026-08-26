'use client'

import { useState } from 'react'

interface CommentProps {
  postId: string
  comments: Array<{
    _id: string
    name: string
    comment: string
    _createdAt: string
  }>
}

export default function Comments({ postId, comments: initialComments }: CommentProps) {
  const [commentsList, setCommentsList] = useState(initialComments)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: postId, name, email, comment }),
      })

      if (res.ok) {
        setSuccess(true)
        setCommentsList([
          ...commentsList,
          {
            _id: Date.now().toString(),
            name,
            comment,
            _createdAt: new Date().toISOString(),
          },
        ])
        setName('')
        setEmail('')
        setComment('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 mb-6 border-l-4 border-red-600 pl-2">
        Commentaires ({commentsList.length})
      </h2>

      {/* Liste des commentaires */}
      <div className="space-y-4 mb-10">
        {commentsList.length === 0 ? (
          <p className="text-xs text-gray-500 italic">Soyez le premier à commenter cet article.</p>
        ) : (
          commentsList.map((item) => (
            <div key={item._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs">
              <div className="flex justify-between items-center mb-1">
                <strong className="font-bold text-gray-900">{item.name}</strong>
                <span className="text-[10px] text-gray-400">
                  {new Date(item._createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{item.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulaire d'ajout */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
          Laisser un commentaire
        </h3>

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-3 rounded text-xs">
            Votre commentaire a été publié avec succès.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Nom / Pseudonyme *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">E-mail (non publié)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Votre commentaire *</label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-red-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded transition uppercase tracking-wider text-[11px] disabled:opacity-50"
          >
            {loading ? 'Envoi en cours...' : 'Publier le commentaire'}
          </button>
        </form>
      </div>
    </section>
  )
}