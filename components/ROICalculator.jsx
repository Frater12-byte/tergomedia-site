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

/* ── Unified calculation ─────────────────────────────────────────────────── */
function runFullCalculation({ sector, monthlyRevenue, teamSize, manualPct, monthlyLeads, responseTime }) {
  const hourlyRate    = SECTOR_RATES[sector] || 24;
  const hoursPerMonth = Math.min(
    teamSize * (SECTOR_ADMIN_HOURS[sector] || 5) * 4.33 * (manualPct / 100) * 0.45,
    teamSize * 32
  );
  const peakMonthlySavings = Math.min(Math.round(hoursPerMonth * hourlyRate), 35000);

  const leadVolumeMultiplier = Math.min(1 + (monthlyLeads - 150) / 1000, 1.6);
  const upliftPct          = RESPONSE_UPLIFT[responseTime] || 0.18;
  const attributionFactor  = monthlyRevenue < 100000 ? 0.25 : 0.32;
  const peakMonthlyRevenue = Math.min(
    Math.round(monthlyRevenue * upliftPct * attributionFactor * leadVolumeMultiplier),
    Math.round(monthlyRevenue * 0.20)
  );

  const RAMP_S = [0.25,0.25,0.60,0.60,1.0,1.0,1.0,1.05,1.05,1.10,1.10,1.15];
  const RAMP_R = [0,   0.25,0.60,0.60,1.0,1.0,1.0,1.05,1.05,1.10,1.10,1.15];

  const monthlySavingsArr = RAMP_S.map(r => Math.round(peakMonthlySavings * r));
  const monthlyRevenueArr = RAMP_R.map(r => Math.round(peakMonthlyRevenue * r));

  const cumSavings = [], cumRevenue = [];
  let runS = 0, runR = 0;
  for (let i = 0; i < 12; i++) {
    runS += monthlySavingsArr[i];
    runR += monthlyRevenueArr[i];
    cumSavings.push(runS);
    cumRevenue.push(runR);
  }

  const annualSavings  = cumSavings[11];
  const annualRevenue  = cumRevenue[11];
  const annualCombined = annualSavings + annualRevenue;
  const hoursPerYear   = Math.round(hoursPerMonth * 12);
  const paybackMonths  = peakMonthlySavings > 0
    ? Math.round((9500 / peakMonthlySavings) * 10) / 10
    : null;

  return { peakMonthlySavings, annualSavings, hoursPerYear, annualRevenue, annualCombined, paybackMonths, monthlySavingsArr, monthlyRevenueArr, cumSavings, cumRevenue };
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

/* ── getYTicks ─────────────────────────────────────────────────────────────── */
function getYTicks(maxValue) {
  if (maxValue <= 0) return [0, 1, 2, 3, 4];
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
  const step = Math.ceil((maxValue / 4) / magnitude) * magnitude;
  return [0, step, step * 2, step * 3, Math.ceil(maxValue / step) * step];
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
      <rect x="20" y="108" width="160" height="6" rx="3" fill={Y} opacity="0.25" />
      <rect x="30" y="114" width="8" height="26" rx="2" fill={Y} opacity="0.15" />
      <rect x="162" y="114" width="8" height="26" rx="2" fill={Y} opacity="0.15" />
      <rect x="72" y="72" width="56" height="37" rx="3" stroke={Y} strokeWidth="1.5" fill="rgba(242,194,0,0.04)" />
      <rect x="95" y="109" width="10" height="5" rx="1" fill={Y} opacity="0.18" />
      <rect x="87" y="114" width="26" height="2" rx="1" fill={Y} opacity="0.13" />
      <line x1="80" y1="83" x2="120" y2="83" stroke={Y} strokeWidth="1" opacity="0.28" />
      <line x1="80" y1="89" x2="112" y2="89" stroke={Y} strokeWidth="1" opacity="0.18" />
      <line x1="80" y1="95" x2="116" y2="95" stroke={Y} strokeWidth="1" opacity="0.18" />
      <circle cx="40" cy="78" r="7" stroke="white" strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M30 108 Q40 94 50 108" stroke="white" strokeWidth="1.2" fill="none" opacity="0.45" />
      <line x1="40" y1="85" x2="40" y2="100" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <line x1="40" y1="90" x2="32" y2="97" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <line x1="40" y1="90" x2="48" y2="97" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <circle cx="160" cy="78" r="7" stroke="white" strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M150 108 Q160 94 170 108" stroke="white" strokeWidth="1.2" fill="none" opacity="0.45" />
      <line x1="160" y1="85" x2="160" y2="100" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <line x1="160" y1="90" x2="152" y2="97" stroke="white" strokeWidth="1.2" opacity="0.45" />
      <line x1="160" y1="90" x2="168" y2="97" stroke="white" strokeWidth="1.2" opacity="0.45" />
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
      <path d="M176 26 L170 40 L174 40 L168 54 L180 36 L175 36 Z"
        stroke={Y} strokeWidth="1.2" fill="rgba(242,194,0,0.1)" opacity="0.65" />
      <rect x="144" y="16" width="20" height="14" rx="2" stroke="white" strokeWidth="1.2" fill="none" opacity="0.4" />
      <polyline points="144,16 154,24 164,16" stroke="white" strokeWidth="1.2" fill="none" opacity="0.4" />
      <circle cx="50" cy="26" r="7" stroke={GREEN} strokeWidth="1.2" fill="none" opacity="0.6" />
      <polyline points="46,26 49,29 55,22" stroke={GREEN} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 50 Q100 38 120 50" stroke={Y} strokeWidth="1.2" fill="none" opacity="0.3" strokeDasharray="3 2" />
      <polygon points="120,50 115,46 115,54" fill={Y} opacity="0.3" />
    </svg>
  );
}

