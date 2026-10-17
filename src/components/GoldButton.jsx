import { motion } from 'framer-motion'
import Heart from './Heart'

/**
 * The one button style used across the whole story.
 * `tone="light"` sits on burgundy, `tone="dark"` sits on ivory paper.
 */
export default function GoldButton({
  children,
  onClick,
  tone = 'light',
  icon = true,
  className = '',
  type = 'button',
  ariaLabel,
}) {
  const light = tone === 'light'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full',
        'px-7 py-4 sm:px-10 sm:py-[1.15rem]',
        'text-[0.68rem] sm:text-[0.72rem] font-medium uppercase tracking-[0.24em]',
        'transition-colors duration-500',
        'shadow-sm',
        light
          ? 'border border-gold/45 bg-ivory/[0.04] text-gold-soft/95 backdrop-blur-sm hover:border-gold/80 hover:bg-gold/10 shadow-[0_4px_12px_rgba(212,168,83,0.15)]'
          : 'border border-wine/25 bg-transparent text-wine hover:border-wine/45 hover:bg-wine hover:text-ivory shadow-[0_4px_12px_rgba(167,29,42,0.15)]',
        className,
      ].join(' ')}
    >
      {/* sheen that sweeps across on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100"
        style={{
          background: light
            ? 'linear-gradient(105deg, transparent 38%, rgba(255,246,234,0.35) 50%, transparent 62%)'
            : 'linear-gradient(105deg, transparent 38%, rgba(253,248,241,0.35) 50%, transparent 62%)',
        }}
      />
      <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <span className="relative">{children}</span>
      {icon ? (
        <Heart
          size={11}
          className={`relative shrink-0 transition-transform duration-500 group-hover:scale-125 ${
            light ? 'text-blush/80' : 'text-rose'
          }`}
        />
      ) : null}
    </motion.button>
  )
}