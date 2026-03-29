/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ROICalculator from '@/components/ROICalculator';

// ─── SparkLine ──────────────────────────────────────────────────────────────

function SparkLine({ data }: { data: number[] }) {
  const W = 300,
    H = 60;
  const min = Math.min(...data),
    max = Math.max(...data);
  const pts: [number, number][] = data.map((v, i) => [
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
        <linearGradient id="spk-re" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00c8ff" />
          <stop offset="100%" stopColor="#00ff9d" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#spk-re)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── FlowDiagram ─────────────────────────────────────────────────────────────

function FlowDiagram({
  flow,
}: {
  flow: { sources: string[]; engine: string; outputs: string[] };
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {flow.sources.map((s) => (
          <div
            key={s}
            style={{
              padding: '6px 12px',
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.12)',
              color: 'rgba(255,255,255,.6)',
              fontSize: 11,
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 14 }}>↓</div>
      <div
        style={{
          padding: '10px 16px',
          background: 'rgba(0,200,255,.06)',
          border: '1px solid rgba(0,200,255,.25)',
          color: 'var(--nb)',
          fontWeight: 700,
          textAlign: 'center',
          fontSize: 12,
        }}
      >
        {flow.engine}
      </div>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 14 }}>↓</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {flow.outputs.map((o) => (
          <div
            key={o}
            style={{
              padding: '6px 12px',
              background: 'rgba(0,255,157,.04)',
              border: '1px solid rgba(0,255,157,.2)',
              color: 'var(--ng)',
              fontSize: 11,
            }}
          >
            {o}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

interface BarData {
  label: string;
  before: string;
  beforePct: number;
  after: string;
  afterPct: number;
}

interface ProblemItem {
  n: string;
  title: string;
  pill: string;
  pillColor: string;
  icon: React.ReactNode;
  desc: string;
  bars: BarData[];
}

function AccordionItem({
  item,
  open,
  onToggle,
  isMobile,
}: {
  item: ProblemItem;
  open: boolean;
  onToggle: () => void;
  isMobile: boolean;
}) {
  const [beforeWidths, setBeforeWidths] = useState<number[]>([0, 0]);
  const [afterWidths, setAfterWidths] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        setBeforeWidths(item.bars.map((b) => b.beforePct));
        setAfterWidths(item.bars.map((b) => b.afterPct));
      }, 80);
      return () => clearTimeout(t);
    } else {
      setBeforeWidths([0, 0]);
      setAfterWidths([0, 0]);
    }
  }, [open, item.bars]);

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,.07)',
        background: open ? 'rgba(255,255,255,.02)' : 'transparent',
        transition: 'background .2s',
      }}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 20px',
          cursor: 'pointer',
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: 28,
            fontWeight: 900,
            color: 'var(--y)',
            minWidth: 44,
            lineHeight: 1,
          }}
        >
          {item.n}
        </span>
        {/* Icon box */}
        <div
          style={{
            width: 36,
            height: 36,
            border: '1px solid rgba(255,255,255,.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,.5)',
            flexShrink: 0,
          }}
        >
          {item.icon}
        </div>
        {/* Title */}
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
            flex: 1,
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          {item.title}
        </span>
        {/* Pill */}
        {!isMobile && (
          <span
            style={{
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700,
              color: item.pillColor,
              border: `1px solid ${item.pillColor}55`,
              background: `${item.pillColor}11`,
              whiteSpace: 'nowrap',
            }}
          >
            {item.pill}
          </span>
        )}
        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,.4)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform .25s',
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Expanded panel */}
      <div
        style={{
          maxHeight: open ? 600 : 0,
          overflow: 'hidden',
          transition: 'max-height .35s ease',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 24 : 48,
            padding: '0 20px 28px 88px',
          }}
        >
          {/* Left: description */}
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>
            {item.desc}
          </p>
          {/* Right: bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {item.bars.map((bar, bi) => (
              <div key={bi}>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  {bar.label}
                </div>
                {/* Before bar */}
                <div style={{ marginBottom: 6 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 10,
                      color: 'rgba(255,255,255,.3)',
                      marginBottom: 4,
                    }}
                  >
                    <span>Before</span>
                    <span style={{ color: 'rgba(255,120,80,.8)' }}>{bar.before}</span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: 'rgba(255,255,255,.08)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${beforeWidths[bi] ?? 0}%`,
                        background: 'rgba(255,100,80,.7)',
                        transition: 'width .6s ease',
                      }}
                    />
                  </div>
                </div>
                {/* After bar */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 10,
                      color: 'rgba(255,255,255,.3)',
                      marginBottom: 4,
                    }}
                  >
                    <span>After</span>
                    <span style={{ color: 'var(--ng)' }}>{bar.after}</span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: 'rgba(255,255,255,.08)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${afterWidths[bi] ?? 0}%`,
                        background: 'var(--ng)',
                        transition: 'width .6s ease .1s',
                      }}
                    />
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