/* ── Axis formatter ────────────────────────────────────────────────────────── */
function fmtAxisVal(v) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000)    return `$${(v / 1000).toFixed(0)}K`;
  return `$${Math.round(v)}`;
}

/* ── ROIChart ──────────────────────────────────────────────────────────────── */
function ROIChart({ cumSavings, cumRevenue, hoursPerYear, paybackMonths }) {
  const W = 700, H = 260, PL = 54, PR = 20, PT = 28, PB = 36;
  const chartW = W - PL - PR;
  const chartH = H - PT - PB;
  const [hovered, setHovered] = useState(null);

  const cumTotal = cumSavings.map((s, i) => s + cumRevenue[i]);
  const maxY     = Math.max(...cumTotal, 1);
  const yTicks   = getYTicks(maxY);

  const gap  = chartW / 12;
  const barW = Math.floor(gap * 0.52);

  function xFor(i) { return PL + gap * i + gap * 0.24; }
  function yFor(v) { return PT + chartH - (v / maxY) * chartH; }

  function savFill(i, hov) {
    if (hov) return '#4ade80';
    if (i < 2) return 'rgba(74,222,128,0.40)';
    if (i < 4) return 'rgba(74,222,128,0.62)';
    return '#4ade80';
  }
  function revFill(i, hov) {
    if (i === 0) return 'transparent';
    if (hov) return 'rgba(134,239,172,0.70)';
    if (i === 1) return 'rgba(134,239,172,0.18)';
    if (i < 4)  return 'rgba(134,239,172,0.35)';
    return 'rgba(134,239,172,0.52)';
  }

  const lastSav = cumSavings[11];
  const lastTot = cumTotal[11];

  return (
    <div style={{ width: '100%' }}>
      <style>{`
        @keyframes barGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .roi-bar { animation: none !important; }
        }
      `}</style>

      {/* Title + legend row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#888' }}>
          Cumulative benefit — working with Tergo
        </div>
        <div className="roi-chart-legend" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, background: '#4ade80', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: "'Exo',sans-serif" }}>Cost savings</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, background: 'rgba(134,239,172,0.45)', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: "'Exo',sans-serif" }}>Revenue potential</span>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>

        {/* Grid + left Y-axis */}
        {yTicks.map((v, i) => {
          const y = yFor(v);
          return (
            <g key={i}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={PL - 6} y={y + 4} textAnchor="end" fill="#555" fontSize="9" fontFamily="'Exo',sans-serif">
                {fmtAxisVal(v)}
              </text>
            </g>
          );
        })}

        {/* Stacked cumulative bars */}
        {Array.from({ length: 12 }, (_, i) => {
          const totH = Math.max((cumTotal[i]   / maxY) * chartH, 0);
          const savH = Math.max((cumSavings[i] / maxY) * chartH, 0);
          const revH = Math.max(totH - savH, 0);
          const x     = xFor(i);
          const delay = `${i * 35}ms`;
          const isHov = hovered === i;
          const yBot  = PT + chartH;
          const ySav  = yBot - savH;
          const yRev  = ySav - revH;

          return (
            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              {savH > 0.5 && (
                <rect className="roi-bar" x={x} y={ySav} width={barW} height={savH} rx="1"
                  fill={savFill(i, isHov)}
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom', animation: `barGrow 300ms ease-out both ${delay}`, transition: 'fill .15s' }}
                />
              )}
              {revH > 0.5 && (
                <rect className="roi-bar" x={x} y={yRev} width={barW} height={revH} rx="1"
                  fill={revFill(i, isHov)}
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom', animation: `barGrow 300ms ease-out both ${delay}`, transition: 'fill .15s' }}
                />
              )}
              <rect x={x - 4} y={PT} width={barW + 8} height={chartH} fill="transparent" />
            </g>
          );
        })}

        {/* X-axis labels: M1–M12 */}
        {Array.from({ length: 12 }, (_, i) => (
          <text key={i} x={xFor(i) + barW / 2} y={H - 8}
            textAnchor="middle" fill={hovered === i ? 'rgba(255,255,255,0.6)' : '#444'}
            fontSize="9" fontFamily="'Exo',sans-serif">
            M{i + 1}
          </text>
        ))}

        {/* Hover tooltip */}
        {hovered !== null && (() => {
          const i   = hovered;
          const sav = Math.round(cumSavings[i]);
          const rev = Math.round(cumRevenue[i]);
          const tot = Math.round(cumTotal[i]);
          const cx  = xFor(i) + barW / 2;
          const cy  = yFor(cumTotal[i]);
          const tipW = 196, tipH = 94;
          const tipX = cx + tipW + 12 > W ? cx - tipW - 10 : cx + 10;
          const tipY = Math.max(Math.min(cy - tipH / 2, H - tipH - PT), PT);
          return (
            <g pointerEvents="none">
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="4"
                fill="rgba(10,10,10,0.96)" stroke={Y} strokeWidth="1" strokeOpacity="0.4" />
              <text x={tipX + 10} y={tipY + 16} fill="rgba(255,255,255,0.8)" fontSize="10"
                fontFamily="'Exo',sans-serif" fontWeight="700">M{i + 1}</text>
              <line x1={tipX + 10} y1={tipY + 22} x2={tipX + tipW - 10} y2={tipY + 22}
                stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <text x={tipX + 10} y={tipY + 36} fill="#777" fontSize="9" fontFamily="'Exo',sans-serif">Cost savings:</text>
              <text x={tipX + tipW - 10} y={tipY + 36} fill="#4ade80" fontSize="9"
                fontFamily="'Exo',sans-serif" fontWeight="700" textAnchor="end">${sav.toLocaleString()}</text>
              <text x={tipX + 10} y={tipY + 50} fill="#777" fontSize="9" fontFamily="'Exo',sans-serif">Revenue potential:</text>
              <text x={tipX + tipW - 10} y={tipY + 50} fill="rgba(134,239,172,0.85)" fontSize="9"
                fontFamily="'Exo',sans-serif" fontWeight="700" textAnchor="end">${rev.toLocaleString()}</text>
              <line x1={tipX + 10} y1={tipY + 57} x2={tipX + tipW - 10} y2={tipY + 57}
                stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <text x={tipX + 10} y={tipY + 71} fill="#777" fontSize="9" fontFamily="'Exo',sans-serif">Combined benefit:</text>
              <text x={tipX + tipW - 10} y={tipY + 71} fill="rgba(255,255,255,0.85)" fontSize="9"
                fontFamily="'Exo',sans-serif" fontWeight="700" textAnchor="end">${tot.toLocaleString()}</text>
            </g>
          );
        })()}
      </svg>

      {/* Unified 4-stat footer row */}
      <div className="roi-stats-row">
        <div className="roi-stat-cell">
          <div className="roi-stat-label">Total cost savings (M12)</div>
          <div className="roi-stat-value" style={{ color: '#4ade80' }}>{fmtAxisVal(lastSav)}</div>
          <div className="roi-stat-sub">cost savings (M12)</div>
        </div>
        <div className="roi-stat-divider" />
        <div className="roi-stat-cell">
          <div className="roi-stat-label">Total combined benefit (M12)</div>
          <div className="roi-stat-value" style={{ color: 'rgba(134,239,172,0.9)' }}>{fmtAxisVal(lastTot)}</div>
          <div className="roi-stat-sub">combined (M12)</div>
        </div>
        <div className="roi-stat-divider" />
        <div className="roi-stat-cell">
          <div className="roi-stat-label">Hours recovered</div>
          <div className="roi-stat-value" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {hoursPerYear ? Math.round(hoursPerYear).toLocaleString() + '\u00a0hrs' : '—'}
          </div>
          <div className="roi-stat-sub">hours back per year</div>
        </div>
        <div className="roi-stat-divider" />
        <div className="roi-stat-cell">
          <div className="roi-stat-label">Estimated payback</div>
          <div className="roi-stat-value" style={{ color: '#60a5fa' }}>
            {paybackMonths == null ? '—' : paybackMonths > 12 ? '12+\u00a0mos' : paybackMonths < 1 ? '<\u00a01\u00a0mo' : `${Math.round(paybackMonths * 10) / 10}\u00a0mos`}
          </div>
          <div className="roi-stat-sub">to recover investment</div>
        </div>
      </div>
    </div>
  );
}

