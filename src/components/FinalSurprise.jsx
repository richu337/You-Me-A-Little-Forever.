import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Candlelight,
  FloatingHearts,
  Grain,
  PetalField,
  SparkleField,
  StarField,
  Vignette,
  usePointerGlow,
} from './Atmosphere'
import GlowingHeart from './GlowingHeart'
import GoldButton from './GoldButton'
import Heart from './Heart'
import HeartBurst from './HeartBurst'
import Ornament, { ChapterLabel } from './Ornament'
import { EASE, Reveal } from './Reveal'
import { FINAL } from '../data/content'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function FinalSurprise() {
  // Increments on every "Read Again", which remounts the message so the
  // reveal (burst, rings, entrance) replays from the start.
  const [revealCount, setRevealCount] = useState(0)
  const revealed = revealCount > 0

  const glow = usePointerGlow()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const paragraphs = FINAL.secret.split('\n\n')

  return (
    <section
      id="forever"
      aria-labelledby="forever-heading"
      onPointerMove={glow}
      className="velvet-night relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-28 sm:px-8 sm:py-36"
    >
      <Vignette />
      <Grain opacity={0.28} />
      <Candlelight />
      <StarField count={44} seed={13} />
      <SparkleField count={16} seed={29} peak={0.8} />
      <FloatingHearts
        count={isDesktop ? 14 : 8}
        seed={71}
        peak={0.55}
        minSize={9}
        maxSize={26}
        colors={['#fbdde4', '#f6c2d0', '#eed593']}
      />
      <PetalField count={isDesktop ? 9 : 5} seed={83} peak={0.6} />

      {/* the background dims softly once the hidden message is revealed */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[#170309]/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <Reveal>
          <ChapterLabel chapter="Chapter Five" title="Forever" />
        </Reveal>

        <Reveal delay={0.12} className="mt-16 sm:mt-20">
          <motion.div
            animate={
              revealed
                ? { scale: 1.1, filter: 'brightness(1.25)' }
                : { scale: 1, filter: 'brightness(1)' }
            }
            transition={{ duration: 1.2, ease: EASE }}
          >
            <GlowingHeart
              size={isDesktop ? 230 : 160}
              draw
              glow={revealed ? 'rgba(241,193,208,0.85)' : 'rgba(226,158,179,0.6)'}
            />
          </motion.div>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <h2
            id="forever-heading"
            className="display text-[clamp(1.7rem,5vw,3.2rem)] uppercase leading-[1.2] tracking-[0.01em] text-blush"
          >
            <span className="block">Six Years Down,</span>
            <span className="block">
              <span className="foil">Forever to Go.</span>{' '}
              <span className="a-beat inline-block align-baseline not-italic">❤️</span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16} className="mt-9 w-full">
          <Ornament tone="light" />
        </Reveal>

        <Reveal delay={0.22}>
          <blockquote className="display-quiet mx-auto mt-9 max-w-2xl text-[clamp(1rem,2.7vw,1.3rem)] italic leading-relaxed text-ivory/85">
            <span aria-hidden="true" className="text-gold/70">
              “
            </span>
            {FINAL.magic}
            <span aria-hidden="true" className="text-gold/70">
              ”
            </span>
          </blockquote>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="mx-auto mt-6 max-w-2xl text-[0.95rem] leading-[1.9] text-ivory/75 sm:text-[1rem]">
            {FINAL.choose}
          </p>
        </Reveal>

        <div className="relative mt-16 flex w-full flex-col items-center">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -10 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -m-7 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(226,158,179,0.25), transparent 68%)',
                    animation: 'halo 4.4s ease-in-out infinite',
                  }}
                />
                <GoldButton
                  onClick={() => setRevealCount(1)}
                  icon={false}
                  ariaLabel="Reveal one last thing"
                >
                  One Last Thing... 💗
                </GoldButton>
              </motion.div>
            ) : (
              <motion.div
                key={`message-${revealCount}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5 }}
                className="relative flex w-full flex-col items-center"
              >
                <span
                  aria-hidden="true"
                  className="ring-bloom pointer-events-none absolute left-1/2 top-8 -ml-[190px] h-[380px] w-[380px] rounded-full"
                  style={{ border: '1px solid rgba(238,213,147,0.55)' }}
                />
                <span
                  aria-hidden="true"
                  className="ring-bloom pointer-events-none absolute left-1/2 top-8 -ml-[140px] h-[280px] w-[280px] rounded-full"
                  style={{ border: '1px solid rgba(243,193,208,0.5)', animationDelay: '0.18s' }}
                />
                <HeartBurst
                  count={22}
                  seed={977}
                  minDistance={130}
                  maxDistance={340}
                  minSize={9}
                  maxSize={26}
                  minDur={1.5}
                  maxDur={2.6}
                  minDelay={0}
                  maxDelay={0.25}
                  minScale={0.7}
                  maxScale={2}
                  colors={['#eed593', '#f1c2ce', '#efa8bc', '#fff6ea', '#d6b477', '#d9618a']}
                  className="z-30"
                />

                <motion.p
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                  className="kicker text-gold-soft/80"
                >
                  And here it is
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 34, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.28 }}
                  className="relative mt-8 w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-blush/25 px-6 py-11 text-center backdrop-blur-sm sm:px-12 sm:py-14"
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(126,48,73,0.55) 0%, rgba(58,13,27,0.72) 55%, rgba(32,6,14,0.8) 100%)',
                    boxShadow:
                      '0 0 90px rgba(226,158,179,0.3), inset 0 0 70px rgba(226,158,179,0.09)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-soft/70 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-12 text-[9rem] leading-none text-blush/[0.07]"
                  >
                    ∞
                  </span>

                  <div className="a-beat mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-blush/30 text-blush">
                    <Heart size={18} />
                  </div>

                  <p className="display-quiet mx-auto max-w-xl text-[clamp(1.15rem,3.2vw,1.6rem)] italic leading-snug text-blush">
                    {paragraphs[0]}
                  </p>

                  <div className="mx-auto my-7 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                  <div className="mx-auto max-w-xl space-y-5">
                    <p className="text-[0.95rem] leading-[1.9] text-ivory/85 sm:text-[1rem]">
                      {paragraphs[1]}
                    </p>
                    <p className="text-[0.95rem] leading-[1.9] text-ivory/85 sm:text-[1rem]">
                      {paragraphs[2]}
                    </p>
                  </div>

                  <p className="font-script mx-auto mt-9 max-w-xl text-[1.3rem] leading-snug text-gold-soft/90 sm:text-[1.5rem]">
                    {paragraphs[3]}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1 }}
                  className="mt-10"
                >
                  <GoldButton
                    tone="light"
                    onClick={() => setRevealCount((count) => count + 1)}
                    icon={false}
                    className="!px-6 !py-3"
                    ariaLabel="Read the final message again"
                  >
                    Read Again
                  </GoldButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
