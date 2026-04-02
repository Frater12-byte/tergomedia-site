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
        {flow.sources.map(s => (
          <div key={s} style={{ padding: '6px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.5)', fontSize: 11 }}>{s}</div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 14 }}>↓</div>
      <div style={{ padding: '10px 16px', background: 'rgba(249,202,0,.05)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontWeight: 700, textAlign: 'center', fontSize: 12 }}>{flow.engine}</div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 14 }}>↓</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {flow.outputs.map(o => (
          <div key={o} style={{ padding: '6px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.6)', fontSize: 11 }}>{o}</div>
        ))}
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
    n: '01', title: 'No real-time shipment visibility', pill: 'Live tracking for every shipment',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    desc: 'Customers and internal teams chase shipment status by phone and email. Dispatchers pull up carrier portals manually to check each consignment. Exceptions — delays, failures, address issues — are discovered hours after they happen, when it is too late to intervene.',
    bars: [
      { label: 'Time to detect shipment exception', before: '4–12 hours', beforePct: 85, after: '< 15 minutes', afterPct: 6 },
      { label: 'Status update calls per day', before: '40–80', beforePct: 80, after: '0', afterPct: 0 },
    ],
  },
  {
    n: '02', title: 'Manual customer notifications', pill: 'Automated at every milestone',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    desc: 'Proof of shipment, out-for-delivery alerts, and delivery confirmations sent manually — when someone remembers. Customers call to ask where their goods are. Drivers take unproductive calls mid-route. Your NPS score suffers for what is ultimately a communication problem.',
    bars: [
      { label: 'Customer notification coverage', before: '45%', beforePct: 30, after: '100%', afterPct: 100 },
      { label: 'Inbound status calls/day', before: '50–90', beforePct: 85, after: '< 5', afterPct: 5 },
    ],
  },
  {
    n: '03', title: 'Paper-based proof of delivery', pill: 'Digital POD in 60 seconds',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    desc: 'Paper PODs collected on route, returned to depot, and manually scanned or re-entered into the system. One lost document means a billing dispute that can stall payment for weeks. Customers cannot self-serve delivery confirmation. Invoice queries pile up.',
    bars: [
      { label: 'POD processing time', before: '1–3 days', beforePct: 88, after: '< 60 seconds', afterPct: 2 },
      { label: 'POD-related billing disputes', before: '8–12/month', beforePct: 65, after: '0', afterPct: 0 },
    ],
  },
  {
    n: '04', title: 'Inefficient dispatch coordination', pill: 'Automated route and crew allocation',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    desc: 'Dispatch decisions made manually each morning based on experience and a spreadsheet. Drivers not allocated optimally. Last-minute jobs require phone calls to reassign. Vehicle utilisation averages 63%. Fuel costs run above industry benchmarks.',
    bars: [
      { label: 'Vehicle utilisation rate', before: '63%', beforePct: 42, after: '84%', afterPct: 84 },
      { label: 'Dispatch coordination time', before: '2–3 hours daily', beforePct: 80, after: '< 30 min', afterPct: 12 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'Shipment Tracking Automation', desc: 'Real-time shipment visibility pulling from all carrier APIs — with automated exception detection and escalation the moment a delay or failure is identified.', bullets: ['Live tracking data aggregated from all carriers in one view', 'Exception detection triggers alert within 15 minutes of event', 'Proactive customer notification sent before they need to ask', 'Exception dashboard shows all at-risk shipments in real time'], tags: ['Carrier API', 'n8n', 'Webhook', 'Automation'], flow: { sources: ['Carrier API', 'Driver app', 'Warehouse scan'], engine: 'Tracking Aggregation Engine', outputs: ['Live dashboard', 'Exception alert', 'Customer notification'] } },
  { n: '02', title: 'Customer Notification Engine', desc: 'Automated shipment milestone notifications at every stage — dispatched, in transit, out for delivery, delivered — via WhatsApp, SMS, and email.', bullets: ['Dispatch confirmation sent automatically at collection', 'Out-for-delivery alert with estimated time window', 'Delivery confirmation with photo and signature', 'Failed delivery reschedule link sent immediately'], tags: ['WhatsApp', 'SMS', 'Email', 'n8n'], flow: { sources: ['Shipment milestone', 'Driver update', 'Carrier webhook'], engine: 'Notification Engine', outputs: ['WhatsApp alert', 'SMS message', 'Email confirmation'] } },
  { n: '03', title: 'Digital POD System', desc: 'Drivers capture electronic proof of delivery — photo, signature, GPS timestamp — on a mobile app that syncs automatically to the back-office system and triggers invoice dispatch.', bullets: ['Driver captures photo + e-signature on delivery', 'GPS-timestamped POD record created instantly', 'POD synced to back-office and shared with customer', 'Invoice or billing trigger fired automatically on POD receipt'], tags: ['Mobile app', 'e-Signature', 'GPS', 'n8n'], flow: { sources: ['Delivery scan', 'Driver signature', 'GPS coordinate'], engine: 'Digital POD Engine', outputs: ['POD record', 'Customer copy', 'Invoice trigger'] } },
  { n: '04', title: 'Dispatch & Route Automation', desc: 'Intelligent job allocation and route optimisation — reducing vehicle empty miles, improving utilisation, and cutting dispatch time from hours to minutes.', bullets: ['Jobs allocated to nearest available vehicle automatically', 'Route optimised for time window, load, and fuel efficiency', 'Driver briefed via app with route, contacts, and special instructions', 'Vehicle utilisation and empty-mile report generated daily'], tags: ['Route API', 'n8n', 'Driver app', 'Automation'], flow: { sources: ['New jobs', 'Available vehicles', 'Traffic data'], engine: 'Dispatch Optimisation Engine', outputs: ['Driver allocation', 'Optimised route', 'Job briefing'] } },
  { n: '05', title: 'Operations Dashboard', desc: 'Live KPI dashboard covering fleet utilisation, on-time delivery, POD compliance, and cost per consignment — with automated daily reports for ops managers.', bullets: ['Real-time fleet position and job status in one view', 'On-time delivery and SLA compliance by customer and lane', 'Cost per consignment with variance against target', 'Daily ops summary and weekly performance report automated'], tags: ['Dashboards', 'Reporting', 'Automation'], flow: { sources: ['Fleet data', 'Delivery records', 'Cost data'], engine: 'Tergo Reporting Layer', outputs: ['Live dashboard', 'Daily report', 'SLA alerts'] } },
];

const STATS = [
  { val: 'Real-time', label: 'Shipment\nvisibility' },
  { val: '0', label: 'Manual\nstatus calls' },
  { val: '98%', label: 'On-time\ndelivery rate' },
  { val: '6h', label: 'Weekly ops\ntime saved' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function LogisticsClient() {
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
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.12)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,13,13,0.92) 30%, rgba(13,13,13,0.55) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 38%, rgba(249,202,0,0.18) 0%, transparent 52%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 75%, rgba(249,202,0,0.08) 0%, transparent 40%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 4 }} />

        <div className="container">
          <div className="page-hero-eyebrow">Sector — Logistics</div>
          <h1>
            Logistics operations.<br />
            <em>Tracked. Automated.</em>
          </h1>
          <p>Shipment tracking, customer notifications, proof of delivery, and dispatch coordination — all automated so your ops team focuses on exceptions, not status updates.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">Real<span>-time</span></div><div className="met-s">Shipment<br />visibility</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Manual<br />status calls</div></div>
            <div className="met"><div className="met-b">98<span>%</span></div><div className="met-s">On-time<br />delivery rate</div></div>
            <div className="met"><div className="met-b">6<span>h</span></div><div className="met-s">Weekly ops<br />time saved</div></div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why logistics operations lose time — and how to stop it.</h2>
            <p className="sec-sub">The same four operational failures drain hours and erode margins across every logistics operation. Here&apos;s what changes when we automate them.</p>
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
            <h2 className="sec-title">From dispatch to delivery — automated end to end.</h2>
            <p className="sec-sub">We handle the full ops stack: real-time tracking, automated customer notifications, digital POD capture, intelligent dispatch, and live KPI reporting — all custom-built for your operation.</p>
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
            <h2 className="sec-title">What could automation save<br />your logistics operation?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — ops hours saved, on-time delivery improvement, and ROI.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">Gulf Freight Solutions · Dubai</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Freight &amp; Last-Mile Delivery</span>
          </div>
          <div className="re-case-grid">
            {[
              { label: 'The Problem', content: 'A Dubai-based freight and last-mile delivery company handling 200+ consignments per day. Shipment status tracked manually across 4 carrier portals. Customers made 60+ inbound status calls daily. Paper PODs returned to depot and re-entered taking 1–3 days. Dispatch took 2.5 hours every morning.' },
              { label: 'What We Built', content: 'Unified carrier tracking dashboard with real-time exception detection, automated customer notification sequences at every delivery milestone via WhatsApp and SMS, digital POD capture on driver mobile with automatic back-office sync, and an intelligent dispatch and route optimisation layer.' },
              { label: 'The Result', content: 'Customer inbound calls dropped from 60+ per day to under 5. POD processing time reduced from up to 3 days to under 60 seconds. Dispatch time cut from 2.5 hours to 25 minutes. Vehicle utilisation improved from 64% to 86%. On-time delivery rate improved from 81% to 98%.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div className="re-case-nums">
            {[{ val: '−95%', label: 'Status calls' }, { val: '60sec', label: 'POD processing' }, { val: '98%', label: 'On-time delivery' }].map(s => (
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
          <h2>Ready to give every shipment<br />real-time visibility?</h2>
          <p>Book a free discovery call. We&apos;ll show you how quickly we can connect your carriers, automate customer notifications, and eliminate the manual work from your ops team&apos;s day.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
