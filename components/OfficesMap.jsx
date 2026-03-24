'use client';
import { useState } from 'react';

const YELLOW = '#F2C200';
const W = 1000, H = 420;
const LON_MIN = -20, LON_MAX = 75, LAT_MIN = 10, LAT_MAX = 70;

function mx(lon) { return (lon - LON_MIN) / (LON_MAX - LON_MIN) * W; }
function my(lat) { return (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * H; }
function pts(coords) {
  return coords.map(([lon, lat]) => `${mx(lon).toFixed(1)},${my(lat).toFixed(1)}`).join(' ');
}

// Simplified continent polygons [lon, lat]
const EUROPE = [
  [-9,37],[-9,39],[-8,43],[-2,44],[0,44],[3,43],[7,44],[8,44],[10,44],[14,46],
  [17,46],[19,47],[23,47],[26,48],[28,46],[30,46],[33,47],[37,47],[41,41],[43,43],
  [42,41],[36,37],[30,37],[28,36],[27,37],[24,37],[22,37],[22,38],[24,38],[23,43],
  [20,42],[18,40],[15,38],[16,37],[16,39],[13,38],[12,37],[13,37],[8,40],[8,44],
  [7,44],[3,43],[1,43],[-2,44],[-3,44],[-1,38],[0,38],[2,40],[3,42],[1,41],
  [-4,38],[-2,37],[-5,36],[-8,37],[-9,37],
];
const SCANDINAVIA = [
  [5,58],[8,58],[10,56],[12,56],[18,57],[20,59],[24,60],[27,62],[29,70],
  [25,71],[16,69],[15,68],[14,65],[12,64],[8,63],[5,62],[4,60],[5,58],
];
const UK = [
  [-5,50],[-3,50],[0,51],[2,51],[2,53],[0,54],[-1,55],[-3,58],[-4,58],[-5,57],[-4,54],[-5,50],
];
const TURKEY = [
  [26,42],[28,41],[30,42],[34,42],[36,42],[40,40],[42,38],[42,37],
  [40,36],[36,36],[34,36],[30,36],[27,37],[26,38],[26,40],[26,42],
];
const MIDDLE_EAST = [
  [35,36],[36,36],[38,37],[42,37],[42,35],[45,32],[48,31],[50,29],
  [48,27],[46,25],[50,24],[55,24],[56,24],[58,22],[59,21],[57,20],
  [55,17],[52,16],[49,14],[45,13],[43,12],[42,13],[41,15],[39,17],
  [37,22],[36,26],[35,29],[35,36],
];
const NE_AFRICA = [
  [-5,36],[-2,35],[5,37],[10,37],[12,33],[13,33],[14,32],[25,31],
  [32,31],[35,30],[34,29],[34,22],[36,22],[38,15],[40,12],[43,12],
  [40,10],[38,10],[36,12],[34,12],[30,12],[25,13],[20,13],[15,13],
  [12,13],[10,12],[5,12],[0,10],[-5,10],[-8,12],[-12,13],[-16,15],
  [-17,17],[-16,22],[-13,28],[-6,35],[-5,36],
];
const ARABIAN = [
  [58,22],[59,21],[60,20],[60,18],[58,15],[55,12],[50,12],[46,12],
  [45,12],[43,12],[45,13],[50,13],[55,17],[58,20],[58,22],
];
const CENTRAL_ASIA = [
  [43,43],[45,42],[48,40],[52,38],[56,38],[60,36],[62,36],[65,38],
  [68,40],[70,40],[72,41],[74,43],[72,44],[68,44],[65,43],[62,44],
  [58,44],[54,44],[50,44],[46,44],[43,43],
];

const LANDMASSES = [
  { id: 'europe',   coords: EUROPE,       fill: 'rgba(255,255,255,0.045)' },
  { id: 'scan',     coords: SCANDINAVIA,  fill: 'rgba(255,255,255,0.04)' },
  { id: 'uk',       coords: UK,           fill: 'rgba(255,255,255,0.04)' },
  { id: 'turkey',   coords: TURKEY,       fill: 'rgba(255,255,255,0.04)' },
  { id: 'me',       coords: MIDDLE_EAST,  fill: 'rgba(255,255,255,0.04)' },
  { id: 'africa',   coords: NE_AFRICA,    fill: 'rgba(255,255,255,0.038)' },
  { id: 'arab',     coords: ARABIAN,      fill: 'rgba(255,255,255,0.04)' },
  { id: 'casia',    coords: CENTRAL_ASIA, fill: 'rgba(255,255,255,0.035)' },
];

const OFFICES = [
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    role: 'Headquarters',
    lon: 55.3, lat: 25.2,
    color: YELLOW,
    pulseDelay: '0s',
    details: ['Primary client-facing office','GCC market — real estate, finance, travel','Francesco & Maria based here','New business & client strategy'],
  },
  {
    id: 'bucharest',
    city: 'Bucharest',
    country: 'Romania',
    role: 'Engineering Hub',
    lon: 26.1, lat: 44.4,
    color: '#00C9A7',
    pulseDelay: '0.9s',
    details: ['Core engineering team','React, Node.js, Python, PHP, iOS, Android','Registered as Tergo Invest S.R.L.','All development operations'],
  },
  {
    id: 'milano',
    city: 'Milano',
    country: 'Italy',
    role: 'Partner Office',
    lon: 9.2, lat: 45.5,
    color: '#A78BFA',
    pulseDelay: '1.8s',
    details: ['European client base','Partners: Future Days & Ennea Capital','Design and creative collaboration','EU market development'],
  },
];

