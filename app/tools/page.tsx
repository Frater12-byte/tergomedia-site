/* eslint-disable */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Tools — Tergo Media',
  description: 'Two free tools built by Tergo Media — a real estate automation ROI calculator for Dubai brokerages, and a live Middle East threat tracker.',
};

export default function ToolsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Free tools</div>
          <h1>Built by us.<br /><em>Free for you.</em></h1>
          <p>Two tools we built and made available for free. No sign-up, no credit card, no catch.</p>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <div className="tools-grid">

            {/* ── Tool 1: Real Estate ROI ── */}
            <div className="tool-card">
              <div className="tool-img-wrap">
                <img src="/Images/IMG-23.png" alt="Real Estate Automation ROI Calculator" className="tool-img" />
              </div>
              <div className="tool-body">
                <div className="tool-card-top">
                  <span className="tool-tag">Free · Dubai brokerages</span>
                </div>
                <h2 className="tool-title">Real Estate ROI Calculator</h2>
                <p className="tool-desc">
                  Find out exactly how much money your Dubai brokerage is leaving on the table without automation. Answer a few questions about your team, lead volume, and current processes — and get an instant breakdown of lost revenue, wasted hours, and missed deals.
                </p>
                <ul className="tool-bullets">
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ca00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    Calculates lost revenue from slow lead response
                  </li>
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ca00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    Estimates hours wasted on manual admin per agent
                  </li>
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ca00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    Shows projected ROI from a CRM + automation rollout
                  </li>
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ca00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    Instant results — no sign-up required
                  </li>
                </ul>
                <a
                  href="https://analyzer.tergomedia.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="tool-cta"
                  style={{ borderColor: '#f9ca00', color: '#f9ca00' }}
                >
                  Calculate my ROI →
                </a>
              </div>
            </div>

            {/* ── Tool 2: Middle East Threat Tracker ── */}
            <div className="tool-card">
              <div className="tool-img-wrap">
                <img src="/Images/IMG-13.png" alt="Middle East Threat Tracker" className="tool-img" />
              </div>
              <div className="tool-body">
                <div className="tool-card-top">
                  <span className="tool-tag">Free · Live updates</span>
                </div>
                <h2 className="tool-title">Middle East Threat Tracker</h2>
                <p className="tool-desc">
                  A live monitoring tool that tracks and reports missile attacks, airstrikes, and security incidents across the Middle East. Aggregates and cross-references dozens of news outlets, official sources, and verified social feeds — updated in real time.
                </p>
                <ul className="tool-bullets">
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff9d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    Monitors 50+ news outlets and verified sources
                  </li>
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff9d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    Real-time incident map with location tagging
                  </li>
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff9d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    Cross-references reports to filter misinformation
                  </li>
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff9d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    Free to use — no account needed
                  </li>
                </ul>
                <a
                  href="https://alerts.tergomedia.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="tool-cta"
                  style={{ borderColor: '#00ff9d', color: '#00ff9d' }}
                >
                  Open Tracker →
                </a>
              </div>
            </div>

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