/* ── Profile text builder ──────────────────────────────────────────────────── */
// Values in profileText come from controlled React state — safe for dangerouslySetInnerHTML.
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
    () => runFullCalculation({ sector, monthlyRevenue: revenue, teamSize, manualPct, monthlyLeads: leads, responseTime }),
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

  function handleSector(v)   { setSector(v);       setChartKey(k => k + 1); updateProfile(v, teamSize, revenue, manualPct, responseTime, true); }
  function handleRevenue(v)  { setRevenue(v);      setChartKey(k => k + 1); updateProfile(sector, teamSize, v, manualPct, responseTime, false); }
  function handleTeam(v)     { setTeamSize(v);     setChartKey(k => k + 1); updateProfile(sector, v, revenue, manualPct, responseTime, false); }
  function handleManual(v)   { setManualPct(v);    setChartKey(k => k + 1); updateProfile(sector, teamSize, revenue, v, responseTime, false); }
  function handleLeads(v)    { setLeads(v);        setChartKey(k => k + 1); updateProfile(sector, teamSize, revenue, manualPct, responseTime, false); }
  function handleResponse(v) { setResponseTime(v); setChartKey(k => k + 1); updateProfile(sector, teamSize, revenue, manualPct, v, false); }

  const fmtDollar  = v => `$${Math.round(v).toLocaleString()}`;
  const fmtDollarK = v => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${Math.round(v)}`;
  const fmtHours   = v => `${Math.round(v).toLocaleString()} hrs`;
  const fmtMonths  = v => {
    if (!v || v === null) return '—';
    if (v > 12) return '12+ mos';
    if (v < 1)  return '< 1 mo';
    const r = Math.round(v * 10) / 10;
    return `${r} mos`;
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
        /* Unified stats row (chart footer) */
        .roi-stats-row {
          display: flex;
          align-items: stretch;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: 12px;
        }
        .roi-stat-cell {
          flex: 1;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .roi-stat-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
        }
        .roi-stat-value {
          font-size: 22px;
          font-weight: 700;
          font-family: 'Exo', sans-serif;
          line-height: 1;
        }
        .roi-stat-sub {
          font-size: 11px;
          color: #555;
          font-weight: 300;
        }
        .roi-stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.06);
          flex-shrink: 0;
          align-self: stretch;
        }
        /* Input columns */
        .roi-input-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px,3vw,40px) clamp(32px,5vw,64px);
        }
        .roi-group-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 20px;
          font-family: 'Exo', sans-serif;
        }
        /* Illustration hidden on mobile */
        .roi-illustration { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 140px; }
        /* Disclaimer ghost CTA */
        .roi-disc-cta {
          border: 1px solid rgba(245,197,64,0.4);
          padding: 10px 20px;
          color: #F5C540;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Exo', sans-serif;
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: background .15s;
          display: inline-block;
        }
        .roi-disc-cta:hover { background: rgba(245,197,64,0.08); }
        @media (max-width: 768px) {
          .roi-input-cols { grid-template-columns: 1fr; }
          .roi-illustration { display: none !important; }
          .roi-chart-legend { flex-direction: column; gap: 8px !important; }
          .roi-disc-cta { display: block; text-align: center; width: 100%; box-sizing: border-box; }
          .roi-stats-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .roi-stat-divider { display: none; }
          .roi-stat-cell { padding: 10px 0; }
        }
      `}</style>

      {/* ── Section header ── */}
      <div style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,72px) 0', maxWidth: 1100, margin: '0 auto' }}>
        <div className="eyebrow y" style={{ marginBottom: 16 }}>Free Estimate</div>
        <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.5px', margin: '0 0 40px 0', maxWidth: 520 }}>
          What could automation<br />save your team?
        </h2>
      </div>

      {/* ── Inputs ── */}
      <div style={{ padding: '0 clamp(24px,5vw,72px)', maxWidth: 1100, margin: '0 auto' }}>

        {/* Sector selector */}
        <div style={{ marginBottom: 32 }}>
          <PillGroup label="Your sector" options={SECTORS} value={sector} onChange={handleSector} />
        </div>

        {/* Two-column input groups */}
        <div className="roi-input-cols" style={{ marginBottom: 48 }}>
          {/* Group A */}
          <div>
            <div className="roi-group-label">About your business</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
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
            </div>
          </div>
          {/* Group B */}
          <div>
            <div className="roi-group-label">About your leads</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <SliderInput
                label="Monthly inbound leads"
                helper="Enquiries, sign-ups, or new leads received per month."
                min={10} max={2000} step={10}
                value={leads} onChange={handleLeads}
                fmt={v => v.toLocaleString()}
              />
              <PillGroup
                label="Current lead response time"
                options={RESPONSE_TIMES}
                value={responseTime}
                onChange={handleResponse}
                small
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Separator ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 clamp(24px,5vw,72px)' }} />

      {/* ── Profile card (full-width, illustration inside) ── */}
      <div style={{ maxWidth: 1100, margin: '40px auto 0', padding: '0 clamp(24px,5vw,72px)' }}>
        <div style={{
          background: '#141414',
          border: '1px solid #222',
          borderBottom: 'none',
          padding: '24px 28px',
          display: 'flex',
          gap: 28,
          alignItems: 'center',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>
              Your profile
            </div>
            <div style={{ borderLeft: `3px solid ${Y}`, paddingLeft: 16 }}>
              {/* profileText values come from controlled state — safe for dangerouslySetInnerHTML */}
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}
                 dangerouslySetInnerHTML={{ __html: profileText }} />
            </div>
          </div>
          <div className="roi-illustration">
            <Illustration />
          </div>
        </div>

        {/* ── Chart (shares border/background with profile) ── */}
        <div style={{
          background: '#141414',
          border: '1px solid #222',
          padding: '20px 24px 16px',
        }}>
          <ROIChart
            key={chartKey}
            cumSavings={result.cumSavings}
            cumRevenue={result.cumRevenue}
            hoursPerYear={result.hoursPerYear}
            paybackMonths={result.paybackMonths}
          />
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div style={{ maxWidth: 1100, margin: '32px auto 0', padding: '0 clamp(24px,5vw,72px) clamp(48px,6vw,80px)' }}>
        <div style={{
          border: '1px solid rgba(245,197,64,0.12)',
          borderLeft: '3px solid rgba(245,197,64,0.35)',
          padding: '20px 24px',
          background: '#111',
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            {/* Warning icon — SVG, not emoji */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M7 1.5L12.5 12H1.5L7 1.5Z" stroke="rgba(245,197,64,0.6)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
              <line x1="7" y1="5.5" x2="7" y2="8.5" stroke="rgba(245,197,64,0.6)" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="7" cy="10.5" r="0.6" fill="rgba(245,197,64,0.6)" />
            </svg>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, fontWeight: 300, margin: '0 0 16px 0' }}>
                These figures are <span style={{ color: Y }}>best-case scenario estimates</span> based on industry-average automation yields and typical team structures. Actual results depend on workflow complexity, data quality, and implementation scope. We recommend a discovery call before drawing conclusions from this calculator.
              </p>
              <a
                href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
                target="_blank"
                rel="noreferrer"
                className="roi-disc-cta"
              >
                Book a free discovery call →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
