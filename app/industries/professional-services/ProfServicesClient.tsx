/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';

// ─── SparkLine ────────────────────────────────────────────────────────────────

function SparkLine({ data }: { data: number[] }) {
  const W = 300, H = 60;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - min) / (max - min)) * (H - 8) - 4,
  ]);
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cpx = (x0 + x1) / 2;
    d += ` C ${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 48, display: 'block' }}>
      <defs>
        <linearGradient id="spk-ps" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f9ca00" />
          <stop offset="100%" stopColor="#00c8ff" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#spk-ps)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── FlowDiagram ─────────────────────────────────────────────────────────────

function FlowDiagram({ flow }: { flow: { sources: string[]; engine: string; outputs: string[] } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {flow.sources.map(s => (
          <div key={s} style={{ padding: '6px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.6)', fontSize: 11 }}>{s}</div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 14 }}>↓</div>
      <div style={{ padding: '10px 16px', background: 'rgba(0,200,255,.06)', border: '1px solid rgba(0,200,255,.25)', color: 'var(--nb)', fontWeight: 700, textAlign: 'center', fontSize: 12 }}>{flow.engine}</div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 14 }}>↓</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {flow.outputs.map(o => (
          <div key={o} style={{ padding: '6px 12px', background: 'rgba(0,255,157,.04)', border: '1px solid rgba(0,255,157,.2)', color: 'var(--ng)', fontSize: 11 }}>{o}</div>
        ))}
      </div>
    </div>
  );
}

// ─── StatItem ─────────────────────────────────────────────────────────────────

function StatItem({ val, label, color, borderColor }: { val: string; label: string; color: string; borderColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ borderTop: `2px solid ${borderColor}`, padding: '32px 28px', textAlign: 'center', background: 'var(--dark)' }}>
      <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color, lineHeight: 1, marginBottom: 10, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: 'opacity .5s ease, transform .5s ease' }}>{val}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPARKLINE_DATA = [20,25,22,30,35,32,40,38,45,50,48,55,60,58,65,70,68,78,85,95];

const PS_PROBLEMS = [
  {
    n: '01', title: 'Slow client onboarding', pill: 'From 2 days to 15 minutes', pillColor: 'var(--y)',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="0"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    desc: 'New client setup takes 2 days of manual account creation, document sending, contract management, and meeting scheduling. A poor first impression that quietly erodes retention from day one.',
    bars: [
      { label: 'Onboarding time', before: '2 days', beforePct: 90, after: '15 min', afterPct: 2 },
      { label: 'Client satisfaction (CSAT)', before: '6.2/10', beforePct: 45, after: '9.1/10', afterPct: 92 },
    ],
  },
  {
    n: '02', title: 'Revenue leakage', pill: '5–15% of revenue recovered', pillColor: 'var(--nb)',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    desc: "Unbilled work, missed renewals, and billing errors silently cost professional services firms 5–15% of revenue every year. Most firms don't know what they're missing until we run the first reconciliation.",
    bars: [
      { label: 'Revenue leakage', before: '11.2%', beforePct: 62, after: '< 1%', afterPct: 5 },
      { label: 'Billing accuracy', before: '84%', beforePct: 55, after: '99.8%', afterPct: 100 },
    ],
  },
  {
    n: '03', title: 'Manual reporting', pill: '6h/week per manager reclaimed', pillColor: 'var(--ng)',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    desc: 'KPI reports assembled manually from CRM, billing systems, timesheets, and project tools — 6+ hours every week. Delivered Monday, outdated by Thursday. Decisions made on stale data.',
    bars: [
      { label: 'Report assembly', before: '6h/week', beforePct: 90, after: '0 min', afterPct: 0 },
      { label: 'Data freshness', before: '5–7 days old', beforePct: 30, after: 'Real-time', afterPct: 100 },
    ],
  },
  {
    n: '04', title: 'Contract management failures', pill: '0 missed renewals', pillColor: 'var(--nb)',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="6" y1="9" x2="12" y2="15"/><line x1="18" y1="9" x2="12" y2="15"/></svg>,
    desc: 'Renewal deadlines missed because contracts live in email threads and spreadsheets nobody maintains. Lost revenue, awkward client conversations, and legal risk — all preventable.',
    bars: [
      { label: 'Renewals missed per quarter', before: '4–8', beforePct: 75, after: '0', afterPct: 0 },
      { label: 'Contract visibility', before: '34%', beforePct: 22, after: '100%', afterPct: 100 },
    ],
  },
];

const PS_SOLUTIONS = [
  { n: '01', title: 'Client Onboarding Pipeline', desc: 'New client setup triggered automatically when a contract is signed. Account creation, welcome emails, meeting booking, and CRM entry — all in 15 minutes.', bullets: ['Contract signed triggers full onboarding automatically','Portal access, welcome pack, and intro meeting all set up','CRM entry created with all client context','Completion notification sent to account manager'], tags: ['n8n','DocuSign','HubSpot','Calendly'], flow: { sources: ['Contract signed','DocuSign webhook'], engine: 'Onboarding Engine', outputs: ['Account created','Welcome email','Meeting booked','CRM entry'] } },
  { n: '02', title: 'Revenue Leakage Detector', desc: 'Weekly reconciliation of timesheets, project logs, and invoices. Every hour worked gets billed. Every billing error gets caught.', bullets: ['Timesheets vs invoices reconciled every week automatically','Unbilled hours flagged with draft invoice ready to approve','Billing errors identified and corrected before sending','Finance summary report delivered every Monday'], tags: ['n8n','Xero','QuickBooks','HubSpot'], flow: { sources: ['Timesheets','Project logs','Invoices'], engine: 'Reconciliation Engine', outputs: ['Leakage report','Finance alert','Draft invoice fix'] } },
  { n: '03', title: 'KPI Dashboard & Reporting', desc: 'Automated weekly KPI reports combining CRM, billing, and project data — delivered Monday morning with zero manual assembly.', bullets: ['CRM + billing + project tools connected in one pipeline','Customisable KPI metrics per team or client','Auto-delivered Monday at 7am via email and Slack','Live dashboard for real-time tracking between reports'], tags: ['Reporting','KPI dashboards','Automation'], flow: { sources: ['CRM','Billing','Project tools'], engine: 'Tergo Reporting Layer', outputs: ['Monday PDF','Live dashboard','Slack digest'] } },
  { n: '04', title: 'Contract Renewal Alerts', desc: 'Renewal deadlines tracked automatically with tiered alerts — 90 days, 30 days, and 7 days out. No renewal ever gets missed.', bullets: ['90/30/7-day tiered alerts per contract','Manager and client notified automatically','New contract draft auto-generated at 30-day mark','Full audit trail of all renewal communications'], tags: ['Document generation','n8n','Email','E-signature'], flow: { sources: ['Contract database','Renewal calendar'], engine: 'Renewal Engine', outputs: ['Manager alert','Client email','New contract draft'] } },
];

const PS_STATS = [
  { val: '15min', label: 'Client onboarding time', color: 'var(--y)', borderColor: 'var(--y)' },
  { val: '11%', label: 'Avg revenue leakage recovered', color: 'var(--nb)', borderColor: 'var(--nb)' },
  { val: '6h', label: 'Saved per manager per week', color: 'var(--ng)', borderColor: 'var(--ng)' },
  { val: '0', label: 'Missed renewal deadlines', color: '#fff', borderColor: 'rgba(255,255,255,.2)' },
];

const PS_TESTIMONIALS = [
  { quote: "We were losing around £90K a year to unbilled work and had no idea. The reconciliation system found it in week one. It's paid for itself ten times over.", name: 'Marco Ferretti', role: 'Managing Partner, Meridian Advisory Group Milan', initials: 'MF', tag: 'Milan · Management Consultancy', accent: 'var(--y)' },
  { quote: 'Our onboarding used to take two days and feel chaotic. Now clients have portal access, a welcome pack, and a meeting booked within 20 minutes of signing. The feedback has been incredible.', name: 'Sarah Mitchell', role: 'COO, Vertex Consulting London', initials: 'SM', tag: 'London · Strategy Consulting', accent: 'var(--nb)' },
];

// ─── AccordionItem ────────────────────────────────────────────────────────────

type ProblemItem = typeof PS_PROBLEMS[0];

function AccordionItem({ item, open, onToggle, isMobile }: { item: ProblemItem; open: boolean; onToggle: () => void; isMobile: boolean }) {
  const [barWidths, setBarWidths] = useState<number[]>(item.bars.map(() => 0));
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setBarWidths(item.bars.map(b => b.afterPct)), 80);
      return () => clearTimeout(t);
    } else {
      setBarWidths(item.bars.map(() => 0));
    }
  }, [open]);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
      <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', cursor: 'pointer', background: open ? 'rgba(255,255,255,.03)' : 'transparent', transition: 'background .2s' }}>
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'rgba(249,202,0,.15)', minWidth: 40 }}>{item.n}</span>
        <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,.12)', flexShrink: 0, color: 'rgba(255,255,255,.4)' }}>{item.icon}</div>
        <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#fff' }}>{item.title}</span>
        <span style={{ padding: '4px 10px', background: `${item.pillColor}18`, border: `1px solid ${item.pillColor}44`, color: item.pillColor, fontSize: 10, fontWeight: 700, letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{item.pill}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      {open && (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 48, padding: '24px 20px 32px', borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {item.bars.map((bar, bi) => (
              <div key={bi}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginBottom: 8 }}>{bar.label}</div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}><span>Before</span><span>{bar.before}</span></div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative' }}><div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${bar.beforePct}%`, background: 'rgba(255,80,80,.5)', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }}/></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}><span>After</span><span>{bar.after}</span></div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative' }}><div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${barWidths[bi]}%`, background: 'var(--ng)', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfServicesClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [openProblem, setOpenProblem] = useState<number | null>(0);
  const [activeSolution, setActiveSolution] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sol = PS_SOLUTIONS[activeSolution];

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 'clamp(80px,10vw,140px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.22)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 100%)', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div className="page-hero-eyebrow">Industry Expertise</div>
              <h1 style={{ fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
                We&apos;ve automated professional services <em>inside out.</em>
              </h1>
              <p style={{ fontSize: 'clamp(15px,1.6vw,18px)', color: 'rgba(255,255,255,.55)', lineHeight: 1.7, marginBottom: 32 }}>
                Client onboarding, billing, reporting, and compliance — all automated so your team focuses on billable work, not admin.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a free audit →</a>
                <Link href="/portfolio" className="btn btn-ol btn-lg">See our work</Link>
              </div>
              <div className="met-row">
                <div className="met"><div className="met-b">15<span>min</span></div><div className="met-s">Client onboarding time</div></div>
                <div className="met"><div className="met-b">11<span>%</span></div><div className="met-s">Revenue leakage recovered</div></div>
                <div className="met"><div className="met-b">6<span>h</span></div><div className="met-s">Saved per week on reporting</div></div>
                <div className="met"><div className="met-b">0</div><div className="met-s">Missed renewal deadlines</div></div>
              </div>
            </div>
            {/* Right — metrics card */}
            <div style={{ background: 'rgba(10,10,10,.85)', border: '1px solid rgba(255,255,255,.1)', padding: '32px 28px' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 20 }}>Live impact — Professional Services</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 24 }}>
                {[
                  { val: '15min', label: 'Onboarding time', color: 'var(--y)' },
                  { val: '11%', label: 'Revenue recovered', color: 'var(--nb)' },
                  { val: '6h', label: 'Reporting saved', color: 'var(--ng)' },
                  { val: '0', label: 'Missed renewals', color: '#fff' },
                ].map(m => (
                  <div key={m.label} style={{ background: 'rgba(255,255,255,.03)', padding: '20px 16px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: m.color, lineHeight: 1 }}>{m.val}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 6 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <SparkLine data={SPARKLINE_DATA} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ACCORDION ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">The problems we solve</span>
          <h2 className="sec-title">What slows professional services<br />businesses down</h2>
          <div style={{ marginTop: 40, border: '1px solid rgba(255,255,255,.07)' }}>
            {PS_PROBLEMS.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                open={openProblem === i}
                onToggle={() => setOpenProblem(openProblem === i ? null : i)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS TABS ── */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Our solutions</span>
          <h2 className="sec-title">What we build for<br />professional services</h2>
          <div style={{ display: 'flex', gap: 2, marginTop: 40, flexWrap: 'wrap' }}>
            {PS_SOLUTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSolution(i)}
                style={{ padding: '10px 18px', background: activeSolution === i ? 'var(--y)' : 'rgba(255,255,255,.04)', border: '1px solid ' + (activeSolution === i ? 'var(--y)' : 'rgba(255,255,255,.1)'), color: activeSolution === i ? '#0a0a0a' : 'rgba(255,255,255,.5)', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}
              >
                {s.n} {s.title}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 2, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', padding: '32px 28px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 40 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>{sol.n}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12, fontFamily: "'Exo 2',sans-serif" }}>{sol.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, marginBottom: 20 }}>{sol.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sol.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,.6)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ng)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sol.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>How it works</div>
              <FlowDiagram flow={sol.flow} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: 'var(--dark2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 2 }}>
          {PS_STATS.map(s => (
            <StatItem key={s.val} val={s.val} label={s.label} color={s.color} borderColor={s.borderColor} />
          ))}
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
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

      {/* ── CASE STUDY ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">Case study</span>
          <h2 className="sec-title">Meridian Advisory Group<br /><span style={{ color: 'rgba(255,255,255,.35)', fontWeight: 400 }}>Milan, Italy</span></h2>
          <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em', marginBottom: 40 }}>Management Consultancy</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 2, background: 'rgba(255,255,255,.04)' }}>
            {[
              { label: 'The Problem', content: '22-person consultancy losing ~8% revenue to unbilled work and billing errors. Onboarding took 2 days. No contract renewal tracking. Managers spending 6h/week on reports.' },
              { label: 'What We Built', content: 'Three systems: client onboarding pipeline triggered by DocuSign, weekly revenue reconciliation comparing timesheets to invoices, contract renewal tracker with tiered alerts at 90/30/7 days.' },
              { label: 'The Result', content: 'Revenue leakage from 8% to under 1% in Q1. Onboarding from 2 days to 18 minutes. Zero missed renewals in 12 months. Every manager reclaimed 6h/week.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(3,200px)', gap: 2, marginTop: 2 }}>
            {[
              { val: '< 1%', label: 'Revenue leakage', color: 'var(--y)' },
              { val: '18min', label: 'Onboarding time', color: 'var(--nb)' },
              { val: '0', label: 'Missed renewals in 12 months', color: 'var(--ng)' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: s.color, marginBottom: 6 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Client results</span>
          <h2 className="sec-title">What our clients say.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 2, marginTop: 40 }}>
            {PS_TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: 'var(--dark)', border: '1px solid rgba(255,255,255,.06)', padding: '28px 24px', borderTop: `2px solid ${t.accent}` }}>
                <div style={{ fontSize: 32, color: t.accent, lineHeight: 1, marginBottom: 12, fontFamily: 'Georgia,serif' }}>&ldquo;</div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,.7)', lineHeight: 1.75, marginBottom: 20 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: `${t.accent}22`, border: `1px solid ${t.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: t.accent, flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)' }}>{t.role}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', padding: '3px 8px', background: `${t.accent}12`, border: `1px solid ${t.accent}30`, color: t.accent, fontSize: 10, fontWeight: 600 }}>{t.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to automate your professional services firm?</h2>
          <p>Book a free 30-minute audit. We&apos;ll identify your biggest automation opportunity and scope it — at no cost.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free audit →</a>
            <Link href="/services" className="btn btn-ol btn-lg">Browse automation library</Link>
          </div>
        </div>
      </section>
    </>
  );
}