// ─── StatItem ────────────────────────────────────────────────────────────────

function StatItem({
  val,
  label,
  color,
  borderColor,
}: {
  val: string;
  label: string;
  color: string;
  borderColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        borderTop: `2px solid ${borderColor}`,
        padding: '32px 28px',
        textAlign: 'center',
        background: 'var(--dark)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity .5s ease, transform .5s ease',
      }}
    >
      <div
        style={{
          fontFamily: "'Exo 2', sans-serif",
          fontSize: 44,
          fontWeight: 900,
          color,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {val}
      </div>
      <div
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.06em',
          color: 'rgba(255,255,255,.3)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RE_PROBLEMS: ProblemItem[] = [
  {
    n: '01',
    title: 'Slow lead response',
    pill: '340% more conversions under 1 min',
    pillColor: 'var(--y)',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    desc: 'The Harvard Business Review found responding within 1 minute increases conversion by 340%. Most agencies take 4+ hours. Every minute you wait, the lead is talking to a competitor.',
    bars: [
      { label: 'Response time', before: '4.2 hrs', beforePct: 88, after: '90 sec', afterPct: 3 },
      { label: 'Lead conversion', before: '4.1%', beforePct: 28, after: '11.3%', afterPct: 76 },
    ],
  },
  {
    n: '02',
    title: 'Leads going cold',
    pill: '37% of cold leads recovered',
    pillColor: 'var(--nb)',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    desc: "Prospects who don't reply to the first message get abandoned. A structured 2h/24h/72h/7d follow-up sequence recovers 30–40% of cold leads automatically, without an agent lifting a finger.",
    bars: [
      { label: 'Cold lead recovery', before: '8%', beforePct: 18, after: '37%', afterPct: 78 },
      { label: 'Agent time on admin', before: '6h/day', beforePct: 85, after: '45 min', afterPct: 10 },
    ],
  },
  {
    n: '03',
    title: 'No pipeline visibility',
    pill: '6h/week saved on reporting',
    pillColor: 'var(--ng)',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="0" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    desc: "Weekly pipeline reports assembled manually from CRM, portal exports, and spreadsheets. By the time it's ready, it's already outdated and someone has missed a follow-up.",
    bars: [
      { label: 'Report assembly', before: '6h/week', beforePct: 90, after: '0 min', afterPct: 0 },
      { label: 'Data lag', before: '5–7 days', beforePct: 75, after: 'Real-time', afterPct: 100 },
    ],
  },
  {
    n: '04',
    title: 'CRM chaos',
    pill: '100% CRM data accuracy',
    pillColor: 'var(--nb)',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <line x1="6" y1="9" x2="12" y2="15" />
        <line x1="18" y1="9" x2="12" y2="15" />
      </svg>
    ),
    desc: 'Agents log calls inconsistently. Portal enquiries never reach the CRM. Pipeline data is fiction. Deals fall through cracks that nobody can see.',
    bars: [
      { label: 'CRM accuracy', before: '52%', beforePct: 36, after: '100%', afterPct: 100 },
      { label: 'Missed follow-ups', before: '38%', beforePct: 55, after: '0%', afterPct: 0 },
    ],
  },
];

