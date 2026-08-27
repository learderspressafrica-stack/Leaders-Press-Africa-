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
  ]

  return (
    <header className="border-b border-gray-800 bg-gray-950 text-white">
      {/* Top bar avec date, branding et barre de recherche */}
      <div className="bg-gray-900 text-gray-300 text-xs py-1.5 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2 capitalize">
          <span>{currentDate}</span>
          <span className="font-semibold text-red-500 hidden md:inline">
            Leaders Press Africa — L'information africaine en temps réel
          </span>
          <SearchBar />
        </div>
      </div>

      {/* Main Logo Header */}
      <div className="max-w-6xl mx-auto px-4 py-6 text-center border-b border-gray-800">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            LEADERS PRESS <span className="text-red-600">AFRICA</span>
          </h1>
          <p className="text-[10px] sm:text-xs tracking-widest text-gray-400 uppercase mt-1">
            Média d'actualité, d'analyse et de décryptage
          </p>
        </Link>
      </div>

      {/* Navigation bar avec défilement fluide sur mobile */}
      <nav className="max-w-6xl mx-auto px-4 overflow-x-auto scrollbar-none">
        <ul className="flex items-center justify-start md:justify-center space-x-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-300 whitespace-nowrap min-w-max">
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