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
    n: '01', title: 'Manual order processing', pill: 'From 2 hours to instant',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    desc: 'Every order requires manual entry into the fulfilment system, warehouse notification, courier booking, and tracking link generation. Two hours of admin per order at scale. Errors cause incorrect shipments. Customers chase status updates by email.',
    bars: [
      { label: 'Order processing time', before: '1–2 hours', beforePct: 85, after: '< 5 minutes', afterPct: 4 },
      { label: 'Order error rate', before: '4–8%', beforePct: 65, after: '< 0.3%', afterPct: 2 },
    ],
  },
  {
    n: '02', title: 'Inventory out-of-sync', pill: 'Real-time across all channels',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    desc: 'Your Shopify, Amazon, Noon, and wholesale channels all show different stock levels. Oversells happen weekly. Refunds erode margin. Customers leave bad reviews. Manual reconciliation every morning consumes hours of stock team time.',
    bars: [
      { label: 'Inventory sync lag', before: '2–8 hours', beforePct: 80, after: 'Real-time', afterPct: 2 },
      { label: 'Oversell incidents/month', before: '8–15', beforePct: 75, after: '0', afterPct: 0 },
    ],
  },
  {
    n: '03', title: 'Abandoned cart revenue loss', pill: '4x recovery rate',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>,
    desc: '70% of carts are abandoned. Without an automated recovery sequence, that revenue is permanently lost. Manual follow-up is impossible at volume. A three-touch recovery sequence running automatically recovers an average of 12% of abandoned cart value.',
    bars: [
      { label: 'Cart abandonment recovery rate', before: '3%', beforePct: 15, after: '12%', afterPct: 60 },
      { label: 'Recovery revenue/month', before: 'AED 4,000', beforePct: 10, after: 'AED 18,000', afterPct: 45 },
    ],
  },
  {
    n: '04', title: 'Customer support overload', pill: '80% tickets auto-resolved',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    desc: 'Order status, tracking, return requests, and product FAQs answered manually by a small support team. Response times slip to 24+ hours. One-star reviews follow. The same 15 questions answered a hundred times a week by humans who should be doing something else.',
    bars: [
      { label: 'Support response time', before: '12–24 hours', beforePct: 88, after: '< 5 minutes', afterPct: 4 },
      { label: 'Tickets requiring human agent', before: '100%', beforePct: 100, after: '20%', afterPct: 20 },
    ],
  },
];

const SOLUTIONS = [
  { n: '01', title: 'Order Fulfilment Automation', desc: 'Every order triggers instant fulfilment: warehouse pick list, courier booking, tracking link generation, and customer notification — all without a human touch.', bullets: ['Order received → warehouse pick list generated in seconds', 'Courier API booked with optimal carrier selection', 'Tracking link sent to customer automatically', 'Order status updates pushed to customer at each milestone'], tags: ['n8n', 'Courier API', 'Shopify', 'Automation'], flow: { sources: ['Shopify order', 'Amazon order', 'Noon order'], engine: 'Fulfilment Automation Engine', outputs: ['Warehouse pick list', 'Courier booking', 'Tracking notification'] } },
  { n: '02', title: 'Multi-Channel Inventory Sync', desc: 'Real-time inventory sync across every channel — Shopify, Amazon, Noon, and wholesale — so stock levels are always accurate and oversells are eliminated.', bullets: ['Inventory updated across all channels in under 60 seconds', 'Low-stock alerts triggered at configurable thresholds', 'Purchase order creation automated when reorder point is hit', 'Dead stock and slow-mover reports generated weekly'], tags: ['Shopify', 'Amazon API', 'Noon API', 'n8n'], flow: { sources: ['Warehouse system', 'Return processing', 'Purchase orders'], engine: 'Inventory Sync Engine', outputs: ['Shopify stock', 'Amazon stock', 'Noon stock'] } },
  { n: '03', title: 'Abandoned Cart Recovery', desc: 'Three-touch recovery sequence triggered automatically for every abandoned cart — personalised with the cart contents and a time-sensitive offer.', bullets: ['Touch 1: reminder email at 1 hour with cart contents', 'Touch 2: WhatsApp message at 24 hours with discount code', 'Touch 3: final email at 72 hours with urgency trigger', 'A/B tested subject lines and timing by product category'], tags: ['Email', 'WhatsApp', 'n8n', 'Shopify'], flow: { sources: ['Cart abandoned', 'Customer data', 'Product data'], engine: 'Cart Recovery Engine', outputs: ['Email sequence', 'WhatsApp message', 'Conversion tracking'] } },
  { n: '04', title: 'AI Customer Support', desc: 'AI-powered support handling order status, tracking, returns, and FAQs across email and WhatsApp — with instant response and seamless human escalation.', bullets: ['Order status and tracking answered instantly from order data', 'Return and exchange requests processed automatically', 'Complex queries escalated to human with full context', 'Support dashboard showing resolution rate and CSAT'], tags: ['GPT-4o', 'WhatsApp', 'Email', 'n8n'], flow: { sources: ['Customer message', 'Order data', 'FAQ library'], engine: 'Customer Support AI', outputs: ['Instant reply', 'Return processed', 'Human escalation'] } },
  { n: '05', title: 'E-Commerce Performance Dashboard', desc: 'Live revenue, conversion, inventory, and support metrics — with automated daily and weekly reports for management.', bullets: ['Real-time revenue by channel, SKU, and category', 'Conversion funnel and cart abandonment analytics', 'Inventory health: sell-through, dead stock, reorder status', 'Automated weekly report delivered to management every Monday'], tags: ['Dashboards', 'Reporting', 'Shopify', 'Automation'], flow: { sources: ['Order data', 'Inventory data', 'Support data'], engine: 'Tergo Reporting Layer', outputs: ['Live dashboard', 'Weekly report', 'Alert notifications'] } },
];

