# You & Me — A Little Forever

An interactive anniversary love letter — six years of memories, wrapped in a
little world made for two.

Built as a single-page experience with an opening "Open My Heart 💌" welcome
screen, a live counter ticking since **June 7, 2021**, six reasons on
flip-cards, a sealed envelope that opens into a hand-typed letter, and a
cinematic finale with a hidden message.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** for reveals and interactions
- **Lucide React** for the reason-card icons
- Fonts: Fraunces (display), Jost (body), Caveat (letter), Petit Formal Script (signature)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173/
```

## Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server with HMR   |
| `npm run build` | Production build into `dist/`   |
| `npm run preview` | Preview the production build  |
| `npm run lint`  | Lint with Oxlint                |

## Chapters

1. **Welcome** — blush-pink-to-burgundy gradient, floating hearts, sparkles, and a glowing heart that opens the story
2. **Our Journey** — a live, calendar-accurate counter since **June 7, 2021**
3. **Six Reasons, One Heart** — six cards that open into hidden messages
4. **Our Little World** — a slow, luminous heart and falling petals
5. **A Letter From My Heart** — a sealed envelope that opens into a typed letter
6. **The Final Surprise** — a starry velvet finale and one last hidden message
7. **Footer** — _This is our little world. Just You & Me. Forever. ❤️_

## Date & content

- The anniversary lives in **one place**: `ANNIVERSARY_DATE = "2021-06-07"` in
  `src/lib/time.js`, parsed by hand into local calendar components so the day
  can never shift to June 6 or 8 because of timezone conversion.
- All prose lives in `src/data/content.js`, so messages are easy to edit.

## Notes

- Fully responsive, with a `prefers-reduced-motion` fallback for all animation.
- Completely silent by design — no audio anywhere, no login, no photo gallery.
- Ambient motion (hearts, petals, stars, sparkles) uses seeded, deterministic
  CSS keyframes; Framer Motion is reserved for interactions and reveals.

## Project layout

```
src/
  App.jsx                 # phase machine + chapter composition
  index.css               # design tokens, surfaces, keyframes
  components/             # one file per section + shared primitives
  data/content.js         # the words: hero, reasons, letter, final message
  hooks/                  # useElapsed, useTypewriter, useMediaQuery
  lib/                    # time math (ANNIVERSARY_DATE), seeded random
```
