import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

function Digit({ char }) {
  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ width: '0.6em', height: '1em' }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={char}
          initial={{ y: '-62%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '62%', opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Numbers that flip over one digit at a time as they change. */
export default function Ticker({ value, digits = 2, className = '' }) {
  const text = String(Math.max(0, Math.floor(value))).padStart(digits, '0')
  return (
    <span className={`inline-flex ${className}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {text.split('').map((char, index) => (
        <Digit key={index} char={char} />
      ))}
    </span>
  )
}
