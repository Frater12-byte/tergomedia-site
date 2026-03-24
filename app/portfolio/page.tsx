import type { Metadata } from 'next';
import { CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = {
  title: 'Our Work — Automation, SaaS & Digital Transformation Projects | Tergo Media',
  description: 'Case studies from Tergo Media — booking automation, IoT platforms, mobile apps, CRM integration, and digital transformation across travel, agriculture, and real estate.',
  alternates: { canonical: 'https://www.tergomedia.com/portfolio' },
};
export default function Portfolio() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner hero-only">
      <div className="eyebrow y">Portfolio</div>
      <h1>Real products.<br/>Real results.<br/><em className="y">Measurable</em> <em className="c">outcomes</em>.</h1>
      <p className="hero-desc" style={{maxWidth:600}}>Every project here is live, in production, and delivering measurable business value. We don&apos;t build MVPs that gather dust.</p>
    </div>
  </div>
  <div className="sec">Case studies</div>
  <div className="fw fw-grid g2">
    {[{tc:"y",cat:"Travel · CRM · Automation · RPA",t:"Cocktail Holidays",d:"Full digital transformation of a UK-based travel operator — booking system, supplier integrations, CRM, marketing automation, RPA, and website. Managed from 0 to exit.",mets:[{b:"$7M",bc:"y",s:"peak revenue before exit"},{b:"3×",bc:"c",s:"bookings handled with same team"},{b:"60%",bc:"y",s:"reduction in manual admin"}],tags:["Product Management","CRM","Automation","RPA","Web Design"],img:"img-01"},{tc:"c",cat:"Agriculture · CRM · Portal · UK & South Africa",t:"Agri Novatex",d:"Distributor portals, HubSpot CRM implementation, API integrations, and digital strategy for an agri business operating across South Africa and the UK.",mets:[{b:"2",bc:"c",s:"market deployments — SA + UK"},{b:"Full",bc:"y",s:"HubSpot implementation and data migration"}],tags:["API Integrations","HubSpot","Distributor Portal","Web Design"],img:"img-02"}].map(p=>(<div className={`cell at-${p.tc} pad-lg`} key={p.t}><ImgPh label={p.img.toUpperCase()} desc={`${p.t} screenshot`} h={260} src={`/Images/${p.img.toUpperCase()}.png`} /><div style={{marginTop:20}}><div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{p.cat}</div><h3>{p.t}</h3><p style={{marginBottom:14}}>{p.d}</p>{p.mets.map((m,i)=>(<div key={i} className="met"><span className={`met-b ${m.bc}`}>{m.b}</span><span className="met-s">{m.s}</span></div>))}<div style={{marginTop:14}}>{p.tags.map(t=><span key={t} className={`tag ${p.tc}`}>{t}</span>)}</div></div></div>))}
  </div>
  <div className="fw fw-grid g2" style={{borderTop:"none"}}>
    {[{tc:"p",cat:"Mobile · iOS · Android · Strategy",t:"Ranjet",d:"Native iOS and Android application for a high-growth startup. Full product management, digital strategy, go-to-market planning, and ongoing development.",mets:[{b:"iOS + Android",bc:"p",s:"native apps built in-house"}],tags:["iOS","Android","Product Management","Digital Strategy"],img:"img-03"},{tc:"y",cat:"Agriculture · IoT · React · Node.js",t:"HayGuard",d:"Farm monitoring system built with React and Node.js. IoT sensor integration, real-time alerts, team management, dashboard analytics.",mets:[{b:"< 30 sec",bc:"y",s:"alert delivery from anomaly"}],tags:["React","Node.js","IoT","Supabase","Vercel"],img:"img-10"}].map(p=>(<div className={`cell at-${p.tc} pad-lg`} key={p.t}><ImgPh label={p.img.toUpperCase()} desc={`${p.t} screenshot`} h={260} src={`/Images/${p.img.toUpperCase()}.png`} /><div style={{marginTop:20}}><div style={{fontSize:9,color:"var(--m)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{p.cat}</div><h3>{p.t}</h3><p style={{marginBottom:14}}>{p.d}</p>{p.mets.map((m,i)=>(<div key={i} className="met"><span className={`met-b ${m.bc}`}>{m.b}</span><span className="met-s">{m.s}</span></div>))}<div style={{marginTop:14}}>{p.tags.map(t=><span key={t} className={`tag ${p.tc}`}>{t}</span>)}</div></div></div>))}
  </div>
  <CtaBar h="Want to see something more relevant?" sub="Book a call. We'll walk you through the work most similar to what you need." />
</>); }
