import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** Scroll-triggered reveal, played once. */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/** Staggered container + item, for lists that reveal as a group. */
export const staggerParent = (stagger = 0.12, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

export { EASE }
