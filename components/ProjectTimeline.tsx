/* eslint-disable */
'use client';
import { useEffect, useRef, useState } from 'react';

const STEPS = [
  { label: 'Discovery call & audit', week: 'Week 1', isNow: false },
  { label: 'Scoping & fixed-price proposal', week: 'Week 1–2', isNow: false },
  { label: 'Build: lead capture + WhatsApp AI', week: 'Week 2–4', isNow: false },
  { label: 'Launch: CRM sync + reporting live', week: 'Week 5 — live now', isNow: true },
  { label: '30-day support & optimisation', week: 'Week 6–9', isNow: false },
];

export default function ProjectTimeline() {
  const [current, setCurrent] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let idx = 0;
        setCurrent(0);
        const iv = setInterval(() => {
          idx++;
          if (idx >= STEPS.length) { clearInterval(iv); return; }
          setCurrent(idx);
        }, 2000);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.18)', marginBottom: 12 }}>PROJECT TIMELINE</div>
      <div className="tl">
        {STEPS.map((s, i) => {
          const isDone = i < current;
          const isActive = i === current;
          const cls = isDone ? 'tl-item tl-green' : isActive ? 'tl-item tl-yellow' : 'tl-item';
          return (
            <div key={i} className={cls}>
              <div className="tl-label">{s.label}</div>
              <div className="tl-week">{s.week}</div>
              {s.isNow && isActive && (
                <div style={{ fontSize: 11, color: 'var(--ng)', marginTop: 4, fontWeight: 600 }}>
                  ✓ System is live
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
