import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions générales d’utilisation',
  description: "Conditions générales d'utilisation du média CIME.",
}

export default function ConditionsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Conditions générales d&apos;utilisation
      </h1>
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        L&apos;accès et l&apos;utilisation du site <strong>CIME</strong> impliquent l&apos;acceptation des
        présentes conditions générales d&apos;utilisation.
      </p>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">1. Contenus éditoriaux</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Les articles, analyses, flash info et visuels publiés sur CIME sont fournis à titre
          d&apos;information. La rédaction s&apos;efforce de vérifier l&apos;exactitude des informations
          diffusées.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">2. Propriété intellectuelle</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Sauf mention contraire, les contenus publiés sur ce site sont protégés. Vous pouvez partager
          les liens vers nos articles en citant clairement la source <strong>CIME</strong>.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">3. Commentaires et usage du site</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Les utilisateurs s&apos;engagent à adopter un comportement respectueux et à ne publier aucun
          contenu illicite, diffamatoire ou portant atteinte au bon fonctionnement du site.
        </p>
      </div>
    </section>
  )
}
