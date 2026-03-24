'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

/* ── Design tokens ─────────────────────────────────────────────────────────── */
const Y     = '#F2C200';
const GREEN = '#4ade80';
const BLUE  = '#60a5fa';

/* ── Data ──────────────────────────────────────────────────────────────────── */
const SECTORS = [
  'Real Estate',
  'Travel & Hospitality',
  'Agriculture',
  'Media & Publishing',
  'Professional Services',
  'E-commerce & Retail',
  'Other',
];

const SECTOR_RATES = {
  'Real Estate':           26,
  'Travel & Hospitality':  24,
  'Agriculture':           20,
  'Media & Publishing':    28,
  'Professional Services': 30,
  'E-commerce & Retail':   22,
  'Other':                 24,
};

const SECTOR_ADMIN_HOURS = {
  'Real Estate':           6,
  'Travel & Hospitality':  5,
  'Agriculture':           4,
  'Media & Publishing':    6,
  'Professional Services': 8,
  'E-commerce & Retail':   5,
  'Other':                 5,
};

const RESPONSE_TIMES = ['Under 1 hour', '1–4 hours', '4–24 hours', 'Over 24 hours'];

const RESPONSE_UPLIFT = {
  'Under 1 hour': 0.04,
  '1–4 hours':    0.09,
  '4–24 hours':   0.18,
  'Over 24 hours':0.28,
};

// 12-month ramp: months 1-2 at 25%, 3-4 at 60%, 5-12 at 100%
const RAMP = [0.25, 0.25, 0.60, 0.60, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

/* ── Calculation ───────────────────────────────────────────────────────────── */
function calcROI(sector, revenue, teamSize, manualPct, leads, responseTime) {
  const hourlyRate          = SECTOR_RATES[sector] ?? 24;
  const adminHoursPerPerson = SECTOR_ADMIN_HOURS[sector] ?? 5;
  const hoursPerPersonPerMonth = adminHoursPerPerson * 4.33;

  const hoursRecoveredPerMonth = Math.min(
    teamSize * hoursPerPersonPerMonth * (manualPct / 100) * 0.45,
    teamSize * 32
  );
  const monthly = Math.min(hoursRecoveredPerMonth * hourlyRate, 35000);

  const leadVolumeMultiplier = Math.min(1 + (leads - 150) / 1000, 1.6);
  const uplift            = RESPONSE_UPLIFT[responseTime] ?? 0.18;
  const attributionFactor = revenue < 100000 ? 0.25 : 0.32;
  const monthlyUplift     = Math.min(
    revenue * uplift * attributionFactor * leadVolumeMultiplier,
    revenue * 0.20
  );
  const annualRevenue     = Math.min(monthlyUplift * 12 * 0.70, 180000);

  const monthlyBreakdown = RAMP.map(r => monthly * r);
  const cumulative       = monthlyBreakdown.map((_, i) => monthlyBreakdown.slice(0, i + 1).reduce((s, v) => s + v, 0));
  const annualSavings    = cumulative[11];
  const hoursPerYear     = Math.round(hoursRecoveredPerMonth * 12);
  const leadPaybackBonus = Math.max(0.85, 1 - (leads - 150) / 3000);
  const paybackMonths    = monthly > 0 ? (9500 / monthly) * leadPaybackBonus : null;

  return { monthly, cumulative, monthlyBreakdown, annualSavings, hoursPerYear, annualRevenue, paybackMonths };
}

/* ── useCountUp hook ───────────────────────────────────────────────────────── */
function useCountUp(target, duration = 420, precision = 0) {
  const [val, setVal] = useState(target);
  const rafRef   = useRef(null);
  const fromRef  = useRef(target);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVal(target); return; }

    cancelAnimationFrame(rafRef.current);
    const from   = fromRef.current;
    const startT = performance.now();

    function tick(now) {
      const elapsed  = now - startT;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const cur      = from + (target - from) * eased;
      setVal(parseFloat(cur.toFixed(precision)));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, precision]);

  return val;
}

