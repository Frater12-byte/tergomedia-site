import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate — Tergo Media',
  description: 'AI automation and custom software for real estate companies. Lead qualification, WhatsApp AI, CRM integration, and property portals across the Gulf and Europe.',
};

export default function RealEstatePage() {
  return (
    <>
      <section className="page-hero">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="200,0 600,0 700,300 400,500 100,400 0,200" fill="rgba(249,202,0,0.015)" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.1"/>
          <circle cx="200" cy="0" r="2" fill="#f9ca00" fillOpacity="0.18"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Sector — Real Estate</div>
          <h1>AI that closes<br /><em>more deals.</em></h1>
          <p>Every inbound lead responded to in 90 seconds. Every follow-up automated. Every agent focused on selling — not admin.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">90<span>s</span></div><div className="met-s">Lead response<br />time</div></div>
            <div className="met"><div className="met-b">94<span>%</span></div><div className="met-s">Enquiries<br />auto-handled</div></div>
            <div className="met"><div className="met-b">3x</div><div className="met-s">Lead handling<br />capacity</div></div>
            <div className="met"><div className="met-b">$2.1<span>M</span></div><div className="met-s">Pipeline added<br />for RE/MAX Gulf</div></div>
          </div>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">What we automate</span>
          <h2 className="sec-title">Every touchpoint in the<br />real estate sales cycle.</h2>
          <p className="sec-sub">From the first enquiry to the signed contract — we automate the repeatable work so your agents can focus on relationships.</p>
          <div className="services-grid">
            {[
              { num: '01', title: 'Lead Qualification AI', desc: 'Every inbound enquiry — WhatsApp, web form, portal listing — is instantly scored, categorised, and routed to the right agent with a full brief.', tags: ['GPT-4o', 'WhatsApp API', 'Lead scoring'] },
              { num: '02', title: 'Automated Follow-Up', desc: 'Prospects who don\'t reply get a carefully timed follow-up sequence. No lead goes cold. No agent needs to chase manually.', tags: ['n8n', 'Email', 'WhatsApp', 'SMS'] },
              { num: '03', title: 'CRM Integration', desc: 'Every enquiry, conversation, and outcome flows automatically into your CRM. Full pipeline visibility with zero manual data entry.', tags: ['HubSpot', 'Salesforce', 'Pipedrive'] },
              { num: '04', title: 'Property Portals', desc: 'Custom listing portals with real-time availability, multi-currency pricing, virtual tour integration, and enquiry capture.', tags: ['Next.js', 'React', 'Custom dev'] },
              { num: '05', title: 'Agent Performance Reporting', desc: 'Automated weekly reports for every agent: calls made, leads converted, pipeline value, and ranking against team benchmarks.', tags: ['Reporting', 'KPI dashboards', 'Automation'] },
              { num: '06', title: 'Document Automation', desc: 'Generate tenancy agreements, offer letters, and MOU documents automatically when a deal progresses — pre-filled from CRM data.', tags: ['Document generation', 'E-signature', 'Legal'] },
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
          <span className="sec-label">Case study</span>
          <h2 className="sec-title">Cocktail Holidays — Dubai</h2>
          <div className="how-steps" style={{ maxWidth: 640 }}>
            {[
              { n: '→', title: 'The problem', desc: 'A luxury property portal in Dubai was receiving 200+ enquiries per week. Agents were taking 4+ hours to respond. Hot leads were going cold.' },
              { n: '→', title: 'What we built', desc: 'An AI qualification engine connected to WhatsApp. Every enquiry is scored in real time, routed to the right agent, and an initial response is sent within 90 seconds — automatically.' },
              { n: '→', title: 'The result', desc: '94% of enquiries are fully handled by the AI. Agents only see qualified, ready-to-talk leads. Enquiry volume increased 38% within 60 days of launch.' },
            ].map(s => (
              <div key={s.n} className="how-step">
                <div className="how-step-n" style={{ fontSize: 20 }}>{s.n}</div>
                <div className="how-step-body"><h4>{s.title}</h4><p>{s.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-cta">
            <Link href="/portfolio" className="btn btn-y btn-lg">See full portfolio →</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to automate<br />your real estate pipeline?</h2>
          <p>Book a free discovery call. We&apos;ll show you exactly what we&apos;d build for your agency — and what results you can expect.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
