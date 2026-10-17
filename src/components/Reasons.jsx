import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Heart, { HEART_PATH } from './Heart'
import Ornament, { ChapterLabel } from './Ornament'
import { Bloom, FloatingHearts, Grain } from './Atmosphere'
import { Reveal } from './Reveal'
import { REASONS } from '../data/content'
import { between, pick, seededList } from '../lib/random'

const FLIP = { duration: 0.8, ease: [0.22, 1, 0.36, 1] }

/** Hearts that scatter outward from the card when it opens. */
function HeartBurst({ seed = 3 }) {
  const parts = useMemo(
    () =>
      seededList(8, seed, (rnd, i) => {
        const angle = (i / 8) * Math.PI * 2 + between(rnd, -0.3, 0.3)
        const distance = between(rnd, 80, 165)
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance * 0.85 - 30,
          rotate: between(rnd, -60, 60),
          size: between(rnd, 8, 17),
          dur: between(rnd, 1.1, 1.8),
          delay: between(rnd, 0, 0.12),
          color: pick(rnd, ['#eed593', '#f1c2ce', '#e29eb3', '#fff6ea', '#c19a2e']),
        }
      }),
    [seed],
  )

  return (
    <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-20 block">
      {parts.map((p) => (
        <span
          key={p.id}
          className="burst-heart"
          style={{
            color: p.color,
            '--bx': `${p.x}px`,
            '--by': `${p.y}px`,
            '--br': `${p.rotate}deg`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
          }}
        >
          <Heart size={p.size} />
        </span>
      ))}
    </span>
  )
}

function ReasonCard({ reason, index, open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={open}
      aria-label={`${open ? 'Close' : 'Open'} reason ${reason.numeral}: ${reason.title}`}
      className="group relative block w-full cursor-pointer text-left"
      style={{ perspective: 1500 }}
    >
      <motion.span
        className="card-3d relative block h-[21rem] w-full sm:h-[22rem] lg:h-[23rem]"
        animate={{ rotateY: open ? 180 : 0 }}
        transition={FLIP}
        style={{ display: 'block' }}
      >
        {/* ── front ─────────────────────────────────────────── */}
        <span className="card-face absolute inset-0 block overflow-hidden rounded-[1.6rem] border border-gold/25 bg-gradient-to-b from-[#fffdf9] via-ivory to-[#f9eee7] p-7 shadow-[0_36px_70px_-46px_rgba(72,16,31,0.55)] transition-shadow duration-500 group-hover:shadow-[0_44px_80px_-40px_rgba(72,16,31,0.5)]">
          <span
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
          />
          <span
            aria-hidden="true"
            className="display pointer-events-none absolute -left-3 -top-4 text-[5rem] leading-none text-gold/[0.07]"
          >
            {reason.numeral}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[37%] -translate-x-1/2 -translate-y-1/2 text-rose"
          >
            <svg
              width="104"
              height="104"
              viewBox="0 0 24 24"
              className="a-drift"
              style={{ animationDelay: `${index * 0.7}s` }}
            >
              <path
                d={HEART_PATH}
                fill="rgba(226,158,179,0.06)"
                stroke="rgba(226,158,179,0.32)"
                strokeWidth="0.3"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="flex h-full flex-col">
            <span className="flex items-start justify-between">
              <span className="display text-[1.6rem] leading-none text-gold/80">{reason.numeral}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-rose/40 text-rose">
                <Heart size={11} />
              </span>
            </span>

            <span className="mt-auto block">
              <span className="display-quiet block text-[1.12rem] font-medium leading-snug text-wine sm:text-[1.2rem]">
                {reason.title}
              </span>
              <span className="mt-3 block text-[0.85rem] italic leading-relaxed text-ink/55">
                {reason.teaser}
              </span>
            </span>

            <span className="mt-7 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.28em] text-gold-deep/65 transition-colors duration-500 group-hover:text-gold-deep">
              <Heart size={8} className="text-rose/80" />
              Tap to open
            </span>
          </span>
        </span>

        {/* ── back ──────────────────────────────────────────── */}
        <span className="card-face card-back absolute inset-0 block overflow-hidden rounded-[1.6rem] border border-gold/30 p-7 text-left shadow-[0_36px_70px_-44px_rgba(30,4,9,0.75)]">
          <span className="absolute inset-0 bg-gradient-to-br from-[#5d1830] via-[#42101f] to-[#28070f]" />
          <span
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-soft/70 to-transparent"
          />
          <span
            aria-hidden="true"
            className="display pointer-events-none absolute -right-2 -top-2 text-[5rem] leading-none text-gold/10"
          >
            {reason.numeral}
          </span>

          <span className="relative flex h-full flex-col">
            <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-gold-soft/70">
              Reason {reason.numeral}
            </span>
            <span className="display-quiet mt-4 block text-[1rem] font-medium leading-snug text-blush sm:text-[1.05rem]">
              {reason.title}
            </span>
            <span className="mt-4 block text-[0.9rem] leading-[1.7] text-ivory/80">
              {reason.body}
            </span>
            <span className="mt-auto flex items-center gap-2 pt-5 text-[0.6rem] uppercase tracking-[0.28em] text-blush/50">
              <Heart size={8} className="text-rose" />
              Always
            </span>
          </span>
        </span>
      </motion.span>

      {open ? <HeartBurst seed={41 + index * 7} /> : null}
    </button>
  )
}

export default function Reasons() {
  const [openMap, setOpenMap] = useState(() => REASONS.map(() => false))

  const toggle = (index) =>
    setOpenMap((prev) => prev.map((value, i) => (i === index ? !value : value)))

  return (
    <section
      id="reasons"
      aria-labelledby="reasons-heading"
      className="paper relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      <Grain opacity={0.16} />
      <Bloom size={560} className="left-[-14%] top-[6%]" color="rgba(241,194,206,0.4)" />
      <Bloom size={520} className="right-[-12%] bottom-[4%]" color="rgba(238,213,147,0.22)" />
      <FloatingHearts count={8} seed={93} peak={0.3} minSize={7} maxSize={16} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <ChapterLabel chapter="Chapter Two" title="The reasons" tone="dark" />
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="reasons-heading"
            className="display mt-7 text-center text-[clamp(1.9rem,5.2vw,3.4rem)] text-wine"
          >
            Six Reasons, One Heart <span className="not-italic">💕</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14} className="mt-8">
          <Ornament tone="dark" />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-center text-[0.95rem] leading-relaxed text-ink/60">
            Six years gave me more than six reasons, but these are the ones I keep closest. Open
            each one — they are all, quietly, about you.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:pb-12">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.numeral} delay={0.06 * index} y={34}>
              <div className={index % 3 === 1 ? 'lg:translate-y-10' : ''}>
                <ReasonCard
                  reason={reason}
                  index={index}
                  open={openMap[index]}
                  onToggle={() => toggle(index)}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="display-quiet mt-10 text-center text-[clamp(1rem,2.4vw,1.3rem)] italic text-wine/75 lg:mt-16">
            One heart — and it has only ever been yours.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