/* ── KpiCard ───────────────────────────────────────────────────────────────── */
function KpiCard({ tag, rawValue, fmt, sub, accent, precision = 0 }) {
  const animated = useCountUp(rawValue, 420, precision);

  return (
    <div style={{ background: '#141414', padding: 'clamp(16px,2.5vw,26px)', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#888' }}>{tag}</div>
      <div style={{ fontSize: 'clamp(20px,2.8vw,30px)', fontWeight: 900, fontFamily: "'Exo',sans-serif", color: accent, lineHeight: 1.1 }}>
        {fmt(animated)}
      </div>
      {sub && <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5, fontWeight: 300 }}>{sub}</div>}
    </div>
  );
}

/* ── SliderInput ───────────────────────────────────────────────────────────── */
function SliderInput({ label, helper, min, max, step, value, onChange, fmt }) {
  const pct = ((value - min) / (max - min) * 100).toFixed(1) + '%';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#ccc', letterSpacing: 0.3 }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 900, color: Y, fontFamily: "'Exo',sans-serif" }}>{fmt(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="roi-slider"
        style={{ '--sp': pct }}
      />
      {helper && <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5 }}>{helper}</div>}
    </div>
  );
}

/* ── PillGroup ─────────────────────────────────────────────────────────────── */
function PillGroup({ label, options, value, onChange, small }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <span style={{ fontSize: 12, fontWeight: 700, color: '#ccc', letterSpacing: 0.3 }}>{label}</span>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map(opt => {
          const active = opt === value;
          return (
            <button key={opt} onClick={() => onChange(opt)} style={{
              padding: small ? '5px 10px' : '7px 14px',
              borderRadius: 4,
              border: `1px solid ${active ? Y : 'rgba(255,255,255,0.1)'}`,
              background: active ? 'rgba(242,194,0,0.12)' : 'transparent',
              color: active ? Y : '#888',
              fontSize: small ? 11 : 12,
              fontWeight: active ? 700 : 400,
              fontFamily: "'Exo',sans-serif",
              cursor: 'pointer',
              transition: 'all .15s',
              letterSpacing: 0.2,
            }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Illustration ──────────────────────────────────────────────────────────── */
function Illustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 200, height: 'auto', opacity: 0.82, flexShrink: 0 }}>
      {/* Desk */}
      <rect x="20" y="108" width="160" height="6" rx="3" fill={Y} opacity="0.25" />
      <rect x="30" y="114" width="8" height="26" rx="2" fill={Y} opacity="0.15" />
      <rect x="162" y="114" width="8" height="26" rx="2" fill={Y} opacity="0.15" />
      {/* Monitor */}
      <rect x="72" y="72" width="56" height="37" rx="3" stroke={Y} strokeWidth="1.5" fill="rgba(242,194,0,0.04)" />
      <rect x="95" y="109" width="10" height="5" rx="1" fill={Y} opacity="0.18" />
      <rect x="87" y="114" width="26" height="2" rx="1" fill={Y} opacity="0.13" />
      {/* Screen lines */}
      <line x1="80" y1="83" x2="120" y2="83" stroke={Y} strokeWidth="1" opacity="0.28" />
      <line x1="80" y1="89" x2="112" y2="89" stroke={Y} strokeWidth="1" opacity="0.18" />
      <line x1="80" y1="95" x2="116" y2="95" stroke={Y} strokeWidth="1" opacity="0.18" />
      {/* Person left */}
      <circle cx="40" cy="78" r="7" stroke="white" strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M30 108 Q40 94 50 108" stroke="white" strokeWidth="1.2" fill="none" opacity="0.45" />
      <line x1="40" y1="85" x2="40" y2="100" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <line x1="40" y1="90" x2="32" y2="97" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <line x1="40" y1="90" x2="48" y2="97" stroke="white" strokeWidth="1.2" opacity="0.45" />
      {/* Person right */}
      <circle cx="160" cy="78" r="7" stroke="white" strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M150 108 Q160 94 170 108" stroke="white" strokeWidth="1.2" fill="none" opacity="0.45" />
      <line x1="160" y1="85" x2="160" y2="100" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <line x1="160" y1="90" x2="152" y2="97" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <line x1="160" y1="90" x2="168" y2="97" stroke="white" strokeWidth="1.2" opacity="0.45" />
      {/* Gear icon */}
      <g opacity="0.55">
        <circle cx="24" cy="40" r="6" stroke={Y} strokeWidth="1.2" fill="none" />
        <circle cx="24" cy="40" r="2.5" stroke={Y} strokeWidth="1" fill="none" />
        {[0, 60, 120, 180, 240, 300].map(a => (
          <line key={a}
            x1={24 + 6.8 * Math.cos(a * Math.PI / 180)}
            y1={40 + 6.8 * Math.sin(a * Math.PI / 180)}
            x2={24 + 8.6 * Math.cos(a * Math.PI / 180)}
            y2={40 + 8.6 * Math.sin(a * Math.PI / 180)}
            stroke={Y} strokeWidth="2" strokeLinecap="round" />
        ))}
      </g>
      {/* Lightning bolt */}
      <path d="M176 26 L170 40 L174 40 L168 54 L180 36 L175 36 Z"
        stroke={Y} strokeWidth="1.2" fill="rgba(242,194,0,0.1)" opacity="0.65" />
      {/* Envelope */}
      <rect x="144" y="16" width="20" height="14" rx="2" stroke="white" strokeWidth="1.2" fill="none" opacity="0.4" />
      <polyline points="144,16 154,24 164,16" stroke="white" strokeWidth="1.2" fill="none" opacity="0.4" />
      {/* Checkmark circle */}
      <circle cx="50" cy="26" r="7" stroke={GREEN} strokeWidth="1.2" fill="none" opacity="0.6" />
      <polyline points="46,26 49,29 55,22" stroke={GREEN} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Automation arc */}
      <path d="M80 50 Q100 38 120 50" stroke={Y} strokeWidth="1.2" fill="none" opacity="0.3" strokeDasharray="3 2" />
      <polygon points="120,50 115,46 115,54" fill={Y} opacity="0.3" />
    </svg>
  );
}