// Connection paths (bezier arcs)
function connPath(o1, o2) {
  const x1 = mx(o1.lon), y1 = my(o1.lat);
  const x2 = mx(o2.lon), y2 = my(o2.lat);
  const cpx = (x1 + x2) / 2;
  const cpy = Math.min(y1, y2) - 70;
  return `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`;
}

const CONNECTIONS = [
  { id: 'c1', o1: OFFICES[0], o2: OFFICES[1] },
  { id: 'c2', o1: OFFICES[1], o2: OFFICES[2] },
  { id: 'c3', o1: OFFICES[2], o2: OFFICES[0] },
];

export default function OfficesMap() {
  const [activeId, setActiveId] = useState(null);
  const activeOffice = OFFICES.find(o => o.id === activeId);

  const animCSS = `
    @keyframes _pr1 { 0%{transform:scale(1);opacity:0.55} 100%{transform:scale(3.5);opacity:0} }
    @keyframes _pr2 { 0%{transform:scale(1);opacity:0.35} 100%{transform:scale(2.5);opacity:0} }
    @keyframes _dotIn2 { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
    .pulse-r1 { animation: _pr1 2.4s ease-out infinite; transform-box:fill-box; transform-origin:center; }
    .pulse-r2 { animation: _pr2 2.4s ease-out 0.6s infinite; transform-box:fill-box; transform-origin:center; }
    @media (prefers-reduced-motion: reduce) { .pulse-r1,.pulse-r2 { animation:none; } }
    @media (max-width: 768px) {
      .offices-map-svg-wrap { min-height: 320px; padding: 0 !important; }
      .offices-map-svg-wrap svg { min-height: 320px; }
      .offices-tab-row { padding: 16px 16px 20px !important; gap: 6px !important; }
      .offices-tab-row button { padding: 7px 12px !important; font-size: 11px !important; }
    }
  `;

  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: '#0d0d0d',
    }}>
      <style>{animCSS}</style>

      {/* Map container */}
      <div className="offices-map-svg-wrap" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          {/* Background */}
          <rect width={W} height={H} fill="#0d0d0d" />

          {/* Graticule */}
          {[-10,0,10,20,30,40,50,60,70].map(lon => (
            <line key={`v${lon}`} x1={mx(lon)} x2={mx(lon)} y1={0} y2={H}
              stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
          ))}
          {[20,30,40,50,60].map(lat => (
            <line key={`h${lat}`} x1={0} x2={W} y1={my(lat)} y2={my(lat)}
              stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
          ))}

          {/* Land masses */}
          {LANDMASSES.map(lm => (
            <polygon key={lm.id} points={pts(lm.coords)}
              fill={lm.fill} stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
          ))}

          {/* Connection lines */}
          {CONNECTIONS.map(({ id, o1, o2 }) => (
            <g key={id}>
              <path id={id} d={connPath(o1, o2)}
                fill="none" stroke={`rgba(242,194,0,0.12)`} strokeWidth="1.2" strokeDasharray="4 4" />
              <circle r="3.5" fill={YELLOW} opacity="0.65">
                <animateMotion dur="5s" repeatCount="indefinite">
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
            </g>
          ))}

          {/* Office markers */}
          {OFFICES.map(office => {
            const px = mx(office.lon), py = my(office.lat);
            const isActive = activeId === office.id;
            return (
              <g key={office.id}
                onClick={() => setActiveId(activeId === office.id ? null : office.id)}
                style={{ cursor: 'pointer' }}>

                {/* Pulse rings */}
                {!isActive && (
                  <>
                    <circle cx={px} cy={py} r={9} fill="none"
                      stroke={office.color} strokeWidth="1.2"
                      className="pulse-r1"
                      style={{ animationDelay: office.pulseDelay }} />
                    <circle cx={px} cy={py} r={9} fill="none"
                      stroke={office.color} strokeWidth="1"
                      className="pulse-r2"
                      style={{ animationDelay: office.pulseDelay }} />
                  </>
                )}

                {/* Glow */}
                <circle cx={px} cy={py} r={isActive ? 12 : 8}
                  fill={office.color} opacity={isActive ? 0.18 : 0.1}
                  style={{ transition: 'all 0.25s' }} />

                {/* Dot */}
                <circle cx={px} cy={py} r={isActive ? 7 : 5}
                  fill={office.color}
                  style={{ transition: 'all 0.2s', filter: isActive ? `drop-shadow(0 0 8px ${office.color})` : 'none' }} />

                {/* Info card above pin (when active) */}
                {isActive && (() => {
                  const cw = 148, ch = 52;
                  const cx2 = Math.min(Math.max(px - cw / 2, 8), W - cw - 8);
                  const cy2 = py - ch - 18;
                  return (
                    <g style={{ animation: '_dotIn2 0.2s ease both' }}>
                      <rect x={cx2} y={cy2} width={cw} height={ch}
                        fill="#191919" stroke={office.color} strokeWidth="1" />
                      {/* Arrow */}
                      <polygon
                        points={`${px - 5},${cy2 + ch} ${px + 5},${cy2 + ch} ${px},${py - 10}`}
                        fill="#191919" />
                      <line x1={px - 5} y1={cy2 + ch} x2={px - 5} y2={cy2 + ch}
                        stroke={office.color} strokeWidth="1" />
                      <text x={cx2 + cw / 2} y={cy2 + 18}
                        textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff"
                        fontFamily="Exo, sans-serif" letterSpacing="-0.3">
                        {office.city}
                      </text>
                      <text x={cx2 + cw / 2} y={cy2 + 36}
                        textAnchor="middle" fontSize="9" fontWeight="600" fill={office.color}
                        fontFamily="Exo, sans-serif" letterSpacing="1">
                        {office.role.toUpperCase()}
                      </text>
                    </g>
                  );
                })()}

                {/* City label (when not active) */}
                {!isActive && (
                  <text x={px + 9} y={py - 7}
                    fontSize="9" fontWeight="700" fill={office.color} opacity="0.7"
                    fontFamily="Exo, sans-serif" letterSpacing="0.5">
                    {office.city.toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(13,13,13,0.55) 75%, rgba(13,13,13,0.92) 100%)',
        }} />
      </div>

      {/* Tab buttons */}
      <div className="offices-tab-row" style={{
        display: 'flex', justifyContent: 'center', gap: 8,
        padding: '20px 24px 24px', flexWrap: 'wrap',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        {OFFICES.map(o => {
          const isAct = activeId === o.id;
          return (
            <button key={o.id}
              onClick={() => setActiveId(activeId === o.id ? null : o.id)}
              style={{
                padding: '8px 20px',
                border: `1px solid ${isAct ? o.color : 'rgba(255,255,255,0.1)'}`,
                background: isAct ? `rgba(${o.color === YELLOW ? '245,197,64' : o.color === '#00C9A7' ? '0,201,167' : '167,139,250'},0.08)` : 'transparent',
                color: isAct ? o.color : 'rgba(255,255,255,0.4)',
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Exo', sans-serif",
                cursor: 'pointer', transition: 'all 0.15s',
                letterSpacing: '0.05em',
              }}>
              {o.city}
              <span style={{ fontSize: 10, fontWeight: 400, color: isAct ? o.color : 'rgba(255,255,255,0.25)', marginLeft: 6 }}>
                · {o.role}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel (when active) */}
      {activeOffice && (
        <div style={{
          maxWidth: 640, margin: '0 auto',
          padding: '0 clamp(24px,5vw,72px) 32px',
        }}>
          <div style={{
            border: `1px solid ${activeOffice.color}30`,
            borderTop: `2px solid ${activeOffice.color}`,
            padding: '20px 24px',
            background: '#111',
          }}>
            <div style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: activeOffice.color,
              fontFamily: "'Exo', sans-serif", marginBottom: 6,
            }}>
              {activeOffice.role} · {activeOffice.country}
            </div>
            <div style={{
              fontSize: 20, fontWeight: 800, color: '#fff',
              fontFamily: "'Exo', sans-serif", letterSpacing: '-0.5px',
              marginBottom: 16,
            }}>
              {activeOffice.city}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeOffice.details.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: activeOffice.color, fontWeight: 900, flexShrink: 0, marginTop: 1, fontSize: 13 }}>→</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.55, fontFamily: "'Exo', sans-serif" }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
