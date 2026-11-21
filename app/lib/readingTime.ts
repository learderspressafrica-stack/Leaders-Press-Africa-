export function estimateReadingTime(input: unknown, wordsPerMinute = 200): string {
  let text = ''

  if (typeof input === 'string') {
    text = input
  } else if (Array.isArray(input)) {
    const extractText = (node: unknown): string => {
      if (!node) return ''
      if (typeof node === 'string') return node
      if (Array.isArray(node)) return node.map(extractText).join(' ')
      if (typeof node === 'object') {
        const record = node as Record<string, unknown>
        if (Array.isArray(record.children)) {
          return record.children.map(extractText).join(' ')
        }
        if (typeof record.text === 'string') {
          return record.text
        }
      }
      return ''
    }
    text = extractText(input)
  } else if (input && typeof input === 'object') {
    const record = input as Record<string, unknown>
    if (typeof record.excerpt === 'string') text += ' ' + record.excerpt
    if (Array.isArray(record.body)) text += ' ' + estimateReadingTime(record.body, wordsPerMinute)
  }

  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
  return `${minutes} min de lecture`
}
