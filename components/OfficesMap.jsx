'use client';
import { useState } from 'react';

const OFFICES = [
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    role: 'Headquarters',
    x: 62.5,
    y: 45.5,
    color: '#F5C518',
    details: [
      'Primary client-facing office',
      'GCC market — real estate, finance, travel',
      'Francesco & Maria based here',
      'New business & client strategy',
    ],
  },
  {
    id: 'bucharest',
    city: 'Bucharest',
    country: 'Romania',
    role: 'Engineering Hub',
    x: 54.2,
    y: 33.8,
    color: '#00C9A7',
    details: [
      'Core engineering team',
      'React, Node.js, Python, PHP, iOS, Android',
      'Registered as Tergo Invest S.R.L.',
      'All development operations',
    ],
  },
  {
    id: 'milano',
    city: 'Milano',
    country: 'Italy',
    role: 'Partner Office',
    x: 51.2,
    y: 32.0,
    color: '#A78BFA',
    details: [
      'European client base',
      'Partners: Future Days & Ennea Capital',
      'Design and creative collaboration',
      'EU market development',
    ],
  },
];

export default function OfficesMap() {
  const [active, setActive] = useState(null);
  const activeOffice = OFFICES.find(o => o.id === active);

  return (
    <div style={{ position: 'relative', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <svg
          viewBox="0 0 1000 500"
          style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.85 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1000" height="500" fill="#0a0a0a" />
          {/* Grid lines */}
          {[100,200,300,400,500,600,700,800,900].map(x => (
            <line key={x} x1={x} y1={0} x2={x} y2={500} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          ))}
          {[100,200,300,400].map(y => (
            <line key={y} x1={0} y1={y} x2={1000} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          ))}

          {/* North America */}
          <path d="M 80 80 L 220 70 L 260 90 L 280 130 L 250 200 L 220 250 L 180 270 L 140 260 L 100 220 L 70 160 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
          {/* South America */}
          <path d="M 200 270 L 260 260 L 290 290 L 300 360 L 270 430 L 230 440 L 200 400 L 190 340 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
          {/* Europe */}
          <path d="M 460 80 L 560 75 L 580 100 L 570 140 L 540 160 L 500 165 L 470 150 L 450 120 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
          {/* Africa */}
          <path d="M 470 170 L 560 165 L 590 200 L 600 290 L 580 370 L 540 410 L 500 400 L 470 360 L 450 280 L 455 210 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
          {/* Asia */}
          <path d="M 570 70 L 760 60 L 840 90 L 870 130 L 850 180 L 800 200 L 740 210 L 680 200 L 630 180 L 590 160 L 570 130 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
          {/* Middle East */}
          <path d="M 590 170 L 640 165 L 660 190 L 650 220 L 620 225 L 595 205 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
          {/* Australia */}
          <path d="M 760 280 L 870 270 L 900 310 L 890 370 L 840 390 L 780 380 L 750 340 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>

          {/* Office pins */}
          {OFFICES.map(office => {
            const px = (office.x / 100) * 1000;
            const py = (office.y / 100) * 500;
            const isActive = active === office.id;
            return (
              <g key={office.id} style={{ cursor: 'pointer' }}
                onClick={() => setActive(active === office.id ? null : office.id)}>
                <circle cx={px} cy={py} r={isActive ? 20 : 14}
                  fill="none" stroke={office.color} strokeWidth={isActive ? 2 : 1}
                  opacity={isActive ? 0.6 : 0.3}
                  style={{ transition: 'all 0.3s ease' }}>
                  {!isActive && (
                    <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite"/>
                  )}
                  {!isActive && (
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
                  )}
                </circle>
                <circle cx={px} cy={py} r={isActive ? 8 : 6}
                  fill={office.color}
                  style={{ transition: 'all 0.2s ease', filter: isActive ? `drop-shadow(0 0 6px ${office.color})` : 'none' }}
                />
                <text x={px} y={py - 14} textAnchor="middle"
                  fontSize="11" fontWeight="600" fill={office.color}
                  style={{ fontFamily: 'Exo, sans-serif', transition: 'opacity 0.2s' }}>
                  {office.city}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Info popup */}
        {activeOffice && (
          <div style={{
            position: 'absolute',
            top: '16px', right: '16px',
            background: '#141414',
            border: `1px solid ${activeOffice.color}40`,
            padding: '20px 24px',
            minWidth: '220px',
            maxWidth: '280px',
            boxShadow: `0 0 32px ${activeOffice.color}20`,
            zIndex: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <div style={{ color: activeOffice.color, fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'Exo, sans-serif' }}>
                  {activeOffice.role}
                </div>
                <div style={{ color: '#fff', fontSize: '20px', fontWeight: 900, lineHeight: 1, fontFamily: 'Exo, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
                  {activeOffice.city}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontFamily: 'Exo, sans-serif' }}>{activeOffice.country}</div>
              </div>
              <button onClick={() => setActive(null)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '18px', padding: '0 0 0 8px', lineHeight: 1 }}>
                ×
              </button>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {activeOffice.details.map((d, i) => (
                <li key={i} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.5, display: 'flex', gap: '8px', alignItems: 'flex-start', fontFamily: 'Exo, sans-serif', fontWeight: 300 }}>
                  <span style={{ color: activeOffice.color, marginTop: '2px', flexShrink: 0, fontWeight: 900 }}>→</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Office legend row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', padding: '16px 24px 20px', flexWrap: 'wrap' }}>
        {OFFICES.map(o => (
          <button key={o.id} onClick={() => setActive(active === o.id ? null : o.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: o.color, display: 'inline-block', flexShrink: 0 }}/>
            <span style={{ color: active === o.id ? o.color : 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: active === o.id ? 700 : 400, transition: 'color 0.2s', fontFamily: 'Exo, sans-serif', letterSpacing: '0.5px' }}>
              {o.city} · {o.role}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
