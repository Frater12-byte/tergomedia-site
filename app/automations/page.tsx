/* eslint-disable */
import Link from 'next/link';
import type { Metadata } from 'next';
import { AUTOMATIONS } from '@/lib/automations';
import AutomationsClient from './AutomationsClient';

export const metadata: Metadata = {
  title: 'Automation Library — 50+ Live Production Automations | Tergo Media',
  description: 'Browse 50+ automations built and deployed in production across real estate, healthcare, e-commerce, logistics, finance, and more. Filter by platform: n8n, Make.com, Zapier, UiPath.',
  keywords: 'automation library, n8n automations, Make automations, Zapier automations, UiPath RPA, AI workflows, business automation examples',
  openGraph: {
    title: 'Automation Library — Tergo Media',
    description: '50+ automations live in production across 4 platforms. Browse by platform, industry, and tech stack.',
    url: 'https://tergomedia.com/automations',
    siteName: 'Tergo Media',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automation Library — Tergo Media',
    description: '50+ automations live in production across n8n, Make.com, Zapier and UiPath.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://tergomedia.com/automations' },
  robots: { index: true, follow: true },
};

const PLATFORM_STATS = [
  { n: '50+', l: 'Automations' },
  { n: '4', l: 'Platforms' },
  { n: '11', l: 'Industries' },
  { n: '100%', l: 'In production' },
];

export default function AutomationsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="900,0 1440,80 1440,320 1100,420 800,280 850,0" fill="rgba(249,202,0,0.02)" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.1" />
        </svg>
        <div className="container">
          <div className="page-hero-eyebrow">Automation Library</div>
          <h1>
            50+ automations.<br />
            <em>All live.</em>
          </h1>
          <p>
            Every automation below is live, tested, and in production. Browse by platform, industry, or tech stack — then book a call and we&apos;ll build yours.
          </p>

          {/* Stats row */}
          <div className="met-row" style={{ maxWidth: 640 }}>
            {PLATFORM_STATS.map(s => (
              <div key={s.n} className="met">
                <div className="met-b">{s.n}</div>
                <div className="met-s">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section className="section section-dots">
        <div className="container">
          <AutomationsClient />

          {/* CTA block */}
          <div style={{ marginTop: 64, textAlign: 'center', padding: '48px 24px', border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.02)' }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#fff', marginBottom: 12, fontFamily: "'Exo 2', sans-serif" }}>
              Don&apos;t see yours?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.45)', marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
              We&apos;ve built it, or we&apos;ll build it. Tell us your workflow and we&apos;ll scope it in 24 hours.
            </p>
            <a
              href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-y btn-lg"
            >
              Book a call →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
