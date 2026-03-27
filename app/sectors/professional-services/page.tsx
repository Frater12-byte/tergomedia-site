import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Services — Tergo Media',
  description: 'Client onboarding automation, CRM rollouts, document processing, and reporting infrastructure for law firms, consultancies, and agencies.',
};

export default function ProfessionalServicesPage() {
  return (
    <>
      <section className="page-hero">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="300,0 700,100 800,400 600,600 200,500 0,300 100,0" fill="rgba(176,110,255,0.015)" stroke="#b06eff" strokeWidth="0.5" strokeOpacity="0.1"/>
          <circle cx="300" cy="0" r="2" fill="#b06eff" fillOpacity="0.18"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Sector — Professional Services</div>
          <h1>Less admin.<br /><em>More billable work.</em></h1>
          <p>Client onboarding in 2 minutes. Documents generated automatically. CRM that actually gets used. We build the systems that let your team do the work that matters.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">2<span>min</span></div><div className="met-s">Onboarding start<br />after close</div></div>
            <div className="met"><div className="met-b">70<span>%</span></div><div className="met-s">Admin time<br />saved</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Manual onboarding<br />steps</div></div>
            <div className="met"><div className="met-b">4.9<span>★</span></div><div className="met-s">Avg client<br />rating</div></div>
          </div>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">What we automate</span>
          <h2 className="sec-title">The full client lifecycle —<br />automated end to end.</h2>
          <p className="sec-sub">From the moment a deal closes to the final invoice — we automate the repeatable work so your team can focus on delivering, not managing.</p>
          <div className="services-grid">
            {[
              { num: '01', title: 'Client Onboarding Automation', desc: 'When a deal closes in your CRM, the full onboarding sequence fires automatically: welcome email, portal access, kickoff call booking, contract generation, and task creation for your team.', tags: ['n8n', 'HubSpot', 'DocuSign', 'Make'] },
              { num: '02', title: 'CRM Rollout & Integration', desc: 'We configure, migrate, and integrate your CRM so it actually gets used. Custom pipelines, automation rules, and reporting dashboards tailored to how your business works.', tags: ['HubSpot', 'Salesforce', 'Pipedrive', 'Custom'] },
              { num: '03', title: 'Document Processing', desc: 'Contracts, proposals, NDAs, and invoices generated automatically from templates — pre-filled from CRM data, sent for signature, and filed without anyone touching them.', tags: ['Document generation', 'E-signature', 'Filing'] },
              { num: '04', title: 'Billing & Invoicing Automation', desc: 'Invoices generated and sent on schedule. Payment reminders triggered automatically. Overdue escalation handled without a single manual chase.', tags: ['Stripe', 'Xero', 'QuickBooks', 'Automation'] },
              { num: '05', title: 'Team Reporting Infrastructure', desc: 'Automated weekly KPI reports for every team member and every client. Utilisation, billing, satisfaction scores, and project status — delivered without anyone compiling spreadsheets.', tags: ['Reporting', 'KPI dashboards', 'Automation'] },
              { num: '06', title: 'Client Portal', desc: 'A branded client portal where clients can view project status, upload documents, approve deliverables, and raise tickets — reducing your inbound email by 60%+.', tags: ['Next.js', 'React', 'Custom dev', 'Portal'] },
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
          <h2 className="sec-title">HayGuard — Milan</h2>
          <div className="how-steps" style={{ maxWidth: 640 }}>
            {[
              { n: '→', title: 'The problem', desc: 'A professional services firm in Milan was spending 70% of their operations team\'s time on manual onboarding tasks: sending welcome emails, creating project folders, setting up access, assigning tasks. Every new client took 3 days to fully onboard.' },
              { n: '→', title: 'What we built', desc: 'End-to-end onboarding automation integrated with HubSpot CRM. When a deal closes, the full onboarding sequence fires within 2 minutes: welcome email sent, portal access granted, kickoff call booked, internal tasks created, and the client file prepared.' },
              { n: '→', title: 'The result', desc: 'Onboarding now starts in 2 minutes instead of 3 days. Zero manual steps. 70% of the operations team\'s time freed up for work that actually requires human attention.' },
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
          <h2>Ready to eliminate<br />the admin overhead?</h2>
          <p>Book a free discovery call. We&apos;ll map your biggest operational bottleneck and show you what automation looks like in practice.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
