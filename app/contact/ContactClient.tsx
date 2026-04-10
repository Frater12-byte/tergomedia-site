/* eslint-disable */
'use client';
import { useState } from 'react';
import Image from 'next/image';
import WorldMap from '@/components/WorldMap';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [loadTime] = useState(() => Date.now());
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot check — bots fill hidden fields
    if (honeypot) { setStatus('success'); return; }
    // Timing check — human forms take at least 4s to fill
    if (Date.now() - loadTime < 4000) { setStatus('success'); return; }
    if (!form.email.includes('@')) { setErrMsg('A valid email address is required.'); setStatus('error'); return; }
    setStatus('submitting');
    try {
      const res = await fetch('https://tergomedia.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _source: 'contact-page' }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setErrMsg('Something went wrong. Please try again or email us directly.');
      setStatus('error');
    }
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero-eyebrow reveal">◆ GET IN TOUCH</div>
          <h1 className="reveal reveal-delay-1">
            Let&apos;s talk about<br />your <em>project.</em>
          </h1>
          <p className="reveal reveal-delay-2">
            Book a free 30-minute discovery call, send us a message, or connect with us on LinkedIn. We respond within 24 hours.
          </p>
          <div className="hero-ctas reveal reveal-delay-3">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
            <a href="https://www.linkedin.com/company/tergomedia" target="_blank" rel="noreferrer" className="btn btn-od btn-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          </div>
          <div className="hero-locs reveal reveal-delay-3">
            <div className="hero-loc"><div className="loc-dot" style={{ background: '#f9ca00' }} />Dubai HQ</div>
            <div className="hero-loc loc-sep">·</div>
            <div className="hero-loc"><div className="loc-dot" style={{ background: '#00ff9d' }} />Bucharest</div>
            <div className="hero-loc loc-sep">·</div>
            <div className="hero-loc"><div className="loc-dot" style={{ background: '#00c8ff' }} />Milan</div>
          </div>
        </div>
      </section>

      {/* ── CONTACT OPTIONS ───────────────────────────────── */}
      <section className="section" style={{ background: '#1e1e1e', borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <div className="container">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <span className="sec-label reveal">TALK TO US</span>
            <h2 className="sec-title reveal reveal-delay-1" style={{ color: '#fff' }}>The fastest way<br />to get started.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 2, background: 'rgba(255,255,255,.06)' }} className="reveal reveal-delay-2">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f9ca00" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                title: 'Book a discovery call',
                sub: 'Free 30-min · No commitment',
                link: 'https://outlook.office.com/book/TergoMedia1@tergomedia.com/',
                label: 'Book now →',
                external: true,
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                title: 'hello@tergomedia.com',
                sub: 'We reply within 24 hours',
                link: 'mailto:hello@tergomedia.com',
                label: 'Send email →',
                external: false,
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,.45)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                title: 'LinkedIn',
                sub: 'Follow us · Connect with founders',
                link: 'https://www.linkedin.com/company/tergomedia',
                label: 'Connect →',
                external: true,
              },
            ].map((card, i) => (
              <a
                key={i}
                href={card.link}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noreferrer' : undefined}
                style={{
                  background: 'rgba(24,24,24,1)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  textDecoration: 'none',
                  color: 'inherit',
                  borderLeft: '3px solid transparent',
                  transition: 'border-color .2s, background .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = '#f9ca00'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(30,30,30,1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(24,24,24,1)'; }}
              >
                <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {card.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{card.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginBottom: 14 }}>{card.sub}</div>
                  <span style={{ fontSize: 12, color: '#f9ca00', fontWeight: 600 }}>{card.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICES ───────────────────────────────────────── */}
      <section className="section section-light offices-section">
        <div className="container">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <span className="sec-label reveal">OUR OFFICES</span>
            <h2 className="sec-title reveal reveal-delay-1" style={{ color: '#fff' }}>Three offices,<br />one team.</h2>
          </div>
          <div className="office-cards reveal reveal-delay-2">
            <div className="office-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="oc-dot dubai" />
                <div><div className="oc-city">Dubai, UAE</div><div className="oc-role">HQ · Gulf operations</div></div>
              </div>
              <div className="oc-hours">Sun–Thu · 09:00–18:00 GST (GMT+4)</div>
              <div style={{ marginTop: 4 }}>
                <a href="https://www.linkedin.com/in/maria-terragni/" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Maria Terragni — CEO</a>
              </div>
            </div>
            <div className="office-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="oc-dot bucharest" />
                <div><div className="oc-city">Bucharest, Romania</div><div className="oc-role">Engineering hub · EU deliveries</div></div>
              </div>
              <div className="oc-hours">Mon–Fri · 09:00–18:00 EET (GMT+2)</div>
              <div style={{ marginTop: 4 }}>
                <a href="https://www.linkedin.com/in/francescoterragni/" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Francesco Terragni — CTO</a>
              </div>
            </div>
            <div className="office-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="oc-dot milan" />
                <div><div className="oc-city">Milan, Italy</div><div className="oc-role">European clients · Partnerships</div></div>
              </div>
              <div className="oc-hours">Mon–Fri · 09:00–18:00 CET (GMT+1)</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, lineHeight: 0 }}>
          <WorldMap />
        </div>
      </section>

      {/* ── CONTACT FORM ──────────────────────────────────── */}
      <section className="section" style={{ background: '#1e1e1e', borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <div className="container">
          <div style={{ alignItems: 'start' }} className="contact-form-grid">
            {/* Left */}
            <div>
              <span className="sec-label reveal">SEND A MESSAGE</span>
              <h2 className="sec-title reveal reveal-delay-1" style={{ color: '#fff' }}>Tell us about<br />your project.</h2>
              <p className="sec-sub reveal reveal-delay-2" style={{ color: 'rgba(255,255,255,.45)', marginBottom: 36 }}>
                We&apos;ll get back to you within 24 hours. For faster response, book a call.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }} className="reveal reveal-delay-3">
                {[
                  'Fixed-price proposals',
                  'Response within 24h',
                  'Free initial audit',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20, height: 20, background: 'rgba(249,202,0,.1)', border: '1px solid rgba(249,202,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f9ca00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,.55)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form card */}
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.09)', padding: 36 }} className="reveal reveal-delay-2">
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: 56, height: 56, background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Message sent!</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,.4)' }}>We&apos;ll be in touch within 24 hours.</div>
                </div>
              ) : (
                <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Honeypot — hidden from humans, filled by bots */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                    aria-hidden="true"
                  />
                  <div className="form-row-2">
                    <Field label="Name *" name="name" value={form.name} onChange={handle} placeholder="Your name" required />
                    <Field label="Email *" name="email" type="email" value={form.email} onChange={handle} placeholder="you@company.com" required />
                  </div>
                  <Field label="Company" name="company" value={form.company} onChange={handle} placeholder="Your company name" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      required
                      rows={5}
                      placeholder="Tell us what you're working on..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 120, fontFamily: 'inherit' }}
                    />
                  </div>
                  {status === 'error' && (
                    <div style={{ fontSize: 13, color: '#f9ca00', background: 'rgba(249,202,0,.06)', border: '1px solid rgba(249,202,0,.2)', padding: '10px 14px' }}>{errMsg}</div>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn btn-y btn-lg"
                    style={{ width: '100%', justifyContent: 'center', opacity: status === 'submitting' ? 0.6 : 1, cursor: status === 'submitting' ? 'wait' : 'pointer' }}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send message →'}
                  </button>
                  <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
                    Or{' '}
                    <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" style={{ color: 'rgba(249,202,0,.7)', textDecoration: 'none' }}>book a call directly</a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <span className="sec-label reveal">THE FOUNDERS</span>
            <h2 className="sec-title reveal reveal-delay-1">The people you&apos;ll work with.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 56, alignItems: 'start' }}>
            {/* Company intro */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.75)', lineHeight: 1.8, margin: 0 }}>
                Tergo Media combines business strategy with technical execution. We identify what actually matters, eliminate waste, and build AI, automation, and software systems that work while you sleep — across Dubai, Bucharest, and Milan.
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.8, margin: 0 }}>
                Our core focus is harnessing automation — from RPA and low-code solutions to full custom software. We work with businesses across real estate, agriculture, hospitality, and professional services to drive measurable efficiency gains.
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.8, margin: 0 }}>
                Our mission is to empower companies to embrace technology, elevating their operations to new heights of efficiency and success.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
                {['Dubai', 'Bucharest', 'Milan'].map(city => (
                  <span key={city} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', padding: '4px 10px', border: '1px solid rgba(255,255,255,.1)' }}>{city}</span>
                ))}
              </div>
            </div>
            {/* Founder cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
              {[
                { img: '/Images/IMG-19.png', name: 'Maria Terragni', role: 'CEO / Co-Founder', location: 'Dubai, UAE', linkedin: 'https://www.linkedin.com/in/maria-terragni/' },
                { img: '/Images/IMG-04.png', name: 'Francesco Terragni', role: 'CTO / Co-Founder', location: 'Bucharest, Romania', linkedin: 'https://www.linkedin.com/in/francescoterragni/' },
              ].map((p, i) => (
                <div key={i} className={`team-card reveal${i === 1 ? ' reveal-delay-1' : ''}`}>
                  <Image src={p.img} alt={p.name} width={400} height={400} className="team-img" style={{ aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'top center', filter: 'grayscale(15%)' }} />
                  <div className="team-body">
                    <div style={{ marginBottom: 10 }}>
                      <span className="t-role-tag">{p.role}</span>
                    </div>
                    <h3>{p.name}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: 14 }}>{p.location}</p>
                    <a href={p.linkedin} target="_blank" rel="noreferrer" className="team-li">LinkedIn →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── CTA ───────────────────────────────────────────── */}
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

// ── Shared form helpers ─────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'rgba(255,255,255,.4)',
  textTransform: 'uppercase',
  letterSpacing: '.08em',
  marginBottom: 8,
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,.04)',
  border: '1px solid rgba(255,255,255,.1)',
  padding: '12px 16px',
  color: '#fff',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
};

function Field({ label, name, value, onChange, placeholder, type = 'text', required }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={labelStyle}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, borderColor: focused ? 'rgba(249,202,0,.5)' : 'rgba(255,255,255,.1)' }}
      />
    </div>
  );
}
