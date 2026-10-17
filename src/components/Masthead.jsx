import { motion } from 'framer-motion'
import { Bloom, Grain, SparkleField } from './Atmosphere'
import Heart from './Heart'
import Ornament from './Ornament'
import { EASE } from './Reveal'

const rise = (delay) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, ease: EASE, delay },
})

/** The calm landing page under the curtain — a title, and an invitation to scroll. */
export default function Masthead() {
  return (
    <header className="paper relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <Grain opacity={0.16} />
      <Bloom size={520} className="left-1/2 top-[-14%] -translate-x-1/2" color="rgba(241,194,206,0.35)" />
      <Bloom size={420} className="right-[-8%] bottom-[-10%]" color="rgba(238,213,147,0.2)" />
      <SparkleField count={10} seed={77} peak={0.5} />

      <motion.div {...rise(0.1)} className="relative z-10 flex flex-col items-center">
        <span className="kicker text-gold-deep/80">Our Anniversary</span>
      </motion.div>

      <motion.h1
        {...rise(0.24)}
        className="display relative z-10 mt-8 text-[clamp(2.8rem,10vw,7rem)]"
      >
        <span className="foil">You &amp; Me</span>
        <span
          className="a-beat ml-2 inline-block align-baseline text-[clamp(1.5rem,4.5vw,3rem)]"
          style={{ filter: 'drop-shadow(0 0 22px rgba(226,158,179,0.55))' }}
        >
          ❤️
        </span>
      </motion.h1>

      <motion.p
        {...rise(0.32)}
        className="display-quiet relative z-10 mt-5 text-[clamp(1.15rem,3.6vw,2.1rem)] italic tracking-wide text-wine/75"
      >
        A Little Forever
      </motion.p>

      <motion.div {...rise(0.4)} className="relative z-10 mt-9 w-full">
        <Ornament tone="dark" />
      </motion.div>

      <motion.p
        {...rise(0.5)}
        className="display-quiet relative z-10 mt-8 max-w-lg text-[clamp(1rem,2.6vw,1.3rem)] italic leading-relaxed text-ink/70"
      >
        Six years, countless memories, one love story.
      </motion.p>

      <motion.div
        {...rise(0.62)}
        className="relative z-10 mt-10 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.3em] text-wine/55"
      >
        <span>06 · 06 · 2020</span>
        <Heart size={8} className="text-rose/80" />
        <span>and every day since</span>
      </motion.div>

      <motion.div
        {...rise(0.9)}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="kicker text-ink/35">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-gradient-to-b from-wine/25 to-transparent">
          <motion.span
            className="absolute left-1/2 top-0 block h-3 w-3 -translate-x-1/2 text-rose"
            animate={{ y: [-14, 52], opacity: [0, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={11} />
          </motion.span>
        </span>
      </motion.div>
    </header>
  )
}
