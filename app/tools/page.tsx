import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = { title: 'Free Tools' };
export default function Tools() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner hero-only">
      <div className="eyebrow y">Free tools</div>
      <h1>We don&apos;t just<br/>talk about<br/>automation.<br/><em className="y">We ship it.</em></h1>
      <p className="hero-desc" style={{maxWidth:600}}>Real AI-powered tools we built — free to use, no sign-up required. Each one shows what&apos;s possible when AI meets your industry.</p>
      <div className="btn-row"><Link href="/contact" className="btn btn-y">Build a tool for my business →</Link></div>
    </div>
  </div>
  <div className="fw fw-grid g2">
    <div className="cell at-y pad-lg">
      <span className="tag y" style={{marginBottom:14,display:"inline-block"}}>Live · Real estate · Dubai</span>
      <h3>Brokerage Revenue Analyzer</h3>
      <p style={{marginBottom:16}}>Answer 9 questions about your Dubai brokerage. Get a <strong>precise AED revenue leakage figure</strong> and an AI-written diagnosis in under 3 minutes. No sign-up, completely free.</p>
      <div className="met"><span className="met-b y">9</span><span className="met-s">questions answered</span></div>
      <div className="met"><span className="met-b c">AED 2.3M</span><span className="met-s">average leakage identified per brokerage</span></div>
      <div style={{display:"flex",gap:10,marginBottom:10,marginTop:10}}><span className="tag y">AI analysis</span><span className="tag y">Revenue leakage</span><span className="tag y">Dubai market</span></div>
      <div style={{marginTop:20}}><a className="btn btn-y" href="https://analyzer.tergomedia.com" target="_blank" rel="noreferrer">Launch the tool →</a></div>
    </div>
    <div className="cell pad-lg"><ImgPh label="IMG-13" desc="Brokerage Revenue Analyzer screenshot" h={320} /></div>
  </div>
  <div className="fw fw-grid g2" style={{borderTop:"none"}}>
    <div className="cell pad-lg"><ImgPh label="IMG-14" desc="SaaS Stack Auditor screenshot" h={320} /></div>
    <div className="cell at-c pad-lg">
      <span className="tag c" style={{marginBottom:14,display:"inline-block"}}>Live · All sectors</span>
      <h3>SaaS Stack Auditor</h3>
      <p style={{marginBottom:16}}>List your business tools and get an <strong>instant AI audit</strong> of overlap, unused features, and hidden costs — with a recommended leaner stack. Works for any business size.</p>
      <div className="met"><span className="met-b c">$14K</span><span className="met-s">average savings identified per company</span></div>
      <div className="met"><span className="met-b y">60 sec</span><span className="met-s">to complete the audit</span></div>
      <div style={{marginTop:20}}><a className="btn btn-c" href="https://automate.tergomedia.com" target="_blank" rel="noreferrer">Launch the tool →</a></div>
    </div>
  </div>
  <CtaBar h="Want a lead-gen tool for your business?" sub="We build these as part of our client engagement packages. Book a call and tell us what tool would be most useful for your prospects." />
</>); }
