import { useCallback, useEffect, useState } from 'react'

/**
 * Reveals `text` one character at a time. `Run` is used as a dependency so
 * the letter can be replayed; `Run` changes restart the animation.
 */
export function useTypewriter(text, { speed = 26, start = true, run = 0 } = {}) {
  const [count, setCount] = useState(0)
  const [lastRun, setLastRun] = useState(run)

  // Replay: reset as soon as a new run is requested, during render
  // (https://react.dev/reference/react/useState#storing-information-from-previous-renders)
  if (lastRun !== run) {
    setLastRun(run)
    setCount(0)
  }

  useEffect(() => {
    if (!start || count >= text.length) return

    const previous = text[count - 1]
    let delay = speed
    if (previous === '\n') delay = speed * 5
    else if (previous === '.' || previous === '!' || previous === '?') delay = speed * 4
    else if (previous === ',' || previous === '—' || previous === ';') delay = speed * 2.2

    const id = setTimeout(() => setCount((c) => c + 1), delay)
    return () => clearTimeout(id)
  }, [count, start, speed, text])

  const finish = useCallback(() => setCount(text.length), [text])

  return {
    shown: text.slice(0, count),
    done: count >= text.length,
    finish,
  }
}
