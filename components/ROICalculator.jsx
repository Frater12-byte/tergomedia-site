// ROICalculator.jsx — fully reactive, drop into components/
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
  const W = 540, H = 200, PL = 52, PR = 12, PT = 18, PB = 32;
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
      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <g key={i}>
          <line x1={PL} x2={W - PR} y1={PT + iH * (1 - t)} y2={PT + iH * (1 - t)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={PL - 4} y={PT + iH * (1 - t) + 4} textAnchor="end"
            fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="monospace">
            {fmtAED(Math.round(maxB * t))}
          </text>
        </g>
      ))}
      {/* zero / breakeven line */}
      {zY >= PT && zY <= PT + iH && (
        <line x1={PL} x2={W - PR} y1={zY} y2={zY}
          stroke="#F5C518" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      )}
      {/* bars */}
      {monthly.map((v, i) => {
        const h = Math.max((v / maxB) * iH, 0);
        return (
          <rect key={i} x={bx(i)} y={PT + iH - h} width={bw} height={h}
            fill={`rgba(245,197,24,${(0.3 + (i / 12) * 0.6).toFixed(2)})`} rx="2" />
        );
      })}
      {/* cumulative line */}
      <path d={lp} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
      {cumulative.map((v, i) => (
        <circle key={i} cx={cx(i)} cy={cy(v)} r="3"
          fill={v >= 0 ? '#F5C518' : '#555'} />
      ))}
      {/* x labels */}
      {[1, 3, 6, 9, 12].map(m => (
        <text key={m} x={cx(m - 1)} y={H - 6} textAnchor="middle"
          fontSize="8.5" fill="rgba(255,255,255,0.3)" fontFamily="monospace">
          M{m}
        </text>
      ))}
      {/* legend */}
      <rect x={PL} y={PT - 13} width={9} height={9} fill="rgba(245,197,24,0.7)" rx="1" />
      <text x={PL + 13} y={PT - 5} fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="monospace">Monthly savings</text>
      <line x1={PL + 96} x2={PL + 110} y1={PT - 9} y2={PT - 9} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <text x={PL + 114} y={PT - 5} fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="monospace">Cumulative net</text>
    </svg>
  );
}

