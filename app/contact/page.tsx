import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Tergo Media',
  description: 'Get in touch with Tergo Media. Book a discovery call, email us, or connect on LinkedIn.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Get in touch</div>
          <h1>Let&apos;s talk about<br />your <em>project.</em></h1>
          <p>Book a free 30-minute discovery call, send us an email, or connect with us on LinkedIn. We respond within 24 hours.</p>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <span className="sec-label">Talk to us</span>
              <h2 className="sec-title" style={{ marginBottom: 32 }}>The fastest way<br />to get started.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="office-card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(249,202,0,.1)', border: '1px solid rgba(249,202,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f9ca00" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>Book a discovery call</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>Free 30-min call · No commitment</div>
                  </div>
                </a>
                <a href="mailto:hello@tergomedia.com" className="office-card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>hello@tergomedia.com</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>We reply within 24 hours</div>
                  </div>
                </a>
                <a href="https://www.linkedin.com/company/tergomedia" target="_blank" rel="noreferrer" className="office-card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,.5)' }}>in</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>LinkedIn</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>Follow us · Connect with founders</div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <span className="sec-label">Our offices</span>
              <h2 className="sec-title" style={{ marginBottom: 32 }}>Three offices,<br />one team.</h2>
              <div className="office-cards" style={{ gridTemplateColumns: '1fr' }}>
                <div className="office-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="oc-dot dubai" /><div><div className="oc-city">Dubai, UAE</div><div className="oc-role">HQ · Gulf operations</div></div></div>
                  <div className="oc-hours">Sun–Thu · 09:00–18:00 GST (GMT+4)</div>
                  <div style={{ marginTop: 8 }}><a href="https://www.linkedin.com/in/maria-terragni/" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Maria Terragni — CEO</a></div>
                </div>
                <div className="office-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="oc-dot bucharest" /><div><div className="oc-city">Bucharest, Romania</div><div className="oc-role">Engineering hub · EU deliveries</div></div></div>
                  <div className="oc-hours">Mon–Fri · 09:00–18:00 EET (GMT+2)</div>
                  <div style={{ marginTop: 8 }}><a href="https://www.linkedin.com/in/francescoterragni/" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Francesco Terragni — CTO</a></div>
                </div>
                <div className="office-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="oc-dot milan" /><div><div className="oc-city">Milan, Italy</div><div className="oc-role">European clients · Partnerships</div></div></div>
                  <div className="oc-hours">Mon–Fri · 09:00–18:00 CET (GMT+1)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>The easiest way is a 30-minute call. We&apos;ll ask the right questions and give you a clear picture of what&apos;s possible.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
