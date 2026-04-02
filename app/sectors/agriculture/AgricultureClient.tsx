/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';
import TestimonialsSection from '@/components/TestimonialsSection';
import AutopilotSection from '@/components/AutopilotSection';

// ─── Flow diagram ──────────────────────────────────────────────────────────────

function FlowDiagram({ flow }: { flow: { sources: string[]; engine: string; outputs: string[] } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {flow.sources.map(s => <div key={s} style={{ padding: '6px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.5)', fontSize: 11 }}>{s}</div>)}
      </div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 14 }}>↓</div>
      <div style={{ padding: '10px 16px', background: 'rgba(249,202,0,.05)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontWeight: 700, textAlign: 'center', fontSize: 12 }}>{flow.engine}</div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 14 }}>↓</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {flow.outputs.map(o => <div key={o} style={{ padding: '6px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.6)', fontSize: 11 }}>{o}</div>)}
      </div>
    </div>
  );
}

// ─── Accordion ─────────────────────────────────────────────────────────────────

type ProblemBar = { label: string; before: string; beforePct: number; after: string; afterPct: number };
type Problem = { n: string; title: string; pill: string; icon: React.ReactNode; desc: string; bars: ProblemBar[] };

function AccordionItem({ item, open, onToggle }: { item: Problem; open: boolean; onToggle: () => void }) {
  const [afterWidths, setAfterWidths] = useState(item.bars.map(() => 0));
  useEffect(() => {
    if (open) { const t = setTimeout(() => setAfterWidths(item.bars.map(b => b.afterPct)), 80); return () => clearTimeout(t); }
    else setAfterWidths(item.bars.map(() => 0));
  }, [open]);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,.07)', background: open ? 'rgba(255,255,255,.02)' : 'transparent', transition: 'background .2s' }}>
      <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', cursor: 'pointer' }}>
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'var(--y)', minWidth: 44, lineHeight: 1 }}>{item.n}</span>
        <div style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.4)', flexShrink: 0 }}>{item.icon}</div>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', flex: 1, fontFamily: "'Exo 2',sans-serif" }}>{item.title}</span>
        <span className="acc-pill">{item.pill}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div style={{ maxHeight: open ? 600 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
        <div className="acc-inner">
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {item.bars.map((bar, bi) => (
              <div key={bi}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8, fontWeight: 600 }}>{bar.label}</div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}>
                    <span>Before</span><span style={{ color: 'rgba(255,100,80,.9)' }}>{bar.before}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${bar.beforePct}%`, background: 'rgba(255,40,40,.85)', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}>
                    <span>After</span><span style={{ color: '#22c55e' }}>{bar.after}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${afterWidths[bi]}%`, background: '#22c55e', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat item ─────────────────────────────────────────────────────────────────

function StatItem({ val, label }: { val: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ borderTop: '2px solid rgba(249,202,0,.4)', padding: '32px 24px', textAlign: 'center', background: 'var(--dark)' }}>
      <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1, marginBottom: 10, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)', transition: 'opacity .5s, transform .5s' }}>{val}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const PROBLEMS: Problem[] = [
  {
    n: '01', title: 'No real-time field visibility', pill: 'Daily visits to real-time',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    desc: 'Without real-time sensor data, farm managers drive across hundreds of hectares daily to check soil moisture, temperatures, and crop conditions. A single missed visit during a critical growth window can cost an entire season.',
    bars: [
      { label: 'Field check frequency', before: '1–2x daily visits', beforePct: 40, after: 'Continuous real-time', afterPct: 100 },
      { label: 'Issue detection time', before: '12–24 hours', beforePct: 85, after: '< 3 minutes', afterPct: 5 },
    ],
  },
  {
    n: '02', title: 'Delayed alert escalation', pill: '3-minute alert response',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    desc: 'When soil moisture drops below critical thresholds, frost is incoming, or equipment fails in a remote field, the information sits unnoticed until the next manual check. By then, the damage is already done and the cost is already incurred.',
    bars: [
      { label: 'Alert-to-response time', before: '4–24 hours', beforePct: 90, after: '< 3 minutes', afterPct: 4 },
      { label: 'Critical events missed', before: '3–6 per season', beforePct: 65, after: '0', afterPct: 0 },
    ],
  },
  {
    n: '03', title: 'No harvest timing data', pill: 'Data-driven harvest windows',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    desc: 'Harvest timing decisions are made on experience and intuition, not data. Harvesting two days too early or too late cuts yield quality and market price significantly. For large farms, that variance translates directly into six-figure losses.',
    bars: [
      { label: 'Harvest timing accuracy', before: 'Experience-based', beforePct: 30, after: 'Sensor + AI-driven', afterPct: 95 },
      { label: 'Yield quality score', before: 'Inconsistent', beforePct: 45, after: 'Optimised', afterPct: 88 },
    ],
  },
  {
    n: '04', title: 'Fragmented supplier comms', pill: 'Automated procurement',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    desc: 'Reordering fertilisers, pesticides, and fuel manually means monitoring stock levels by hand, calling suppliers, and chasing deliveries. A single out-of-stock during peak season can halt operations for days.',
    bars: [
      { label: 'Procurement time per month', before: '8–12 hours', beforePct: 80, after: '< 30 min', afterPct: 6 },
      { label: 'Supply stockout incidents', before: '2–4 per season', beforePct: 55, after: '0', afterPct: 0 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'IoT Sensor Network', desc: 'End-to-end IoT deployment across your land: soil moisture, temperature, humidity, and equipment telemetry — all feeding a live dashboard accessible from anywhere.', bullets: ['Soil moisture, temp, and humidity sensors deployed field by field', 'Equipment telemetry monitoring pump and irrigation system health', 'GPS-tagged sensor placement with field map overlay', 'Dashboard accessible via web and mobile — no app install required'], tags: ['IoT', 'MQTT', 'LoRaWAN', 'Node-RED'], flow: { sources: ['Soil sensors', 'Weather station', 'Equipment telemetry'], engine: 'IoT Data Ingestion Layer', outputs: ['Live dashboard', 'Historical trends', 'Anomaly detection'] } },
  { n: '02', title: 'Alert & Escalation Engine', desc: 'Configurable threshold alerts sent via SMS, WhatsApp, and email within 3 minutes of any critical event — with automatic escalation if the first responder does not acknowledge.', bullets: ['Soil, temperature, and equipment thresholds set per field zone', 'SMS and WhatsApp alerts delivered within 3 minutes', 'Auto-escalation if primary contact does not acknowledge in 10 min', 'Incident log maintained automatically with resolution tracking'], tags: ['n8n', 'WhatsApp', 'SMS', 'Twilio'], flow: { sources: ['Threshold breach', 'Equipment fault', 'Weather alert'], engine: 'Alert Escalation Engine', outputs: ['WhatsApp alert', 'SMS notification', 'Manager escalation'] } },
  { n: '03', title: 'Harvest Planning System', desc: 'AI-driven harvest window recommendations combining sensor data, weather forecasts, and historical yield patterns to optimise timing and maximise quality.', bullets: ['7-day harvest window forecast updated daily', 'Integrates live weather data with in-field sensor readings', 'Historical yield quality correlation analysis', 'One-click harvest schedule generation and team notification'], tags: ['AI', 'Weather API', 'Sensor data', 'n8n'], flow: { sources: ['Sensor readings', 'Weather forecast', 'Historical data'], engine: 'Harvest AI Engine', outputs: ['Harvest window', 'Team schedule', 'Market timing'] } },
  { n: '04', title: 'Supplier Automation', desc: 'Automatic stock level monitoring with supplier order triggers, delivery tracking, and invoice processing — so procurement runs without your involvement.', bullets: ['Stock levels monitored against par thresholds continuously', 'Automatic purchase orders triggered when stock drops below threshold', 'Supplier confirmation and ETA tracked in dashboard', 'Invoice received, matched, and flagged for approval automatically'], tags: ['n8n', 'Supplier APIs', 'Email', 'Automation'], flow: { sources: ['Stock sensor data', 'Consumption tracking', 'Par threshold'], engine: 'Procurement Engine', outputs: ['Purchase order', 'Supplier notification', 'Delivery tracking'] } },
  { n: '05', title: 'Farm Performance Dashboard', desc: 'Real-time and historical view of every field, crop, and input — with automated weekly reports for management and investors.', bullets: ['Per-field performance metrics updated continuously', 'Input vs output analysis: water, fertiliser, yield per hectare', 'Automated weekly PDF summary for management and investors', 'Anomaly detection and variance alerts built in'], tags: ['Reporting', 'Dashboards', 'IoT', 'Automation'], flow: { sources: ['All sensor feeds', 'Procurement data', 'Yield records'], engine: 'Tergo Reporting Layer', outputs: ['Live dashboard', 'Weekly report', 'Investor summary'] } },
];

const STATS = [
  { val: '400ha', label: 'Land monitored\nper client' },
  { val: '<3min', label: 'Alert response\ntime' },
  { val: '0', label: 'Critical events\nmissed' },
  { val: '24/7', label: 'Active\nmonitoring' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function AgricultureClient() {
  const [openProblem, setOpenProblem] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);
  const sol = SOLUTIONS[activeTab];

  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero" style={{ background: '#0d0d0d', overflow: 'hidden' }}>
        <svg className="poly-bg" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="850,0 1440,140 1440,400 1080,500 720,260 780,0" fill="rgba(249,202,0,0.03)" stroke="#f9ca00" strokeWidth="0.6" strokeOpacity="0.12"/>
          <polygon points="1150,0 1440,0 1440,210 1320,170" fill="none" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.1"/>
          <circle cx="850" cy="0" r="2.5" fill="#f9ca00" fillOpacity="0.35"/>
          <circle cx="1080" cy="500" r="2" fill="#f9ca00" fillOpacity="0.2"/>
          <circle cx="720" cy="260" r="1.5" fill="#f9ca00" fillOpacity="0.15"/>
        </svg>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.12)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,13,13,0.92) 30%, rgba(13,13,13,0.55) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 38%, rgba(249,202,0,0.18) 0%, transparent 52%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 75%, rgba(249,202,0,0.08) 0%, transparent 40%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 4 }} />
        <div className="container">
          <div className="page-hero-eyebrow">Sector — Agriculture</div>
          <h1>Precision farming.<br /><em>Monitored. Automated.</em></h1>
          <p>IoT sensor networks, real-time monitoring dashboards, and automated alert escalation — so you know what is happening across every hectare, at all times.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">400<span>ha</span></div><div className="met-s">Land monitored<br />per client</div></div>
            <div className="met"><div className="met-b">3<span>min</span></div><div className="met-s">Alert response<br />time</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Critical events<br />missed</div></div>
            <div className="met"><div className="met-b">24<span>/7</span></div><div className="met-s">Active<br />monitoring</div></div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why precision farming without IoT costs you every season.</h2>
            <p className="sec-sub">Four operational blind spots that cost farms yields, quality, and staff time every year. Here&apos;s what changes after we deploy the monitoring infrastructure.</p>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,.07)' }}>
            {PROBLEMS.map((item, i) => (
              <AccordionItem key={i} item={item} open={openProblem === i} onToggle={() => setOpenProblem(openProblem === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="section section-light">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">What we build</span>
            <h2 className="sec-title">From sensors in the ground to insight on your phone.</h2>
            <p className="sec-sub">We design and deploy the full precision agriculture stack: IoT sensor networks, real-time dashboards, automated alerting, harvest planning, and procurement automation — built for your land.</p>
          </div>
          <div className="re-sol-tabs">
            {SOLUTIONS.map((s, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className={`re-sol-tab${activeTab === i ? ' active' : ''}`}>
                {s.n} {s.title}
              </button>
            ))}
          </div>
          <div className="re-sol-grid">
            <div>
              <h3 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>{sol.title}</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', lineHeight: 1.75, marginBottom: 28 }}>{sol.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sol.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--y)" strokeWidth="2.5" style={{ marginTop: 3, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {sol.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.25)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 16 }}>How it works</div>
              <FlowDiagram flow={sol.flow} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="re-stats-bar">
          {STATS.map((s, i) => <StatItem key={i} val={s.val} label={s.label} />)}
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section className="section roi-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
            <span className="sec-label">Free estimate</span>
            <h2 className="sec-title">What could automation save<br />your farming operation?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — staff hours saved, yield improvements, and ROI.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">Agri Novatex · Bucharest</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Precision Farming · Cereal Production</span>
          </div>
          <div className="re-case-grid">
            {[
              { label: 'The Problem', content: 'A 400-hectare cereal farm outside Bucharest with no real-time monitoring infrastructure. Field checks required daily manual visits consuming 3 staff-days per week. Two irrigation failures in the previous season went undetected for 18+ hours, causing significant crop damage.' },
              { label: 'What We Built', content: 'Full IoT sensor deployment across all 400 hectares: soil moisture, temperature, and humidity sensors in each field zone. Real-time dashboard, SMS/WhatsApp alert escalation with auto-escalation logic, AI harvest timing system, and automated supplier procurement triggers.' },
              { label: 'The Result', content: 'Zero missed events since deployment. Field staff visits reduced from 15 per week to 3. Alert-to-response time reduced from up to 24 hours to under 3 minutes. Harvest timing accuracy improved by 22%. First-season ROI achieved in 4 months.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div className="re-case-nums">
            {[{ val: '400ha', label: 'Monitored' }, { val: '<3min', label: 'Alert response' }, { val: '0', label: 'Events missed' }].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'var(--y)', marginBottom: 6 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOPILOT ── */}
      <AutopilotSection />

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to monitor every hectare<br />in real time?</h2>
          <p>Book a free discovery call. We&apos;ll show you how quickly we can deploy a sensor network on your land and what the dashboard looks like before you commit to anything.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
