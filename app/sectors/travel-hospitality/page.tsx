import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel & Hospitality — Tergo Media',
  description: 'Custom booking systems, guest communication AI, and operational automation for hotels, resorts, and private aviation companies.',
};

export default function TravelHospitalityPage() {
  return (
    <>
      <section className="page-hero">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="1200,0 1440,100 1440,500 1100,600 900,400 1000,0" fill="rgba(0,200,255,0.015)" stroke="#00c8ff" strokeWidth="0.5" strokeOpacity="0.1"/>
          <circle cx="1200" cy="0" r="2" fill="#00c8ff" fillOpacity="0.18"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Sector — Travel & Hospitality</div>
          <h1>Guest experience.<br /><em>Fully automated.</em></h1>
          <p>Custom booking systems, AI guest communication, review automation, and real-time channel sync. Run lean, deliver exceptional experiences.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">99.9<span>%</span></div><div className="met-s">System uptime<br />across clients</div></div>
            <div className="met"><div className="met-b">12k<span>+</span></div><div className="met-s">Tasks automated<br />per month</div></div>
            <div className="met"><div className="met-b">6<span>wk</span></div><div className="met-s">Typical booking<br />system build</div></div>
            <div className="met"><div className="met-b">100<span>%</span></div><div className="met-s">Manual work<br />eliminated</div></div>
          </div>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">What we build</span>
          <h2 className="sec-title">Systems that run your<br />operations 24/7.</h2>
          <p className="sec-sub">From the booking engine to post-stay reviews — we automate the full guest journey so your team can focus on hospitality, not admin.</p>
          <div className="services-grid">
            {[
              { num: '01', title: 'Custom Booking Systems', desc: 'Real-time availability, multi-currency pricing, automated confirmations, and payment integration. Built for your specific operation — not a generic SaaS template.', tags: ['React', 'Next.js', 'Stripe', 'Calendly API'] },
              { num: '02', title: 'Guest Communication AI', desc: 'Pre-arrival messages, check-in instructions, upsell sequences, and post-stay follow-ups — all personalised and automated. Guests get a 5-star experience without any manual work.', tags: ['GPT-4o', 'WhatsApp', 'Email', 'SMS'] },
              { num: '03', title: 'Review Response Automation', desc: 'Every review on TripAdvisor, Google, and Booking.com gets a personalised, brand-consistent response within minutes — not days.', tags: ['AI responses', 'Multi-platform', 'Brand voice'] },
              { num: '04', title: 'Channel Manager Sync', desc: 'Availability and pricing synced in real time across all OTAs and your direct booking engine. Zero double-bookings. Zero manual updates.', tags: ['Channel manager', 'OTA sync', 'Pricing automation'] },
              { num: '05', title: 'Fleet & Resource Management', desc: 'For charter operators: real-time aircraft or vessel availability, crew scheduling, maintenance tracking, and automated client communications.', tags: ['Fleet management', 'Crew scheduling', 'Custom dev'] },
              { num: '06', title: 'Revenue Reporting', desc: 'Automated daily, weekly, and monthly revenue reports with RevPAR, ADR, occupancy, and channel attribution — delivered to your inbox automatically.', tags: ['RevPAR', 'ADR', 'Dashboards', 'Automation'] },
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
          <span className="sec-label">Case studies</span>
          <h2 className="sec-title">Built for operators<br />who run lean.</h2>
          <div className="how-steps" style={{ maxWidth: 640 }}>
            {[
              { n: '→', title: 'Ranjet Aviation — Dubai', desc: 'Custom booking and fleet management system for a private jet charter company. Real-time availability, multi-currency pricing, automated crew scheduling. Built in 6 weeks. 100% of manual work eliminated.' },
              { n: '→', title: 'Tergo AI Suite — Multi-market', desc: 'A proprietary AI toolsuite for hospitality clients: guest communication AI, automated review responses, and booking channel sync. 8 clients active, 12,000+ tasks automated per month, 99.9% uptime.' },
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
          <h2>Ready to automate<br />your guest journey?</h2>
          <p>Book a free discovery call. We&apos;ll show you what a modern, automated hospitality operation looks like — and how fast we can get you there.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
