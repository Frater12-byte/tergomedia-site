'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ImgPh } from '@/components/Graphics';

const PROJECTS = [
  { tc:'y', cat:'Travel · CRM · Automation',   t:'Cocktail Holidays', d:'Full digital transformation — booking automation, CRM, RPA. Scaled to $7M revenue. Exit achieved.',                                              img:'IMG-01', href:'/portfolio' },
  { tc:'c', cat:'Agriculture · IoT · Portal',   t:'Agri Novatex',     d:'Distributor portals, HubSpot implementation, API integrations across South Africa and UK.',                                                       img:'IMG-02', href:'/portfolio' },
  { tc:'p', cat:'Mobile · iOS · Android',       t:'Ranjet',           d:'Native iOS and Android app, product management, digital strategy for a high-growth startup.',                                                    img:'IMG-03', href:'/portfolio' },
  { tc:'y', cat:'Travel · Marketplace · SaaS',  t:'Skipodium',        d:'Ski sports marketplace built from scratch — product, engineering, and growth. Scaled to $7M revenue before a successful exit.',                 ph:'S',       href:'/portfolio' },
  { tc:'c', cat:'Agriculture · IoT · E-commerce',t:'Novatex Italia',  d:'Digital infrastructure for an agricultural inputs distributor — e-commerce platform, IoT sensor integration, and automated distributor portals across Italy.', ph:'N', href:'/portfolio' },
  { tc:'p', cat:'Agriculture · IoT · React',    t:'HayGuard',         d:'Farm monitoring system built in React and Node.js — real-time sensor dashboards, automated alerts, and team management for agricultural operations.', ph:'H', href:'/portfolio' },
];

export default function PortfolioCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const sync = useCallback(() => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setCanLeft(scrollLeft > 4);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => { sync(); }, [sync]);

  const scroll = (dir: 'l' | 'r') => {
    if (!ref.current) return;
    const cardW = ref.current.querySelector<HTMLElement>('.port-card')?.offsetWidth ?? ref.current.clientWidth / 3;
    ref.current.scrollBy({ left: dir === 'l' ? -(cardW + 1) : (cardW + 1), behavior: 'smooth' });
  };

  return (
    <div>
      <style>{`
        .port-outer { overflow: hidden; background: var(--b); border-top: 1px solid var(--b); border-bottom: 1px solid var(--b); }
        .port-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; gap: 1px; background: var(--b); }
        .port-track::-webkit-scrollbar { display: none; }
        .port-card { flex: 0 0 calc((100% - 40px) / 3); scroll-snap-align: start; background: var(--card); min-width: 0; }
        .port-arrow { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--b2); background: var(--card); color: var(--y); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all .15s; font-family: 'Exo', sans-serif; }
        .port-arrow:hover:not(:disabled) { border-color: var(--y); background: rgba(242,194,0,0.08); }
        .port-arrow:disabled { opacity: 0.22; cursor: default; }
        @media (max-width: 768px) {
          .port-card { flex: 0 0 min(85vw, 320px); }
          .port-arrows { display: none !important; }
        }
      `}</style>

      {/* Header row with arrows */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'56px clamp(24px,5vw,72px) 20px', maxWidth:1100, margin:'0 auto' }}>
        <div className="sec" style={{ padding:0, margin:0, flex:1 }}>Portfolio</div>
        <div className="port-arrows" style={{ display:'flex', gap:8 }}>
          <button className="port-arrow" onClick={() => scroll('l')} disabled={!canLeft}  aria-label="Previous">←</button>
          <button className="port-arrow" onClick={() => scroll('r')} disabled={!canRight} aria-label="Next">→</button>
        </div>
      </div>

      <div className="port-outer" data-section="portfolio">
        <div ref={ref} onScroll={sync} className="port-track">
          {PROJECTS.map(p => (
            <div className={`port-card at-${p.tc}`} key={p.t}>
              {p.img
                ? <ImgPh label={p.img} desc={`${p.t} screenshot`} h={240} src={`/Images/${p.img}.png`} />
                : <div style={{ height:240, background:'#1a1a1a', display:'flex', alignItems:'center', justifyContent:'center', fontSize:96, fontWeight:900, color:'rgba(255,255,255,0.06)', fontFamily:"'Exo',sans-serif", userSelect:'none' }}>{p.ph}</div>
              }
              <div style={{ padding:'20px clamp(20px,3vw,40px) 28px' }}>
                <div style={{ fontSize:9, color:'var(--m)', letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>{p.cat}</div>
                <h3 style={{ fontSize:'clamp(15px,1.8vw,20px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.3px', lineHeight:1.15, marginBottom:12 }}>{p.t}</h3>
                <p style={{ fontSize:14, color:'#777', lineHeight:1.8, fontWeight:300, marginBottom:16 }}>{p.d}</p>
                <Link href={p.href} style={{ fontSize:11, fontWeight:800, color:`var(--${p.tc})`, textDecoration:'none', textTransform:'uppercase', letterSpacing:1 }}>View case →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
