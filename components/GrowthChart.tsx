'use client';
import { useState, useMemo, useEffect, useRef } from 'react';

/* ── Sector benchmarks ─────────────────────────────────────────────────────
   adminPct    : fraction of headcount doing automatable admin/ops work
   hrsSaved    : avg hrs/day recovered per admin employee after automation
   avgHourlyRate: fully-loaded hourly cost (salary + overhead) in USD
   revPerHead  : annual revenue per employee in sector (USD)
   convLift    : relative improvement in conversion / close rate
   setup       : typical one-time implementation cost (USD)
   monthly     : typical monthly maintenance / support cost (USD)
─────────────────────────────────────────────────────────────────────────── */
const SECTORS: Record<string, {
  label: string; adminPct: number; hrsSaved: number; avgHourlyRate: number;
  revPerHead: number; convLift: number; setup: number; monthly: number; color: string;
}> = {
  real_estate:  { label: 'Real Estate',           adminPct: 0.35, hrsSaved: 2.8, avgHourlyRate: 45, revPerHead: 160_000, convLift: 0.14, setup: 9_000,  monthly: 750,  color: 'var(--y)' },
  travel:       { label: 'Travel & Hospitality',  adminPct: 0.30, hrsSaved: 3.0, avgHourlyRate: 32, revPerHead: 100_000, convLift: 0.12, setup: 8_500,  monthly: 650,  color: 'var(--c)' },
  professional: { label: 'Professional Services', adminPct: 0.40, hrsSaved: 2.5, avgHourlyRate: 55, revPerHead: 180_000, convLift: 0.09, setup: 10_000, monthly: 850,  color: 'var(--p)' },
  agriculture:  { label: 'Agriculture',           adminPct: 0.25, hrsSaved: 2.2, avgHourlyRate: 26, revPerHead: 110_000, convLift: 0.07, setup: 7_500,  monthly: 550,  color: 'var(--c)' },
  ecommerce:    { label: 'E-commerce',            adminPct: 0.45, hrsSaved: 3.2, avgHourlyRate: 24, revPerHead: 85_000,  convLift: 0.18, setup: 8_000,  monthly: 600,  color: 'var(--r)' },
  other:        { label: 'Other',                 adminPct: 0.30, hrsSaved: 2.4, avgHourlyRate: 36, revPerHead: 120_000, convLift: 0.10, setup: 8_500,  monthly: 700,  color: 'var(--y)' },
};

const MONTHS = ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'];
const W = 520, H = 220, pL = 58, pR = 60, pT = 16, pB = 32;
const cW = W - pL - pR, cH = H - pT - pB;

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}

