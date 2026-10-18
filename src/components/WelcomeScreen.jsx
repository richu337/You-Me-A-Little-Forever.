import { motion } from 'framer-motion'
import { Bloom, FloatingHearts, Grain, SparkleField } from './Atmosphere'
import GlowingHeart from './GlowingHeart'
import GoldButton from './GoldButton'
import HeartBurst from './HeartBurst'
import Ornament from './Ornament'
import { EASE } from './Reveal'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { HERO } from '../data/content'
import { ANNIVERSARY_LONG } from '../lib/time'

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.22 } },
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
  const isDesktop = useMediaQuery('(min-width: 640px)')

  return (
    <motion.div
      className="hero-sky fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={
        leaving
          ? { opacity: 0, scale: 1.05, filter: 'blur(12px)' }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      exit={{ opacity: 0 }}
      transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* ── atmosphere: floating hearts, sparkles, warm bloom ────────── */}
      <Grain opacity={0.22} />
      <SparkleField count={16} seed={9} peak={0.85} />
      <FloatingHearts
        count={14}
        seed={5}
        peak={0.5}
        minSize={10}
        maxSize={26}
        colors={['#651d35', '#e392ac', '#d6b477']}
      />
      <Bloom
        size={620}
        className="left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2"
        color="rgba(255,255,255,0.20)"
      />
      <Bloom size={420} className="left-[10%] bottom-[8%]" color="rgba(238,213,147,0.16)" />

      {/* the burst of tiny hearts as the heart opens */}
      {leaving ? (
        <HeartBurst
          count={18}
          seed={7}
          minDistance={120}
          maxDistance={260}
          minSize={10}
          maxSize={22}
          minDur={1}
          maxDur={1.7}
        />
      ) : null}

      {/* a soft rose-gold breath of light as the curtain lifts (never a flash) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={leaving ? { opacity: [0, 0.7, 0], scale: [0.5, 1.2, 1.8] } : { opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(255,248,242,0.85), rgba(239,168,188,0.35) 38%, transparent 68%)',
        }}
      />

      {/* ── content ──────────────────────────────────────────────────── */}
      <div className="hero-fit relative z-10 flex w-full flex-col items-center px-6 text-center">
        <motion.p
          variants={item}
          initial="hidden"
          animate="show"
          className="kicker pt-[max(1.75rem,env(safe-area-inset-top))] text-wine/85"
        >
          {HERO.eyebrow}
        </motion.p>

        <motion.div
          variants={parent}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-center justify-center gap-6 py-8 sm:gap-7"
        >
          {/* softly glowing heart */}
          <motion.div variants={item}>
            <div className="hero-heart">
              <motion.div
                animate={
                  leaving
                    ? { scale: 1.12, filter: 'brightness(1.28)' }
                    : { scale: 1, filter: 'brightness(1)' }
                }
                transition={{ duration: 0.9, ease: EASE }}
              >
                <GlowingHeart
                  size={isDesktop ? 180 : 150}
                  glow="rgba(255,255,255,0.75)"
                  stops={['#fffdfb', '#fbd9e4', '#e392ac', '#7e2b48']}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="display text-[clamp(3rem,12vw,7.5rem)] leading-[1.05] text-[#fff6f2]"
            style={{ textShadow: '0 2px 30px rgba(60,10,26,0.45)' }}
          >
            You &amp; Me{' '}
            <span
              className="a-beat inline-block align-baseline text-[clamp(1.8rem,6vw,4rem)]"
              style={{ filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.55))' }}
            >
              ❤️
            </span>
          </motion.h1>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col items-center gap-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:gap-6"
        >
          <Ornament tone="light" className="hero-divider" />

          <p className="display-quiet max-w-xl text-[clamp(1.05rem,2.9vw,1.55rem)] italic leading-relaxed text-blush">
            {HERO.tagline}
          </p>

          <p className="kicker text-gold-soft/85">Since {ANNIVERSARY_LONG}</p>

          <div className="relative mt-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -m-6 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.28), transparent 68%)',
                animation: 'halo 4.4s ease-in-out infinite',
              }}
            />
            <GoldButton onClick={onOpen} icon={false} ariaLabel="Open my heart — enter the story">
              {HERO.cta}
            </GoldButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
