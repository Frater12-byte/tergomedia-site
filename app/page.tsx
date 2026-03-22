import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowGraphic, Stepper, CtaBar, Ticker, ImgPh, PROCESS_STEPS } from '@/components/Graphics';

export const metadata: Metadata = { title: 'Home' };

export default function Home() {
  return (<>
    <div className="hero">
      <div className="hero-grid-bg" />
      <div className="hero-inner">
        <div>
          <div className="eyebrow y">AI · Automation · Custom Software</div>
          <h1>We build<br/><em className="y">systems</em><br/>that run<br/>your <em className="c">business</em>.</h1>
          <p className="hero-desc">Tergo Media is an AI, automation &amp; custom software agency. We build tools that work while you sleep — across <strong>Dubai, Bucharest, and Milano.</strong></p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-y">Book a free discovery call →</Link>
            <Link href="/tools" className="btn btn-outline">Try our free tools</Link>
          </div>
        </div>
        <div>
          <FlowGraphic
            nodes={[
              {text:'New lead captured via form',status:'Trigger'},
              {text:'AI qualifies & scores',status:'Running'},
              {text:'Best agent assigned',status:'Queued'},
              {text:'WhatsApp + email sent',status:'Queued'},
              {text:'CRM updated instantly',status:'Queued'},
            ]}
            title="Lead capture automation"
            resultLabel="Avg. response time"
            resultText="Under 90 seconds — zero human input"
          />
        </div>
      </div>
    </div>

    <div className="stats-fw fw-grid g4">
      {[['10+','years shipping digital products','y'],['40+','automation systems live in production','c'],['3','offices — UAE, Romania, Italy','y'],['$7M+','revenue generated for our clients','p']].map(([n,l,c])=>(
        <div className="stat" key={n}><div className={`stat-n ${c}`}>{n}</div><div className="stat-l" dangerouslySetInnerHTML={{__html:l}} /></div>
      ))}
    </div>

    <div className="sec">What we do</div>
    <div className="fw fw-grid g2">
      {[
        {n:'01',t:'AI & Automation',d:'Lead capture, document processing, AI agents, reporting — all automated. Your team focuses on growth, not admin.',tags:['n8n · Make','GPT-4o · Claude','WhatsApp API'],tc:'y',href:'/services/ai-automation'},
        {n:'02',t:'Custom Web & Mobile Apps',d:'React, Next.js, Node.js, Python, PHP, native iOS & Android. Production-grade, shipped in weeks not months.',tags:['React · Next.js','Python · PHP','iOS · Android'],tc:'c',href:'/services/custom-dev'},
        {n:'03',t:'CTO Advisory',d:'Fractional CTO for companies that need senior technical leadership without a full-time hire. Architecture, team, strategy.',tags:['Tech strategy','Architecture','Team leadership'],tc:'p',href:'/services/cto-advisory'},
        {n:'04',t:'Digital Transformation',d:'Full-scope digital audits and transformation programmes. We map inefficiencies and implement the systems to fix them.',tags:['Digital audit','Process redesign','Change mgmt'],tc:'r',href:'/services/digital-transformation'},
      ].map(s=>(
        <div className={`cell at-${s.tc} pad-lg`} key={s.n}>
          <div className="num">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p>
          <div style={{marginTop:10}}>{s.tags.map(t=><span key={t} className={`tag ${s.tc}`}>{t}</span>)}</div>
          <div style={{marginTop:18}}><Link href={s.href} className={`btn btn-outline-y`} style={s.tc!=='y'?{borderColor:`var(--${s.tc}br)`,color:`var(--${s.tc})`}:{}}>Explore →</Link></div>
        </div>
      ))}
    </div>

    <div className="sec">Sectors we serve</div>
    <div className="fw fw-grid g4">
      {[
        {c:'y',label:'Real estate · Dubai',t:'Brokerages',d:'Lead routing, CRM automation, AI follow-up.',href:'/sectors/real-estate'},
        {c:'c',label:'Travel & hospitality',t:'Tour operators',d:'Booking automation, AI itinerary generation.',href:'/sectors/travel-hospitality'},
        {c:'p',label:'Agriculture',t:'Agri businesses',d:'IoT monitoring, automated alerts, portals.',href:'/sectors/agriculture'},
        {c:'r',label:'Professional services',t:'Service firms',d:'Invoice automation, KPI reporting, onboarding.',href:'/sectors/professional-services'},
      ].map(s=>(
        <div className="cell" key={s.t} style={{cursor:'pointer'}} onClick={()=>window.location.href=s.href}>
          <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:`var(--${s.c})`,marginBottom:10}}>{s.label}</div>
          <h3 style={{fontSize:16}}>{s.t}</h3><p>{s.d}</p>
          <div style={{marginTop:12,fontSize:11,fontWeight:800,color:`var(--${s.c})`,textTransform:'uppercase',letterSpacing:1}}>Explore →</div>
        </div>
      ))}
    </div>

    <div className="sec">Free live tools — try now</div>
    <div className="fw fw-grid g2">
      <div className="cell pad-lg"><span className="tag y" style={{marginBottom:14,display:'inline-block'}}>Live · Real estate</span><h3>Brokerage Revenue Analyzer</h3><p>Answer 9 questions about your Dubai brokerage. Get a precise AED revenue leakage figure + AI-written diagnosis in under 3 minutes.</p><div style={{marginTop:16}}><a className="btn btn-y" href="https://analyzer.tergomedia.com" target="_blank" rel="noreferrer">Try it free →</a></div></div>
      <div className="cell pad-lg"><span className="tag c" style={{marginBottom:14,display:'inline-block'}}>Live · All sectors</span><h3>SaaS Stack Auditor</h3><p>List your business tools and get an instant AI audit of overlap, waste, and savings — with a recommended leaner stack.</p><div style={{marginTop:16}}><a className="btn btn-c" href="https://automate.tergomedia.com" target="_blank" rel="noreferrer">Try it free →</a></div></div>
    </div>

    <div className="sec">How we work</div>
    <div className="fw fw-grid g2">
      <div className="cell pad-lg"><h3>From first call to live system — in weeks, not months</h3><p>We work in tight, outcome-focused sprints with fixed-price proposals and clear deliverables at each step. No bloated retainers.</p></div>
      <div className="cell"><Stepper steps={PROCESS_STEPS} color="y" /></div>
    </div>

    <div className="sec">Portfolio</div>
    <div className="fw fw-grid g3">
      {[
        {tc:'y',cat:'Travel · CRM · Automation',t:'Cocktail Holidays',d:'Full digital transformation — booking automation, CRM, RPA. Scaled to $7M revenue. Exit achieved.',img:'img-01'},
        {tc:'c',cat:'Agriculture · IoT · Portal',t:'Agri Novatex',d:'Distributor portals, HubSpot implementation, API integrations across South Africa and UK.',img:'img-02'},
        {tc:'p',cat:'Mobile · iOS · Android',t:'Ranjet',d:'Native iOS and Android app, product management, digital strategy for a high-growth startup.',img:'img-03'},
      ].map(p=>(
        <div className={`cell at-${p.tc}`} key={p.t}>
          <div style={{fontSize:9,color:'var(--m)',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>{p.cat}</div>
          <h3>{p.t}</h3><p>{p.d}</p>
          <ImgPh label={p.img.toUpperCase()} desc={`${p.t} screenshot`} h={140} />
          <div style={{marginTop:12}}><Link href="/portfolio" style={{fontSize:11,fontWeight:800,color:`var(--${p.tc})`,textDecoration:'none',textTransform:'uppercase',letterSpacing:1}}>View case →</Link></div>
        </div>
      ))}
    </div>

    <CtaBar h="Ready to build something that actually works?" sub="Book a free 30-minute discovery call. No pitch, no commitment — just clarity on what's possible." />
    <Ticker items={[{text:'AI Automation',color:'y'},{text:'Custom Dev',color:'c'},{text:'CTO Advisory',color:'p'},{text:'Real Estate',color:'y'},{text:'Travel',color:'c'},{text:'Agriculture',color:'p'},{text:'Professional Services',color:'r'},{text:'PHP · Python · Node.js · React'}]} />
  </>);
}
