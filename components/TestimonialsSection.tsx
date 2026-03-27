'use client';
import { useState, useRef } from 'react';

const TESTIMONIALS = [
  { quote: "Tergo built our entire lead automation system in 3 weeks. Response times went from 4 hours to under 2 minutes. Our agents now handle 40% more enquiries with the same headcount.", name: 'Ahmed Al-Rashidi', role: 'CEO, Bayut Premium', initials: 'AA' },
  { quote: "The IoT alert system they built for our greenhouses has saved us from three critical failures in six months. Real-time notifications to the right people, every time.", name: 'Ion Popescu', role: 'Operations Director, Agri Novatex', initials: 'IP' },
  { quote: "Francesco architected our entire tech stack as fractional CTO. He thinks like a founder, not a consultant. We shipped our MVP 6 weeks ahead of schedule.", name: 'Priya Sharma', role: 'Founder, PropTech Startup', initials: 'PS' },
  { quote: "Our Monday morning KPI reports used to take the team 6 hours. Now they arrive automatically at 7am with zero manual work. Absolute game changer.", name: 'Marco Bianchi', role: 'COO, Hospitality Group', initials: 'MB' },
  { quote: "The client onboarding automation they built turned a 2-day manual process into a 15-minute automated flow. Our clients love the experience and our team loves the time back.", name: 'Sarah Mitchell', role: 'Managing Partner, Advisory Firm', initials: 'SM' },
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const count = TESTIMONIALS.length;
  const visible = 3;

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
            {TESTIMONIALS.map((t, i) => (
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
            ))}
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
