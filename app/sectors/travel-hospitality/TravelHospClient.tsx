/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';
import SectorTestimonialsSlider from '@/components/SectorTestimonialsSlider';

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
    n: '01', title: 'Manual guest communications', pill: 'From 6h delay to instant',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    desc: 'Confirmation emails, pre-arrival instructions, upsell messages, and post-stay follow-ups written and sent manually — hours of staff time every day, inconsistent quality, and frequent delays that cost you reviews.',
    bars: [
      { label: 'Time to first guest message', before: '2–6 hours', beforePct: 85, after: 'Instant', afterPct: 2 },
      { label: 'Guest comms consistency', before: '62%', beforePct: 38, after: '100%', afterPct: 100 },
    ],
  },
  {
    n: '02', title: 'Review response gaps', pill: '<2 hours on all platforms',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    desc: 'Every unanswered review is a missed marketing opportunity. Manual responses take days — or never happen at all. Your TripAdvisor and Google scores quietly drop while competitors respond within hours.',
    bars: [
      { label: 'Average review response time', before: '3–7 days', beforePct: 88, after: '< 2 hrs', afterPct: 5 },
      { label: 'Review response rate', before: '34%', beforePct: 25, after: '100%', afterPct: 100 },
    ],
  },
  {
    n: '03', title: 'No live revenue visibility', pill: '6h/week reclaimed on reporting',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    desc: "RevPAR, ADR, occupancy, and channel attribution assembled manually from five different systems every week. 6 hours of management time. Delivered Monday, stale by Wednesday. Decisions made on week-old data.",
    bars: [
      { label: 'Weekly report assembly', before: '6h manual', beforePct: 90, after: '0 min', afterPct: 0 },
      { label: 'Data freshness', before: '5–7 days old', beforePct: 25, after: 'Real-time', afterPct: 100 },
    ],
  },
  {
    n: '04', title: 'Channel fragmentation', pill: '0 double bookings',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    desc: 'Booking.com, Expedia, Airbnb, and your direct booking engine all managed separately. Availability updated manually. Double bookings happen. Pricing drifts out of sync. Channel managers that actually work fix all of this.',
    bars: [
      { label: 'Inventory update lag', before: '2–8 hours', beforePct: 80, after: 'Real-time', afterPct: 2 },
      { label: 'Double booking incidents', before: '3–8/month', beforePct: 70, after: '0', afterPct: 0 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'Booking Confirmation Flow', desc: 'Every booking triggers an instant multi-channel confirmation with upsell sequences and pre-arrival packs — personalised, branded, automated.', bullets: ['Instant confirmation across email, SMS, WhatsApp','Upsell sequences triggered 7 days, 3 days, day-of','Pre-arrival pack with check-in instructions and local tips','Post-stay follow-up and review request on day 2'], tags: ['n8n','WhatsApp','Email','SMS'], flow: { sources: ['Booking.com', 'Expedia', 'Direct'], engine: 'Booking Confirmation Engine', outputs: ['Instant confirmation', 'Upsell sequence', 'Pre-arrival pack'] } },
  { n: '02', title: 'Guest Communication AI', desc: 'AI-generated, brand-consistent responses to every guest message — personalised to their booking, stay, and preferences.', bullets: ['Handles FAQs, upgrade requests, local recommendations','Escalates complex queries to staff instantly','Personalised using booking data and guest history','Active across email, WhatsApp, and your booking portal'], tags: ['GPT-4o', 'WhatsApp', 'Email', 'n8n'], flow: { sources: ['Guest message', 'Booking data'], engine: 'Guest AI Layer', outputs: ['Personalised reply', 'Staff escalation', 'Resolution log'] } },
  { n: '03', title: 'Review Response Automation', desc: 'Every review on every platform gets a personalised, brand-consistent response within 2 hours — improving score and ranking.', bullets: ['TripAdvisor, Google, Booking.com, Airbnb covered','AI generates brand-consistent, personalised response','Negative reviews flagged for manager review before publishing','Monthly sentiment analysis report delivered automatically'], tags: ['AI', 'TripAdvisor', 'Google', 'Booking.com'], flow: { sources: ['TripAdvisor', 'Google', 'Booking.com'], engine: 'Review AI Engine', outputs: ['Draft response', 'Published reply', 'Sentiment report'] } },
  { n: '04', title: 'Channel Manager Sync', desc: 'Real-time availability and pricing sync across all OTAs and your direct booking engine. Zero double bookings, zero manual updates.', bullets: ['Live sync across all channels in under 60 seconds','Pricing rules applied consistently across platforms','Block-out dates propagated instantly to all OTAs','Booking data consolidated into single reporting view'], tags: ['Channel manager', 'OTA API', 'Real-time sync'], flow: { sources: ['PMS update', 'Price change', 'Availability change'], engine: 'Channel Sync Engine', outputs: ['Booking.com', 'Expedia', 'Airbnb', 'Direct'] } },
  { n: '05', title: 'Revenue Dashboard', desc: 'Live KPI dashboard with automated weekly reports. RevPAR, ADR, occupancy, and channel attribution — zero manual assembly.', bullets: ['Real-time RevPAR, ADR, and occupancy tracking','Channel-by-channel revenue attribution','Automated weekly PDF delivered Monday 7am','Anomaly detection and variance alerts'], tags: ['Reporting', 'Dashboards', 'Automation'], flow: { sources: ['PMS', 'OTAs', 'Direct bookings'], engine: 'Tergo Reporting Layer', outputs: ['Monday report', 'Live dashboard', 'Alert notifications'] } },
];

const STATS = [
  { val: '99.9%', label: 'System uptime across clients' },
  { val: '12k+', label: 'Tasks automated per month' },
  { val: '<2hr', label: 'Review response time' },
  { val: '0', label: 'Double bookings' },
];

const TESTIMONIALS = [
  { quote: "Our Monday morning KPI reports used to take the team 6 hours. Now they arrive automatically at 7am with zero manual work. And the review response system has taken our TripAdvisor score from 4.1 to 4.7 in four months.", name: 'Marco Bianchi', role: 'COO, Hospitality Group Milan', initials: 'MB', tag: 'Milan · Hotel Group' },
  { quote: "The guest communication AI handles 80% of all inbound messages without any human involvement. The quality is better than what our team was producing manually, and response times are instant.", name: 'Fatima Al-Hassan', role: 'General Manager, Boutique Resort Dubai', initials: 'FA', tag: 'Dubai · Boutique Resort' },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TravelHospClient() {
  const isMobile = useIsMobile();
  const [openProblem, setOpenProblem] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);
  const sol = SOLUTIONS[activeTab];

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', background: '#0d0d0d', overflow: 'hidden', paddingTop: 'clamp(100px,14vw,180px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 2 }} />
        <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <div style={{ maxWidth: 680 }}>
            <div className="page-hero-eyebrow">Sector — Travel &amp; Hospitality</div>
            <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '16px 0 24px' }}>
              Guest experience.<br /><em style={{ color: 'var(--y)', fontStyle: 'normal' }}>Fully automated.</em>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,.55)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
              Booking flows, guest communications, review responses, and revenue dashboards — all running without your team lifting a finger.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
              <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
            </div>
            <div className="met-row">
              <div className="met"><div className="met-b">99.9<span>%</span></div><div className="met-s">System uptime<br />across clients</div></div>
              <div className="met"><div className="met-b">12k<span>+</span></div><div className="met-s">Tasks automated<br />per month</div></div>
              <div className="met"><div className="met-b">2<span>hr</span></div><div className="met-s">Review response<br />time</div></div>
              <div className="met"><div className="met-b">0</div><div className="met-s">Double<br />bookings</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why hospitality operations stay manual — and shouldn&apos;t.</h2>
            <p className="sec-sub">The same four pain points cost hospitality businesses thousands of hours and lost reviews every year. Here&apos;s what changes after we automate them.</p>
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
            <h2 className="sec-title">From first booking to five-star review — automated.</h2>
            <p className="sec-sub">We handle the full guest journey stack: confirmation flows, AI comms, review automation, channel sync, and revenue reporting — all custom-built for your operation.</p>
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
            <h2 className="sec-title">What could automation save<br />your hospitality operation?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — guest hours saved, revenue recovered, ROI.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">Ranjet Aviation · Dubai</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Private Aviation · Charter Operations</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,.04)' }}>
            {[
              { label: 'The Problem', content: 'A Dubai-based private jet charter company managing bookings, crew scheduling, maintenance tracking, and client communications entirely manually. Each booking required 40+ minutes of back-and-forth coordination.' },
              { label: 'What We Built', content: 'Custom booking and fleet management system: real-time aircraft availability, multi-currency pricing, automated confirmation flows, crew scheduling, and client communication sequences — built in 6 weeks.' },
              { label: 'The Result', content: '100% of manual booking coordination eliminated. Booking time reduced from 40 minutes to under 4. Client satisfaction scores improved immediately. System has run at 99.9% uptime since launch.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(3,160px)', gap: 1, marginTop: 1 }}>
            {[{ val: '< 4min', label: 'Booking time' }, { val: '0', label: 'Manual steps' }, { val: '99.9%', label: 'Uptime' }].map(s => (
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
            <h2 className="sec-title">From the teams who run the properties.</h2>
          </div>
          <SectorTestimonialsSlider testimonials={TESTIMONIALS} source="sector-travel-hospitality" />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to automate your<br />guest journey?</h2>
          <p>Book a free discovery call. We&apos;ll show you what a modern automated hospitality operation looks like — and how fast we can get you there.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