/* ── ROIChart ──────────────────────────────────────────────────────────────── */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const SECTOR_VARIANCE = {
  'Real Estate':           [0, .03, -.02, .04, -.01, .03, .02, -.02, .04, -.01, .02, .01],
  'Travel & Hospitality':  [0, .05, -.04, .06, .02, -.03, .07, -.02, .04, -.05, .06, .02],
  'Agriculture':           [0, .02, .04, -.03, .06, -.02, .03, .05, -.04, .02, -.01, .03],
  'Professional Services': [0, .03, -.01, .02, .04, -.02, .01, .03, -.01, .04, .02, -.01],
  'Media & Publishing':    [0, .04, -.03, .05, -.02, .04, -.01, .06, -.03, .02, .05, -.02],
  'E-commerce & Retail':   [0, .06, -.04, .03, .05, -.03, .04, -.02, .06, -.04, .03, .05],
  'Other':                 [0, .03, -.02, .03, -.01, .02, .03, -.02, .03, -.01, .02, .01],
};

function fmtAxisVal(v) {
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`;
  return `$${Math.round(v)}`;
}

function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1], curr = points[i];
    const tension = 0.4;
    const cpx1 = prev.x + (curr.x - prev.x) * tension;
    const cpy1 = prev.y;
    const cpx2 = curr.x - (curr.x - prev.x) * tension;
    const cpy2 = curr.y;
    d += ` C ${cpx1} ${cpy1} ${cpx2} ${cpy2} ${curr.x} ${curr.y}`;
  }
  return d;
}

function ROIChart({ monthlyBreakdown, sector }) {
  const W = 700, H = 240, PL = 54, PR = 54, PT = 28, PB = 36;
  const chartW = W - PL - PR;
  const chartH = H - PT - PB;
  const [hovered, setHovered] = useState(null);
  const lineRef   = useRef(null);
  const annotRef  = useRef(null);

  // Bars: ramp values with small sector variance for natural look (can vary slightly)
  const variance = SECTOR_VARIANCE[sector] || SECTOR_VARIANCE['Other'];
  const chartMonthlyValues = monthlyBreakdown.map((v, i) => Math.max(v * (1 + variance[i]), 0));
  // Cumulative line: ALWAYS built from clean monthlyBreakdown — never from varied bar values.
  // This guarantees the line is always monotonically increasing regardless of variance sign.
  const chartCumulative = monthlyBreakdown.reduce((acc, v, i) => {
    acc.push((acc[i - 1] || 0) + v);
    return acc;
  }, []);

  const maxBar = Math.max(...chartMonthlyValues, 1);
  const maxCum = Math.max(...chartCumulative, 1);

  const gap  = chartW / 12;
  const barW = Math.floor(gap * 0.52);

  function xFor(i)    { return PL + gap * i + gap * 0.24; }
  function yForBar(v) { return PT + chartH - (v / maxBar) * chartH; }
  function yForCum(v) { return PT + chartH - (v / maxCum) * chartH; }

  const pts = chartCumulative.map((v, i) => ({ x: xFor(i) + barW / 2, y: yForCum(v) }));
  const linePath = smoothPath(pts);

  // Y-axis ticks: 0, 33%, 66%, 100%
  const barTicks = [0, 0.33, 0.66, 1].map(t => maxBar * t);
  const cumTicks = [0, 0.33, 0.66, 1].map(t => maxCum * t);

  // Milestone labels: Jan(0), Apr(3), Jul(6), Oct(9), Dec(11)
  const milestoneIdx = [0, 3, 6, 9, 11];

  // Line + annotation animation on mount (key forces remount on every calc change)
  useEffect(() => {
    const reduced = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lineEl = lineRef.current;
    if (lineEl) {
      if (reduced) {
        lineEl.style.strokeDasharray = 'none';
        lineEl.style.strokeDashoffset = '0';
      } else {
        const len = lineEl.getTotalLength();
        lineEl.style.strokeDasharray = String(len);
        lineEl.style.strokeDashoffset = String(len);
        lineEl.style.transition = 'none';
        const raf = requestAnimationFrame(() => {
          lineEl.style.transition = 'stroke-dashoffset 700ms ease-out';
          lineEl.style.strokeDashoffset = '0';
        });
        return () => cancelAnimationFrame(raf);
      }
    }
  }, []); // runs once per mount; key={chartKey} at call site guarantees remount per change

  useEffect(() => {
    const reduced = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const annotEl = annotRef.current;
    if (!annotEl) return;
    if (reduced) { annotEl.style.opacity = '1'; return; }
    annotEl.style.opacity = '0';
    const t = setTimeout(() => {
      annotEl.style.transition = 'opacity 300ms ease-out';
      annotEl.style.opacity = '1';
    }, 700);
    return () => clearTimeout(t);
  }, []);

  // Last data point for annotation
  const lastPt = pts[pts.length - 1];
  const lastCum = chartCumulative[chartCumulative.length - 1];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <style>{`
        @keyframes barGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .roi-bar { animation: none !important; }
        }
      `}</style>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>

        {/* Grid lines + left Y-axis (bar scale) */}
        {barTicks.map((v, i) => {
          const y = yForBar(v);
          return (
            <g key={i}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={PL - 6} y={y + 4} textAnchor="end" fill="#555" fontSize="9" fontFamily="'Exo',sans-serif">
                {fmtAxisVal(v)}
              </text>
            </g>
          );
        })}

        {/* Right Y-axis (cumulative scale) */}
        {cumTicks.map((v, i) => {
          const y = yForCum(v);
          return (
            <text key={i} x={W - PR + 6} y={y + 4} textAnchor="start" fill="#3a3a3a" fontSize="9" fontFamily="'Exo',sans-serif">
              {fmtAxisVal(v)}
            </text>
          );
        })}

        {/* Bars — CSS keyframe animation, scaleY from bottom */}
        {chartMonthlyValues.map((v, i) => {
          const barH = Math.max((v / maxBar) * chartH, 1);
          const x = xFor(i);
          const y = PT + chartH - barH;
          const isHov = hovered === i;
          const delay = `${i * 35}ms`;
          return (
            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <rect
                className="roi-bar"
                x={x} y={y} width={barW} height={barH} rx="2"
                fill={isHov ? Y : 'rgba(242,194,0,0.18)'}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'bottom',
                  animation: `barGrow 300ms ease-out both ${delay}`,
                  transition: 'fill .15s',
                }}
              />
              {/* invisible hit area */}
              <rect x={x - 4} y={PT} width={barW + 8} height={chartH} fill="transparent" />
            </g>
          );
        })}

        {/* Cumulative line — animated via ref in useEffect */}
        <path ref={lineRef} d={linePath} stroke={Y} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />

        {/* Milestone labels above line */}
        {milestoneIdx.map(i => (
          <text key={i}
            x={pts[i].x} y={pts[i].y - 8}
            textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="'Exo',sans-serif">
            {fmtAxisVal(chartCumulative[i])}
          </text>
        ))}

        {/* Line dots */}
        {pts.map(({ x, y }, i) => (
          <circle key={i} cx={x} cy={y}
            r={hovered === i ? 5 : 3}
            fill={hovered === i ? Y : '#141414'}
            stroke={Y} strokeWidth="1.5"
            style={{ transition: 'r .15s' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)} />
        ))}

        {/* Month labels */}
        {MONTHS.map((m, i) => (
          <text key={i} x={xFor(i) + barW / 2} y={H - 8}
            textAnchor="middle" fill={hovered === i ? 'rgba(255,255,255,0.6)' : '#444'}
            fontSize="9" fontFamily="'Exo',sans-serif">
            {m}
          </text>
        ))}

        {/* Final annotation pill — fades in via ref after line animation */}
        <g ref={annotRef} style={{ opacity: 0 }}>
          <rect
            x={lastPt.x - 38} y={lastPt.y - 26}
            width={76} height={18} rx="4"
            fill="rgba(0,0,0,0.7)" stroke="rgba(245,197,64,0.3)" strokeWidth="1"
          />
          <text x={lastPt.x} y={lastPt.y - 13}
            textAnchor="middle" fill={Y} fontSize="10" fontFamily="'Exo',sans-serif" fontWeight="700">
            {fmtAxisVal(lastCum)} total
          </text>
        </g>

        {/* Tooltip */}
        {hovered !== null && (() => {
          const { x: tx, y: ty } = pts[hovered];
          const tipW = 118, tipH = 52;
          const tipX = tx + tipW + 8 > W ? tx - tipW - 8 : tx + 8;
          const tipY = Math.max(ty - tipH / 2, PT);
          return (
            <g pointerEvents="none">
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="4"
                fill="#1c1c1c" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x={tipX + 10} y={tipY + 16} fill="#666" fontSize="9" fontFamily="'Exo',sans-serif"
                fontWeight="700" letterSpacing="1">CUMULATIVE M{hovered + 1}</text>
              <text x={tipX + 10} y={tipY + 36} fill={Y} fontSize="15" fontFamily="'Exo',sans-serif"
                fontWeight="900">
                ${Math.round(chartCumulative[hovered]).toLocaleString()}
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

/* ── Profile text builder ──────────────────────────────────────────────────── */
// Values interpolated below (teamSize, rev, manualPct, responseTime) come from
// controlled React state — numeric or from a fixed options array — not user-typed input.
// dangerouslySetInnerHTML is safe here.
const SP = (txt) => `<span style="color:#F5C540;font-weight:500">${txt}</span>`;
function buildProfile(sector, teamSize, revenue, manualPct, responseTime) {
  const rev = revenue >= 1000 ? `$${(revenue / 1000).toFixed(0)}K` : `$${revenue}`;
  const templates = {
    'Real Estate':
      `A ${SP(`${teamSize}-person`)} real estate operation generating around ${SP(`${rev}/month`)} — we know this profile well. The biggest time sink is usually lead follow-up and CRM hygiene. At ${SP(`${responseTime.toLowerCase()} response times`)}, you're likely losing warm leads to faster competitors. Our typical engagement for a brokerage your size starts with automating lead capture and WhatsApp follow-up, then moves into CRM sync and pipeline reporting. Most clients in this bracket see their ${SP('admin load drop within the first 30 days')}.`,
    'Travel & Hospitality':
      `A ${SP(`${teamSize}-person`)} travel operation at ${SP(`${rev}/month`)} — this is exactly the profile we've worked with most. Tour operators and travel agencies at this scale typically have three problems: ${SP('manual booking confirmations, disconnected supplier comms, and reporting that takes someone a full day each week')}. We've automated all three. The typical result is ${SP('30–40% of your team\'s admin time back')}, and a noticeably faster client experience.`,
    'Agriculture':
      `A ${SP(`${teamSize}-person`)} agri business at ${SP(`${rev}/month`)} — lean operations where every hour counts. At this scale, the manual overhead is usually in ${SP('inventory tracking, distributor communication, and reporting that still happens in spreadsheets')}. We've built IoT monitoring systems and distributor portals for businesses exactly like this. Automation here isn't about replacing people — it's about ${SP('giving your team visibility without the manual data collection')}.`,
    'Professional Services':
      `A ${SP(`${teamSize}-person`)} service firm at ${SP(`${rev}/month`)} — the profile where automation delivers fastest. Consultancies and service firms at this scale are usually drowning in ${SP('manual reporting, client onboarding paperwork, and status update emails')}. With ${SP(`${manualPct}% of your team's time going to admin`)}, you're carrying significant overhead that compounds as you grow. Our typical engagement ${SP('delivers the first automations within two weeks')}.`,
    'Media & Publishing':
      `A ${SP(`${teamSize}-person`)} media or content team at ${SP(`${rev}/month`)} — a sector where speed is everything and manual processes are invisible until they become bottlenecks. ${SP('Content distribution, asset management, and performance reporting')} are the usual culprits. We've helped teams your size ${SP('cut their weekly reporting overhead in half')} and automate the distribution workflows that used to require a dedicated coordinator.`,
    'E-commerce & Retail':
      `A ${SP(`${teamSize}-person`)} e-commerce operation at ${SP(`${rev}/month`)} — the scale where manual processes start visibly hurting conversion. ${SP('Order management, catalogue updates, and customer communication')} are the three areas where automation pays back fastest. At ${SP(`${responseTime.toLowerCase()} response times`)} on enquiries, you're also likely ${SP('leaving repeat purchase revenue on the table')}. Our typical engagement for an operation your size has a payback under three months.`,
    'Other':
      `A ${SP(`${teamSize}-person`)} team at ${SP(`${rev}/month`)} — whatever your sector, at this scale the pattern is almost always the same: ${SP('smart people doing work that should be automated')}. With ${SP(`${manualPct}% of time going to manual tasks`)}, the opportunity is real. We start every engagement with a ${SP('free workflow audit')} so we can show you exactly where the hours are going — and what it would take to get them back.`,
  };
  return templates[sector] ?? templates['Other'];
}

