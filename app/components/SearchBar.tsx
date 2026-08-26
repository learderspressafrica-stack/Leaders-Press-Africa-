'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <input
        type="text"
        placeholder="Rechercher un article..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-48 focus:w-64 transition-all duration-300 bg-gray-100 border border-gray-300 rounded-full py-1 px-3 text-xs text-gray-800 focus:outline-none focus:border-red-600"
      />
      <button type="submit" className="absolute right-2 text-gray-500 hover:text-red-600">
        🔍
      </button>
    </form>
  )
}