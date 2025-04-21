# Project Requirement Document (PRD)

## Project Name: CarMods – The Linktree for Car Builds

## Version: 1.0

---

## 1. Problem Statement
Car content creators are constantly asked repetitive questions about their car builds, modifications, and parts on social media. This back-and-forth is inefficient and makes it difficult for creators to monetize their knowledge or showcase their work in an organized way.

---

## 2. Solution Overview
Carfolio is a mobile-first, web-based platform that gives each creator a unique, shareable link (like Linktree) to a page displaying their car collection. Each car card contains detailed specs, mod lists, affiliate/product links, and media. The platform is designed to be easy to share, beautiful on mobile, and optimized for both creators and fans.

---

## 3. Goals & Objectives
- Eliminate repetitive Q&A for car creators
- Provide a single, organized hub for all car builds and mods
- Enable creators to monetize via affiliate/product links
- Deliver a seamless, mobile-first experience
- Offer analytics to help creators understand their audience and optimize their profiles

---

## 4. Target Users
- Car content creators (YouTube, Instagram, TikTok)
- Car enthusiasts with multiple builds
- Fans who want to browse builds and discover products

---

## 5. Core Features
### A. Creator Tools
- **User Profile:** Unique link, customizable bio, social links, theme
- **Car Build Management:** Add/edit cars, specs (year, make, model, HP, etc.), mod lists (with categories, product/affiliate links), upload media (photos/videos), car status (in progress, completed, for sale), description section
- **Analytics Dashboard:** Profile views, car clicks, link clicks, traffic sources
- **Monetization:** Add affiliate/product links to any mod or car

### B. Viewer Experience
- Browse creator’s car collection
- Expand car cards for full specs, mod lists, and media
- Click affiliate/product links
- Mobile-optimized, fast, and visually appealing

### C. Premium Features (Pro)
- Unlimited cars
- Advanced analytics (part clicks, traffic sources)
- Custom domains
- Priority support

---

## 6. User Flows
- **Creator:** Sign up → Set up profile → Add car(s) → Add mods/media → Share link → Track analytics
- **Viewer:** Click creator’s link → Browse cars/mods/media → Click affiliate links

---

## 7. Technical Overview
- **Frontend:** React (Vite), TailwindCSS, Framer Motion, TanStack Router
- **Backend:** Convex (real-time DB, schema validation)
- **Auth:** Clerk (social/email login)
- **File Storage:** Backblaze B2 (signed URLs)
- **Payments:** Paystack (Pro subscriptions)
- **Deployment:** Netlify

---

## 8. Monetization Strategy
- **Free:** 1–2 cars, basic analytics
- **Pro:** Unlimited cars, advanced analytics, custom domains
- **Waitlist & Early Adopter Tiers:** Founding Member, Early Bird, Build Club, Premium (with badges and perks)

---

## 9. Success Metrics
- Number of active creators and profiles
- Engagement (profile views, car clicks, link clicks)
- Conversion to Pro tier
- Affiliate/product link click-through rates

---

## 10. Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Low creator adoption | Partner with micro-influencers pre-launch |
| Affiliate link spam | Rate limiting, manual review for Pro users |
| Media abuse | File validation, size limits, automated scans |

---

## 11. Roadmap (MVP Focus)
- Phase 1: Core profile, car showcase, mod lists, media upload, basic analytics
- Phase 2: Pro subscriptions, advanced analytics, custom domains
- Phase 3: Sponsored builds, AI mod recognition, mobile app

---

## 12. Appendix
- See research.md for diagrams and detailed data schemas
- Wireframes and flowcharts referenced in project documentation
