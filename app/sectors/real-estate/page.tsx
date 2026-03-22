import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowGraphic, CtaBar } from '@/components/Graphics';
import RealEstateCalc from './RealEstateCalc';
export const metadata: Metadata = {
  title: 'AI & Automation for Dubai Real Estate Brokerages | Tergo Media',
  description: 'WhatsApp chatbots, lead automation, CRM sync, and performance dashboards built specifically for Dubai brokerages.',
  alternates: { canonical: 'https://tergomedia.com/sectors/real-estate' },
};
export default function RealEstate() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner">
      <div>
        <div className="eyebrow y">Real estate · Dubai</div>
        <h1>We build the<br/>tech that<br/><em className="y">closes</em><br/>more deals.</h1>
        <p className="hero-desc">The brokerages winning in Dubai today are not the biggest — they are the ones <strong>doing more with less.</strong> Automating pipelines, responding in seconds, not hours.</p>
        <div className="btn-row"><Link href="/contact" className="btn btn-y">Book a free audit →</Link><a href="https://analyzer.tergomedia.com" className="btn btn-outline" target="_blank" rel="noreferrer">Try the Revenue Analyzer</a></div>
      </div>
      <div><FlowGraphic nodes={[{text:"Lead from Bayut / web form",status:"Trigger"},{text:"AI qualifies in 10 seconds",status:"Running"},{text:"WhatsApp sent instantly",status:"Queued"},{text:"Agent notified with brief",status:"Queued"},{text:"CRM & pipeline updated",status:"Queued"}]} title="Dubai brokerage lead flow" resultLabel="Avg. response time" resultText="18 minutes → under 90 seconds" /></div>
    </div>
  </div>
  <div className="stats-fw fw-grid g5s">
    {[["68%","of leads go cold in under 1 hour","y"],["4 hrs","lost daily per agent to manual admin","c"],["1 in 3","deals lost to slow or missed follow-up","y"],["90 sec","avg response time with our systems","p"],["2 wks","average setup time for CRM automation","c"]].map(([n,l,c])=>(<div className="stat" key={n}><div className={`stat-n ${c}`}>{n}</div><div className="stat-l">{l}</div></div>))}
  </div>
  <div className="sec">What we build for brokerages</div>
  <div className="fw fw-grid g4">
    {[{n:"01",t:"WhatsApp chatbot & listings bot",d:"Answers queries, quotes prices, books viewings 24/7 — directly from your Bayut & PropertyFinder feed.",tag:"Live in 2 weeks"},{n:"02",t:"Automated lead follow-up",d:"Instant WhatsApp the moment a lead comes in. Email sequences at day 1, 3, 7. Agents only step in when someone replies.",tag:"Live in 2 weeks"},{n:"03",t:"AI document generator",d:"Fill one form — get a fully formatted MOU, offer letter, or tenancy contract PDF in 10 seconds.",tag:"Live in 3–4 weeks"},{n:"04",t:"Brokerage performance dashboard",d:"Live pipeline in AED, per-agent conversion, portal ROI — on your phone, real time, no spreadsheets.",tag:"Real-time · Mobile"}].map(s=>(<div className="cell at-y" key={s.n}><div className="num">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p><span className="tag y">{s.tag}</span></div>))}
  </div>
  <div className="sec">Free tool — try it now</div>
  <div className="fw fw-grid g2">
    <div className="cell at-y pad-lg"><span className="tag y" style={{marginBottom:14,display:"inline-block"}}>Live tool · Free · No sign-up</span><h3>Brokerage Revenue Analyzer</h3><p style={{marginBottom:16}}>Answer 9 questions about your brokerage. Get a precise <strong>AED revenue leakage figure</strong> and an AI-written diagnosis — in under 3 minutes.</p><a className="btn btn-y" href="https://analyzer.tergomedia.com" target="_blank" rel="noreferrer">Launch the analyzer →</a></div>
    <div className="cell"><RealEstateCalc /></div>
  </div>
  <div className="sec">Case studies</div>
  <div className="fw fw-grid g3">
    {[{tc:"y",lbl:"Case study · CRM Automation",t:"Lead pipeline in 12 days",mets:[{b:"18 min",bc:"y",s:"avg lead response",was:"was 4+ hours"},{b:"47%",bc:"c",s:"lead-to-viewing rate",was:"was 12%"}],q:"We used to lose leads before we even knew they existed. Now every inquiry gets a response in minutes."},{tc:"c",lbl:"Case study · WhatsApp Bot",t:"Viewings on autopilot",mets:[{b:"60%",bc:"c",s:"bookings without agent input",was:""},{b:"4.8★",bc:"p",s:"client satisfaction from week one",was:""}],q:"The bot handles everything until someone is ready to sign. Our agents only talk to serious buyers now."},{tc:"y",lbl:"Case study · Analytics",t:"22% revenue growth in Q1",mets:[{b:"AED 18K",bc:"y",s:"saved monthly on wasted ad spend",was:""},{b:"+30%",bc:"c",s:"top-agent productivity after dashboards went live",was:""}],q:"We finally know which agents and areas to double down on. This paid for itself in the first month."}].map(cs=>(<div className={`cell at-${cs.tc}`} key={cs.t}><div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>{cs.lbl}</div><h3>{cs.t}</h3>{cs.mets.map((m,i)=>(<div key={i} className="met"><span className={`met-b ${m.bc}`}>{m.b}</span><span className="met-s">{m.s}{m.was&&<span className="met-was">{m.was}</span>}</span></div>))}<blockquote>{cs.q}</blockquote></div>))}
  </div>
  <CtaBar h="What could your brokerage look like in 90 days?" sub="Book a free 30-minute discovery call. No commitment — just a clear picture of what is possible." />
</>); }
