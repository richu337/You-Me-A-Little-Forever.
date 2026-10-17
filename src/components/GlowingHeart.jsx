import { useId } from 'react'
import { motion } from 'framer-motion'
import { HEART_PATH } from './Heart'

/**
 * The big luminous heart used in "Our Little World" and the finale.
 * Glow is a blurred radial (cheap, composited) plus staggered pulse rings.
 */
export default function GlowingHeart({
  size = 220,
  pulse = true,
  draw = false,
  className = '',
  glow = 'rgba(226,158,179,0.6)',
  stops = ['#fff6f7', '#f6cdd7', '#d97e9b', '#8e2b46'],
}) {
  const uid = useId().replace(/[:]/g, '')
  const fillId = `hg-fill-${uid}`
  const strokeId = `hg-stroke-${uid}`

  return (
    <div
      aria-hidden="true"
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="a-halo absolute inset-[-34%] rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${glow}, rgba(238,213,147,0.16) 46%, transparent 72%)`,
        }}
      />
      <span className="a-pulse-ring absolute inset-0 rounded-full border border-rose/40" />
      <span
        className="a-pulse-ring absolute inset-0 rounded-full border border-gold-soft/30"
        style={{ animationDelay: '1.5s' }}
      />
      <span
        className="a-pulse-ring absolute inset-0 rounded-full border border-blush/25"
        style={{ animationDelay: '3s' }}
      />

      <svg
        viewBox="0 0 24 24"
        className={`relative block h-full w-full ${pulse ? 'a-beat' : ''}`}
        style={{ filter: `drop-shadow(0 0 34px ${glow}) drop-shadow(0 0 80px rgba(226,158,179,0.3))` }}
      >
        <defs>
          <radialGradient id={fillId} cx="50%" cy="32%" r="78%">
            <stop offset="0%" stopColor={stops[0]} />
            <stop offset="34%" stopColor={stops[1]} />
            <stop offset="72%" stopColor={stops[2]} />
            <stop offset="100%" stopColor={stops[3]} />
          </radialGradient>
          <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eed593" />
            <stop offset="50%" stopColor="#fff6ea" />
            <stop offset="100%" stopColor="#c19a2e" />
          </linearGradient>
        </defs>

        {draw ? (
          <>
            <motion.path
              d={HEART_PATH}
              fill="none"
              stroke={`url(#${strokeId})`}
              strokeWidth={0.28}
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 2.4, ease: 'easeInOut' }}
            />
            <motion.path
              d={HEART_PATH}
              fill={`url(#${fillId})`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, delay: 1.7, ease: 'easeOut' }}
            />
          </>
        ) : (
          <path d={HEART_PATH} fill={`url(#${fillId})`} />
        )}
      </svg>
    </div>
  )
}
