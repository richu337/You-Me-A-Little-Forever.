import { useMemo, useState } from 'react'
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
import Ornament, { ChapterLabel } from './Ornament'
import { EASE, Reveal } from './Reveal'
import { SECRET_MESSAGE } from '../data/content'
import { between, pick, seededList } from '../lib/random'
import { useMediaQuery } from '../hooks/useMediaQuery'

function CelebrationBurst({ count = 22 }) {
  const parts = useMemo(
    () =>
      seededList(count, 977, (rnd, i) => {
        const angle = (i / count) * Math.PI * 2 + between(rnd, -0.18, 0.18)
        const distance = between(rnd, 130, 340)
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotate: between(rnd, -90, 90),
          scale: between(rnd, 0.7, 2),
          size: between(rnd, 9, 26),
          dur: between(rnd, 1.5, 2.6),
          delay: between(rnd, 0, 0.25),
          color: pick(rnd, ['#eed593', '#f1c2ce', '#e29eb3', '#fff6ea', '#c19a2e', '#d9618a']),
        }
      }),
    [count],
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-30"
    >
      {parts.map((p) => (
        <span
          key={p.id}
          className="burst-heart"
          style={{
            color: p.color,
            '--bx': `${p.x}px`,
            '--by': `${p.y}px`,
            '--br': `${p.rotate}deg`,
            '--bs': p.scale,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
          }}
        >
          <Heart size={p.size} />
        </span>
      ))}
    </div>
  )
}

export default function FinalSurprise() {
  const [revealed, setRevealed] = useState(false)
  const glow = usePointerGlow()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const paragraphs = SECRET_MESSAGE.split('\n\n')

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

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <Reveal>
          <ChapterLabel chapter="Chapter Five" title="Forever" />
        </Reveal>

        <Reveal delay={0.12} className="mt-16 sm:mt-20">
          <GlowingHeart size={isDesktop ? 230 : 160} draw />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <h2
            id="forever-heading"
            className="display text-[clamp(1.7rem,5vw,3.2rem)] text-blush"
          >
            Six Years Down, <span className="foil">Forever to Go.</span>{' '}
            <span className="a-beat inline-block align-baseline not-italic">❤️</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16} className="mt-9 w-full">
          <Ornament tone="light" />
        </Reveal>

        <Reveal delay={0.22}>
          <blockquote className="display-quiet mx-auto mt-9 max-w-2xl text-[clamp(1rem,2.7vw,1.3rem)] italic leading-relaxed text-ivory/78">
            If I could go back to the beginning and choose all over again, I&rsquo;d still choose you.
            In every lifetime, in every version of this world, it would always be you and me.
          </blockquote>
        </Reveal>

        <div className="relative mt-16 flex flex-col items-center">
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
                  onClick={() => setRevealed(true)}
                  icon={false}
                  ariaLabel="Reveal one last thing"
                >
                  One Last Thing... 💗
                </GoldButton>
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
                  style={{ border: '1px solid rgba(241,194,206,0.5)', animationDelay: '0.18s' }}
                />
                <CelebrationBurst />

                <motion.p
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                  className="kicker text-gold-soft/70"
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

                  <p className="display-quiet mx-auto max-w-xl text-[clamp(1.2rem,3.4vw,1.7rem)] italic leading-snug text-blush">
                    {paragraphs[0]}
                  </p>

                  <div className="mx-auto my-7 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                  <p className="mx-auto max-w-xl text-[0.95rem] leading-[1.9] text-ivory/80 sm:text-[1rem]">
                    {paragraphs.slice(1).join(' ')}
                  </p>

                  <p className="font-script mt-9 text-[1.5rem] leading-none text-gold-soft/85 sm:text-[1.7rem]">
                    You &amp; Me, always
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="kicker mt-10 flex items-center gap-3 text-blush/45"
                >
                  <Heart size={8} className="text-rose" />
                  keep it forever
                  <Heart size={8} className="text-rose" />
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
