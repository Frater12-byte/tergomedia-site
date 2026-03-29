/* eslint-disable */
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Tergo Media',
  description: 'Tergo Media is an AI automation and custom software agency founded by Maria and Francesco Terragni. Dubai · Bucharest · Milan.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">About us</div>
          <h1>We build <em>systems.</em><br />Not slides.</h1>
          <p>Tergo Media is an AI automation and custom software agency. We started in 2015, and we&apos;ve been shipping things that work ever since. No juniors. No outsourcing. You work with us, directly.</p>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">The founders</span>
          <h2 className="sec-title">Two people. 20+ years<br />of combined experience.</h2>
          <div className="team-grid">
            <div className="team-card">
              <Image src="/Images/IMG-19.png" alt="Maria Terragni" className="team-img" width={400} height={400} style={{ aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'top center', filter: 'grayscale(15%)' }} />
              <div className="team-body">
                <div className="team-roles"><span className="t-role-tag">CEO</span><span className="t-role-tag">Strategy</span><span className="t-role-tag">Client Partnerships</span></div>
                <h3>Maria Terragni</h3>
                <div className="team-sub-text">CEO & Co-Founder</div>
                <p>10+ years leading digital transformation across real estate, travel, and professional services. Former management consultant turned founder. Maria leads every client relationship and ensures delivery stays on track and on brief.</p>
                <div className="skill-tags"><span className="sk-tag">Business strategy</span><span className="sk-tag">Digital transformation</span><span className="sk-tag">Client leadership</span><span className="sk-tag">AI implementation</span></div>
                <a href="https://www.linkedin.com/in/maria-terragni/" target="_blank" rel="noreferrer" className="team-li">LinkedIn →</a>
              </div>
            </div>
            <div className="team-card">
              <Image src="/Images/IMG-04.png" alt="Francesco Terragni" className="team-img" width={400} height={400} style={{ aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'top center', filter: 'grayscale(15%)' }} />
              <div className="team-body">
                <div className="team-roles"><span className="t-role-tag">CTO</span><span className="t-role-tag">Engineering</span><span className="t-role-tag">AI Architecture</span></div>
                <h3>Francesco Terragni</h3>
                <div className="team-sub-text">CTO & Co-Founder</div>
                <p>Full-stack engineer and AI architect with 10+ years building production systems. Francesco leads all technical work — architecture, code, automation design, and quality. He has shipped over 100 products to production.</p>
                <div className="skill-tags"><span className="sk-tag">React / Next.js</span><span className="sk-tag">Node.js / Python</span><span className="sk-tag">AI pipelines</span><span className="sk-tag">n8n / Make</span><span className="sk-tag">AWS / Docker</span></div>
                <a href="https://www.linkedin.com/in/francescoterragni/" target="_blank" rel="noreferrer" className="team-li">LinkedIn →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="how-grid">
            <div>
              <span className="sec-label">How we work</span>
              <h2 className="sec-title">Direct. Fast.<br />No bullshit.</h2>
              <div className="how-steps">
                {[
                  { n: '01', title: 'You talk to the people who build it', desc: 'No account managers, no handoffs. Maria handles the relationship; Francesco handles the build. You always know who to call.' },
                  { n: '02', title: 'Fixed prices, clear deliverables', desc: 'No hourly billing surprises. We scope everything upfront and charge a fixed price. Budget certainty from day one.' },
                  { n: '03', title: 'Weekly progress, always', desc: 'You see what we\'ve built every week. Not at the end of a two-month sprint — every week.' },
                  { n: '04', title: 'You own everything', desc: 'Code, automations, accounts, documentation — all yours. We hand over with full training and 30-day support.' },
                ].map(s => (
                  <div key={s.n} className="how-step">
                    <div className="how-step-n">{s.n}</div>
                    <div className="how-step-body"><h4>{s.title}</h4><p>{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="how-outcome">
                <div className="hoc-glow" />
                <div className="hoc-label">By the numbers</div>
                <div className="hoc-title">What we&apos;ve shipped</div>
                <div style={{ height: 24 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { big: '10+', label: 'Years shipping', cls: '' },
                    { big: '100+', label: 'Projects live', cls: '' },
                    { big: '40+', label: 'Automations built', cls: '' },
                    { big: '$28M+', label: 'Revenue impact', cls: '' },
                    { big: '3', label: 'Office locations', cls: '' },
                    { big: '4.9★', label: 'Avg client rating', cls: '' },
                  ].map(m => (
                    <div key={m.label} className="hom">
                      <div className="big" style={{ color: 'var(--y)' }}>{m.big}</div>
                      <div className="desc">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Let&apos;s build something<br />together.</h2>
          <p>Book a free 30-minute call. We&apos;ll listen, ask the right questions, and tell you exactly what we&apos;d build.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <Link href="/contact" className="btn btn-ol btn-lg">Other ways to reach us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
