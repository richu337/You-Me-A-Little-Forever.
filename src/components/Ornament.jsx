import Heart from './Heart'

const toneMap = {
  light: {
    line: 'to-gold/60',
    text: 'text-gold/85',
    heart: 'text-gold-soft/80',
  },
  dark: {
    line: 'to-wine/45',
    text: 'text-wine/70',
    heart: 'text-rose/90',
  },
}

/** A hairline divider with a small heart at its centre. */
export default function Ornament({ tone = 'light', className = '', width = 'w-20 sm:w-28' }) {
  const t = toneMap[tone] ?? toneMap.light
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-4 ${className}`}>
      <span className={`h-px ${width} bg-gradient-to-r from-transparent ${t.line}`} />
      <Heart size={9} className={t.heart} />
      <span className={`h-px ${width} bg-gradient-to-l from-transparent ${t.line}`} />
    </div>
  )
}

/** "Chapter One · The Count" style eyebrow. */
export function ChapterLabel({ chapter, title, tone = 'light', className = '' }) {
  const isLight = tone === 'light'
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <span className={`kicker ${isLight ? 'text-gold-soft/75' : 'text-gold-deep'}`}>
        {chapter}
      </span>
      <span className={`kicker ${isLight ? 'text-blush/75' : 'text-wine/80'}`}>{title}</span>
    </div>
  )
}
