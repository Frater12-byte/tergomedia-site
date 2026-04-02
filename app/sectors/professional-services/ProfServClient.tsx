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
    n: '01', title: 'Slow client onboarding', pill: 'From 2 days to 15 minutes',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    desc: 'New client onboarding requires collecting KYC documents, setting up folders, creating CRM records, briefing the account team, sending welcome packs, and scheduling kick-off calls — all done manually. Two days of admin before any billable work begins.',
    bars: [
      { label: 'Client onboarding time', before: '1–2 days', beforePct: 90, after: '15 minutes', afterPct: 5 },
      { label: 'Onboarding completion rate', before: '72%', beforePct: 45, after: '100%', afterPct: 100 },
    ],
  },
  {
    n: '02', title: 'Unbilled hours leakage', pill: '11% revenue recovered',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    desc: 'Time tracking is manual and inconsistent. Hours worked in meetings, on calls, and in transit go unlogged. Invoices are assembled from memory and spreadsheets. On average, professional service firms lose 11% of billable hours before an invoice is ever issued.',
    bars: [
      { label: 'Billable hours captured', before: '89%', beforePct: 62, after: '100%', afterPct: 100 },
      { label: 'Invoice assembly time', before: '4–6 hours', beforePct: 82, after: '< 20 min', afterPct: 8 },
    ],
  },
  {
    n: '03', title: 'Reporting overhead', pill: '6h/week eliminated',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    desc: 'Weekly client status reports, monthly utilisation summaries, and quarterly performance reviews assembled by hand from time-tracking exports, project management tools, and email threads. Six hours of senior staff time every week, producing reports that are stale on delivery.',
    bars: [
      { label: 'Weekly reporting time', before: '6h manual', beforePct: 88, after: '0 min', afterPct: 0 },
      { label: 'Report delivery time', before: 'Monday pm', beforePct: 40, after: 'Monday 7am', afterPct: 95 },
    ],
  },
  {
    n: '04', title: 'Contract and renewal gaps', pill: '100% renewal coverage',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    desc: 'Retainer renewals and contract expiry dates sit in spreadsheets that nobody checks until a client asks why they are still being invoiced after the end date. Missed renewals mean silent churn. Discovered late, they mean rushed conversations and lost revenue.',
    bars: [
      { label: 'Renewals caught in advance', before: '61%', beforePct: 35, after: '100%', afterPct: 100 },
      { label: 'Silent churn incidents', before: '2–4/quarter', beforePct: 55, after: '0', afterPct: 0 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'Client Onboarding Automation', desc: 'A triggered onboarding flow that collects documents, creates CRM records, sets up project folders, briefs the account team, and sends the client welcome pack — all in under 15 minutes.', bullets: ['Branded onboarding portal collects all required documents', 'CRM contact, project, and billing record created automatically', 'Account team briefed via Slack with client background and scope', 'Welcome pack and kick-off calendar invite sent immediately'], tags: ['n8n', 'CRM', 'Slack', 'Email'], flow: { sources: ['Signed contract', 'Client form', 'CRM trigger'], engine: 'Onboarding Automation Engine', outputs: ['CRM record', 'Welcome pack', 'Team briefing'] } },
  { n: '02', title: 'Time & Billing Sync', desc: 'Automatic time log aggregation from every tool your team uses — calendar, project management, email — matched to client matters and fed directly into your invoicing system.', bullets: ['Calendar, Jira, and email time extraction with AI classification', 'Hours mapped to client matter codes automatically', 'Draft invoice generated and sent for manager approval', 'Discrepancy detection flags missing or duplicated entries'], tags: ['AI', 'Calendar API', 'Jira', 'Xero'], flow: { sources: ['Calendar events', 'Project tool', 'Email activity'], engine: 'Time Capture Engine', outputs: ['Timesheet', 'Draft invoice', 'Approval request'] } },
  { n: '03', title: 'Automated Reporting', desc: 'Weekly client status reports and monthly utilisation summaries generated and delivered automatically — assembled from live data, no manual input required.', bullets: ['Client status report generated from live project data every Friday', 'Monthly utilisation and realization rate report for management', 'Anomaly detection flags underperforming matters automatically', 'Delivered as branded PDF on a fixed schedule with no manual steps'], tags: ['Reporting', 'n8n', 'Automation', 'PDF'], flow: { sources: ['Project data', 'Time records', 'Billing data'], engine: 'Tergo Reporting Layer', outputs: ['Client report', 'Management summary', 'Alert notifications'] } },
  { n: '04', title: 'Contract Renewal Engine', desc: 'Automated contract expiry tracking with personalised renewal sequences triggered 90, 60, and 30 days before expiry — so no retainer ever lapses unnoticed.', bullets: ['All contract dates tracked in a single automated registry', 'Renewal sequence triggered 90 days before expiry', 'Personalised renewal proposal sent via email with one-click approval', 'Lapsed contracts escalated to director instantly'], tags: ['n8n', 'CRM', 'Email', 'Contract management'], flow: { sources: ['Contract registry', '90-day timer', 'CRM status'], engine: 'Renewal Automation Engine', outputs: ['Renewal email', 'Proposal', 'Director escalation'] } },
  { n: '05', title: 'Performance Dashboard', desc: 'Live firm-wide utilisation, realisation, and revenue dashboard with automated weekly reports — giving partners a real-time view of performance without asking anyone for a number.', bullets: ['Real-time utilisation and realisation rate by consultant', 'Client profitability and matter-level margin tracking', 'Pipeline and revenue forecast updated daily from CRM', 'Automated weekly email digest to partners every Monday morning'], tags: ['Dashboards', 'Reporting', 'CRM', 'Automation'], flow: { sources: ['Time records', 'Billing data', 'Pipeline CRM'], engine: 'Tergo Reporting Layer', outputs: ['Partner dashboard', 'Weekly digest', 'Variance alerts'] } },
];

const STATS = [
  { val: '15min', label: 'Client onboarding\ntime' },
  { val: '11%', label: 'Revenue leakage\nrecovered' },
  { val: '6h', label: 'Weekly reporting\nsaved' },
  { val: '0', label: 'Unbilled\nhours lost' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function ProfServClient() {
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
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.12)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,13,13,0.92) 30%, rgba(13,13,13,0.55) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 38%, rgba(249,202,0,0.18) 0%, transparent 52%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 75%, rgba(249,202,0,0.08) 0%, transparent 40%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 4 }} />
        <div className="container">
          <div className="page-hero-eyebrow">Sector — Professional Services</div>
          <h1>Client delivery.<br /><em>Automated. Billed.</em></h1>
          <p>Client onboarding, time capture, reporting, and contract renewals — all running without admin overhead so your team focuses on billable work.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">15<span>min</span></div><div className="met-s">Client onboarding<br />time</div></div>
            <div className="met"><div className="met-b">11<span>%</span></div><div className="met-s">Revenue leakage<br />recovered</div></div>
            <div className="met"><div className="met-b">6<span>h</span></div><div className="met-s">Weekly reporting<br />saved</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Unbilled<br />hours</div></div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why professional service firms leave money on the table.</h2>
            <p className="sec-sub">Four operational drains that cost consultancies, agencies, and advisory firms thousands of billable hours every year. Here&apos;s what changes when we eliminate them.</p>
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
            <h2 className="sec-title">From new client to invoice — fully automated.</h2>
            <p className="sec-sub">We handle the full operations stack: client onboarding, time and billing sync, automated reporting, contract renewals, and performance dashboards — all custom-built for your firm.</p>
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
            <h2 className="sec-title">What could automation recover<br />for your firm this year?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — billable hours recovered, admin eliminated, and ROI.</p>
          </div>
          <ROICalculator defaultSector="Professional Services" />
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">Meridian Advisory Group · Milan</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Management Consulting · B2B Advisory</span>
          </div>
          <div className="re-case-grid">
            {[
              { label: 'The Problem', content: 'A Milan-based management consultancy with 12 fee-earners. Client onboarding took 1–2 days of admin per new engagement. Time tracking was manual and inconsistent, resulting in an estimated 11% of billable hours falling off invoices. Weekly status reports took a senior consultant 6 hours every Friday.' },
              { label: 'What We Built', content: 'Automated client onboarding portal with CRM integration, AI-assisted time capture pulling from calendar and project tools, automated invoice generation with approval workflow, contract expiry tracking with renewal sequences, and a real-time partner dashboard replacing all manual reporting.' },
              { label: 'The Result', content: 'Onboarding reduced from 2 days to 15 minutes. Billable hour capture improved from 89% to 100% — recovering approximately €120,000 in annual revenue. Weekly reporting eliminated entirely. Zero contract lapses since deployment. Gross margin improved by 9 percentage points.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div className="re-case-nums">
            {[{ val: '15min', label: 'Onboarding' }, { val: '€120k', label: 'Revenue recovered' }, { val: '0', label: 'Hours lost' }].map(s => (
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
          <h2>Ready to stop losing billable<br />hours to admin?</h2>
          <p>Book a free discovery call. We&apos;ll show you exactly where the revenue leakage is in your firm and how quickly we can close it.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
