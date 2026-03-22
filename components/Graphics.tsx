'use client';
import { useEffect, useRef, useState } from 'react';

/* ─── FLOW GRAPHIC ─── */
interface FlowNode { text: string; status: string; }
interface FlowProps {
  nodes: FlowNode[];
  color?: string;
  title?: string;
  resultLabel?: string;
  resultText?: string;
}
export function FlowGraphic({ nodes, color = '', title = 'Live automation flow', resultLabel = 'Result', resultText = '' }: FlowProps) {
  const [step, setStep] = useState(-1);
  const uid = useRef(`fg${Math.random().toString(36).slice(2,6)}`).current;

  useEffect(() => {
    let s = 0;
    const run = () => {
      setStep(s);
      s = (s + 1) % (nodes.length + 2);
      if (s > nodes.length) s = 0;
    };
    const id = setTimeout(function tick() {
      run();
      (window as any)[`_ft_${uid}`] = setTimeout(tick, s === 0 ? 1800 : 700);
    }, 800);
    return () => { clearTimeout(id); clearTimeout((window as any)[`_ft_${uid}`]); };
  }, [nodes.length, uid]);

  const cc = color ? ` ${color}` : '';
  return (
    <div className="ig">
      <div className="ig-title">{title}</div>
      {nodes.map((n, i) => (
        <div key={i}>
          <div className={`fn${i <= step ? cc + ' on' : ''}`}>
            <div className="fn-d" />
            <span className="fn-t">{n.text}</span>
            <span className="fn-s">{i < step ? 'Done' : i === step ? 'Running' : n.status}</span>
          </div>
          {i < nodes.length - 1 && <div className={`fconn${i < step ? cc + ' on' : ''}`} />}
        </div>
      ))}
      {resultText && (
        <div className={`fres${cc}`} style={{ opacity: step >= nodes.length - 1 ? 1 : 0, transition: 'opacity .5s' }}>
          <div className="fres-l">{resultLabel}</div>
          <div className="fres-t">{resultText}</div>
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
  if (src) return <img src={src} alt={label} style={{ width: '100%', height: h, objectFit: 'cover', display: 'block' }} />;
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
        <a href="https://calendly.com/tergo-media/30min" target="_blank" rel="noreferrer">→ Book on Calendly</a>
        <a href="mailto:hello@tergomedia.com">→ hello@tergomedia.com</a>
        <small>Dubai · Bucharest · Milano · Response within 24h</small>
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

/* ─── SHARED STEPS ─── */
export const PROCESS_STEPS: StepperStep[] = [
  { title: 'Automation audit', desc: 'We map your current workflows, find where time is lost, and quantify the impact. Free for qualified leads — no commitment required.', time: '1–2 days' },
  { title: 'Design & scoping', desc: 'We design the full automation architecture and deliver a fixed-price proposal. No hourly billing, no surprises.', time: '3–5 days' },
  { title: 'Build & test', desc: 'We build and test in staging before touching live data. Full QA. Rollback plan. Nothing ships broken.', time: '1–4 weeks' },
  { title: 'Launch & handover', desc: 'We go live, train your team, and stay on for 30 days to ensure everything runs cleanly. Ongoing support available.', time: '30-day support' },
];
