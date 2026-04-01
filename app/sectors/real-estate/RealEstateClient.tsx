/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';
import TestimonialsSection from '@/components/TestimonialsSection';
import AutopilotSection from '@/components/AutopilotSection';
import WhitepaperGate from '@/components/WhitepaperGate';

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
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'var(--y)', minWidth: 44, lineHeight: 1 }}>{item.n}</span>
        <div style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.4)', flexShrink: 0 }}>{item.icon}</div>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', flex: 1, fontFamily: "'Exo 2',sans-serif" }}>{item.title}</span>
        {!isMobile && <span style={{ padding: '4px 10px', fontSize: 10, fontWeight: 700, color: 'var(--y)', border: '1px solid rgba(249,202,0,.25)', background: 'rgba(249,202,0,.06)', whiteSpace: 'nowrap' }}>{item.pill}</span>}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div style={{ maxHeight: open ? 600 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48, padding: isMobile ? '0 16px 24px' : '0 20px 28px 88px' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {item.bars.map((bar, bi) => (
              <div key={bi}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8, fontWeight: 600 }}>{bar.label}</div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}><span>Before</span><span style={{ color: 'rgba(255,120,80,.8)' }}>{bar.before}</span></div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${bar.beforePct}%`, background: 'rgba(255,40,40,.85)', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}><span>After</span><span style={{ color: '#22c55e' }}>{bar.after}</span></div>
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


const PROBLEMS: Problem[] = [
  {
    n: '01', title: 'Slow lead response times', pill: 'From 6h to 90 seconds',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    desc: 'Leads from Property Finder, Bayut, and Dubizzle arrive and wait hours for a reply. The agency that responds first wins the deal — and it is almost never you. 78% of leads go with the first agent who calls.',
    bars: [
      { label: 'Lead response time', before: '4–8 hours', beforePct: 90, after: '90 seconds', afterPct: 3 },
      { label: 'Lead conversion rate', before: '8%', beforePct: 18, after: '23%', afterPct: 55 },
    ],
  },
  {
    n: '02', title: 'Manual CRM data entry', pill: '0 manual entries',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    desc: 'Every inbound lead requires an agent to manually create a contact, copy portal details into the CRM, and assign follow-up tasks. 45 minutes per lead, per day, multiplied across a team of ten is a full-time job doing nothing productive.',
    bars: [
      { label: 'CRM entry time per lead', before: '8–12 min', beforePct: 88, after: '0 min', afterPct: 0 },
      { label: 'Data completeness', before: '61%', beforePct: 35, after: '100%', afterPct: 100 },
    ],
  },
  {
    n: '03', title: 'Viewing coordination chaos', pill: '2h saved per booking',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    desc: 'Scheduling viewings means back-and-forth with clients, agents, and landlords — all via WhatsApp. Confirmations get missed. Double bookings happen. Keys go missing. Each viewing takes 90 minutes of coordination before it even starts.',
    bars: [
      { label: 'Viewing coordination time', before: '90 min', beforePct: 85, after: '< 5 min', afterPct: 6 },
      { label: 'No-show rate', before: '28%', beforePct: 60, after: '9%', afterPct: 20 },
    ],
  },
  {
    n: '04', title: 'No pipeline visibility', pill: 'Automated weekly reports',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    desc: 'Management asks for pipeline status — an agent spends an afternoon building a spreadsheet from CRM exports. By the time it lands in the inbox, the data is two days old and three deals have moved. Decisions get made on stale information.',
    bars: [
      { label: 'Pipeline report assembly', before: '4h manual', beforePct: 88, after: '0 min', afterPct: 0 },
      { label: 'Report data freshness', before: '2–3 days old', beforePct: 20, after: 'Real-time', afterPct: 100 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'AI Lead Qualification', desc: 'Every inbound lead from every portal gets an instant, personalised first response via WhatsApp and email — qualified and routed to the right agent in seconds.', bullets: ['90-second first response on Property Finder, Bayut, Dubizzle','AI qualifies budget, timeline, and property type automatically','Hot leads routed to senior agents instantly via WhatsApp','Cold leads enter nurture sequences with no manual input'], tags: ['n8n','WhatsApp','AI','Property Finder API'], flow: { sources: ['Property Finder', 'Bayut', 'Dubizzle', 'Website'], engine: 'AI Lead Qualification Engine', outputs: ['Instant response', 'Agent routing', 'Nurture sequence'] } },
  { n: '02', title: 'CRM Sync Engine', desc: 'Every portal lead automatically creates a fully populated CRM contact — name, budget, timeline, property type, source, and status — with zero manual input from your team.', bullets: ['Instant contact creation from all portals','Budget, timeline, and preferences extracted automatically','Duplicate detection and contact merging built in','Activity log maintained automatically as deals progress'], tags: ['CRM','n8n','Property portals','Automation'], flow: { sources: ['Portal lead', 'Website form', 'WhatsApp'], engine: 'CRM Sync Engine', outputs: ['Contact created', 'Pipeline updated', 'Agent notified'] } },
  { n: '03', title: 'Viewing Coordination', desc: 'Automated viewing scheduling with landlord availability checking, client confirmation flows, and reminder sequences — coordinated entirely without agent involvement.', bullets: ['Client books viewing via branded booking link','Landlord availability checked and confirmed automatically','Confirmation sent to all parties instantly','24h and 2h reminders reduce no-shows by 68%'], tags: ['Calendly','WhatsApp','Email','n8n'], flow: { sources: ['Client request', 'Agent availability', 'Property calendar'], engine: 'Viewing Scheduler', outputs: ['Confirmed booking', 'Landlord notification', 'Reminder sequence'] } },
  { n: '04', title: 'Follow-up Sequences', desc: 'Multi-touch follow-up sequences triggered automatically based on lead status, viewing outcome, and time elapsed — so no deal goes cold unintentionally.', bullets: ['Post-viewing follow-up sent within 1 hour automatically','7-day, 14-day, and 30-day nurture sequences','Status-based branching — offer made, rejected, or stalled','WhatsApp + email sequencing with open tracking'], tags: ['n8n','WhatsApp','Email','CRM'], flow: { sources: ['Viewing completed', 'CRM status change', 'Timer trigger'], engine: 'Follow-up Engine', outputs: ['WhatsApp message', 'Email sequence', 'Task for agent'] } },
  { n: '05', title: 'Performance Dashboard', desc: 'Live pipeline dashboard with automated weekly reports delivered to management — leads by source, conversion rates, pipeline value, and agent performance.', bullets: ['Real-time pipeline value and stage breakdown','Lead source attribution by portal and campaign','Agent performance metrics updated continuously','Automated Monday morning summary email to directors'], tags: ['Reporting','Dashboards','Automation'], flow: { sources: ['CRM data', 'Portal stats', 'Agent activity'], engine: 'Tergo Reporting Layer', outputs: ['Live dashboard', 'Monday report', 'Anomaly alerts'] } },
];

const STATS = [
  { val: '90s', label: 'Average lead response time' },
  { val: '100%', label: 'Follow-up coverage' },
  { val: '8k+', label: 'Tasks automated per month' },
  { val: '0', label: 'Leads that fall through' },
];


// ─── Main ─────────────────────────────────────────────────────────────────────

export default function RealEstateClient() {
  const isMobile = useIsMobile();
  const [openProblem, setOpenProblem] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);
  const sol = SOLUTIONS[activeTab];

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', background: '#0d0d0d', overflow: 'hidden', paddingTop: 'clamp(100px,14vw,180px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.10)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 2 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 3 }} />
        <div className="container" style={{ position: 'relative', zIndex: 4, width: '100%' }}>
          <div style={{ maxWidth: 680 }}>
              <div className="page-hero-eyebrow">Sector — Real Estate</div>
              <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '16px 0 24px' }}>
                Real estate leads.<br /><em style={{ color: 'var(--y)', fontStyle: 'normal' }}>Qualified in 90 seconds.</em>
              </h1>
              <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,.55)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
                AI lead qualification, CRM sync, viewing coordination, and follow-up sequences — running automatically across all portals while your agents close deals.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
                <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
              </div>
              <div className="met-row">
                <div className="met"><div className="met-b">90<span>s</span></div><div className="met-s">Lead response<br />time</div></div>
                <div className="met"><div className="met-b">100<span>%</span></div><div className="met-s">Follow-up<br />coverage</div></div>
                <div className="met"><div className="met-b">8k<span>+</span></div><div className="met-s">Tasks automated<br />per month</div></div>
                <div className="met"><div className="met-b">0</div><div className="met-s">Leads that<br />fall through</div></div>
              </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why real estate agencies lose deals — and how to stop it.</h2>
            <p className="sec-sub">The same four operational failures cost agencies thousands of hours and millions in commissions every year. Here&apos;s what changes when we automate them.</p>
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
            <h2 className="sec-title">From portal inquiry to closed deal — automated.</h2>
            <p className="sec-sub">We handle the full lead-to-commission stack: instant qualification, CRM sync, viewing scheduling, follow-up sequences, and live performance reporting — all custom-built for your agency.</p>
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
            <h2 className="sec-title">What could automation save<br />your real estate agency?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — agent hours saved, leads recovered, and ROI.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">RE/MAX Gulf · Dubai</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Real Estate · Residential & Commercial</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,.04)' }}>
            {[
              { label: 'The Problem', content: 'RE/MAX Gulf was receiving 100+ leads per day across Property Finder, Bayut, and Dubizzle. Average first response time was 5–7 hours. Agents spent 3+ hours daily on manual CRM data entry and follow-up coordination. Over 60% of leads received no second contact.' },
              { label: 'What We Built', content: 'End-to-end lead automation: 90-second WhatsApp and email first response, automatic CRM population with AI-extracted budget, timeline, and property preferences, viewing scheduling automation with landlord confirmation flows, and multi-touch follow-up sequences — shipped in 4 weeks.' },
              { label: 'The Result', content: 'Lead response time dropped from 5–7 hours to 90 seconds. CRM completeness went from 58% to 100%. Viewing bookings increased 43%. Zero manual CRM entries. Commission revenue increased 31% in the first quarter post-launch.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(3,160px)', gap: 1, marginTop: 1 }}>
            {[{ val: '90s', label: 'Lead response' }, { val: '+43%', label: 'Viewings booked' }, { val: '+31%', label: 'Commission revenue' }].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'var(--y)', marginBottom: 6 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHITEPAPER */}
      <WhitepaperGate />

      {/* AUTOPILOT */}
      <AutopilotSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to automate your<br />lead pipeline?</h2>
          <p>Book a free discovery call. We&apos;ll show you exactly how fast we can get your agency responding to every lead in 90 seconds — and what that does to your conversion rate.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
