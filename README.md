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

The codebase has been refactored to separate concerns and improve maintainability. The structure is organized as follows:

### Component Architecture (src/components/)

The application logic and UI are broken down into granular Astro components. This modularity ensures that the main page (`index.astro`) remains declarative and readable.

- **Head.astro**: Manages all SEO meta tags, font preloading, and favicon links.
- **LeftPanel.astro**: Contains the static content of the "hero" section, including the introduction and ASCII art.
- **TabPanel.astro**: Implements the interactive right-hand panel. This component handles the rendering of tab headers and content panels.
- **MobileNav.astro**: Encapsulates the mobile-specific navigation drawer and the hamburger menu interface.
- **TypewriterScript.astro**: Contains the logic and state management for the typewriter effect used for quotes.
- **InteractivityScript.astro**: Handles global event listeners, tab switching logic, keyboard navigation (ARIA accessibility), and mobile drawer interactions.

### Style Architecture (src/styles/)

CSS is organized into modules based on functionality rather than component locality. The `main.css` file acts as the entry point, importing the following specialized stylesheets:

- **variables.css**: Defines CSS Custom Properties (variables) for the design system. This is the single source of truth for colors, fonts, spacing, and transitions.
- **base.css**: Contains the CSS reset, typography base, and global element styles.
- **layout.css**: Defines the primary flexbox grid structure for the two-column layout.
- **components.css**: Styles specific UI elements such as the typewriter container, ASCII art block, and buttons.
- **tabs.css**: Manages the visual state of the interactive tabs, including their expansion animations and hover states.
- **contact.css**: Specific styles for the Contact section, handling the layout of social links and profile imagery.
- **mobile.css**: Contains all media queries and styles required for the mobile view, including the navigation drawer transformation and layout reflows.
- **print.css**: Optimized styles for print media.

## Implementation Details for AI Assistants

Future modifications should adhere to the following guidelines to maintain consistency and performance:

1.  **State Management**: Avoid introducing client-side state management libraries. The current implementation relies on DOM manipulation and native event listeners within `InteractivityScript.astro`.
2.  **Styling**: Continue using the modular CSS approach. Do not introduce CSS frameworks (e.g., Tailwind, Bootstrap). All new styles should use the variables defined in `variables.css`.
3.  **Animations**: Use CSS transitions and keyframes for visual effects whenever possible to offload rendering to the browser's compositor thread. JavaScript animations are currently limited to the Oneko cat and the Typewriter effect.
4.  **Accessibility**: Maintain high accessibility standards. Ensure all interactive elements have appropriate ARIA attributes (`aria-expanded`, `aria-selected`, `role="tab"`, etc.) and are keyboard navigable.
5.  **Performance**: Keep the initial bundle size small. Image assets are served from the `public/` directory and should be optimized before inclusion.

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
