/* eslint-disable */
import type { Metadata } from 'next';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';

export const metadata: Metadata = {
  title: 'Sectors We Serve — AI Automation & Custom Software | Tergo Media',
  description: 'Tergo Media builds AI automation and custom software for 8 industries: real estate, finance & legal, healthcare, e-commerce, logistics, agriculture, professional services, and travel & hospitality.',
  keywords: 'AI automation sectors, real estate automation Dubai, healthcare automation, e-commerce automation, logistics automation, finance automation, agriculture IoT, professional services automation',
  openGraph: {
    title: 'Sectors We Serve — Tergo Media',
    description: '8 industries. Deep expertise. Measurable results. Tergo Media builds AI automation systems tailored to your sector.',
    url: 'https://tergomedia.com/sectors',
    siteName: 'Tergo Media',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sectors We Serve — Tergo Media',
    description: '8 industries. Deep expertise. AI automation tailored to your sector.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://tergomedia.com/sectors' },
  robots: { index: true, follow: true },
};

const SECTORS = [
  {
    href: '/sectors/real-estate',
    num: '01',
    title: 'Real Estate',
    desc: 'AI lead qualification, WhatsApp automation, CRM integration, and digital portals for property companies across the Gulf and Europe.',
    tags: ['Lead automation', 'WhatsApp AI', 'CRM', 'Property portals'],
    stat: { b: '$2.1M', s: 'Pipeline added for one client' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: '/sectors/travel-hospitality',
    num: '02',
    title: 'Travel & Hospitality',
    desc: 'Custom booking systems, guest communication AI, automated review responses, and channel synchronisation for hotels and charter operators.',
    tags: ['Booking systems', 'Guest AI', 'Review automation', 'Channel sync'],
    stat: { b: '99.9%', s: 'Uptime across hospitality clients' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    href: '/sectors/finance-legal',
    num: '03',
    title: 'Finance & Legal',
    desc: 'KYC onboarding automation, compliance reporting, contract management, and billing automation for regulated firms and law practices.',
    tags: ['KYC automation', 'Compliance reporting', 'Contract management', 'Billing'],
    stat: { b: '15min', s: 'KYC onboarding time' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    href: '/sectors/healthcare',
    num: '04',
    title: 'Healthcare',
    desc: 'Online appointment systems, digital patient intake, care follow-up sequences, and insurance billing automation for private clinics.',
    tags: ['Appointments', 'Patient intake', 'Follow-up care', 'Claims automation'],
    stat: { b: '−15%', s: 'No-show rate reduction' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    href: '/sectors/ecommerce',
    num: '05',
    title: 'E-Commerce',
    desc: 'Order fulfilment automation, multi-channel inventory sync, abandoned cart recovery, and AI customer support for online retailers.',
    tags: ['Order automation', 'Inventory sync', 'Cart recovery', 'AI support'],
    stat: { b: '4x', s: 'Abandoned cart recovery rate' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    href: '/sectors/logistics',
    num: '06',
    title: 'Logistics',
    desc: 'Shipment tracking automation, customer notifications, digital proof of delivery, and dispatch optimisation for freight and last-mile operators.',
    tags: ['Shipment tracking', 'Customer notifications', 'Digital POD', 'Dispatch'],
    stat: { b: '98%', s: 'On-time delivery rate' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    href: '/sectors/agriculture',
    num: '07',
    title: 'Agriculture',
    desc: 'IoT sensor platforms, real-time monitoring dashboards, and automated alert escalation for precision farming operations.',
    tags: ['IoT sensors', 'Real-time monitoring', 'Alert automation', 'Precision farming'],
    stat: { b: '400ha', s: 'Monitored for one client' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M17 8C8 10 5.9 16.17 3.82 22h2.32C8 17 11 12 22 10c-1-1-3-2-5-2z"/>
        <path d="M6.17 22a16 16 0 0 1 6-10"/>
      </svg>
    ),
  },
  {
    href: '/sectors/professional-services',
    num: '08',
    title: 'Professional Services',
    desc: 'Client onboarding automation, time capture, billing sync, contract renewals, and reporting for consultancies, agencies, and advisory firms.',
    tags: ['Onboarding', 'Time & billing', 'Contract renewals', 'Reporting'],
    stat: { b: '11%', s: 'Revenue leakage recovered' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
];

export default function SectorsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Where we work</div>
          <h1>8 industries.<br /><em>Deep expertise.</em></h1>
          <p>We don&apos;t sell generic AI. We work in specific sectors where we know the workflows, the tools, and the real bottlenecks — before we even start.</p>
          <div className="re-stats-bar reveal" style={{ marginTop: 48, maxWidth: 680 }}>
            {[
              { b: '8', s: 'Sectors' },
              { b: '30+', s: 'Projects shipped' },
              { b: '4', s: 'Countries' },
              { b: '100%', s: 'In production' },
            ].map(st => (
              <div key={st.s} style={{ borderTop: '2px solid rgba(249,202,0,.4)', padding: '28px 20px', textAlign: 'center', background: 'var(--dark)' }}>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1, marginBottom: 8 }}>{st.b}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.5 }}>{st.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS GRID ── */}
      <section className="section section-dots">
        <div className="container">
          <div className="services-grid">
            {SECTORS.map(s => (
              <Link key={s.href} href={s.href} className="svc-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'rgba(249,202,0,0.07)',
                    border: '1px solid rgba(249,202,0,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--y)', flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>
                  <span className="svc-num" style={{ margin: 0 }}>{s.num}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-tags">{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 26, fontWeight: 900, color: 'var(--y)', lineHeight: 1 }}>{s.stat.b}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 4, maxWidth: 130 }}>{s.stat.s}</div>
                  </div>
                  <div className="svc-link" style={{ margin: 0 }}>EXPLORE →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section className="section section-shimmer" id="roi">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="sec-label">ROI Calculator</span>
          <h2 className="sec-title">What could automation<br />save your business?</h2>
          <p className="sec-sub">Adjust the inputs to match your business profile and see a personalised 12-month impact estimate.</p>
          <ROICalculator />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Not sure which sector<br />applies to you?</h2>
          <p>Book a free 30-minute call. We&apos;ll ask the right questions and show you exactly what we&apos;d automate first.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
          </div>
        </div>
      </section>
    </>
  );
}
