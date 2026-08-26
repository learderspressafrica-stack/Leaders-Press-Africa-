import Image from 'next/image'

interface AdBannerProps {
  format?: 'horizontal' | 'sidebar' | 'inline'
  imageUrl?: string
  targetUrl?: string
  altText?: string
}

export default function AdBanner({
  format = 'horizontal',
  imageUrl,
  targetUrl = '#',
  altText = 'Espace Publicitaire - Leaders Press Africa',
}: AdBannerProps) {
  // Styles selon le format de la pub
  const formatStyles = {
    horizontal: 'w-full h-24 md:h-32 my-6',
    sidebar: 'w-full h-64 my-4',
    inline: 'w-full h-40 my-6',
  }

  return (
    <div className={`relative bg-gray-100 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center ${formatStyles[format]}`}>
      {imageUrl ? (
        <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="relative w-full h-full block">
          <Image src={imageUrl} alt={altText} fill className="object-cover" />
        </a>
      ) : (
        <div className="text-center p-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-1">
            PUBLICITÉ / PARTENARIAT
          </span>
          <p className="text-xs text-gray-600 font-semibold">
            Votre bannière ici — Contactez la rédaction
          </p>
          <a
            href="mailto:learderspressafrica@gmail.com"
            className="inline-block mt-2 text-[11px] font-bold text-red-600 hover:underline"
          >
            learderspressafrica@gmail.com
          </a>
        </div>
      )}
    </div>
  )
}