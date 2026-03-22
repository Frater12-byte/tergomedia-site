import type { Metadata } from 'next';
import Link from 'next/link';
import { BeforeAfter, Stepper, CtaBar, PROCESS_STEPS } from '@/components/Graphics';
export const metadata: Metadata = { title: 'Services' };
export default function Services() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner">
      <div>
        <div className="eyebrow y">Services</div>
        <h1>Everything<br/>you need to<br/><em className="y">move faster</em>.</h1>
        <p className="hero-desc">Four service lines, one team. We scope, build, and own it end-to-end.</p>
        <div className="btn-row"><Link href="/contact" className="btn btn-y">Book a call →</Link></div>
      </div>
      <div><BeforeAfter bads={["Slow response times losing clients","Hours wasted on manual reports","Disconnected systems forcing staff to copy-paste data","Generic agency with no sector knowledge"]} goods={["Instant automated follow-up across WhatsApp, email, CRM","Self-generating reports delivered on schedule","Fully integrated stack — everything talks to everything","Deep sector experience in real estate, travel, agri, finance"]} /></div>
    </div>
  </div>
  <div className="sec">Service lines</div>
  <div className="fw fw-grid g2">
    {[{n:"01",t:"AI & Automation",d:"Lead capture, document processing, AI agents, reporting dashboards, approval workflows, system integrations.",tags:["n8n · Make · Zapier","GPT-4o · Claude","WhatsApp · Email"],tc:"y",href:"/services/ai-automation"},{n:"02",t:"Custom Web & Mobile Apps",d:"React, Next.js, Node.js, Python, PHP, iOS, Android. Production-grade code shipped in weeks not months.",tags:["React · Next.js","Python · PHP","Node.js","iOS · Android"],tc:"c",href:"/services/custom-dev"},{n:"03",t:"CTO Advisory",d:"Fractional CTO for companies that need senior technical leadership. Architecture, team, vendor evaluation, product roadmap.",tags:["Tech strategy","Architecture","Team management"],tc:"p",href:"/services/cto-advisory"},{n:"04",t:"Digital Transformation",d:"Full-scope digital audits. We map your operations and implement the systems and workflows to modernise your business.",tags:["Digital audit","Process redesign","Change management"],tc:"r",href:"/services/digital-transformation"}].map(s=>(<Link href={s.href} className={`cell at-${s.tc} pad-lg`} key={s.n} style={{display:"block",textDecoration:"none"}}><div className="num">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p><div style={{marginTop:12}}>{s.tags.map(t=><span key={t} className={`tag ${s.tc}`}>{t}</span>)}</div><div style={{marginTop:18,fontSize:12,fontWeight:800,color:`var(--${s.tc})`,textTransform:"uppercase",letterSpacing:1}}>Full service page →</div></Link>))}
  </div>
  <div className="sec">How every project runs</div>
  <div className="fw fw-grid g2">
    <div className="cell pad-lg"><h3>The same four-step process — every time</h3><p style={{marginBottom:14}}>Clear phases. Fixed prices. Defined deliverables at each step.</p><p><strong>No retainers by default.</strong> We scope fixed deliverables unless you specifically want ongoing support. All code and systems are handed over at project end. 30-day post-launch support included on every project.</p></div>
    <div className="cell"><Stepper steps={PROCESS_STEPS} color="y" /></div>
  </div>
  <CtaBar h="Not sure which service you need?" sub="Book a free 30-min call. We'll listen, ask the right questions, and tell you exactly what will move the needle." />
</>); }
