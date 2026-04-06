/* eslint-disable */
import Link from 'next/link';
import type { Metadata } from 'next';
import HayGuardFlowClient from '@/components/HayGuardFlowClient';

export const metadata: Metadata = {
  title: 'HayGuard CRM — Client Onboarding Automation | Tergo Media',
  description: 'How Tergo Media automated client onboarding from 2 days to 2 minutes for a Milan professional services firm, using HubSpot, n8n, Notion, DocuSign and Google Calendar.',
  keywords: ['CRM automation', 'HubSpot automation', 'client onboarding', 'n8n workflow', 'professional services automation', 'Tergo Media portfolio'],
  openGraph: {
    title: 'HayGuard CRM — 2-Minute Client Onboarding Automation',
    description: 'Zero manual steps. Every new client onboarded in under 2 minutes via HubSpot, n8n, Notion, DocuSign and Google Calendar.',
    url: 'https://tergomedia.com/portfolio/hayguard-crm',
    siteName: 'Tergo Media',
    images: [{ url: 'https://tergomedia.com/portfolio/hayguard-crm-og.jpg', width: 1200, height: 630, alt: 'HayGuard CRM Automation — Tergo Media' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HayGuard CRM — 2-Minute Client Onboarding Automation',
    description: 'Zero manual steps. Every new client onboarded in under 2 minutes.',
    images: ['https://tergomedia.com/portfolio/hayguard-crm-og.jpg'],
  },
  alternates: { canonical: 'https://tergomedia.com/portfolio/hayguard-crm' },
};

const project = {
  tags: ['Automation', 'CRM'],
  title: 'HayGuard CRM',
  client: 'Professional services, Milan',
  stat: 'Onboarding time cut 70%',
  challenge: 'A Milan-based professional services firm was losing an average of two full working days per new client onboarding. Once a deal was marked Won in HubSpot, an ops team member manually triggered welcome emails, created Notion workspaces, sent document request forms, and scheduled kick-off calls. With 15–20 new clients per month, the process was consuming a full-time equivalent of ops capacity — and client experience varied depending on who was handling the task.',
  solution: "We built a trigger-based automation that fires the moment a deal is marked Won in HubSpot. Within 2 minutes: a branded welcome email is sent to the client, a pre-populated Notion workspace is created from template, a DocuSign contract envelope is dispatched, and a Google Calendar kick-off invite is created and shared. A Slack notification with the full client brief is posted to the account manager's channel. The entire sequence requires zero manual input.",
  techStack: ['HubSpot', 'n8n', 'Notion API', 'DocuSign', 'Google Calendar API', 'Slack API'],
  results: [
    { b: '2min', s: 'Full onboarding start time' },
    { b: '70%', s: 'Ops time saved per client' },
    { b: '0', s: 'Manual steps required' },
  ],
};

export default function HayGuardCRMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'HayGuard CRM — Client Onboarding Automation',
            description: 'How Tergo Media automated client onboarding from 2 days to 2 minutes for a Milan professional services firm.',
            author: { '@type': 'Organization', name: 'Tergo Media', url: 'https://tergomedia.com' },
            publisher: { '@type': 'Organization', name: 'Tergo Media', logo: { '@type': 'ImageObject', url: 'https://tergomedia.com/logo.png' } },
            url: 'https://tergomedia.com/portfolio/hayguard-crm',
            mainEntityOfPage: 'https://tergomedia.com/portfolio/hayguard-crm',
          }),
        }}
      />

      {/* ── PAGE-SCOPED STYLES ── */}
      <style>{`
        /* ── responsive grids ── */
        .hg-challenge-grid { display:grid; grid-template-columns:240px 1fr; gap:64px; align-items:start; }
        .hg-solution-grid  { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:rgba(255,255,255,.06); margin-bottom:40px; }
        .hg-deep-grid      { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:rgba(255,255,255,.06); }
        .hg-related-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(255,255,255,.06); max-width:720px; }
        .hg-results-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(255,255,255,.06); max-width:720px; }
        .hg-hero-img       { width:100%; height:380px; background:var(--surface); border:1px solid rgba(255,255,255,.06); margin-bottom:32px; display:flex; align-items:center; justify-content:center; }

        @media(max-width:860px){
          .hg-challenge-grid { grid-template-columns:1fr; gap:24px; }
          .hg-solution-grid  { grid-template-columns:1fr; }
          .hg-deep-grid      { grid-template-columns:1fr; }
          .hg-related-grid   { grid-template-columns:1fr; max-width:100%; }
          .hg-results-grid   { max-width:100%; }
          .hg-hero-img       { height:220px; }
        }
        @media(max-width:560px){
          .hg-results-grid { grid-template-columns:1fr; }
        }

      `}</style>

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="900,0 1440,80 1440,320 1100,420 800,280 850,0" fill="rgba(249,202,0,0.02)" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.1" />
        </svg>
        <div className="container">
          <Link
            href="/portfolio"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 24, textDecoration: 'none', transition: 'color .15s' }}
          >
            ← All projects
          </Link>

          {/* Hero image placeholder */}
          <div className="hg-hero-img">
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.15)', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700 }}>
              hayguard-hero.jpg
            </span>
          </div>

          {/* Tags */}
          <div className="port-tags" style={{ marginBottom: 18 }}>
            {project.tags.map((t) => <span key={t} className="port-tag">{t}</span>)}
          </div>

          <h1 style={{ marginBottom: 10 }}>{project.title}</h1>

          <p style={{ fontSize: 'clamp(13px,1.1vw,16px)', color: 'rgba(255,255,255,.4)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 32 }}>
            {project.client}
          </p>

          {/* Key outcome stat */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', padding: '18px 24px', background: 'rgba(249,202,0,.07)', border: '1px solid rgba(249,202,0,.25)' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Key outcome</span>
            <span style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(22px,2.8vw,36px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1 }}>
              {project.stat}
            </span>
          </div>

          {/* Met-row */}
          <div className="met-row" style={{ maxWidth: 640 }}>
            {project.results.map((r) => (
              <div key={r.s} className="met">
                <div className="met-b">{r.b}</div>
                <div className="met-s">{r.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGE ── */}
      <section className="section section-light">
        <div className="container">
          <div className="hg-challenge-grid">
            <div>
              <span className="sec-label">The challenge</span>
              <h2 className="sec-title" style={{ fontSize: 'clamp(22px,2.4vw,32px)' }}>What needed<br />solving</h2>
            </div>
            <div>
              <p style={{ fontSize: 'clamp(14px,1.1vw,17px)', color: 'rgba(255,255,255,.55)', lineHeight: 1.85, maxWidth: 680 }}>
                {project.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">The solution</span>
          <h2 className="sec-title">What we built</h2>
          <div className="hg-solution-grid">
            <div style={{ background: 'var(--surface)', padding: '36px 40px' }}>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', lineHeight: 1.85 }}>{project.solution}</p>
            </div>
            <div style={{ background: 'var(--surface)', padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
              <div>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 14 }}>Tech stack</span>
                <div className="svc-tags">
                  {project.techStack.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 14 }}>Category</span>
                <div className="port-tags">
                  {project.tags.map((t) => <span key={t} className="port-tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTOMATION DIAGRAM ── */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Automation architecture</span>
          <h2 className="sec-title">How the workflow runs</h2>
          <p className="sec-sub">Every step fires automatically the moment a deal is marked Won in HubSpot.</p>

          <HayGuardFlowClient />
        </div>
      </section>

      {/* ── TECHNICAL DEEP DIVE ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">Under the hood</span>
          <h2 className="sec-title">Technical deep dive</h2>
          <div className="hg-deep-grid">
            {[
              { title: 'Error handling & retries', body: 'Every API call in the n8n workflow has a retry policy with exponential backoff. If DocuSign or Notion returns an error, the workflow pauses and sends a Slack alert to ops — so no client falls through the cracks silently.' },
              { title: 'Template versioning in Notion', body: 'The Notion workspace is cloned from a master template the client team maintains. Switching between client tiers (standard vs. enterprise) is controlled by a single HubSpot deal property — no workflow changes needed.' },
              { title: 'HubSpot field mapping', body: 'All variable data (client name, deal value, service line, account manager) is pulled directly from HubSpot deal properties. The workflow handles every deal type without custom logic per client.' },
              { title: 'Audit trail', body: "Every workflow run logs its output to a Google Sheet: timestamp, client name, and each step's success or failure. Full ops visibility without touching the automation itself." },
            ].map((c) => (
              <div key={c.title} style={{ background: 'var(--surface)', padding: '36px 40px' }}>
                <h4 style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.3 }}>
                  {c.title}
                </h4>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', lineHeight: 1.85 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Explore more</span>
          <h2 className="sec-title">Related services &amp; sectors</h2>
          <div className="hg-related-grid">
            {[
              { label: 'Service', title: 'AI & Automation', desc: 'See how we build automation workflows at scale', href: '/services/ai-automation' },
              { label: 'Sector', title: 'Professional Services', desc: 'Industry-specific automation for service firms', href: '/sectors/professional-services' },
              { label: 'Portfolio', title: 'All projects', desc: 'Browse the full portfolio of client work', href: '/portfolio' },
            ].map((c) => (
              <Link key={c.href} href={c.href} style={{ textDecoration: 'none', display: 'block', background: 'var(--dark)', padding: '36px 28px' }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 10 }}>{c.label}</span>
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">Results</span>
          <h2 className="sec-title">The numbers</h2>
          <p className="sec-sub">Concrete, measurable outcomes delivered in production.</p>
          <div className="hg-results-grid">
            {project.results.map((r) => (
              <div key={r.s} style={{ background: 'var(--dark)', padding: '36px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(24px,3vw,40px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1, marginBottom: 10 }}>
                  {r.b}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.5 }}>
                  {r.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE BUILT IT ── */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">How we work</span>
          <h2 className="sec-title">From brief to production</h2>
          <div className="how-steps" style={{ maxWidth: 580 }}>
            {[
              { n: '01', title: 'Discovery & scoping', desc: 'We map the problem, understand the existing stack, and write a fixed-price proposal. No surprises.', badge: '1–3 DAYS' },
              { n: '02', title: 'Build & weekly demos', desc: 'You see working software every week. Feedback is incorporated immediately — not at the end.', badge: '2–6 WEEKS' },
              { n: '03', title: 'Testing & QA', desc: 'Every integration is stress-tested before go-live. Edge cases handled, fallbacks in place.', badge: '3–5 DAYS' },
              { n: '04', title: 'Go live & handover', desc: 'Full documentation, team training, monitoring setup, and 30-day post-launch support.', badge: '1 WEEK' },
            ].map((s) => (
              <div key={s.n} className="how-step">
                <div className="how-step-n">{s.n}</div>
                <div className="how-step-body">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <span className="step-badge">{s.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Build something similar?</h2>
          <p>Book a free 30-minute call. We&apos;ll assess your situation and tell you exactly what we&apos;d build — and what it would cost.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">
              Build something similar →
            </a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">← Back to all projects</Link>
          </div>
        </div>
      </section>
    </>
  );
}
