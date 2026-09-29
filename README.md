
# Subhan Shahid — Portfolio (Next.js + Tailwind)

Dark, cinematic portfolio with data‑driven sections and a working contact form.

## Quick Start (No GitHub, with Vercel CLI)

1) Install Node.js (LTS) from https://nodejs.org
2) Install Vercel CLI:
```bash
npm i -g vercel
```
3) In a terminal, cd into this folder and run:
```bash
npm install
vercel login   # sign in
vercel         # first deploy (accept defaults)
```
4) Set email sending (optional but recommended):
   - Create a free account at https://resend.com and get `RESEND_API_KEY`
   - In Vercel Dashboard → Project → Settings → Environment Variables, add:
     - `RESEND_API_KEY` = your key
     - `TO_EMAIL` = your own inbox (e.g., subhanzshahram@gmail.com)
   - Redeploy: `vercel --prod`

## Customize Content
- Edit JSON in `/data/*.json` to change services, stats, experience, skills, testimonials, videos.
- Replace `/public/hero.jpg` with your portrait (520x520+).
- Update links in `app/page.tsx` (IG/YT/Behance, CV).
- Colors/Theme in `app/globals.css` (CSS vars).

## Optional Showcase
- **External**: keeps the button linking to your current showcase.
- **Embedded**: visit `/showcase` to see the iframe version (already included).

## Contact Form
- POSTs to `/api/contact`. Uses Resend when `RESEND_API_KEY` is present; otherwise logs locally.

---

Built to match your current aesthetic with more control and simple editing.