const STATS = [
  { val: '2hr', label: 'Order fulfilment\ntime' },
  { val: '0', label: 'Oversell\nincidents' },
  { val: '4x', label: 'Cart recovery\nrate' },
  { val: '24/7', label: 'Support\ncoverage' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function EcommerceClient() {
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
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.12)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,13,13,0.92) 30%, rgba(13,13,13,0.55) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 38%, rgba(249,202,0,0.18) 0%, transparent 52%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 75%, rgba(249,202,0,0.08) 0%, transparent 40%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(transparent,#0d0d0d)', zIndex: 4 }} />

        <div className="container">
          <div className="page-hero-eyebrow">Sector — E-Commerce</div>
          <h1>
            Store operations.<br />
            <em>Automated. Scaled.</em>
          </h1>
          <p>Order processing, inventory sync, abandoned cart recovery, and customer support — fully automated so your team focuses on growth, not admin.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">2<span>hr</span></div><div className="met-s">Order fulfilment<br />time</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Oversell<br />incidents</div></div>
            <div className="met"><div className="met-b">4<span>x</span></div><div className="met-s">Abandoned cart<br />recovery</div></div>
            <div className="met"><div className="met-b">24<span>/7</span></div><div className="met-s">Support<br />coverage</div></div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <span className="sec-label">The real problems</span>
            <h2 className="sec-title">Why e-commerce stores lose revenue — and how to stop it.</h2>
            <p className="sec-sub">The same four operational failures bleed margin from every online store at scale. Here&apos;s what changes when we automate them.</p>
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
            <h2 className="sec-title">From order received to customer delighted — automated.</h2>
            <p className="sec-sub">We handle the full operations stack: instant fulfilment, multi-channel inventory sync, abandoned cart recovery, AI customer support, and live performance reporting — all custom-built for your store.</p>
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
            <h2 className="sec-title">What could automation save<br />your e-commerce store?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Calculate your estimated 12-month impact — ops hours saved, revenue recovered, and ROI.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="section section-dots">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="sec-label">Case study</span>
            <h2 className="sec-title">Desert Rose Fashion · Dubai</h2>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.2)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.04em' }}>Fashion Retail · Multi-Channel</span>
          </div>
          <div className="re-case-grid">
            {[
              { label: 'The Problem', content: 'A Dubai-based fashion brand selling across Shopify, Amazon UAE, and Noon. Orders processed manually by a 3-person ops team taking 90 minutes each. Inventory oversells happened 10–12 times per month. Cart abandonment recovery was manual and inconsistent. Support response times averaged 18 hours.' },
              { label: 'What We Built', content: 'End-to-end order fulfilment automation with courier API integration, real-time inventory sync across Shopify, Amazon, and Noon, a three-touch abandoned cart recovery sequence via email and WhatsApp, and an AI customer support layer handling order status, tracking, and returns.' },
              { label: 'The Result', content: 'Order processing time reduced from 90 minutes to under 5 minutes. Zero oversell incidents since deployment. Abandoned cart revenue recovery increased by 4x. Support response time dropped to under 5 minutes. The ops team now manages 3x the order volume with the same headcount.' },
            ].map(col => (
              <div key={col.label} style={{ background: 'var(--dark)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, margin: 0 }}>{col.content}</p>
              </div>
            ))}
          </div>
          <div className="re-case-nums">
            {[{ val: '−85min', label: 'Per order saved' }, { val: '0', label: 'Oversells' }, { val: '4x', label: 'Cart recovery' }].map(s => (
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
          <h2>Ready to scale your store<br />without scaling your team?</h2>
          <p>Book a free discovery call. We&apos;ll show you exactly how much revenue your current operations are leaving on the table — and how fast we can automate it.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
