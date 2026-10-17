import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Heart from './Heart'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to the beginning"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-[#2b0711]/80 text-blush backdrop-blur-md transition-colors duration-500 hover:border-gold/80 hover:text-ivory sm:h-14 sm:w-14"
          style={{ boxShadow: '0 18px 40px -18px rgba(30,4,9,0.9)' }}
        >
          <Heart size={15} className="a-beat" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
