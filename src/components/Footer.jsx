import { FloatingHearts, Grain, StarField, Vignette } from './Atmosphere'
import Heart from './Heart'
import Ornament from './Ornament'
import { Reveal } from './Reveal'
import { FOOTER_LINE } from '../data/content'

export default function Footer() {
  return (
    <footer className="velvet-night relative overflow-hidden px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
      <Vignette className="opacity-60" />
      <Grain opacity={0.24} />
      <StarField count={20} seed={101} />
      <FloatingHearts count={7} seed={151} peak={0.4} minSize={8} maxSize={18} />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <Ornament tone="light" width="w-16 sm:w-20" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="display-quiet mt-10 text-[clamp(1.15rem,3.2vw,1.85rem)] italic leading-relaxed text-blush/90">
            This is our little world.{' '}
            <span className="foil-warm not-italic">Just You &amp; Me.</span> Forever.{' '}
            <span className="not-italic">❤️</span>
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex items-center gap-4 text-[0.66rem] uppercase tracking-[0.3em] text-blush/40">
            <span>VI</span>
            <Heart size={7} className="text-rose/70" />
            <span>06 · 06 · 2020</span>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="kicker mt-12 text-gold-soft/35">made with love, only for you</p>
        </Reveal>

        <span className="sr-only">{FOOTER_LINE}</span>
      </div>
    </footer>
  )
}
