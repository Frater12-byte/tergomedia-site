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
    n: '01', title: 'Manual appointment scheduling', pill: '3-minute self-serve booking',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    desc: 'Phone-based appointment booking ties up reception staff for hours each day. Patients wait on hold. No-shows happen because reminders are sent manually — or not at all. Cancelled slots go unfilled because there is no automated waitlist.',
    bars: [
      { label: 'Booking time for patient', before: '8–15 min on hold', beforePct: 85, after: '< 3 min self-serve', afterPct: 8 },
      { label: 'No-show rate', before: '22%', beforePct: 70, after: '< 7%', afterPct: 22 },
    ],
  },
  {
    n: '02', title: 'Paper-based patient intake', pill: 'Digital intake in 5 minutes',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    desc: 'Patients fill paper forms on arrival. Receptionists re-type data into the system. Information is lost, misread, or incomplete. The clinician spends the first 10 minutes of every consultation reviewing a half-empty record.',
    bars: [
      { label: 'Intake form completion time', before: '15–20 min on arrival', beforePct: 80, after: '5 min before visit', afterPct: 17 },
      { label: 'Data entry errors per patient', before: '2–4', beforePct: 65, after: '0', afterPct: 0 },
    ],
  },
  {
    n: '03', title: 'Follow-up care gaps', pill: '100% follow-up coverage',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    desc: 'Post-visit follow-up, medication reminders, test result notifications, and recall sequences all depend on staff remembering to send them. Most fall through the cracks. Patients disengage. Chronic conditions deteriorate. Revenue per patient drops.',
    bars: [
      { label: 'Follow-up completion rate', before: '38%', beforePct: 25, after: '100%', afterPct: 100 },
      { label: 'Patient re-engagement rate', before: '41%', beforePct: 30, after: '78%', afterPct: 78 },
    ],
  },
  {
    n: '04', title: 'Manual billing and insurance claims', pill: '4x faster claims processing',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    desc: 'Insurance claims filed manually with frequent coding errors. Rejections require manual resubmission. Self-pay invoices chased by phone. Average collection time runs 60+ days. Admin staff spend more time on billing than patients do with clinicians.',
    bars: [
      { label: 'Claims processing time', before: '5–7 days', beforePct: 85, after: '< 24 hours', afterPct: 10 },
      { label: 'First-pass rejection rate', before: '18%', beforePct: 55, after: '< 3%', afterPct: 9 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'Online Appointment System', desc: '24/7 self-serve booking with intelligent scheduling, automated reminders, and a waitlist engine that fills every cancelled slot.', bullets: ['Patient self-books online in under 3 minutes', 'SMS, WhatsApp, and email reminders at 48h, 24h, and 2h before', 'Automated waitlist fills cancellations instantly', 'Two-way reschedule and cancellation links in every reminder'], tags: ['n8n', 'WhatsApp', 'SMS', 'Calendar API'], flow: { sources: ['Patient request', 'Cancellation', 'Waitlist'], engine: 'Appointment Scheduling Engine', outputs: ['Confirmed booking', 'Reminder sequence', 'Slot fill'] } },
  { n: '02', title: 'Digital Patient Intake', desc: 'Pre-visit intake forms sent automatically after booking — completed on any device before the patient arrives, with data flowing directly into the clinical system.', bullets: ['Branded intake form sent via SMS/email after booking', 'Medical history, consent, and insurance details captured digitally', 'Data flows directly into your clinical management system', 'Incomplete forms trigger automated completion reminders'], tags: ['Digital forms', 'e-Sign', 'CRM', 'n8n'], flow: { sources: ['Booking confirmed', 'Patient form', 'Insurance data'], engine: 'Patient Intake Engine', outputs: ['Clinical record', 'Consent log', 'Insurance pre-auth'] } },
  { n: '03', title: 'Care Follow-up Automation', desc: 'Automated post-visit sequences: result notifications, medication reminders, review bookings, and recall campaigns — all triggered by clinical events.', bullets: ['Post-visit summary and medication instructions sent automatically', 'Test result notification with next step guidance', 'Recall sequences triggered at 3, 6, and 12-month intervals', 'Patient satisfaction survey sent 24h after each visit'], tags: ['n8n', 'WhatsApp', 'SMS', 'Email'], flow: { sources: ['Visit complete', 'Test result', 'Recall schedule'], engine: 'Care Follow-up Engine', outputs: ['Post-visit message', 'Result notification', 'Recall booking'] } },
  { n: '04', title: 'Billing & Claims Automation', desc: 'Automated insurance claim submission with coding validation, rejection handling, and self-pay invoice sequences — reducing collection time and write-offs.', bullets: ['Insurance claims submitted automatically with coding validation', 'Rejection reason parsed and resubmission triggered automatically', 'Self-pay invoices sent with payment link and automated follow-up', 'Revenue cycle dashboard updated daily with payer performance'], tags: ['Insurance API', 'n8n', 'Automation', 'Billing'], flow: { sources: ['Visit record', 'Insurance data', 'Billing codes'], engine: 'Revenue Cycle Engine', outputs: ['Insurance claim', 'Patient invoice', 'Rejection resubmit'] } },
  { n: '05', title: 'Clinical Performance Dashboard', desc: 'Live appointment, revenue, and patient metrics — with automated weekly reports for clinic managers and daily alerts for critical variances.', bullets: ['Real-time appointment utilisation and no-show tracking', 'Revenue by payer, clinician, and service line', 'Patient recall compliance and follow-up completion rates', 'Automated weekly management report delivered every Monday'], tags: ['Dashboards', 'Reporting', 'Automation'], flow: { sources: ['Appointment data', 'Billing records', 'Patient records'], engine: 'Tergo Reporting Layer', outputs: ['Live dashboard', 'Weekly report', 'Variance alerts'] } },
];

const STATS = [
  { val: '<3min', label: 'Appointment\nbooking time' },
  { val: '−15%', label: 'No-show rate\nreduction' },
  { val: '100%', label: 'Follow-up\ncoverage' },
  { val: '4x', label: 'Faster claims\nprocessing' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function HealthcareClient() {
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
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.12)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,13,13,0.92) 30%, rgba(13,13,13,0.55) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 38%, rgba(249,202,0,0.18) 0%, transparent 52%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 75%, rgba(249,202,0,0.08) 0%, transparent 40%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 4 }} />
        <div className="container">
          <div className="page-hero-eyebrow">Sector — Healthcare</div>
          <h1>Patient operations.<br /><em>Streamlined. Automated.</em></h1>
          <p>Appointment booking, patient intake, follow-up care, and billing automation — so your clinical team spends time on patients, not paperwork.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">3<span>min</span></div><div className="met-s">Appointment booking time</div></div>
            <div className="met"><div className="met-b">−15<span>%</span></div><div className="met-s">No-show rate reduction</div></div>
            <div className="met"><div className="met-b">100<span>%</span></div><div className="met-s">Follow-up coverage</div></div>
            <div className="met"><div className="met-b">4<span>x</span></div><div className="met-s">Faster claims processing</div></div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why healthcare operations stay manual — and shouldn&apos;t.</h2>
            <p className="sec-sub">The same four pain points cost clinics thousands of hours and lost patients every year. Here&apos;s what changes after we automate them.</p>
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
            <h2 className="sec-title">From first booking to final claim — automated.</h2>
            <p className="sec-sub">We handle the full patient operations stack: online scheduling, digital intake, care follow-up, billing automation, and clinical dashboards — all custom-built for your clinic.</p>
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
            <h2 className="sec-title">What could automation save<br />your clinic?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — admin hours saved, no-shows reduced, revenue recovered.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">Vitalis Medical Centre · Dubai</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Private Clinic · Multi-Specialty</span>
          </div>
          <div className="re-case-grid">
            {[
              { label: 'The Problem', content: 'A Dubai multi-specialty private clinic with 8 clinicians. Phone-based booking tied up two receptionists full-time. No-show rate was 23%. Post-visit follow-up was ad hoc. Insurance claims had an 18% first-pass rejection rate, with resubmissions handled manually over days.' },
              { label: 'What We Built', content: 'Online self-serve booking with automated multi-channel reminders and a waitlist engine, digital pre-visit intake forms integrated with the clinical system, automated post-visit and care follow-up sequences, and an insurance claims automation layer with rejection handling.' },
              { label: 'The Result', content: 'No-show rate dropped from 23% to 6%. Reception admin time reduced by 60%. Follow-up completion rate reached 100%. Insurance claim rejection rate dropped from 18% to 2.4%, reducing collection time by 22 days on average.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div className="re-case-nums">
            {[{ val: '−17%', label: 'No-show reduction' }, { val: '100%', label: 'Follow-up coverage' }, { val: '−22d', label: 'Collection time' }].map(s => (
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
          <h2>Ready to automate your clinic<br />operations end to end?</h2>
          <p>Book a free discovery call. We&apos;ll show you how quickly we can reduce no-shows, eliminate intake paperwork, and accelerate your revenue cycle.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
