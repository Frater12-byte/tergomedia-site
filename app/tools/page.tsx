/* eslint-disable */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Tools — Tergo Media',
  description: 'Two free tools built by Tergo Media — a real estate automation ROI calculator for Dubai brokerages, and a live Middle East threat tracker.',
};

const TOOLS = [
  {
    href: 'https://analyzer.tergomedia.com/',
    tag: 'Free · Dubai brokerages',
    num: '01',
    label: 'Real Estate ROI Calculator',
    desc: 'Find out exactly how much money your Dubai brokerage is leaving on the table without automation. Answer a few questions about your team, lead volume, and current processes — get an instant breakdown of lost revenue, wasted hours, and missed deals.',
    img: '/Images/IMG-13.png',
    imgAlt: 'Real Estate Automation ROI Calculator',
    stat: { n: 'AED 2M+', l: 'avg. lost per year per brokerage' },
    bullets: [
      'Calculates lost revenue from slow lead response',
      'Estimates hours wasted on manual admin per agent',
      'Shows projected ROI from CRM + automation rollout',
      'Instant results — no sign-up required',
    ],
    cta: 'Calculate my ROI →',
    color: 'var(--y)',
  },
  {
    href: 'https://alerts.tergomedia.com/',
    tag: 'Free · Live updates',
    num: '02',
    label: 'Middle East Threat Tracker',
    desc: 'A live monitoring tool that tracks and reports missile attacks, airstrikes, and security incidents across the Middle East. Aggregates and cross-references dozens of news outlets, official sources, and verified social feeds — updated in real time.',
    img: '/Images/IMG-23.png',
    imgAlt: 'Middle East Threat Tracker',
    stat: { n: '50+', l: 'sources monitored continuously' },
    bullets: [
      'Monitors 50+ news outlets and verified sources',
      'Real-time incident map with location tagging',
      'Cross-references reports to filter misinformation',
      'Free to use — no account needed',
    ],
    cta: 'Open Tracker →',
    color: 'var(--ng)',
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Free tools</div>
          <h1>Built by us.<br /><em>Free for you.</em></h1>
          <p>Two tools we built for our clients — and made free for everyone. No sign-up, no credit card, no catch.</p>
          <div className="hero-ctas" style={{ marginBottom: 0 }}>
            <a href="https://analyzer.tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">ROI Calculator →</a>
            <a href="https://alerts.tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-ol btn-lg">Threat Tracker →</a>
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="section section-shimmer">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="sec-label">What we built</span>
          <h2 className="sec-title">Two tools. Zero cost.</h2>
          <p className="sec-sub">Practical tools used by real clients across Dubai and the Middle East — now available to everyone.</p>

          <div className="tools-grid">
            {TOOLS.map(t => (
              <div key={t.href} className="tool-card">
                {/* Image */}
                <div className="tool-img-wrap">
                  <img src={t.img} alt={t.imgAlt} className="tool-img" />
                  <div className="tool-img-num">{t.num}</div>
                </div>

                {/* Body */}
                <div className="tool-body">
                  <span className="tool-tag">{t.tag}</span>
                  <h3 className="tool-title">{t.label}</h3>
                  <p className="tool-desc">{t.desc}</p>

                  {/* Stat badge */}
                  <div className="tool-stat">
                    <span className="tool-stat-n" style={{ color: t.color }}>{t.stat.n}</span>
                    <span className="tool-stat-l">{t.stat.l}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="tool-bullets">
                    {t.bullets.map(b => (
                      <li key={b}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--ng)' }}><polyline points="20 6 9 17 4 12"/></svg>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-y btn-lg"
                  >
                    {t.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Want a custom tool<br />built for your business?</h2>
          <p>These tools give you a taste of what we build. For something tailored to your exact workflow, book a call.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
          </div>
        </div>
      </section>
    </>
  );
}
