'use client';
import { useState, useMemo, useEffect } from 'react';

const Y = '#F2C200'; // matches var(--y)

const SECTORS = {
  'Real Estate':           { hours: 6 },
  'Travel & Hospitality':  { hours: 5 },
  'Professional Services': { hours: 8 },
  'Agriculture':           { hours: 4 },
  'E-commerce':            { hours: 5 },
  'Other':                 { hours: 5 },
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const RAMP   = [0.30, 0.30, 0.65, 0.65, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

function fmtUSD(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString('en-US')}`;
}
function fmtHrs(n) {
  return `${Math.round(n).toLocaleString('en-US')} hrs`;
}

function calcROI(sector, employees, margin) {
  const hours = SECTORS[sector].hours;
  const hourlyRate = 25 + ((margin - 5) / (90 - 5)) * 10;
  const peakMonthly = Math.min(employees * hours * 0.5 * 4.33 * hourlyRate, 80000);
  const monthly = RAMP.map(r => Math.round(peakMonthly * r));
  const annual = monthly.reduce((a, b) => a + b, 0);
  let cum = 0;
  const cumulative = monthly.map(m => { cum += m; return cum; });
  const hoursPerYear = Math.round(employees * hours * 0.5 * 52);
  return { monthly, cumulative, annual, peakMonthly: Math.round(peakMonthly), hoursPerYear };
}

function ROIChart({ monthly, cumulative }) {
  const [hovered, setHovered] = useState(null);

  const W = 600, H = 260;
  const PL = 68, PR = 68, PT = 20, PB = 36;
  const iW = W - PL - PR, iH = H - PT - PB;

  const maxM = Math.max(...monthly, 1);
  const maxC = Math.max(...cumulative, 1);

  const bgW = iW / 12;
  const bw  = bgW * 0.52;
  const bxFn  = i => PL + i * bgW + bgW * 0.24;
  const cxFn  = i => PL + i * bgW + bgW / 2;
  const barH  = v => Math.max((v / maxM) * iH, 1);
  const barYFn  = v => PT + iH - barH(v);
  const lineYFn = v => PT + iH * (1 - v / maxC);
  const barOp = i => i < 2 ? 0.38 : i < 4 ? 0.68 : 1.0;

  // Smooth bezier path through cumulative points
  const pts = cumulative.map((v, i) => [cxFn(i), lineYFn(v)]);
  let lp = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const dx = (x1 - x0) / 3;
    lp += ` C ${x0 + dx} ${y0}, ${x1 - dx} ${y1}, ${x1} ${y1}`;
  }

  const animCSS = `
    @keyframes _barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
    @keyframes _lineIn  { to   { stroke-dashoffset: 0; } }
    @keyframes _dotIn   { from { opacity:0; transform:scale(0); } to { opacity:1; transform:scale(1); } }
    @media (prefers-reduced-motion: reduce) {
      .rba,.rla,.rda { animation: none !important; stroke-dashoffset: 0 !important; }
    }
  `;

  const gridTs = [0.25, 0.5, 0.75, 1.0];

  return (
    <div style={{ position: 'relative' }}>
      <style>{animCSS}</style>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>

        {/* Grid */}
        {gridTs.map((t, i) => (
          <line key={i} x1={PL} x2={W - PR}
            y1={PT + iH * (1 - t)} y2={PT + iH * (1 - t)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}

        {/* Left Y-axis (monthly) */}
        {[0, 0.5, 1].map((t, i) => (
          <text key={i} x={PL - 8} y={PT + iH * (1 - t) + 4}
            textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.28)"
            fontFamily="Exo, sans-serif">
            {t === 0 ? '$0' : fmtUSD(maxM * t)}
          </text>
        ))}

        {/* Right Y-axis (cumulative) */}
        {[0, 0.5, 1].map((t, i) => (
          <text key={i} x={W - PR + 8} y={PT + iH * (1 - t) + 4}
            textAnchor="start" fontSize="9" fill={`rgba(242,194,0,${t === 0 ? 0.25 : 0.45})`}
            fontFamily="Exo, sans-serif">
            {t === 0 ? '$0' : fmtUSD(maxC * t)}
          </text>
        ))}

        {/* Axis labels */}
        <text x={PL} y={PT - 7} fontSize="8" fill="rgba(255,255,255,0.2)"
          fontFamily="Exo, sans-serif" letterSpacing="1">MONTHLY</text>
        <text x={W - PR} y={PT - 7} textAnchor="end" fontSize="8"
          fill={`rgba(242,194,0,0.35)`} fontFamily="Exo, sans-serif" letterSpacing="1">CUMULATIVE</text>

        {/* Bars */}
        {monthly.map((v, i) => {
          const h = barH(v);
          const bx = bxFn(i);
          const by = barYFn(v);
          const isHov = hovered === i;
          return (
            <g key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}>
              <rect x={bx} y={by} width={bw} height={h}
                fill={Y}
                opacity={isHov ? 1 : barOp(i)}
                className="rba"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'bottom',
                  animation: `_barGrow 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s both`,
                }} />
              {/* invisible wide hit-area */}
              <rect x={bx - 4} y={PT} width={bw + 8} height={iH} fill="transparent" />
            </g>
          );
        })}

        {/* Cumulative line */}
        <path d={lp} fill="none"
          stroke="rgba(255,255,255,0.55)" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
          pathLength="1" className="rla"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: '_lineIn 1.1s cubic-bezier(0.4,0,0.2,1) 0.35s forwards',
          }} />

        {/* Cumulative dots */}
        {cumulative.map((v, i) => (
          <circle key={i}
            cx={cxFn(i)} cy={lineYFn(v)}
            r={i === 11 ? 4 : 2.5}
            fill={i === 11 ? Y : 'rgba(255,255,255,0.75)'}
            className="rda"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: `_dotIn 0.3s ease ${0.35 + i * 0.08}s both`,
            }} />
        ))}

        {/* Month-12 annotation */}
        <g style={{ animation: `_dotIn 0.4s ease 1.35s both` }} className="rda">
          <rect
            x={cxFn(11) - 28} y={lineYFn(cumulative[11]) - 26}
            width={56} height={18}
            fill="rgba(242,194,0,0.12)" stroke={`rgba(242,194,0,0.35)`} strokeWidth="1" />
          <text x={cxFn(11)} y={lineYFn(cumulative[11]) - 13}
            textAnchor="middle" fontSize="9" fontWeight="700" fill={Y}
            fontFamily="Exo, sans-serif">
            {fmtUSD(cumulative[11])}
          </text>
        </g>

        {/* Month labels */}
        {MONTHS.map((m, i) => (
          <text key={i} x={cxFn(i)} y={H - 6}
            textAnchor="middle" fontSize="9"
            fill={hovered === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)'}
            fontFamily="Exo, sans-serif">
            {m}
          </text>
        ))}

        {/* Tooltip */}
        {hovered !== null && (() => {
          const tx0 = cxFn(hovered);
          const tw = 124, th = 56;
          const tx = Math.min(Math.max(tx0 - tw / 2, PL), W - PR - tw);
          const ty = Math.max(barYFn(monthly[hovered]) - th - 8, PT);
          return (
            <g pointerEvents="none">
              <rect x={tx} y={ty} width={tw} height={th}
                fill="#191919" stroke={Y} strokeWidth="1" />
              <text x={tx + tw / 2} y={ty + 15} textAnchor="middle"
                fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.45)"
                fontFamily="Exo, sans-serif" letterSpacing="1.5">
                {MONTHS[hovered].toUpperCase()}
              </text>
              <text x={tx + tw / 2} y={ty + 33} textAnchor="middle"
                fontSize="13" fontWeight="700" fill={Y}
                fontFamily="Exo, sans-serif">
                {fmtUSD(monthly[hovered])}
              </text>
              <text x={tx + tw / 2} y={ty + 50} textAnchor="middle"
                fontSize="9" fill="rgba(255,255,255,0.35)"
                fontFamily="Exo, sans-serif">
                Cum: {fmtUSD(cumulative[hovered])}
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

export default function ROICalculator() {
  const [sector, setSector]     = useState('');
  const [employees, setEmployees] = useState(25);
  const [margin, setMargin]     = useState(45);
  const [chartKey, setChartKey] = useState(0);

  const result = useMemo(() => sector ? calcROI(sector, employees, margin) : null,
    [sector, employees, margin]);

  useEffect(() => { if (result) setChartKey(k => k + 1); }, [result]);

  const inputLabel = (num, text) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
      fontFamily: "'Exo', sans-serif",
    }}>
      <span style={{ color: Y }}>{num}</span>{text}
    </div>
  );

  return (
    <section style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: '#0d0d0d',
    }}>
      <style>{`
        .roi-layout-r { display: grid; grid-template-columns: minmax(260px,320px) 1fr; gap: 52px; align-items: start; }
        .roi-stat-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(255,255,255,0.07); }
        @media (max-width: 768px) {
          .roi-layout-r { grid-template-columns: 1fr; gap: 36px; }
          .roi-stat-cards { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .roi-stat-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(56px,8vw,96px) clamp(24px,5vw,72px)' }}>

        {/* Header */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: Y,
          marginBottom: 18, fontFamily: "'Exo', sans-serif",
        }}>
          <span style={{ width: 18, height: 1, background: Y, display: 'inline-block' }} />
          Free estimate
        </div>
        <h2 style={{
          fontFamily: "'Exo', sans-serif",
          fontSize: 'clamp(28px,4vw,46px)',
          fontWeight: 800, letterSpacing: '-1.5px',
          lineHeight: 1.0, color: '#fff', marginBottom: 12,
        }}>
          What could automation<br />save you?
        </h2>
        <p style={{
          fontFamily: "'Exo', sans-serif",
          fontSize: 15, color: 'rgba(255,255,255,0.4)',
          fontWeight: 300, lineHeight: 1.7, marginBottom: 48,
          maxWidth: 480,
        }}>
          Adjust the inputs — we&apos;ll model your savings in real time.
        </p>

        <div className="roi-layout-r">

          {/* ── INPUTS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Sector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {inputLabel('01', 'Sector')}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {Object.keys(SECTORS).map(s => (
                  <button key={s} onClick={() => setSector(s)} style={{
                    padding: '7px 13px',
                    border: `1px solid ${sector === s ? Y : 'rgba(255,255,255,0.1)'}`,
                    background: sector === s ? 'rgba(242,194,0,0.08)' : 'transparent',
                    color: sector === s ? Y : 'rgba(255,255,255,0.4)',
                    fontSize: 11, fontWeight: 600,
                    fontFamily: "'Exo', sans-serif",
                    cursor: 'pointer', transition: 'all 0.15s',
                    letterSpacing: '0.02em',
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Team size */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                {inputLabel('02', 'Team size')}
                <span style={{
                  fontSize: 26, fontWeight: 800, color: '#fff',
                  letterSpacing: '-1px', fontFamily: "'Exo', sans-serif", lineHeight: 1,
                }}>{employees}</span>
              </div>
              <input type="range" min={1} max={200} step={1} value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                style={{ width: '100%', accentColor: Y, cursor: 'pointer', height: 3 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'rgba(255,255,255,0.18)', fontFamily: "'Exo', sans-serif" }}>
                <span>1</span><span>200</span>
              </div>
            </div>

            {/* Gross margin */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                {inputLabel('03', 'Gross margin')}
                <span style={{
                  fontSize: 26, fontWeight: 800, color: '#fff',
                  letterSpacing: '-1px', fontFamily: "'Exo', sans-serif", lineHeight: 1,
                }}>{margin}%</span>
              </div>
              <input type="range" min={5} max={90} step={1} value={margin}
                onChange={e => setMargin(Number(e.target.value))}
                style={{ width: '100%', accentColor: Y, cursor: 'pointer', height: 3 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'rgba(255,255,255,0.18)', fontFamily: "'Exo', sans-serif" }}>
                <span>5%</span><span>90%</span>
              </div>
            </div>

          </div>

          {/* ── RESULTS ── */}
          <div>
            {!result ? (
              <div style={{
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: 300,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 10, textAlign: 'center',
                color: 'rgba(255,255,255,0.18)',
              }}>
                <span style={{ fontSize: 28 }}>→</span>
                <p style={{ fontSize: 13, fontFamily: "'Exo', sans-serif", fontWeight: 300 }}>
                  Select a sector to see your projection
                </p>
              </div>
            ) : (
              <>
                {/* Stat cards */}
                <div className="roi-stat-cards" style={{ marginBottom: 1 }}>
                  {[
                    { label: 'Monthly at peak',  value: fmtUSD(result.peakMonthly) },
                    { label: 'Annual impact',     value: fmtUSD(result.annual) },
                    { label: 'Hours recovered',   value: fmtHrs(result.hoursPerYear) },
                  ].map((s, i) => (
                    <div key={i} style={{ background: '#0d0d0d', padding: '20px 18px' }}>
                      <div style={{
                        fontSize: 'clamp(18px,2vw,24px)',
                        fontWeight: 800, color: Y,
                        letterSpacing: '-0.5px', lineHeight: 1,
                        fontFamily: "'Exo', sans-serif", marginBottom: 7,
                      }}>
                        {s.value}
                      </div>
                      <div style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.13em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                        fontFamily: "'Exo', sans-serif",
                      }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div style={{
                  background: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderTop: 'none', padding: '20px 12px 10px',
                }}>
                  <ROIChart key={chartKey} monthly={result.monthly} cumulative={result.cumulative} />
                  <div style={{ display: 'flex', gap: 18, marginTop: 10, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 10, background: Y, display: 'inline-block', flexShrink: 0 }} />
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', fontFamily: "'Exo', sans-serif", letterSpacing: '1px' }}>MONTHLY SAVINGS</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 16, height: 2, background: 'rgba(255,255,255,0.5)', display: 'inline-block', flexShrink: 0 }} />
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', fontFamily: "'Exo', sans-serif", letterSpacing: '1px' }}>CUMULATIVE</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <a href="https://calendly.com/tergo-media/30min" target="_blank" rel="noopener noreferrer"
                    style={{
                      background: Y, color: '#000',
                      fontFamily: "'Exo', sans-serif",
                      fontWeight: 700, fontSize: 13,
                      letterSpacing: '0.04em', padding: '14px 28px',
                      textDecoration: 'none', display: 'inline-block',
                      transition: 'opacity 0.2s',
                    }}>
                    Book a free audit call →
                  </a>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: "'Exo', sans-serif", fontWeight: 300 }}>
                    We&apos;ll validate this for your workflows
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <p style={{
          marginTop: 40, fontSize: 11, color: 'rgba(255,255,255,0.13)',
          fontFamily: "'Exo', sans-serif", fontWeight: 300, lineHeight: 1.6,
        }}>
          Estimates based on industry benchmarks. Conservative baseline — actual results vary by workflow complexity.
        </p>
      </div>
    </section>
  );
}
