/* eslint-disable */
'use client';
import { useEffect, useRef } from 'react';

const W = 900, H = 440;
const LON_MIN = -6, LON_MAX = 66, LAT_MIN = 19.5, LAT_MAX = 65.5;

const toX = (lon: number) => (lon - LON_MIN) / (LON_MAX - LON_MIN) * W;
const toY = (lat: number) => (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * H;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const hexToRgb = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};
const lerpColor = (c1: [number, number, number], c2: [number, number, number], t: number) =>
  `rgba(${Math.round(lerp(c1[0], c2[0], t))},${Math.round(lerp(c1[1], c2[1], t))},${Math.round(lerp(c1[2], c2[2], t))},1)`;

interface Country { pts: [number, number][]; hl: boolean; hlColor?: string; bright?: boolean; }

const COUNTRIES: Country[] = [
  // Portugal
  { pts: [[-9.5,37],[-6.2,37],[-6.8,40],[-6.3,41.5],[-9,42],[-9.5,40]], hl: false },
  // Spain
  { pts: [[-9,37],[-6.2,37],[-1.5,36.8],[3,42.5],[3.3,43.5],[-1.8,44],[-8.9,43.7],[-9,41],[-9,37]], hl: false },
  // France
  { pts: [[-1.8,43.5],[7.9,43.7],[7.7,47.5],[3.3,50.5],[-2.1,50.3],[-5,47.8],[-1.8,43.5]], hl: false },
  // UK mainland
  { pts: [[-5.7,50],[1.8,51.5],[0,53],[-1,55.5],[-2.1,58.5],[-5.5,58.5],[-5.8,54.5],[-3.2,51.4],[-5.7,50]], hl: false },
  // Ireland
  { pts: [[-10,51.5],[-6,51.5],[-6,55.3],[-8.3,55.3],[-10,53.5],[-10,51.5]], hl: false },
  // Netherlands + Belgium
  { pts: [[3.3,50.8],[7,51],[8,53.5],[4.9,53.5],[2.5,51.2],[3.3,50.8]], hl: false },
  // Germany
  { pts: [[6.1,51],[15.2,51.1],[15.1,47.5],[10,47.5],[6.1,47.8],[6.1,51]], hl: false },
  // Switzerland + Austria
  { pts: [[6.1,47.5],[10,47.5],[17.1,47.8],[17,46.9],[9.5,46],[6.8,46.2],[6.1,47.5]], hl: false },
  // Italy (highlighted)
  { pts: [[6.8,44.1],[13.8,44.6],[15.8,41.6],[18.1,39.9],[15.7,38],[12.4,37.6],[7.6,38.1],[6.8,44.1]], hl: true, hlColor: '#00C8FF' },
  // Sardinia
  { pts: [[8.1,39.2],[9.8,39],[9.7,41],[8.2,41.2],[8.1,39.2]], hl: false },
  // Sicily
  { pts: [[12.4,37.6],[15.6,37.9],[15.8,37],[13.4,36.6],[12.4,37.6]], hl: false },
  // Czech + Slovakia
  { pts: [[12.1,51],[18.9,49.6],[22.5,48.5],[18.1,47.8],[15.1,47.5],[12.1,50],[12.1,51]], hl: false },
  // Poland
  { pts: [[14.1,54],[24.2,54],[24.1,50],[22.5,48.5],[18.9,49.6],[14.1,50.5],[14.1,54]], hl: false },
  // Hungary
  { pts: [[16.1,48.5],[22.9,48],[22.5,45.5],[18.5,45.8],[16.1,46.5],[16.1,48.5]], hl: false },
  // Romania (highlighted)
  { pts: [[22,47.9],[29.7,45.4],[29.7,44.4],[26.6,43.8],[22.5,44],[22,45.2],[22,47.9]], hl: true, hlColor: '#00FF9D' },
  // Serbia + Croatia
  { pts: [[14.2,46.5],[21.5,46.2],[22.5,44.5],[20,43],[17.5,42.5],[13.4,44.7],[14.2,46.5]], hl: false },
  // Bulgaria + North Macedonia
  { pts: [[22.5,44.5],[28.7,44],[28,41.2],[22.5,41.5],[20.5,42],[22.5,44.5]], hl: false },
  // Greece
  { pts: [[19.8,41.8],[26.6,41.6],[26.4,40.3],[22.4,37.9],[21,37.3],[19.8,38.5],[19.8,41.8]], hl: false },
  // Ukraine
  { pts: [[22,51.5],[37.6,52.4],[39.9,47.5],[37,47],[31,46.5],[29.7,45.4],[22,47.9],[22,51.5]], hl: false },
  // Belarus
  { pts: [[23.7,51.5],[32.7,53.9],[33.9,52.2],[28.3,53.5],[23.7,51.5]], hl: false },
  // Baltic states (Estonia, Latvia, Lithuania)
  { pts: [[21.1,56.8],[27.8,57.5],[28.2,57.5],[28,55.5],[25,54],[22,55],[21.1,56.8]], hl: false },
  // Scandinavia (Norway + Sweden)
  { pts: [[4.9,57.9],[10.2,58.5],[12,66],[15,69],[30,71],[31.5,65],[24.2,65.8],[18.3,60.5],[12,58.1],[4.9,57.9]], hl: false },
  // Denmark
  { pts: [[8,55],[13,55.6],[12.5,56.5],[9.5,57.5],[8,55]], hl: false },
  // Finland
  { pts: [[22,60],[31.5,65],[29.5,70],[25.8,70.1],[21.3,69],[20.5,65],[22,60]], hl: false },
  // Russia (partial — western edge only)
  { pts: [[27.8,57.5],[37.6,52.4],[39.9,47.5],[40.5,48],[43.5,43.5],[45,48],[52,55],[60,58],[60,68],[45,68],[31.5,65],[30,71],[27.8,57.5]], hl: false },
  // Turkey
  { pts: [[26,42],[44.8,42],[44.8,39.5],[36.5,36.2],[28.5,36.5],[26,37.5],[26,42]], hl: false },
  // Caucasus (Georgia, Armenia, Azerbaijan)
  { pts: [[40.5,43.5],[46.6,41.9],[50.4,40.2],[45,39.5],[40,40.3],[40.5,43.5]], hl: false },
  // Cyprus
  { pts: [[32.3,34.6],[34.6,35.3],[34.7,34.6],[32.3,34.6]], hl: false },
  // Syria + Lebanon
  { pts: [[35.7,36.6],[42,37],[42,33.5],[36.5,32],[35.2,33.3],[35.7,36.6]], hl: false },
  // Israel + Jordan
  { pts: [[34.2,32],[37.8,32],[37.8,29.5],[34.9,29.5],[34.2,31.5],[34.2,32]], hl: false },
  // Iraq
  { pts: [[38.8,37.3],[48.6,37.3],[48.5,30],[46.5,29],[38.8,33.5],[38.8,37.3]], hl: false },
  // Iran
  { pts: [[44.8,39.5],[62,37.5],[63.3,25.4],[57.8,22],[53.3,26],[44.5,25.5],[44.7,29],[44.8,39.5]], hl: false },
  // Egypt
  { pts: [[24.7,31.5],[36.9,31.5],[34.9,29.5],[34.1,22],[25,22],[24.7,31.5]], hl: false },
  // Libya
  { pts: [[11.5,33.2],[25,33.2],[25,22],[11.5,22],[11.5,33.2]], hl: false },
  // Tunisia
  { pts: [[8.2,37.3],[11.6,37.4],[11.5,33],[8.2,33],[8.2,37.3]], hl: false },
  // Algeria
  { pts: [[-1.8,37],[8.2,37.3],[8.2,33],[11.5,33],[11.5,22],[-1.8,22],[-1.8,37]], hl: false },
  // Morocco
  { pts: [[-5.9,35.9],[-1.8,35.8],[-1.8,37],[-5.9,36.9],[-5.9,35.9]], hl: false },
  // Morocco mainland
  { pts: [[-5.9,36],[-1.8,35.8],[-1.7,29.5],[-8.5,27.7],[-13.2,29],[-13.2,32],[-5.9,36]], hl: false },
  // Saudi Arabia + Gulf (highlighted)
  { pts: [[36.8,28],[55.7,22],[59.5,22],[58.5,23.7],[56.4,24.1],[51,24.5],[46.5,29],[36.8,28]], hl: true, hlColor: '#F9CA00' },
  // UAE (highlighted, brighter)
  { pts: [[51,24.5],[56.4,24.1],[56.4,22.6],[52.6,22.6],[51,24.5]], hl: true, hlColor: '#F9CA00', bright: true },
  // Kuwait
  { pts: [[46.5,30],[48.5,30],[48.5,28.5],[46.5,28.5],[46.5,30]], hl: false },
  // Yemen + Oman (simplified)
  { pts: [[43,15],[59.5,22],[58.5,23.7],[45.5,24],[43,19.5],[43,15]], hl: false },
  // Pakistan (edge)
  { pts: [[60,37],[66,37],[65.8,25],[60,25],[60,37]], hl: false },
];

