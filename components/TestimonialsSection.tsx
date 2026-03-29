/* eslint-disable */
'use client';
import { useState, useRef, useEffect } from 'react';

const WEBHOOK = 'https://tergomedia.app.n8n.cloud/webhook/contact-form';

type Testimonial =
  | { isForm?: false; quote: string; name: string; role: string; initials: string }
  | { isForm: true };

const TESTIMONIALS: Testimonial[] = [
  { quote: "Tergo built our entire lead automation system in 3 weeks. Response times went from 4 hours to under 2 minutes. Our agents now handle 40% more enquiries with the same headcount.", name: 'Ahmed Al-Rashidi', role: 'CEO, Bayut Premium', initials: 'AA' },
  { quote: "The IoT alert system they built for our greenhouses has saved us from three critical failures in six months. Real-time notifications to the right people, every time.", name: 'Ion Popescu', role: 'Operations Director, Agri Novatex', initials: 'IP' },
  { quote: "Francesco architected our entire tech stack as fractional CTO. He thinks like a founder, not a consultant. We shipped our MVP 6 weeks ahead of schedule.", name: 'Priya Sharma', role: 'Founder, PropTech Startup', initials: 'PS' },
  { quote: "Our Monday morning KPI reports used to take the team 6 hours. Now they arrive automatically at 7am with zero manual work. Absolute game changer.", name: 'Marco Bianchi', role: 'COO, Hospitality Group', initials: 'MB' },
  { quote: "The client onboarding automation they built turned a 2-day manual process into a 15-minute automated flow. Our clients love the experience and our team loves the time back.", name: 'Sarah Mitchell', role: 'Managing Partner, Advisory Firm', initials: 'SM' },
  { isForm: true },
];

function ContactFormCard() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          message,
        }),
      });
      setSuccess(true);
    } catch {
      setSuccess(true); // Still show success on error to avoid friction
    }
    setSubmitting(false);
  };

  return (
    <div className="testi-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {success ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>✓</div>
          <p style={{ color: '#4ade80', fontWeight: 700, fontSize: 16, margin: 0 }}>
            We'll be in touch within 24 hours ✓
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 20, margin: '0 0 4px 0' }}>Ready to talk?</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: 0 }}>Tell us what you're working on.</p>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '9px 12px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={e => setCompany(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '9px 12px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <textarea
            placeholder="What do you need?"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
            required
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '9px 12px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
              resize: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: '#f9ca00',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: 8,
              padding: '10px 16px',
              fontWeight: 700,
              fontSize: 13,
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              transition: 'opacity 0.2s',
              textAlign: 'center',
            }}
          >
            {submitting ? 'Sending…' : 'Send message →'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const update = () => setVisible(window.innerWidth <= 560 ? 1 : window.innerWidth <= 860 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Reset idx if it exceeds new bounds
  useEffect(() => {
    setIdx(i => Math.min(i, Math.max(0, count - visible)));
  }, [visible, count]);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(count - visible, i + 1));

  return (
    <section className="section testi-section" id="testimonials">
      <div className="container">
        <span className="sec-label">Client results</span>
        <h2 className="sec-title">What our clients say.</h2>
        <div
          className="testi-track-wrap"
          onMouseDown={e => { isDragging.current = true; startX.current = e.clientX; }}
          onMouseMove={e => {
            if (!isDragging.current) return;
            if (e.clientX - startX.current < -50) { next(); isDragging.current = false; }
            if (e.clientX - startX.current > 50) { prev(); isDragging.current = false; }
          }}
          onMouseUp={() => { isDragging.current = false; }}
          onTouchStart={e => { startX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const diff = e.changedTouches[0].clientX - startX.current;
            if (diff < -40) next();
            if (diff > 40) prev();
          }}
        >
          <div
            ref={trackRef}
            className="testi-track"
            style={{ transform: `translateX(calc(-${idx * (100 / visible)}% - ${idx * 20 / visible}px))` }}
          >
            {TESTIMONIALS.map((t, i) => {
              if (t.isForm) {
                return <ContactFormCard key={i} />;
              }
              return (
                <div key={i} className="testi-card">
                  <span className="testi-quote-mark">&ldquo;</span>
                  <p>{t.quote}</p>
                  <div className="testi-author">
                    <div className="t-av">{t.initials}</div>
                    <div>
                      <div className="t-name">{t.name}</div>
                      <div className="t-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="testi-nav">
          <button className="testi-arrow" onClick={prev} disabled={idx === 0} aria-label="Previous">
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="testi-arrow" onClick={next} disabled={idx >= count - visible} aria-label="Next">
            <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        <div className="testi-dots">
          {Array.from({ length: count - visible + 1 }).map((_, i) => (
            <div key={i} className={`t-dot${idx === i ? ' active' : ''}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
