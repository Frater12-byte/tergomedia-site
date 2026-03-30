/* eslint-disable */
'use client';
import { useState, useRef } from 'react';
import { submitForm } from '@/lib/submitForm';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  tag: string;
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  padding: '10px 14px',
  color: '#fff',
  fontSize: 16,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  borderRadius: 0,
};

export default function SectorTestimonialsSlider({
  testimonials,
  source,
}: {
  testimonials: Testimonial[];
  source: string;
}) {
  const count = testimonials.length + 1; // + form card
  const [idx, setIdx] = useState(0);
  const startX = useRef(0);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(count - 1, i + 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    const result = await submitForm({ name, email, message, _source: source });
    if (result.ok) {
      setFormStatus('success');
    } else {
      setFormStatus('error');
      setErrorMsg(result.error ?? 'Something went wrong.');
    }
  };

  return (
    <div>
      {/* Track */}
      <div
        style={{ overflow: 'hidden' }}
        onTouchStart={e => { startX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const diff = e.changedTouches[0].clientX - startX.current;
          if (diff < -40) next();
          if (diff > 40) prev();
        }}
      >
        <div style={{
          display: 'flex',
          transform: `translateX(-${idx * 100}%)`,
          transition: 'transform .4s cubic-bezier(.4,0,.2,1)',
        }}>
          {/* Testimonial cards */}
          {testimonials.map((t, i) => (
            <div key={i} style={{
              flex: '0 0 100%', minWidth: '100%',
              padding: 36,
              background: 'var(--dark)',
              border: '1px solid rgba(255,255,255,.07)',
              display: 'flex', flexDirection: 'column', gap: 24,
              boxSizing: 'border-box',
            }}>
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                <path d="M0 20V12.5C0 5.6 4.2 1.4 12.6 0l1.4 2.1C9.1 3.2 6.7 5.7 6.3 9.5H11V20H0zm17 0V12.5C17 5.6 21.2 1.4 29.6 0L31 2.1C26.1 3.2 23.7 5.7 23.3 9.5H28V20H17z" fill="rgba(249,202,0,.18)" />
              </svg>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,.7)', lineHeight: 1.85, margin: 0, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 20 }}>
                <div style={{ width: 42, height: 42, background: 'rgba(249,202,0,.1)', border: '1px solid rgba(249,202,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--y)', flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.38)' }}>{t.role}</div>
                </div>
                <span style={{ marginLeft: 'auto', padding: '4px 10px', background: 'rgba(249,202,0,.06)', border: '1px solid rgba(249,202,0,.18)', color: 'var(--y)', fontSize: 10, fontWeight: 700, letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{t.tag}</span>
              </div>
            </div>
          ))}

          {/* Contact form card */}
          <div style={{
            flex: '0 0 100%', minWidth: '100%',
            padding: 36,
            background: 'var(--dark)',
            border: '1px solid rgba(255,255,255,.07)',
            boxSizing: 'border-box',
          }}>
            {formStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 48, height: 48, background: 'rgba(249,202,0,.1)', border: '1px solid rgba(249,202,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4.5 4.5 7.5-9" stroke="var(--y)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ color: '#fff', fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message sent</p>
                <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 14, margin: 0 }}>We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }} noValidate>
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 22, margin: '0 0 6px', fontFamily: "'Exo 2',sans-serif" }}>Ready to talk?</h3>
                  <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, margin: 0 }}>Tell us what you&apos;re working on and we&apos;ll get back within 24 hours.</p>
                </div>
                <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />
                <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" style={inputStyle} />
                <textarea placeholder="What do you need?" value={message} onChange={e => setMessage(e.target.value)} rows={3} required style={{ ...inputStyle, resize: 'none' }} />
                {formStatus === 'error' && <p style={{ color: '#e05858', fontSize: 12, margin: 0 }}>{errorMsg}</p>}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  style={{ background: 'var(--y)', color: '#0a0a0a', border: 'none', padding: '12px 20px', fontWeight: 700, fontSize: 13, cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer', opacity: formStatus === 'loading' ? 0.7 : 1, fontFamily: 'inherit', transition: 'opacity .2s' }}
                >
                  {formStatus === 'loading' ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
        <button
          onClick={prev}
          disabled={idx === 0}
          className="testi-arrow"
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              onClick={() => setIdx(i)}
              className={`t-dot${idx === i ? ' active' : ''}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={idx >= count - 1}
          className="testi-arrow"
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}
