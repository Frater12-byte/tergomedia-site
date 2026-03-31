/* eslint-disable */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Tools — Tergo Media',
  description: 'Free tools built by Tergo Media — a business automation analyser and a real-time alert monitoring tool. No sign-up required.',
};

const TOOLS = [
  {
    href: 'https://analyzer.tergomedia.com/',
    label: 'Automation Analyser',
    tag: 'Free tool',
    desc: 'Answer a few questions about your business and get a personalised report showing exactly where automation would save you the most time and money. No sign-up. Instant results.',
    cta: 'Launch Analyser →',
    color: '#f9ca00',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f9ca00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    bullets: [
      'Maps your current workflow bottlenecks',
      'Estimates time and cost savings',
      'Recommends the right automation stack',
      'Generates a printable PDF report',
    ],
  },
  {
    href: 'https://alerts.tergomedia.com/',
    label: 'Smart Alerts',
    tag: 'Free tool',
    desc: 'Set up real-time alerts for your business — website downtime, form submissions, price changes, API failures, and more. Get notified instantly via WhatsApp, email, or Slack.',
    cta: 'Launch Alerts →',
    color: '#00ff9d',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    bullets: [
      'No code required — set up in minutes',
      'Monitors websites, APIs, and data feeds',
      'Delivers alerts via WhatsApp, email, or Slack',
      'Escalation rules and team notifications',
    ],
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Free tools</div>
          <h1>Built by us.<br /><em>Free for you.</em></h1>
          <p>Two tools we built for our own clients — and made free for everyone. No sign-up, no credit card, no catch.</p>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <div className="tools-grid">
            {TOOLS.map(t => (
              <div key={t.href} className="tool-card">
                <div className="tool-card-top">
                  <div className="tool-icon-wrap">{t.icon}</div>
                  <span className="tool-tag">{t.tag}</span>
                </div>
                <h2 className="tool-title">{t.label}</h2>
                <p className="tool-desc">{t.desc}</p>
                <ul className="tool-bullets">
                  {t.bullets.map(b => (
                    <li key={b}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="tool-cta"
                  style={{ borderColor: t.color, color: t.color }}
                >
                  {t.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Want a custom tool<br />built for your business?</h2>
          <p>These free tools give you a taste of what we build. For something tailored to your exact workflow, book a call.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
          </div>
        </div>
      </section>
    </>
  );
}
