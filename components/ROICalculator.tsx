'use client';
import { useState, useEffect, useRef } from 'react';

const SECTORS: Record<string, { profile: string; hrsFactor: number; revFactor: number; errFactor: number }> = {
  'Real Estate': { profile: 'Real estate brokerage with active lead flow — automation eliminates manual qualification and follow-up bottlenecks.', hrsFactor: 0.78, revFactor: 0.18, errFactor: 0.82 },
  'Travel & Hospitality': { profile: 'Travel or hospitality business — automation handles bookings, guest comms, and channel syncing across platforms.', hrsFactor: 0.72, revFactor: 0.14, errFactor: 0.76 },
  'Agriculture': { profile: 'Agri-tech or precision farming — automation manages IoT alerts, reporting, and supply chain tracking.', hrsFactor: 0.65, revFactor: 0.11, errFactor: 0.88 },
  'Professional Services': { profile: 'Consulting, legal, or accounting firm — automation handles client onboarding, reporting, and document processing.', hrsFactor: 0.68, revFactor: 0.13, errFactor: 0.79 },
};

const RESP_OPTIONS = ['4–6 hrs', '1–3 hrs', '<1 hr', 'Automated'];

function fmt(n: number, prefix = '') {
  if (n >= 1000000) return `${prefix}${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${prefix}${Math.round(n / 1000)}K`;
  return `${prefix}${Math.round(n)}`;
}

export default function ROICalculator() {
  const [sector, setSector] = useState('Real Estate');
  const [team, setTeam] = useState(8);
  const [hrs, setHrs] = useState(15);
  const [salary, setSalary] = useState(60000);
  const [resp, setResp] = useState('4–6 hrs');

  const s = SECTORS[sector];
  const hoursSaved = Math.round(team * hrs * 52 * s.hrsFactor);
  const moneySaved = Math.round(hoursSaved * (salary / 2000));
  const revenueAdd = Math.round(salary * team * s.revFactor);
  const totalImpact = moneySaved + revenueAdd;
  const roi = Math.round(((totalImpact - 24000) / 24000) * 100);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 320;
    ctx.scale(2, 1);
    const w = canvas.offsetWidth;
    const h = 160;
    ctx.clearRect(0, 0, w, h);

    const months = 12;
    const investment = 24000;
    const monthlyReturn = totalImpact / 12;

    const costData = Array.from({ length: months }, (_, i) => investment + 800 * i);
    const returnData = Array.from({ length: months }, (_, i) => monthlyReturn * (i + 1));
    const maxVal = Math.max(...returnData, ...costData);

    const pad = { top: 16, bottom: 24, left: 8, right: 8 };
    const chartH = h - pad.top - pad.bottom;
    const chartW = w - pad.left - pad.right;

    const toY = (v: number) => pad.top + chartH - (v / maxVal) * chartH;
    const toX = (i: number) => pad.left + (i / (months - 1)) * chartW;

    // Return line (green)
    ctx.beginPath();
    ctx.strokeStyle = '#00ff9d';
    ctx.lineWidth = 1.5;
    returnData.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();

    // Cost line (yellow)
    ctx.beginPath();
    ctx.strokeStyle = '#f9ca00';
    ctx.lineWidth = 1.5;
    costData.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();

    // Month labels
    ctx.fillStyle = 'rgba(255,255,255,.2)';
    ctx.font = '9px DM Sans';
    ctx.textAlign = 'center';
    [0, 2, 5, 8, 11].forEach(i => {
      ctx.fillText(`M${i + 1}`, toX(i), h - 4);
    });
  }, [totalImpact]);

  return (
    <div className="roi-grid">
      {/* INPUT PANEL */}
      <div className="roi-panel">
        <div className="roi-panel-title">Your business profile</div>

        <div style={{ marginBottom: 20 }}>
          <div className="roi-panel-title" style={{ marginBottom: 10 }}>INDUSTRY</div>
          <div className="sector-btns">
            {Object.keys(SECTORS).map(k => (
              <button key={k} className={`s-btn${sector === k ? ' active' : ''}`} onClick={() => setSector(k)}>{k}</button>
            ))}
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-top">
            <span className="slider-label">Team size</span>
            <span className="slider-val">{team}<span> people</span></span>
          </div>
          <input type="range" min="2" max="50" value={team} onChange={e => setTeam(+e.target.value)} />
        </div>

        <div className="slider-group">
          <div className="slider-top">
            <span className="slider-label">Manual/admin hours per person/week</span>
            <span className="slider-val">{hrs}<span> hrs</span></span>
          </div>
          <input type="range" min="2" max="40" value={hrs} onChange={e => setHrs(+e.target.value)} />
        </div>

        <div className="slider-group">
          <div className="slider-top">
            <span className="slider-label">Average annual salary</span>
            <span className="slider-val">${fmt(salary)}</span>
          </div>
          <input type="range" min="20000" max="200000" step="5000" value={salary} onChange={e => setSalary(+e.target.value)} />
        </div>

        <div className="slider-group">
          <div className="slider-top"><span className="slider-label">Current lead response time</span></div>
          <div className="resp-btns">
            {RESP_OPTIONS.map(o => (
              <button key={o} className={`r-btn${resp === o ? ' active' : ''}`} onClick={() => setResp(o)}>{o}</button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS PANEL */}
      <div className="roi-results">
        <div className="roi-profile-box">
          <div className="pt">YOUR PROFILE — {sector.toUpperCase()}</div>
          <p>{s.profile}</p>
        </div>

        <div className="roi-metrics">
          <div className="roi-metric"><div className="big">{fmt(hoursSaved)}</div><div className="lbl">Hours saved / year</div></div>
          <div className="roi-metric"><div className="big">${fmt(moneySaved)}</div><div className="lbl">Labour cost saved</div></div>
          <div className="roi-metric"><div className="big g">${fmt(revenueAdd)}</div><div className="lbl">Revenue recovered</div></div>
          <div className="roi-metric"><div className="big">{roi}%</div><div className="lbl">Estimated 12mo ROI</div></div>
        </div>

        <div className="roi-chart-box">
          <div className="roi-chart-hd">
            <span className="roi-chart-title">12-MONTH PROJECTION</span>
            <div style={{ display: 'flex', gap: 12 }}>
              <span className="rcl"><span className="rcl-dot g" />Returns</span>
              <span className="rcl"><span className="rcl-dot y" />Investment</span>
            </div>
          </div>
          <canvas ref={canvasRef} id="roiChart" />
        </div>

        <div className="roi-disclaimer">
          Estimates based on industry benchmarks. Actual results vary by business complexity and implementation scope.
        </div>

        <div className="roi-cta-row">
          <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Get my free estimate →</a>
        </div>
      </div>
    </div>
  );
}
