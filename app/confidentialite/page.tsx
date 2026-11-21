import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles sur CIME.',
}

export default function ConfidentialitePage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Politique de confidentialité
      </h1>
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        <strong>CIME</strong> respecte la confidentialité de ses lecteurs et visiteurs. Cette page explique
        quelles informations sont collectées lorsque vous utilisez le site et comment elles sont utilisées.
      </p>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">1. Données collectées</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Lorsque vous vous abonnez à la lettre d&apos;information, publiez un commentaire ou utilisez le
          formulaire de contact, les informations saisies (telles que votre adresse e-mail ou votre message)
          sont enregistrées afin de traiter votre demande ou de vous informer des publications.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">2. Sécurité et conservation</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Les communications transitent en HTTPS et les clés techniques sensibles sont conservées
          exclusivement côté serveur. Nous ne vendons pas vos adresses e-mail à des tiers.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">3. Contact</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Pour toute question relative à vos données ou pour demander la suppression de votre adresse de la
          liste de diffusion, écrivez à{' '}
          <a
            href="mailto:learderspressafrica@gmail.com"
            className="text-red-600 font-medium hover:underline"
          >
            learderspressafrica@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  )
}
