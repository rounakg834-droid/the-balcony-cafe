# The Balcony Cafe — Jalandhar | Commercial Showcase Website

A premium, cinematic, highly animated cafe showcase website for **The Balcony Cafe & Grill**, located in Jalandhar, Punjab, India. Designed to offer visitors an editorial, light-luxury digital experience that celebrates the physical cafe's artisanal roastery, sunlit terraces, and welcoming culinary craft.

---

## 🌟 Key Features

1. **Cinematic Loading Experience**
   - Elegant ivory and caramel splash screen featuring the official "The Balcony Cafe & Grill" typography, animated coffee cup emblem, and real-time asset loading progress bar.

2. **Full-Screen Editorial Hero**
   - Cormorant Garamond display serif typography with split-word masked reveals.
   - Real cafe showcase imagery (`public/assets/images/`) arranged in a layered 3D composition with floating accent cards.
   - Spring-damped mouse parallax on desktop and magnetic CTA buttons.

3. **Pinned 3D Scroll Storytelling (GSAP + ScrollTrigger)**
   - Pinned full-screen culinary walkthrough transitioning across 4 real signature scenes:
     - *Mediterranean Mezze Platter*
     - *Farmhouse Hearth Pizza & Crisp Sides*
     - *Herb-Crusted Cutlet & Aglio Olio*
     - *The Artisan Coffee House Bar*
   - Dynamic 3D card tilt, horizontal parallax typography, and smooth background color morphing.

4. **Curated Interactive Menu**
   - 5 animated categories: *Coffee & Beverages*, *Starters*, *Pizza & Pasta*, *Main Course*, and *Desserts*.
   - Filter tabs with fluid sliding indicators and 3D card elevation on hover.
   - Authentic culinary tags with no invented prices or artificial online carts.

5. **Cinematic Photo Gallery & Fullscreen Lightbox**
   - 13 verified local cafe photos in an editorial masonry layout with category filtering.
   - Desktop 3D perspective tilt on cards and interactive fullscreen lightbox with keyboard navigation (`Left`, `Right`, `Escape`).

6. **"Your Table Is Waiting" Call-to-Action & Visit Section**
   - Real Google Maps directions link for *The Balcony Cafe, Jalandhar*.
   - Verified daily operating hours and visitor amenities.
   - Direct Instagram community link.

7. **Desktop Luxury Custom Cursor & Scroll Progress**
   - Non-intrusive caramel cursor ring with interactive element expansion (disabled on mobile and touchscreens).
   - Real-time top progress bar tracking page scroll depth.

---

## 🎨 Design Palette (Light Luxury Theme)

- **Ivory**: `#FAF7F0` (Primary background)
- **Beige**: `#E8D5BD` (Borders & accents)
- **Coffee Brown**: `#795548` (Brand headers & buttons)
- **Caramel**: `#C68B59` (Warm highlights & icons)
- **Dark Text**: `#29221E` (Editorial typography)

---

## 🛠️ Tech Stack

- **React 18** (Modern functional components & hooks)
- **Vite 6** (Blazing-fast build tool and HMR)
- **Tailwind CSS v3** (Custom luxury color tokens, typography & spacing)
- **GSAP 3.12 + ScrollTrigger** (Fluid 60fps animations and pinned storytelling)
- **Lucide React** (Clean, minimalist iconography)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build

To test the production build with asset optimization:

```bash
npm run build
```

To preview the generated production build locally:

```bash
npm run preview
```

---

## 📦 Deployment Preparation

- The project uses relative asset resolution (`base: './'`) in `vite.config.js`, making it ready for deployment to **GitHub Pages**, **Vercel**, **Netlify**, or standard web hosting.
- Below-the-fold images use `loading="lazy"` to minimize bandwidth usage.
- Critical hero imagery is preloaded via `<link rel="preload">` in `index.html`.
- Full compliance with `prefers-reduced-motion` for accessibility.

---

## 📋 Business Details for Client Verification

Before final public launch, the cafe owner may configure:
- Exact street address / landmark in Model Town, Jalandhar (in `src/constants/cafeData.js`).
- Official phone number and WhatsApp direct inquiry link.
- Official Instagram handle (`@thebalconycafe.jalandhar`).
