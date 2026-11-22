'use client'

import { useEffect, useState } from 'react'
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
  const [currentIndex, setCurrentIndex] = useState(0)

  const total = items?.length || 0

  useEffect(() => {
    if (total <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, 6000)

    return () => clearInterval(timer)
  }, [total])

  if (!items || total === 0) {
    return null
  }

  const safeIndex = currentIndex % total
  const currentItem = items[safeIndex]

  const messageContent = (
    <span className="text-xs sm:text-sm font-medium inline-flex items-center gap-2">
      <span>{currentItem.message}</span>
    </span>
  )

  return (
    <div className="bg-red-700 text-white border-b border-red-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
        <span className="shrink-0 bg-white text-red-700 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">
          Flash Info
        </span>

        <div className="relative flex-1 overflow-hidden whitespace-nowrap">
          <div
            key={currentItem._id}
            className="inline-block animate-marquee"
          >
            {currentItem.link ? (
              currentItem.link.startsWith('http') ? (
                <a
                  href={currentItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {messageContent}
                </a>
              ) : (
                <Link href={currentItem.link} className="hover:underline">
                  {messageContent}
                </Link>
              )
            ) : (
              messageContent
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
