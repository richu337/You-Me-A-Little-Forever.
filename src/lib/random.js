/**
 * Small deterministic helpers so ambient fields (hearts, petals, stars)
 * keep the exact same layout across renders — no jitter, no re-shuffle.
 */

export function seedRandom(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function seededList(count, seed, build) {
  const rnd = seedRandom(seed)
  return Array.from({ length: count }, (_, index) => build(rnd, index))
}

export function between(rnd, min, max) {
  return min + rnd() * (max - min)
}

export function pick(rnd, list) {
  return list[Math.floor(rnd() * list.length) % list.length]
}
