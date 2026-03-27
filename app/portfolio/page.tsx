import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio — Tergo Media',
  description: 'Case studies from Tergo Media: AI automation, custom development, and digital transformation projects across real estate, travel, agriculture, and more.',
};

const PROJECTS = [
  { img: '/Images/IMG-01.png', tags: ['Real Estate','AI Automation','WhatsApp'], title: 'Cocktail Holidays', location: 'Dubai, UAE', desc: 'AI lead qualification and WhatsApp automation for a Dubai luxury property portal. Every inbound enquiry is scored, routed, and responded to within 90 seconds — 24/7.', results: [{ b: '4h → 90s', s: 'Response time' }, { b: '94%', s: 'Auto-handled' }, { b: '+38%', s: 'Enquiries' }] },
  { img: '/Images/IMG-02.png', tags: ['Agriculture','IoT','Automation'], title: 'Agri Novatex', location: 'Bucharest, Romania', desc: 'IoT sensor platform and automated alert escalation for precision agriculture. Soil, moisture, and temperature sensors across 400 hectares monitored in real time.', results: [{ b: '400ha', s: 'Monitored' }, { b: '3min', s: 'Alert response' }, { b: '0', s: 'Missed events' }] },
  { img: '/Images/IMG-03.png', tags: ['Travel','Custom Dev','Booking'], title: 'Ranjet Aviation', location: 'Dubai, UAE', desc: 'Custom booking and fleet management system for a private jet charter company. Real-time availability, multi-currency pricing, and automated crew scheduling.', results: [{ b: '6wk', s: 'Build time' }, { b: '100%', s: 'Manual work cut' }, { b: '4.9★', s: 'Client rating' }] },
  { img: '/Images/IMG-04.png', tags: ['Professional Services','CRM','Onboarding'], title: 'HayGuard', location: 'Milan, Italy', desc: 'End-to-end client onboarding automation integrated with HubSpot CRM. When a deal closes, the full onboarding sequence fires automatically within 2 minutes.', results: [{ b: '2min', s: 'Onboarding start' }, { b: '70%', s: 'Time saved' }, { b: '0', s: 'Manual steps' }] },
  { img: '/Images/IMG-05.png', tags: ['Real Estate','Digital Transformation','CRM'], title: 'RE/MAX Gulf', location: 'Dubai, UAE', desc: 'Full digital transformation for a 50-agent real estate brokerage. CRM rollout, lead automation, agent training programme, and KPI reporting infrastructure.', results: [{ b: '50', s: 'Agents trained' }, { b: '3x', s: 'Lead capacity' }, { b: '$2.1M', s: 'Pipeline added' }] },
  { img: '/Images/IMG-06.png', tags: ['Hospitality','Custom Dev','AI'], title: 'Tergo AI Suite', location: 'Multi-market', desc: 'A proprietary AI toolsuite built for hospitality and professional services clients — including guest communication AI, automated review responses, and booking channel sync.', results: [{ b: '8', s: 'Clients active' }, { b: '12k+', s: 'Tasks/month' }, { b: '99.9%', s: 'Uptime' }] },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Our work</div>
          <h1>Shipped. In production.<br /><em>Working.</em></h1>
          <p>A selection of client projects — all live, all delivering measurable results. No mockups or demos.</p>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <div style={{ display: 'grid', gap: 2, background: 'rgba(255,255,255,.06)' }}>
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ background: 'var(--surface)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                <div style={{ overflow: 'hidden' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', minHeight: 240, objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
                  <div className="port-tags">{p.tags.map(t => <span key={t} className="port-tag">{t}</span>)}</div>
                  <div>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{p.title}</h2>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 14 }}>{p.location}</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.75 }}>{p.desc}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 1, background: 'rgba(255,255,255,.06)' }}>
                    {p.results.map(r => (
                      <div key={r.s} style={{ background: 'var(--dark)', padding: '14px 18px', flex: 1, textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 22, fontWeight: 900, color: 'var(--y)', lineHeight: 1, marginBottom: 4 }}>{r.b}</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.28)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{r.s}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Want results like these?</h2>
          <p>Book a free discovery call. We&apos;ll show you what we&apos;d build for your specific business.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
          </div>
        </div>
      </section>
    </>
  );
}
