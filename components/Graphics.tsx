// To add real images, replace <ImgPh> with <img> or Next.js <Image>:
// 1. Put your photos in /public/images/ named: img-01.jpg, img-02.jpg etc.
// 2. In any page.tsx, change:
//    <ImgPh label="IMG-04" desc="..." h={280} />
//    to:
//    <ImgPh label="IMG-04" desc="Francesco" h={280} src="/images/img-04.jpg" />
// The ImgPh component already handles the src prop — it will show your image automatically.

'use client';
import { useEffect, useRef, useState } from 'react';

/* ─── FLOW GRAPHIC ─── */
type StepState = 'waiting' | 'running' | 'done';

interface FlowNode { text: string; status: string; }
interface FlowProps {
  nodes: FlowNode[];
  color?: string;
  title?: string;
  resultLabel?: string;
  resultText?: string;
}

// Timing spec (ms): [start, duration] per step
const STEP_TIMING = [
  [0, 400],
  [400, 1200],
  [1600, 600],
  [2200, 500],
  [2700, 400],
];
const TOTAL_MS   = 3100;
const RESULT_MS  = 3100;
const LOOP_PAUSE = 2000;

export function FlowGraphic({ nodes, color = '', title = 'Live automation flow', resultLabel = 'Result', resultText = '' }: FlowProps) {
  const [stepStates, setStepStates] = useState<StepState[]>(() => nodes.map(() => 'waiting' as StepState));
  const [showResult, setShowResult] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  const run = (loop: number) => {
    clearAll();
    setStepStates(nodes.map(() => 'waiting'));
    setShowResult(false);

    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setStepStates(nodes.map(() => 'done'));
      setShowResult(true);
      setShowReplay(true);
      return;
    }

    nodes.forEach((_, i) => {
      const [start, dur] = STEP_TIMING[i] ?? [i * 600, 500];
      timersRef.current.push(setTimeout(() => {
        setStepStates(prev => prev.map((s, j) => j === i ? 'running' : s));
      }, start));
      timersRef.current.push(setTimeout(() => {
        setStepStates(prev => prev.map((s, j) => j === i ? 'done' : s));
      }, start + dur));
    });

    timersRef.current.push(setTimeout(() => setShowResult(true), RESULT_MS));
    timersRef.current.push(setTimeout(() => setShowReplay(true), RESULT_MS));
    timersRef.current.push(setTimeout(() => {
      setLoopCount(l => l + 1);
    }, TOTAL_MS + LOOP_PAUSE));
  };

  useEffect(() => { run(loopCount); return clearAll; }, [loopCount, nodes.length]);

  const Y_COLOR = '#F2C200';
  const GREEN   = '#4ade80';

  return (
    <div className="ig" style={{ position: 'relative' }}>
      <style>{`
        @keyframes _fgPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(1.25)} }
        @keyframes _fgCheck { from{stroke-dashoffset:20} to{stroke-dashoffset:0} }
        @media (prefers-reduced-motion: reduce) { ._fgRunCircle,._fgCheck { animation: none !important; } }
      `}</style>

      {/* Replay button */}
      {showReplay && (
        <button
          onClick={() => { setShowReplay(false); setLoopCount(l => l + 1); }}
          style={{ position: 'absolute', top: 0, right: 0, background: 'none', border: 'none', color: Y_COLOR, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Exo, sans-serif', letterSpacing: 0.5, padding: '2px 0' }}
          onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
        >↺ Replay</button>
      )}

      {/* Vertical timeline */}
      <div style={{ position: 'relative' }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute', left: 10, top: 10, bottom: 10,
          width: 1, background: 'rgba(255,255,255,0.08)', zIndex: 0,
        }} />

        {nodes.map((n, i) => {
          const state = stepStates[i];
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 48, position: 'relative', zIndex: 1, marginBottom: i < nodes.length - 1 ? 2 : 0 }}>
              {/* Circle indicator */}
              <div style={{ flexShrink: 0, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {state === 'waiting' && (
                  <div style={{ width: 12, height: 12, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)', background: 'transparent' }} />
                )}
                {state === 'running' && (
                  <div className="_fgRunCircle" style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: Y_COLOR,
                    animation: '_fgPulse 1s ease-in-out infinite',
                    boxShadow: `0 0 8px ${Y_COLOR}88`,
                  }} />
                )}
                {state === 'done' && (
                  <svg width="20" height="20" viewBox="0 0 20 20" style={{ display: 'block' }}>
                    <circle cx="10" cy="10" r="9" fill={Y_COLOR} />
                    <polyline
                      points="6,10 9,13 14,7"
                      fill="none" stroke="#000" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="_fgCheck"
                      style={{ strokeDasharray: 20, strokeDashoffset: 0, animation: '_fgCheck 0.25s ease forwards' }}
                    />
                  </svg>
                )}
              </div>

              {/* Label */}
              <span style={{
                flex: 1, fontSize: 13, fontFamily: 'Exo, sans-serif',
                color: state === 'waiting' ? 'rgba(255,255,255,0.28)' : '#fff',
                fontWeight: state === 'waiting' ? 300 : 500,
                transition: 'color .25s',
              }}>{n.text}</span>

              {/* Status badge */}
              {state === 'running' && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, fontWeight: 700, color: Y_COLOR, fontFamily: 'Exo, sans-serif', letterSpacing: 1 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: Y_COLOR, animation: '_fgPulse 0.8s ease-in-out infinite', display: 'inline-block' }} />
                  Running
                </span>
              )}
              {state === 'done' && (
                <span style={{ fontSize: 9, fontWeight: 700, color: GREEN, fontFamily: 'Exo, sans-serif', letterSpacing: 1 }}>Done</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Result row */}
      {resultText && (
        <div style={{
          marginTop: 12, padding: '10px 12px',
          border: '1px solid rgba(242,194,0,.2)', background: 'rgba(242,194,0,.05)',
          opacity: showResult ? 1 : 0, transition: 'opacity .4s',
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: Y_COLOR, marginBottom: 3 }}>{resultLabel}</div>
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{resultText.split('—')[0].trim()}</div>
          {resultText.includes('—') && (
            <div style={{ fontSize: 11, color: '#555', fontStyle: 'italic', marginTop: 2 }}>{resultText.split('—')[1].trim()}</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── STEPPER ─── */
interface StepperStep { title: string; desc: string; time: string; }
export function Stepper({ steps, color = 'y' }: { steps: StepperStep[]; color?: string }) {
  const [cur, setCur] = useState(0);
  return (
    <div className="ig">
      <div className="ig-title">How we work — click to explore</div>
      <div className="stp-tabs">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`stp-tab${i === cur ? ` on ${color}` : ''}`}
            onClick={() => setCur(i)}
          >
            <div className="stp-num" style={{ color: i === cur ? `var(--${color})` : '' }}>0{i + 1}</div>
            <div className="stp-lbl">{s.title}</div>
          </div>
        ))}
      </div>
      <div className="stp-body">
        <h4>{steps[cur].title}</h4>
        <p>{steps[cur].desc}</p>
        <div className="stp-time">{steps[cur].time}</div>
      </div>
      <div className="stp-nav">
        <button className="stp-btn" onClick={() => setCur(c => Math.max(0, c - 1))}>← Back</button>
        <button
          className={`stp-btn pri ${color}`}
          onClick={() => cur < steps.length - 1 ? setCur(c => c + 1) : undefined}
        >
          {cur < steps.length - 1 ? 'Next →' : 'Book a call →'}
        </button>
      </div>
    </div>
  );
}

/* ─── BEFORE / AFTER ─── */
export function BeforeAfter({
  bads, goods,
  badLabel = 'Without automation',
  goodLabel = 'With Tergo',
}: { bads: string[]; goods: string[]; badLabel?: string; goodLabel?: string }) {
  const [mode, setMode] = useState<'bad' | 'good'>('bad');
  return (
    <div className="ig">
      <div className="ba-tabs">
        <div className={`ba-tab${mode === 'bad' ? ' br' : ''}`} onClick={() => setMode('bad')}>✕ {badLabel}</div>
        <div className={`ba-tab${mode === 'good' ? ' bg' : ''}`} onClick={() => setMode('good')}>+ {goodLabel}</div>
      </div>
      {mode === 'bad' ? bads.map((t, i) => (
        <div key={i} className="ba-row"><span className="ba-icon r">—</span>{t}</div>
      )) : goods.map((t, i) => (
        <div key={i} className="ba-row good"><span className="ba-icon c">+</span>{t}</div>
      ))}
    </div>
  );
}

/* ─── CALCULATOR ─── */
export function Calculator({
  labelA, labelB, prefixB = 'AED ',
  sl1Label, sl1Min, sl1Max, sl1Val,
  sl2Label, sl2Min, sl2Max, sl2Val,
  formulaA, formulaB,
}: {
  labelA: string; labelB: string; prefixB?: string;
  sl1Label: string; sl1Min: number; sl1Max: number; sl1Val: number;
  sl2Label: string; sl2Min: number; sl2Max: number; sl2Val: number;
  formulaA: (s1: number, s2: number) => number;
  formulaB: (s1: number, s2: number) => number;
}) {
  const [s1, setS1] = useState(sl1Val);
  const [s2, setS2] = useState(sl2Val);
  const a = Math.round(formulaA(s1, s2));
  const b = Math.round(formulaB(s1, s2));
  const pct = Math.min(96, Math.round((s1 / sl1Max) * 100));
  return (
    <div className="ig">
      <div className="ig-title">Impact calculator — drag to estimate</div>
      <div className="calc-grid">
        <div className="calc-block">
          <div className="calc-lbl">{labelA}</div>
          <div className="calc-val y">{a.toLocaleString()}</div>
          <div className="calc-bar"><div className="calc-fill" style={{ width: `${pct}%` }} /></div>
        </div>
        <div className="calc-block">
          <div className="calc-lbl">{labelB}</div>
          <div className="calc-val c">{prefixB}{b.toLocaleString()}</div>
          <div className="calc-bar"><div className="calc-fill c" style={{ width: `${pct}%` }} /></div>
        </div>
      </div>
      <div className="sl-row">
        <span className="sl-lbl">{sl1Label}</span>
        <input type="range" min={sl1Min} max={sl1Max} value={s1} step={1} onChange={e => setS1(+e.target.value)} />
        <span className="sl-val">{s1}</span>
      </div>
      <div className="sl-row">
        <span className="sl-lbl">{sl2Label}</span>
        <input type="range" min={sl2Min} max={sl2Max} value={s2} step={1} onChange={e => setS2(+e.target.value)} />
        <span className="sl-val">{s2}</span>
      </div>
    </div>
  );
}

/* ─── IMAGE PLACEHOLDER ─── */
export function ImgPh({ label, desc, h = 200, src }: { label: string; desc: string; h?: number; src?: string }) {
  const [broken, setBroken] = useState(false);
  if (src && !broken) return (
    <div style={{ width: '100%', overflow: 'hidden', backgroundColor: '#111' }}>
      <img
        src={src}
        alt={label}
        onError={() => setBroken(true)}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          maxHeight: `${h * 2}px`,
          objectFit: 'contain',
          objectPosition: 'center top',
        }}
      />
    </div>
  );
  return (
    <div className="img-ph" style={{ minHeight: h }}>
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <div className="img-ph-label">{label}</div>
      <div className="img-ph-desc">{desc}</div>
    </div>
  );
}

