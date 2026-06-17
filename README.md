# Navya EdTech — Premium Animated Marketing Site

A dark, futuristic, fully-animated SaaS-agency marketing site for **Navya EdTech**.
Built with **React + Vite + TypeScript + Tailwind + Framer Motion**. No Next.js — 100% client-side Vite.

> Tagline: **Innovate. Build. Elevate.**

## ✨ Highlights

- **3D Command-Center hero** — a mouse-reactive dashboard rig built purely from divs + CSS 3D
  (animated bar chart, SVG line graph, a counting performance score, code-editor, website preview,
  CRM/ERP module), surrounded by an orbiting tech-icon system, light beams, floating tech chips,
  and drifting data particles.
- **Global motion layer** — custom electric cursor + spring glow ring, particle mouse trail,
  animated orb/grid/noise background, scroll progress bar, page transitions.
- **Reusable motion system** — all easings, springs, fades, staggers, and word-reveals are defined
  once in `src/lib/animations.ts`.
- **Reveal-on-scroll, magnetic buttons, 3D tilt cards, counters** throughout.
- **4 routes + animated 404** — Home, Services, About, Contact (working validated form with an
  SVG checkmark success state), and a glitchy 404.

## 🎛 Motion & Accessibility

- Every continuous animation and the cursor/trail/heavy particles respect `prefers-reduced-motion`.
- Custom cursor, mouse trail, and heavy effects are **gated to desktop (≥1024px, fine pointer)**.
- Transform/opacity-only animations, semantic HTML, accessible labels, and visible focus rings.

## 🚀 Scripts

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check + production build
npm run preview # preview the production build
```

## 🗂 Structure

```
src/
  components/
    common/    Container, SectionHeading, Button, GlassCard, IconBadge, PageHero, CTASection
    effects/   CustomCursor, MagicMouseTrail, AnimatedBackground, FloatingOrbs, ScrollProgress,
               PageTransition, MagneticButton, TiltCard, Reveal, TextReveal, CounterUp, GlowGrid,
               MotionBeam, OrbitSystem, FloatingTechCards, HeroSpotlight
    layout/    Navbar, Footer, MobileMenu
    home/      HeroSection, CommandCenter, ServicesOverview, FeaturesSection, StatsSection,
               ProcessSection
    services/  ServiceGrid
    about/     CompanyStory, MissionVision, CoreValues, WhyChooseUs, TechStack
    contact/   ContactForm, ContactInfo
  data/        navigation, services, features, stats, process, about
  hooks/       useMediaQuery (useRichMotion / useReducedMotion)
  lib/         utils, animations
  pages/       Home, Services, About, Contact, NotFound
  types/       index.ts
```

## 🎨 Design tokens

Palette, fonts, shadows, and gradients live in `tailwind.config.js` and `src/index.css`
(dark navy command-center theme: `#0A1628` bg, `#1E6BFF` brand, `#0EA5E9` cyan accent,
Space Grotesk display + Inter body).
