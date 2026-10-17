import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bloom, FloatingHearts, Grain, PetalField } from './Atmosphere'
import GoldButton from './GoldButton'
import Heart from './Heart'
import Ornament, { ChapterLabel } from './Ornament'
import { EASE, Reveal } from './Reveal'
import { LETTER } from '../data/content'
import { useTypewriter } from '../hooks/useTypewriter'

/* ------------------------------------------------------------------ *
 * The envelope
 * ------------------------------------------------------------------ */
function Envelope({ opened, onOpen }) {
  return (
    <div className="relative mx-auto mt-14 w-full max-w-xl sm:mt-16" style={{ perspective: 1600 }}>
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-[-6%] h-16 rounded-[50%] blur-2xl"
        style={{ background: 'radial-gradient(ellipse, rgba(72,16,31,0.35), transparent 70%)' }}
      />

      <button
        type="button"
        onClick={onOpen}
        disabled={opened}
        aria-expanded={opened}
        aria-label={opened ? 'The letter is open' : 'Open the sealed envelope'}
        className="group relative block w-full cursor-pointer disabled:cursor-default"
      >
        <div
          className="relative w-full aspect-[3/2]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* back of the envelope */}
          <div
            className="absolute inset-0 rounded-[10px]"
            style={{
              background: 'linear-gradient(150deg, #6e1c34 0%, #50142a 55%, #370d1d 100%)',
              boxShadow: 'inset 0 0 40px rgba(30,4,9,0.55)',
            }}
          />

          {/* the letter inside, lifted as the flap comes away */}
          <motion.div
            className="absolute left-[6%] right-[6%] top-[9%] z-10 h-[82%] rounded-[6px] px-5 py-6"
            style={{
              transform: 'translateZ(28px)',
              background: 'linear-gradient(180deg, #fffdf8 0%, #fdf5ea 100%)',
              boxShadow: '0 -6px 24px rgba(30,4,9,0.35)',
            }}
            initial={false}
            animate={{ y: opened ? '-22%' : '0%' }}
            transition={{ duration: 0.95, ease: EASE, delay: opened ? 0.42 : 0 }}
          >
            <div className="flex flex-col gap-3">
              {[62, 82, 71, 88, 54, 76].map((width, index) => (
                <span
                  key={index}
                  className="block h-[3px] rounded-full bg-wine/10"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </motion.div>

          {/* front pocket */}
          <div
            className="absolute inset-0 z-20"
            style={{
              clipPath: 'polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)',
              borderRadius: '10px',
              background: 'linear-gradient(180deg, #7d2440 0%, #5c172e 48%, #43101f 100%)',
              boxShadow: 'inset 0 8px 26px rgba(30,4,9,0.45)',
            }}
          />

          {/* gold seams along the fold */}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-[22] h-full w-full"
          >
            <path
              d="M0 0 L150 104 L300 0"
              fill="none"
              stroke="rgba(238,213,147,0.42)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* top flap */}
          <motion.div
            className="absolute inset-x-0 top-0 z-30 h-full origin-top"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 52%)',
              background: 'linear-gradient(180deg, #8a2a47 0%, #69203a 60%, #521628 100%)',
              transformStyle: 'preserve-3d',
            }}
            initial={false}
            animate={{ rotateX: opened ? -168 : 0, opacity: opened ? 0 : 1 }}
            transition={{
              rotateX: { duration: 0.85, ease: EASE },
              opacity: { duration: 0.5, ease: 'easeOut', delay: opened ? 0.6 : 0 },
            }}
          />

          {/* wax seal */}
          <motion.div
            className="absolute left-1/2 top-[52%] z-40 -translate-x-1/2 -translate-y-1/2"
            initial={false}
            animate={
              opened
                ? { scale: 1.5, opacity: 0, rotate: 24, y: '-40%' }
                : { scale: 1, opacity: 1, rotate: 0, y: '0%' }
            }
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span
              className="flex aspect-square w-[4.6rem] max-w-[4.6rem] items-center justify-center rounded-full sm:w-[5rem]"
              style={{
                background: 'radial-gradient(circle at 34% 28%, #a6304f 0%, #7a1f38 45%, #4b1020 100%)',
                boxShadow: '0 8px 22px rgba(30,4,9,0.5), inset 0 0 0 1px rgba(238,213,147,0.35)',
              }}
            >
              <span className="flex h-[74%] w-[74%] items-center justify-center rounded-full border border-gold-soft/40">
                <Heart size={20} className="text-gold-soft/85" />
              </span>
            </span>
          </motion.div>

          {/* invitation glow while it is still sealed */}
          {!opened ? (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-40 rounded-[10px]"
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 0 1px rgba(238,213,147,0.35), 0 0 50px rgba(226,158,179,0.28)' }}
            />
          ) : null}
        </div>
      </button>

      <AnimatePresence>
        {!opened ? (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="kicker mt-9 flex items-center justify-center gap-3 text-gold-deep/70"
          >
            <Heart size={9} className="a-beat text-rose" />
            Tap the envelope
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * The letter itself
 * ------------------------------------------------------------------ */
function LetterSheet({ run, onReplay, onSeal }) {
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setTyping(true), 950)
    return () => clearTimeout(id)
  }, [])

  const { shown, done, finish } = useTypewriter(LETTER, { speed: 16, start: typing, run })

  const paragraphs = shown.length ? shown.split('\n\n') : ['']

  return (
    <motion.div
      initial={{ opacity: 0, y: -46, scale: 0.965 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.97 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative mx-auto mt-14 w-full max-w-2xl"
    >
      <Bloom
        size={520}
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        color="rgba(241,194,206,0.45)"
      />

      <div
        onClick={() => {
          if (!done) finish()
        }}
        className="relative rounded-[1.25rem] border border-gold/30 bg-gradient-to-b from-[#fffdf8] via-cream to-[#fbf1e5] px-6 py-9 shadow-[0_50px_100px_-55px_rgba(72,16,31,0.6)] sm:px-12 sm:py-12"
        style={{ cursor: done ? 'default' : 'pointer' }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.55]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, transparent 0 2.05rem, rgba(110,27,51,0.055) 2.05rem 2.1rem)',
          }}
        />

        <div className="relative">
          <p className="kicker mb-8 text-gold-deep/60">From my heart to yours</p>

          <div className="font-hand text-[1.32rem] leading-[2.05rem] text-ink/90 sm:text-[1.5rem] sm:leading-[2.35rem]">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`mb-5 last:mb-0 ${
                  index === 0 ? 'text-[1.5rem] font-semibold text-wine sm:text-[1.7rem]' : ''
                }`}
              >
                {paragraph}
                {index === paragraphs.length - 1 && !done ? (
                  <span className="caret" aria-hidden="true" />
                ) : null}
              </p>
            ))}
          </div>

          <AnimatePresence>
            {done ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                className="mt-10 flex flex-col items-end gap-1"
              >
                <span className="text-[0.68rem] uppercase tracking-[0.28em] text-wine/50">
                  Always yours,
                </span>
                <span className="font-script text-[1.6rem] leading-none text-wine sm:text-[1.9rem]">
                  You &amp; Me
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {done ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-wine/10 pt-8"
              >
                <GoldButton tone="dark" onClick={onReplay} icon={false} className="!px-6 !py-3">
                  Read it again
                </GoldButton>
                <GoldButton tone="dark" onClick={onSeal} icon={false} className="!px-6 !py-3">
                  Seal it back
                </GoldButton>
              </motion.div>
            ) : (
              <p className="mt-8 text-center text-[0.68rem] uppercase tracking-[0.28em] text-wine/35">
                tap the letter to read it all at once
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */
export default function Letter() {
  const [opened, setOpened] = useState(false)
  const [run, setRun] = useState(0)
  const [sheetKey, setSheetKey] = useState(0)

  const sealBack = () => {
    setOpened(false)
    setSheetKey((k) => k + 1)
  }

  const replay = () => setRun((r) => r + 1)

  return (
    <section
      id="letter"
      aria-labelledby="letter-heading"
      className="paper relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      <Grain opacity={0.16} />
      <Bloom size={560} className="left-1/2 top-[-10%] -translate-x-1/2" color="rgba(238,213,147,0.22)" />
      <FloatingHearts count={9} seed={131} peak={0.3} minSize={7} maxSize={16} />
      <PetalField count={7} seed={19} peak={0.3} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal>
          <ChapterLabel chapter="Chapter Four" title="The letter" tone="dark" />
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="letter-heading"
            className="display mt-7 text-center text-[clamp(1.9rem,5.2vw,3.4rem)] text-wine"
          >
            A Letter From My Heart <span className="not-italic">💌</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14} className="mt-8">
          <Ornament tone="dark" />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="display-quiet mx-auto mt-8 max-w-md text-center text-[clamp(1rem,2.6vw,1.25rem)] italic text-ink/65">
            There&rsquo;s something my heart wants you to know&hellip;
          </p>
        </Reveal>

        <Reveal delay={0.12} y={40}>
          <Envelope opened={opened} onOpen={() => setOpened(true)} />
        </Reveal>

        <AnimatePresence>
          {opened ? (
            <LetterSheet
              key={`sheet-${sheetKey}`}
              run={run}
              onReplay={replay}
              onSeal={sealBack}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  )
}
