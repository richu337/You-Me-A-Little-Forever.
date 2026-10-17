import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Heart from './Heart'

/** The gold thread of the story, running down the side of the page. */
export default function ScrollThread() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 })
  const top = useTransform(progress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 0.9, 0.9, 0])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-7 top-0 z-40 hidden h-screen w-px lg:block"
    >
      <span className="absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-blush/15 to-transparent" />
      <motion.span className="absolute left-0 top-0 h-full w-px" style={{ opacity }}>
        <span className="thread-line absolute inset-y-8 left-0 w-px" />
      </motion.span>
      <motion.span
        className="absolute left-1/2 top-8 -translate-x-1/2 text-rose"
        style={{ top, opacity }}
      >
        <Heart size={11} />
      </motion.span>
    </div>
  )
}
