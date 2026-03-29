/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';

const SECTORS: Record<string, { hrsFactor: number; revFactor: number; b2bMult: number; b2cMult: number }> = {
  'Real Estate':           { hrsFactor: 0.78, revFactor: 0.18, b2bMult: 1.4, b2cMult: 0.8 },
  'Travel & Hospitality':  { hrsFactor: 0.72, revFactor: 0.14, b2bMult: 1.2, b2cMult: 1.1 },
  'Agriculture':           { hrsFactor: 0.65, revFactor: 0.11, b2bMult: 1.5, b2cMult: 0.6 },
  'Professional Services': { hrsFactor: 0.68, revFactor: 0.13, b2bMult: 1.6, b2cMult: 0.7 },
  'E-commerce':            { hrsFactor: 0.55, revFactor: 0.10, b2bMult: 0.9, b2cMult: 1.4 },
  'SaaS / Tech':           { hrsFactor: 0.62, revFactor: 0.16, b2bMult: 1.3, b2cMult: 1.0 },
  'Healthcare':            { hrsFactor: 0.58, revFactor: 0.12, b2bMult: 1.2, b2cMult: 0.9 },
  'Logistics':             { hrsFactor: 0.70, revFactor: 0.11, b2bMult: 1.4, b2cMult: 0.7 },
};

const RESP_OPTIONS: Array<{ label: string; mult: number }> = [
  { label: '>24 hrs',  mult: 1.4 },
  { label: '4–24 hrs', mult: 1.2 },
  { label: '1–4 hrs',  mult: 1.0 },
  { label: '<1 hr',    mult: 0.7 },
];

