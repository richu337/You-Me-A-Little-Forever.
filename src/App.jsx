import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import WelcomeScreen from './components/WelcomeScreen'
import Masthead from './components/Masthead'
import Journey from './components/Journey'
import Reasons from './components/Reasons'
import LittleWorld from './components/LittleWorld'
import Letter from './components/Letter'
import FinalSurprise from './components/FinalSurprise'
import Footer from './components/Footer'
import ScrollThread from './components/ScrollThread'
import BackToTop from './components/BackToTop'

/** Must match the welcome screen's exit duration. */
const CURTAIN_MS = 1150

export default function App() {
  // 'welcome' → nothing rendered yet · 'leaving' → story fades in behind the
  // curtain · 'ready' → curtain gone, scrolling unlocked
  const [phase, setPhase] = useState('welcome')

  useEffect(() => {
    const locked = phase !== 'ready'
    if (locked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return
    const id = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      setPhase('ready')
    }, CURTAIN_MS)
    return () => clearTimeout(id)
  }, [phase])

  const storyMounted = phase !== 'welcome'

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-ivory">
        {storyMounted ? (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.15, ease: 'easeOut' }}
          >
            <Masthead />
            <Journey />
            <Reasons />
            <LittleWorld />
            <Letter />
            <FinalSurprise />
            <Footer />
          </motion.main>
        ) : null}

        {storyMounted ? (
          <>
            <ScrollThread />
            <BackToTop />
          </>
        ) : null}

        <AnimatePresence>
          {phase !== 'ready' ? (
            <WelcomeScreen
              key="welcome"
              leaving={phase === 'leaving'}
              onOpen={() => setPhase((current) => (current === 'welcome' ? 'leaving' : current))}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
