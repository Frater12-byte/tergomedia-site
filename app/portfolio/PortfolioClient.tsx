/* eslint-disable */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PROJECTS } from '@/lib/projects';
import AutomationCarousel from '@/components/AutomationCarousel';

const ALL_TAGS = [
  'All',
  'Real Estate',
  'AI',
  'Automation',
  'IoT',
  'Custom Dev',
  'Travel',
  'Agriculture',
  'Finance',
  'Legal',
  'CTO Advisory',
  'Healthcare',
  'Logistics',
  'E-commerce',
  'Hospitality',
];

const PLACEHOLDER_COLORS = [
  'rgba(249,202,0,.06)',
  'rgba(0,200,255,.06)',
  'rgba(176,110,255,.06)',
  'rgba(0,255,157,.06)',
];

export default function PortfolioClient() {
  const [active, setActive] = useState('All');
  const filtered =
    active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Our work</div>
          <h1>
            Shipped. In production.<br />
            <em>Working.</em>
          </h1>
          <p>
            30+ client projects — all live, all delivering measurable results.
            No mockups, no demos, no stock photography.
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="section section-dots">
        <div className="container">

          {/* Filter bar */}
          <div className="port-filter-bar">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`port-filter-btn${active === tag ? ' pf-active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="ppc-grid">
            {filtered.map((p, idx) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="ppc">
                {/* Image */}
                <div className="ppc-img-wrap" style={{ background: PLACEHOLDER_COLORS[idx % 4] }}>
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="ppc-img" />
                  ) : (
                    <div className="ppc-img-fallback">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="ppc-body">
                  <div className="port-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="port-tag">{t}</span>
                    ))}
                  </div>
                  <h2 className="ppc-title">{p.title}</h2>
                  <div className="ppc-client">{p.client}</div>
                  <p className="ppc-desc">{p.desc}</p>
                  <div className="ppc-footer">
                    <span className="ppc-stat">{p.stat}</span>
                    <span className="ppc-cta-label">Case study →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '72px 0', color: 'rgba(255,255,255,.3)', fontSize: 15 }}>
              No projects found for this filter.
            </div>
          )}
        </div>
      </section>

      {/* ── ENGINEERING TEAM ── */}
      <section className="section" style={{ background: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <div className="container">
          <div className="port-team-grid">
            <div>
              <span className="sec-label">Our engineers</span>
              <h2 className="sec-title" style={{ color: '#fff' }}>
                Built by people<br />who ship.
              </h2>
              <p className="sec-sub" style={{ color: 'rgba(255,255,255,.45)' }}>
                No junior teams, no outsourcing, no account managers between you and the work. Every system on this page was designed and built by our core team — senior full-stack engineers, AI architects, and automation specialists who have shipped production systems across four continents.
              </p>
              <p className="sec-sub" style={{ color: 'rgba(255,255,255,.35)', marginTop: 12 }}>
                We don&apos;t hand off to a delivery team after the sale. The same people who scope your project build it, QA it, and hand it over to you.
              </p>
              <div className="port-team-stats">
                {[
                  { n: '30+', l: 'Projects shipped' },
                  { n: '4', l: 'Countries delivered' },
                  { n: '8+', l: 'Years avg. experience' },
                  { n: '24h', l: 'Response time' },
                ].map(s => (
                  <div key={s.n} className="port-team-stat">
                    <div className="port-team-stat-n">{s.n}</div>
                    <div className="port-team-stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="port-team-cards">
              {[
                { img: '/Images/IMG-19.png', name: 'Maria Terragni', role: 'CEO / Co-Founder', tags: ['Strategy', 'Client partnerships', 'Digital transformation'], linkedin: 'https://www.linkedin.com/in/maria-terragni/' },
                { img: '/Images/IMG-04.png', name: 'Francesco Terragni', role: 'CTO / Co-Founder', tags: ['Full-stack', 'AI & Automation', 'Architecture'], linkedin: 'https://www.linkedin.com/in/francescoterragni/' },
              ].map((m) => (
                <a key={m.name} href={m.linkedin} target="_blank" rel="noreferrer" className="port-team-card" style={{ textDecoration: 'none', display: 'block' }}>
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={260}
                    height={260}
                    style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'top center', display: 'block', filter: 'grayscale(15%)' }}
                  />
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>{m.role}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                      {m.tags.map(t => (
                        <span key={t} style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(249,202,0,.07)', border: '1px solid rgba(249,202,0,.18)', color: 'rgba(249,202,0,.75)', letterSpacing: '.04em' }}>{t}</span>
                      ))}
                    </div>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>LinkedIn →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTOMATION CAROUSEL ── */}
      <section className="section auto-showcase section-shimmer">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="sec-label">Automation library — sample only</span>
          <h2 className="sec-title">Hundreds of automations.<br />Real results.</h2>
          <p className="sec-sub">A sample of what&apos;s live in production across all projects above.</p>
        </div>
        <AutomationCarousel />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="mt-cta">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Build my automation →</a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Want results like these?</h2>
          <p>
            Book a free discovery call. We&apos;ll show you exactly what we&apos;d build for your business.
          </p>
          <div className="cta-btns">
            <a
              href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-lg"
            >
              Book a free call →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
