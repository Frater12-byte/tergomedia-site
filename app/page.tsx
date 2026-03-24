import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowGraphic, Stepper, CtaBar, Ticker, ImgPh, PROCESS_STEPS } from '@/components/Graphics';
import ROICalculator from '@/components/ROICalculator';
import OfficesMap from '@/components/OfficesMap';
import PortfolioCarousel from '@/components/PortfolioCarousel';

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
              <Link href="/portfolio" className="btn btn-outline">See our work →</Link>
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
        ['$7M+','revenue generated across client projects','p'],
      ].map(([n,l,c])=>(
        <div className="stat" key={n}>
          <div className={`stat-n ${c}`}>{n}</div>
          <div className="stat-l">{l}</div>
        </div>
      ))}
    </div>

    {/* ── OFFICE MAP ── */}
    <OfficesMap />

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
    <div className="fw fw-grid g3 sectors-grid">
      {[
        {c:'y',label:'Real estate',t:'Brokerages & developers',d:'Lead routing, CRM automation, AI follow-up, and document processing — from first enquiry to signed contract.',href:'/sectors/real-estate'},
        {c:'c',label:'Travel & hospitality',t:'Tour operators & hotels',d:'Booking automation, AI itinerary generation, agency back-office workflows, and supplier integrations — built for tour operators and travel agencies that need their systems to talk to each other.',href:'/sectors/travel-hospitality'},
        {c:'p',label:'Agriculture',t:'Agri businesses & distributors',d:'IoT sensor monitoring, automated alerts, distributor portals, and inventory tracking — field to office, connected.',href:'/sectors/agriculture'},
        {c:'r',label:'Media & publishing',t:'Agencies & content platforms',d:'Content workflows, asset management, automated distribution, and performance reporting — built for teams that move fast.',href:'/sectors'},
        {c:'y',label:'Professional services',t:'Consultancies & service firms',d:'Invoice automation, KPI dashboards, client onboarding, and reporting — your admin runs itself so your team focuses on delivery.',href:'/sectors/professional-services'},
        {c:'c',label:'E-commerce & retail',t:'Online stores & brands',d:'Order management, returns automation, catalogue sync, and customer communication — at scale, without extra headcount.',href:'/sectors'},
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

    {/* ── ROI CALCULATOR ── */}
    <ROICalculator />

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
    <PortfolioCarousel />

    {/* ── TESTIMONIALS ── */}
    <div className="sec">What clients say</div>
    <div className="reviews-scroll-wrap">
      <div className="reviews-scroll-track">
        {[
          {q:'We cooperated with Tergo Media since 2019 on digital transformation, software development and RPA. Always on time and optimised budget.',who:'Fausto Migliori',role:'Future Days · Milano',tc:'y'},
          {q:'The automation they built handles 80% of our lead follow-up without anyone touching it. Response times went from hours to under a minute.',who:'Senior Partner',role:'Dubai real estate brokerage',tc:'c'},
          {q:'We went from 6-hour manual reports to automated dashboards in two weeks. The team is sharp, fast, and they genuinely understand the business.',who:'Operations Director',role:'European travel operator',tc:'p'},
          {q:'Francesco and his team understood what we needed faster than any agency I\'ve worked with. The result was exactly what we wanted, delivered ahead of schedule.',who:'Founder',role:'UAE-based SaaS startup',tc:'y'},
          {q:'Tergo built our entire operations portal in six weeks. Solid architecture, clean code, and they actually pushed back when our brief had gaps — that\'s rare.',who:'CEO',role:'Agriculture platform · South Africa',tc:'c'},
        ].map(t=>(
          <div className={`review-card at-${t.tc}`} key={t.who}>
            <span className="pull-quote-mark" style={{color:`var(--${t.tc})`,opacity:0.45}}>&ldquo;</span>
            <p className="pull-quote-text" style={{fontWeight:300,fontStyle:'italic',color:'rgba(255,255,255,0.70)'}}>{t.q}</p>
            <div style={{borderTop:'1px solid var(--b)',paddingTop:16,marginTop:'auto'}}>
              <div style={{fontSize:13,fontWeight:500,color:'rgba(255,255,255,0.90)'}}>{t.who}</div>
              <div style={{fontSize:12,fontWeight:400,color:'rgba(255,255,255,0.40)',marginTop:4}}>{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── TEAM ── */}
    <div style={{maxWidth:1100,margin:'0 auto',padding:'56px clamp(24px,5vw,72px) 20px'}}>
      <div style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:10,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--y)',marginBottom:18,fontFamily:"'Exo', sans-serif"}}>
        <span style={{width:18,height:1,background:'var(--y)',display:'inline-block'}}/>
        The team behind it
      </div>
      <h2 style={{fontFamily:"'Exo', sans-serif",fontSize:'clamp(24px,3.5vw,40px)',fontWeight:800,letterSpacing:'-1.2px',lineHeight:1.05,color:'#fff',marginBottom:14}}>
        People who&apos;ve built it,<br/>not just advised on it.
      </h2>
      <p style={{fontFamily:"'Exo', sans-serif",fontSize:15,color:'rgba(255,255,255,0.4)',fontWeight:300,lineHeight:1.75,maxWidth:560,marginBottom:48}}>
        We&apos;ve been inside the companies — running teams, shipping product, and dealing with the same operational messiness our clients face. That&apos;s the difference.
      </p>
    </div>
    <div className="team-cards-grid">
      <style>{`
        .team-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,0.07);max-width:1100px;margin:0 auto clamp(0px,2vw,8px);padding:0 0;width:100%}
        .team-card{background:#111;position:relative;overflow:hidden;transition:transform 0.25s cubic-bezier(0.16,1,0.3,1)}
        .team-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--y);transform:scaleX(0);transform-origin:left;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1)}
        .team-card:hover{transform:translateY(-6px)}
        .team-card:hover::before{transform:scaleX(1)}
        .team-photo-wrap{position:relative;width:220px;height:220px;border-radius:10px;overflow:hidden;background:#0d0d0d}
        .team-photo-wrap img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
        .team-skill-tag{display:inline-block;padding:3px 10px;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.45);font-size:10px;font-weight:400;font-family:'Exo',sans-serif;letter-spacing:0.03em;margin:3px 2px 0}
        .team-li-link{font-size:12px;font-weight:400;font-family:'Exo',sans-serif;color:rgba(255,255,255,0.3);text-decoration:none;letter-spacing:0.03em;transition:color 0.15s}
        .team-li-link:hover{color:var(--y)}
        .team-role-chip{display:inline-block;padding:3px 10px;border:1px solid rgba(242,194,0,0.3);color:var(--y);background:rgba(242,194,0,0.06);font-size:10px;font-weight:600;font-family:'Exo',sans-serif;letter-spacing:0.05em;margin:0 4px 4px 0}
        @media(max-width:768px){
          .team-cards-grid{grid-template-columns:1fr}
          .team-card:hover{transform:none}
          .team-photo-wrap{width:100%;height:320px;border-radius:0}
        }
        @media(prefers-reduced-motion:reduce){.team-card,.team-card::before{transition:none}}
      `}</style>

      {/* Maria — left */}
      <div className="team-card">
        <div className="team-photo-wrap">
          <img src="/Images/IMG-19.png" alt="Maria — CEO" />
        </div>
        <div style={{padding:'24px 28px 28px'}}>
          <div style={{marginBottom:10}}>
            <span className="team-role-chip">CEO</span>
            <span className="team-role-chip">Business Development</span>
            <span className="team-role-chip">GCC</span>
          </div>
          <div style={{fontFamily:"'Exo', sans-serif",fontSize:27,fontWeight:800,letterSpacing:'-0.8px',color:'#fff',lineHeight:1,marginBottom:6}}>Maria</div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',fontFamily:"'Exo', sans-serif",marginBottom:16}}>Commercial leadership · GCC markets</div>
          <p style={{fontSize:14,fontFamily:"'Exo', sans-serif",fontWeight:300,lineHeight:1.8,color:'rgba(255,255,255,0.62)',marginBottom:20}}>
            Maria leads the commercial side of Tergo Media — from business development across the GCC to the operational structure that keeps us delivering at scale. With over a decade in product management, marketing, and international business development, she brings strategic clarity and genuine relationship-building to every client engagement.
          </p>
          <div style={{marginBottom:20,display:'flex',flexWrap:'wrap'}}>
            {['Business Development','Strategic Planning','GCC Markets','Team Leadership','Process Optimisation'].map(t=>(
              <span key={t} className="team-skill-tag">{t}</span>
            ))}
          </div>
          <a href="https://www.linkedin.com/in/maria-terragni/" target="_blank" rel="noreferrer" className="team-li-link">LinkedIn →</a>
        </div>
      </div>

      {/* Francesco — right */}
      <div className="team-card">
        <div className="team-photo-wrap">
          <img src="/Images/IMG-04.png" alt="Francesco — Co-founder & CTO" />
        </div>
        <div style={{padding:'24px 28px 28px'}}>
          <div style={{marginBottom:10}}>
            <span className="team-role-chip">Co-founder</span>
            <span className="team-role-chip">CTO</span>
            <span className="team-role-chip">Full-Stack</span>
          </div>
          <div style={{fontFamily:"'Exo', sans-serif",fontSize:27,fontWeight:800,letterSpacing:'-0.8px',color:'#fff',lineHeight:1,marginBottom:6}}>Francesco</div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',fontFamily:"'Exo', sans-serif",marginBottom:16}}>Technical core · Systems architecture</div>
          <p style={{fontSize:14,fontFamily:"'Exo', sans-serif",fontWeight:300,lineHeight:1.8,color:'rgba(255,255,255,0.62)',marginBottom:20}}>
            Francesco is the technical core of Tergo Media — designing the systems, writing the code, and making sure what we promise actually ships. With 10+ years across CTO roles and hands-on development in JavaScript, Node.js, Python, and React, he covers everything from AI pipelines and IoT platforms to SaaS architecture and automation systems.
          </p>
          <div style={{marginBottom:20,display:'flex',flexWrap:'wrap'}}>
            {['Node.js','React','Python','AI & Automation','System Architecture'].map(t=>(
              <span key={t} className="team-skill-tag">{t}</span>
            ))}
          </div>
          <a href="https://www.linkedin.com/in/francescoterragni/" target="_blank" rel="noreferrer" className="team-li-link">LinkedIn →</a>
        </div>
      </div>
    </div>
    <div style={{maxWidth:1100,margin:'0 auto',padding:'20px clamp(24px,5vw,72px) 56px',textAlign:'center'}}>
      <p style={{fontSize:13,color:'rgba(255,255,255,0.28)',fontFamily:"'Exo', sans-serif",fontWeight:300,fontStyle:'italic'}}>
        Between the two: commercial leadership and deep technical execution — across Europe and the GCC.
      </p>
    </div>

    <CtaBar h="Ready to build something that actually works?" sub="Book a free 30-minute discovery call. No pitch, no commitment — just clarity on what's possible." />
    <Ticker items={[{text:'AI Automation',color:'y'},{text:'Custom Dev',color:'c'},{text:'CTO Advisory',color:'p'},{text:'Real Estate',color:'y'},{text:'Travel',color:'c'},{text:'Agriculture',color:'p'},{text:'Professional Services',color:'r'},{text:'PHP · Python · Node.js · React'}]} />
  </>);
}
