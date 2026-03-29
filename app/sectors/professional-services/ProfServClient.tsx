/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useIsMobile() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const check = () => setV(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return v;
}

function SparkLine({ data }: { data: number[] }) {
  const W = 300, H = 60;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - ((v - min) / (max - min)) * (H - 8) - 4]);
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cpx = (x0 + x1) / 2;
    d += ` C ${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 48, display: 'block' }}>
      <defs><linearGradient id="spk-ps2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f9ca00"/><stop offset="100%" stopColor="rgba(249,202,0,.3)"/></linearGradient></defs>
      <path d={d} fill="none" stroke="url(#spk-ps2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

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

type ProblemBar = { label: string; before: string; beforePct: number; after: string; afterPct: number };
type Problem = { n: string; title: string; pill: string; icon: React.ReactNode; desc: string; bars: ProblemBar[] };

function AccordionItem({ item, open, onToggle, isMobile }: { item: Problem; open: boolean; onToggle: () => void; isMobile: boolean }) {
  const [afterWidths, setAfterWidths] = useState(item.bars.map(() => 0));
  useEffect(() => {
    if (open) { const t = setTimeout(() => setAfterWidths(item.bars.map(b => b.afterPct)), 80); return () => clearTimeout(t); }
    else setAfterWidths(item.bars.map(() => 0));
  }, [open]);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,.07)', background: open ? 'rgba(255,255,255,.02)' : 'transparent', transition: 'background .2s' }}>
      <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', cursor: 'pointer' }}>
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'rgba(249,202,0,.15)', minWidth: 44, lineHeight: 1 }}>{item.n}</span>
        <div style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.4)', flexShrink: 0 }}>{item.icon}</div>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', flex: 1, fontFamily: "'Exo 2',sans-serif" }}>{item.title}</span>
        {!isMobile && <span style={{ padding: '4px 10px', fontSize: 10, fontWeight: 700, color: 'var(--y)', border: '1px solid rgba(249,202,0,.25)', background: 'rgba(249,202,0,.06)', whiteSpace: 'nowrap' }}>{item.pill}</span>}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div style={{ maxHeight: open ? 600 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48, padding: '0 20px 28px 88px' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {item.bars.map((bar, bi) => (
              <div key={bi}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8, fontWeight: 600 }}>{bar.label}</div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}><span>Before</span><span style={{ color: 'rgba(255,120,80,.8)' }}>{bar.before}</span></div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${bar.beforePct}%`, background: 'rgba(255,80,80,.4)', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}><span>After</span><span style={{ color: 'var(--y)' }}>{bar.after}</span></div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${afterWidths[bi]}%`, background: 'var(--y)', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }} />
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPARKLINE = [20, 25, 22, 30, 35, 32, 40, 38, 45, 50, 48, 55, 60, 58, 65, 70, 68, 78, 85, 95];

const PROBLEMS: Problem[] = [
  {
    n: '01', title: 'Slow client onboarding', pill: 'From 2 days to 15 minutes',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="0"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    desc: 'New client setup takes 2 days of manual account creation, document sending, contract management, and meeting scheduling. A poor first impression that quietly erodes retention from day one.',
    bars: [
      { label: 'Onboarding time', before: '2 days', beforePct: 90, after: '15 min', afterPct: 2 },
      { label: 'Client satisfaction (CSAT)', before: '6.2/10', beforePct: 45, after: '9.1/10', afterPct: 92 },
    ],
  },
  {
    n: '02', title: 'Revenue leakage', pill: '5–15% of revenue recovered',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    desc: "Unbilled work, missed renewals, and billing errors silently cost professional services firms 5–15% of revenue every year. Most firms don't know what they're missing until we run the first reconciliation.",
    bars: [
      { label: 'Revenue leakage', before: '11.2%', beforePct: 62, after: '< 1%', afterPct: 5 },
      { label: 'Billing accuracy', before: '84%', beforePct: 55, after: '99.8%', afterPct: 100 },
    ],
  },
  {
    n: '03', title: 'Manual reporting', pill: '6h/week per manager reclaimed',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    desc: 'KPI reports assembled manually from CRM, billing systems, timesheets, and project tools — 6+ hours every week. Delivered Monday, outdated by Thursday. Decisions made on stale data.',
    bars: [
      { label: 'Report assembly time', before: '6h/week', beforePct: 90, after: '0 min', afterPct: 0 },
      { label: 'Data freshness', before: '5–7 days old', beforePct: 25, after: 'Real-time', afterPct: 100 },
    ],
  },
  {
    n: '04', title: 'Contract management failures', pill: '0 missed renewals',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    desc: 'Renewal deadlines missed because contracts live in email threads and spreadsheets nobody maintains. Lost revenue, awkward client conversations, and legal risk — all preventable.',
    bars: [
      { label: 'Renewals missed per quarter', before: '4–8', beforePct: 75, after: '0', afterPct: 0 },
      { label: 'Contract visibility', before: '34%', beforePct: 22, after: '100%', afterPct: 100 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'Client Onboarding Pipeline', desc: 'New client setup triggered automatically when a contract is signed. Account creation, welcome emails, meeting booking, and CRM entry — all in 15 minutes.', bullets: ['Contract signed triggers full onboarding automatically','Portal access, welcome pack, and intro meeting set up','CRM entry created with all client context','Completion notification sent to account manager'], tags: ['n8n','DocuSign','HubSpot','Calendly'], flow: { sources: ['Contract signed','DocuSign webhook'], engine: 'Onboarding Engine', outputs: ['Account created','Welcome email','Meeting booked'] } },
  { n: '02', title: 'Revenue Leakage Detector', desc: 'Weekly reconciliation of timesheets, project logs, and invoices. Every hour worked gets billed. Every billing error gets caught before it ships.', bullets: ['Timesheets vs invoices reconciled every week automatically','Unbilled hours flagged with draft invoice ready to approve','Billing errors identified and corrected before sending','Finance summary report delivered every Monday'], tags: ['n8n','Xero','QuickBooks','HubSpot'], flow: { sources: ['Timesheets','Project logs','Invoices'], engine: 'Reconciliation Engine', outputs: ['Leakage report','Finance alert','Draft invoice fix'] } },
  { n: '03', title: 'KPI Dashboard & Reporting', desc: 'Automated weekly KPI reports combining CRM, billing, and project data — delivered Monday morning with zero manual assembly.', bullets: ['CRM + billing + project tools connected in one pipeline','Customisable KPI metrics per team or client','Auto-delivered Monday at 7am via email and Slack','Live dashboard for real-time tracking between reports'], tags: ['Reporting','KPI dashboards','Automation'], flow: { sources: ['CRM','Billing','Project tools'], engine: 'Tergo Reporting Layer', outputs: ['Monday PDF','Live dashboard','Slack digest'] } },
  { n: '04', title: 'Contract Renewal Alerts', desc: 'Renewal deadlines tracked automatically with tiered alerts — 90 days, 30 days, and 7 days out. No renewal ever gets missed.', bullets: ['90/30/7-day tiered alerts per contract','Manager and client notified automatically','New contract draft auto-generated at 30-day mark','Full audit trail of all renewal communications'], tags: ['Document generation','n8n','Email','E-signature'], flow: { sources: ['Contract database','Renewal calendar'], engine: 'Renewal Engine', outputs: ['Manager alert','Client email','New contract draft'] } },
  { n: '05', title: 'CRM Rollout & Integration', desc: "We configure, migrate, and integrate your CRM so it actually gets used — custom pipelines, automation rules, and reporting dashboards tailored to how your business works.", bullets: ['Full CRM migration with data integrity checks','Custom pipelines and deal stages built for your workflow','Automation rules for follow-ups, tasks, and notifications','Team training and adoption support included'], tags: ['HubSpot','Salesforce','Pipedrive','Custom'], flow: { sources: ['Existing data','Current tools'], engine: 'CRM Integration Layer', outputs: ['Clean CRM','Automated workflows','Live dashboards'] } },
];

const STATS = [
  { val: '15min', label: 'Client onboarding time' },
  { val: '11%', label: 'Avg revenue leakage recovered' },
  { val: '6h', label: 'Saved per manager per week' },
  { val: '0', label: 'Missed renewal deadlines' },
];

const TESTIMONIALS = [
  { quote: "We were losing around £90K a year to unbilled work and had no idea. The reconciliation system found it in week one. It's paid for itself ten times over.", name: 'Marco Ferretti', role: 'Managing Partner, Meridian Advisory Group Milan', initials: 'MF', tag: 'Milan · Management Consultancy' },
  { quote: 'Our onboarding used to take two days and feel chaotic. Now clients have portal access, a welcome pack, and a meeting booked within 20 minutes of signing. The feedback has been incredible.', name: 'Sarah Mitchell', role: 'COO, Vertex Consulting London', initials: 'SM', tag: 'London · Strategy Consulting' },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ProfServClient() {
  const isMobile = useIsMobile();
  const [openProblem, setOpenProblem] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);
  const sol = SOLUTIONS[activeTab];

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', background: '#0d0d0d', overflow: 'hidden', paddingTop: 'clamp(100px,14vw,180px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 2 }} />
        <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 64, alignItems: 'center' }}>
            <div>
              <div className="page-hero-eyebrow">Sector — Professional Services</div>
              <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '16px 0 24px' }}>
                Less admin.<br /><em style={{ color: 'var(--y)', fontStyle: 'normal' }}>More billable work.</em>
              </h1>
              <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,.55)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
                Client onboarding, billing reconciliation, KPI reporting, and contract renewals — all automated so your team focuses on the work that matters.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a free audit →</a>
                <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
              </div>
              <div className="met-row">
                <div className="met"><div className="met-b">15<span>min</span></div><div className="met-s">Client onboarding<br />time</div></div>
                <div className="met"><div className="met-b">11<span>%</span></div><div className="met-s">Revenue leakage<br />recovered</div></div>
                <div className="met"><div className="met-b">6<span>h</span></div><div className="met-s">Saved per week<br />on reporting</div></div>
                <div className="met"><div className="met-b">0</div><div className="met-s">Missed renewal<br />deadlines</div></div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', padding: 32 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 24 }}>Live impact — Professional Services</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,.06)', marginBottom: 24 }}>
                {[{ val: '15min' }, { val: '11%' }, { val: '6h' }, { val: '0' }].map((item, i) => (
                  <div key={i} style={{ background: '#0d0d0d', padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1 }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 16 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Automation impact over time</div>
                <SparkLine data={SPARKLINE} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">What keeps professional services firms from growing.</h2>
            <p className="sec-sub">The same four operational bottlenecks cost firms thousands in lost revenue and wasted hours every year. Here&apos;s what they cost — and what changes after we fix them.</p>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,.07)' }}>
            {PROBLEMS.map((item, i) => (
              <AccordionItem key={i} item={item} open={openProblem === i} onToggle={() => setOpenProblem(openProblem === i ? null : i)} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">What we build</span>
            <h2 className="sec-title">From contract signed to<br />invoice paid — automated.</h2>
            <p className="sec-sub">We handle the full operational stack: onboarding flows, revenue reconciliation, KPI reporting, contract management, and CRM — all custom-built for your firm.</p>
          </div>
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 40, scrollbarWidth: 'none' }}>
            {SOLUTIONS.map((s, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: activeTab === i ? 'var(--y)' : 'rgba(255,255,255,.35)', background: 'transparent', border: 'none', borderBottom: activeTab === i ? '2px solid var(--y)' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color .2s', marginBottom: -1 }}>
                {s.n} {s.title}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 48 }}>
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

      {/* STATS */}
      <section style={{ background: 'var(--dark)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,.06)' }}>
          {STATS.map((s, i) => <StatItem key={i} val={s.val} label={s.label} />)}
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="section roi-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
            <span className="sec-label">Free estimate</span>
            <h2 className="sec-title">What could automation save<br />your professional services firm?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — admin hours saved, revenue recovered, ROI.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">Meridian Advisory Group · Milan</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Management Consultancy</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,.04)' }}>
            {[
              { label: 'The Problem', content: '22-person consultancy losing ~8% revenue to unbilled work and billing errors. Onboarding took 2 days. No contract renewal tracking. Managers spending 6h/week assembling reports.' },
              { label: 'What We Built', content: 'Three systems: client onboarding pipeline triggered by DocuSign, weekly revenue reconciliation comparing timesheets to invoices, contract renewal tracker with tiered alerts at 90/30/7 days.' },
              { label: 'The Result', content: 'Revenue leakage from 8% to under 1% in Q1. Onboarding from 2 days to 18 minutes. Zero missed renewals in 12 months. Every manager reclaimed 6h/week.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(3,160px)', gap: 1, marginTop: 1 }}>
            {[{ val: '< 1%', label: 'Revenue leakage' }, { val: '18min', label: 'Onboarding time' }, { val: '0', label: 'Missed renewals' }].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'var(--y)', marginBottom: 6 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">Client results</span>
            <h2 className="sec-title">From the firms who made the switch.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 1, background: 'rgba(255,255,255,.04)' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: 'var(--dark)', padding: 36, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                  <path d="M0 20V12.5C0 5.6 4.2 1.4 12.6 0l1.4 2.1C9.1 3.2 6.7 5.7 6.3 9.5H11V20H0zm17 0V12.5C17 5.6 21.2 1.4 29.6 0L31 2.1C26.1 3.2 23.7 5.7 23.3 9.5H28V20H17z" fill="rgba(249,202,0,.18)" />
                </svg>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 20 }}>
                  <div style={{ width: 40, height: 40, background: 'rgba(249,202,0,.1)', border: '1px solid rgba(249,202,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--y)', flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>{t.role}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', padding: '4px 10px', background: 'rgba(249,202,0,.06)', border: '1px solid rgba(249,202,0,.18)', color: 'var(--y)', fontSize: 10, fontWeight: 700, letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to eliminate the admin overhead?</h2>
          <p>Book a free 30-minute audit. We&apos;ll identify your biggest automation opportunity and scope it — at no cost.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free audit →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
