import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowGraphic, BeforeAfter, Stepper, CtaBar, PROCESS_STEPS } from '@/components/Graphics';
import ToolPills from './ToolPills';
export const metadata: Metadata = {
  title: 'AI Automation Services — Lead Capture, Document Processing & AI Agents | Tergo Media',
  description: 'We build AI automation systems using n8n, Make, GPT-4o, and the WhatsApp API. Lead capture, document processing, intelligent routing — all running without manual input.',
  alternates: { canonical: 'https://www.tergomedia.com/services/ai-automation' },
};
export default function AiAutomation() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner">
      <div>
        <div className="eyebrow y">AI & Automation</div>
        <h1>Your business runs 24/7.<br/><em className="c">Your team</em><br/>shouldn&apos;t <em className="y">have to</em>.</h1>
        <p className="hero-desc">We design and build <strong>AI-powered automation systems</strong> that handle repetitive work — so your team can focus on what moves the business forward.</p>
        <div className="btn-row"><Link href="/contact" className="btn btn-y">Book a free audit →</Link><Link href="/tools" className="btn btn-outline">See what we&apos;ve built</Link></div>
      </div>
      <div><FlowGraphic nodes={[{text:'New lead via web form',status:'Trigger'},{text:'AI qualifies & scores lead',status:'Running'},{text:'Route to best-fit agent',status:'Queued'},{text:'WhatsApp + email sent',status:'Queued'},{text:'CRM updated automatically',status:'Queued'}]} title="Live automation — lead capture" resultLabel="Avg. response time" resultText="Under 90 seconds — without a human touching anything" /></div>
    </div>
  </div>
  <div className="stats-fw fw-grid g4">
    {[['3.2 hrs','lost per employee daily to manual tasks','y'],['68%','of repetitive tasks can be fully automated','c'],['6–8×','average ROI on automation investment','y'],['90 sec','avg lead response with our systems','p']].map(([n,l,c])=>(<div className="stat" key={n}><div className={`stat-n ${c}`}>{n}</div><div className="stat-l">{l}</div></div>))}
  </div>
  <div className="sec">The problem</div>
  <div className="fw fw-grid g2">
    <div className="cell pad-lg"><h3>Every business leaks time.<br/><em className="y">Most don&apos;t know where.</em></h3><p>Leads fall through cracks. Staff copy-paste data. Reports take hours. Response times cost you clients. We fix all of it — in weeks, not months.</p></div>
    <div className="cell"><BeforeAfter bads={["Leads fall through cracks while team is in meetings","Staff copy-pasting data between disconnected systems","Reports built manually — hours wasted every week","Slow response times — clients go to a faster competitor","Errors from human data entry, impossible to trace"]} goods={["Every lead captured, scored, and followed up in seconds","Systems sync automatically — zero manual handoffs","Reports generate on schedule, zero effort","Instant responses, 24/7, in any language","Clean, consistent data across every platform"]} /></div>
  </div>
  <div className="sec">What we build</div>
  <div className="fw fw-grid g3">
    {[{n:'01',t:'Lead capture & follow-up',d:'Automatically qualify, route, and follow up with every inbound lead — from web forms, WhatsApp, email, or portals. No lead goes cold.',tags:['CRM sync','WhatsApp API','AI scoring'],tc:'y'},{n:'02',t:'Document & data processing',d:'Extract data from PDFs, contracts, spreadsheets. Validate, transform, and push to any system — zero manual entry, zero errors.',tags:['OCR','AI extraction','API push'],tc:'c'},{n:'03',t:'Reporting & dashboards',d:'KPI reports that build and distribute themselves. Live dashboards pulling from your actual systems — not a spreadsheet updated on Fridays.',tags:['Scheduled','Real-time','Email/Slack'],tc:'y'},{n:'04',t:'AI agents & chatbots',d:'Custom AI assistants trained on your data. Handle client FAQs, booking flows, and lead qualification — in any language, 24/7.',tags:['GPT-4o','Multilingual','Web/WhatsApp'],tc:'p'},{n:'05',t:'Workflow & approval flows',d:'Replace email chains with structured automated flows. Contracts, onboarding, invoice approvals — every step tracked.',tags:['Multi-step','Notifications','Audit trail'],tc:'c'},{n:'06',t:'System integrations',d:'Make your existing tools talk to each other. CRM → accounting → ERP → email — all synced in real time.',tags:['REST APIs','Webhooks','Custom + no-code'],tc:'y'}].map(s=>(<div className="pc-service" key={s.n} style={{borderTop:`2px solid var(--${s.tc})`}}><div className="pc-service-num">{s.n}</div><div className="pc-service-accent" style={{background:`var(--${s.tc})`}} /><div className="pc-service-title">{s.t}</div><div className="pc-service-desc">{s.d}</div><div>{s.tags.map(t=><span key={t} className={`tag ${s.tc}`}>{t}</span>)}</div></div>))}
  </div>
  <div className="sec">How we work</div>
  <div className="fw fw-grid g2">
    <div className="cell pad-lg"><h3>From first call to live system — in weeks, not months</h3><p>Fixed-price proposals. Staging before production. 30-day post-launch support included on every project.</p></div>
    <div className="cell"><Stepper steps={PROCESS_STEPS} color="y" /></div>
  </div>
  <div className="sec">Real examples — what automation looks like in practice</div>
  <div className="fw fw-grid g2">
    {[
      {n:'01',tc:'y',t:'Dubai brokerage',s:'Lead comes in from Bayut at 11pm. WhatsApp sent in 47 seconds. AI scores as high-intent. Agent briefed at 8am with full lead context. Viewing booked before the agent has their morning coffee.'},
      {n:'02',tc:'c',t:'Travel operator',s:'Client submits holiday enquiry. AI generates a personalised 7-day itinerary in 4 minutes. Supplier availability checked automatically. Quote sent. Follow-up sequence starts. Client books.'},
      {n:'03',tc:'p',t:'Professional services firm',s:'Invoice generated automatically when a project milestone is marked complete. Sent to client. Reminder scheduled for day 7 and day 14. Payment recorded. Accountant notified.'},
      {n:'04',tc:'r',t:'E-commerce',s:'Order placed. Warehouse notified. Shipping label generated. Customer SMS sent. Review request scheduled for day 5 post-delivery. All without a human.'},
    ].map(s=>(
      <div className={`cell at-${s.tc}`} key={s.n}>
        <div className="num">{s.n}</div>
        <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:`var(--${s.tc})`,marginBottom:10}}>{s.t}</div>
        <p style={{fontSize:14,color:'var(--l)',lineHeight:1.85,maxWidth:'100%'}}>{s.s}</p>
      </div>
    ))}
  </div>
  <div className="sec">Tools we use</div>
  <div className="fw fw-grid g2">
    <div className="cell pad-lg">
      <h3>The right tool for the job — not the most expensive one</h3>
      <p>We choose tools based on your requirements, budget, and maintenance burden. Self-hosted where it saves you money. SaaS where speed matters. Custom code where nothing else fits.</p>
    </div>
    <div className="cell"><ToolPills /></div>
  </div>
  <CtaBar h="Not sure where to start?" sub="Book a free 30-minute automation audit. We'll map one of your workflows live and show you what's possible." />
</>); }
