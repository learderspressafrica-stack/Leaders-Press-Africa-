'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Header() {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const date = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    setCurrentDate(date)
  }, [])

  const categories = [
    { name: 'À la une', href: '/' },
    { name: 'Économie', href: '/category/economie' },
    { name: 'Politique', href: '/category/politique' },
    { name: 'Société', href: '/category/societe' },
    { name: 'Tech & Innovation', href: '/category/tech' },
    { name: 'Culture', href: '/category/culture' },
    { name: 'Sport', href: '/category/sport' },
  ]

  return (
    <header className="border-b border-gray-200 bg-white text-gray-900">
      {/* Top bar avec date dynamique */}
      <div className="bg-gray-900 text-gray-300 text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2 capitalize">
          <span className="min-h-[1rem]">
            {currentDate || 'Chargement...'}
          </span>
          <span className="font-semibold text-red-500 hidden md:inline">
            Leaders Press Africa — L'information Africaine En Temps Réel
          </span>
          <SearchBar />
        </div>
      </div>

      {/* Main Logo Header */}
      <div className="bg-[#0b1329] text-white py-6 border-b border-gray-800 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
            LEADERS PRESS <span className="text-red-600">AFRICA</span>
          </h1>
          <p className="text-xs tracking-widest text-gray-400 uppercase mt-1">
            MÉDIA D'ACTUALITÉ, D'ANALYSE ET DE DÉCRYPTAGE
          </p>
        </Link>
      </div>

      {/* Navigation bar avec Sport */}
      <nav className="bg-[#070c1b] text-white overflow-x-auto">
        <ul className="max-w-6xl mx-auto flex items-center justify-center space-x-6 py-3 px-4 text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className="hover:text-red-500 transition-colors duration-200"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}