export default function ROICalculator() {
  const [sector, setSector]   = useState('');
  const [employees, setEmpl]  = useState(15);
  const [margin, setMargin]   = useState(45);

  // useMemo: recalculates instantly on every state change
  const result = useMemo(
    () => sector ? calcROI(sector, employees, margin) : null,
    [sector, employees, margin]
  );

  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.header}>
          <span style={S.pill}>Free estimate</span>
          <h2 style={S.h2}>Estimate your automation ROI</h2>
          <p style={S.sub}>Select your sector, team size, and margin — we'll project your savings month by month.</p>
        </div>

        <div style={S.grid}>
          {/* INPUTS */}
          <div style={S.inputsCol}>
            <div style={S.group}>
              <div style={S.label}><span style={S.step}>01</span>Sector</div>
              <div style={S.chips}>
                {Object.keys(SECTORS).map(s => (
                  <button key={s} onClick={() => setSector(s)}
                    style={{ ...S.chip, ...(sector === s ? S.chipOn : {}) }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={S.group}>
              <div style={S.label}>
                <span style={S.step}>02</span>Team size
                <span style={S.val}>{employees} employees</span>
              </div>
              <input type="range" min={1} max={150} step={1} value={employees}
                onChange={e => setEmpl(Number(e.target.value))} style={S.slider} />
              <div style={S.bounds}><span>1</span><span>150+</span></div>
            </div>

            <div style={S.group}>
              <div style={S.label}>
                <span style={S.step}>03</span>Gross margin
                <span style={S.val}>{margin}%</span>
              </div>
              <input type="range" min={5} max={90} step={1} value={margin}
                onChange={e => setMargin(Number(e.target.value))} style={S.slider} />
              <div style={S.bounds}><span>5%</span><span>90%</span></div>
            </div>
          </div>

          {/* RESULT */}
          <div>
            {!result ? (
              <div style={S.empty}>
                <span style={{ fontSize: 28, color: 'rgba(245,197,24,0.3)' }}>→</span>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, margin: 0 }}>
                  Select a sector to see your projection
                </p>
              </div>
            ) : (
              <div style={S.card}>
                {/* metrics */}
                <div style={S.metrics}>
                  {[
                    [fmtAED(result.annual),       'Year-1 savings'],
                    [fmtAED(result.fullMonthly),   'Monthly at full speed'],
                    [result.be ? `Month ${result.be}` : '—', 'Breakeven'],
                  ].map(([v, l], i) => (
                    <div key={i} style={S.metricBlock}>
                      {i > 0 && <div style={S.divider} />}
                      <div style={S.metricInner}>
                        <span style={S.metricVal}>{v}</span>
                        <span style={S.metricLbl}>{l}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={S.setupNote}>
                  Est. investment: <strong style={{ color: '#F5C518' }}>{fmtAED(result.setup)}</strong> one-time
                  &nbsp;·&nbsp; Build, integration & handover
                </div>

                <ROIChart monthly={result.monthly} cumulative={result.cumulative} setup={result.setup} />
                <p style={S.chartNote}>Yellow bars = monthly savings · Line = cumulative net · Dashed = breakeven</p>

                <div style={S.cta}>
                  <a href="https://calendly.com/tergo-media/30min" target="_blank"
                    rel="noopener noreferrer" style={S.ctaBtn}>
                    Book a free audit call →
                  </a>
                  <span style={S.ctaTxt}>We'll validate this for your specific workflows</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <p style={S.disclaimer}>
          Estimates based on industry benchmarks and Tergo Media deployments.
          Directional only — not a guarantee.
        </p>
      </div>
    </section>
  );
}

const S = {
  section: { background: '#0f0f0f', backgroundImage: 'radial-gradient(circle,rgba(245,197,24,.07)1px,transparent 1px)', backgroundSize: '28px 28px', padding: '96px 24px', fontFamily: "'DM Sans','Helvetica Neue',sans-serif" },
  inner:   { maxWidth: '1100px', margin: '0 auto' },
  header:  { textAlign: 'center', marginBottom: 48 },
  pill:    { display: 'inline-block', padding: '4px 12px', background: 'rgba(245,197,24,.12)', border: '1px solid rgba(245,197,24,.25)', borderRadius: 100, color: '#F5C518', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 },
  h2:      { color: '#fff', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 700, margin: '0 0 10px', lineHeight: 1.15 },
  sub:     { color: 'rgba(255,255,255,.45)', fontSize: 15, lineHeight: 1.6, maxWidth: 500, margin: '0 auto' },
  grid:    { display: 'grid', gridTemplateColumns: 'minmax(280px,400px) 1fr', gap: 48, alignItems: 'start' },
  inputsCol: { display: 'flex', flexDirection: 'column', gap: 32 },
  group:   { display: 'flex', flexDirection: 'column', gap: 10 },
  label:   { display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,.8)', fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' },
  step:    { color: 'rgba(245,197,24,.6)', fontFamily: 'monospace', fontSize: 10 },
  val:     { marginLeft: 'auto', color: '#F5C518', fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
  chips:   { display: 'flex', flexWrap: 'wrap', gap: 8 },
  chip:    { padding: '7px 13px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 6, color: 'rgba(255,255,255,.55)', fontSize: 12, cursor: 'pointer', transition: 'all .15s', outline: 'none' },
  chipOn:  { background: 'rgba(245,197,24,.12)', borderColor: 'rgba(245,197,24,.45)', color: '#F5C518', fontWeight: 600 },
  slider:  { width: '100%', accentColor: '#F5C518', cursor: 'pointer' },
  bounds:  { display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', fontFamily: 'monospace' },
  empty:   { border: '1px dashed rgba(255,255,255,.1)', borderRadius: 12, padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 300 },
  card:    { background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 },
  metrics: { display: 'flex', alignItems: 'center' },
  metricBlock: { display: 'flex', alignItems: 'center', flex: 1 },
  divider: { width: 1, height: 40, background: 'rgba(255,255,255,.08)', flexShrink: 0 },
  metricInner: { flex: 1, textAlign: 'center', padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 4 },
  metricVal: { color: '#F5C518', fontWeight: 800, fontSize: 'clamp(13px,1.8vw,20px)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 },
  metricLbl: { color: 'rgba(255,255,255,.35)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.05em', lineHeight: 1.3 },
  setupNote: { fontSize: 12, color: 'rgba(255,255,255,.35)', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', borderRadius: 6, padding: '9px 13px', lineHeight: 1.5 },
  chartNote: { fontSize: 10, color: 'rgba(255,255,255,.2)', margin: 0, fontFamily: 'monospace', lineHeight: 1.4 },
  cta:     { display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' },
  ctaBtn:  { display: 'inline-block', padding: '11px 22px', background: '#F5C518', color: '#0f0f0f', fontWeight: 700, fontSize: 13, borderRadius: 6, textDecoration: 'none' },
  ctaTxt:  { fontSize: 12, color: 'rgba(255,255,255,.3)', lineHeight: 1.4 },
  disclaimer: { marginTop: 36, textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,.2)', lineHeight: 1.5, maxWidth: 680, margin: '36px auto 0' },
};
