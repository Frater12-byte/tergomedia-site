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
    n: '01', title: 'Manual compliance reporting', pill: 'From 2 days to 2 hours',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    desc: 'Regulatory reports assembled manually from multiple systems — trading records, transaction logs, client data — consumed entire days of compliance staff time. Errors crept in. Deadlines were missed. Regulators sent queries.',
    bars: [
      { label: 'Report preparation time', before: '1–2 days', beforePct: 90, after: '< 2 hours', afterPct: 8 },
      { label: 'Manual errors per report', before: '3–7', beforePct: 70, after: '0', afterPct: 0 },
    ],
  },
  {
    n: '02', title: 'Slow KYC & client onboarding', pill: 'From 5 days to 15 minutes',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    desc: 'KYC document collection, identity verification, AML screening, and compliance sign-off done manually across email and shared drives. Each new client takes 3–5 days to onboard. Deals stall. Clients go to faster competitors.',
    bars: [
      { label: 'KYC onboarding time', before: '3–5 days', beforePct: 88, after: '15 minutes', afterPct: 4 },
      { label: 'Onboarding drop-off rate', before: '28%', beforePct: 55, after: '< 4%', afterPct: 8 },
    ],
  },
  {
    n: '03', title: 'Contract bottlenecks', pill: 'From 3 weeks to 3 days',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    desc: 'Contract drafting, redlines, approvals, and execution routed through email chains with no version control or deadline tracking. Deals that should close in days drag on for weeks. Revenue is delayed. Relationships are strained.',
    bars: [
      { label: 'Contract turnaround time', before: '2–4 weeks', beforePct: 85, after: '2–3 days', afterPct: 12 },
      { label: 'Contracts missing SLA', before: '41%', beforePct: 60, after: '< 5%', afterPct: 7 },
    ],
  },
  {
    n: '04', title: 'Invoice and collections leakage', pill: '100% collection coverage',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    desc: 'Invoices generated manually, chased via email, and tracked in spreadsheets. Late payers slip through. Reconciliation takes hours every month. Average DSO sits 18 days above industry benchmark.',
    bars: [
      { label: 'Days Sales Outstanding (DSO)', before: '48 days', beforePct: 80, after: '30 days', afterPct: 50 },
      { label: 'Overdue invoices uncollected', before: '14%', beforePct: 55, after: '< 2%', afterPct: 6 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'Compliance Reporting Engine', desc: 'Automated data aggregation and regulatory report generation — pulling from trading systems, transaction logs, and client records with zero manual assembly.', bullets: ['Regulatory reports auto-generated on schedule from live data', 'AML and transaction monitoring alerts triggered automatically', 'Audit trail maintained with timestamped log for every data point', 'Submitted to regulator portal directly where APIs allow'], tags: ['n8n', 'Compliance API', 'Automation', 'Reporting'], flow: { sources: ['Transaction logs', 'Client records', 'Trading data'], engine: 'Compliance Reporting Engine', outputs: ['Regulatory report', 'Audit log', 'Alert notifications'] } },
  { n: '02', title: 'KYC & Onboarding Automation', desc: 'End-to-end digital client onboarding: document collection, identity verification, AML screening, and CRM population — all completed before the first meeting.', bullets: ['Branded onboarding portal with document upload and e-sign', 'Automated identity and AML screening via API integration', 'CRM record created with full client profile on completion', 'Compliance sign-off workflow routed to the right approver'], tags: ['KYC API', 'e-Sign', 'CRM', 'n8n'], flow: { sources: ['Client invite', 'Document upload', 'ID verification'], engine: 'KYC Onboarding Engine', outputs: ['CRM record', 'AML clearance', 'Compliance sign-off'] } },
  { n: '03', title: 'Contract Management System', desc: 'Automated contract drafting, version tracking, approval routing, and e-signature with deadline alerts — so no deal ever sits waiting in an inbox.', bullets: ['Template-based contract generation from CRM deal data', 'Version control with redline tracking and comment threads', 'Approval routing triggered by contract type and value', 'E-signature integration with automatic executed copy filing'], tags: ['DocuSign', 'n8n', 'CRM', 'Automation'], flow: { sources: ['CRM deal', 'Template library', 'Approver list'], engine: 'Contract Automation Layer', outputs: ['Draft contract', 'Approval workflow', 'Executed copy'] } },
  { n: '04', title: 'Billing & Collections Automation', desc: 'Automated invoice generation, multi-touch payment reminders, and reconciliation — with real-time cash position reporting for management.', bullets: ['Invoices generated from time records and CRM milestones', 'Automated reminder sequences at 7, 14, and 30 days overdue', 'Payment matching and reconciliation run automatically', 'DSO dashboard updated daily with escalation alerts'], tags: ['Xero', 'n8n', 'Email', 'Automation'], flow: { sources: ['Time records', 'CRM milestones', 'Payment data'], engine: 'Billing Automation Engine', outputs: ['Invoice', 'Reminder sequence', 'Reconciliation'] } },
  { n: '05', title: 'Financial Performance Dashboard', desc: 'Live revenue, DSO, pipeline, and compliance status dashboard — with automated weekly management reports and variance alerts.', bullets: ['Real-time revenue and cash position by entity and matter', 'DSO, WIP, and lock-up metrics updated daily', 'Compliance calendar with upcoming filing deadlines', 'Automated weekly partner digest delivered every Monday'], tags: ['Dashboards', 'Reporting', 'CRM', 'Automation'], flow: { sources: ['Billing data', 'CRM pipeline', 'Compliance calendar'], engine: 'Tergo Reporting Layer', outputs: ['Partner dashboard', 'Weekly digest', 'Deadline alerts'] } },
];

const STATS = [
  { val: '15min', label: 'KYC onboarding\ntime' },
  { val: '0', label: 'Compliance\ngaps' },
  { val: '100%', label: 'Audit trail\ncoverage' },
  { val: '18d', label: 'DSO reduction\nper client' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function FinanceLegalClient() {
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
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.12)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,13,13,0.92) 30%, rgba(13,13,13,0.55) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 38%, rgba(249,202,0,0.18) 0%, transparent 52%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 75%, rgba(249,202,0,0.08) 0%, transparent 40%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 4 }} />
        <div className="container">
          <div className="page-hero-eyebrow">Sector — Finance &amp; Legal</div>
          <h1>Financial operations.<br /><em>Compliant. Automated.</em></h1>
          <p>KYC onboarding, compliance reporting, contract management, and billing automation — built for regulated businesses that cannot afford errors or delays.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">15<span>min</span></div><div className="met-s">KYC onboarding time</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Compliance gaps</div></div>
            <div className="met"><div className="met-b">100<span>%</span></div><div className="met-s">Audit trail coverage</div></div>
            <div className="met"><div className="met-b">18<span>d</span></div><div className="met-s">DSO reduction per client</div></div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why finance and legal operations stay manual — and shouldn&apos;t.</h2>
            <p className="sec-sub">The same four pain points cost regulated businesses thousands of hours and compliance risk every year. Here&apos;s what changes after we automate them.</p>
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
            <h2 className="sec-title">From KYC to close — fully automated.</h2>
            <p className="sec-sub">We handle the full compliance and operations stack: KYC onboarding, regulatory reporting, contract management, billing, and performance dashboards — all custom-built for your firm.</p>
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
            <h2 className="sec-title">What could automation save<br />your finance or legal operation?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — compliance hours saved, DSO reduced, ROI.</p>
          </div>
          <ROICalculator defaultSector="Finance & Legal" />
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">Halcyon Capital Partners · Dubai</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Investment Management · DIFC-Regulated</span>
          </div>
          <div className="re-case-grid">
            {[
              { label: 'The Problem', content: 'A Dubai-based investment management firm with DIFC regulatory obligations. Monthly compliance reports took 2 full days to prepare manually. KYC onboarding for new investors required 5 days of back-and-forth document collection. DSO on management fees averaged 52 days.' },
              { label: 'What We Built', content: 'Automated compliance reporting pulling from trading and custody systems, digital KYC onboarding portal with ID verification and AML screening via API, contract management with e-signature, and automated billing with multi-touch collection sequences.' },
              { label: 'The Result', content: 'Compliance reports now generated in under 2 hours with zero manual input. KYC onboarding reduced from 5 days to 15 minutes. DSO dropped from 52 days to 31 days. Zero compliance findings in the subsequent regulatory review.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div className="re-case-nums">
            {[{ val: '15min', label: 'KYC onboarding' }, { val: '−21d', label: 'DSO reduction' }, { val: '0', label: 'Compliance findings' }].map(s => (
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
          <h2>Ready to automate compliance<br />and close deals faster?</h2>
          <p>Book a free discovery call. We&apos;ll show you where your biggest operational drains are and how fast we can eliminate them — without touching your regulatory obligations.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
