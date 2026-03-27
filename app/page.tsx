/* eslint-disable */
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ROICalculator from '@/components/ROICalculator';
import AutopilotSection from '@/components/AutopilotSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TestimonialsSection from '@/components/TestimonialsSection';

// ── FLOW CARD ──
const FLOW_STEPS = [
  { icon: <svg viewBox="0 0 24 24" stroke="#f9ca00" strokeWidth="1.8" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: 'New lead captured', sub: 'Bayut · PropertyFinder · Web form' },
  { icon: <svg viewBox="0 0 24 24" stroke="#00c8ff" strokeWidth="1.8" fill="none"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>, label: 'AI qualifies & scores', sub: 'GPT-4o reads intent, budget, timeline' },
  { icon: <svg viewBox="0 0 24 24" stroke="#b06eff" strokeWidth="1.8" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label: 'Best agent assigned', sub: 'Routing by language, area & tier' },
  { icon: <svg viewBox="0 0 24 24" stroke="#00ff9d" strokeWidth="1.8" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: 'WhatsApp + email sent', sub: 'Personalised, auto-generated' },
  { icon: <svg viewBox="0 0 24 24" stroke="#f9ca00" strokeWidth="1.8" fill="none"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, label: 'CRM updated instantly', sub: 'HubSpot record created, pipeline set' },
];

function FlowCard() {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => {
    const iv = setInterval(() => {
      setDone(d => d.includes(active) ? d : [...d, active]);
      setActive(a => (a + 1) % FLOW_STEPS.length);
    }, 1800);
    return () => clearInterval(iv);
  }, [active]);
  return (
    <div className="flow-card">
      <div className="flow-card-label">AI lead automation — live flow</div>
      <div className="flow-steps">
        {FLOW_STEPS.map((s, i) => (
          <div key={i} className={`flow-step${active === i ? ' fs-active' : done.includes(i) ? ' fs-done' : ''}`}>
            <div className="fsi">{s.icon}</div>
            <div><strong>{s.label}</strong><span>{s.sub}</span></div>
          </div>
        ))}
      </div>
      <div className="flow-result">
        <div className="fr-item"><div className="num">90s</div><div className="lbl">Avg. response</div></div>
        <div className="fr-item"><div className="num">0</div><div className="lbl">Human input</div></div>
        <div className="fr-item"><div className="num">24/7</div><div className="lbl">Always on</div></div>
      </div>
    </div>
  );
}

// ── TICKER ──
const TICKER_ITEMS = ['AI Automation','Custom Web & Mobile','CTO Advisory','Digital Transformation','Lead Automation','CRM Integration','Real Estate','IoT & Agriculture','Travel & Hospitality','React · Next.js · Node.js · Python'];
function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((t, i) => <span key={i} className="ticker-item">{t}</span>)}
      </div>
    </div>
  );
}

