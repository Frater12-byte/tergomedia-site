'use client';
import { useEffect, useRef, useState } from 'react';

const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];

// Panel 1: Lead volume & pipeline value
const leadsData = {
  series: [
    { label: 'Leads captured / mo', color: 'var(--y)', values: [38, 61, 84, 112, 143, 178] },
    { label: 'Pipeline value (AED k)', color: 'var(--c)', values: [120, 195, 310, 445, 590, 780] },
  ],
  yLabel: 'Volume / AED k',
};

// Panel 2: Cost savings & team load
const savingsData = {
  series: [
    { label: 'Hours saved / week', color: 'var(--p)', values: [4, 11, 22, 34, 46, 58] },
    { label: 'Manual tasks remaining (%)', color: 'var(--r)', values: [92, 74, 55, 38, 24, 14] },
  ],
  yLabel: 'Hours / %',
};

function LineChart({ series, yLabel, animated }: {
  series: { label: string; color: string; values: number[] }[];
  yLabel: string;
  animated: boolean;
}) {
  const W = 420, H = 180, padL = 10, padR = 10, padT = 12, padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const allVals = series.flatMap(s => s.values);
  const min = 0;
  const max = Math.ceil(Math.max(...allVals) * 1.15 / 10) * 10;

  const xPos = (i: number) => padL + (i / (months.length - 1)) * chartW;
  const yPos = (v: number) => padT + chartH - ((v - min) / (max - min)) * chartH;

  const toPoints = (values: number[]) =>
    values.map((v, i) => `${xPos(i)},${yPos(v)}`).join(' ');

  // Smooth path using cubic bezier
  const toPath = (values: number[]) => {
    const pts = values.map((v, i) => [xPos(i), yPos(v)]);
    if (pts.length < 2) return '';
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const cp1x = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * 0.45;
      const cp1y = pts[i - 1][1];
      const cp2x = pts[i][0] - (pts[i][0] - pts[i - 1][0]) * 0.45;
      const cp2y = pts[i][1];
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[i][0]} ${pts[i][1]}`;
    }
    return d;
  };

  const gridLines = 4;

  return (
    <div style={{ width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
        {/* Grid lines */}
        {Array.from({ length: gridLines + 1 }, (_, i) => {
          const y = padT + (i / gridLines) * chartH;
          return <line key={i} x1={padL} y1={y} x2={W - padR} y2={y} stroke="#1a1a1a" strokeWidth="1" />;
        })}
        {/* X axis labels */}
        {months.map((m, i) => (
          <text key={m} x={xPos(i)} y={H - 6} textAnchor="middle" fill="#444" fontSize="9" fontFamily="Exo, sans-serif" fontWeight="700" letterSpacing="1">{m}</text>
        ))}
        {/* Lines */}
        {series.map((s) => {
          const path = toPath(s.values);
          return (
            <g key={s.label}>
              <path
                d={path}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: animated ? 0 : 1000,
                  transition: animated ? 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
                }}
              />
              {/* Dots */}
              {s.values.map((v, i) => (
                <circle
                  key={i}
                  cx={xPos(i)}
                  cy={yPos(v)}
                  r="3.5"
                  fill={s.color}
                  style={{
                    opacity: animated ? 1 : 0,
                    transition: animated ? `opacity 0.3s ease ${0.8 + i * 0.1}s` : 'none',
                  }}
                />
              ))}
              {/* Last value label */}
              <text
                x={xPos(s.values.length - 1) + 6}
                y={yPos(s.values[s.values.length - 1]) + 4}
                fill={s.color}
                fontSize="9"
                fontFamily="Exo, sans-serif"
                fontWeight="800"
                style={{ opacity: animated ? 1 : 0, transition: animated ? 'opacity 0.4s ease 1.4s' : 'none' }}
              >
                {s.values[s.values.length - 1]}
              </text>
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 8 }}>
        {series.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: '#666' }}>
            <svg width="20" height="3"><line x1="0" y1="1.5" x2="20" y2="1.5" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" /></svg>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GrowthChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setAnimated(true), 150); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        {/* Panel 1 */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--y)', marginBottom: 4 }}>
            Lead volume &amp; pipeline
          </div>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 16 }}>
            Leads captured and pipeline value (AED) over 6 months post-automation
          </div>
          <LineChart series={leadsData.series} yLabel={leadsData.yLabel} animated={animated} />
        </div>
        {/* Panel 2 */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--p)', marginBottom: 4 }}>
            Team efficiency &amp; cost savings
          </div>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 16 }}>
            Hours saved per week and % of manual tasks remaining across the team
          </div>
          <LineChart series={savingsData.series} yLabel={savingsData.yLabel} animated={animated} />
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, color: '#444' }}>Composite across 12 clients — first 6 months post-launch</div>
        <div style={{ fontSize: 11, color: 'var(--c)', fontWeight: 700 }}>Month 1 = go-live →</div>
      </div>
    </div>
  );
}
