/* eslint-disable */
'use client';
import { useState } from 'react';
import Image from 'next/image';
import WorldMap from '@/components/WorldMap';
import { submitForm } from '@/lib/submitForm';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await submitForm({ ...form, _source: 'contact-page' });
    if (res.ok) {
      setStatus('ok');
    } else {
      setErrMsg(res.error ?? 'Something went wrong.');
      setStatus('err');
    }
  };

  return (
    <>
      {/* CONTACT FORM + INFO */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>

            {/* Left — info */}
            <div>
              <span className="sec-label">Talk to us</span>
              <h2 className="sec-title" style={{ marginBottom: 32 }}>The fastest way<br />to get started.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
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

              {/* Offices */}
              <span className="sec-label">Our offices</span>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', margin: '12px 0 20px' }}>Three offices, one team.</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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

            {/* Right — contact form */}
            <div>
              <span className="sec-label">Send a message</span>
              <h2 className="sec-title" style={{ marginBottom: 32 }}>Tell us about<br />your project.</h2>

              {status === 'ok' ? (
                <div style={{ background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.25)', padding: '48px 32px', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Message sent!</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,.4)' }}>We'll get back to you within 24 hours.</div>
                </div>
              ) : (
                <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handle}
                        required
                        placeholder="Your name"
                        style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handle}
                        required
                        placeholder="you@company.com"
                        style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Company</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handle}
                      placeholder="Your company name"
                      style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      required
                      rows={5}
                      placeholder="Tell us what you're working on..."
                      style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none', resize: 'vertical', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    />
                  </div>
                  {status === 'err' && (
                    <div style={{ fontSize: 13, color: '#ff5050', background: 'rgba(255,80,80,.06)', border: '1px solid rgba(255,80,80,.2)', padding: '10px 14px' }}>{errMsg}</div>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-y btn-lg"
                    style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.6 : 1, cursor: status === 'sending' ? 'wait' : 'pointer' }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <span className="sec-label">The founders</span>
            <h2 className="sec-title">The people you'll work with.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, maxWidth: 640 }}>
            {[
              { img: '/Images/IMG-19.png', name: 'Maria Terragni', role: 'CEO', location: 'Dubai, UAE', linkedin: 'https://www.linkedin.com/in/maria-terragni/', color: '#f9ca00' },
              { img: '/Images/IMG-04.png', name: 'Francesco Terragni', role: 'CTO', location: 'Bucharest, Romania', linkedin: 'https://www.linkedin.com/in/francescoterragni/', color: '#00FF9D' },
            ].map(p => (
              <div key={p.name} style={{ background: 'var(--dark)', border: '1px solid rgba(255,255,255,.07)', overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', background: '#111' }}>
                  <Image src={p.img} alt={p.name} fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: `${p.color}`, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>{p.role}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginBottom: 16 }}>{p.location}</div>
                  <a href={p.linkedin} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,.45)', textDecoration: 'none', border: '1px solid rgba(255,255,255,.1)', padding: '6px 12px', transition: 'color .2s, border-color .2s' }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>in</span> Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORLD MAP */}
      <section style={{ background: 'var(--dark)', paddingBottom: 0 }}>
        <div className="container" style={{ paddingBottom: 0 }}>
          <div style={{ maxWidth: 560, marginBottom: 40 }}>
            <span className="sec-label">Where we operate</span>
            <h2 className="sec-title">Dubai · Bucharest · Milan</h2>
          </div>
        </div>
        <WorldMap />
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>The easiest way is a 30-minute call. We'll ask the right questions and give you a clear picture of what's possible.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
