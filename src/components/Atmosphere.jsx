import Heart, { Sparkle } from './Heart'
import { useCallback, useMemo } from 'react'
import { between, pick, seededList } from '../lib/random'

/* ------------------------------------------------------------------ *
 * Atmosphere layers — texture, depth, and gentle light.
 * All decorative: hidden from assistive tech, never interactive.
 * ------------------------------------------------------------------ */

export function Grain({ opacity = 0.32 }) {
  return <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0" style={{ opacity }} />
}

export function Vignette({ className = '' }) {
  return <div aria-hidden="true" className={`vignette pointer-events-none absolute inset-0 ${className}`} />
}

/** A soft pool of light. Cheap: only transforms + opacity animate. */
export function Bloom({
  size = 340,
  color = 'rgba(241,194,206,0.35)',
  className = '',
  animate = true,
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${
        animate ? 'a-halo' : ''
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
      }}
    />
  )
}

/* ------------------------------------------------------------------ *
 * Floating hearts
 * ------------------------------------------------------------------ */
export function FloatingHearts({
  count = 14,
  seed = 11,
  peak = 0.5,
  className = '',
  colors = ['#ffe6f0', '#ffc8d9', '#f1c2ce', '#eed593', '#fde8ee', '#f5cba7'],
  minSize = 10,
  maxSize = 30,
  speed = [15, 28],
}) {
  const [minSpeed, maxSpeed] = speed

  const hearts = useMemo(
    () =>
      seededList(count, seed, (rnd, i) => ({
        id: i,
        left: between(rnd, 2, 97),
        size: between(rnd, minSize, maxSize),
        dur: between(rnd, minSpeed, maxSpeed),
        delay: -between(rnd, 0, 30),
        drift: between(rnd, -60, 60),
        s0: between(rnd, 0.5, 0.85),
        s1: between(rnd, 0.9, 1.25),
        s2: between(rnd, 0.7, 1),
        color: pick(rnd, colors),
        opacity: between(rnd, 0.4, 1),
      })),
    [count, seed, minSize, maxSize, minSpeed, maxSpeed, colors],
  )

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-float"
          style={{
            left: `${h.left}%`,
            color: h.color,
            '--dur': `${h.dur}s`,
            '--delay': `${h.delay}s`,
            '--drift': `${h.drift}px`,
            '--s0': h.s0,
            '--s1': h.s1,
            '--s2': h.s2,
            '--peak': peak * h.opacity,
          }}
        >
          <Heart size={h.size} />
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Sparkles & stars
 * ------------------------------------------------------------------ */
export function SparkleField({ count = 16, seed = 23, peak = 0.85, className = '' }) {
  const sparkles = useMemo(
    () =>
      seededList(count, seed, (rnd, i) => ({
        id: i,
        left: between(rnd, 1, 98),
        top: between(rnd, 2, 96),
        size: between(rnd, 4, 13),
        dur: between(rnd, 2.6, 6.5),
        delay: -between(rnd, 0, 7),
        peak: between(rnd, 0.4, 1),
        color: pick(rnd, ['#eed593', '#fff6ea', '#f1c2ce', '#c19a2e']),
      })),
    [count, seed],
  )

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            color: s.color,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
            '--peak': peak * s.peak,
          }}
        >
          <Sparkle size={s.size} />
        </span>
      ))}
    </div>
  )
}

export function StarField({ count = 34, seed = 41, className = '' }) {
  const stars = useMemo(
    () =>
      seededList(count, seed, (rnd, i) => ({
        id: i,
        left: between(rnd, 0, 100),
        top: between(rnd, 0, 100),
        size: between(rnd, 1, 2.8),
        dur: between(rnd, 3.4, 9),
        delay: -between(rnd, 0, 9),
        peak: between(rnd, 0.35, 1),
      })),
    [count, seed],
  )

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
            '--peak': s.peak,
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Falling petals
 * ------------------------------------------------------------------ */
export function PetalField({ count = 12, seed = 67, peak = 0.45, className = '' }) {
  const petals = useMemo(
    () =>
      seededList(count, seed, (rnd, i) => ({
        id: i,
        left: between(rnd, -2, 100),
        size: between(rnd, 9, 21),
        dur: between(rnd, 18, 34),
        delay: -between(rnd, 0, 34),
        sway: between(rnd, -70, 70),
        rot: between(rnd, 0, 360),
        color: pick(rnd, ['#fbdde4', '#f6c2d0', '#f1b6c6', '#fde8ee']),
        o: between(rnd, 0.6, 1),
      })),
    [count, seed],
  )

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.82,
            background: `linear-gradient(140deg, ${p.color}, rgba(255,255,255,0.22))`,
            rotate: `${p.rot}deg`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--sway': `${p.sway}px`,
            '--peak': peak * p.o,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Desktop-only candlelight that trails the pointer.
 * Spread `onPointerMove={usePointerGlow()}` on the (relative) section and
 * drop <Candlelight /> inside it — the custom properties inherit down.
 */
export function usePointerGlow() {
  return useCallback((event) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    element.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, [])
}

export function Candlelight({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`candlelight pointer-events-none absolute inset-0 hidden lg:block ${className}`}
    />
  )
}