interface SolutionItem {
  n: string;
  title: string;
  desc: string;
  bullets: string[];
  tags: string[];
  flow: { sources: string[]; engine: string; outputs: string[] };
}

const RE_SOLUTIONS: SolutionItem[] = [
  {
    n: '01',
    title: 'Lead Qualification AI',
    desc: 'Every inbound enquiry — WhatsApp, web form, portal listing — is instantly scored, categorised, and routed to the right agent with a full brief.',
    bullets: [
      'Scores intent, budget and timeline from first message',
      'Routes to best-matched agent by language, area, tier',
      'Sends personalised initial response in under 90 seconds',
      'Works 24/7 across all lead sources simultaneously',
    ],
    tags: ['GPT-4o', 'WhatsApp API', 'Lead scoring'],
    flow: {
      sources: ['WhatsApp', 'Web form', 'Bayut', 'PropertyFinder'],
      engine: 'GPT-4o Qualifier',
      outputs: ['Agent brief', 'CRM entry', 'Auto-response'],
    },
  },
  {
    n: '02',
    title: 'Automated Follow-Up',
    desc: "Prospects who don't reply get a carefully timed follow-up sequence. No lead goes cold. No agent needs to chase manually.",
    bullets: [
      '2h / 24h / 72h / 7-day sequence triggers automatically',
      'Personalised per lead source and property interest',
      'Stops when lead replies or books a call',
      'Full conversation logged in CRM automatically',
    ],
    tags: ['n8n', 'Email', 'WhatsApp', 'SMS'],
    flow: {
      sources: ['Cold lead', 'No reply'],
      engine: 'Tergo Sequence Engine',
      outputs: ['Email', 'WhatsApp', 'SMS', 'Agent alert'],
    },
  },
  {
    n: '03',
    title: 'CRM Integration',
    desc: 'Every enquiry, conversation, and outcome flows automatically into your CRM. Full pipeline visibility with zero manual data entry.',
    bullets: [
      '100% of leads captured with source attribution',
      'Every touchpoint logged automatically',
      'Pipeline stages updated in real time',
      'Weekly performance reports generated automatically',
    ],
    tags: ['HubSpot', 'Salesforce', 'Pipedrive'],
    flow: {
      sources: ['WhatsApp', 'Email', 'Portals'],
      engine: 'Tergo Data Layer',
      outputs: ['HubSpot', 'Salesforce', 'Pipedrive'],
    },
  },
  {
    n: '04',
    title: 'Property Portals',
    desc: 'Custom listing portals with real-time availability, multi-currency pricing, virtual tour integration, and enquiry capture.',
    bullets: [
      'Next.js for lightning-fast load times',
      'Real-time availability from PMS',
      'Bayut/PropertyFinder API sync',
      'Enquiry capture → CRM automatically',
    ],
    tags: ['Next.js', 'React', 'Custom dev'],
    flow: {
      sources: ['PMS/ERP', 'Manual listings'],
      engine: 'Next.js Portal',
      outputs: ['Live listings', 'Enquiry capture', 'Analytics'],
    },
  },
  {
    n: '05',
    title: 'Agent Performance Reporting',
    desc: 'Automated weekly reports for every agent: calls made, leads converted, pipeline value, and ranking against team benchmarks.',
    bullets: [
      'Auto-generated every Monday at 7am',
      'Agent vs team benchmark comparison',
      'Pipeline by source and property type',
      'Sent to managers via Slack and email',
    ],
    tags: ['Reporting', 'KPI dashboards', 'Automation'],
    flow: {
      sources: ['CRM data', 'Call logs'],
      engine: 'Tergo Reporting',
      outputs: ['PDF report', 'Slack digest', 'Manager view'],
    },
  },
  {
    n: '06',
    title: 'Document Automation',
    desc: 'Generate tenancy agreements, offer letters, and MOU documents automatically when a deal progresses — pre-filled from CRM data.',
    bullets: [
      'Triggered by CRM deal stage change',
      'Pre-filled with all client and property data',
      'Sent for e-signature via DocuSign or PandaDoc',
      'Signed copies archived automatically in CRM',
    ],
    tags: ['Document generation', 'DocuSign', 'Legal'],
    flow: {
      sources: ['CRM deal stage'],
      engine: 'Document Engine',
      outputs: ['MOU', 'Offer letter', 'E-signature link'],
    },
  },
];

