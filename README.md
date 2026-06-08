# Agentic AI Automation — Production Homepage

Enterprise-grade Next.js 15 homepage. Mobile-first. SEO-optimised. Conversion-ready.

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSG + ISR + RSC for max SEO + perf |
| Language | TypeScript | Type safety, scalability |
| Styling | Tailwind CSS + CSS vars | No runtime CSS-in-JS overhead |
| Fonts | Syne (display) + DM Sans (body) | Premium, fast, not generic |
| Deployment | Vercel | Edge network, instant deploys |
| Chat | OpenAI GPT-4o-mini | Fast, cheap, RAG-upgradeable |

---

## Project Structure

```
agentic-ai/
├── app/
│   ├── layout.tsx          # Root layout + full SEO metadata + schema
│   ├── page.tsx            # Homepage composition
│   ├── globals.css         # Design system tokens + base styles
│   ├── sitemap.ts          # Dynamic XML sitemap generation
│   ├── robots.ts           # Search engine crawl rules
│   └── api/
│       └── chat/
│           └── route.ts    # Chatbot API — RAG-ready backend
├── components/
│   ├── Nav.tsx             # Sticky navigation with mobile drawer
│   ├── Hero.tsx            # Hero section with animated stats
│   ├── TrustBar.tsx        # Trust signals + positioning statement
│   ├── Services.tsx        # 6-service grid with full copy
│   ├── Process.tsx         # 4-step process section
│   ├── FAQ.tsx             # Accordion FAQ (schema-ready)
│   ├── BookCTA.tsx         # Book call + email + WhatsApp CTA
│   ├── Footer.tsx          # Full footer with internal link architecture
│   ├── ChatWidget.tsx      # Floating AI chatbot
│   └── StickyMobileCTA.tsx # Mobile-only bottom CTA bar
├── .env.example            # All environment variables
├── next.config.ts          # Performance + security headers
├── tailwind.config.ts      # Design token extensions
├── vercel.json             # Multi-region deployment config
└── tsconfig.json           # TypeScript strict config
```

---

## Quick Start

### 1. Install

```bash
cd agentic-ai
npm install
```

### 2. Environment

```bash
cp .env.example .env.local
# Add your OPENAI_API_KEY at minimum to enable the chatbot
```

### 3. Dev

```bash
npm run dev
# http://localhost:3000
```

### 4. Production build

```bash
npm run build
npm run start
```

---

## Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard:
# Settings → Environment Variables
# Required: OPENAI_API_KEY
# Optional: PINECONE_*, HUBSPOT_*, NEXT_PUBLIC_CALENDLY_URL
```

### Multi-region (already configured in vercel.json)
- `iad1` — US East (AWS N. Virginia)
- `lhr1` — Europe (AWS London)
- `sin1` — Asia-Pacific (AWS Singapore)
- `bom1` — India (AWS Mumbai)

---

## SEO Checklist

### Implemented
- [x] Semantic HTML5 structure with proper heading hierarchy (h1 → h2 → h3)
- [x] Server-rendered metadata via Next.js `metadata` export
- [x] Dynamic OG tags and Twitter cards
- [x] Canonical URLs
- [x] Dynamic `sitemap.xml` at `/sitemap.xml`
- [x] `robots.txt` at `/robots.txt`
- [x] Organization schema (JSON-LD)
- [x] ProfessionalService schema with offer catalog
- [x] FAQPage schema
- [x] Internal linking architecture in footer
- [x] Programmatic SEO-ready URL structure (`/services/[slug]`, `/industries/[slug]`)

### You need to do
- [ ] Submit sitemap to Google Search Console
- [ ] Add real OG image at `/public/og-image.jpg` (1200×630px)
- [ ] Set up Google Analytics 4 (add `NEXT_PUBLIC_GA_ID` env var)
- [ ] Add real case studies to `case-studies` section
- [ ] Start blog with SEO-targeted content
- [ ] Build `/services/[slug]` pages for keyword depth

---

## Chatbot: RAG Upgrade Path

The chatbot ships with a direct OpenAI call. To upgrade to full RAG:

### 1. Add Pinecone vector search

```bash
npm install @pinecone-database/pinecone
```

```typescript
// app/api/chat/route.ts — add before LLM call
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const index = pc.index(process.env.PINECONE_INDEX!);

// Get embedding for query
const embedding = await getEmbedding(query); // OpenAI text-embedding-3-small
const results = await index.query({ vector: embedding, topK: 5, includeMetadata: true });
const context = results.matches.map(m => m.metadata?.text).join("\n\n");
```

### 2. Add CRM handoff (HubSpot)

```typescript
// After LLM response, extract lead signals
if (conversationContainsContact(messages)) {
  await createHubSpotContact({ email, name, company, source: "chatbot" });
}
```

### 3. Inject Calendly link

When intent = booking detected, append:
`\n\nBook directly: ${process.env.NEXT_PUBLIC_CALENDLY_URL}`

---

## Performance Targets (Lighthouse)

| Metric | Target | Approach |
|--------|--------|----------|
| Performance | 95+ | SSG, minimal JS hydration, optimised fonts |
| SEO | 100 | Full metadata, semantic HTML, schema |
| Accessibility | 95+ | ARIA labels, semantic elements, contrast |
| Best Practices | 95+ | HTTPS, security headers, no console errors |

---

## Required After Setup

1. **Replace Calendly URL** in `BookCTA.tsx` and `.env.example`
2. **Replace WhatsApp link** in `BookCTA.tsx` with your actual WhatsApp Business number
3. **Add `/public/og-image.jpg`** — 1200×630px branded image
4. **Add `/public/favicon.ico`** and related icons
5. **Add `/public/logo.png`** (for schema.org logo)
6. **Configure Google Analytics** in `app/layout.tsx`
7. **Set up Calendly widget** (optional: embed inline vs. redirect)

---

## Content Expansion Roadmap

```
Phase 1 (Now):       Homepage → Google indexing
Phase 2 (Month 1):   /services/[slug] pages → keyword depth
Phase 3 (Month 2):   /blog/ → SEO content + topical authority
Phase 4 (Month 3):   /case-studies/ → trust + conversion
Phase 5 (Month 6):   /industries/[slug] → vertical targeting
Phase 6 (Ongoing):   /tools/ + /templates/ → lead magnets
```

---

## Contact

**Email:** Contact@agenticAiAutomation.co  
**Site:** https://agenticaiautomation.co
