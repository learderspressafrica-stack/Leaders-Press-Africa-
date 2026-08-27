import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Header() {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

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
      {/* Top bar avec date et recherche */}
      <div className="bg-gray-900 text-gray-300 text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2 capitalize">
          <span>{currentDate}</span>
          <span className="font-semibold text-red-500 hidden md:inline">
            Leaders Press Africa — L'information africaine en temps réel
          </span>
          <SearchBar />
        </div>
      </div>

      {/* Main Logo Header */}
      <div className="max-w-6xl mx-auto px-4 py-6 text-center border-b border-gray-100">
        <Link href="/" className="inline-block">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 uppercase">
            LEADERS PRESS <span className="text-red-600">AFRICA</span>
          </h1>
          <p className="text-xs tracking-widest text-gray-500 uppercase mt-1">
            Média d'actualité, d'analyse et de décryptage
          </p>
        </Link>
      </div>

      {/* Navigation bar avec SPORT */}
      <nav className="max-w-6xl mx-auto px-4 overflow-x-auto">
        <ul className="flex items-center justify-center space-x-6 py-3 text-sm font-semibold uppercase tracking-wider text-gray-700 whitespace-nowrap">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className="hover:text-red-600 transition-colors duration-200"
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