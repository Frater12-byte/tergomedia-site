import Link from 'next/link';
import type { Metadata } from 'next';
import AutomationCarousel from '@/components/AutomationCarousel';
import WorldMap from '@/components/WorldMap';

export const metadata: Metadata = {
  title: 'Services — AI Automation, Custom Software & CTO Advisory | Tergo Media',
  description: 'AI automation, custom software development, CTO advisory, and digital transformation — four ways Tergo Media builds leverage into your business. Based in Dubai.',
  keywords: 'AI automation services, custom software development Dubai, fractional CTO, digital transformation, n8n automation, Make automation, WhatsApp API',
  openGraph: {
    title: 'Services — Tergo Media',
    description: 'AI automation, custom software, CTO advisory, digital transformation. We build systems that run your business.',
    url: 'https://tergomedia.com/services',
    siteName: 'Tergo Media',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — Tergo Media',
    description: 'AI automation, custom software, CTO advisory. We build leverage into your business.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://tergomedia.com/services' },
  robots: { index: true, follow: true },
};

const SERVICES = [
  { num: '01', href: '/services/ai-automation', title: 'AI & Automation', desc: 'Lead capture, document processing, AI agents, CRM integration, reporting — all automated. Your team focuses on growth, not admin.', tags: ['n8n','Make','GPT-4o','Claude','WhatsApp API'] },
  { num: '02', href: '/services/custom-dev', title: 'Custom Web & Mobile Apps', desc: 'React, Next.js, Node.js, Python, PHP, native iOS & Android. Production-grade, shipped in weeks not months.', tags: ['React','Next.js','Python','PHP','iOS','Android'] },
  { num: '03', href: '/services/cto-advisory', title: 'CTO Advisory', desc: 'Fractional CTO for companies that need senior technical leadership without a full-time hire. Architecture, team, strategy.', tags: ['Tech strategy','Architecture','Team leadership'] },
  { num: '04', href: '/services/digital-transformation', title: 'Digital Transformation', desc: 'Full-scope digital audits and transformation programmes. We map inefficiencies and implement the systems to fix them.', tags: ['Digital audit','Process redesign','Change mgmt'] },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">What we do</div>
          <h1>Four ways we build<br /><em>leverage</em> into your business.</h1>
          <p>From a single automation to a full technology transformation — we scope tightly and ship fast. Fixed prices. No lock-in.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
          </div>
        </div>
      </section>
      <section className="section section-dots">
        <div className="container">
          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.href} className="svc-card">
                <span className="svc-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-tags">{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <Link href={s.href} className="svc-link">EXPLORE SERVICE →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* AUTOMATION CAROUSEL */}
      <section className="section auto-showcase section-shimmer">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="sec-label">Automation library — sample only</span>
          <h2 className="sec-title">Hundreds of automations.<br />Real results.</h2>
          <p className="sec-sub">A sample of what&apos;s live in production. We&apos;ve built hundreds of automations across every industry — the only limit is what your business needs.</p>
        </div>
        <AutomationCarousel />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="mt-cta">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Build my automation →</a>
          </div>
        </div>
      </section>

      {/* OFFICE MAP */}
      <section className="section offices-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="sec-label">Where we work</span>
          <h2 className="sec-title">Three offices,<br />one team.</h2>
          <p className="sec-sub">Dubai, Bucharest, and Milan — we operate across time zones so your project never stops moving.</p>
          <div className="office-cards" style={{ marginBottom: 0 }}>
            <div className="office-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="oc-dot dubai" /><div><div className="oc-city">Dubai, UAE</div><div className="oc-role">HQ · Gulf operations</div></div>
              </div>
              <div className="oc-hours">Sun–Thu · 09:00–18:00 GST (GMT+4)</div>
            </div>
            <div className="office-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="oc-dot bucharest" /><div><div className="oc-city">Bucharest, Romania</div><div className="oc-role">Engineering hub · EU deliveries</div></div>
              </div>
              <div className="oc-hours">Mon–Fri · 09:00–18:00 EET (GMT+2)</div>
            </div>
            <div className="office-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="oc-dot milan" /><div><div className="oc-city">Milan, Italy</div><div className="oc-role">European clients · Partnerships</div></div>
              </div>
              <div className="oc-hours">Mon–Fri · 09:00–18:00 CET (GMT+1)</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, lineHeight: 0 }}>
          <WorldMap />
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Not sure which service<br />is right for you?</h2>
          <p>Book a free 30-minute call. We&apos;ll listen, ask the right questions, and tell you exactly what we&apos;d recommend.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
          </div>
        </div>
      </section>
    </>
  );
}
