import Link from 'next/link'

export interface FlashInfoItem {
  _id: string
  message: string
  link?: string | null
  priority?: number | null
}

interface FlashTickerProps {
  items: FlashInfoItem[]
}

export default function FlashTicker({ items }: FlashTickerProps) {
  if (!items || items.length === 0) {
    return null
  }

  const repeatedItems = [...items, ...items, ...items]

  return (
    <div className="bg-red-700 text-white border-b border-red-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
        <span className="shrink-0 bg-white text-red-700 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">
          Flash Info
        </span>

        <div className="relative flex-1 overflow-hidden whitespace-nowrap">
          <div className="inline-flex items-center gap-8 animate-marquee hover:[animation-play-state:paused]">
            {repeatedItems.map((item, index) => {
              const content = (
                <span className="text-xs sm:text-sm font-medium inline-flex items-center gap-2">
                  <span>{item.message}</span>
                  <span className="text-red-200">•</span>
                </span>
              )

              if (item.link) {
                const isExternal = item.link.startsWith('http')
                if (isExternal) {
                  return (
                    <a
                      key={`${item._id}-${index}`}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <Link
                    key={`${item._id}-${index}`}
                    href={item.link}
                    className="hover:underline"
                  >
                    {content}
                  </Link>
                )
              }

              return <span key={`${item._id}-${index}`}>{content}</span>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
