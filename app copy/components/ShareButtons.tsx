'use client'

import { useState, useEffect } from 'react'

interface ShareButtonsProps {
  title: string
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  if (!currentUrl) return null

  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 py-4 border-y border-gray-100 flex flex-wrap items-center justify-between gap-3">
      <span className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
        Partager l'article :
      </span>

      <div className="flex items-center space-x-2">
        {/* WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded transition flex items-center space-x-1"
        >
          <span>WhatsApp</span>
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded transition flex items-center space-x-1"
        >
          <span>Facebook</span>
        </a>

        {/* X / Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded transition flex items-center space-x-1"
        >
          <span>X</span>
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded transition flex items-center space-x-1"
        >
          <span>LinkedIn</span>
        </a>

        {/* Copier le lien */}
        <button
          onClick={handleCopy}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold px-3 py-1.5 rounded transition"
        >
          {copied ? 'Lien copié !' : 'Copier le lien'}
        </button>
      </div>
    </div>
  )
}