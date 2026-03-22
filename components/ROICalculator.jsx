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
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <g key={i}>
          <line x1={PL} x2={W - PR} y1={PT + iH * (1 - t)} y2={PT + iH * (1 - t)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x={PL - 5} y={PT + iH * (1 - t) + 4} textAnchor="end" fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="Exo,sans-serif" fontWeight="700">
            {fmtAED(Math.round(maxB * t))}
          </text>
        </g>
      ))}
      {zY >= PT && zY <= PT + iH && (
        <line x1={PL} x2={W - PR} y1={zY} y2={zY} stroke="var(--y)" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" />
      )}
      {monthly.map((v, i) => {
        const h = Math.max((v / maxB) * iH, 0);
        return <rect key={i} x={bx(i)} y={PT + iH - h} width={bw} height={h} fill={`rgba(242,194,0,${(0.25 + (i / 12) * 0.65).toFixed(2)})`} />;
      })}
      <path d={lp} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      {cumulative.map((v, i) => (
        <circle key={i} cx={cx(i)} cy={cy(v)} r="3" fill={v >= 0 ? 'var(--y)' : '#333'} />
      ))}
      {[1, 3, 6, 9, 12].map(m => (
        <text key={m} x={cx(m - 1)} y={H - 7} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="Exo,sans-serif" fontWeight="700">M{m}</text>
      ))}
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
  const [chartKey, setChartKey] = useState(0);

  const result = useMemo(() => {
    const r = sector ? calcROI(sector, employees, margin) : null;
    if (r) setChartKey(k => k + 1);
    return r;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sector, employees, margin]);

  return (
    <div className="roi-wrap">
      <div className="roi-inner">

        {/* Header */}
        <div className="eyebrow y">Free estimate</div>
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: -1, lineHeight: 1.05, marginBottom: 10, color: '#fff' }}>
          Estimate your automation ROI
        </h2>
        <p className="hero-desc" style={{ marginBottom: 40 }}>
          Select your sector, team size, and margin — we&apos;ll project your savings month by month.
        </p>

        <div className="roi-layout">

          {/* ── INPUTS ── */}
          <div className="roi-inputs">

            <div className="roi-group">
              <div className="roi-step-lbl"><span className="roi-step-n">01</span> Sector</div>
              <div className="roi-chips">
                {Object.keys(SECTORS).map(s => (
                  <button key={s} onClick={() => setSector(s)} className={`roi-chip${sector === s ? ' on' : ''}`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="roi-group">
              <div className="roi-group-hd">
                <div className="roi-step-lbl"><span className="roi-step-n">02</span> Team size</div>
                <span className="roi-cur-val">{employees}</span>
              </div>
              <input type="range" min={1} max={150} step={1} value={employees}
                onChange={e => setEmpl(Number(e.target.value))} className="roi-slider" />
              <div className="roi-bounds"><span>1</span><span>150+</span></div>
            </div>

            <div className="roi-group">
              <div className="roi-group-hd">
                <div className="roi-step-lbl"><span className="roi-step-n">03</span> Gross margin</div>
                <span className="roi-cur-val">{margin}%</span>
              </div>
              <input type="range" min={5} max={90} step={1} value={margin}
                onChange={e => setMargin(Number(e.target.value))} className="roi-slider" />
              <div className="roi-bounds"><span>5%</span><span>90%</span></div>
            </div>

          </div>

          {/* ── RESULTS ── */}
          <div>
            {!result ? (
              <div className="roi-empty">
                <span style={{ fontSize: 28, color: 'var(--y)', opacity: 0.3 }}>→</span>
                <p style={{ color: 'var(--m)', fontSize: 13, fontWeight: 300 }}>Select a sector above to see your projection</p>
              </div>
            ) : (
              <>
                <div className="roi-metrics">
                  {[
                    [fmtAED(result.annual),        'Year-1 savings'],
                    [fmtAED(result.fullMonthly),    'Monthly at speed'],
                    [result.be ? `Month ${result.be}` : '—', 'Breakeven'],
                  ].map(([v, l], i) => (
                    <div key={i} className="roi-metric">
                      <div className="roi-metric-v">{v}</div>
                      <div className="roi-metric-l">{l}</div>
                    </div>
                  ))}
                </div>

                <div className="roi-setup-note">
                  Est. investment: <strong style={{ color: 'var(--y)', fontWeight: 800 }}>{fmtAED(result.setup)}</strong> one-time &nbsp;·&nbsp; Build, integration &amp; handover included
                </div>

                <div className="roi-chart-wrap">
                  <ROIChart key={chartKey} monthly={result.monthly} cumulative={result.cumulative} setup={result.setup} />
                  <div className="roi-chart-note">Bars = monthly savings &nbsp;·&nbsp; Line = cumulative net &nbsp;·&nbsp; Dashed = breakeven threshold</div>
                </div>

                <div className="roi-cta">
                  <a href="https://calendly.com/tergo-media/30min" target="_blank" rel="noopener noreferrer" className="btn btn-y">
                    Book a free audit call →
                  </a>
                  <span className="roi-cta-note">We&apos;ll validate this for your specific workflows</span>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="roi-disclaimer">
          Estimates based on industry benchmarks and Tergo Media client deployments. Directional only — not a guarantee.
        </p>
      </div>
    </div>
  );
}
