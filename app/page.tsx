// IMAGES: Put all photos in /public/images/
// Example: public/images/img-04.jpg
// Then in any page, update ImgPh to:
// <ImgPh label="IMG-04" desc="Francesco" h={280} src="/images/img-04.jpg" />

import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowGraphic, Stepper, CtaBar, Ticker, ImgPh, PROCESS_STEPS } from '@/components/Graphics';

export const metadata: Metadata = {
  title: 'Tergo Media — AI Automation & Custom Software | Dubai',
  description: 'AI-powered automation systems, custom web & mobile apps, and fractional CTO advisory. Based in Dubai, serving GCC and European markets. Book a free discovery call.',
  keywords: ['AI automation Dubai', 'custom software development Dubai', 'Next.js developer Dubai', 'CTO advisory UAE', 'automation agency Dubai'],
  openGraph: {
    title: 'Tergo Media — AI Automation & Custom Software',
    description: 'We build systems that run your business. AI automation, custom apps, CTO advisory — Dubai, Bucharest, Milano.',
    url: 'https://tergomedia.com',
    siteName: 'Tergo Media',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Tergo Media', description: 'AI automation & custom software. Dubai-based.' },
  alternates: { canonical: 'https://tergomedia.com' },
};

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
        <Link href={s.href} className="cell" key={s.t} style={{display:'block',textDecoration:'none'}}>
          <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:`var(--${s.c})`,marginBottom:10}}>{s.label}</div>
          <h3 style={{fontSize:16}}>{s.t}</h3><p>{s.d}</p>
          <div style={{marginTop:12,fontSize:11,fontWeight:800,color:`var(--${s.c})`,textTransform:'uppercase',letterSpacing:1}}>Explore →</div>
        </Link>
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
          <ImgPh label={p.img.toUpperCase()} desc={`${p.t} screenshot`} h={140} src={`/Images/${p.img.toUpperCase()}.png`} />
          <div style={{marginTop:12}}><Link href="/portfolio" style={{fontSize:11,fontWeight:800,color:`var(--${p.tc})`,textDecoration:'none',textTransform:'uppercase',letterSpacing:1}}>View case →</Link></div>
        </div>
      ))}
    </div>

    <div className="sec">Client results — by the numbers</div>
    <div className="fw fw-grid g3">
      <div className="cell at-y">
        <div style={{fontSize:9,color:'var(--m)',letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>Real estate · Dubai</div>
        <h3>Lead response time</h3>
        <div className="met" style={{marginTop:14}}><span className="met-b r">4 hrs</span><span className="met-s">before automation</span></div>
        <div className="met"><span className="met-b y">90 sec</span><span className="met-s">after our system went live</span></div>
        <p style={{marginTop:12}}>Leads from Bayut, PropertyFinder, and web forms all captured, scored, and followed up without a human touching anything.</p>
      </div>
      <div className="cell at-c">
        <div style={{fontSize:9,color:'var(--m)',letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>Professional services</div>
        <h3>Admin hours returned</h3>
        <div className="met" style={{marginTop:14}}><span className="met-b c">38 hrs</span><span className="met-s">per week, team of 12</span></div>
        <div className="met"><span className="met-b y">3.2 hrs</span><span className="met-s">daily per person eliminated</span></div>
        <p style={{marginTop:12}}>Copy-paste, manual reporting, and status updates — all automated. Team redirected to billable work within 30 days.</p>
      </div>
      <div className="cell at-p">
        <div style={{fontSize:9,color:'var(--m)',letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>Brokerage revenue audit</div>
        <h3>Revenue recovered</h3>
        <div className="met" style={{marginTop:14}}><span className="met-b p">AED 2.3M</span><span className="met-s">average leakage identified</span></div>
        <div className="met"><span className="met-b y">per brokerage</span><span className="met-s">via the Revenue Analyzer</span></div>
        <p style={{marginTop:12}}>Lost leads, slow follow-up, missed upsells — diagnosed and quantified in under 3 minutes using our free tool.</p>
      </div>
    </div>

    <div className="sec">Technologies we work with</div>
    <div className="fw fw-grid g3">
      <div className="cell pad-lg">
        <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:'var(--y)',marginBottom:14}}>AI & Automation</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {['n8n','Make','Zapier','OpenAI GPT-4o','Anthropic Claude','WhatsApp Business API','Twilio'].map(t=><span key={t} style={{fontSize:13,color:'var(--l)',borderBottom:'1px solid var(--b)',paddingBottom:8}}>{t}</span>)}
        </div>
      </div>
      <div className="cell pad-lg">
        <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:'var(--c)',marginBottom:14}}>Development</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {['React','Next.js','Node.js','Python','PHP / Laravel','iOS (Swift)','Android (Kotlin)','React Native'].map(t=><span key={t} style={{fontSize:13,color:'var(--l)',borderBottom:'1px solid var(--b)',paddingBottom:8}}>{t}</span>)}
        </div>
      </div>
      <div className="cell pad-lg">
        <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:'var(--p)',marginBottom:14}}>Infrastructure</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {['Vercel','AWS','PostgreSQL','Supabase','Docker','cPanel / VPS','MongoDB','Redis'].map(t=><span key={t} style={{fontSize:13,color:'var(--l)',borderBottom:'1px solid var(--b)',paddingBottom:8}}>{t}</span>)}
        </div>
      </div>
    </div>

    <div className="sec">What clients say</div>
    <div className="fw fw-grid g3">
      {[
        {q:'We cooperated with Tergo Media since 2019 on digital transformation, software development and RPA. Always on time and optimised budget.',who:'Fausto Migliori',role:'Future Days · Milano',tc:'y'},
        {q:'The automation they built handles 80% of our lead follow-up without anyone touching it.',who:'Senior Partner',role:'Dubai real estate brokerage',tc:'c'},
        {q:'We went from 6-hour manual reports to automated dashboards in two weeks.',who:'Operations Director',role:'European travel operator',tc:'p'},
      ].map(t=>(
        <div className={`cell at-${t.tc}`} key={t.who}>
          <div style={{fontSize:18,color:`var(--${t.tc})`,marginBottom:14,lineHeight:1}}>&ldquo;</div>
          <p style={{fontSize:14,color:'var(--l)',lineHeight:1.75,fontStyle:'italic',marginBottom:20,maxWidth:'100%'}}>{t.q}</p>
          <div style={{borderTop:'1px solid var(--b)',paddingTop:14}}>
            <div style={{fontSize:12,fontWeight:800,color:'#fff'}}>{t.who}</div>
            <div style={{fontSize:11,color:'var(--m)',marginTop:3}}>{t.role}</div>
          </div>
        </div>
      ))}
    </div>

    <CtaBar h="Ready to build something that actually works?" sub="Book a free 30-minute discovery call. No pitch, no commitment — just clarity on what's possible." />
    <Ticker items={[{text:'AI Automation',color:'y'},{text:'Custom Dev',color:'c'},{text:'CTO Advisory',color:'p'},{text:'Real Estate',color:'y'},{text:'Travel',color:'c'},{text:'Agriculture',color:'p'},{text:'Professional Services',color:'r'},{text:'PHP · Python · Node.js · React'}]} />
  </>);
}
