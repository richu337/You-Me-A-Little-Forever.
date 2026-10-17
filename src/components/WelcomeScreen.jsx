import { motion } from 'framer-motion'
import { Bloom, FloatingHearts, Grain, SparkleField, StarField, Vignette } from './Atmosphere'
import GoldButton from './GoldButton'
import Heart from './Heart'
import { EASE } from './Reveal'

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.22 } },
}

const item = {
  hidden: { opacity: 0, y: 26, filter: 'blur(9px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.05, ease: EASE },
  },
}

export default function WelcomeScreen({ onOpen, leaving }) {
  return (
    <motion.div
      className="velvet fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={
        leaving
          ? { opacity: 0, scale: 1.06, filter: 'blur(14px)' }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      exit={{ opacity: 0 }}
      transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* ── atmosphere ─────────────────────────────────────────── */}
      <Vignette />
      <Grain opacity={0.3} />
      <StarField count={38} seed={3} />
      <SparkleField count={18} seed={9} peak={0.9} />
      <FloatingHearts count={16} seed={5} peak={0.55} minSize={11} maxSize={30} />
      <Bloom
        size={620}
        className="left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
        color="rgba(226,158,179,0.20)"
      />
      <Bloom size={380} className="left-[12%] bottom-[-6%]" color="rgba(238,213,147,0.16)" />

      {/* the flash of light as the heart opens */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={leaving ? { opacity: [0, 0.8, 0], scale: [0.4, 1.25, 1.9] } : { opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,242,228,0.8), rgba(238,213,147,0.28) 36%, transparent 66%)',
        }}
      />

      {/* ── content ────────────────────────────────────────────── */}
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.div
          variants={item}
          className="relative mb-8 flex h-[4.6rem] w-[4.6rem] items-center justify-center sm:mb-10"
        >
          <span
            aria-hidden="true"
            className="absolute inset-[-30%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(238,213,147,0.22), transparent 70%)',
            }}
          />
          <span className="absolute inset-0 rounded-full border border-gold/55" />
          <span className="absolute inset-[6px] rounded-full border border-gold-soft/25" />
          <span
            className="display relative text-[1.2rem] leading-none text-gold-soft"
            style={{ textShadow: '0 0 16px rgba(238,213,147,0.5)' }}
          >
            VI
          </span>
        </motion.div>

        <motion.div variants={item} className="flex items-baseline justify-center gap-[0.1em]">
          <span className="display foil text-[clamp(3.2rem,12.5vw,9rem)]">You &amp; Me</span>
          <span
            className="a-beat translate-y-[0.06em] text-[clamp(2rem,6.5vw,4.6rem)]"
            style={{ filter: 'drop-shadow(0 0 26px rgba(226,158,179,0.6))' }}
          >
            ❤️
          </span>
        </motion.div>

        <motion.div variants={item} className="mt-7 flex w-full items-center justify-center gap-4 sm:mt-9">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/60 sm:w-24" />
          <Heart size={9} className="text-gold-soft/80" />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/60 sm:w-24" />
        </motion.div>

        <motion.p
          variants={item}
          className="display-quiet mt-7 max-w-xl text-[clamp(1.05rem,2.9vw,1.55rem)] italic leading-relaxed text-blush/90"
        >
          Six years, countless memories, one love story.
        </motion.p>

        <motion.p variants={item} className="kicker mt-6 text-gold-soft/55">
          Since 06 · 06 · 2020
        </motion.p>

        <motion.div variants={item} className="relative mt-12 sm:mt-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -m-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(226,158,179,0.22), transparent 68%)',
              animation: 'halo 4.4s ease-in-out infinite',
            }}
          />
          <GoldButton onClick={onOpen} icon={false} ariaLabel="Open my heart — enter the story">
            Open My Heart 💌
          </GoldButton>
        </motion.div>

        <motion.p variants={item} className="kicker mt-14 text-blush/35">
          For you, always
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
