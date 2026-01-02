# Personal Portfolio – Aryan Kudva

A minimal, terminal‑inspired portfolio built with **Astro** and **Cascadia/Ubuntu/Syne Mono** fonts.  
The design is dark, monochrome, and focuses on clean typography and subtle animations.

## Project Structure

```
/
├─ public/            # static assets (favicon, images, …)
├─ src/
│  ├─ pages/
│  │   ├─ index.astro   # Home page – name, terms, intro, quote, ASCII art
│  │   └─ blog.astro    # Blog placeholder (to be built)
│  ├─ styles/
│  │   └─ global.css    # Global CSS – no comment blocks
│  └─ data/
│      ├─ art.txt       # Static ASCII art
│      ├─ quotes.jsonl  # Quote list for the typewriter
│      └─ ascii_frames.json (legacy)
├─ package.json
└─ README.md
```

## TODO

- **[ ] Fill in the 5 tabs on the right**
  1. Projects – showcase selected works.
  2. Experience – professional journey.
  3. Education – academic background.
  4. Achievements – milestones & recognition.
  5. Contact – get in touch (email, Discord, GitHub, LinkedIn).
- **[ ] Re‑consider the centre column** – decide whether to keep it as a simple content area or turn it into a live preview / demo pane.
- **[ ] Build the Blog** – replace the placeholder with a real markdown‑driven blog (Astro collections, pagination, tags).
- **[ ] Deploy to a custom domain** – configure DNS, set up a CI/CD pipeline (e.g., Netlify, Vercel, Cloudflare Pages) and point the domain to the live site.
- **[ ] Polish the UI** – final visual tweaks, accessibility checks, and performance audit.

## Development

```sh
# Install dependencies
npm install

# Run dev server
npm run dev   # → http://localhost:4321
```

## Build & Deploy

```sh
npm run build   # → ./dist
npm run preview # preview the production build locally
```

## Design Guidelines (already applied)

- **Black background** (`--color-bg: #000000`).
- **White & gray monospace text** (`--color-text-primary`, `--color-text-muted`).
- **Terminal‑inspired**: blinking cursor on the name, subtle typewriter animation for the quote, no cards or resume blocks.