/* ─── CTA BAR ─── */
export function CtaBar({ h, sub }: { h: string; sub: string }) {
  return (
    <div className="cta-bar">
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: h }} />
        <p>{sub}</p>
      </div>
      <div className="cta-bar-right">
        <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer">Book a slot →</a>
        <a href="mailto:hello@tergomedia.com">→ hello@tergomedia.com</a>
        <small>Dubai · Bucharest · Milan · Response within 24h</small>
      </div>
    </div>
  );
}

/* ─── TICKER ─── */
export function Ticker({ items }: { items: { text: string; color?: string }[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span style={item.color ? { color: `var(--${item.color})` } : {}}>{item.text}</span>
            <span className="td" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SCROLL REVEAL ─── */
export function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── SHARED STEPS ─── */
export const PROCESS_STEPS: StepperStep[] = [
  { title: 'Automation audit', desc: 'We map your current workflows, find where time is lost, and quantify the impact. Free for qualified leads — no commitment required.', time: '1–2 days' },
  { title: 'Design & scoping', desc: 'We design the full automation architecture and deliver a fixed-price proposal. No hourly billing, no surprises.', time: '3–5 days' },
  { title: 'Build & test', desc: 'We build and test in staging before touching live data. Full QA. Rollback plan. Nothing ships broken.', time: '1–4 weeks' },
  { title: 'Launch & handover', desc: 'We go live, train your team, and stay on for 30 days to ensure everything runs cleanly. Ongoing support available.', time: '30-day support' },
];
