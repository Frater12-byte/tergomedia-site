'use client';
import { useState, useMemo, useEffect, useRef } from 'react';

/* ── Sector benchmarks ─────────────────────────────────────────────────────
   hrsSaved    : avg automatable hours saved per employee per day
   avgHourlyRate: blended fully-loaded hourly cost (salary + overhead) USD
   revPerHead  : annual revenue generated per employee in this sector (USD)
   convLift    : relative improvement in lead-to-close / booking conversion
   color       : accent colour token
─────────────────────────────────────────────────────────────────────────── */
const SECTORS: Record<string, {
  label: string; hrsSaved: number; avgHourlyRate: number;
  revPerHead: number; convLift: number; color: string;
}> = {
  real_estate:  { label: 'Real Estate',           hrsSaved: 2.6, avgHourlyRate: 48, revPerHead: 175_000, convLift: 0.16, color: 'var(--y)' },
  travel:       { label: 'Travel & Hospitality',  hrsSaved: 3.1, avgHourlyRate: 34, revPerHead: 115_000, convLift: 0.13, color: 'var(--c)' },
  professional: { label: 'Professional Services', hrsSaved: 2.4, avgHourlyRate: 58, revPerHead: 195_000, convLift: 0.10, color: 'var(--p)' },
  agriculture:  { label: 'Agriculture',           hrsSaved: 2.0, avgHourlyRate: 28, revPerHead: 130_000, convLift: 0.08, color: 'var(--c)' },
  ecommerce:    { label: 'E-commerce',            hrsSaved: 3.4, avgHourlyRate: 26, revPerHead: 95_000,  convLift: 0.20, color: 'var(--r)' },
  other:        { label: 'Other',                 hrsSaved: 2.3, avgHourlyRate: 38, revPerHead: 140_000, convLift: 0.11, color: 'var(--y)' },
};

const MONTHS = ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'];
const W = 520, H = 220, pL = 52, pR = 56, pT = 14, pB = 30;
const cW = W - pL - pR, cH = H - pT - pB;

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
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
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: active ? '#888' : '#333' }}>{label}</span>
        <span style={{ fontSize: 26, fontWeight: 900, color: active ? '#fff' : '#2a2a2a', letterSpacing: -1.5, lineHeight: 1, transition: 'color .2s' }}>{displayVal}</span>
      </div>
      <div style={{ position: 'relative', height: 3, background: '#1a1a1a', borderRadius: 2 }}>
        {active && <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--y)', borderRadius: 2, transition: 'width 0.08s' }} />}
        <input
          type="range" min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: '-8px 0', width: '100%', opacity: 0, cursor: 'pointer', height: 20, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, color: '#2a2a2a' }}>
        <span>{min === 0 ? 'drag to set' : `${min}${unit}`}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

