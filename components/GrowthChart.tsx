'use client';
import { useEffect, useRef, useState } from 'react';

const data = [
  { label: 'Month 1', leads: 40, automated: 12, saved: 8 },
  { label: 'Month 2', leads: 58, automated: 31, saved: 22 },
  { label: 'Month 3', leads: 72, automated: 52, saved: 41 },
  { label: 'Month 4', leads: 89, automated: 71, saved: 58 },
  { label: 'Month 5', leads: 103, automated: 88, saved: 74 },
  { label: 'Month 6', leads: 124, automated: 112, saved: 96 },
];

export default function GrowthChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setAnimated(true), 100); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const maxVal = 130;

  return (
    <div ref={ref} style={{padding:'0 0 8px'}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:3,color:'#444',textTransform:'uppercase',marginBottom:24,display:'flex',alignItems:'center',gap:14}}>
        Typical client results over 6 months
        <span style={{flex:1,height:1,background:'#1a1a1a',display:'block'}} />
      </div>

      <div style={{display:'flex',gap:24,marginBottom:24,flexWrap:'wrap'}}>
        {[{c:'var(--y)',label:'Total leads captured'},{c:'var(--c)',label:'Automated without agent'},{c:'var(--p)',label:'Hours saved / week'}].map(l=>(
          <div key={l.label} style={{display:'flex',alignItems:'center',gap:8,fontSize:11,color:'#666'}}>
            <div style={{width:24,height:3,background:l.c,borderRadius:2}} />
            {l.label}
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,alignItems:'end',height:180}}>
        {data.map((d, i) => (
          <div key={d.label} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,height:'100%',justifyContent:'flex-end'}}>
            <div style={{width:'100%',display:'flex',gap:3,alignItems:'flex-end',height:'100%',justifyContent:'center'}}>
              {[{val:d.leads,c:'var(--y)'},{val:d.automated,c:'var(--c)'},{val:d.saved,c:'var(--p)'}].map((bar,j)=>(
                <div
                  key={j}
                  style={{
                    flex:1,
                    background:bar.c,
                    opacity: animated ? 1 : 0,
                    height: animated ? `${(bar.val/maxVal)*100}%` : '0%',
                    transition: `height 0.8s ease ${i*0.1 + j*0.05}s, opacity 0.4s ease ${i*0.1}s`,
                    minHeight:0,
                    borderRadius:'2px 2px 0 0',
                  }}
                />
              ))}
            </div>
            <div style={{fontSize:9,color:'#444',fontWeight:700,letterSpacing:1,textTransform:'uppercase',textAlign:'center',whiteSpace:'nowrap'}}>{d.label}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',justifyContent:'space-between',marginTop:16,borderTop:'1px solid #1a1a1a',paddingTop:10}}>
        <div style={{fontSize:11,color:'#555'}}>Before automation</div>
        <div style={{fontSize:11,color:'var(--c)'}}>After 6 months →</div>
      </div>
    </div>
  );
}
