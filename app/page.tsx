import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowGraphic, Stepper, CtaBar, Ticker, ImgPh, PROCESS_STEPS } from '@/components/Graphics';
import GrowthChart from '@/components/GrowthChart';

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
    {/* ── HERO ── */}
    <div className="hero">
      <div className="hero-grid-bg" />
      <div className="hero-inner-mag">
        <div className="eyebrow y">AI · Automation · Custom Software</div>
        <h1>We build<br/><em className="y">systems</em><br/>that run<br/>your <em className="c">business</em>.</h1>
        <div className="hero-split">
          <div>
            <p className="hero-desc">Tergo Media is an AI, automation &amp; custom software agency. We build tools that work while you sleep — across <strong>Dubai, Bucharest, and Milano.</strong></p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-y">Book a free discovery call →</Link>
              <Link href="/tools" className="btn btn-outline">Try our free tools</Link>
            </div>
          </div>
          <div style={{minWidth: 0, overflow: 'hidden'}}>
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
    </div>

    {/* ── STATS ── */}
    <div className="stats-fw fw-grid g4">
      {[
        ['10+','years shipping digital products','y'],
        ['40+','automation systems live in production','c'],
        ['3','offices — UAE, Romania, Italy','y'],
        ['$7M+','revenue generated for our clients','p'],
      ].map(([n,l,c])=>(
        <div className="stat" key={n}>
          <div className={`stat-n ${c}`}>{n}</div>
          <div className="stat-l">{l}</div>
        </div>
      ))}
    </div>

    {/* ── DUBAI SKYLINE ── */}
    <div style={{width:'100%',position:'relative',height:'420px',overflow:'hidden',borderTop:'1px solid #1e1e1e',borderBottom:'1px solid #1e1e1e'}}>
      <img
        src="/Images/IMG-05.png"
        alt="Dubai — Tergo Media headquarters"
        style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 60%',display:'block'}}
      />
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to right, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.1) 100%)'}}>
        <div style={{position:'absolute',bottom:40,left:'clamp(24px,5vw,72px)'}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:3,color:'var(--y)',textTransform:'uppercase',marginBottom:10}}>Headquarters</div>
          <div style={{fontSize:'clamp(24px,3vw,36px)' as string,fontWeight:900,color:'#fff',textTransform:'uppercase',letterSpacing:-1,lineHeight:1.05}}>Dubai, UAE</div>
          <div style={{fontSize:14,color:'#888',marginTop:8}}>Also in Bucharest · Milano</div>
        </div>
      </div>
    </div>

    {/* ── SERVICES ── */}
    <div className="sec">What we do</div>
    <div className="fw fw-grid g2" data-section="what-we-do">
      {[
        {n:'01',t:'AI & Automation',d:'Lead capture, document processing, AI agents, reporting — all automated. Your team focuses on growth, not admin.',tags:['n8n · Make','GPT-4o · Claude','WhatsApp API'],tc:'y',href:'/services/ai-automation'},
        {n:'02',t:'Custom Web & Mobile Apps',d:'React, Next.js, Node.js, Python, PHP, native iOS & Android. Production-grade, shipped in weeks not months.',tags:['React · Next.js','Python · PHP','iOS · Android'],tc:'c',href:'/services/custom-dev'},
        {n:'03',t:'CTO Advisory',d:'Fractional CTO for companies that need senior technical leadership without a full-time hire. Architecture, team, strategy.',tags:['Tech strategy','Architecture','Team leadership'],tc:'p',href:'/services/cto-advisory'},
        {n:'04',t:'Digital Transformation',d:'Full-scope digital audits and transformation programmes. We map inefficiencies and implement the systems to fix them.',tags:['Digital audit','Process redesign','Change mgmt'],tc:'r',href:'/services/digital-transformation'},
      ].map(s=>(
        <div className="pc-service at-y" key={s.n} style={{borderTopColor:`var(--${s.tc})`}}>
          <div className="pc-service-num">{s.n}</div>
          <div className="pc-service-accent" style={{background:`var(--${s.tc})`}} />
          <div className="pc-service-title">{s.t}</div>
          <div className="pc-service-desc">{s.d}</div>
          <div style={{marginBottom:20}}>{s.tags.map(t=><span key={t} className={`tag ${s.tc}`}>{t}</span>)}</div>
          <Link href={s.href} className="pc-service-link" style={{color:`var(--${s.tc})`}}>Explore service →</Link>
        </div>
      ))}
    </div>

    {/* ── SECTORS ── */}
    <div className="sec">Sectors we serve</div>
    <div className="fw fw-grid g4">
      {[
        {c:'y',label:'Real estate · Dubai',t:'Brokerages',d:'Lead routing, CRM automation, AI follow-up.',href:'/sectors/real-estate'},
        {c:'c',label:'Travel & hospitality',t:'Tour operators',d:'Booking automation, AI itinerary generation.',href:'/sectors/travel-hospitality'},
        {c:'p',label:'Agriculture',t:'Agri businesses',d:'IoT monitoring, automated alerts, portals.',href:'/sectors/agriculture'},
        {c:'r',label:'Professional services',t:'Service firms',d:'Invoice automation, KPI reporting, onboarding.',href:'/sectors/professional-services'},
      ].map(s=>(
        <Link href={s.href} className="cell" key={s.t} style={{display:'block',minHeight:220}}>
          <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:`var(--${s.c})`,marginBottom:12}}>{s.label}</div>
          <h3 style={{fontSize:18,marginBottom:10}}>{s.t}</h3>
          <p style={{marginBottom:16}}>{s.d}</p>
          <div style={{fontSize:11,fontWeight:800,color:`var(--${s.c})`,textTransform:'uppercase',letterSpacing:1}}>Explore →</div>
        </Link>
      ))}
    </div>

    {/* ── RESULTS ── */}
    <div className="sec">Client results — by the numbers</div>
    <div className="fw fw-grid g3">
      <div className="cell at-y">
        <div style={{fontSize:9,color:'var(--m)',letterSpacing:2,textTransform:'uppercase',marginBottom:14}}>Real estate · Dubai</div>
        <h3>Lead response time</h3>
        <div className="met" style={{marginTop:16}}><span className="met-b r">4 hrs</span><span className="met-s">before automation</span></div>
        <div className="met"><span className="met-b y">18 min</span><span className="met-s">after our system went live</span></div>
        <p style={{marginTop:14}}>Leads from Bayut, PropertyFinder, and web forms all captured, scored, and followed up without a human touching anything.</p>
      </div>
      <div className="cell at-c">
        <div style={{fontSize:9,color:'var(--m)',letterSpacing:2,textTransform:'uppercase',marginBottom:14}}>Professional services</div>
        <h3>Admin hours returned</h3>
        <div className="met" style={{marginTop:16}}><span className="met-b c">60%</span><span className="met-s">reduction in manual tasks</span></div>
        <div className="met"><span className="met-b y">38 hrs</span><span className="met-s">per week, team of 12</span></div>
        <p style={{marginTop:14}}>Copy-paste, manual reporting, and status updates — all automated. Team redirected to billable work within 30 days.</p>
      </div>
      <div className="cell at-p">
        <div style={{fontSize:9,color:'var(--m)',letterSpacing:2,textTransform:'uppercase',marginBottom:14}}>Brokerage revenue audit</div>
        <h3>Revenue recovered</h3>
        <div className="met" style={{marginTop:16}}><span className="met-b p">AED 18K</span><span className="met-s">per month, recovered avg</span></div>
        <div className="met"><span className="met-b y">AED 2.3M</span><span className="met-s">total leakage identified</span></div>
        <p style={{marginTop:14}}>Lost leads, slow follow-up, missed upsells — diagnosed and quantified in under 3 minutes using our free tool.</p>
      </div>
    </div>

    {/* ── GROWTH CHART ── */}
    <div style={{background:'#07070f',borderTop:'1px solid #12122a',borderBottom:'1px solid #12122a'}}>
      <div className="sec" style={{borderTop:'none'}}>Estimate your automation ROI</div>
      <div className="fw fw-grid g1" style={{borderTop:'none',borderBottom:'none'}}>
        <div className="cell pad-lg">
          <GrowthChart />
        </div>
      </div>
    </div>

    {/* ── HOW WE WORK ── */}
    <div className="sec">How we work</div>
    <div className="fw fw-grid g2">
      <div className="cell pad-lg">
        <h3>From first call to live system — in weeks, not months</h3>
        <p>We work in tight, outcome-focused sprints with fixed-price proposals and clear deliverables at each step. No bloated retainers. No surprises.</p>
        <div style={{marginTop:28}}>
          <Link href="/contact" className="btn btn-y">Start a project →</Link>
        </div>
      </div>
      <div className="cell"><Stepper steps={PROCESS_STEPS} color="y" /></div>
    </div>

    {/* ── PORTFOLIO ── */}
    <div className="sec">Portfolio</div>
    <div className="fw fw-grid g3" data-section="portfolio">
      {[
        {tc:'y',cat:'Travel · CRM · Automation',t:'Cocktail Holidays',d:'Full digital transformation — booking automation, CRM, RPA. Scaled to $7M revenue. Exit achieved.',img:'IMG-01'},
        {tc:'c',cat:'Agriculture · IoT · Portal',t:'Agri Novatex',d:'Distributor portals, HubSpot implementation, API integrations across South Africa and UK.',img:'IMG-02'},
        {tc:'p',cat:'Mobile · iOS · Android',t:'Ranjet',d:'Native iOS and Android app, product management, digital strategy for a high-growth startup.',img:'IMG-03'},
      ].map(p=>(
        <div className={`cell at-${p.tc}`} key={p.t}>
          <ImgPh label={p.img} desc={`${p.t} screenshot`} h={240} src={`/Images/${p.img}.png`} />
          <div style={{marginTop:20}}>
            <div style={{fontSize:9,color:'var(--m)',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>{p.cat}</div>
            <h3>{p.t}</h3>
            <p style={{marginBottom:16}}>{p.d}</p>
            <Link href="/portfolio" style={{fontSize:11,fontWeight:800,color:`var(--${p.tc})`,textDecoration:'none',textTransform:'uppercase',letterSpacing:1}}>View case →</Link>
          </div>
        </div>
      ))}
    </div>

    {/* ── TESTIMONIALS ── */}
    <div className="sec">What clients say</div>
    <div className="fw fw-grid g3">
      {[
        {q:'We cooperated with Tergo Media since 2019 on digital transformation, software development and RPA. Always on time and optimised budget.',who:'Fausto Migliori',role:'Future Days · Milano',tc:'y'},
        {q:'The automation they built handles 80% of our lead follow-up without anyone touching it. Response times went from hours to under a minute.',who:'Senior Partner',role:'Dubai real estate brokerage',tc:'c'},
        {q:'We went from 6-hour manual reports to automated dashboards in two weeks. The team is sharp, fast, and they genuinely understand the business.',who:'Operations Director',role:'European travel operator',tc:'p'},
      ].map(t=>(
        <div className={`cell at-${t.tc} pad-lg`} key={t.who}>
          <span className="pull-quote-mark" style={{color:`var(--${t.tc})`}}>&ldquo;</span>
          <p className="pull-quote-text">{t.q}</p>
          <div style={{borderTop:'1px solid var(--b)',paddingTop:16}}>
            <div style={{fontSize:13,fontWeight:800,color:'#fff'}}>{t.who}</div>
            <div style={{fontSize:12,color:'var(--m)',marginTop:4}}>{t.role}</div>
          </div>
        </div>
      ))}
    </div>

    {/* ── CO-FOUNDERS ── */}
    <div className="sec">The team behind it</div>
    <div className="fw fw-grid g2">
      <div className="cell pad-lg">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <ImgPh label="IMG-04" desc="Francesco Terragni" h={360} src="/Images/IMG-04.png" />
          <ImgPh label="IMG-19" desc="Maria — CEO" h={360} src="/Images/IMG-19.png" />
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:8}}>
          <div style={{padding:'10px 12px',background:'#111',border:'1px solid #1e1e1e',fontSize:12,color:'#888'}}>
            <div style={{fontSize:11,fontWeight:800,color:'#fff',marginBottom:2}}>Francesco Terragni</div>
            Co-founder · Product · CTO
          </div>
          <div style={{padding:'10px 12px',background:'#111',border:'1px solid #1e1e1e',fontSize:12,color:'#888'}}>
            <div style={{fontSize:11,fontWeight:800,color:'#fff',marginBottom:2}}>Maria — CEO</div>
            Business development · GCC
          </div>
        </div>
      </div>
      <div className="cell pad-lg" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div className="eyebrow y">Built by operators</div>
        <h2 style={{marginBottom:20}}>We&apos;ve built and exited products.<br/>We know what shipping means.</h2>
        <p style={{marginBottom:16}}>Tergo Media is co-founded by <strong>Francesco Terragni</strong> — product leader, engineer, and CTO — and <strong>Maria</strong>, CEO, who leads business development and client strategy across the GCC. Francesco previously built and scaled Skipodium to $7M revenue before exit at KAYAK.</p>
        <p style={{marginBottom:24}}>Between the two of us: 20+ years of product, engineering, and growth across Europe and the Middle East. We don&apos;t just consult — we&apos;ve done it ourselves.</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <span className="tag y">Francesco Terragni</span>
          <span className="tag y">Product · CTO · Engineering</span>
          <span className="tag c">Maria — CEO</span>
          <span className="tag c">Business development · GCC</span>
        </div>
      </div>
    </div>

    <CtaBar h="Ready to build something that actually works?" sub="Book a free 30-minute discovery call. No pitch, no commitment — just clarity on what's possible." />
    <Ticker items={[{text:'AI Automation',color:'y'},{text:'Custom Dev',color:'c'},{text:'CTO Advisory',color:'p'},{text:'Real Estate',color:'y'},{text:'Travel',color:'c'},{text:'Agriculture',color:'p'},{text:'Professional Services',color:'r'},{text:'PHP · Python · Node.js · React'}]} />
  </>);
}
