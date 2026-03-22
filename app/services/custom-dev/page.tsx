import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowGraphic, Stepper, CtaBar } from '@/components/Graphics';
export const metadata: Metadata = {
  title: 'Custom Web & Mobile App Development | React, Next.js, PHP, Python | Tergo Media',
  description: 'Custom web apps, mobile apps, and APIs built from scratch. React, Next.js, Node.js, Python, PHP, iOS, Android. Production-grade code shipped in weeks.',
  alternates: { canonical: 'https://tergomedia.com/services/custom-dev' },
};
export default function CustomDev() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner">
      <div>
        <div className="eyebrow c">Custom Development</div>
        <h1>Ship <em className="c">real</em><br/>software.<br/>Not <em className="y">templates</em>.</h1>
        <p className="hero-desc">We design and build <strong>custom web apps, mobile apps, and APIs</strong> from scratch. React, Next.js, Node.js, Python, PHP, native iOS &amp; Android — we own the full stack.</p>
        <div className="btn-row"><Link href="/contact" className="btn btn-c">Start a project →</Link><Link href="/portfolio" className="btn btn-outline">See our work</Link></div>
      </div>
      <div><FlowGraphic color="c" nodes={[{text:'Scope & architecture defined',status:'Week 1'},{text:'UI/UX designed & approved',status:'Week 2'},{text:'Backend APIs built & tested',status:'Weeks 2–3'},{text:"Frontend connected & QA'd",status:'Week 3–4'},{text:'Deployed to production',status:'Week 4–6'}]} title="Typical project timeline" resultLabel="Average delivery" resultText="4–6 weeks from kickoff to production" /></div>
    </div>
  </div>
  <div className="stats-fw fw-grid g4">
    {[['6','languages & frameworks in our core stack','c'],['4–6 wks','average time to production launch','y'],['iOS + Android','native mobile apps built in-house','c'],['100%','code ownership handed over on completion','p']].map(([n,l,c])=>(<div className="stat" key={n}><div className={`stat-n ${c}`}>{n}</div><div className="stat-l">{l}</div></div>))}
  </div>
  <div className="sec">What we build</div>
  <div className="fw fw-grid g3">
    {[{n:'01',t:'Web apps & portals',d:'B2B dashboards, client portals, admin panels. React + Next.js frontend, Node.js or Python backend, PostgreSQL.',tags:['React','Next.js','Node.js'],tc:'c'},{n:'02',t:'E-commerce & marketplaces',d:'Custom e-commerce, booking platforms, marketplace logic. WooCommerce, headless, or fully custom.',tags:['PHP','WooCommerce','Stripe'],tc:'y'},{n:'03',t:'Mobile apps',d:'Native iOS and Android. React Native for cross-platform, Swift/Kotlin when native performance matters.',tags:['iOS · Android','React Native'],tc:'c'},{n:'04',t:'APIs & backend systems',d:'RESTful APIs, GraphQL, microservices, webhooks. Python FastAPI, Node Express, PHP Laravel.',tags:['Python','PHP Laravel','Node.js'],tc:'p'},{n:'05',t:'AI-powered apps',d:'Applications with AI baked in — GPT-4o, Claude, embeddings, RAG pipelines. Not wrappers — real products.',tags:['GPT-4o','Claude API','RAG'],tc:'y'},{n:'06',t:'Integrations & data pipelines',d:'Connect any two systems. CRM → ERP, portal → accounting. Python or Node pipelines, built to last.',tags:['APIs','Python','Webhooks'],tc:'r'}].map(s=>(<div className={`cell at-${s.tc}`} key={s.n}><div className="num">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p><div style={{marginTop:10}}>{s.tags.map(t=><span key={t} className={`tag ${s.tc}`}>{t}</span>)}</div></div>))}
  </div>
  <div className="sec">Tech stack — no lock-in</div>
  <div className="fw fw-grid g6">
    {[['Frontend','React\nNext.js\nTypeScript\nTailwind'],['Backend','Node.js\nPython\nPHP / Laravel\nFastAPI'],['Mobile','React Native\nSwift\nKotlin\nExpo'],['Data','PostgreSQL\nSupabase\nMongoDB\nRedis'],['AI','OpenAI\nAnthropic\nLangChain\nPinecone'],['Deploy','Vercel\nAWS\nDocker\ncPanel / VPS']].map(([title,items])=>(<div className="cell pad-sm" key={title}><div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:'var(--m)',marginBottom:10,paddingBottom:8,borderBottom:'1px solid var(--b)'}}>{title}</div><div style={{fontSize:11,color:'var(--l)',lineHeight:1.8}}>{items.split('\n').map((i:string,idx:number)=><div key={idx}>{i}</div>)}</div></div>))}
  </div>
  <div className="sec">Recent builds</div>
  <div className="fw fw-grid g2">
    {[
      {n:'01',tc:'y',t:'Brokerage Revenue Analyzer',d:'Next.js + AI. Built in 3 weeks. 40+ Dubai brokerages using it. Zero backend maintenance.',tags:['Next.js','OpenAI','Vercel']},
      {n:'02',tc:'c',t:'SaaS Stack Auditor',d:'AI-powered audit tool on Vercel serverless. Handles 100+ submissions/day with zero infra management.',tags:['Next.js','Claude API','Serverless']},
      {n:'03',tc:'p',t:'Farm monitoring system (HayGuard)',d:'React + Node.js + IoT. Real-time sensor data, automated alert system. Under 30 second alert delivery.',tags:['React','Node.js','IoT']},
      {n:'04',tc:'r',t:'Invoice management system',d:'Multi-currency (EUR/USD/AED/RON), recurring billing, analytics. Runs Tergo Media\'s own agency operations.',tags:['Next.js','PostgreSQL','Stripe']},
    ].map(s=>(
      <div className={`cell at-${s.tc}`} key={s.n}>
        <div className="num">{s.n}</div>
        <h3>{s.t}</h3><p>{s.d}</p>
        <div style={{marginTop:10}}>{s.tags.map(t=><span key={t} className={`tag ${s.tc}`}>{t}</span>)}</div>
      </div>
    ))}
  </div>
  <div className="sec">How we price</div>
  <div className="fw fw-grid g3">
    {[
      {tc:'y',t:'Fixed scope',d:'You know what you want. We define it precisely, price it, and build it. No surprises, no scope creep. Most projects work this way.'},
      {tc:'c',t:'Time & materials',d:'Exploratory or fast-moving projects where scope evolves. Weekly billing, daily visibility on progress. You can stop anytime.'},
      {tc:'p',t:'Retainer',d:'Ongoing development and maintenance. Fixed monthly hours, priority response, no onboarding overhead on new requests.'},
    ].map(p=>(
      <div className={`cell at-${p.tc} pad-lg`} key={p.t}>
        <h3>{p.t}</h3>
        <p style={{marginTop:10}}>{p.d}</p>
      </div>
    ))}
  </div>
  <CtaBar h="Have a product idea?" sub="Tell us what you want to build. We'll scope it, price it, and ship it." />
</>); }