type Step = { done: boolean; label: string; hint: string };
function StepRow({ steps }: { steps: Step[] }) {
  return (
    <div style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${s.done ? 'var(--y)' : '#222'}`,
              background: s.done ? 'var(--y)' : 'transparent',
              transition: 'all .25s',
              fontSize: 9, fontWeight: 900, color: s.done ? '#000' : '#333',
            }}>{s.done ? '✓' : i + 1}</div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: s.done ? '#fff' : '#333', transition: 'color .2s' }}>{s.label}</div>
              {!s.done && <div style={{ fontSize: 10, color: '#333', marginTop: 1 }}>{s.hint}</div>}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 24, height: 1, background: '#1a1a1a', margin: '0 12px', flexShrink: 0 }} />
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
    if (ready && !prevReady.current) {
      setChartKey(k => k + 1);
    }
    prevReady.current = ready;
  }, [ready]);

  const { savings, revenue, totalSavings, totalRevenue } = useMemo(() => {
    if (!s || employees === 0 || margin === 0) return { savings: [], revenue: [], totalSavings: 0, totalRevenue: 0 };

    const monthlyCostSaved = employees * s.hrsSaved * 22 * s.avgHourlyRate;
    const annualRevenue = employees * s.revPerHead;

    const savArr: number[] = [], revArr: number[] = [];
    let cumS = 0, cumR = 0;
    for (let m = 0; m < 12; m++) {
      // Cost savings: ramp 35% → 100% over 5 months
      const ramp = Math.min(1, 0.35 + m * 0.14);
      cumS += monthlyCostSaved * ramp;

      // Revenue uplift: S-curve × margin × conversion lift
      const sc = 1 / (1 + Math.exp(-0.85 * (m - 4.5)));
      cumR += (annualRevenue / 12) * (margin / 100) * s.convLift * sc;

      savArr.push(Math.round(cumS));
      revArr.push(Math.round(cumR));
    }
    return { savings: savArr, revenue: revArr, totalSavings: cumS, totalRevenue: cumR };
  }, [s, employees, margin]);

  const roi = (totalSavings + totalRevenue) > 0
    ? Math.round((totalSavings + totalRevenue) / Math.max(1, totalSavings * 0.12 + 9_000))
    : 0;

  const maxV = ready ? Math.max(...savings, ...revenue) * 1.12 : 1;
  const xPos = (i: number) => pL + (i / 11) * cW;
  const yPos = (v: number) => pT + cH - (v / maxV) * cH;
  const ticks = 4;

  const savPaths = ready ? buildPaths(savings, maxV) : null;
  const revPaths = ready ? buildPaths(revenue, maxV) : null;

  const steps: Step[] = [
    { done: sector !== null, label: 'Sector', hint: 'Pick your industry' },
    { done: employees > 0, label: 'Team size', hint: 'Drag the slider' },
    { done: margin > 0, label: 'Margin', hint: 'Drag the slider' },
  ];

  return (
    <div>
      {/* Step indicators */}
      <StepRow steps={steps} />

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'start' }}>
        {/* ── LEFT: inputs ── */}
        <div>
          {/* Sector pills */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: '#444', marginBottom: 10 }}>Sector</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {Object.entries(SECTORS).map(([key, val]) => (
                <button key={key} onClick={() => setSector(key)} style={{
                  padding: '8px 14px', fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
                  textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Exo, sans-serif',
                  border: `1px solid ${sector === key ? val.color : '#1e1e1e'}`,
                  background: sector === key ? `rgba(255,255,255,0.04)` : 'transparent',
                  color: sector === key ? val.color : '#333',
                  textAlign: 'left', transition: 'all .15s',
                }}>{val.label}</button>
              ))}
            </div>
          </div>

          <Slider label="Employees" min={0} max={150} value={employees} onChange={setEmployees} active={employees > 0} />
          <Slider label="Avg margin" min={0} max={80} value={margin} onChange={setMargin} unit="%" active={margin > 0} />

          {/* Metrics — only when ready */}
          {ready && (
            <div style={{ marginTop: 4, paddingTop: 20, borderTop: '1px solid #1a1a1a', opacity: ready ? 1 : 0, transition: 'opacity .4s' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#444', marginBottom: 4 }}>Cost savings</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--c)', letterSpacing: -1.5, lineHeight: 1 }}>{fmt(totalSavings)}</div>
                <div style={{ fontSize: 10, color: '#444', marginTop: 3 }}>over 12 months</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#444', marginBottom: 4 }}>Revenue uplift</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: s!.color, letterSpacing: -1.5, lineHeight: 1 }}>{fmt(totalRevenue)}</div>
                <div style={{ fontSize: 10, color: '#444', marginTop: 3 }}>over 12 months</div>
              </div>
              <div style={{ padding: '12px 14px', background: 'rgba(242,194,0,0.05)', border: '1px solid rgba(242,194,0,0.12)' }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 4 }}>Est. ROI</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: 'var(--y)', letterSpacing: -2, lineHeight: 1 }}>{roi}×</div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: chart ── */}
        <div>
          <svg key={chartKey} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Grid lines + Y labels */}
            {Array.from({ length: ticks + 1 }, (_, i) => {
              const v = (maxV / ticks) * (ticks - i);
              const y = pT + (i / ticks) * cH;
              return (
                <g key={i}>
                  <line x1={pL} y1={y} x2={W - pR} y2={y} stroke="#151515" strokeWidth="1" />
                  <text x={pL - 6} y={y + 4} textAnchor="end" fill={ready ? '#2e2e2e' : '#1a1a1a'} fontSize="9" fontFamily="Exo,sans-serif" fontWeight="700">{ready ? fmt(v) : ''}</text>
                </g>
              );
            })}

            {/* X labels */}
            {MONTHS.map((m, i) => (
              i % 2 === 0 && <text key={m} x={xPos(i)} y={H - 6} textAnchor="middle" fill="#2a2a2a" fontSize="8" fontFamily="Exo,sans-serif" fontWeight="700">{m}</text>
            ))}

            {!ready && (
              <text x={W / 2} y={H / 2} textAnchor="middle" fill="#222" fontSize="11" fontFamily="Exo,sans-serif" fontWeight="700" letterSpacing="2">
                COMPLETE ALL 3 STEPS TO SEE PROJECTION
              </text>
            )}

            {ready && savPaths && revPaths && (() => {
              const LINE_LEN = 1200;
              return (
                <>
                  {/* Area fills */}
                  <path d={revPaths.area} fill={s!.color} opacity="0.05" />
                  <path d={savPaths.area} fill="var(--c)" opacity="0.05" />

                  {/* Revenue line */}
                  <path
                    d={revPaths.line} fill="none" stroke={s!.color} strokeWidth="2.5" strokeLinecap="round"
                    strokeDasharray={LINE_LEN}
                    strokeDashoffset={LINE_LEN}
                    style={{ animation: 'drawLine 1.4s cubic-bezier(0.4,0,0.2,1) 0.1s forwards' }}
                  />
                  {/* Savings line */}
                  <path
                    d={savPaths.line} fill="none" stroke="var(--c)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 4"
                    style={{ opacity: 0, animation: 'fadeIn 0.6s ease 0.9s forwards' }}
                  />

                  {/* Month dots on revenue */}
                  {revPaths.pts.map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="2.5" fill={s!.color}
                      style={{ opacity: 0, animation: `fadeIn 0.3s ease ${0.2 + i * 0.1}s forwards` }}
                    />
                  ))}

                  {/* End labels */}
                  <text x={xPos(11) + 7} y={yPos(revenue[11]) + 4} fill={s!.color} fontSize="10" fontWeight="900" fontFamily="Exo,sans-serif"
                    style={{ opacity: 0, animation: 'fadeIn 0.5s ease 1.5s forwards' }}>
                    {fmt(revenue[11])}
                  </text>
                  <text x={xPos(11) + 7} y={yPos(savings[11]) + 4} fill="var(--c)" fontSize="10" fontWeight="900" fontFamily="Exo,sans-serif"
                    style={{ opacity: 0, animation: 'fadeIn 0.5s ease 1.6s forwards' }}>
                    {fmt(savings[11])}
                  </text>
                </>
              );
            })()}
          </svg>

          <style>{`
            @keyframes drawLine {
              to { stroke-dashoffset: 0; }
            }
            @keyframes fadeIn {
              to { opacity: 1; }
            }
          `}</style>

          {ready && (
            <>
              <div style={{ display: 'flex', gap: 20, marginTop: 14, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#555' }}>
                  <svg width="20" height="3"><line x1="0" y1="1.5" x2="20" y2="1.5" stroke={s!.color} strokeWidth="2.5" strokeLinecap="round" /></svg>
                  Revenue uplift (cumulative)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#555' }}>
                  <svg width="20" height="3"><line x1="0" y1="1.5" x2="20" y2="1.5" stroke="var(--c)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 3" /></svg>
                  Cost savings (cumulative)
                </div>
              </div>
              <div style={{ marginTop: 14, fontSize: 11, color: '#2e2e2e', lineHeight: 1.65 }}>
                Based on {SECTORS[sector!].label} benchmarks. Assumes {s!.hrsSaved} hrs/day recovered per employee,
                {' '}{Math.round(s!.convLift * 100)}% lift in lead-to-close rate, fully-loaded cost ${s!.avgHourlyRate}/hr.
                Figures are estimates — actual results vary by implementation maturity and team adoption.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
