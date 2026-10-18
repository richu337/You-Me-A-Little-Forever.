import { motion } from 'framer-motion'
import { FloatingHearts, Grain } from './Atmosphere'
import Ornament, { ChapterLabel } from './Ornament'
import { Reveal, staggerItem, staggerParent } from './Reveal'
import Ticker from './Ticker'
import { useElapsed } from '../hooks/useElapsed'
import { ANNIVERSARY_DISPLAY } from '../lib/time'
import { JOURNEY } from '../data/content'
import Heart from './Heart'

function Unit({ value, digits, label }) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col items-center gap-3"
      role="group"
      aria-label={`${value} ${label.toLowerCase()}`}
    >
      <span
        className="h-px w-10 bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className="display text-[clamp(2.1rem,7.5vw,3.5rem)] leading-none text-wine"
      >
        <Ticker value={value} digits={digits} />
      </span>
      <span aria-hidden="true" className="kicker text-gold-deep">
        {label}
      </span>
    </motion.div>
  )
}

export default function Journey() {
  const { years, months, days, hours, minutes, seconds } = useElapsed(1000)

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="blush-wash relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      <Grain opacity={0.16} />
      <FloatingHearts
        count={10}
        seed={31}
        peak={0.34}
        minSize={8}
        maxSize={18}
        colors={['#f6c2d0', '#fbdde4', '#d6b477']}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <ChapterLabel chapter="Chapter One" title="The count" tone="dark" />
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="journey-heading"
            className="display mt-7 text-center text-[clamp(1.9rem,5.2vw,3.4rem)] uppercase tracking-[0.01em] text-wine"
          >
            Our Journey Together
          </h2>
        </Reveal>

        <Reveal delay={0.16} className="mt-8">
          <Ornament tone="dark" />
        </Reveal>

        {/* ── the living counter ─────────────────────────────── */}
        <Reveal delay={0.22} className="mt-14">
          <motion.div
            variants={staggerParent(0.09, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-wine/10 bg-ivory/75 px-5 py-12 shadow-[0_50px_100px_-60px_rgba(72,16,31,0.55)] backdrop-blur-sm sm:rounded-[2.25rem] sm:px-12 sm:py-14"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
            />

            <motion.div variants={staggerItem} className="flex flex-col items-center gap-3">
              <span className="kicker text-gold-deep">Together since</span>
              <span className="rounded-full border border-gold/30 px-4 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-wine/70">
                {ANNIVERSARY_DISPLAY}
              </span>
            </motion.div>

            <div className="mt-11 grid grid-cols-3 gap-x-2 gap-y-11 sm:gap-x-4">
              <Unit value={years} digits={2} label="Years" />
              <Unit value={months} digits={2} label="Months" />
              <Unit value={days} digits={2} label="Days" />
              <Unit value={hours} digits={2} label="Hours" />
              <Unit value={minutes} digits={2} label="Minutes" />
              <Unit value={seconds} digits={2} label="Seconds" />
            </div>

            <motion.div
              variants={staggerItem}
              className="mt-12 flex items-center justify-center gap-4"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" aria-hidden="true" />
              <Heart size={9} className="text-rose/80" />
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50" aria-hidden="true" />
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="display-quiet mt-6 text-center text-[clamp(0.95rem,2.4vw,1.15rem)] italic leading-relaxed text-ink/70"
            >
              {JOURNEY.note}
            </motion.p>
          </motion.div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <blockquote className="display-quiet mx-auto max-w-2xl text-center text-[clamp(1.1rem,3vw,1.65rem)] italic leading-relaxed text-wine/85">
            <span aria-hidden="true" className="text-gold/80">
              “
            </span>
            {JOURNEY.quote}
            <span aria-hidden="true" className="text-gold/80">
              ”
            </span>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
