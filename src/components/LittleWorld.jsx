import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Candlelight,
  FloatingHearts,
  Grain,
  PetalField,
  StarField,
  Vignette,
  usePointerGlow,
} from './Atmosphere'
import GlowingHeart from './GlowingHeart'
import Ornament, { ChapterLabel } from './Ornament'
import { Reveal } from './Reveal'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function LittleWorld() {
  const sectionRef = useRef(null)
  const glow = usePointerGlow()
  const calm = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.4 })
  const heartY = useTransform(smooth, [0, 1], [54, -54])
  const quoteY = useTransform(smooth, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      id="little-world"
      aria-labelledby="little-world-heading"
      onPointerMove={glow}
      className="velvet-night relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36"
    >
      <Vignette />
      <Grain opacity={0.26} />
      <Candlelight />
      <StarField count={30} seed={55} />
      <PetalField count={isDesktop ? 14 : 8} seed={67} peak={0.72} />
      <FloatingHearts
        count={isDesktop ? 12 : 7}
        seed={19}
        peak={0.5}
        minSize={9}
        maxSize={24}
        colors={['#fbdde4', '#f6c2d0', '#eed593']}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <ChapterLabel chapter="Chapter Three" title="Our little world" />
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="little-world-heading"
            className="display mt-7 text-[clamp(1.9rem,5.2vw,3.4rem)] text-blush"
          >
            Our Little World <span className="not-italic">🌸</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16} className="mt-8 w-full">
          <Ornament tone="light" />
        </Reveal>

        <motion.div style={{ y: calm ? 0 : heartY }} className="mt-16 sm:mt-20">
          <GlowingHeart size={isDesktop ? 250 : 170} />
        </motion.div>

        <motion.blockquote
          style={{ y: calm ? 0 : quoteY }}
          className="mt-16 sm:mt-20"
        >
          <p className="display-quiet mx-auto max-w-3xl text-[clamp(1.4rem,4.6vw,2.6rem)] leading-[1.35] text-ivory/92">
            <span aria-hidden="true" className="text-gold/70">
              “
            </span>
            In a world full of people, somehow my heart{' '}
            <span className="foil-warm italic">found you</span>.
            <span aria-hidden="true" className="text-gold/70">
              ”
            </span>
          </p>
        </motion.blockquote>

        <Reveal delay={0.1}>
          <p className="kicker mt-14 text-blush/40">and the whole world went quiet</p>
        </Reveal>
      </div>
    </section>
  )
}