function buildPaths(vals: number[], maxV: number) {
  const xPos = (i: number) => pL + (i / (MONTHS.length - 1)) * cW;
  const yPos = (v: number) => pT + cH - (v / maxV) * cH;
  const pts = vals.map((v, i) => [xPos(i), yPos(v)]);
  let line = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1][0] + pts[i][0]) / 2;
    line += ` C ${cpx} ${pts[i-1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
  }
  let area = `M ${pts[0][0]} ${pT + cH} L ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1][0] + pts[i][0]) / 2;
    area += ` C ${cpx} ${pts[i-1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
  }
  area += ` L ${pts[pts.length-1][0]} ${pT + cH} Z`;
  return { line, area, pts };
}

function Slider({ label, min, max, value, onChange, unit = '', active }: {
  label: string; min: number; max: number; value: number;
  onChange: (v: number) => void; unit?: string; active: boolean;
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const displayVal = value === 0 ? '—' : `${value}${unit}`;
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 }}>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: active ? '#666' : '#2e2e2e' }}>{label}</span>
        <span style={{ fontSize: 24, fontWeight: 900, color: active ? '#fff' : '#2a2a2a', letterSpacing: -1.5, lineHeight: 1, transition: 'color .2s' }}>{displayVal}</span>
      </div>
      <div style={{ position: 'relative', height: 2, background: '#1c1c2a', borderRadius: 2 }}>
        {active && <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--y)', borderRadius: 2, transition: 'width 0.08s' }} />}
        <input
          type="range" min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: '-9px 0', width: '100%', opacity: 0, cursor: 'pointer', height: 20, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, color: '#252530' }}>
        <span>{min === 0 ? 'drag to set' : `${min}${unit}`}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

type Step = { done: boolean; label: string; hint: string };
function StepRow({ steps }: { steps: Step[] }) {
  return (
    <div style={{ display: 'flex', gap: 0, marginBottom: 28 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${s.done ? 'var(--y)' : '#1e1e2e'}`,
              background: s.done ? 'var(--y)' : 'transparent',
              transition: 'all .25s',
              fontSize: 9, fontWeight: 900, color: s.done ? '#000' : '#2a2a3a',
            }}>{s.done ? '✓' : i + 1}</div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: s.done ? '#fff' : '#2a2a3a', transition: 'color .2s' }}>{s.label}</div>
              {!s.done && <div style={{ fontSize: 10, color: '#2a2a3a', marginTop: 1 }}>{s.hint}</div>}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 24, height: 1, background: '#1a1a2a', margin: '0 12px', flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function GrowthChart() {
  const [sector, setSector] = useState<string | null>(null);
  const [employees, setEmployees] = useState(0);
  const [margin, setMargin] = useState(0);
  const [chartKey, setChartKey] = useState(0);
  const prevReady = useRef(false);

  const ready = sector !== null && employees > 0 && margin > 0;
  const s = sector ? SECTORS[sector] : null;

  useEffect(() => {
    if (ready && !prevReady.current) setChartKey(k => k + 1);
    prevReady.current = ready;
  }, [ready]);

  const { savings, revenue, totalSavings, totalRevenue } = useMemo(() => {
    if (!s || employees === 0 || margin === 0) return { savings: [], revenue: [], totalSavings: 0, totalRevenue: 0 };

    // Only the admin/ops fraction of employees benefits from automation
    const adminCount = employees * s.adminPct;
    // Monthly cost recovered: admin employees × hrs/day recovered × 22 work days × hourly rate
    const peakMonthlySavings = adminCount * s.hrsSaved * 22 * s.avgHourlyRate;
    // Revenue uplift: all employees × rev/head/month × margin × conversion lift
    const peakMonthlyRevenue = (employees * s.revPerHead / 12) * (margin / 100) * s.convLift;

    const savArr: number[] = [], revArr: number[] = [];
    let cumS = 0, cumR = 0;
    for (let m = 0; m < 12; m++) {
      // Cost savings ramp: 25% → 100% over 5 months, then stable
      const ramp = Math.min(1, 0.25 + m * 0.15);
      cumS += peakMonthlySavings * ramp;
      // Revenue uplift: S-curve, slower to materialise
      const sc = 1 / (1 + Math.exp(-0.9 * (m - 5)));
      cumR += peakMonthlyRevenue * sc;
      savArr.push(Math.round(cumS));
      revArr.push(Math.round(cumR));
    }
    return { savings: savArr, revenue: revArr, totalSavings: cumS, totalRevenue: cumR };
  }, [s, employees, margin]);

  // ROI = net return / total investment
  // Investment = setup cost + 12 months maintenance (scaled lightly by team size)
  const annualInvestment = s ? s.setup + (s.monthly + employees * 4) * 12 : 1;
  const roi = (totalSavings + totalRevenue) > 0
    ? Math.round((totalSavings + totalRevenue) / annualInvestment)
    : 0;

  const maxV = ready ? Math.max(...savings, ...revenue) * 1.15 : 1;
  const xPos = (i: number) => pL + (i / 11) * cW;
  const yPos = (v: number) => pT + cH - (v / maxV) * cH;
  const ticks = 4;

  const savPaths = ready ? buildPaths(savings, maxV) : null;
  const revPaths = ready ? buildPaths(revenue, maxV) : null;
  const LINE_LEN = 1400;

  const steps: Step[] = [
    { done: sector !== null, label: 'Sector', hint: 'Pick your industry' },
    { done: employees > 0, label: 'Team size', hint: 'Drag the slider' },
    { done: margin > 0, label: 'Margin', hint: 'Drag the slider' },
  ];

  return (
    <div>
      <StepRow steps={steps} />

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'start' }}>
        {/* ── LEFT: inputs ── */}
        <div>
          <div style={{ marginBottom: 26 }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: '#333', marginBottom: 10 }}>Sector</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {Object.entries(SECTORS).map(([key, val]) => (
                <button key={key} onClick={() => setSector(key)} style={{
                  padding: '7px 12px', fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
                  textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Exo, sans-serif',
                  border: `1px solid ${sector === key ? val.color : '#1a1a2a'}`,
                  background: sector === key ? `rgba(255,255,255,0.03)` : 'transparent',
                  color: sector === key ? val.color : '#2e2e3e',
                  textAlign: 'left', transition: 'all .15s',
                }}>{val.label}</button>
              ))}
            </div>
          </div>

          <Slider label="Employees" min={0} max={150} value={employees} onChange={setEmployees} active={employees > 0} />
          <Slider label="Avg margin" min={0} max={80} value={margin} onChange={setMargin} unit="%" active={margin > 0} />

          {ready && (
            <div style={{ marginTop: 4, paddingTop: 18, borderTop: '1px solid #14141f', opacity: 1, transition: 'opacity .4s' }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#333', marginBottom: 3 }}>Cost savings</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--c)', letterSpacing: -1.5, lineHeight: 1 }}>{fmt(totalSavings)}</div>
                <div style={{ fontSize: 10, color: '#333', marginTop: 3 }}>12-month cumulative</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#333', marginBottom: 3 }}>Revenue uplift</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: s!.color, letterSpacing: -1.5, lineHeight: 1 }}>{fmt(totalRevenue)}</div>
                <div style={{ fontSize: 10, color: '#333', marginTop: 3 }}>12-month cumulative</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'rgba(242,194,0,0.04)', border: '1px solid rgba(242,194,0,0.10)', borderRadius: 2 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#444', marginBottom: 3 }}>Est. ROI</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--y)', letterSpacing: -2, lineHeight: 1 }}>{roi}×</div>
                <div style={{ fontSize: 10, color: '#333', marginTop: 3 }}>vs. ~{fmt(annualInvestment)} investment</div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: chart ── */}
        <div>
          <svg key={chartKey} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <filter id="lineGlow" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="lineGlowC" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Grid lines + Y labels */}
            {Array.from({ length: ticks + 1 }, (_, i) => {
              const v = (maxV / ticks) * (ticks - i);
              const y = pT + (i / ticks) * cH;
              return (
                <g key={i}>
                  <line x1={pL} y1={y} x2={W - pR} y2={y} stroke={ready ? '#13131f' : '#0e0e18'} strokeWidth="1" />
                  <text x={pL - 7} y={y + 4} textAnchor="end" fill={ready ? '#303040' : '#151520'} fontSize="9" fontFamily="Exo,sans-serif" fontWeight="700">{ready ? fmt(v) : ''}</text>
                </g>
              );
            })}

            {/* X labels */}
            {MONTHS.map((m, i) => (
              i % 2 === 0 && <text key={m} x={xPos(i)} y={H - 8} textAnchor="middle" fill={ready ? '#282838' : '#12121a'} fontSize="8" fontFamily="Exo,sans-serif" fontWeight="700">{m}</text>
            ))}

            {!ready && (
              <text x={W / 2} y={H / 2} textAnchor="middle" fill="#1c1c2c" fontSize="10" fontFamily="Exo,sans-serif" fontWeight="800" letterSpacing="2">
                COMPLETE ALL 3 STEPS TO SEE PROJECTION
              </text>
            )}

            {ready && savPaths && revPaths && (
              <>
                {/* Area fills */}
                <path d={revPaths.area} fill={s!.color} opacity="0.06" />
                <path d={savPaths.area} fill="var(--c)" opacity="0.05" />

                {/* Cost savings line (dashed, cyan) */}
                <path
                  d={savPaths.line} fill="none" stroke="var(--c)" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 4"
                  filter="url(#lineGlowC)"
                  style={{ opacity: 0, animation: 'fadeInLine 0.6s ease 1.0s forwards' }}
                />

                {/* Revenue uplift line (solid, sector color) — draws on */}
                <path
                  d={revPaths.line} fill="none" stroke={s!.color} strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={LINE_LEN} strokeDashoffset={LINE_LEN}
                  filter="url(#lineGlow)"
                  style={{ animation: 'drawLine 1.4s cubic-bezier(0.4,0,0.2,1) 0.1s forwards' }}
                />

                {/* Milestone dots on revenue line */}
                {revPaths.pts.map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={i === 11 ? 4 : 2.5} fill={s!.color}
                    style={{ opacity: 0, animation: `fadeInLine 0.3s ease ${0.2 + i * 0.1}s forwards` }}
                  />
                ))}

                {/* End labels */}
                <text x={xPos(11) + 8} y={yPos(revenue[11]) + 4} fill={s!.color} fontSize="10" fontWeight="900" fontFamily="Exo,sans-serif"
                  style={{ opacity: 0, animation: 'fadeInLine 0.5s ease 1.5s forwards' }}>
                  {fmt(revenue[11])}
                </text>
                <text x={xPos(11) + 8} y={yPos(savings[11]) + 4} fill="var(--c)" fontSize="10" fontWeight="900" fontFamily="Exo,sans-serif"
                  style={{ opacity: 0, animation: 'fadeInLine 0.5s ease 1.6s forwards' }}>
                  {fmt(savings[11])}
                </text>
              </>
            )}
          </svg>

          <style>{`
            @keyframes drawLine { to { stroke-dashoffset: 0; } }
            @keyframes fadeInLine { to { opacity: 1; } }
          `}</style>

          {ready && (
            <>
              <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#404050' }}>
                  <svg width="20" height="3"><line x1="0" y1="1.5" x2="20" y2="1.5" stroke={s!.color} strokeWidth="2.5" strokeLinecap="round" /></svg>
                  Revenue uplift (cumul.)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#404050' }}>
                  <svg width="20" height="3"><line x1="0" y1="1.5" x2="20" y2="1.5" stroke="var(--c)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 3" /></svg>
                  Cost savings (cumul.)
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: '#2c2c3c', lineHeight: 1.65 }}>
                Based on {SECTORS[sector!].label} benchmarks — {Math.round(s!.adminPct * 100)}% admin/ops staff,{' '}
                {s!.hrsSaved} hrs/day recovered per admin employee, {Math.round(s!.convLift * 100)}% conversion lift,
                ${s!.avgHourlyRate}/hr fully-loaded cost.
                Estimates only — actual results depend on workflow complexity and team adoption.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
