'use client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
export default function Contact() {
  const [status, setStatus] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const r = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
    });
    setStatus(r.ok ? 'sent' : 'error');
  }
  return (<>
    <div className="hero"><div className="hero-grid-bg" />
      <div className="hero-inner hero-only">
        <div className="eyebrow y">Contact</div>
        <h1>Let&apos;s figure out<br/>what you<br/><em className="y">actually need</em>.</h1>
        <p className="hero-desc" style={{maxWidth:580}}>Book a free 30-minute call. We&apos;ll listen, ask the right questions, and tell you honestly what will move the needle — no sales pitch, no commitment.</p>
        <div className="btn-row">
          <a className="btn btn-y" href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer">Book a slot →</a>
          <a className="btn btn-outline" href="mailto:hello@tergomedia.com">hello@tergomedia.com</a>
        </div>
      </div>
    </div>
    <div className="fw fw-grid g2">
      <div className="cell at-y pad-lg">
        <div style={{marginBottom:28}}>
          <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:'var(--y)',marginBottom:10}}>Book a call</div>
          <h3>Free 30-minute discovery call</h3>
          <p style={{marginBottom:16}}>We use this call to understand what you&apos;re working on and whether we&apos;re the right fit. Most people leave with clarity even if we don&apos;t end up working together.</p>
          <a className="btn btn-y" href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer">Book a slot →</a>
        </div>
        <div style={{borderTop:'1px solid var(--b)',paddingTop:24,marginBottom:28}}>
          <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:'var(--c)',marginBottom:10}}>WhatsApp</div>
          <h4>Message us directly</h4>
          <p>Prefer WhatsApp? Message us and we&apos;ll respond within a few hours during business hours.</p>
          <div style={{marginTop:12}}><a className="btn btn-outline" style={{borderColor:'var(--cbr)',color:'var(--c)'}} href="https://wa.me/971556524281" target="_blank" rel="noreferrer">+971 55 652 4281 →</a></div>
        </div>
        <div style={{borderTop:'1px solid var(--b)',paddingTop:24}}>
          <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:'var(--m)',marginBottom:14}}>Offices</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
            {[['Dubai','UAE','Primary office'],['Bucharest','Romania','Engineering hub'],['Milan','Italy','Partner office']].map(([city,country,role])=>(<div key={city}><div style={{fontSize:11,fontWeight:800,color:'var(--l)',marginBottom:4}}>{city}</div><div style={{fontSize:11,color:'var(--m)'}}>{country}<br/>{role}</div></div>))}
          </div>
          <div style={{marginTop:16,fontSize:11,color:'var(--m)'}}>hello@tergomedia.com</div>
        </div>
      </div>
      <div className="cell">
        <div className="form-wrap">
          <div className="form-title">Or send us a message</div>
          {status === 'sent' ? (
            <div style={{padding:'24px 0',textAlign:'center',color:'var(--c)',fontWeight:700}}>Message sent ✓ — we&apos;ll reply within 24h</div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-row">
                <div className="form-col"><label className="form-label">Name</label><input name="name" className="form-input" type="text" placeholder="Your name" required /></div>
                <div className="form-col"><label className="form-label">Company</label><input name="company" className="form-input" type="text" placeholder="Company name" /></div>
              </div>
              <div className="form-col" style={{marginBottom:12}}><label className="form-label">Email</label><input name="email" className="form-input" type="email" placeholder="your@email.com" required /></div>
              <div className="form-col" style={{marginBottom:12}}><label className="form-label">What do you need?</label><textarea name="message" className="form-input form-ta" placeholder="Describe your project or problem..." required /></div>
              {status === 'error' && <p style={{color:'var(--r)',fontSize:11,marginBottom:8}}>Something went wrong — try emailing us directly.</p>}
              <button type="submit" className="form-sub">Send message →</button>
              <div style={{marginTop:10,textAlign:'center',fontSize:10,color:'#555',letterSpacing:1,textTransform:'uppercase'}}>Response within 24 hours</div>
            </form>
          )}
        </div>
      </div>
    </div>
    <div className="sec">Common questions</div>
    <div className="fw fw-grid g2">
      {[
        {q:'How quickly can you start?',a:'Once a proposal is signed, we typically kick off within the same week. No lengthy onboarding, no weeks of "discovery" before anything happens.'},
        {q:'Do you work with companies outside Dubai?',a:'Yes — we have clients across the GCC, Italy, Romania, Germany, and South Africa. All work is remote-first by design.'},
        {q:'What happens to the code when the project ends?',a:'You own 100% of it. We transfer all repositories, accounts, and credentials at handover. No dependency on us to keep it running.'},
        {q:'Do you offer ongoing support?',a:'Every project includes 30 days free post-launch support. After that we offer monthly retainers or ad-hoc hours — your choice, no lock-in.'},
      ].map((faq,i)=>(
        <div className={`cell at-${['y','c','y','c'][i]}`} key={i}>
          <div style={{fontSize:11,fontWeight:800,color:'#fff',marginBottom:10,letterSpacing:-.2}}>{faq.q}</div>
          <p>{faq.a}</p>
        </div>
      ))}
    </div>
    <div className="sec">What happens after you reach out</div>
    <div className="fw fw-grid g4">
      {[{n:"Step 01",t:"We respond within 24h",d:"Every inquiry gets a personal response from a senior team member — not an automated sequence."},{n:"Step 02",t:"30-minute discovery call",d:"We understand your situation, goals, and constraints. You leave with clarity."},{n:"Step 03",t:"Proposal within 5 days",d:"If we're a fit, you get a clear, fixed-price proposal within 5 working days."},{n:"Step 04",t:"Kickoff in week 1",d:"Once approved, we start immediately. Week 1 we're already mapping your system."}].map((s,i)=>(<div className={`cell at-${["y","c","y","c"][i]}`} key={s.n}><div className="num">{s.n}</div><h4>{s.t}</h4><p>{s.d}</p></div>))}
    </div>
  </>);
}