/* ── Main component ────────────────────────────────────────────────────────── */
export default function ROICalculator() {
  const [sector,       setSector]       = useState('Real Estate');
  const [revenue,      setRevenue]      = useState(45000);
  const [teamSize,     setTeamSize]     = useState(12);
  const [manualPct,    setManualPct]    = useState(40);
  const [leads,        setLeads]        = useState(150);
  const [responseTime, setResponseTime] = useState('4–24 hours');
  const [chartKey,     setChartKey]     = useState(0);
  const [profileText,  setProfileText]  = useState(
    () => buildProfile('Real Estate', 12, 45000, 40, '4–24 hours')
  );
  const debounceRef = useRef(null);

  const result = useMemo(
    () => calcROI(sector, revenue, teamSize, manualPct, leads, responseTime),
    [sector, revenue, teamSize, manualPct, leads, responseTime]
  );

  const updateProfile = useCallback((s, t, r, m, rt, immediate) => {
    if (immediate) {
      clearTimeout(debounceRef.current);
      setProfileText(buildProfile(s, t, r, m, rt));
    } else {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => setProfileText(buildProfile(s, t, r, m, rt)), 600);
    }
  }, []);

  function handleSector(v)      { setSector(v);      setChartKey(k => k + 1); updateProfile(v, teamSize, revenue, manualPct, responseTime, true); }
  function handleRevenue(v)     { setRevenue(v);     setChartKey(k => k + 1); updateProfile(sector, teamSize, v, manualPct, responseTime, false); }
  function handleTeam(v)        { setTeamSize(v);    setChartKey(k => k + 1); updateProfile(sector, v, revenue, manualPct, responseTime, false); }
  function handleManual(v)      { setManualPct(v);   setChartKey(k => k + 1); updateProfile(sector, teamSize, revenue, v, responseTime, false); }
  function handleLeads(v)       { setLeads(v);       setChartKey(k => k + 1); updateProfile(sector, teamSize, revenue, manualPct, responseTime, false); }
  function handleResponse(v)    { setResponseTime(v); setChartKey(k => k + 1); updateProfile(sector, teamSize, revenue, manualPct, v, false); }

  const fmtDollar  = v => `$${Math.round(v).toLocaleString()}`;
  const fmtDollarK = v => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${Math.round(v)}`;
  const fmtHours   = v => `${Math.round(v).toLocaleString()} hrs`;
  const fmtMonths  = v => {
    if (!v || v === null) return '—';
    const r = Math.round(v);
    if (r > 12) return '12+ mos';
    if (r < 1)  return '< 1 mo';
    return `${r} mo${r === 1 ? '' : 's'}`;
  };

  return (
    <div style={{ background: '#0d0d0d', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
      <style>{`
        .roi-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(to right,
            #F2C200 0%, #F2C200 var(--sp, 50%),
            rgba(255,255,255,0.1) var(--sp, 50%), rgba(255,255,255,0.1) 100%
          );
        }
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #F2C200;
          box-shadow: 0 0 8px rgba(242,194,0,0.55);
          cursor: pointer;
        }
        .roi-slider::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #F2C200;
          box-shadow: 0 0 8px rgba(242,194,0,0.55);
          border: none;
          cursor: pointer;
        }
        .roi-kpi-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
        }
        .roi-kpi-card { grid-column: span 2; }
        .roi-kpi-card:nth-child(4) { grid-column: span 3; }
        .roi-kpi-card:nth-child(5) { grid-column: span 3; }
        @media (max-width: 1024px) {
          .roi-kpi-grid { grid-template-columns: repeat(4, 1fr); }
          .roi-kpi-card { grid-column: span 2; }
          .roi-kpi-card:nth-child(4) { grid-column: span 2; }
          .roi-kpi-card:nth-child(5) { grid-column: span 4; }
        }
        @media (max-width: 768px) {
          .roi-kpi-grid { grid-template-columns: 1fr 1fr; }
          .roi-kpi-card { grid-column: span 1; }
          .roi-kpi-card:nth-child(4) { grid-column: span 1; }
          .roi-kpi-card:nth-child(5) { grid-column: span 2; }
          .roi-input-grid { grid-template-columns: 1fr !important; }
          .roi-bottom-row { flex-direction: column !important; }
          .roi-profile-col { border-right: none !important; border-bottom: 1px solid #222; }
        }
      `}</style>

      {/* Section header */}
      <div style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,72px) 0', maxWidth: 1100, margin: '0 auto' }}>
        <div className="sec" style={{ marginBottom: 16 }}>Free Estimate</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.5px', margin: 0, maxWidth: 520 }}>
            What could automation<br />save your team?
          </h2>
          <Illustration />
        </div>
      </div>

      {/* Inputs */}
      <div style={{ padding: '0 clamp(24px,5vw,72px)', maxWidth: 1100, margin: '0 auto 1px' }}>
        <div style={{ marginBottom: 32 }}>
          <PillGroup label="Your sector" options={SECTORS} value={sector} onChange={handleSector} />
        </div>
        <div className="roi-input-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,3vw,40px) clamp(32px,5vw,64px)', marginBottom: 40 }}>
          <SliderInput
            label="Monthly revenue"
            helper="Your organisation's total monthly revenue."
            min={8000} max={500000} step={1000}
            value={revenue} onChange={handleRevenue}
            fmt={v => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`}
          />
          <SliderInput
            label="Team size"
            helper="Number of full-time employees."
            min={3} max={80} step={1}
            value={teamSize} onChange={handleTeam}
            fmt={v => `${v} people`}
          />
          <SliderInput
            label="Manual work share"
            helper="Approximate % of the team's time spent on manual, repeatable tasks."
            min={10} max={80} step={5}
            value={manualPct} onChange={handleManual}
            fmt={v => `${v}%`}
          />
          <SliderInput
            label="Monthly inbound leads"
            helper="Enquiries, sign-ups, or new leads received per month."
            min={10} max={2000} step={10}
            value={leads} onChange={handleLeads}
            fmt={v => v.toLocaleString()}
          />
        </div>
        <div style={{ marginBottom: 48 }}>
          <PillGroup label="Current lead response time" options={RESPONSE_TIMES} value={responseTime} onChange={handleResponse} small />
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ borderTop: '1px solid #222' }}>
        <div className="roi-kpi-grid">
          <div className="roi-kpi-card">
            <KpiCard tag="Monthly savings" rawValue={result.monthly} fmt={fmtDollar} sub="At automation maturity" accent={Y} />
          </div>
          <div className="roi-kpi-card">
            <KpiCard tag="Annual impact" rawValue={result.annualSavings} fmt={fmtDollarK} sub="12-month cumulative" accent={Y} />
          </div>
          <div className="roi-kpi-card">
            <KpiCard tag="Hours recovered" rawValue={result.hoursPerYear} fmt={fmtHours} sub="Per year across the team" accent="white" />
          </div>
          <div className="roi-kpi-card">
            <KpiCard tag="Revenue growth potential" rawValue={result.annualRevenue} fmt={fmtDollarK} sub="From faster lead response" accent={GREEN} />
          </div>
          <div className="roi-kpi-card">
            <KpiCard tag="Estimated payback" rawValue={result.paybackMonths} fmt={fmtMonths} sub="Based on a typical engagement" accent={BLUE} />
          </div>
        </div>
      </div>

      {/* Profile + chart row */}
      <div className="roi-bottom-row" style={{ display: 'flex', borderTop: '1px solid #222' }}>
        <div className="roi-profile-col" style={{
          flex: '0 0 clamp(240px,30%,360px)',
          borderRight: '1px solid #222',
          padding: 'clamp(24px,3vw,40px)',
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>Your profile</div>
          <div style={{ borderLeft: `3px solid ${Y}`, paddingLeft: 16 }}>
            {/* Values in profileText are from controlled state — safe for dangerouslySetInnerHTML */}
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}
               dangerouslySetInnerHTML={{ __html: profileText }} />
          </div>
        </div>
        <div style={{ flex: 1, padding: 'clamp(24px,3vw,40px)', minWidth: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#888', marginBottom: 20 }}>
            12-month cumulative savings
          </div>
          <ROIChart key={chartKey} monthlyBreakdown={result.monthlyBreakdown} sector={sector} />
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: 'clamp(20px,2.5vw,32px) clamp(24px,5vw,72px)', borderTop: '1px solid #1a1a1a' }}>
        <p style={{ fontSize: 11, color: '#444', lineHeight: 1.7, fontWeight: 300, margin: '0 auto', maxWidth: 1100 }}>
          These figures are <span style={{ color: Y }}>best-case scenario estimates</span> based on industry-average automation yields and typical team structures. Actual results depend on workflow complexity, data quality, and implementation scope. We recommend a discovery call before drawing conclusions from this calculator.
        </p>
      </div>
    </div>
  );
}
