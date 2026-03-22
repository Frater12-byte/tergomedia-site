import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = {
  title: 'About Tergo Media — Dubai AI & Software Agency | Francesco Terragni & Maria',
  description: 'Tergo Media is a Dubai-based AI, automation and custom software agency. Founded by Francesco Terragni and Maria. Offices in Dubai, Bucharest, and Milano.',
  alternates: { canonical: 'https://tergomedia.com/about' },
};
export default function About() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner">
      <div>
        <div className="eyebrow y">About</div>
        <h1>Built by<br/>operators,<br/>for <em className="y">operators</em>.</h1>
        <p className="hero-desc">We&apos;ve <strong>built and run our own products</strong>, scaled a company to $7M and exited, and worked inside companies like KAYAK. We know what it means to ship under pressure.</p>
        <div className="btn-row"><Link href="/contact" className="btn btn-y">Work with us →</Link></div>
      </div>
      <ImgPh label="IMG-04" desc="Francesco — founder headshot" h={340} src="/Images/IMG-04.png" />
    </div>
  </div>
  <div className="sec">The team</div>
  <div className="fw fw-grid g3">
    <div className="cell at-y pad-lg">
      <ImgPh label="IMG-04" desc="Francesco Terragni" h={280} src="/Images/IMG-04.png" />
      <div style={{marginTop:16}}>
        <div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Co-founder · CTO</div>
        <h3 style={{marginBottom:10}}>Francesco Terragni</h3>
        <p style={{marginBottom:14}}>Builds technology companies from the ground up — product, teams, architecture, and the culture that makes them last. 10+ years spanning CTO roles, co-founded startups (one exited), and hands-on engineering in JavaScript, Node.js, Python &amp; React.</p>
        <p>Scaled distributed engineering teams across Europe and the GCC. Shipped AI automation pipelines, IoT systems, and SaaS platforms across travel tech, real estate, agriculture, and finance. Previously at KAYAK.</p>
        <div style={{marginTop:16}}><span className="tag y">Co-founder & CTO</span><span className="tag y">Node.js · Python · React</span><span className="tag y">AI Automation</span><span className="tag y">SaaS</span></div>
      </div>
    </div>
    <div className="cell at-c pad-lg">
      <ImgPh label="IMG-19" desc="Maria Terragni — CEO" h={280} src="/Images/IMG-19.png" />
      <div style={{marginTop:16}}>
        <div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>CEO · Operations & Strategy</div>
        <h3 style={{marginBottom:10}}>Maria Terragni</h3>
        <p style={{marginBottom:14}}>Operations and business transformation professional with 12+ years in the travel and tour operator industry. Combines a strong B2B marketing background with operational strategy and process optimisation.</p>
        <p>Experienced in improving organisational structures, implementing reporting systems, coordinating ERP development, and supporting talent acquisition during periods of growth and change. Focused on operational efficiency, cost reduction, and enabling data-driven decisions.</p>
        <div style={{marginTop:16}}><span className="tag c">CEO</span><span className="tag c">Operations</span><span className="tag c">Business Transformation</span><span className="tag c">Travel industry</span></div>
      </div>
    </div>
    <div className="cell pad-lg">
      <div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Development team · Bucharest</div>
      <h3>Engineering</h3>
      <p style={{marginBottom:14}}>Our core engineering team is based in Bucharest — senior developers in React, Node.js, Python, PHP, iOS, and Android. Fast, rigorous, battle-tested on real production systems.</p>
      <ImgPh label="IMG-15" desc="Team photo — Bucharest office" h={160} src="/Images/IMG-15.png" />
    </div>
  </div>
  <div className="sec">Our offices</div>
  <div className="fw fw-grid g3">
    {[{tc:"y",role:"Headquarters",city:"Dubai, UAE",desc:"Primary base. Serving the GCC market — real estate, finance, travel, and professional services.",img:"IMG-16",imgDesc:"Dubai skyline"},{tc:"c",role:"Engineering hub",city:"Bucharest, Romania",desc:"Core engineering team. Registered as Tergo Invest S.R.L. — all development operations run from here.",img:"IMG-17",imgDesc:"Bucharest city"},{tc:"p",role:"Partner office",city:"Milano, Italy",desc:"European client base. Partnerships with Future Days and Ennea Capital.",img:"IMG-18",imgDesc:"Milano city"}].map(o=>(<div className={`cell at-${o.tc}`} key={o.city}><ImgPh label={o.img} desc={o.imgDesc} h={180} src={`/Images/${o.img}.png`} /><div style={{marginTop:16}}><div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:"uppercase",color:`var(--${o.tc})`,marginBottom:6}}>{o.role}</div><h4>{o.city}</h4><p>{o.desc}</p></div></div>))}
  </div>
  <div className="sec">Track record</div>
  <div className="fw fw-grid g1">
    <div className="cell pad-lg">
      <div style={{display:'flex',flexDirection:'column',gap:0}}>
        {[
          {y:'2015',t:'Started as a digital consultant in Europe',c:'m'},
          {y:'2017',t:'Joined KAYAK as product manager',c:'y'},
          {y:'2019',t:'Founded Skipodium — ski sports marketplace',c:'c'},
          {y:'2021',t:'Scaled Skipodium to $7M revenue — exit achieved',c:'y'},
          {y:'2022',t:'Built HayGuard farm monitoring platform',c:'c'},
          {y:'2023',t:'Tergo Media established formally — Dubai office opened',c:'y'},
          {y:'2024',t:'Brokerage Revenue Analyzer launched — 40+ Dubai brokerages using it',c:'c'},
          {y:'2025',t:'SaaS Stack Auditor launched, Milano and Bucharest offices active',c:'p'},
        ].map((e,i)=>(
          <div key={e.y} style={{display:'flex',gap:24,paddingBottom:i<7?24:0,marginBottom:i<7?24:0,borderBottom:i<7?'1px solid var(--b)':'none'}}>
            <div style={{fontSize:13,fontWeight:900,color:`var(--${e.c})`,minWidth:40,paddingTop:2}}>{e.y}</div>
            <div style={{fontSize:14,color:'var(--l)',lineHeight:1.65}}>{e.t}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
  <div className="sec">Referral programme</div>
  <div className="fw fw-grid g2">
    <div className="cell at-y pad-lg">
      <h3>Recommend us. Get paid.</h3>
      <p style={{marginBottom:14}}>Know someone who needs what we do? Make the introduction and earn a cash commission or discount on your next project.</p>
      <div className="met"><span className="met-b y">5%</span><span className="met-s">cash commission on every contract secured</span></div>
      <div className="met"><span className="met-b c">10%</span><span className="met-s">discount on your next project with us</span></div>
      <div style={{marginTop:20}}><Link href="/contact" className="btn btn-y">Make an introduction →</Link></div>
    </div>
    <div className="cell pad-lg">
      <div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Strategic partners</div>
      <h4>Future Days · Milano</h4>
      <p style={{marginBottom:18}}>Creative agency partners. We handle the development and automation layer for their client projects.</p>
      <h4>Ennea Capital Partners</h4>
      <p>Venture and growth capital. We advise on portfolio company technical due diligence and digital transformation.</p>
    </div>
  </div>
  <CtaBar h="Want to work with us?" sub="Book a free 30-minute call. We'll understand your situation and tell you honestly what we can do for you." />
</>); }
