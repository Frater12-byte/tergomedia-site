// ROICalculator.jsx — styled to match Tergo Media design system
'use client';
import { useState, useMemo } from 'react';

const SECTORS = {
  'Real Estate':           { mh: 18, hv: 220, sb: 28000, spe: 400 },
  'Travel & Hospitality':  { mh: 22, hv: 160, sb: 24000, spe: 350 },
  'Professional Services': { mh: 16, hv: 280, sb: 32000, spe: 500 },
  'Agriculture':           { mh: 20, hv: 120, sb: 20000, spe: 300 },
  'E-commerce':            { mh: 24, hv: 140, sb: 22000, spe: 350 },
  'Other':                 { mh: 18, hv: 160, sb: 24000, spe: 380 },
};

const RAMP = [0.15, 0.35, 0.60, 0.78, 0.88, 0.93, 0.96, 0.98, 1.0, 1.0, 1.0, 1.0];

function fmtAED(n) {
  if (n >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `AED ${Math.round(n / 1_000)}K`;
  return `AED ${Math.round(n)}`;
}

function calcROI(sector, employees, margin) {
  const { mh, hv, sb, spe } = SECTORS[sector];
  const full = employees * mh * hv * (margin / 100);
  const setup = sb + employees * spe;
  const monthly = RAMP.map(r => Math.round(full * r));
  const annual = monthly.reduce((a, b) => a + b, 0);
  let cum = -setup, be = null;
  const cumulative = monthly.map((m, i) => {
    cum += m;
    if (cum >= 0 && be === null) be = i + 1;
    return Math.round(cum);
  });
  return { monthly, cumulative, annual, setup, fullMonthly: Math.round(full), be };
}

function ROIChart({ monthly, cumulative, setup }) {
  const W = 540, H = 200, PL = 58, PR = 12, PT = 18, PB = 32;
  const iW = W - PL - PR, iH = H - PT - PB;
  const maxB = Math.max(...monthly, 1);
  const minC = Math.min(...cumulative, -setup);
  const maxC = Math.max(...cumulative, 1);
  const rng = maxC - minC || 1;
  const bg = iW / 12;
  const bw = bg * 0.52;
  const bx = i => PL + i * bg + bg * 0.24;
  const cx = i => PL + i * bg + bg / 2;
  const cy = v => PT + iH * (1 - (v - minC) / rng);
  const zY = cy(0);
  const lp = cumulative.map((v, i) => `${i === 0 ? 'M' : 'L'}${cx(i).toFixed(1)} ${cy(v).toFixed(1)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <g key={i}>
          <line x1={PL} x2={W - PR} y1={PT + iH * (1 - t)} y2={PT + iH * (1 - t)}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x={PL - 5} y={PT + iH * (1 - t) + 4} textAnchor="end"
            fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="Exo,sans-serif" fontWeight="700">
            {fmtAED(Math.round(maxB * t))}
          </text>
        </g>
      ))}
      {/* breakeven line */}
      {zY >= PT && zY <= PT + iH && (
        <line x1={PL} x2={W - PR} y1={zY} y2={zY}
          stroke="var(--y)" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" />
      )}
      {/* bars */}
      {monthly.map((v, i) => {
        const h = Math.max((v / maxB) * iH, 0);
        return (
          <rect key={i} x={bx(i)} y={PT + iH - h} width={bw} height={h}
            fill={`rgba(242,194,0,${(0.25 + (i / 12) * 0.65).toFixed(2)})`} />
        );
      })}
      {/* cumulative line */}
      <path d={lp} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      {cumulative.map((v, i) => (
        <circle key={i} cx={cx(i)} cy={cy(v)} r="3"
          fill={v >= 0 ? 'var(--y)' : '#333'} />
      ))}
      {/* x labels */}
      {[1, 3, 6, 9, 12].map(m => (
        <text key={m} x={cx(m - 1)} y={H - 7} textAnchor="middle"
          fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="Exo,sans-serif" fontWeight="700">
          M{m}
        </text>
      ))}
      {/* legend */}
      <rect x={PL} y={PT - 13} width={9} height={9} fill="rgba(242,194,0,0.6)" />
      <text x={PL + 14} y={PT - 5} fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="Exo,sans-serif" fontWeight="700" letterSpacing="1">MONTHLY SAVINGS</text>
      <line x1={PL + 118} x2={PL + 132} y1={PT - 9} y2={PT - 9} stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <text x={PL + 136} y={PT - 5} fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="Exo,sans-serif" fontWeight="700" letterSpacing="1">CUMULATIVE NET</text>
    </svg>
  );
}

export default function ROICalculator() {
  const [sector, setSector]  = useState('');
  const [employees, setEmpl] = useState(15);
  const [margin, setMargin]  = useState(45);

  const result = useMemo(
    () => sector ? calcROI(sector, employees, margin) : null,
    [sector, employees, margin]
  );

  return (
    <div style={{ borderTop: '1px solid var(--b)', borderBottom: '1px solid var(--b)', fontFamily: "'Exo', sans-serif" }}>
      <style>{`
        .roi-inner { max-width: 1100px; margin: 0 auto; padding: clamp(40px,6vw,80px) clamp(24px,5vw,72px); }
        .roi-grid  { display: grid; grid-template-columns: minmax(260px,380px) 1fr; gap: 56px; align-items: start; }
        .roi-card  { background: var(--card); border: 1px solid var(--b); padding: clamp(24px,3vw,36px); }
        .roi-chip  { display: inline-block; padding: 6px 12px; border: 1px solid var(--b); background: transparent;
                     color: var(--m); font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
                     font-family: 'Exo', sans-serif; cursor: pointer; transition: all .15s; }
        .roi-chip.active { border-color: var(--ybr); color: var(--y); background: var(--yb); }
        .roi-chip:hover:not(.active) { border-color: var(--b2); color: #ccc; }
        .roi-metric-val { font-size: clamp(18px,2.5vw,26px); font-weight: 900; color: var(--y);
                          letter-spacing: -1px; line-height: 1; font-variant-numeric: tabular-nums; }
        .roi-metric-lbl { font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--m); margin-top: 4px; }
        .roi-metrics    { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--b); margin-bottom: 20px; }
        .roi-metric-blk { background: var(--card); padding: 16px; }
        @media (max-width: 900px) {
          .roi-grid    { grid-template-columns: 1fr; gap: 32px; }
          .roi-metrics { grid-template-columns: 1fr 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .roi-metrics { grid-template-columns: 1fr; }
          .roi-inner   { padding: 32px 16px; }
        }
      `}</style>

      <div className="roi-inner">
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--y)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--y)' }} />
            Free estimate
          </div>
          <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: -1, lineHeight: 1.05, marginBottom: 10, color: '#fff' }}>
            Estimate your automation ROI
          </h2>
          <p style={{ fontSize: 15, color: 'var(--m)', lineHeight: 1.8, maxWidth: 560, fontWeight: 300 }}>
            Select your sector, team size, and margin — we&apos;ll project your savings month by month.
          </p>
        </div>

        <div className="roi-grid">
          {/* INPUTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            <div>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--m)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--y)', fontFamily: 'monospace', fontSize: 10 }}>01</span> Sector
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {Object.keys(SECTORS).map(s => (
                  <button key={s} onClick={() => setSector(s)} className={`roi-chip${sector === s ? ' active' : ''}`}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--m)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--y)', fontFamily: 'monospace', fontSize: 10 }}>02</span> Team size
                </div>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: -1, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{employees}</span>
              </div>
              <input type="range" min={1} max={150} step={1} value={employees}
                onChange={e => setEmpl(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--y)', cursor: 'pointer', height: 3 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, color: 'var(--b2)', fontWeight: 700, letterSpacing: 1 }}>
                <span>1</span><span>150+</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--m)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--y)', fontFamily: 'monospace', fontSize: 10 }}>03</span> Gross margin
                </div>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: -1, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{margin}%</span>
              </div>
              <input type="range" min={5} max={90} step={1} value={margin}
                onChange={e => setMargin(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--y)', cursor: 'pointer', height: 3 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, color: 'var(--b2)', fontWeight: 700, letterSpacing: 1 }}>
                <span>5%</span><span>90%</span>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div>
            {!result ? (
              <div style={{ border: '1px solid var(--b)', padding: '56px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, minHeight: 280, textAlign: 'center' }}>
                <div style={{ fontSize: 28, color: 'var(--y)', opacity: 0.3 }}>→</div>
                <p style={{ color: 'var(--m)', fontSize: 13, fontWeight: 300, letterSpacing: 0.5 }}>Select a sector above to see your projection</p>
              </div>
            ) : (
              <div>
                {/* Metric tiles */}
                <div className="roi-metrics">
                  {[
                    [fmtAED(result.annual),             'Year-1 savings'],
                    [fmtAED(result.fullMonthly),         'Monthly at speed'],
                    [result.be ? `Month ${result.be}` : '—', 'Breakeven'],
                  ].map(([v, l], i) => (
                    <div key={i} className="roi-metric-blk">
                      <div className="roi-metric-val">{v}</div>
                      <div className="roi-metric-lbl">{l}</div>
                    </div>
                  ))}
                </div>

                {/* Setup note */}
                <div style={{ fontSize: 12, color: 'var(--m)', background: 'var(--card)', border: '1px solid var(--b)', padding: '10px 14px', lineHeight: 1.6, marginBottom: 20, fontWeight: 300 }}>
                  Est. investment: <strong style={{ color: 'var(--y)', fontWeight: 800 }}>{fmtAED(result.setup)}</strong> one-time &nbsp;·&nbsp; Build, integration &amp; handover included
                </div>

                {/* Chart */}
                <div style={{ background: 'var(--card)', border: '1px solid var(--b)', padding: '20px 16px 12px', marginBottom: 12 }}>
                  <ROIChart monthly={result.monthly} cumulative={result.cumulative} setup={result.setup} />
                  <div style={{ fontSize: 10, color: '#2e2e2e', fontFamily: 'monospace', lineHeight: 1.5, marginTop: 8 }}>
                    Bars = monthly savings &nbsp;·&nbsp; Line = cumulative net &nbsp;·&nbsp; Dashed = breakeven threshold
                  </div>
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginTop: 20 }}>
                  <a href="https://calendly.com/tergo-media/30min" target="_blank" rel="noopener noreferrer"
                    className="btn btn-y" style={{ textDecoration: 'none' }}>
                    Book a free audit call →
                  </a>
                  <span style={{ fontSize: 12, color: 'var(--m)', fontWeight: 300 }}>We&apos;ll validate this for your specific workflows</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <p style={{ marginTop: 36, fontSize: 11, color: '#2a2a2a', letterSpacing: 0.5, lineHeight: 1.6, fontWeight: 300 }}>
          Estimates based on industry benchmarks and Tergo Media client deployments. Directional only — not a guarantee.
        </p>
      </div>
    </div>
  );
}