interface City { name: string; lon: number; lat: number; color: string; labelAbove?: boolean; }

const CITIES: City[] = [
  { name: 'Milan',     lon: 9.19,  lat: 45.47, color: '#00C8FF' },
  { name: 'Bucharest', lon: 26.10, lat: 44.40, color: '#00FF9D' },
  { name: 'Dubai',     lon: 55.30, lat: 25.20, color: '#F9CA00', labelAbove: true },
];

interface Arc { from: number; to: number; cpOffset: [number, number]; }

const ARCS: Arc[] = [
  { from: 0, to: 1, cpOffset: [0, -60] },   // Milan → Bucharest (curves north)
  { from: 1, to: 2, cpOffset: [20, -80] },  // Bucharest → Dubai (curves high)
  { from: 2, to: 0, cpOffset: [-20, 80] },  // Dubai → Milan (curves south through Med)
];

const DOTS: [number, number][] = [
  [-3.7, 40.4], // Madrid
  [2.3,  48.9], // Paris
  [13.4, 52.5], // Berlin
  [16.4, 48.2], // Vienna
  [14.5, 50.1], // Prague
  [17.1, 48.2], // Bratislava
  [19.0, 47.5], // Budapest
  [21.0, 52.2], // Warsaw
  [23.7, 38.0], // Athens
  [28.9, 41.0], // Istanbul
  [44.4, 33.3], // Baghdad
  [35.2, 33.9], // Beirut
  [35.9, 31.9], // Amman
  [31.2, 30.1], // Cairo
  [36.8, 10.2], // Tunis
  [3.1,  36.7], // Algiers
  [30.5, 50.5], // Kyiv
  [37.6, 55.7], // Moscow (edge)
  [69.3, 41.3], // Tashkent (edge)
];