const RE_TESTIMONIALS = [
  {
    quote:
      "Within 6 weeks, 94% of our leads are being handled without our agents lifting a finger. The AI qualifies, responds, and routes better than any junior hire we've ever made.",
    name: 'Mohammed Al-Farsi',
    role: 'Managing Director, Pinnacle Properties Dubai',
    initials: 'MA',
    tag: 'Dubai · Luxury Real Estate',
    accent: 'var(--y)',
  },
  {
    quote:
      "We went from 4-hour response times to 90 seconds overnight. Our conversion rate tripled. I wish we'd done this two years ago.",
    name: 'Elena Popescu',
    role: 'CEO, Urban Property Group Bucharest',
    initials: 'EP',
    tag: 'Bucharest · Residential',
    accent: 'var(--nb)',
  },
];

// ─── Main Client Component ────────────────────────────────────────────────────

export default function RealEstateClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [openIdx, setOpenIdx] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      {/* ── SECTION 1: HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          background: '#0d0d0d',
          overflow: 'hidden',
          paddingTop: 'clamp(100px,14vw,180px)',
          paddingBottom: 'clamp(60px,8vw,100px)',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.22)',
          }}
        />
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: 'linear-gradient(to bottom, transparent, #1a1a1a)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 40 : 64,
              alignItems: 'center',
            }}
          >
            {/* Left column */}
            <div>
              <div className="page-hero-eyebrow">Sector — Real Estate</div>
              <h1
                style={{
                  fontSize: 'clamp(32px,4.8vw,66px)',
                  fontWeight: 900,
                  color: '#fff',
                  marginBottom: 20,
                  lineHeight: 1.08,
                }}
              >
                AI that closes{' '}
                <em style={{ fontStyle: 'normal', color: 'var(--y)' }}>more deals.</em>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(15px,1.3vw,17px)',
                  color: 'rgba(255,255,255,.5)',
                  lineHeight: 1.8,
                  maxWidth: 480,
                  marginBottom: 36,
                }}
              >
                Every inbound lead responded to in 90 seconds. Every follow-up automated. Every
                agent focused on selling — not admin.
              </p>
              <div
                style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48 }}
              >
                <a
                  href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-y btn-lg"
                >
                  Book a discovery call →
                </a>
                <Link href="/portfolio" className="btn btn-ol btn-lg">
                  See case studies
                </Link>
              </div>
              <div className="met-row">
                <div className="met">
                  <div className="met-b">
                    90<span>s</span>
                  </div>
                  <div className="met-s">Lead response time</div>
                </div>
                <div className="met">
                  <div className="met-b">
                    94<span>%</span>
                  </div>
                  <div className="met-s">Enquiries auto-handled</div>
                </div>
                <div className="met">
                  <div className="met-b">3x</div>
                  <div className="met-s">Lead handling capacity</div>
                </div>
                <div className="met">
                  <div className="met-b">
                    $2.1<span>M</span>
                  </div>
                  <div className="met-s">Pipeline added for RE/MAX Gulf</div>
                </div>
              </div>
            </div>

            {/* Right column — Metrics card */}
            {!isMobile && (
              <div
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: 28,
                  backdropFilter: 'blur(10px)',
                  borderTop: '2px solid',
                  borderImage: 'linear-gradient(90deg, #00c8ff, #00ff9d) 1',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.3)',
                    marginBottom: 20,
                    fontWeight: 700,
                  }}
                >
                  Live impact — Real Estate
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    background: 'rgba(255,255,255,.04)',
                    marginBottom: 20,
                  }}
                >
                  {(
                    [
                      ['90s', 'Lead response', 'var(--y)'],
                      ['94%', 'Auto-handled', 'var(--nb)'],
                      ['3×', 'Capacity gain', 'var(--ng)'],
                      ['$2.1M', 'Pipeline added', '#fff'],
                    ] as [string, string, string][]
                  ).map(([val, lbl, col]) => (
                    <div
                      key={lbl}
                      style={{
                        background: 'rgba(0,0,0,0.4)',
                        padding: '20px 16px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Exo 2',sans-serif",
                          fontSize: 'clamp(22px,2.5vw,32px)',
                          fontWeight: 900,
                          color: col,
                          lineHeight: 1,
                          marginBottom: 6,
                        }}
                      >
                        {val}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: 'rgba(255,255,255,.3)',
                          textTransform: 'uppercase',
                          letterSpacing: '.06em',
                        }}
                      >
                        {lbl}
                      </div>
                    </div>
                  ))}
                </div>
                <SparkLine data={[15, 22, 18, 28, 35, 30, 40, 48, 42, 55, 60, 54, 65, 72, 68, 78, 85, 80, 92, 100]} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROBLEMS ACCORDION ───────────────────────────────── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">The problem</span>
          <h2 className="sec-title">
            Why most agencies{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--y)' }}>lose deals</em> they should win.
          </h2>
          <div style={{ marginTop: 40 }}>
            {RE_PROBLEMS.map((p, i) => (
              <AccordionItem
                key={i}
                item={p}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SOLUTIONS TABS ────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <span className="sec-label">What we build</span>
          <h2 className="sec-title" style={{ marginBottom: 36 }}>
            Six systems that{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--nb)' }}>automate your pipeline.</em>
          </h2>

          {/* Tab bar */}
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              borderBottom: '1px solid rgba(255,255,255,.08)',
              gap: 0,
              scrollbarWidth: 'none',
            }}
          >
            {RE_SOLUTIONS.map((sol, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '12px 20px',
                  minHeight: 44,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === i ? '#fff' : 'rgba(255,255,255,.4)',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  fontSize: 13,
                  fontWeight: 600,
                  transition: 'color .2s',
                }}
              >
                <span style={{ marginRight: 6, opacity: 0.5 }}>{sol.n}</span>
                {sol.title}
                {activeTab === i && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'var(--nb)',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Panel content */}
          {RE_SOLUTIONS.map((sol, i) => (
            <div
              key={i}
              style={{
                display: activeTab === i ? 'grid' : 'none',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? 32 : 48,
                padding: '36px 0',
              }}
            >
              {/* Left */}
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 12,
                    fontFamily: "'Exo 2', sans-serif",
                  }}
                >
                  {sol.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,.5)',
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  {sol.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {sol.bullets.map((b, bi) => (
                    <li key={bi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          background: 'var(--nb)',
                          flexShrink: 0,
                          marginTop: 5,
                        }}
                      />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {sol.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Right: Flow diagram */}
              <div
                style={{
                  background: 'rgba(255,255,255,.02)',
                  border: '1px solid rgba(255,255,255,.06)',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.25)',
                    marginBottom: 16,
                    fontWeight: 700,
                  }}
                >
                  Data flow
                </div>
                <FlowDiagram flow={sol.flow} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: STATS STRIP ───────────────────────────────────────── */}
      <section
        style={{
          background: 'rgba(255,255,255,.03)',
          borderTop: '1px solid rgba(255,255,255,.06)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
              gap: 0,
              background: 'rgba(255,255,255,.04)',
            }}
          >
            <StatItem val="90s" label="Lead response time" color="var(--y)" borderColor="var(--y)" />
            <StatItem
              val="94%"
              label="Enquiries auto-handled"
              color="var(--nb)"
              borderColor="var(--nb)"
            />
            <StatItem
              val="3×"
              label="Lead capacity increase"
              color="var(--ng)"
              borderColor="var(--ng)"
            />
            <StatItem
              val="$2.1M"
              label="Pipeline added"
              color="#fff"
              borderColor="rgba(255,255,255,.2)"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ROI CALCULATOR ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}
          >
            <span className="sec-label">Free estimate</span>
            <h2 className="sec-title">
              What could automation save
              <br />
              your real estate team?
            </h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
              Adjust the sliders to your business size and see the estimated 12-month impact.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* ── SECTION 6: CASE STUDY ────────────────────────────────────────── */}
      <section className="section section-light">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, background: 'var(--y)' }} />
            <span
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,.4)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Cocktail Holidays · Dubai
            </span>
            <span className="tag">Luxury Real Estate</span>
          </div>
          <span className="sec-label">Case study</span>
          <h2 className="sec-title" style={{ marginBottom: 48 }}>
            From 200+ weekly enquiries
            <br />
            to 94% AI-handled.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
              gap: 2,
              background: 'rgba(255,255,255,.06)',
            }}
          >
            {[
              {
                title: 'The Problem',
                desc: '200+ enquiries per week with a 4+ hour response time. Hot leads were going cold while agents struggled with volume and admin.',
                stats: null as
                  | null
                  | { val: string; label: string; color: string }[],
              },
              {
                title: 'What We Built',
                desc: 'An AI qualification engine connected to WhatsApp. Every enquiry scored in real time, routed to the right agent, with an initial response sent within 90 seconds — automatically.',
                stats: null as
                  | null
                  | { val: string; label: string; color: string }[],
              },
              {
                title: 'The Result',
                desc: 'Enquiry volume increased 38% in 60 days — and 94% of those enquiries are now fully handled by the AI without agent input.',
                stats: [
                  { val: '94%', label: 'Auto-handled', color: 'var(--y)' },
                  { val: '90s', label: 'Response time', color: 'var(--nb)' },
                  { val: '+38%', label: 'Lead volume', color: 'var(--ng)' },
                ] as { val: string; label: string; color: string }[],
              },
            ].map((c, i) => (
              <div key={i} style={{ background: 'var(--dark)', padding: '32px 28px' }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.25)',
                    marginBottom: 12,
                    fontWeight: 700,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 12,
                    fontFamily: "'Exo 2',sans-serif",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,.45)',
                    lineHeight: 1.75,
                    marginBottom: c.stats ? 20 : 0,
                  }}
                >
                  {c.desc}
                </p>
                {c.stats && (
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {c.stats.map((s) => (
                      <div
                        key={s.label}
                        style={{
                          padding: '8px 14px',
                          background: 'rgba(255,255,255,.04)',
                          border: `1px solid ${s.color}44`,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Exo 2',sans-serif",
                            fontSize: 20,
                            fontWeight: 900,
                            color: s.color,
                          }}
                        >
                          {s.val}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: 'rgba(255,255,255,.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '.05em',
                          }}
                        >
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: TESTIMONIALS ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="sec-label">What clients say</span>
          <h2 className="sec-title" style={{ marginBottom: 40 }}>
            Results that speak for themselves.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 2,
              background: 'rgba(255,255,255,.04)',
            }}
          >
            {RE_TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  background: '#1f1f1f',
                  padding: 32,
                  borderLeft: `3px solid ${t.accent}`,
                }}
              >
                {/* Stars */}
                <div
                  style={{ color: 'var(--y)', fontSize: 14, marginBottom: 16, letterSpacing: 2 }}
                >
                  {'★★★★★'}
                </div>
                {/* Tag */}
                <div
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,.25)',
                    textTransform: 'uppercase',
                    letterSpacing: '.08em',
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  {t.tag}
                </div>
                {/* Quote */}
                <p
                  style={{
                    fontStyle: 'italic',
                    fontSize: 14,
                    color: 'rgba(255,255,255,.55)',
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: `${t.accent}22`,
                      border: `1px solid ${t.accent}55`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: t.accent,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CTA ───────────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to automate your real estate pipeline?</h2>
          <p>
            Book a free discovery call. We&apos;ll show you exactly what we&apos;d build for your
            agency.
          </p>
          <div className="cta-btns">
            <a
              href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-lg"
            >
              Book a free call →
            </a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">
              hello@tergomedia.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
