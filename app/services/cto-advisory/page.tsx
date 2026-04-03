import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fractional CTO & CTO Advisory Dubai — Tech Strategy & Architecture | Tergo Media',
  description: 'Senior technical leadership without a full-time hire. Technology architecture, team building, vendor selection, and tech strategy from an experienced CTO. Dubai.',
  keywords: 'fractional CTO Dubai, CTO advisory, tech strategy, software architecture, technical leadership, startup CTO, scale-up CTO advisory',
  openGraph: {
    title: 'Fractional CTO & CTO Advisory — Tergo Media',
    description: 'Senior technical leadership without a full-time hire. Architecture, team, strategy.',
    url: 'https://tergomedia.com/services/cto-advisory',
    siteName: 'Tergo Media',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CTO & CTO Advisory — Tergo Media',
    description: 'Senior technical leadership without a full-time hire.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://tergomedia.com/services/cto-advisory' },
  robots: { index: true, follow: true },
};

export default function CTOAdvisoryPage() {
  return (
    <>
      <section className="page-hero">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="900,0 1440,80 1440,320 1100,420 800,280 850,0" fill="rgba(249,202,0,0.02)" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.12"/>
          <circle cx="900" cy="0" r="2" fill="#f9ca00" fillOpacity="0.25"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Service 03</div>
          <h1>Fractional <em>CTO</em><br />Advisory</h1>
          <p>Senior technical leadership for companies that need an experienced CTO — without the full-time salary. Architecture, team, strategy, and execution.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a strategy call →</a>
            <Link href="/about" className="btn btn-ol btn-lg">Meet Francesco</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">10<span>+</span></div><div className="met-s">Years as CTO<br />& tech lead</div></div>
            <div className="met"><div className="met-b">30<span>+</span></div><div className="met-s">Tech teams<br />built & led</div></div>
            <div className="met"><div className="met-b">60<span>%</span></div><div className="met-s">Cost saving vs<br />full-time CTO hire</div></div>
            <div className="met"><div className="met-b">1<span>wk</span></div><div className="met-s">Time to first<br />strategy session</div></div>
          </div>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">What you get</span>
          <h2 className="sec-title">Everything a CTO does.<br />None of the overhead.</h2>
          <p className="sec-sub">Ideal for startups, scale-ups, and businesses going through a technology inflection point.</p>
          <div className="services-grid">
            {[
              { num: '01', title: 'Technology Strategy', desc: 'Build-vs-buy decisions, tech stack selection, architecture design, and a roadmap aligned with your business objectives and budget.', tags: ['Architecture','Stack selection','Build vs buy','Roadmap'] },
              { num: '02', title: 'Team Building & Leadership', desc: 'Hiring criteria, interview processes, team structure, and day-to-day technical leadership. We help you build a team that can scale.', tags: ['Hiring','Team structure','Mentorship','Processes'] },
              { num: '03', title: 'Vendor & Agency Management', desc: 'Evaluate external partners, manage technical vendors, and ensure code quality across third-party work.', tags: ['Vendor evaluation','Code reviews','Quality gates','SLAs'] },
              { num: '04', title: 'Fundraising Technical Support', desc: 'Technical due diligence prep, investor Q&A support, architecture documentation, and security reviews for funding rounds.', tags: ['Due diligence','Investor decks','Security audit','Documentation'] },
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
          <span className="sec-label">Engagement models</span>
          <h2 className="sec-title">Flexible. Transparent.<br />No lock-in.</h2>
          <div className="how-steps" style={{ maxWidth: 640 }}>
            {[
              { n: '01', title: 'Strategy Sprint (4 weeks)', desc: 'Deep dive into your tech stack, team, and roadmap. Deliverable: written architecture review and 12-month technology roadmap.', badge: 'FIXED PRICE' },
              { n: '02', title: 'Part-time CTO (ongoing)', desc: '1–2 days per week embedded with your team. Attend standups, review PRs, mentor engineers, run tech leadership.', badge: 'MONTHLY RETAINER' },
              { n: '03', title: 'On-demand advisory', desc: 'Access to Francesco for async reviews, key hiring decisions, architecture questions, and investor Q&A.', badge: 'HOURLY' },
            ].map(s => (
              <div key={s.n} className="how-step">
                <div className="how-step-n">{s.n}</div>
                <div className="how-step-body"><h4>{s.title}</h4><p>{s.desc}</p><span className="step-badge">{s.badge}</span></div>
              </div>
            ))}
          </div>
          <div className="mt-cta">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a strategy call →</a>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Need senior technical<br />leadership?</h2>
          <p>Book a free 30-minute call with Francesco. No pitch — just an honest conversation about your tech challenges.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Talk to Francesco →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
