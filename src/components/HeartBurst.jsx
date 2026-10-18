import { useMemo } from 'react'
import Heart from './Heart'
import { between, pick, seededList } from '../lib/random'

const DEFAULT_COLORS = ['#eed593', '#f1c2ce', '#efa8bc', '#fff6ea', '#d6b477']

/**
 * A tasteful burst of tiny hearts, seeded so every render of a given seed
 * draws the exact same arrangement. Used by the opening curtain, the reason
 * cards, and the final reveal.
 */
export default function HeartBurst({
  count = 10,
  seed = 3,
  minDistance = 80,
  maxDistance = 180,
  minSize = 8,
  maxSize = 16,
  minDur = 1.1,
  maxDur = 1.9,
  minDelay = 0,
  maxDelay = 0.15,
  minScale = 0.7,
  maxScale = 1,
  colors = DEFAULT_COLORS,
  className = '',
}) {
  const parts = useMemo(
    () =>
      seededList(count, seed, (rnd, i) => {
        const angle = (i / count) * Math.PI * 2 + between(rnd, -0.25, 0.25)
        const distance = between(rnd, minDistance, maxDistance)
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance * 0.9 - 24,
          rotate: between(rnd, -70, 70),
          scale: between(rnd, minScale, maxScale),
          size: between(rnd, minSize, maxSize),
          dur: between(rnd, minDur, maxDur),
          delay: between(rnd, minDelay, maxDelay),
          color: pick(rnd, colors),
        }
      }),
    [count, seed, minDistance, maxDistance, minSize, maxSize, minDur, maxDur, minDelay, maxDelay, minScale, maxScale, colors],
  )

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 z-20 block ${className}`}
    >
      {parts.map((p) => (
        <span
          key={p.id}
          className="burst-heart"
          style={{
            color: p.color,
            '--bx': `${p.x}px`,
            '--by': `${p.y}px`,
            '--br': `${p.rotate}deg`,
            '--bs': p.scale,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
          }}
        >
          <Heart size={p.size} />
        </span>
      ))}
    </span>
  )
}
