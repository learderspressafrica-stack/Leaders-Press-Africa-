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
  const [isPaused, setIsPaused] = useState(false)

  const total = items?.length || 0

  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(0)
    }
  }, [currentIndex, total])

  useEffect(() => {
    if (total <= 1 || isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, 6000)

    return () => clearInterval(timer)
  }, [total, isPaused])

  if (!items || total === 0) {
    return null
  }

  const currentItem = items[currentIndex] || items[0]
  const displayNumber = currentItem.priority ?? currentIndex + 1

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  const messageContent = (
    <span className="text-xs sm:text-sm font-medium inline-flex items-center gap-2">
      <span>{currentItem.message}</span>
    </span>
  )

  return (
    <div
      className="bg-red-700 text-white border-b border-red-800 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
        <span className="shrink-0 bg-white text-red-700 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded inline-flex items-center gap-1">
          <span>Flash Info</span>
          <span className="bg-red-700 text-white px-1.5 py-0.2 rounded-sm">
            {displayNumber}
          </span>
        </span>

        <div className="relative flex-1 overflow-hidden whitespace-nowrap">
          <div
            key={currentItem._id}
            className="inline-block animate-marquee hover:[animation-play-state:paused]"
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

        {total > 1 && (
          <div className="shrink-0 flex items-center gap-1">
            {items.map((item, idx) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Afficher le flash info ${idx + 1}`}
                className={`w-5 h-5 rounded text-[10px] font-bold transition ${
                  idx === currentIndex
                    ? 'bg-white text-red-700'
                    : 'bg-red-800/80 text-red-100 hover:bg-red-600'
                }`}
              >
                {item.priority ?? idx + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Flash info précédent"
              className="ml-1 px-1.5 py-0.5 rounded bg-red-800 hover:bg-red-600 text-xs font-bold"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Flash info suivant"
              className="px-1.5 py-0.5 rounded bg-red-800 hover:bg-red-600 text-xs font-bold"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
