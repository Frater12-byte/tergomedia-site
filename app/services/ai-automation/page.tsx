import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & Automation Services Dubai — Lead Automation, CRM, AI Agents | Tergo Media',
  description: 'AI agents, lead automation, document processing, CRM integration and reporting — all automated by Tergo Media. n8n, Make, GPT-4o, WhatsApp API. Dubai, Bucharest, Milan.',
  keywords: 'AI automation services Dubai, n8n automation, Make automation, GPT-4o agents, WhatsApp automation, CRM integration, lead automation, document processing',
  openGraph: {
    title: 'AI & Automation Services — Tergo Media',
    description: 'AI agents, lead automation, CRM integration, document processing — all automated. Your team focuses on growth, not admin.',
    url: 'https://tergomedia.com/services/ai-automation',
    siteName: 'Tergo Media',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Automation Services — Tergo Media',
    description: 'AI agents, lead automation, CRM integration. Your team focuses on growth, not admin.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://tergomedia.com/services/ai-automation' },
  robots: { index: true, follow: true },
};

export default function AIAutomationPage() {
  return (
    <>
      <section className="page-hero">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="900,0 1440,80 1440,320 1100,420 800,280 850,0" fill="rgba(249,202,0,0.02)" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.12"/>
          <circle cx="900" cy="0" r="2" fill="#f9ca00" fillOpacity="0.25"/>
          <circle cx="1100" cy="420" r="1.5" fill="#f9ca00" fillOpacity="0.18"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Service 01
          </div>
          <h1>AI & <em>Automation</em></h1>
          <p>Lead capture, document processing, AI agents, CRM integration, reporting — all automated. Your team focuses on growth, not admin.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a free audit →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">90<span>s</span></div><div className="met-s">Lead response<br />time</div></div>
            <div className="met"><div className="met-b">94<span>%</span></div><div className="met-s">Tasks handled<br />automatically</div></div>
            <div className="met"><div className="met-b">38<span>h</span></div><div className="met-s">Admin hours saved<br />per week</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Manual entry<br />required</div></div>
          </div>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">What we automate</span>
          <h2 className="sec-title">Six systems we build<br />and maintain for you.</h2>
          <p className="sec-sub">Each automation is production-grade, monitored, and handed over with full documentation.</p>
          <div className="showcase-grid">
            {[
              { color: '#f9ca00', title: 'AI Lead Response', desc: 'Every inbound enquiry — regardless of source or time — gets a personalised response in under 90 seconds. AI reads intent, writes the message, routes to the best agent.', tags: ['GPT-4o','WhatsApp API','n8n','HubSpot'] },
              { color: '#f9ca00', title: 'Invoice & Document AI', desc: 'Invoices, contracts, and supplier documents are read by AI, data extracted, validated, and synced to your accounting system — no manual entry, no errors.', tags: ['OCR','Claude','Make','Xero / QuickBooks'] },
              { color: '#f9ca00', title: 'KPI Dashboard Auto-Report', desc: 'Your leadership team receives a fully formatted PDF report every Monday morning with last week\'s KPIs — generated and sent without a single click.', tags: ['Google Sheets','Slack','PDF generation','n8n'] },
              { color: '#f9ca00', title: 'Client Onboarding Pipeline', desc: 'When a deal is marked Won in CRM, a full onboarding sequence fires: welcome email, document request, kick-off invite, Slack channel — all within 2 minutes.', tags: ['HubSpot','Slack','Google Calendar','DocuSign'] },
              { color: '#f9ca00', title: 'IoT Alert & Escalation', desc: 'Sensor thresholds breach → system classifies severity → right team member alerted via SMS/email/Slack with context and recommended action.', tags: ['MQTT','Node.js','Twilio SMS','PagerDuty'] },
              { color: '#f9ca00', title: 'Marketplace Price Sync', desc: 'Product pricing and availability stay in sync across your website, Amazon, Noon, and distributor portals — updated automatically whenever your master catalogue changes.', tags: ['WooCommerce','Amazon API','Make','Webhooks'] },
            ].map((c, i) => (
              <div key={i} className="sc-card">
                <div className="sc-icon" style={{ borderColor: `${c.color}4d` }}>
                  <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="3" stroke={c.color} strokeWidth="1.5" fill="none"/></svg>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="sc-tags">{c.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Our process</span>
          <h2 className="sec-title">From audit to automation<br />in 4 clear steps.</h2>
          <div className="how-steps" style={{ maxWidth: 640 }}>
            {[
              { n: '01', title: 'Automation audit', desc: 'We map your workflows, identify where time is lost, and quantify the impact. Free for qualified leads.', badge: '1–2 DAYS' },
              { n: '02', title: 'Tool selection & scoping', desc: 'We select the right tools (n8n, Make, Zapier, custom code) and provide a fixed-price proposal.', badge: '3–5 DAYS' },
              { n: '03', title: 'Build, test, iterate', desc: 'Weekly demos. You see every automation working before it goes live — no surprises.', badge: '2–6 WEEKS' },
              { n: '04', title: 'Go live + handover', desc: 'Full documentation, team training, monitoring setup, and 30-day post-launch support.', badge: '1 WEEK' },
            ].map(s => (
              <div key={s.n} className="how-step">
                <div className="how-step-n">{s.n}</div>
                <div className="how-step-body"><h4>{s.title}</h4><p>{s.desc}</p><span className="step-badge">{s.badge}</span></div>
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
          <h2>Ready to automate<br />your business?</h2>
          <p>Book a free 30-minute discovery call. We&apos;ll identify your top automation opportunity and estimate the ROI.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
