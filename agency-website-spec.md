# Agency Website — Project Spec

## 1. Positioning

**What we are:** A small full-stack team (frontend dev, backend/AI lead, sales exec) that designs, builds, and ships full-stack web products for founders and businesses. AI/RAG integration is a near-term add-on, not yet fully live — be honest about this on the site.

**Not:** A generic "we make websites" template shop. Lean on real, live products as proof instead of mockups.

**One-line pitch:** "We design, build, and ship full-stack + AI-powered products."

**Target client:** Founders/small businesses who need an MVP or full product built fast, not just a landing page.

---

## 2. Site Structure (6 pages)

### Home
- Hero: headline + subheadline + primary CTA ("Book a call") + secondary CTA ("See our work")
- 3 capability pillars: Frontend/UI, Backend/Infra, AI & RAG (marked "coming soon")
- Proof strip: logos/screenshots of AIBulletin, JSPARK.AI, JSPARK Prime, LMS project
- Footer CTA repeat

### Work / Case Studies
For each project — AIBulletin, JSPARK.AI, JSPARK Prime, LMS project, BI tool:
- Problem → What we built → Tech stack → Result/metrics (if available)
- Screenshot + 3–4 sentence write-up per project
- This is the highest-conversion page — write the content first, before touching code

### Services
Three tiers:
1. Landing page / marketing site — 1–2 weeks
2. Full-stack web app / MVP — 4–8 weeks
3. AI/RAG integration add-on — "early access," coming soon
- Give price ranges or "starting at ₹X" per tier — avoid vague "contact for pricing"

### Team
- 3 short profiles: founder (full-stack + AI/backend lead), backend developer, sales executive
- Each: name, role, 1–2 line strength, photo/avatar
- This page is what makes the site read as an agency, not a solo freelancer page

### Process
4-step "How we work":
1. Discovery call
2. Proposal & timeline
3. Build & weekly updates
4. Launch & handover
- Purpose: kill the client fear of "freelancer disappears mid-project"

### Contact
- Simple form + WhatsApp/Calendly link
- Route to sales executive's contact, not the founder's — keeps the founder heads-down building

---

## 3. Visual Design System

### Theme
Light theme, high-animation, coral + ink palette (distinct from the overused indigo/violet SaaS look).

### Colors
| Role | Hex | Use |
|---|---|---|
| Background | `#FDFCFB` | Page background |
| Surface / tint | `#FFF1EC` | Cards, badges, hover states |
| Primary accent | `#FF5A36` | CTAs, links, key highlights |
| Secondary accent | `#7C3AED` | Gradient pairing with coral, secondary highlights |
| Text primary | `#161616` | Headings, body |
| Text muted | `#7A7A7A` | Subheadings, secondary copy |
| Border | `rgba(22,22,22,0.08)` | Card hairlines |

Card icon-chip tints (derive from primary/secondary, ~10% opacity backgrounds):
- Coral tint: `#FAECE7` bg / `#993C1D` icon-text
- Violet tint: `#F1EBFC` bg / `#5B3EAE` icon-text

### Typography
- Sans-serif throughout (system font stack or Inter)
- Headings: medium weight (500), sentence case — not Title Case, not ALL CAPS
- Body: 15–16px, line-height 1.6–1.7
- Two weights only: 400 regular, 500 medium — avoid 600/700, reads heavy

### Animation guidelines (light theme — easy to overdo)
- Use `transform` and `opacity` only — avoid animating `box-shadow`/`width` directly (causes jank, especially visible on light backgrounds)
- Hero: slow ambient gradient blobs (coral→violet), 8–10s ease-in-out loops, subtle drift (10–15px range)
- Cards: gentle float loops (5–6s), hover-lift with shadow bloom on interactive elements
- Scroll: fade-up reveal on section entry, staggered by ~0.1s per element
- Buttons: `translateY(-2px)` + shadow bloom on hover, `scale(0.98)` on active
- Avoid: triggering heavy animation on every scroll tick, more than 2–3 simultaneous motions per viewport, animating blur/shadow directly

---

## 4. Tech Stack (recommended)

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS with the color tokens above as custom theme colors
- **Animation:** Framer Motion (scroll-reveal, hover states, page transitions)
- **Forms:** simple API route or a form service (e.g. Formspree) — no backend needed for v1
- **Hosting:** Vercel
- **Analytics:** Plausible or GA4 + basic SEO (og tags, sitemap.xml, robots.txt)

---

## 5. Content To Write First (before any code)

Write these case studies — this is 80% of the page's persuasive value:

1. **AIBulletin** (aibulletin.in) — AI news aggregation platform for Indian developers/founders. Problem it solves, stack (Next.js, structured data, RSS pipeline), traction (subscriber count if available).
2. **JSPARK.AI** (jspark.ai) — company product/platform, describe scope built.
3. **JSPARK Prime** (jsparkprime.com) — same, describe scope built.
4. **LMS project** — problem, stack, key features.
5. **Business Intelligence tool** — problem, stack, key features.

Team bios (2–3 lines each):
- Founder — full-stack + Go backend + RAG/AI specialist
- Backend developer — stack and strengths
- Sales executive — point of contact framing

---

## 6. Build Plan (target: ship in ~1 week)

| Day | Task |
|---|---|
| 1–2 | Write all case study content + team bios + service tier copy |
| 3 | Scaffold Next.js project, set up Tailwind theme with color tokens above, build layout/nav/footer |
| 3–4 | Build Home + Work pages with Framer Motion animations |
| 4 | Build Services + Team + Process pages |
| 5 | Build Contact page (form + WhatsApp/Calendly), wire up form submission |
| 5 | SEO basics: meta tags, og:image, sitemap, robots.txt |
| — | Deploy to Vercel, test on mobile, ship |

**Scope discipline:** don't let this exceed ~5–7 days of work — it's a lead-gen asset, not the priority over AIBulletin's revenue-critical work (Razorpay KYC, AdSense, RSS filtering).

---

## 7. Reference

Hero section visual direction (coral/ink, animated blobs, floating capability cards) was prototyped and approved — replicate that direction in Home hero when building.
