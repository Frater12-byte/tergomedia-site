import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Transformation — Tergo Media',
  description: 'Full-scope digital transformation: audits, process redesign, technology implementation and change management across all business functions.',
};

export default function DigitalTransformationPage() {
  return (
    <>
      <section className="page-hero">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="900,0 1440,80 1440,320 1100,420 800,280 850,0" fill="rgba(249,202,0,0.02)" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.12"/>
          <circle cx="900" cy="0" r="2" fill="#f9ca00" fillOpacity="0.25"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Service 04</div>
          <h1>Digital<br /><em>Transformation</em></h1>
          <p>We map every workflow, identify what&apos;s broken, and implement the systems to fix it. Full-scope transformation programmes that stick.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">3–6<span>mo</span></div><div className="met-s">Typical programme<br />duration</div></div>
            <div className="met"><div className="met-b">40<span>%</span></div><div className="met-s">Average efficiency<br />gain</div></div>
            <div className="met"><div className="met-b">$7M<span>+</span></div><div className="met-s">Revenue impact<br />across clients</div></div>
            <div className="met"><div className="met-b">100<span>%</span></div><div className="met-s">Knowledge transfer<br />& team ownership</div></div>
          </div>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">Programme phases</span>
          <h2 className="sec-title">Transformation that lasts —<br />not just a report.</h2>
          <p className="sec-sub">We implement, not just advise. Every engagement ends with your team owning the new systems.</p>
          <div className="services-grid">
            {[
              { num: '01', title: 'Digital Audit', desc: 'We map every workflow, tool, and integration in your business. You receive a prioritised list of bottlenecks with estimated impact and cost to fix.', tags: ['Process mapping','Tool audit','Bottleneck analysis','ROI estimates'] },
              { num: '02', title: 'Technology Roadmap', desc: 'Based on the audit, we design a phased transformation roadmap with clear milestones, ownership, and success metrics.', tags: ['Roadmap','Architecture','Change management','Milestones'] },
              { num: '03', title: 'Implementation', desc: 'We build and roll out the new systems — automation, software, integrations, and processes — with your team involved throughout.', tags: ['Automation','Software build','Integrations','Training'] },
              { num: '04', title: 'Adoption & Optimisation', desc: 'We measure adoption, collect feedback, and optimise the systems in the first 90 days post-launch. Your team owns everything.', tags: ['Adoption tracking','Optimisation','Documentation','Handover'] },
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
          <span className="sec-label">Who it&apos;s for</span>
          <h2 className="sec-title">Businesses at a<br />technology inflection point.</h2>
          <div className="how-steps" style={{ maxWidth: 640 }}>
            {[
              { n: '→', title: 'Growing faster than your systems', desc: 'Your manual processes are becoming a ceiling on growth. You need systems that can scale with you.' },
              { n: '→', title: 'Post-acquisition or merger', desc: 'You need to integrate two sets of tools, processes, and teams into a single, efficient operation.' },
              { n: '→', title: 'Preparing for investment', desc: 'Investors expect clean, scalable systems. We help you get investment-ready from a technology perspective.' },
              { n: '→', title: 'Replacing legacy software', desc: 'Your current stack is holding you back. We map the migration, rebuild what needs rebuilding, and retire what doesn\'t work.' },
            ].map(s => (
              <div key={s.n} className="how-step">
                <div className="how-step-n" style={{ fontSize: 20 }}>{s.n}</div>
                <div className="how-step-body"><h4>{s.title}</h4><p>{s.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-cta">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Start with a free audit →</a>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to transform<br />your business?</h2>
          <p>Book a free discovery call. We&apos;ll map your biggest bottleneck and show you what transformation looks like in practice.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