function fmt(n: number, prefix = '') {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${prefix}${Math.round(n / 1_000)}K`;
  return `${prefix}${Math.round(n)}`;
}

function fmtDollar(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000)     return `${sign}$${Math.round(abs / 1_000)}K`;
  return `${sign}$${Math.round(abs)}`;
}

export default function ROICalculator() {
  const [mode, setMode]     = useState<'B2B' | 'B2C'>('B2B');
  const [sector, setSector] = useState('Real Estate');
  const [team, setTeam]     = useState(8);
  const [hrs, setHrs]       = useState(15);
  const [salary, setSalary] = useState(60000);
  const [resp, setResp]     = useState('>24 hrs');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const s            = SECTORS[sector];
  const respMult     = RESP_OPTIONS.find(o => o.label === resp)?.mult ?? 1.0;
  const revMult      = mode === 'B2B' ? s.b2bMult : s.b2cMult;
  const hoursSaved   = Math.round(team * hrs * 52 * s.hrsFactor);
  const moneySaved   = Math.round(hoursSaved * (salary / 2000));
  const revenueAdd   = Math.round(salary * team * s.revFactor * revMult * respMult);
  const implementation = 24000;
  const totalImpact  = moneySaved + revenueAdd;
  const roi          = Math.round(((totalImpact - implementation) / implementation) * 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.offsetWidth;
    const cssH = 220;
    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width  = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.scale(dpr, dpr);

    const w = cssW;
    const h = cssH;

    ctx.clearRect(0, 0, w, h);

    const monthCount = 12;
    const months = Array.from({ length: monthCount }, (_, i) => i);

    const implCost  = implementation;   // 24000, paid in month 1
    const maintCost = 800;              // ~$800/mo from month 2+

    // Investment Cost line — always positive (shown as a cost magnitude)
    const investmentData = months.map((_, i) => i === 0 ? implCost : maintCost);

    // Cost Savings — cumulative, grows from month 2
    const monthlySavings = moneySaved / 12;
    const costSavingsData = months.map((_, i) => i === 0 ? 0 : monthlySavings * i);

    // Revenue Impact — cumulative, grows from month 2
    const monthlyRevenue = revenueAdd / 12;
    const revenueImpactData = months.map((_, i) => i === 0 ? 0 : monthlyRevenue * i);

    // Cumulative ROI = (savings + revenue) - cumulative investment
    const cumulativeInvestment = months.map((_, i) => implCost + maintCost * i);
    const cumulativeROIData = months.map(
      (_, i) => costSavingsData[i] + revenueImpactData[i] - cumulativeInvestment[i]
    );

    // Find first month where cumulative ROI turns positive
    let roiPositiveIdx = -1;
    for (let i = 0; i < monthCount; i++) {
      if (cumulativeROIData[i] >= 0) { roiPositiveIdx = i; break; }
    }

    // Determine Y range across all four datasets
    const allVals = [
      ...investmentData,
      ...costSavingsData,
      ...revenueImpactData,
      ...cumulativeROIData,
    ];
    const minVal = Math.min(0, ...allVals);
    const maxVal = Math.max(...allVals);
    const range  = maxVal - minVal || 1;

    const pad = { top: 20, bottom: 30, left: 56, right: 12 };
    const chartH = h - pad.top - pad.bottom;
    const chartW = w - pad.left - pad.right;

    const toY = (v: number) => pad.top + chartH - ((v - minVal) / range) * chartH;
    const toX = (i: number) => pad.left + (i / (monthCount - 1)) * chartW;

    // Grid lines + Y-axis labels
    const ySteps = 5;
    ctx.font = `9px 'DM Sans', sans-serif`;
    ctx.textAlign = 'right';
    for (let step = 0; step <= ySteps; step++) {
      const val = minVal + (range / ySteps) * step;
      const y   = toY(val);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth   = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();

      ctx.fillStyle = val < 0 ? 'rgba(255,120,120,0.55)' : 'rgba(255,255,255,0.28)';
      ctx.fillText(fmtDollar(Math.round(val)), pad.left - 4, y + 3);
    }

    // Zero line (only needed when range dips below zero)
    if (minVal < 0) {
      const zeroY = toY(0);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth   = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.left, zeroY);
      ctx.lineTo(w - pad.right, zeroY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // "ROI Positive" vertical dashed line
    if (roiPositiveIdx >= 0) {
      const bx = toX(roiPositiveIdx);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth   = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(bx, pad.top);
      ctx.lineTo(bx, h - pad.bottom);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font      = `bold 8px 'DM Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('ROI Positive', bx, pad.top - 5);
    }

    // Draw a line helper
    const drawLine = (
      data: number[],
      color: string,
      lw = 1.5,
      dashed = false,
    ) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth   = lw;
      ctx.lineJoin    = 'round';
      if (dashed) ctx.setLineDash([4, 3]);
      else ctx.setLineDash([]);
      data.forEach((v, i) => {
        const x = toX(i);
        const y = toY(v);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // 1. Investment Cost — red/orange, dashed
    drawLine(investmentData, 'rgba(255,100,80,0.9)', 1.5, true);
    // 2. Cost Savings — yellow, solid
    drawLine(costSavingsData, '#f9ca00');
    // 3. Revenue Impact — green, solid
    drawLine(revenueImpactData, '#00ff9d');
    // 4. Cumulative ROI — blue/cyan, solid, thicker
    drawLine(cumulativeROIData, '#00c8ff', 2.5);

    // Dots at last point
    const dotEnd = (data: number[], color: string) => {
      const x = toX(monthCount - 1);
      const y = toY(data[monthCount - 1]);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };
    dotEnd(investmentData,   'rgba(255,100,80,0.9)');
    dotEnd(costSavingsData,  '#f9ca00');
    dotEnd(revenueImpactData,'#00ff9d');
    dotEnd(cumulativeROIData,'#00c8ff');

    // X-axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font      = `9px 'DM Sans', sans-serif`;
    ctx.textAlign = 'center';
    [0, 2, 5, 8, 11].forEach(i => {
      ctx.fillText(`M${i + 1}`, toX(i), h - pad.bottom + 14);
    });

  }, [moneySaved, revenueAdd, implementation]);

  return (
    <div className="roi-grid">
      {/* INPUT PANEL */}
      <div className="roi-panel">
        <div className="roi-panel-title" style={{ marginBottom: 16 }}>Your business profile</div>

        {/* B2B / B2C toggle */}
        <div style={{ marginBottom: 24 }}>
          <div className="roi-panel-title" style={{ marginBottom: 10 }}>BUSINESS MODEL</div>
          <div className="resp-btns">
            {(['B2B', 'B2C'] as const).map(m => (
              <button
                key={m}
                className={`r-btn${mode === m ? ' active' : ''}`}
                onClick={() => setMode(m)}
                style={{ minWidth: 60, fontWeight: 700 }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Sector buttons */}
        <div style={{ marginBottom: 24 }}>
          <div className="roi-panel-title" style={{ marginBottom: 10 }}>INDUSTRY</div>
          <div className="sector-btns">
            {Object.keys(SECTORS).map(k => (
              <button
                key={k}
                className={`s-btn${sector === k ? ' active' : ''}`}
                onClick={() => setSector(k)}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Team size slider */}
        <div className="slider-group">
          <div className="slider-top">
            <span className="slider-label">Team size</span>
            <span className="slider-val">{team}<span> people</span></span>
          </div>
          <input type="range" min="2" max="50" value={team} onChange={e => setTeam(+e.target.value)} />
        </div>

        {/* Hours slider */}
        <div className="slider-group">
          <div className="slider-top">
            <span className="slider-label">Manual/admin hours per person/week</span>
            <span className="slider-val">{hrs}<span> hrs</span></span>
          </div>
          <input type="range" min="2" max="40" value={hrs} onChange={e => setHrs(+e.target.value)} />
        </div>

        {/* Salary slider */}
        <div className="slider-group">
          <div className="slider-top">
            <span className="slider-label">Average annual salary</span>
            <span className="slider-val">${fmt(salary)}</span>
          </div>
          <input type="range" min="20000" max="200000" step="5000" value={salary} onChange={e => setSalary(+e.target.value)} />
        </div>

        {/* Response time buttons */}
        <div className="slider-group">
          <div className="slider-top"><span className="slider-label">Current lead response time</span></div>
          <div className="resp-btns">
            {RESP_OPTIONS.map(o => (
              <button
                key={o.label}
                className={`r-btn${resp === o.label ? ' active' : ''}`}
                onClick={() => setResp(o.label)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS PANEL */}
      <div className="roi-results">
        {/* KPI metrics */}
        <div className="roi-metrics" style={{ marginBottom: 18 }}>
          <div className="roi-metric">
            <div className="big">{fmt(hoursSaved)}</div>
            <div className="lbl">Hours saved / year</div>
          </div>
          <div className="roi-metric">
            <div className="big">${fmt(moneySaved)}</div>
            <div className="lbl">Labour cost saved</div>
          </div>
          <div className="roi-metric">
            <div className="big g">${fmt(revenueAdd)}</div>
            <div className="lbl">Revenue recovered</div>
          </div>
          <div className="roi-metric">
            <div className="big">{roi}%</div>
            <div className="lbl">Estimated 12mo ROI</div>
          </div>
        </div>

        {/* Canvas chart */}
        <div className="roi-chart-box">
          <div className="roi-chart-hd">
            <span className="roi-chart-title">12-MONTH PROJECTION</span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="rcl">
                <span className="rcl-dot" style={{ background: 'rgba(255,100,80,0.9)', display: 'inline-block', width: 6, height: 6 }} />
                Investment Cost
              </span>
              <span className="rcl">
                <span className="rcl-dot y" />
                Cost Savings
              </span>
              <span className="rcl">
                <span className="rcl-dot g" />
                Revenue Impact
              </span>
              <span className="rcl">
                <span className="rcl-dot" style={{ background: '#00c8ff', display: 'inline-block', width: 6, height: 6 }} />
                Cumulative ROI
              </span>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '220px', display: 'block' }}
          />
        </div>

        <div className="roi-disclaimer">
          Estimates based on industry benchmarks. Actual results vary by business complexity and implementation scope.
        </div>

        <div className="roi-cta-row">
          <a
            href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-y btn-lg"
          >
            Get my free estimate →
          </a>
        </div>
      </div>
    </div>
  );
}
