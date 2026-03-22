# Tergo Media — Next.js Site

## Why Vercel, not cPanel
Your IT provider's warning about port conflicts applies to running Node.js ON cPanel.
This site deploys to **Vercel** — a separate platform. Your domain DNS just points to Vercel.
cPanel never sees Node.js at all. Zero port conflicts.

---

## Step 1 — Install dependencies (one time)

Make sure you have Node.js installed: https://nodejs.org (download LTS version)

Open Terminal (Mac) or Command Prompt (Windows), navigate to this folder:

```bash
cd tergomedia-nextjs
npm install
```

Test locally:
```bash
npm run dev
```
Open http://localhost:3000 — you should see the site.

---

## Step 2 — Add your images

Create the folder: `public/images/`

Add your photos named exactly:
- img-01.jpg — Cocktail Holidays screenshot
- img-02.jpg — Agri Novatex screenshot
- img-03.jpg — Ranjet app screens
- img-04.jpg — Francesco headshot
- img-09.jpg — Cocktail Holidays / travel
- img-10.jpg — HayGuard dashboard
- img-11.jpg — Accounting app screenshot
- img-12.jpg — SaaS Stack Auditor screenshot
- img-13.jpg — Brokerage Analyzer screenshot
- img-14.jpg — SaaS Auditor results screenshot
- img-15.jpg — Bucharest team photo
- img-16.jpg — Dubai city/office
- img-17.jpg — Bucharest city
- img-18.jpg — Milano city

Then in each component, change:
```tsx
<ImgPh label="IMG-04" desc="..." h={280} />
```
to:
```tsx
<ImgPh label="IMG-04" desc="Francesco" h={280} src="/images/img-04.jpg" />
```

The ImgPh component accepts an optional `src` prop — if provided, it shows your real image.
If not, it shows the placeholder. So you can do them one at a time.

---

## Step 3 — Set up the contact form

1. Go to https://formspree.io → Sign up free → New Form
2. Copy your endpoint ID (looks like: xpzgkwqr)
3. Open `app/contact/page.tsx`
4. Find this line:
   ```
   https://formspree.io/f/YOUR_FORMSPREE_ID
   ```
5. Replace `YOUR_FORMSPREE_ID` with your actual ID

---

## Step 4 — Push to GitHub

1. Go to https://github.com → New repository → name it `tergomedia-site`
2. Keep it Private
3. Run these commands:

```bash
git init
git add .
git commit -m "Initial Tergo Media site"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/tergomedia-site.git
git push -u origin main
```

---

## Step 5 — Deploy to Vercel

1. Go to https://vercel.com → Sign up (use your GitHub account)
2. Click "Add New Project"
3. Import your `tergomedia-site` repository
4. Framework Preset: **Next.js** (auto-detected)
5. Click **Deploy**

Vercel gives you a URL like: `tergomedia-site.vercel.app`
Test EVERY page before touching DNS.

---

## Step 6 — Point tergomedia.com to Vercel

1. In Vercel → your project → Settings → Domains → Add Domain
2. Type: `tergomedia.com`
3. Also add: `www.tergomedia.com`
4. Vercel shows you DNS records to add

5. Log into your domain registrar (wherever you bought tergomedia.com)
6. Go to DNS settings
7. Add these records:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

DNS takes 10 minutes to 48 hours. Once it propagates, your site is live.
SSL (HTTPS) is automatic — Vercel provisions it within minutes.

---

## Step 7 — Keep old WordPress hosting

Do NOT cancel your WordPress hosting for at least 2 weeks after go-live.
Some visitors will still hit the old server during DNS propagation.
Once Vercel shows green for tergomedia.com and traffic is confirmed, you can cancel.

---

## Google Analytics

Already configured in `app/layout.tsx` with your GA4 ID: G-E6ZGXMK1ZF
Tracks every page view automatically including route changes.
No action required.

---

## Making updates after launch

Every time you change any file:
```bash
git add .
git commit -m "Your change description"
git push
```
Vercel auto-deploys in ~30 seconds. Done.

---

## File structure

```
app/
  layout.tsx              ← GA tracking, nav, footer (wraps every page)
  globals.css             ← all styles
  page.tsx                ← homepage
  services/
    page.tsx              ← /services
    ai-automation/page.tsx
    custom-dev/page.tsx
    cto-advisory/page.tsx
    digital-transformation/page.tsx
  sectors/
    page.tsx              ← /sectors
    real-estate/page.tsx
    travel-hospitality/page.tsx
    agriculture/page.tsx
    professional-services/page.tsx
  tools/page.tsx
  portfolio/page.tsx
  about/page.tsx
  contact/page.tsx
components/
  Nav.tsx                 ← sticky nav with mobile hamburger
  Footer.tsx
  Graphics.tsx            ← FlowGraphic, Stepper, BeforeAfter, Calculator, ImgPh, CtaBar, Ticker
  logo.ts                 ← embedded logo (replace with /public/images/logo.png later)
public/
  images/                 ← put your photos here
```

---

## Questions?
hello@tergomedia.com
