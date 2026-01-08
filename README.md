# Aryan Kudva - Personal Portfolio

## Project Overview

This repository contains the source code for a minimalist, high-performance personal portfolio website. The project is built using Astro, strictly adhering to Vanilla CSS and Vanilla JavaScript to minimize runtime overhead and external dependencies.

The design philosophy prioritizes a clean, text-centric aesthetic with subtle animations and a responsive layout that adapts seamlessly across device sizes.

## Technology Stack

- **Core Framework**: Astro (Static Site Generation)
- **Styling**: Vanilla CSS (Modularized using CSS @import)
- **Scripting**: Vanilla JavaScript
- **Typography**: Fira Sans (Body) and Fira Mono (Monospace/Code)

## Architecture and Structure

The codebase is organized to separate concerns and improve maintainability.

### Component Architecture (src/components/)

```
src/components/
├── AchievementsLedger.astro    ← Achievements tab content (grid layout)
├── ContactSection.astro         ← Contact tab content (social links, resume, blog)
├── EducationTimeline.astro      ← Education tab content (vertical timeline)
├── ExperienceTimeline.astro     ← Experience tab content (2-sided ledger)
├── ProjectsShowcase.astro       ← Projects tab content (skill filter + cards)
├── TabPanel.astro               ← Tab orchestrator (imports all tab components)
├── LeftPanel.astro              ← Intro/hero section with ASCII art
├── MobileNav.astro              ← Mobile navigation drawer
├── Head.astro                   ← SEO meta tags, fonts, favicon
├── InteractivityScript.astro    ← Global interactions (tabs, mobile drawer)
└── TypewriterScript.astro       ← Quote typewriter effect
```

### Style Architecture (src/styles/)

```
src/styles/
├── main.css         ← Global entry point (imports all other CSS files)
├── variables.css    ← Design tokens (colors, fonts, spacing)
├── base.css         ← CSS reset & typography
├── layout.css       ← Main grid layout (two-column)
├── components.css   ← Misc UI elements (typewriter, ASCII art)
├── tabs.css         ← Tab styling & animations
├── contact.css      ← Contact section styles
├── education.css    ← Education timeline styles
├── experience.css   ← Experience ledger styles
├── achievements.css ← Achievements grid styles
├── projects.css     ← Projects filter & cards
├── mobile.css       ← Mobile responsive overrides
└── print.css        ← Print media styles
```

### Blog Architecture (src/pages/blog/)

The blog is integrated within the portfolio using Astro's file-based routing.

```
src/
├── pages/
│   ├── index.astro           ← Portfolio home page
│   └── blog/
│       ├── index.astro       ← Blog listing page
│       └── [slug].astro      ← Dynamic blog post template
├── content/
│   └── blog/
│       ├── my-first-post.md  ← Blog post (Markdown)
│       └── another-post.md   ← Blog post (Markdown)
└── layouts/
    └── BlogPost.astro        ← Blog post layout template
```

### Public Assets (public/)

Static assets served directly at the root URL.

```
public/
├── oneko.js         ← Cat animation script
├── oneko.gif        ← Cat sprite sheet
├── pfp.png          ← Profile picture
└── resume.pdf       ← Resume file (Place your PDF here)
```

**How it works:**
- Blog posts are written in Markdown in `src/content/blog/`
- Each post has frontmatter (title, date, description, tags)
- The blog index (`/blog`) lists all posts
- Individual posts are accessed at `/blog/[slug]`

## Implementation Details for AI Assistants

Future modifications should adhere to the following guidelines to maintain consistency and performance:

1.  **State Management**: Avoid introducing client-side state management libraries. The current implementation relies on DOM manipulation and native event listeners within `InteractivityScript.astro`.
2.  **Styling**: Continue using the modular CSS approach. Do not introduce CSS frameworks (e.g., Tailwind, Bootstrap). All new styles should use the variables defined in `variables.css`.
3.  **Animations**: Use CSS transitions and keyframes for visual effects whenever possible to offload rendering to the browser's compositor thread. JavaScript animations are currently limited to the Oneko cat and the Typewriter effect.
4.  **Accessibility**: Maintain high accessibility standards. Ensure all interactive elements have appropriate ARIA attributes (`aria-expanded`, `aria-selected`, `role="tab"`, etc.) and are keyboard navigable.
5.  **Performance**: Keep the initial bundle size small. Image assets are served from the `public/` directory and should be optimized before inclusion.
6.  **Blog Posts**: Write blog posts in Markdown format in `src/content/blog/`. Use the frontmatter template provided in the example posts.

## Development

To start the development server:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## TODO

- [ ] On Experience tab: Include more information for tabs
- [ ] On Achievements tab: List out 4 achievements
- [ ] Test all column parts for mobile view
- [ ] On Project tab: Add Projects that I have Made!
- [ ] Add blog posts