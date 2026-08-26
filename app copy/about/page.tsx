import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="border-b-2 border-red-600 pb-4 mb-8">
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
          À Propos de Leaders Press Africa
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
          L'information africaine avec indépendance et rigueur
        </p>
      </div>

      <div className="space-y-8 text-gray-800 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-extrabold text-gray-900 uppercase border-l-4 border-red-600 pl-3 mb-3">
            Notre Mission
          </h2>
          <p>
            <strong>Leaders Press Africa</strong> est un organe d'information et de décryptage axé sur les dynamiques politiques, économiques, sociétales et technologiques du continent africain. Notre objectif principal est d'offrir une couverture impartiale, rigoureuse et en temps réel de l'actualité africaine et internationale.
          </p>
        </section>

        <section>
          <h2 className="text-base font-extrabold text-gray-900 uppercase border-l-4 border-red-600 pl-3 mb-3">
            Ligne Éditoriale & Engagements
          </h2>
          <p className="mb-3">
            Nous mettons un point d'honneur à vérifier chaque factualité et à privilégier l'analyse approfondie des événements. Notre travail repose sur trois piliers fondamentaux :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Indépendance :</strong> Une ligne rédactionnelle libre de toute influence extérieure.</li>
            <li><strong>Objectivité :</strong> Traiter l'actualité avec mesure et vérification rigoureuse des sources.</li>
            <li><strong>Analyse :</strong> Donner les clés de compréhension des enjeux géopolitiques et économiques africains.</li>
          </ul>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-xs space-y-2">
          <h2 className="text-xs font-bold uppercase text-gray-900 mb-2">
            Informations Éditoriales
          </h2>
          <p>📍 <strong>Siège social :</strong> Bobo-Dioulasso, Burkina Faso</p>
          <p>📞 <strong>Contact direct :</strong> +226 69 31 67 24</p>
          <p>✉️ <strong>E-mail :</strong> learderspressafrica@gmail.com</p>
        </section>

        <div className="pt-4 border-t border-gray-200">
          <Link href="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-5 py-2.5 rounded transition">
            Nous contacter / Proposer une information
          </Link>
        </div>
      </div>
    </main>
  )
}