// ── PAGE ──
export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <svg className="poly-bg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="820,0 1440,130 1440,380 1080,510 700,310 760,0" fill="rgba(249,202,0,0.025)" stroke="#f9ca00" strokeWidth="0.6" strokeOpacity="0.1"/>
          <polygon points="1120,0 1440,0 1440,220 1300,290" fill="none" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.13"/>
          <polygon points="580,620 880,510 1180,680 980,800 480,800" fill="rgba(0,200,255,0.02)" stroke="#00c8ff" strokeWidth="0.4" strokeOpacity="0.08"/>
          <polygon points="0,180 210,90 400,300 200,480 0,380" fill="none" stroke="#f9ca00" strokeWidth="0.4" strokeOpacity="0.08"/>
          <circle cx="820" cy="0" r="2.5" fill="#f9ca00" fillOpacity="0.3"/>
          <circle cx="1080" cy="510" r="2" fill="#f9ca00" fillOpacity="0.22"/>
          <circle cx="700" cy="310" r="2" fill="#f9ca00" fillOpacity="0.18"/>
          <circle cx="210" cy="90" r="2" fill="#f9ca00" fillOpacity="0.2"/>
          <circle cx="1300" cy="290" r="1.5" fill="#00c8ff" fillOpacity="0.25"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-eyebrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                AI · Automation · Custom Software
              </div>
              <h1>We build <em>systems</em> that run your <em>business.</em></h1>
              <p className="hero-sub">Tergo Media builds AI automation and custom software that works while you sleep — freeing your team to focus on growth, not admin.</p>
              <div className="hero-ctas">
                <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a free discovery call →</a>
                <Link href="/portfolio" className="btn btn-ol btn-lg">See our work</Link>
              </div>
              <div className="hero-locs">
                <div className="hero-loc"><div className="loc-dot" />Dubai, UAE</div>
                <div className="hero-loc"><div className="loc-dot" />Bucharest, Romania</div>
                <div className="hero-loc"><div className="loc-dot" />Milan, Italy</div>
              </div>
            </div>
            <div className="hero-vw"><FlowCard /></div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-grid">
          <div className="stat-item"><div className="stat-num">10<span>+</span></div><div className="stat-desc">Years shipping<br />digital products</div></div>
          <div className="stat-item"><div className="stat-num">40<span>+</span></div><div className="stat-desc">Automation systems<br />live in production</div></div>
          <div className="stat-item"><div className="stat-num">$7M<span>+</span></div><div className="stat-desc">Revenue generated<br />across clients</div></div>
          <div className="stat-item"><div className="stat-num">3</div><div className="stat-desc">Offices — UAE,<br />Romania, Italy</div></div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="section section-dots" id="services">
        <div className="container">
          <span className="sec-label">What we do</span>
          <h2 className="sec-title">Four ways we build leverage<br />into your business.</h2>
          <p className="sec-sub">From a single automation to a full technology transformation — we scope tightly and ship fast.</p>
          <div className="services-grid">
            {[
              { num: '01 — AI & AUTOMATION', title: 'AI & Automation', desc: 'Lead capture, document processing, AI agents, reporting — all automated. Your team focuses on growth, not admin.', tags: ['n8n','Make','GPT-4o','Claude','WhatsApp API'], href: '/services/ai-automation' },
              { num: '02 — CUSTOM DEVELOPMENT', title: 'Custom Web & Mobile Apps', desc: 'React, Next.js, Node.js, Python, PHP, native iOS & Android. Production-grade, shipped in weeks not months.', tags: ['React','Next.js','Python','PHP','iOS','Android'], href: '/services/custom-dev' },
              { num: '03 — FRACTIONAL CTO', title: 'CTO Advisory', desc: 'Fractional CTO for companies that need senior technical leadership without a full-time hire. Architecture, team, strategy.', tags: ['Tech strategy','Architecture','Team leadership'], href: '/services/cto-advisory' },
              { num: '04 — TRANSFORMATION', title: 'Digital Transformation', desc: 'Full-scope digital audits and transformation programmes. We map inefficiencies and implement the systems to fix them.', tags: ['Digital audit','Process redesign','Change mgmt'], href: '/services/digital-transformation' },
            ].map(s => (
              <div key={s.href} className="svc-card">
                <span className="svc-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-tags">{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <Link href={s.href} className="svc-link">EXPLORE SERVICE →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOMATION SHOWCASE */}
      <section className="section auto-showcase section-shimmer" id="automation">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,0 300,60 220,300 0,260" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="0.5"/>
          <polygon points="1140,0 1440,0 1440,200 1300,260" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="0.5"/>
          <circle cx="300" cy="60" r="2" fill="rgba(255,255,255,1)" fillOpacity="0.1"/>
          <circle cx="900" cy="320" r="1.5" fill="rgba(255,255,255,1)" fillOpacity="0.12"/>
        </svg>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="sec-label">Automation library</span>
          <h2 className="sec-title">Real automations.<br />Real results.</h2>
          <p className="sec-sub">Six live automation systems we&apos;ve built and deployed across industries.</p>
          <div className="showcase-grid">
            {[
              { color: '#f9ca00', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: 'AI Lead Response', desc: 'Every inbound enquiry gets a personalised WhatsApp + email response in under 90 seconds. AI reads intent, writes the message, routes to the best agent.', tags: ['GPT-4o','WhatsApp API','n8n','HubSpot'], result: <>Response time cut from <span className="sc-g">4h → 90s</span></> },
              { color: '#00c8ff', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, title: 'Invoice & Document AI', desc: 'Invoices and contracts are read by AI, data extracted, validated, and synced to your accounting system — no manual entry, no errors.', tags: ['OCR','Claude','Make','Xero / QuickBooks'], result: <>Manual entry <span className="sc-b">eliminated</span> — 100%</> },
              { color: '#b06eff', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: 'KPI Dashboard Auto-Report', desc: "Every Monday morning your leadership team receives a fully formatted PDF report with last week's KPIs — generated and sent without a single click.", tags: ['Google Sheets','Slack','PDF generation','n8n'], result: <>38 hrs/mo <span className="sc-g">saved on reporting</span></> },
              { color: '#00ff9d', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Client Onboarding Pipeline', desc: 'When a deal is marked Won in CRM, a full onboarding sequence fires: welcome email, document request, kick-off invite, Slack channel — all within 2 minutes.', tags: ['HubSpot','Slack','Google Calendar','DocuSign'], result: <>Onboarding time <span className="sc-g">cut by 70%</span></> },
              { color: '#f9ca00', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>, title: 'IoT Alert & Escalation', desc: 'Sensor thresholds breach → system classifies severity → right team member alerted via SMS/email/Slack with context and recommended action.', tags: ['MQTT','Node.js','Twilio SMS','PagerDuty'], result: <>Alert response from <span className="sc-b">hours → minutes</span></> },
              { color: '#00c8ff', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Marketplace Price Sync', desc: 'Product pricing and availability stay in sync across your website, Amazon, Noon, and distributor portals — updated automatically whenever your catalogue changes.', tags: ['WooCommerce','Amazon API','Make','Webhooks'], result: <>Sync errors <span className="sc-g">dropped to zero</span></> },
            ].map((c, i) => (
              <div key={i} className="sc-card">
                <div className="sc-icon" style={{ borderColor: `${c.color}4d` }}><svg viewBox="0 0 24 24" stroke={c.color} strokeWidth="1.5" fill="none">{c.icon.props.children}</svg></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="sc-tags">{c.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div className="sc-result">{c.result}</div>
              </div>
            ))}
          </div>
          <div className="mt-cta">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Build my automation →</a>
            <a href="#roi" className="btn btn-ol">Calculate my ROI</a>
          </div>
        </div>
      </section>

      {/* AUTOPILOT */}
      <AutopilotSection />

      {/* HOW WE WORK */}
      <section className="section how-section section-light" id="how">
        <svg className="poly-bg" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,100 200,20 350,200 150,380 0,300" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="0.5"/>
          <polygon points="1100,0 1440,100 1440,350 1200,420" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="0.4"/>
          <circle cx="200" cy="20" r="2" fill="rgba(255,255,255,1)" fillOpacity="0.12"/>
          <circle cx="1200" cy="420" r="1.5" fill="rgba(255,255,255,1)" fillOpacity="0.12"/>
        </svg>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="how-grid">
            <div>
              <span className="sec-label">How we work</span>
              <h2 className="sec-title">From first call to live system —<br />in weeks, not months.</h2>
              <p className="sec-sub">Fixed-price proposals. Clear deliverables. No bloated retainers. No surprises.</p>
              <div className="how-steps">
                {[
                  { n: '01', title: 'Automation audit', desc: 'We map your workflows, identify where time is lost, and quantify the impact. Free for qualified leads.', badge: '1–2 DAYS' },
                  { n: '02', title: 'Design & scoping', desc: 'Architecture decisions, tool selection, and a fixed-price proposal with clear milestones.', badge: '3–5 DAYS' },
                  { n: '03', title: 'Build & test', desc: 'Iterative sprints with weekly demos. You see progress every week, not after months of silence.', badge: '2–8 WEEKS' },
                  { n: '04', title: 'Launch & handover', desc: 'Full documentation, team training, and 30-day post-launch support. You own everything.', badge: '1 WEEK' },
                ].map(s => (
                  <div key={s.n} className="how-step">
                    <div className="how-step-n">{s.n}</div>
                    <div className="how-step-body"><h4>{s.title}</h4><p>{s.desc}</p><span className="step-badge">{s.badge}</span></div>
                  </div>
                ))}
              </div>
              <div className="mt-cta">
                <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Start a project →</a>
              </div>
            </div>
            <div>
              <div className="how-outcome">
                <div className="hoc-glow" />
                <div className="hoc-label">Real estate brokerage · Dubai · 12 agents</div>
                <div className="hoc-title">Before vs after automation</div>
                <div className="hoc-sub">Drag the handle to compare — left is before, right is after</div>
                <BeforeAfterSlider />
                <div style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.18)', marginBottom: 12 }}>PROJECT TIMELINE</div>
                <div className="tl">
                  <div className="tl-item tl-green"><div className="tl-label">Discovery call & audit</div><div className="tl-week">Week 1</div></div>
                  <div className="tl-item tl-green"><div className="tl-label">Scoping & fixed-price proposal</div><div className="tl-week">Week 1–2</div></div>
                  <div className="tl-item tl-green"><div className="tl-label">Build: lead capture + WhatsApp AI</div><div className="tl-week">Week 2–4</div></div>
                  <div className="tl-item tl-yellow"><div className="tl-label">Launch: CRM sync + reporting live</div><div className="tl-week">Week 5 — live now</div></div>
                  <div className="tl-item"><div className="tl-label">30-day support & optimisation</div><div className="tl-week">Week 6–9</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="section roi-section" id="roi">
        <svg className="poly-bg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="1180,0 1440,0 1440,280 1340,190" fill="none" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.08"/>
          <polygon points="0,380 190,290 380,480 190,670 0,570" fill="none" stroke="#00c8ff" strokeWidth="0.4" strokeOpacity="0.07"/>
          <circle cx="1180" cy="0" r="2" fill="#f9ca00" fillOpacity="0.2"/>
          <circle cx="190" cy="290" r="1.5" fill="#00c8ff" fillOpacity="0.18"/>
        </svg>
        <div className="container">
          <div className="txt-c" style={{ maxWidth: 600, margin: '0 auto 56px' }}>
            <span className="sec-label">Free estimate</span>
            <h2 className="sec-title">What could automation<br />save your team?</h2>
            <p className="sec-sub" style={{ margin: '0 auto', textAlign: 'center', maxWidth: 480 }}>Adjust the sliders to match your business and see the estimated 12-month impact.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section section-shimmer" id="portfolio">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="sec-label">Selected work</span>
          <h2 className="sec-title">Shipped. In production. Working.</h2>
          <p className="sec-sub">A selection of client projects across automation, custom development and digital transformation.</p>
          <div className="port-grid">
            {[
              { href: '/portfolio', img: '/Images/IMG-01.png', tags: ['Real Estate','AI Automation'], title: 'Cocktail Holidays', desc: 'AI lead qualification + WhatsApp automation for Dubai luxury property portal.' },
              { href: '/portfolio', img: '/Images/IMG-02.png', tags: ['Agriculture','IoT'], title: 'Agri Novatex', desc: 'IoT sensor platform + alert automation for precision agriculture in Romania.' },
              { href: '/portfolio', img: '/Images/IMG-03.png', tags: ['Travel','Custom Dev'], title: 'Ranjet Aviation', desc: 'Custom booking and fleet management system for private jet charter.' },
              { href: '/portfolio', img: '/Images/IMG-04.png', tags: ['Automation','CRM'], title: 'HayGuard', desc: 'End-to-end client onboarding automation integrated with HubSpot CRM.' },
              { href: '/portfolio', img: '/Images/IMG-05.png', tags: ['Digital Transformation'], title: 'RE/MAX Gulf', desc: 'Full digital transformation: CRM rollout, automation, agent training programme.' },
              { href: '/portfolio', img: '/Images/IMG-06.png', tags: ['Custom Dev','AI'], title: 'Tergo AI Suite', desc: 'Proprietary AI tools suite for hospitality and professional services clients.' },
            ].map((p, i) => (
              <Link key={i} href={p.href} className="port-card">
                <img src={p.img} alt={p.title} className="port-img" />
                <div className="port-body">
                  <div className="port-tags">{p.tags.map(t => <span key={t} className="port-tag">{t}</span>)}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-cta">
            <Link href="/portfolio" className="btn btn-dark btn-lg">View all projects →</Link>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="section section-dots" id="sectors">
        <div className="container">
          <span className="sec-label">Industries</span>
          <h2 className="sec-title">We know your industry.</h2>
          <p className="sec-sub">Deep domain knowledge means we build systems that actually fit how your business works.</p>
          <div className="sectors-grid">
            <Link href="/sectors/real-estate" className="sector-cell">
              <div className="sec-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <h3>Real Estate</h3><p>Lead automation, CRM integration, portal syncing, property management systems.</p><span className="sec-lnk">EXPLORE →</span>
            </Link>
            <Link href="/sectors/travel-hospitality" className="sector-cell">
              <div className="sec-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M3 17l3-8 4 6 3-4 4 6"/></svg></div>
              <h3>Travel & Hospitality</h3><p>Booking engines, channel managers, guest communication automation, revenue tools.</p><span className="sec-lnk">EXPLORE →</span>
            </Link>
            <Link href="/sectors/agriculture" className="sector-cell">
              <div className="sec-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M12 22V12M12 12C12 12 7 6 2 6M12 12C12 12 17 6 22 6"/><path d="M2 6c0 0 2 5 10 6M22 6c0 0-2 5-10 6"/></svg></div>
              <h3>Agriculture</h3><p>IoT sensor networks, crop monitoring, automated alerts, supply chain tracking.</p><span className="sec-lnk">EXPLORE →</span>
            </Link>
            <Link href="/sectors/professional-services" className="sector-cell">
              <div className="sec-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
              <h3>Professional Services</h3><p>Client onboarding pipelines, document automation, billing, KPI reporting.</p><span className="sec-lnk">EXPLORE →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* TEAM */}
      <section className="section team-section" id="team">
        <div className="container">
          <span className="sec-label">The founders</span>
          <h2 className="sec-title">Built by people who ship.</h2>
          <p className="sec-sub">No account managers or junior teams. You work directly with our founders — who have built and shipped over 100 digital products.</p>
          <div className="team-grid">
            <div className="team-card">
              <img src="/Images/IMG-20.png" alt="Maria Terragni" className="team-img" />
              <div className="team-body">
                <div className="team-roles"><span className="t-role-tag">CEO</span><span className="t-role-tag">Strategy</span><span className="t-role-tag">Client Partnerships</span></div>
                <h3>Maria Terragni</h3>
                <div className="team-sub-text">CEO & Co-Founder</div>
                <p>10+ years leading digital transformation projects across real estate, travel, and professional services. Former management consultant, now building AI-first businesses.</p>
                <div className="skill-tags"><span className="sk-tag">Business strategy</span><span className="sk-tag">Digital transformation</span><span className="sk-tag">Client leadership</span></div>
                <a href="https://www.linkedin.com/in/maria-terragni/" target="_blank" rel="noreferrer" className="team-li">LinkedIn →</a>
              </div>
            </div>
            <div className="team-card">
              <img src="/Images/IMG-26.png" alt="Francesco Terragni" className="team-img" />
              <div className="team-body">
                <div className="team-roles"><span className="t-role-tag">CTO</span><span className="t-role-tag">Engineering</span><span className="t-role-tag">AI Architecture</span></div>
                <h3>Francesco Terragni</h3>
                <div className="team-sub-text">CTO & Co-Founder</div>
                <p>Full-stack engineer and AI architect with 10+ years building production systems. Specialises in automation infrastructure, AI pipelines, and custom software at scale.</p>
                <div className="skill-tags"><span className="sk-tag">React / Next.js</span><span className="sk-tag">Node.js / Python</span><span className="sk-tag">AI pipelines</span><span className="sk-tag">n8n / Make</span></div>
                <a href="https://www.linkedin.com/in/francescoterragni/" target="_blank" rel="noreferrer" className="team-li">LinkedIn →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="section offices-section" id="offices">
        <div className="container">
          <span className="sec-label">Where we are</span>
          <h2 className="sec-title">Three offices.<br />One team.</h2>
          <p className="sec-sub">We work across time zones so your project never sleeps.</p>
          <div className="offices-layout">
            <div>
              <div className="world-map-wrap">
                <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', padding: '24px' }}>
                  <path d="M60,120 L120,100 L160,110 L180,130 L160,150 L120,160 L80,150 Z" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
                  <path d="M200,70 L280,55 L340,65 L380,90 L370,120 L330,135 L280,130 L240,115 L210,100 Z" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
                  <path d="M380,55 L450,45 L520,55 L560,75 L580,100 L560,125 L520,140 L460,145 L420,135 L390,110 L375,85 Z" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
                  <path d="M560,105 L620,95 L660,110 L680,135 L660,155 L620,160 L580,150 L560,130 Z" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
                  <path d="M680,90 L760,80 L820,95 L850,120 L840,150 L800,165 L750,168 L700,155 L675,128 Z" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
                  <path d="M200,175 L260,155 L320,168 L340,200 L320,228 L260,238 L210,222 L190,195 Z" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
                  {/* Connection lines */}
                  <line x1="455" y1="102" x2="498" y2="96" stroke="rgba(255,255,255,.12)" strokeWidth="0.8" strokeDasharray="4,4"/>
                  <line x1="498" y1="96" x2="628" y2="130" stroke="rgba(255,255,255,.12)" strokeWidth="0.8" strokeDasharray="4,4"/>
                  {/* Milan */}
                  <circle cx="455" cy="102" r="6" fill="#00c8ff" opacity="0.9"/><circle cx="455" cy="102" r="14" fill="#00c8ff" opacity="0.12"/>
                  <text x="440" y="90" fill="rgba(255,255,255,.7)" fontSize="11" fontFamily="'Exo 2',sans-serif" fontWeight="700">Milan</text>
                  {/* Bucharest */}
                  <circle cx="498" cy="96" r="6" fill="#00ff9d" opacity="0.9"/><circle cx="498" cy="96" r="14" fill="#00ff9d" opacity="0.12"/>
                  <text x="510" y="92" fill="rgba(255,255,255,.7)" fontSize="11" fontFamily="'Exo 2',sans-serif" fontWeight="700">Bucharest</text>
                  {/* Dubai */}
                  <circle cx="628" cy="130" r="7" fill="#f9ca00" opacity="0.9"/><circle cx="628" cy="130" r="16" fill="#f9ca00" opacity="0.12"/>
                  <text x="641" y="126" fill="rgba(255,255,255,.7)" fontSize="11" fontFamily="'Exo 2',sans-serif" fontWeight="700">Dubai</text>
                </svg>
              </div>
              <div className="office-city-row">
                <div className="ofc-city dubai"><div className="ofc-dot" /><span className="ofc-name">Dubai</span><span className="ofc-detail">GMT+4 · HQ</span></div>
                <div className="ofc-city bucharest"><div className="ofc-dot" /><span className="ofc-name">Bucharest</span><span className="ofc-detail">GMT+2 · Engineering</span></div>
                <div className="ofc-city milan"><div className="ofc-dot" /><span className="ofc-name">Milan</span><span className="ofc-detail">GMT+1 · Europe</span></div>
              </div>
              <div className="office-cards">
                <div className="office-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="oc-dot dubai" /><div><div className="oc-city">Dubai, UAE</div><div className="oc-role">Headquarters · Gulf operations</div></div></div>
                  <div className="oc-hours">Sun–Thu · 09:00–18:00 GST</div>
                </div>
                <div className="office-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="oc-dot bucharest" /><div><div className="oc-city">Bucharest, Romania</div><div className="oc-role">Engineering hub · EU deliveries</div></div></div>
                  <div className="oc-hours">Mon–Fri · 09:00–18:00 EET</div>
                </div>
                <div className="office-card" style={{ background: 'rgba(249,202,0,.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="oc-dot milan" /><div><div className="oc-city">Milan, Italy</div><div className="oc-role">European clients · Partnerships</div></div></div>
                  <div className="oc-hours">Mon–Fri · 09:00–18:00 CET</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to put your business<br />on autopilot?</h2>
          <p>Book a free 30-minute discovery call. We&apos;ll map your biggest bottleneck and tell you exactly what we&apos;d build — no commitment required.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