export default function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    // Bezier evaluation helper
    const bezier = (
      p0x: number, p0y: number,
      p1x: number, p1y: number,
      p2x: number, p2y: number,
      t: number
    ): [number, number] => {
      const mt = 1 - t;
      return [
        mt * mt * p0x + 2 * mt * t * p1x + t * t * p2x,
        mt * mt * p0y + 2 * mt * t * p1y + t * t * p2y,
      ];
    };

    let animId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // 1. Background gradient
      const bg = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, W * 0.8);
      bg.addColorStop(0, '#181a1e');
      bg.addColorStop(1, '#0e0f12');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 2. Draw country polygons
      for (const c of COUNTRIES) {
        if (c.pts.length < 3) continue;
        ctx.beginPath();
        ctx.moveTo(toX(c.pts[0][0]), toY(c.pts[0][1]));
        for (let i = 1; i < c.pts.length; i++) {
          ctx.lineTo(toX(c.pts[i][0]), toY(c.pts[i][1]));
        }
        ctx.closePath();
        if (c.hl) {
          const alpha = c.bright ? 0.12 : 0.06;
          const strokeAlpha = c.bright ? 0.35 : 0.20;
          const col = c.hlColor!;
          const rgb = hexToRgb(col);
          ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
          ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${strokeAlpha})`;
          ctx.lineWidth = c.bright ? 1.5 : 1.0;
        } else {
          ctx.fillStyle = 'rgba(255,255,255,0.028)';
          ctx.strokeStyle = 'rgba(255,255,255,0.10)';
          ctx.lineWidth = 0.65;
        }
        ctx.fill();
        ctx.stroke();
      }

      // 3. Scatter dots
      for (const [lon, lat] of DOTS) {
        const x = toX(lon), y = toY(lat);
        if (x < 0 || x > W || y < 0 || y > H) continue;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fill();
      }

      // 4. Arcs + travelling dots
      const cityPts = CITIES.map(c => ({ x: toX(c.lon), y: toY(c.lat), color: c.color }));

      for (let ai = 0; ai < ARCS.length; ai++) {
        const arc = ARCS[ai];
        const p0 = cityPts[arc.from];
        const p2 = cityPts[arc.to];
        const cp = {
          x: (p0.x + p2.x) / 2 + arc.cpOffset[0],
          y: (p0.y + p2.y) / 2 + arc.cpOffset[1],
        };

        // Draw dashed arc
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.lineDashOffset = -(time * 22) % 18;
        ctx.stroke();
        ctx.setLineDash([]);

        // 3 travelling dots on this arc
        const c1 = hexToRgb(cityPts[arc.from].color);
        const c2 = hexToRgb(cityPts[arc.to].color);
        for (let di = 0; di < 3; di++) {
          const prog = ((time * 0.38 + ai * 0.28 + di * 0.333)) % 1;
          const [dx, dy] = bezier(p0.x, p0.y, cp.x, cp.y, p2.x, p2.y, prog);
          const fade = prog < 0.1 ? prog / 0.1 : prog > 0.9 ? (1 - prog) / 0.1 : 1;
          const rgb = hexToRgb(cityPts[arc.from].color);
          const rgb2 = hexToRgb(cityPts[arc.to].color);
          // glow
          const grd = ctx.createRadialGradient(dx, dy, 0, dx, dy, 7);
          grd.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${0.4 * fade})`);
          grd.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(dx, dy, 7, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
          // dot
          ctx.beginPath();
          ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${Math.round(lerp(rgb[0], rgb2[0], prog))},${Math.round(lerp(rgb[1], rgb2[1], prog))},${Math.round(lerp(rgb[2], rgb2[2], prog))},${fade})`;
          ctx.fill();
        }
      }

      // 5. City markers
      for (let ci = 0; ci < CITIES.length; ci++) {
        const city = CITIES[ci];
        const x = toX(city.lon), y = toY(city.lat);
        const col = city.color;
        const rgb = hexToRgb(col);
        const pulse = Math.sin(time * 1.6 + ci * 1.1);

        // Outer aura
        const r1 = 42 + pulse * 4;
        const g1 = ctx.createRadialGradient(x, y, 0, x, y, r1);
        g1.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.10)`);
        g1.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(x, y, r1, 0, Math.PI * 2);
        ctx.fillStyle = g1;
        ctx.fill();

        // Mid aura
        const r2 = 20 + pulse * 2;
        const g2 = ctx.createRadialGradient(x, y, 0, x, y, r2);
        g2.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.22)`);
        g2.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(x, y, r2, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();

        // Inner aura
        const g3 = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g3.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.55)`);
        g3.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = g3;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();

        // White pinprick
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fill();

        // Label
        ctx.font = "500 10.5px 'Exo 2', sans-serif";
        ctx.textAlign = 'center';
        const labelY = city.labelAbove ? y - 18 : y + 22;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillText(city.name.toUpperCase(), x, labelY);

        // Accent line under label
        const tw = ctx.measureText(city.name.toUpperCase()).width;
        const lineY = labelY + 3;
        ctx.beginPath();
        ctx.moveTo(x - tw / 2, lineY);
        ctx.lineTo(x + tw / 2, lineY);
        ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.6)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 6. Vignette overlay
      const vign = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, W * 0.75);
      vign.addColorStop(0, 'rgba(0,0,0,0)');
      vign.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, W, H);

      time += 0.016;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="world-map-wrap" style={{ lineHeight: 0 }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', maxWidth: W }} />
    </div>
  );
}
