import type { Metadata } from 'next';
import Link from 'next/link';
import { BeforeAfter, CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = { title: 'CTO Advisory' };
export default function CtoAdvisory() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner">
      <div>
        <div className="eyebrow p">CTO Advisory</div>
        <h1>Senior tech<br/>leadership<br/>without the<br/><em className="p">full-time hire</em>.</h1>
        <p className="hero-desc">A fractional CTO for companies that need <strong>real technical leadership</strong> — architecture, team management, vendor selection, product roadmap — without a €200K salary.</p>
        <div className="btn-row"><Link href="/contact" className="btn btn-p">Book a discovery call →</Link></div>
      </div>
      <div><BeforeAfter bads={["Making tech decisions without technical expertise","Developers running without clear architecture","No one accountable for technical quality and debt","Wasting budget on wrong tools, wrong vendors, wrong hires"]} goods={["Senior CTO-level input on every important technical decision","Clear architecture and engineering standards your team follows","Full technical accountability without full-time cost","Trusted vendor and tool recommendations from 10+ years experience"]} badLabel="Without a CTO" goodLabel="With Tergo advisory" /></div>
    </div>
  </div>
  <div className="sec">What you get</div>
  <div className="fw fw-grid g3">
    {[{n:"01",t:"Architecture & tech strategy",d:"Define your system architecture, choose the right stack, and build a technical roadmap that scales with your business.",tc:"p"},{n:"02",t:"Team leadership & hiring",d:"Lead your dev team, run hiring processes, define engineering standards, and build a culture of delivery.",tc:"y"},{n:"03",t:"Product & roadmap",d:"Translate business goals into a prioritised technical roadmap. Make build vs buy decisions.",tc:"c"},{n:"04",t:"Vendor & tool evaluation",d:"Cut through the noise. Evaluate software vendors, cloud providers, and tech tools — unbiased.",tc:"r"},{n:"05",t:"Technical due diligence",d:"Pre-investment code audits. We assess technical debt, architecture risks, and team capability.",tc:"p"},{n:"06",t:"Crisis & turnaround",d:"Project stalled? Team underperforming? We step in, diagnose fast, and fix what's broken.",tc:"y"}].map(s=>(<div className={`cell at-${s.tc}`} key={s.n}><div className="num">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p></div>))}
  </div>
  <div className="sec">Your advisor</div>
  <div className="fw fw-grid g2">
    <div className="cell pad-lg"><ImgPh label="IMG-04" desc="Francesco — founder headshot" h={280} /></div>
    <div className="cell pad-lg">
      <h3>10+ years building and leading digital products</h3>
      <p style={{marginBottom:14}}>Francesco is a product and operations leader with experience spanning PM, CTO, growth strategy, and full-stack development. Founded Skipodium (scaled to $7M, exited), built HayGuard, authored "The Practical Investor."</p>
      <p>Previous: KAYAK, Cocktail Holidays, Ryte. Based in Dubai, with teams in Bucharest and Milano.</p>
      <div style={{marginTop:20}}>
        <span className="tag p">Product management</span><span className="tag p">CTO · technical leadership</span>
        <span className="tag y">Full-stack development</span><span className="tag y">GCC market</span>
      </div>
    </div>
  </div>
  <CtaBar h="Need technical leadership now?" sub="Book a free 30-minute call. We'll understand your situation and tell you honestly if and how we can help." />
</>); }
