# Carfolio Development Game Plan

> **Purpose**: A practical, step-by-step guide to finish Carfolio from MVP to public launch. Follow the phases in order; every task links back to the tech stack (React + Vite, Tailwind, Framer-Motion, shadcn/ui, Convex, Clerk, Backblaze B2, Paystack).

---
## Phase 0 – Foundation (✅ mostly DONE)
| Area | Status | Next Action |
|------|--------|-------------|
| Project setup (Vite, Tailwind, shadcn/ui) | ✅ |  |
| Auth via Clerk | ✅ basic | Add social logins, JWT helper on Convex edge functions |
| Sidebar + Routing | ✅ first pass | Final IA (Dashboard, Garage, Analytics, Profile, Settings) |
| Dashboard skeleton | ✅ v1 | Hook to real data in Phase 1 |

---
## Phase 1 – Core Entities & CRUD (🔄 In Progress)
1. **Convex Schema** ✅
   ```ts
   // convex/schema.ts (implemented)
   export const users      = defineTable({ clerkId: v.string(), plan: v.string() })
   export const cars       = defineTable({ userId: v.id("users"), name:v.string(), cover:v.string(), make:v.string(), year:v.number(), status:v.string() })
   export const mods       = defineTable({ carId:v.id("cars"), title:v.string(), link:v.string(), price:v.number() })
   export const media      = defineTable({ carId:v.id("cars"), url:v.string(), type:v.string() })
   export const analytics  = defineTable({ userId:v.id("users"), metric:v.string(), value:v.number(), ts:v.number() })
   ```
   *Run `npx convex dev` to auto-gen types.*

2. **Pages / Components** ✅
   - `GaragePage` → grid of `CarCard` (CRUD).  
   - `CarDetail` (route: `/garage/:carId`) with subtabs **Specs · Mods · Media · Insights**. ✅ 
   - `ModForm`, `MediaUploader` (Dropzone + Progress). ✅  
   - Convex hooks: `useMutation("cars:add")`, etc. ✅

3. **Media Upload Flow** ✅
   - Client → B2 direct upload using pre-signed URL from a Convex action. ✅ 
   - On success, `media.add` mutation stores URL. ✅ 
   - Show Toast + thumbnail skeletons. ✅

4. **Validation & Error UX** ✅
   - Form validation, disabled buttons until valid, nice error banners. ✅

---
## Phase 2 – Analytics & Growth (☐)
1. **Event Tracking**  
   - On page view / mod click call Convex action `events.log`.  
   - Edge cron job aggregates into `analytics` table daily.
2. **Analytics Page**  
   - Time-range picker, line chart (recharts) + top lists.  
   - Lock advanced charts behind **Pro**.
3. **SEO / Sharing**  
   - Public profile pages: `/u/:username` (OG tags, SSR via Vite SSG).  
   - Share modal with QR + copy link.

---
## Phase 3 – Monetisation (☐)
1. **Paystack Integration**  
   - Pricing table (Free vs Pro).  
   - `POST /api/paystack/create-session` cloud function.  
   - Webhook → Convex action updates `users.plan`.
2. **Pro Features**  
   - Unlimited cars, advanced analytics, custom theme.

---
## Phase 4 – Polish & Launch (☐)
1. **Accessibility / a11y** – focus rings, aria-labels, colour contrast.  
2. **Performance** – code-split routes, lazy load media, use `Suspense` + skeletons.  
3. **End-to-End Tests** – Playwright: sign-up → add car → publish.  
4. **CI / CD** – GitHub Actions: lint, build, deploy (Netlify).  
5. **Beta Feedback Loop** – Feature flag "beta" cohort → feedback form.

---
## File/Folder Checklist
```
src/
 ├─ components/
 │   ├─ dashboard/ (✔)
 │   ├─ garage/
 │   ├─ analytics/
 │   ├─ profile/
 │   └─ settings/
 ├─ convex/ (schema + functions)
 ├─ pages/ (route wrappers)
 ├─ hooks/
 ├─ lib/ (api, utils)
public/
.env.example
```

---
## Suggested Timeline
| Week | Deliverable |
|------|-------------|
| 1 | Convex schema + Garage CRUD |
| 2 | Media upload to B2 + CarDetail tabs |
| 3 | Analytics collection + dashboards |
| 4 | Paystack subscriptions + gating |
| 5 | Polish, testing, beta launch |

---
## How to Use This Guide
1. Create GitHub issues per bullet.  
2. Work top-down by phase.  
3. Mark checkboxes (☐→✅) in this file as you ship.  
4. Update documentation & commit.

Good luck—ship fast and have fun!
