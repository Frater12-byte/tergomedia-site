'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

const BEFORE = [
  { label: 'Lead response', val: '4+ hours' },
  { label: 'Admin hrs/week', val: '38 hrs' },
  { label: 'Auto-handled', val: '0%' },
  { label: 'CRM accuracy', val: '~60%' },
  { label: 'Revenue recov.', val: 'AED 0' },
  { label: 'Reporting', val: '6+ hrs' },
];
const AFTER = [
  { label: 'Lead response', val: '90 sec', cls: 'great' },
  { label: 'Admin hrs/week', val: '4 hrs', cls: 'great' },
  { label: 'Auto-handled', val: '94%', cls: 'good' },
  { label: 'CRM accuracy', val: '100%', cls: 'good' },
  { label: 'Revenue recov.', val: 'AED 18K', cls: 'great' },
  { label: 'Reporting', val: 'Auto', cls: 'good' },
];

export default function BeforeAfterSlider() {
  const [pct, setPct] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const p = Math.max(10, Math.min(90, ((clientX - left) / width) * 100));
    setPct(p);
  }, []);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    const mm = (e: MouseEvent) => { if (dragging.current) move(e.clientX); };
    const tm = (e: TouchEvent) => { if (dragging.current) move(e.touches[0].clientX); };
    window.addEventListener('mouseup', up);
    window.addEventListener('mousemove', mm);
    window.addEventListener('touchend', up);
    window.addEventListener('touchmove', tm, { passive: true });
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('touchend', up);
      window.removeEventListener('touchmove', tm);
    };
  }, [move]);

  // Auto-sweep on mount
  useEffect(() => {
    let v = 50; let dir = -1;
    const iv = setInterval(() => {
      v += dir * 0.4;
      if (v < 20) dir = 1;
      if (v > 80) dir = -1;
      setPct(v);
    }, 16);
    const t = setTimeout(() => clearInterval(iv), 4000);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

  return (
    <div>
      <div className="ba-hint">← Drag to compare before & after →</div>
      <div
        ref={wrapRef}
        className="ba-wrap"
        onMouseDown={e => { dragging.current = true; move(e.clientX); }}
        onTouchStart={e => { dragging.current = true; move(e.touches[0].clientX); }}
      >
        <div className="ba-inner">
          <div className="ba-panel-before" style={{ flexBasis: `${pct}%` }}>
            <div className="ba-section-head bef">Before</div>
            {BEFORE.map(r => (
              <div key={r.label} className="ba-row">
                <span className="ba-metric">{r.label}</span>
                <span className="ba-val bad">{r.val}</span>
              </div>
            ))}
          </div>
          <div className="ba-panel-after">
            <div className="ba-section-head aft">After</div>
            {AFTER.map(r => (
              <div key={r.label} className="ba-row">
                <span className="ba-metric">{r.label}</span>
                <span className={`ba-val ${r.cls}`}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ba-divider" style={{ left: `${pct}%` }}>
          <div className="ba-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
