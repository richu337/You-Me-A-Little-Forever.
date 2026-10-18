import { FloatingHearts, Grain, StarField, Vignette } from './Atmosphere'
import Heart from './Heart'
import Ornament from './Ornament'
import { Reveal } from './Reveal'
import { FOOTER } from '../data/content'
import { ANNIVERSARY_LONG } from '../lib/time'

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
            {FOOTER.line1}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="display-quiet mt-4 text-[clamp(1.15rem,3.2vw,1.85rem)] italic leading-relaxed text-blush/90">
            <span className="foil-warm not-italic">Just You &amp; Me.</span> Forever.{' '}
            <span className="not-italic">❤️</span>
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-9 flex items-center gap-4 text-[0.66rem] uppercase tracking-[0.3em] text-gold-soft/70">
            <Heart size={7} className="a-beat text-rose" />
            <span>Since {ANNIVERSARY_LONG}</span>
            <Heart size={7} className="a-beat text-rose" />
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="kicker mt-12 text-blush/65">made with love, only for you</p>
        </Reveal>
      </div>
    </footer>
  )
}
