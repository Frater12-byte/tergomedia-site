import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Web & Mobile Development — Tergo Media',
  description: 'React, Next.js, Node.js, Python, PHP, iOS and Android — production-grade custom software shipped in weeks.',
};

export default function CustomDevPage() {
  const TECH = ['React','Next.js','Node.js','Python','PHP','Laravel','iOS (Swift)','Android (Kotlin)','PostgreSQL','MongoDB','AWS','Docker'];
  return (
    <>
      <section className="page-hero">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="900,0 1440,80 1440,320 1100,420 800,280 850,0" fill="rgba(0,200,255,0.02)" stroke="#00c8ff" strokeWidth="0.5" strokeOpacity="0.1"/>
          <circle cx="900" cy="0" r="2" fill="#00c8ff" fillOpacity="0.2"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Service 02</div>
          <h1>Custom Web &<br /><em>Mobile Apps</em></h1>
          <p>React, Next.js, Node.js, Python, PHP, native iOS & Android. Production-grade software, shipped in weeks not months. You own the code, forever.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a scoping call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See our work</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">2–8<span>wk</span></div><div className="met-s">Typical time<br />to first launch</div></div>
            <div className="met"><div className="met-b">100<span>+</span></div><div className="met-s">Projects shipped<br />to production</div></div>
            <div className="met"><div className="met-b">10<span>+</span></div><div className="met-s">Years of<br />engineering</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Lock-in contracts.<br />You own everything.</div></div>
          </div>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">What we build</span>
          <h2 className="sec-title">From MVPs to enterprise<br />platforms — we ship it all.</h2>
          <p className="sec-sub">Every project is scoped tightly, priced fixed, and delivered iteratively.</p>
          <div className="services-grid">
            {[
              { num: '01', title: 'Web Applications', desc: 'Custom web apps built on React and Next.js. B2B portals, marketplaces, dashboards, internal tools. Server-rendered, fast, SEO-friendly.', tags: ['React','Next.js','TypeScript','REST / GraphQL'] },
              { num: '02', title: 'Mobile Apps', desc: 'Native iOS and Android apps, or cross-platform with React Native. App Store / Play Store submission included.', tags: ['iOS (Swift)','Android (Kotlin)','React Native','App Store'] },
              { num: '03', title: 'Backend & APIs', desc: 'Scalable Node.js, Python (FastAPI/Django), or PHP (Laravel) backends. RESTful APIs, webhooks, third-party integrations.', tags: ['Node.js','Python','PHP / Laravel','PostgreSQL','MongoDB'] },
              { num: '04', title: 'E-commerce & Portals', desc: 'Custom WooCommerce, Shopify, or bespoke e-commerce platforms. Multi-currency, multi-language, custom checkout flows.', tags: ['WooCommerce','Shopify','Custom','Payment gateways'] },
            ].map(s => (
              <div key={s.num} className="svc-card">
                <span className="svc-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-tags">{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Technology stack</span>
          <h2 className="sec-title">We use the right tools,<br />not the trendy ones.</h2>
          <p className="sec-sub">Proven, production-battle-tested technologies that your team can maintain and build on.</p>
          <div className="svc-tags" style={{ gap: 8, maxWidth: 680 }}>
            {TECH.map(t => <span key={t} className="tag" style={{ fontSize: 13, padding: '6px 16px' }}>{t}</span>)}
          </div>
          <div className="mt-cta">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Scope my project →</a>
            <Link href="/portfolio" className="btn btn-ol">See portfolio</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Have a product in mind?</h2>
          <p>Tell us what you&apos;re building. We&apos;ll give you a free technical assessment and fixed-price proposal within 48 hours.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a scoping call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
