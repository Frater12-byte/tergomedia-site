'use client';
import { useState } from 'react';

// Mercator projection: region -15°W→70°E, -15°S→67°N, ViewBox 0 0 900 620
const W = 900, H = 620;
const LON_MIN = -15, LON_MAX = 70, LAT_MIN = -15, LAT_MAX = 67;
function mx(lon: number) { return (lon - LON_MIN) / (LON_MAX - LON_MIN) * W; }
function my(lat: number) { return (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * H; }

function pts(coords: [number, number][]) {
  return coords.map(([lon, lat]) => `${mx(lon).toFixed(1)},${my(lat).toFixed(1)}`).join(' ');
}

// Simplified continent/landmass polygons (lon, lat)
// Europe main landmass
const EUROPE: [number, number][] = [
  [-9,37],[-9,39],[-8,43],[-2,44],[0,44],[3,43],[7,44],[8,44],[9,44],[10,44],[14,46],[17,46],[19,47],[23,47],[26,48],[28,46],[30,46],[33,47],[37,47],[41,41],[43,43],[42,41],[36,37],[30,37],[28,36],[27,37],[24,37],[22,37],[22,38],[24,38],[23,43],[20,42],[18,40],[15,38],[16,37],[16,39],[13,38],[12,37],[13,37],[8,40],[8,44],[7,44],[3,43],[1,43],[-2,44],[-3,44],[-1,38],[0,38],[2,40],[3,42],[1,41],[-4,38],[-2,37],[-5,36],[-8,37],[-9,37],
];
// Scandinavia
const SCANDINAVIA: [number, number][] = [
  [5,58],[8,58],[10,56],[12,56],[18,57],[20,59],[24,60],[27,62],[29,70],[25,71],[16,69],[15,68],[14,65],[12,64],[8,63],[5,62],[4,60],[5,58],
];
// UK + Ireland (simplified)
const UK: [number, number][] = [
  [-5,50],[-3,50],[-0,51],[2,51],[2,53],[0,54],[-1,55],[-3,58],[-4,58],[-5,57],[-4,54],[-5,50],
];
// Turkey + Balkans extension
const TURKEY: [number, number][] = [
  [26,42],[28,41],[30,42],[34,42],[36,42],[40,40],[42,38],[42,37],[40,36],[36,36],[34,36],[30,36],[27,37],[26,38],[26,40],[26,42],
];
// Middle East (Levant, Iraq, Iran partial)
const MIDDLE_EAST: [number, number][] = [
  [35,36],[36,36],[38,37],[42,37],[42,35],[45,32],[48,31],[50,29],[48,27],[46,25],[50,24],[55,24],[56,24],[58,22],[59,21],[57,20],[55,17],[52,16],[49,14],[45,13],[43,12],[42,13],[41,15],[39,17],[37,22],[36,26],[35,29],[35,36],
];
// Egypt + NE Africa
const NE_AFRICA: [number, number][] = [
  [-5,36],[-2,35],[5,37],[10,37],[12,33],[13,33],[14,32],[25,31],[32,31],[35,30],[34,29],[34,22],[36,22],[38,15],[40,12],[43,12],[43,12],[40,10],[38,8],[40,5],[42,2],[44,1],[46,-1],[46,-8],[40,-10],[34,-5],[30,-3],[28,0],[25,5],[22,5],[15,7],[12,5],[10,5],[9,4],[4,5],[0,5],[-3,5],[-6,5],[-8,5],[-12,8],[-16,12],[-17,15],[-16,22],[-13,28],[-6,35],[-5,36],
];
// Arabian Sea partial coast for context
const ARABIAN_COAST: [number, number][] = [
  [58,22],[59,21],[60,20],[60,18],[58,15],[55,12],[50,12],[46,12],[45,12],[43,12],[45,13],[50,13],[55,17],[58,20],[58,22],
];

const LANDMASSES = [
  { id: 'europe', d: EUROPE, fill: '#1a1a1a' },
  { id: 'scan',   d: SCANDINAVIA, fill: '#1a1a1a' },
  { id: 'uk',     d: UK, fill: '#1a1a1a' },
  { id: 'turkey', d: TURKEY, fill: '#1a1a1a' },
  { id: 'me',     d: MIDDLE_EAST, fill: '#1c1c1c' },
  { id: 'africa', d: NE_AFRICA, fill: '#1a1a1a' },
  { id: 'arab',   d: ARABIAN_COAST, fill: '#1c1c1c' },
];

type OfficeKey = 'dubai' | 'milano' | 'bucharest';

const OFFICES: Record<OfficeKey, {
  lon: number; lat: number; color: string; tc: string;
  city: string; role: string; bullets: string[];
}> = {
  dubai: {
    lon: 55.3, lat: 25.2, color: 'var(--y)', tc: 'y',
    city: 'Dubai, UAE',
    role: 'Headquarters · GCC hub',
    bullets: [
      'Primary base serving UAE, KSA & GCC',
      'Real estate, finance & travel clients',
      'Business development — Maria, CEO',
    ],
  },
  milano: {
    lon: 9.2, lat: 45.5, color: 'var(--p)', tc: 'p',
    city: 'Milano, Italy',
    role: 'Partner office · Europe',
    bullets: [
      'European client base & partnerships',
      'Future Days & Ennea Capital',
      'Digital transformation projects',
    ],
  },
  bucharest: {
    lon: 26.1, lat: 44.4, color: 'var(--c)', tc: 'c',
    city: 'Bucharest, Romania',
    role: 'Engineering hub',
    bullets: [
      'Core engineering team · 10+ engineers',
      'React · Node.js · Python · iOS · Android',
      'Registered as Tergo Invest S.R.L.',
    ],
  },
};

export default function OfficeMap() {
  const [active, setActive] = useState<OfficeKey | null>(null);
  const info = active ? OFFICES[active] : null;

  // Grid lines
  const latLines = [-10, 0, 10, 20, 30, 40, 50, 60];
  const lonLines = [-10, 0, 10, 20, 30, 40, 50, 60, 70];

  return (
    <div style={{ borderTop: '1px solid var(--b)', borderBottom: '1px solid var(--b)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(24px,5vw,72px)' }}>
        <div className="eyebrow y">Global presence</div>
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: -1, lineHeight: 1.05, marginBottom: 10 }}>
          Three offices.<br />One team.
        </h2>
        <p className="hero-desc" style={{ marginBottom: 36 }}>
          Click a pin to learn what we do there.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start' }} className="map-outer">
          <style>{`
            .map-outer { }
            @media (max-width: 900px) { .map-outer { grid-template-columns: 1fr !important; } }
          `}</style>

          {/* SVG MAP */}
          <div style={{ border: '1px solid var(--b)', background: '#0b0b0f', overflow: 'hidden', position: 'relative' }}>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Background */}
              <rect width={W} height={H} fill="#0b0b0f" />

              {/* Graticule */}
              {latLines.map(lat => (
                <line key={`lat${lat}`} x1={0} x2={W} y1={my(lat)} y2={my(lat)} stroke="#151520" strokeWidth="1" />
              ))}
              {lonLines.map(lon => (
                <line key={`lon${lon}`} x1={mx(lon)} x2={mx(lon)} y1={0} y2={H} stroke="#151520" strokeWidth="1" />
              ))}

              {/* Land masses */}
              {LANDMASSES.map(lm => (
                <polygon key={lm.id} points={pts(lm.d)} fill={lm.fill} stroke="#252530" strokeWidth="0.8" />
              ))}

              {/* Office pins */}
              {(Object.keys(OFFICES) as OfficeKey[]).map(key => {
                const o = OFFICES[key];
                const cx = mx(o.lon), cy = my(o.lat);
                const isActive = active === key;
                return (
                  <g key={key} onClick={() => setActive(active === key ? null : key)} style={{ cursor: 'pointer' }}>
                    {/* Outer pulse ring */}
                    <circle cx={cx} cy={cy} r={isActive ? 22 : 16} fill="none" stroke={o.color} strokeWidth="1" opacity={isActive ? 0.4 : 0.2}>
                      {!isActive && (
                        <animate attributeName="r" values="10;20;10" dur="2.5s" repeatCount="indefinite" />
                      )}
                      {!isActive && (
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                      )}
                    </circle>
                    {/* Inner glow */}
                    <circle cx={cx} cy={cy} r={isActive ? 10 : 7} fill={o.color} opacity={isActive ? 0.25 : 0.12} />
                    {/* Dot */}
                    <circle cx={cx} cy={cy} r={isActive ? 6 : 5} fill={o.color} />
                    {/* City label */}
                    <text x={cx + 10} y={cy - 8} fill={o.color} fontSize="9" fontWeight="800" fontFamily="Exo,sans-serif" letterSpacing="1"
                      style={{ textTransform: 'uppercase' }}>
                      {o.city.split(',')[0].toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Info panel */}
          <div style={{ width: 260, minHeight: 200 }}>
            {!info ? (
              <div style={{ border: '1px solid var(--b)', padding: '28px 20px', minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 24, color: 'var(--y)', opacity: 0.3 }}>↖</div>
                <p style={{ color: 'var(--m)', fontSize: 12, fontWeight: 300 }}>Click a pin to see office details</p>
              </div>
            ) : (
              <div className={`at-${info.tc}`} style={{ border: '1px solid var(--b)', background: 'var(--card)', padding: '24px 20px' }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: info.color, marginBottom: 6 }}>
                  {info.role}
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: -0.5, color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>
                  {info.city}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {info.bullets.map((b, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: info.color, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>→</span>
                      <span style={{ fontSize: 13, color: 'var(--l)', fontWeight: 300, lineHeight: 1.55 }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {(['dubai','milano','bucharest'] as OfficeKey[]).map(k => (
                    <button key={k} onClick={() => setActive(k)}
                      style={{ padding: '4px 10px', border: `1px solid ${k === active ? OFFICES[k].color : 'var(--b)'}`, background: 'transparent', color: k === active ? OFFICES[k].color : 'var(--m)', fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Exo,sans-serif', cursor: 'pointer', transition: 'all .15s' }}>
                      {OFFICES[k].city.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
