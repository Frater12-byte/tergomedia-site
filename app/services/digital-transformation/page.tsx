import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Stepper, CtaBar } from '@/components/Graphics';
export const metadata: Metadata = { title: 'Digital Transformation' };
export default function DigitalTransformation() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner">
      <div>
        <div className="eyebrow r">Digital Transformation</div>
        <h1>Modernise<br/>your business.<br/>From the<br/><em className="r">inside out</em>.</h1>
        <p className="hero-desc">We audit your operations, map your inefficiencies, and implement the <strong>systems, tools, and workflows</strong> that bring your business into the modern era.</p>
        <div className="btn-row"><Link href="/contact" className="btn btn-r">Book a discovery call →</Link></div>
      </div>
      <div><Calculator labelA="Hours saved / month" labelB="Value recovered" prefixB="AED " sl1Label="Team size" sl1Min={2} sl1Max={60} sl1Val={12} sl2Label="Admin hrs / day" sl2Min={1} sl2Max={6} sl2Val={3} formulaA={(s1,s2)=>s1*s2*0.65*22} formulaB={(s1,s2)=>s1*s2*0.65*22*300} /></div>
    </div>
  </div>
  <div className="stats-fw fw-grid g4">
    {[['68%','of business processes can be fully automated','r'],['3.2 hrs','lost per person daily to manual tasks','y'],['6–8×','average ROI on transformation investment','c'],['90 days','typical time to measurable results','p']].map(([n,l,c])=>(<div className="stat" key={n}><div className={`stat-n ${c}`}>{n}</div><div className="stat-l">{l}</div></div>))}
  </div>
  <div className="sec">What we audit & transform</div>
  <div className="fw fw-grid g2">
    {[{n:"01",t:"Operations & processes",d:"We map every manual process — from lead handling to invoicing — and redesign them with automation and modern tools.",tc:"r"},{n:"02",t:"Revenue model & systems",d:"Identify where revenue leaks. Underused pricing, missed upsells, poor lead conversion — we diagnose and fix each one.",tc:"y"},{n:"03",t:"Tools & tech stack",d:"Audit your current tools for overlap, waste, and gaps. We recommend a leaner stack that costs less and does more.",tc:"c"},{n:"04",t:"Team & culture",d:"Digital transformation only sticks if the team is on board. We run workshops, change management sessions, and training.",tc:"p"}].map(s=>(<div className={`cell at-${s.tc} pad-lg`} key={s.n}><div className="num">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p></div>))}
  </div>
  <div className="sec">Our transformation process</div>
  <div className="fw fw-grid g2">
    <div className="cell pad-lg"><h3>Structured. Measurable. No disruption to live operations.</h3><p>Every transformation starts with a thorough audit. We build a full picture before recommending anything. Then we implement in phases — each with clear KPIs.</p></div>
    <div className="cell"><Stepper steps={[{title:"Audit",desc:"Full business audit — processes, tools, team interviews, data review. We map the as-is state comprehensively.",time:"2–3 weeks"},{title:"Diagnose",desc:"We identify the top opportunities, quantify the impact, and prioritise by ease and value.",time:"1 week"},{title:"Roadmap",desc:"We design the to-be state and deliver a phased transformation roadmap with clear KPIs for each phase.",time:"1 week"},{title:"Implement",desc:"We execute phase by phase, measuring against KPIs at each milestone before moving to the next.",time:"Ongoing"}]} color="r" /></div>
  </div>
  <CtaBar h="Ready to modernise your business?" sub="Start with a free 30-minute discovery call. We'll identify your biggest opportunity before the end of the call." />
</>); }
