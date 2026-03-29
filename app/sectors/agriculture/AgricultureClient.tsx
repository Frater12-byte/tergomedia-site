/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';

// ---------------------------------------------------------------------------
// Responsive hook
// ---------------------------------------------------------------------------
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ---------------------------------------------------------------------------
// SparkLine
// ---------------------------------------------------------------------------
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
        <linearGradient id="spk-agri" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00ff9d" />
          <stop offset="100%" stopColor="#00c8ff" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#spk-agri)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// FlowDiagram
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------
type ProblemBar = { label: string; before: string; beforePct: number; after: string; afterPct: number };
type Problem = {
  n: string;
  title: string;
  pill: string;
  pillColor: string;
  icon: React.ReactNode;
  desc: string;
  bars: ProblemBar[];
};

function AccordionItem({ item, open, onToggle, isMobile }: { item: Problem; open: boolean; onToggle: () => void; isMobile: boolean }) {
  const [barWidths, setBarWidths] = useState<number[]>(item.bars.map(() => 0));

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        setBarWidths(item.bars.map(b => b.afterPct));
      }, 80);
      return () => clearTimeout(t);
    } else {
      setBarWidths(item.bars.map(() => 0));
    }
  }, [open]);

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', cursor: 'pointer', background: open ? 'rgba(255,255,255,.03)' : 'transparent', transition: 'background .2s' }}
      >
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'rgba(249,202,0,.15)', minWidth: 40 }}>{item.n}</span>
        <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,.12)', flexShrink: 0, color: 'rgba(255,255,255,.4)' }}>{item.icon}</div>
        <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#fff' }}>{item.title}</span>
        <span style={{ padding: '4px 10px', background: `${item.pillColor}18`, border: `1px solid ${item.pillColor}44`, color: item.pillColor, fontSize: 10, fontWeight: 700, letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{item.pill}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {/* Expanded panel */}
      {open && (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 48, padding: '24px 20px 32px', borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {item.bars.map((bar, bi) => (
              <div key={bi}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,.35)', marginBottom: 8 }}>
                  <span>{bar.label}</span>
                </div>
                {/* Before bar */}
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}>
                    <span>Before</span><span>{bar.before}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${bar.beforePct}%`, background: 'rgba(255,80,80,.5)', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }} />
                  </div>
                </div>
                {/* After bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.25)', marginBottom: 4 }}>
                    <span>After</span><span>{bar.after}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.08)', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${barWidths[bi]}%`, background: 'var(--ng)', transition: 'width .9s cubic-bezier(.4,0,.2,1)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// StatItem
// ---------------------------------------------------------------------------
function StatItem({ val, label, color, borderColor }: { val: string; label: string; color: string; borderColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ borderTop: `2px solid ${borderColor}`, padding: '32px 28px', textAlign: 'center', background: 'var(--dark)' }}>
      <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color, lineHeight: 1, marginBottom: 10, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: 'opacity .5s ease, transform .5s ease' }}>{val}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const SPARKLINE_DATA = [85, 78, 72, 65, 70, 58, 62, 50, 55, 45, 38, 42, 30, 35, 28, 20, 18, 15, 12, 10];

const AGRI_PROBLEMS: Problem[] = [
  {
    n: '01',
    title: 'No real-time field visibility',
    pill: 'From 4–12 hrs to 3-min detection',
    pillColor: 'var(--nb)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    desc: "Manual checks can't scale across hundreds of hectares. By the time a problem is spotted — soil moisture crash, frost, equipment failure — it's already affecting yield. You need eyes on every zone, around the clock.",
    bars: [
      { label: 'Detection time', before: '4–12 hrs', beforePct: 88, after: '< 3 min', afterPct: 4 },
      { label: 'Critical events missed', before: '23%', beforePct: 55, after: '0%', afterPct: 0 },
    ],
  },
  {
    n: '02',
    title: 'Alert fatigue and missed escalations',
    pill: '0 missed critical events since launch',
    pillColor: 'var(--ng)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    desc: 'Basic sensor systems flood staff with low-priority alerts. They start ignoring them. Then a genuinely critical event — pump failure, frost, disease spread — goes unnoticed overnight.',
    bars: [
      { label: 'False alarm rate', before: '68%', beforePct: 68, after: '4%', afterPct: 4 },
      { label: 'Critical alert action rate', before: '41%', beforePct: 30, after: '100%', afterPct: 100 },
    ],
  },
  {
    n: '03',
    title: 'No data-driven decisions',
    pill: '34% reduction in water waste',
    pillColor: 'var(--y)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    desc: 'Irrigation schedules, harvest timing, and input decisions made on gut feel — not sensor data. Yield variance stays high and costs stay unnecessary. Predictive analytics changes the economics of farming.',
    bars: [
      { label: 'Irrigation water waste', before: '34%', beforePct: 65, after: '8%', afterPct: 15 },
      { label: 'Yield predictability', before: '±28% variance', beforePct: 35, after: '±6% variance', afterPct: 90 },
    ],
  },
  {
    n: '04',
    title: 'Compliance reporting overhead',
    pill: '6h/week reclaimed from reporting',
    pillColor: 'var(--nb)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    desc: "Water usage records, chemical application logs, and sustainability metrics compiled manually every period — days of staff time, prone to errors, due whether it's harvest season or not.",
    bars: [
      { label: 'Reporting time', before: '2–3 days', beforePct: 90, after: '0 min', afterPct: 0 },
      { label: 'Compliance accuracy', before: '81%', beforePct: 45, after: '100%', afterPct: 100 },
    ],
  },
];

type Solution = {
  n: string;
  title: string;
  desc: string;
  bullets: string[];
  tags: string[];
  flow: { sources: string[]; engine: string; outputs: string[] };
};

const AGRI_SOLUTIONS: Solution[] = [
  {
    n: '01', title: 'IoT Sensor Integration',
    desc: 'We connect soil moisture, temperature, humidity, pH, and weather sensors into a unified data platform. Any sensor, any protocol — we make it work.',
    bullets: ['Soil moisture, temperature, humidity, pH, weather', 'MQTT, LoRaWAN, Modbus, REST — any protocol', 'Unified data stream with standardised schema', 'Cloud storage with full historical data retention'],
    tags: ['MQTT', 'LoRaWAN', 'Modbus', 'REST APIs'],
    flow: { sources: ['Soil sensors', 'Weather stations', 'pH probes'], engine: 'Tergo IoT Gateway', outputs: ['Unified data stream', 'Cloud storage', 'Real-time alerts'] },
  },
  {
    n: '02', title: 'Real-Time Monitoring Dashboards',
    desc: 'Live dashboards showing every sensor reading, trend line, and threshold status across your entire operation.',
    bullets: ['Zone-by-zone sensor status at a glance', 'Configurable thresholds and alert zones', 'Historical trend charts per sensor type', 'Mobile-ready for field use'],
    tags: ['React', 'Next.js', 'WebSockets', 'Mobile'],
    flow: { sources: ['IoT gateway data'], engine: 'Tergo Dashboard', outputs: ['Web dashboard', 'Mobile app', 'Manager view'] },
  },
  {
    n: '03', title: 'Automated Alert Escalation',
    desc: 'When a sensor reading crosses a threshold, the right person gets the right alert — instantly.',
    bullets: ['Tiered escalation: immediate → manager → emergency', 'SMS, WhatsApp, email all configured per zone', 'Smart suppression prevents alert fatigue', 'Full audit trail of every alert and action'],
    tags: ['n8n', 'Twilio', 'WhatsApp', 'Email'],
    flow: { sources: ['Threshold breach', 'Anomaly detected'], engine: 'Alert Engine', outputs: ['SMS', 'WhatsApp', 'Email', 'On-call'] },
  },
  {
    n: '04', title: 'Predictive Analytics',
    desc: 'Historical sensor data analysed to identify patterns before they become failures.',
    bullets: ['Frost risk prediction 6–12 hours ahead', 'Irrigation schedule optimisation from soil + weather', 'Yield forecast models from historical yield + sensor data', 'Disease/pest risk scoring from humidity patterns'],
    tags: ['Python', 'ML models', 'Forecasting'],
    flow: { sources: ['Historical sensor data', 'Weather API'], engine: 'ML Prediction Models', outputs: ['Irrigation plan', 'Frost alerts', 'Yield forecast'] },
  },
  {
    n: '05', title: 'Supply Chain Automation',
    desc: 'Harvest scheduling, logistics coordination, and inventory tracking automated based on yield data and market conditions.',
    bullets: ['Harvest readiness alerts from yield forecast model', 'Logistics triggered automatically on yield confirmation', 'ERP sync for inventory and procurement', 'Market price monitoring with sell/hold recommendations'],
    tags: ['Automation', 'ERP integration', 'Logistics'],
    flow: { sources: ['Yield forecast', 'Market data'], engine: 'Supply Chain Engine', outputs: ['Harvest schedule', 'Logistics trigger', 'ERP sync'] },
  },
  {
    n: '06', title: 'Regulatory Reporting',
    desc: 'Automated compliance reports generated from sensor data on schedule.',
    bullets: ['Water usage reports generated automatically', 'Chemical application logs compiled from IoT + manual inputs', 'Sustainability metric dashboards for auditors', 'Scheduled PDF delivery to compliance teams'],
    tags: ['Compliance', 'Reporting', 'Automation'],
    flow: { sources: ['Sensor logs', 'Application records'], engine: 'Reporting Engine', outputs: ['Compliance PDF', 'Water report', 'Sustainability metrics'] },
  },
];

const AGRI_STATS = [
  { val: '400ha', label: 'Under continuous monitoring', color: 'var(--y)', borderColor: 'var(--y)' },
  { val: '3min', label: 'Alert response time', color: 'var(--nb)', borderColor: 'var(--nb)' },
  { val: '0', label: 'Missed critical events', color: 'var(--ng)', borderColor: 'var(--ng)' },
  { val: '34%', label: 'Water waste reduction', color: '#fff', borderColor: 'rgba(255,255,255,.2)' },
];

const AGRI_TESTIMONIALS = [
  {
    quote: "We used to find out about sensor alerts the next morning — or not at all. Now our agronomist gets a WhatsApp the moment anything crosses a threshold. We haven't missed a critical event since launch.",
    name: 'Andrei Constantin',
    role: 'Operations Director, Agri Novatex Romania',
    initials: 'AC',
    tag: 'Romania · 400ha Precision Farming',
    accent: 'var(--ng)',
  },
  {
    quote: 'The predictive irrigation model alone saved us 34% on water costs in the first season. The dashboard is what I always wanted but never thought a company our size could afford.',
    name: 'Mirela Ionescu',
    role: 'Head of Agronomy, GreenValley Farms',
    initials: 'MI',
    tag: 'Romania · Mixed Crops',
    accent: 'var(--nb)',
  },
];

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------
export default function AgricultureClient() {
  const isMobile = useIsMobile();
  const [openProblem, setOpenProblem] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* ================================================================ */}
      {/* SECTION 1 — HERO                                                  */}
      {/* ================================================================ */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', background: '#0d0d0d', overflow: 'hidden', paddingTop: 'clamp(100px,14vw,180px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.22)', zIndex: 0 }} />
        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 1 }} />
        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 2 }} />

        <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 64, alignItems: 'center' }}>
            {/* Left column */}
            <div>
              <div className="page-hero-eyebrow">Sector — Agriculture</div>
              <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '16px 0 24px' }}>
                Precision farming.<br /><em style={{ color: 'var(--ng)', fontStyle: 'italic' }}>Real-time intelligence.</em>
              </h1>
              <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,.55)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
                IoT sensor networks, live monitoring dashboards, and automated alert escalation. Know what&apos;s happening across every hectare — before it becomes a problem.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
                <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
              </div>
              <div className="met-row">
                <div className="met"><div className="met-b">400<span>ha</span></div><div className="met-s">Monitored for<br />Agri Novatex</div></div>
                <div className="met"><div className="met-b">3<span>min</span></div><div className="met-s">Alert response<br />time</div></div>
                <div className="met"><div className="met-b">0</div><div className="met-s">Missed critical<br />events</div></div>
                <div className="met"><div className="met-b">24<span>/7</span></div><div className="met-s">Continuous<br />monitoring</div></div>
              </div>
            </div>

            {/* Right column — metrics card */}
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', padding: 32 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 24 }}>Live impact — Agriculture</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,.06)', marginBottom: 24 }}>
                {[
                  { val: '400ha', color: 'var(--y)' },
                  { val: '3min', color: 'var(--nb)' },
                  { val: '0', color: 'var(--ng)' },
                  { val: '24/7', color: '#fff' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#0d0d0d', padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 16 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Critical events over time</div>
                <SparkLine data={SPARKLINE_DATA} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 2 — PROBLEMS ACCORDION                                   */}
      {/* ================================================================ */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why most farms are flying blind.</h2>
            <p className="sec-sub">The same four issues cause the majority of avoidable losses in precision agriculture. Here&apos;s what they look like — and what changes after we fix them.</p>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,.07)' }}>
            {AGRI_PROBLEMS.map((item, i) => (
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

      {/* ================================================================ */}
      {/* SECTION 3 — SOLUTIONS TABS                                       */}
      {/* ================================================================ */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">What we build</span>
            <h2 className="sec-title">From sensors in the field<br />to alerts on your phone.</h2>
            <p className="sec-sub">We handle the full stack: sensor integration, data pipelines, monitoring dashboards, and automated escalation — all custom-built for your operation.</p>
          </div>

          {/* Tab nav */}
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 40, scrollbarWidth: 'none' }}>
            {AGRI_SOLUTIONS.map((sol, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: activeTab === i ? 'var(--ng)' : 'rgba(255,255,255,.35)', background: 'transparent', border: 'none', borderBottom: activeTab === i ? '2px solid var(--ng)' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color .2s', marginBottom: -1 }}
              >
                {sol.n} {sol.title}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          {AGRI_SOLUTIONS[activeTab] && (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 48 }}>
              <div>
                <h3 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>{AGRI_SOLUTIONS[activeTab].title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', lineHeight: 1.75, marginBottom: 28 }}>{AGRI_SOLUTIONS[activeTab].desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {AGRI_SOLUTIONS[activeTab].bullets.map((b, bi) => (
                    <li key={bi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ng)" strokeWidth="2.5" style={{ marginTop: 3, flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {AGRI_SOLUTIONS[activeTab].tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.25)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 16 }}>How it works</div>
                <FlowDiagram flow={AGRI_SOLUTIONS[activeTab].flow} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 4 — STATS STRIP                                          */}
      {/* ================================================================ */}
      <section style={{ background: 'var(--dark)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,.06)' }}>
          {AGRI_STATS.map((s, i) => (
            <StatItem key={i} val={s.val} label={s.label} color={s.color} borderColor={s.borderColor} />
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 5 — ROI CALCULATOR                                       */}
      {/* ================================================================ */}
      <section className="section roi-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
            <span className="sec-label">Free estimate</span>
            <h2 className="sec-title">What could precision monitoring<br />save your operation?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>See the estimated annual impact of IoT monitoring and automation on your farm.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 6 — CASE STUDY                                           */}
      {/* ================================================================ */}
      <section className="section section-light">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
              <h2 className="sec-title" style={{ margin: 0 }}>Agri Novatex · Bucharest, Romania</h2>
              <span className="tag" style={{ background: 'rgba(0,255,157,.08)', border: '1px solid rgba(0,255,157,.25)', color: 'var(--ng)' }}>Precision Agriculture</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {/* Col 1 */}
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', padding: 32 }}>
              <div style={{ fontSize: 10, color: 'var(--y)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 16 }}>The Problem</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>
                A 400-hectare farming operation with no real-time visibility. Manual sensor checks happened twice a day — meaning any issue that arose overnight or on weekends was only discovered hours later. Critical events were missed. Yield losses were preventable.
              </p>
            </div>
            {/* Col 2 */}
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', padding: 32 }}>
              <div style={{ fontSize: 10, color: 'var(--nb)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 16 }}>What We Built</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>
                A full IoT monitoring platform integrating soil moisture, temperature, and humidity sensors across all 400 hectares. A live dashboard showing every zone in real time. Automated escalation chains — WhatsApp, SMS, and email — triggered the moment any reading crossed a configured threshold.
              </p>
            </div>
            {/* Col 3 */}
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', padding: 32 }}>
              <div style={{ fontSize: 10, color: 'var(--ng)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 16 }}>The Result</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: '0 0 24px' }}>
                Three critical failures prevented in the first six months. Zero missed events since launch. The operations team now monitors the entire farm from a single screen — in the office or from the field.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { val: '< 3min', label: 'Alert response', color: 'var(--y)' },
                  { val: '0', label: 'Missed events', color: 'var(--nb)' },
                  { val: '400ha', label: 'Live monitoring', color: 'var(--ng)' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 22, fontWeight: 900, color: s.color, minWidth: 64 }}>{s.val}</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 7 — TESTIMONIALS                                         */}
      {/* ================================================================ */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">Client results</span>
            <h2 className="sec-title">From the teams who run the farms.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
            {AGRI_TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', padding: 36, display: 'flex', flexDirection: 'column', gap: 28 }}>
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                  <path d="M0 20V12.5C0 5.6 4.2 1.4 12.6 0l1.4 2.1C9.1 3.2 6.7 5.7 6.3 9.5H11V20H0zm17 0V12.5C17 5.6 21.2 1.4 29.6 0L31 2.1C26.1 3.2 23.7 5.7 23.3 9.5H28V20H17z" fill={t.accent} fillOpacity=".25" />
                </svg>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 20 }}>
                  <div style={{ width: 40, height: 40, background: `${t.accent}22`, border: `1px solid ${t.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: t.accent, flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>{t.role}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', padding: '4px 10px', background: `${t.accent}12`, border: `1px solid ${t.accent}30`, color: t.accent, fontSize: 10, fontWeight: 700, letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 8 — CTA                                                  */}
      {/* ================================================================ */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to get real-time visibility across your farm?</h2>
          <p>Book a free discovery call. We&apos;ll show you what precision monitoring looks like in practice.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
