import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Tergo Media',
  description: 'AI automation, custom software development, CTO advisory, and digital transformation — four ways Tergo Media builds leverage into your business.',
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
