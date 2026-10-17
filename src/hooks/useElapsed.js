import { useEffect, useState } from 'react'
import { elapsedParts } from '../lib/time'

/** Live-ticking elapsed time since the anniversary. */
export function useElapsed(intervalMs = 1000) {
  const [parts, setParts] = useState(() => elapsedParts())

  useEffect(() => {
    const id = setInterval(() => setParts(elapsedParts()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return parts
}
