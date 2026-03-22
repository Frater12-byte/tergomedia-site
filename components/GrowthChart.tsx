'use client';
import { useState, useMemo } from 'react';

const SECTORS: Record<string, { label: string; hrsSaved: number; avgRate: number; leadBoost: number; color: string }> = {
  real_estate:    { label: 'Real Estate',           hrsSaved: 2.8, avgRate: 52, leadBoost: 0.34, color: 'var(--y)' },
  travel:         { label: 'Travel & Hospitality',  hrsSaved: 3.2, avgRate: 38, leadBoost: 0.28, color: 'var(--c)' },
  professional:   { label: 'Professional Services', hrsSaved: 2.5, avgRate: 60, leadBoost: 0.22, color: 'var(--p)' },
  agriculture:    { label: 'Agriculture',           hrsSaved: 2.0, avgRate: 32, leadBoost: 0.18, color: 'var(--c)' },
  ecommerce:      { label: 'E-commerce',            hrsSaved: 3.5, avgRate: 30, leadBoost: 0.40, color: 'var(--r)' },
  other:          { label: 'Other',                 hrsSaved: 2.4, avgRate: 42, leadBoost: 0.24, color: 'var(--y)' },
};

const MONTHS = ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'];

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}

function Slider({ label, min, max, value, onChange, unit = '' }: {
  label: string; min: number; max: number; value: number;
  onChange: (v: number) => void; unit?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#555' }}>{label}</span>
        <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: -1, lineHeight: 1 }}>{value}{unit}</span>
      </div>
      <div style={{ position: 'relative', height: 4, background: '#1e1e1e', borderRadius: 2 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--y)', borderRadius: 2, transition: 'width 0.1s' }} />
        <input
          type="range" min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: '-6px 0', width: '100%', opacity: 0, cursor: 'pointer', height: 16, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, color: '#333' }}>
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function LineChart({ savings, revenue, color }: { savings: number[]; revenue: number[]; color: string }) {
  const W = 500, H = 200, pL = 48, pR = 16, pT = 12, pB = 28;
  const cW = W - pL - pR, cH = H - pT - pB;
  const allVals = [...savings, ...revenue];
  const maxV = Math.max(...allVals) * 1.1 || 1;

  const xPos = (i: number) => pL + (i / (MONTHS.length - 1)) * cW;
  const yPos = (v: number) => pT + cH - (v / maxV) * cH;

  const toPath = (vals: number[]) => {
    const pts = vals.map((v, i) => [xPos(i), yPos(v)]);
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i - 1][0] + pts[i][0]) / 2;
      d += ` C ${cpx} ${pts[i-1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
    }
    return d;
  };

  const toArea = (vals: number[]) => {
    const pts = vals.map((v, i) => [xPos(i), yPos(v)]);
    let d = `M ${pts[0][0]} ${pT + cH}`;
    d += ` L ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i - 1][0] + pts[i][0]) / 2;
      d += ` C ${cpx} ${pts[i-1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
    }
    d += ` L ${pts[pts.length-1][0]} ${pT + cH} Z`;
    return d;
  };

  // Y-axis ticks
  const ticks = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* Grid + Y labels */}
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const v = (maxV / ticks) * (ticks - i);
        const y = pT + (i / ticks) * cH;
        return (
          <g key={i}>
            <line x1={pL} y1={y} x2={W - pR} y2={y} stroke="#1a1a1a" strokeWidth="1" />
            <text x={pL - 5} y={y + 4} textAnchor="end" fill="#333" fontSize="8" fontFamily="Exo,sans-serif">{fmt(v)}</text>
          </g>
        );
      })}
      {/* X labels */}
      {MONTHS.map((m, i) => (
        i % 2 === 0 && <text key={m} x={xPos(i)} y={H - 5} textAnchor="middle" fill="#333" fontSize="8" fontFamily="Exo,sans-serif" fontWeight="700">{m}</text>
      ))}
      {/* Revenue area */}
      <path d={toArea(revenue)} fill={color} opacity="0.06" />
      {/* Savings area */}
      <path d={toArea(savings)} fill="var(--c)" opacity="0.06" />
      {/* Revenue line */}
      <path d={toPath(revenue)} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Savings line */}
      <path d={toPath(savings)} fill="none" stroke="var(--c)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 3" />
      {/* End dots + labels */}
      <circle cx={xPos(11)} cy={yPos(revenue[11])} r="4" fill={color} />
      <circle cx={xPos(11)} cy={yPos(savings[11])} r="4" fill="var(--c)" />
      <text x={xPos(11) + 7} y={yPos(revenue[11]) + 4} fill={color} fontSize="9" fontWeight="800" fontFamily="Exo,sans-serif">{fmt(revenue[11])}</text>
      <text x={xPos(11) + 7} y={yPos(savings[11]) + 4} fill="var(--c)" fontSize="9" fontWeight="800" fontFamily="Exo,sans-serif">{fmt(savings[11])}</text>
    </svg>
  );
}

export default function GrowthChart() {
  const [employees, setEmployees] = useState(12);
  const [margin, setMargin] = useState(28);
  const [sector, setSector] = useState('real_estate');

  const s = SECTORS[sector];

  const { savings, revenue, totalSavings, totalRevenue } = useMemo(() => {
    const monthlyHrsSaved = employees * s.hrsSaved * 22;
    const monthlyCostSaved = monthlyHrsSaved * s.avgRate;

    const savings: number[] = [];
    const revenue: number[] = [];
    let cumSavings = 0;
    let cumRevenue = 0;

    for (let m = 0; m < 12; m++) {
      // Savings ramp up: starts at 40% month 1, reaches 100% by month 4
      const ramp = Math.min(1, 0.4 + m * 0.18);
      cumSavings += monthlyCostSaved * ramp;

      // Revenue uplift: S-curve, driven by margin × lead boost
      const sCurve = 1 / (1 + Math.exp(-0.9 * (m - 4)));
      const monthlyRevUp = employees * (s.avgRate * 160) * margin / 100 * s.leadBoost * sCurve;
      cumRevenue += monthlyRevUp;

      savings.push(Math.round(cumSavings));
      revenue.push(Math.round(cumRevenue));
    }

    return { savings, revenue, totalSavings: cumSavings, totalRevenue: cumRevenue };
  }, [employees, margin, sector, s]);

  const roi = totalSavings > 0 ? Math.round(((totalSavings + totalRevenue) / (totalSavings * 0.15 + 8000)) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--y)', marginBottom: 6 }}>ROI Calculator</div>
          <div style={{ fontSize: 13, color: '#555', maxWidth: 400 }}>
            Adjust the inputs to see your projected 12-month return from automation.
          </div>
        </div>
        {/* Sector selector */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {Object.entries(SECTORS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setSector(key)}
              style={{
                padding: '6px 14px', fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Exo, sans-serif',
                border: `1px solid ${sector === key ? val.color : '#222'}`,
                background: sector === key ? 'rgba(255,255,255,0.04)' : 'transparent',
                color: sector === key ? val.color : '#444',
                transition: 'all .15s',
              }}
            >{val.label}</button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40, alignItems: 'start' }}>
        {/* Left: controls */}
        <div>
          <Slider label="Employees" min={1} max={100} value={employees} onChange={setEmployees} />
          <Slider label="Avg margin" min={5} max={80} value={margin} onChange={setMargin} unit="%" />

          {/* Summary metrics */}
          <div style={{ marginTop: 8, paddingTop: 20, borderTop: '1px solid #1a1a1a' }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#444', marginBottom: 4 }}>Cost savings</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--c)', letterSpacing: -1.5, lineHeight: 1 }}>{fmt(totalSavings)}</div>
              <div style={{ fontSize: 11, color: '#444', marginTop: 3 }}>over 12 months</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#444', marginBottom: 4 }}>Revenue uplift</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color, letterSpacing: -1.5, lineHeight: 1 }}>{fmt(totalRevenue)}</div>
              <div style={{ fontSize: 11, color: '#444', marginTop: 3 }}>over 12 months</div>
            </div>
            <div style={{ padding: '12px 14px', background: 'rgba(242,194,0,0.06)', border: '1px solid rgba(242,194,0,0.15)' }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 4 }}>Est. ROI</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--y)', letterSpacing: -2, lineHeight: 1 }}>{roi}×</div>
            </div>
          </div>
        </div>

        {/* Right: chart */}
        <div>
          <LineChart savings={savings} revenue={revenue} color={s.color} />
          <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#555' }}>
              <svg width="20" height="3"><line x1="0" y1="1.5" x2="20" y2="1.5" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" /></svg>
              Cumulative revenue uplift
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#555' }}>
              <svg width="20" height="3"><line x1="0" y1="1.5" x2="20" y2="1.5" stroke="var(--c)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 3" /></svg>
              Cumulative cost savings
            </div>
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: '#333' }}>
            Based on {SECTORS[sector].label.toLowerCase()} benchmarks — {employees} employees, {margin}% margin.
            Assumes {Math.round(s.hrsSaved * 10) / 10} hrs/day recovered per person from automation.
          </div>
        </div>
      </div>
    </div>
  );
}
