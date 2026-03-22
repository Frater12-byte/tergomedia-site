import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = { title: 'About' };
export default function About() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner">
      <div>
        <div className="eyebrow y">About</div>
        <h1>Built by<br/>operators,<br/>for <em className="y">operators</em>.</h1>
        <p className="hero-desc">We&apos;ve <strong>built and run our own products</strong>, scaled a company to $7M and exited, and worked inside companies like KAYAK. We know what it means to ship under pressure.</p>
        <div className="btn-row"><Link href="/contact" className="btn btn-y">Work with us →</Link></div>
      </div>
      <ImgPh label="IMG-04" desc="Francesco — founder headshot" h={340} />
    </div>
  </div>
  <div className="sec">The team</div>
  <div className="fw fw-grid g2">
    <div className="cell at-y pad-lg">
      <div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Founder & CEO</div>
      <h3>Francesco</h3>
      <p style={{marginBottom:14}}>10+ years in product management, CTO roles, growth strategy, and full-stack development. Founded Skipodium (scaled to $7M, exited), built HayGuard, authored "The Practical Investor."</p>
      <p>Previous: KAYAK, Cocktail Holidays, Ryte. Based in Dubai, with teams in Bucharest and Milano.</p>
      <div style={{marginTop:16}}><span className="tag y">Product Management</span><span className="tag y">CTO</span><span className="tag y">Full-stack Dev</span><span className="tag y">Growth Strategy</span></div>
    </div>
    <div className="cell pad-lg">
      <div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Development team · Bucharest</div>
      <h3>Engineering</h3>
      <p style={{marginBottom:14}}>Our core engineering team is based in Bucharest — senior developers in React, Node.js, Python, PHP, iOS, and Android. Fast, rigorous, battle-tested on real production systems.</p>
      <ImgPh label="IMG-15" desc="Team photo — Bucharest office" h={160} />
    </div>
  </div>
  <div className="sec">Our offices</div>
  <div className="fw fw-grid g3">
    {[{tc:"y",role:"Headquarters",city:"Dubai, UAE",desc:"Primary base. Serving the GCC market — real estate, finance, travel, and professional services.",img:"IMG-16",imgDesc:"Dubai skyline"},{tc:"c",role:"Engineering hub",city:"Bucharest, Romania",desc:"Core engineering team. Registered as Tergo Invest S.R.L. — all development operations run from here.",img:"IMG-17",imgDesc:"Bucharest city"},{tc:"p",role:"Partner office",city:"Milano, Italy",desc:"European client base. Partnerships with Future Days and Ennea Capital.",img:"IMG-18",imgDesc:"Milano city"}].map(o=>(<div className={`cell at-${o.tc}`} key={o.city}><ImgPh label={o.img} desc={o.imgDesc} h={180} /><div style={{marginTop:16}}><div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:"uppercase",color:`var(--${o.tc})`,marginBottom:6}}>{o.role}</div><h4>{o.city}</h4><p>{o.desc}</p></div></div>))}
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
