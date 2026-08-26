'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-red-600 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Colonne 1 : Branding */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-3">
            LEADERS PRESS <span className="text-red-500">AFRICA</span>
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Média d'actualité, d'analyse et de décryptage. L'information africaine en temps réel avec une vision indépendante.
          </p>
        </div>

        {/* Colonne 2 : Rubriques */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-red-500 pl-2">
            Rubriques
          </h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-red-400 transition">À la une</Link></li>
            <li><Link href="/category/economie" className="hover:text-red-400 transition">Économie</Link></li>
            <li><Link href="/category/politique" className="hover:text-red-400 transition">Politique</Link></li>
            <li><Link href="/category/societe" className="hover:text-red-400 transition">Société</Link></li>
            <li><Link href="/category/tech" className="hover:text-red-400 transition">Tech & Innovation</Link></li>
            <li><Link href="/category/culture" className="hover:text-red-400 transition">Culture</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Liens utiles & Contact */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-red-500 pl-2">
            Information
          </h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-red-400 transition">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-red-400 transition">Contact & Rédaction</Link></li>
          </ul>
          <div className="mt-4 text-[11px] text-gray-400 space-y-1">
            <p>📍 Bobo-Dioulasso, Burkina Faso</p>
            <p>📞 +226 69 31 67 24</p>
            <p>✉️ learderspressafrica@gmail.com</p>
          </div>
        </div>

        {/* Colonne 4 : Newsletter */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-red-500 pl-2">
            Restez informé
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            Recevez les analyses majeures directement dans votre boîte mail.
          </p>
          <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre email..."
              className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-1.5 rounded transition uppercase tracking-wider"
            >
              S'abonner
            </button>
          </form>
        </div>

      </div>

      {/* Bas de page */}
      <div className="bg-gray-950 py-4 text-center text-[11px] text-gray-500 border-t border-gray-800">
        © {currentYear} Leaders Press Africa. Tous droits réservés.
      </div>
    </footer>
  )
}