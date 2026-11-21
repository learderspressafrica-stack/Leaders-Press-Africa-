export interface SocialItem {
  name: string
  href: string
  label: string
}

const SOCIAL_LINKS: SocialItem[] = [
  {
    name: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61579336084312',
  },
  {
    name: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/TON_COMPTE_INSTAGRAM',
  },
  {
    name: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@leaderspressafrica?is_from_webapp=1&sender_device=pc',
  },
  {
    name: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@TON_COMPTE_YOUTUBE',
  },
]

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'facebook':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
        </svg>
      )
    default:
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
  }
}

export default function SocialLinks() {
  const activeLinks = SOCIAL_LINKS.filter((item) => item.href && !item.href.includes('TON_COMPTE'))

  if (activeLinks.length === 0) return null

  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2.5">
        Suivez CIME
      </p>
      <div className="flex flex-wrap items-center gap-2.5">
        {activeLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Suivre CIME sur ${social.label}`}
            title={social.label}
            className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition"
          >
            <SocialIcon name={social.name} />
          </a>
        ))}
      </div>
    </div>
  )
}
