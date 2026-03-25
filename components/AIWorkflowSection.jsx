'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── layout constants ────────────────────────────────────────────────────────
const NW = 110, NH = 54;       // node w/h desktop
const NWM = 86,  NHM = 44;    // node w/h mobile
const SPEED_D    = 140;        // px/s desktop
const SPEED_M    = 100;        // px/s mobile
const DOT_GRID   = 36;
const TRAIL_LEN  = 20;
const RING_DUR   = 600;        // ms
const ROUTER_DUR = 300;        // ms
const DRAMATIC_INTERVAL = 8000; // ms
const MOBILE_BP  = 768;

// Desktop: column x as % of canvas width (left-edge), row y as % of canvas height (center)
const DCX = [0.07, 0.22, 0.37, 0.55, 0.72, 0.89];
const DRY = [0.20, 0.50, 0.80];

// Mobile: row y as % of canvas height (center), col x as % of canvas width (center)
const MRY = [0.08, 0.22, 0.36, 0.52, 0.68, 0.84];
const MCX = [0.20, 0.50, 0.80];

// ─── node definitions ────────────────────────────────────────────────────────
const NODES = [
  { id:'new-lead',     label:'New Lead In',    type:'TRIGGER', color:'#F5C540', dc:0, dr:1, mc:1, mr:0 },
  { id:'ai-qualify',   label:'AI Qualify',      type:'AI',      color:'#818cf8', dc:1, dr:1, mc:1, mr:1 },
  { id:'lead-router',  label:'Lead Router',     type:'ROUTER',  color:'#c084fc', dc:2, dr:1, mc:1, mr:2 },
  { id:'enrich',       label:'Enrich',          type:'ENRICH',  color:'#2dd4bf', dc:3, dr:0, mc:0, mr:3 },
  { id:'log-contact',  label:'Log Contact',     type:'LOG',     color:'#34d399', dc:3, dr:1, mc:1, mr:3 },
  { id:'tag-low',      label:'Tag: Low',        type:'TAG',     color:'#f87171', dc:3, dr:2, mc:2, mr:3 },
  { id:'route-agent',  label:'Route Agent',     type:'ROUTE',   color:'#f472b6', dc:4, dr:0, mc:0, mr:4 },
  { id:'email-drip',   label:'Email Drip',      type:'EMAIL',   color:'#60a5fa', dc:4, dr:1, mc:1, mr:4 },
  { id:'nurture-30d',  label:'Nurture 30d',     type:'NURTURE', color:'#fb923c', dc:4, dr:2, mc:2, mr:4 },
  { id:'whatsapp-crm', label:'WhatsApp + CRM',  type:'ACTION',  color:'#4ade80', dc:5, dr:0, mc:0, mr:5 },
  { id:'pipeline-upd', label:'Pipeline Update', type:'CRM',     color:'#fbbf24', dc:5, dr:1, mc:1, mr:5 },
  { id:'archive',      label:'Archive',         type:'ARCHIVE', color:'#6b7280', dc:5, dr:2, mc:2, mr:5 },
];

// ─── stream definitions ───────────────────────────────────────────────────────
const STREAMS = [
  {
    id:'green',  color:'#4ade80',
    nodeIds:['new-lead','ai-qualify','lead-router','enrich','route-agent','whatsapp-crm'],
    notifs:['Score: 91 🔥','Agent assigned','WhatsApp sent ✓','Deal created! 🎯'],
    dc:{ leads:1, hours:2.5, revenue:420 },
  },
  {
    id:'yellow', color:'#fbbf24',
    nodeIds:['new-lead','ai-qualify','lead-router','log-contact','email-drip','pipeline-upd'],
    notifs:['Score: 58','Logged to Airtable','Email drip live','Pipeline updated'],
    dc:{ leads:1, hours:1.4, revenue:190 },
  },
  {
    id:'red',    color:'#f87171',
    nodeIds:['new-lead','ai-qualify','lead-router','tag-low','nurture-30d','archive'],
    notifs:['Score: 19','Tagged: nurture','30d sequence on','Watching…'],
    dc:{ leads:1, hours:0.3, revenue:35 },
  },
];

// ─── pure helpers ─────────────────────────────────────────────────────────────
function hexRgb(h) {
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`;
}

function nodeRect(n, W, H, mob) {
  const nw = mob ? NWM : NW;
  const nh = mob ? NHM : NH;
  // Desktop: DCX is left-edge %; DRY is center %
  // Mobile:  MCX is center %; MRY is center %
  const lx = mob ? MCX[n.mc] * W - nw / 2 : DCX[n.dc] * W;
  const cy = mob ? MRY[n.mr] * H          : DRY[n.dr] * H;
  const ly = cy - nh / 2;
  return { lx, ly, cx: lx + nw / 2, cy, nw, nh };
}

function mkWaypoints(ax, ay, bx, by, mob) {
  if (mob) {
    if (Math.abs(ax - bx) < 1) return [[ax,ay],[bx,by]];
    const my = (ay + by) / 2;
    return [[ax,ay],[ax,my],[bx,my],[bx,by]];
  } else {
    if (Math.abs(ay - by) < 1) return [[ax,ay],[bx,by]];
    const mx = (ax + bx) / 2;
    return [[ax,ay],[mx,ay],[mx,by],[bx,by]];
  }
}

function segLens(pts) {
  const ls = []; let tot = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i+1][0] - pts[i][0], pts[i+1][1] - pts[i][1]);
    ls.push(l); tot += l;
  }
  return { ls, tot };
}

function posAt(pts, ls, d) {
  let acc = 0;
  for (let i = 0; i < ls.length; i++) {
    if (acc + ls[i] >= d - 0.001) {
      const t = ls[i] < 0.001 ? 0 : (d - acc) / ls[i];
      return [pts[i][0] + t * (pts[i+1][0] - pts[i][0]),
              pts[i][1] + t * (pts[i+1][1] - pts[i][1])];
    }
    acc += ls[i];
  }
  return [pts[pts.length-1][0], pts[pts.length-1][1]];
}

function getPos(p, segs) {
  if (p.si >= segs.length) {
    const s = segs[segs.length - 1];
    return [s.pts[s.pts.length-1][0], s.pts[s.pts.length-1][1]];
  }
  const s = segs[p.si];
  return posAt(s.pts, s.ls, Math.min(p.d, s.tot));
}

function buildPaths(W, H, mob) {
  const pos = {};
  for (const n of NODES) {
    const r = nodeRect(n, W, H, mob);
    pos[n.id] = [r.cx, r.cy];
  }
  return STREAMS.map(stream => {
    const segs = [];
    for (let i = 0; i < stream.nodeIds.length - 1; i++) {
      const [ax, ay] = pos[stream.nodeIds[i]];
      const [bx, by] = pos[stream.nodeIds[i + 1]];
      const pts = mkWaypoints(ax, ay, bx, by, mob);
      const { ls, tot } = segLens(pts);
      segs.push({ pts, ls, tot, toId: stream.nodeIds[i + 1] });
    }
    const totalLen = segs.reduce((s, g) => s + g.tot, 0);
    return { segs, totalLen };
  });
}

function mkParticle(paths, si, frac, isVIP = false, isSurge = false) {
  const { segs, totalLen } = paths[si];
  let rem = (((frac % 1) + 1) % 1) * totalLen;
  let segI = 0, d = rem;
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i].tot) { segI = i; break; }
    d -= segs[i].tot; segI = i + 1;
  }
  if (segI >= segs.length) { segI = segs.length - 1; d = segs[segI].tot; }
  return { si: segI, d, trail: [], streamIdx: si, isVIP, isSurge, id: Math.random().toString(36).slice(2) };
}

function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);   ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);   ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x,     y + r);   ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

// ─── component ────────────────────────────────────────────────────────────────
export default function AIWorkflowSection() {
  const canvasRef   = useRef(null);
  const wrapRef     = useRef(null);
  const notifRef    = useRef(null);
  const sectionRef  = useRef(null);
  const rafRef      = useRef(null);
  const resizeTimer = useRef(null);
  const ctxRef      = useRef(null);

  // Counter display spans
  const cLeads = useRef(null);
  const cHours = useRef(null);
  const cRev   = useRef(null);

  // All mutable animation state lives here (never causes re-renders)
  const st = useRef({
    W: 0, H: 0, mob: false,
    paths: [],
    particles: [],
    tick: 0,
    lastTime: 0,
    rings: [],           // { x, y, color, t }
    routerBurst: null,   // { x, y, t }
    bottleneck: null,    // { t, dur }
    counters: { leads: 12400, hours: 850, revenue: 2100000 },
    notifDb: {},         // particleId+segIdx → timestamp
    dramaticNext: DRAMATIC_INTERVAL,
    prm: false,          // prefers-reduced-motion
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    const sect   = sectionRef.current;
    if (!canvas || !wrap) return;

    st.current.prm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── layout init ──────────────────────────────────────────────────────
    function setupLayout() {
      const W   = wrap.clientWidth;
      const mob = W < MOBILE_BP;
      const H   = mob ? 560 : 480;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;

      const s = st.current;
      s.W = W; s.H = H; s.mob = mob;
      s.paths = buildPaths(W, H, mob);
      s.rings = [];
      s.routerBurst = null;
      s.bottleneck  = null;

      // 3 particles per stream
      const ps = [];
      for (let si = 0; si < 3; si++) {
        [0, 0.33, 0.66].forEach(frac => ps.push(mkParticle(s.paths, si, frac)));
      }
      s.particles = ps;
    }

    // ── notifications ─────────────────────────────────────────────────────
    function spawnNotif(text, x, y, color, mob) {
      const cont = notifRef.current;
      if (!cont) return;
      const el = document.createElement('div');
      el.textContent = text;
      const rgb = hexRgb(color);
      const t0 = mob ? y + 50 : y - 20;
      const t1 = mob ? y + 80 : y - 58;
      el.style.cssText = `position:absolute;left:${x}px;top:${t0}px;background:rgba(${rgb},0.12);border:1px solid rgba(${rgb},0.4);color:${color};font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;pointer-events:none;transform:translateX(-50%);white-space:nowrap;font-family:'Exo',sans-serif;opacity:1;z-index:10;`;
      cont.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 1s,top 1s';
        el.style.opacity = '0';
        el.style.top = `${t1}px`;
      });
      setTimeout(() => el.parentNode && el.remove(), 1100);
    }

    function spawnSysNotif(text, color) {
      const cont = notifRef.current;
      if (!cont) return;
      const el = document.createElement('div');
      el.textContent = text;
      const rgb = hexRgb(color);
      el.style.cssText = `position:absolute;top:10px;left:50%;transform:translateX(-50%);background:rgba(${rgb},0.15);border:1px solid rgba(${rgb},0.5);color:${color};font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;pointer-events:none;white-space:nowrap;font-family:'Exo',sans-serif;z-index:20;opacity:1;transition:opacity 0.5s;`;
      cont.appendChild(el);
      setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.parentNode && el.remove(), 600); }, 2000);
    }

    // ── counter display ───────────────────────────────────────────────────
    function updateCounters() {
      const { leads, hours, revenue } = st.current.counters;
      if (cLeads.current) cLeads.current.textContent = Math.round(leads).toLocaleString() + '+';
      if (cHours.current) cHours.current.textContent = Math.round(hours);
      if (cRev.current)   cRev.current.textContent   = revenue >= 1e6 ? `$${(revenue / 1e6).toFixed(1)}M` : `$${Math.round(revenue / 1000)}K`;
    }

    // ── dramatic events ───────────────────────────────────────────────────
    function triggerDramatic() {
      const type = ['surge', 'bottleneck', 'vip'][Math.floor(Math.random() * 3)];
      if (type === 'surge') {
        spawnSysNotif('Lead surge detected', '#F5C540');
        [0, 0.15].forEach(frac => {
          st.current.particles.push(mkParticle(st.current.paths, 0, frac, false, true));
        });
        setTimeout(() => { st.current.particles = st.current.particles.filter(p => !p.isSurge); }, 4000);
      } else if (type === 'bottleneck') {
        spawnSysNotif('AI processing at capacity', '#f87171');
        st.current.bottleneck = { t: 0, dur: 1500 };
        setTimeout(() => {
          spawnSysNotif('✓ Resolved', '#4ade80');
          st.current.bottleneck = null;
        }, 1600);
      } else {
        spawnSysNotif('VIP lead detected 🌟', '#FFD700');
        const vip = mkParticle(st.current.paths, 0, Math.random(), true, false);
        vip.vipSpeed = 2;
        st.current.particles.push(vip);
        setTimeout(() => { st.current.particles = st.current.particles.filter(p => !p.isVIP); }, 6000);
      }
    }

    // ── main draw loop ────────────────────────────────────────────────────
    function draw(timestamp) {
      const ctx = ctxRef.current;
      const s   = st.current;
      if (!ctx || !s.W) { rafRef.current = requestAnimationFrame(draw); return; }

      const dt = Math.min(s.lastTime ? (timestamp - s.lastTime) / 1000 : 0.016, 0.05);
      s.lastTime = timestamp;
      s.tick++;

      const { W, H, mob, paths, particles } = s;
      const nw    = mob ? NWM : NW;
      const nh    = mob ? NHM : NH;
      const speed = mob ? SPEED_M : SPEED_D;

      // Clear + background
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#080a0f';
      ctx.fillRect(0, 0, W, H);

      // Dot grid
      ctx.fillStyle = 'rgba(255,255,255,0.025)';
      for (let x = 0; x < W; x += DOT_GRID)
        for (let y = 0; y < H; y += DOT_GRID) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
        }

      // Ghost connector trails
      for (let si = 0; si < STREAMS.length; si++) {
        const rgb = hexRgb(STREAMS[si].color);
        ctx.save();
        ctx.strokeStyle = `rgba(${rgb},0.12)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 9]);
        for (const seg of paths[si].segs) {
          ctx.beginPath();
          ctx.moveTo(seg.pts[0][0], seg.pts[0][1]);
          for (let i = 1; i < seg.pts.length; i++) ctx.lineTo(seg.pts[i][0], seg.pts[i][1]);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Nodes
      for (const n of NODES) {
        const { lx, ly } = nodeRect(n, W, H, mob);
        const rgb   = hexRgb(n.color);
        const isBN  = s.bottleneck && n.id === 'ai-qualify';
        const pulse = isBN ? (Math.sin(s.tick * 0.25) > 0 ? '#f87171' : '#4b1111') : null;

        ctx.save();
        ctx.shadowColor = n.color;
        ctx.shadowBlur  = 14;
        rrect(ctx, lx, ly, nw, nh, 5);
        ctx.fillStyle = '#111318';
        ctx.fill();
        ctx.lineWidth   = isBN ? 2 : 1;
        ctx.strokeStyle = pulse ?? `rgba(${rgb},0.3)`;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Top tint
        ctx.save();
        ctx.beginPath(); ctx.rect(lx + 1, ly + 1, nw - 2, 16); ctx.clip();
        ctx.fillStyle = `rgba(${rgb},0.07)`;
        ctx.fillRect(lx + 1, ly + 1, nw - 2, 16);
        ctx.restore();

        // Left accent bar
        ctx.fillStyle = n.color;
        ctx.fillRect(lx, ly, 3, nh);

        // Type badge
        ctx.fillStyle    = n.color;
        ctx.font         = `700 7px 'Exo',sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(n.type, lx + 8, ly + 5);

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font      = `500 ${mob ? 9.5 : 10.5}px 'Exo',sans-serif`;
        ctx.fillText(n.label, lx + 8, ly + 18);

        ctx.restore();
      }

      // ── particles + effects (skip if reduced motion) ──────────────────
      if (!s.prm) {
        for (let pi = particles.length - 1; pi >= 0; pi--) {
          const p      = particles[pi];
          const stream = STREAMS[p.streamIdx];
          const path   = paths[p.streamIdx];
          const pSpeed = speed * (p.vipSpeed || 1);
          const pColor = p.isVIP ? '#FFD700' : stream.color;
          const pRgb   = p.isVIP ? '255,215,0' : hexRgb(stream.color);
          const pR     = p.isVIP ? 5 : 4;

          // Current position
          const pos = getPos(p, path.segs);
          p.trail.push([pos[0], pos[1]]);
          if (p.trail.length > TRAIL_LEN) p.trail.shift();

          // Advance
          p.d += pSpeed * dt;

          // Segment transitions
          while (p.si < path.segs.length && p.d >= path.segs[p.si].tot) {
            p.d -= path.segs[p.si].tot;
            const arrivedSeg = path.segs[p.si];
            p.si++;

            const arrivedNode = NODES.find(n => n.id === arrivedSeg.toId);
            if (arrivedNode) {
              const r = nodeRect(arrivedNode, W, H, mob);
              // Ring burst
              s.rings.push({ x: r.cx, y: r.cy, color: stream.color, t: 0 });
              // Router burst
              if (arrivedSeg.toId === 'lead-router') {
                s.routerBurst = { x: r.cx, y: r.cy, t: 0 };
              }
              // Notifications on col/row 3+
              const isLate = mob ? arrivedNode.mr >= 3 : arrivedNode.dc >= 3;
              if (isLate && !p.isSurge) {
                const now = Date.now();
                const key = `${p.id}-${p.si}`;
                if (!s.notifDb[key] || now - s.notifDb[key] > 2000) {
                  s.notifDb[key] = now;
                  const idx = mob ? arrivedNode.mr - 3 : arrivedNode.dc - 3;
                  const msg = stream.notifs[idx];
                  if (msg) spawnNotif(msg, r.cx, r.cy, stream.color, mob);
                }
              }
            }
          }

          // Path complete
          if (p.si >= path.segs.length) {
            if (p.isSurge || p.isVIP) {
              particles.splice(pi, 1); continue;
            }
            s.counters.leads   += stream.dc.leads;
            s.counters.hours   += stream.dc.hours;
            s.counters.revenue += stream.dc.revenue;
            updateCounters();
            p.si = 0; p.d = 0; p.trail = [];
            continue;
          }

          // Draw trail
          if (p.trail.length > 1) {
            ctx.save();
            for (let t = 0; t < p.trail.length - 1; t++) {
              ctx.strokeStyle = `rgba(${pRgb},${(t / p.trail.length) * 0.5})`;
              ctx.lineWidth   = 1.5 * (t / p.trail.length);
              ctx.beginPath();
              ctx.moveTo(p.trail[t][0], p.trail[t][1]);
              ctx.lineTo(p.trail[t+1][0], p.trail[t+1][1]);
              ctx.stroke();
            }
            ctx.restore();
          }

          // Draw particle
          const cur = getPos(p, path.segs);
          ctx.save();
          ctx.shadowColor = pColor;
          ctx.shadowBlur  = 7;
          ctx.fillStyle   = `rgba(${pRgb},0.15)`;
          ctx.beginPath(); ctx.arc(cur[0], cur[1], 7, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur  = p.isVIP ? 20 : 7;
          ctx.fillStyle   = pColor;
          ctx.beginPath(); ctx.arc(cur[0], cur[1], pR, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur  = 0;
          ctx.fillStyle   = 'rgba(255,255,255,0.85)';
          ctx.beginPath(); ctx.arc(cur[0] - 1, cur[1] - 1.5, 1.5, 0, Math.PI * 2); ctx.fill();
          ctx.restore();

          // AI Qualify thinking dots
          const aiNode = NODES.find(n => n.id === 'ai-qualify');
          if (aiNode) {
            const ar   = nodeRect(aiNode, W, H, mob);
            const dist = Math.hypot(cur[0] - ar.cx, cur[1] - ar.cy);
            if (dist < 60) {
              ctx.save();
              for (let d = 0; d < 4; d++) {
                const a = 0.2 + 0.7 * ((Math.sin(s.tick * 0.05 + d * 1.4) + 1) / 2);
                ctx.fillStyle = `rgba(129,140,248,${a})`;
                ctx.beginPath();
                if (mob) ctx.arc(ar.lx + nw + 6 + d * 6, ar.cy, 1.8, 0, Math.PI * 2);
                else     ctx.arc(ar.cx - 9 + d * 6, ar.ly - 8, 1.8, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();
            }
          }
        } // end particle loop

        // Ring bursts
        for (let ri = s.rings.length - 1; ri >= 0; ri--) {
          const ring = s.rings[ri];
          ring.t += dt * 1000;
          if (ring.t >= RING_DUR) { s.rings.splice(ri, 1); continue; }
          const prog = ring.t / RING_DUR;
          const rgb  = hexRgb(ring.color);
          ctx.save();
          ctx.strokeStyle = `rgba(${rgb},${0.7 * (1 - prog)})`;
          ctx.lineWidth   = 1.5;
          ctx.beginPath(); ctx.arc(ring.x, ring.y, 8 + 22 * prog, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }

        // Router burst
        if (s.routerBurst) {
          s.routerBurst.t += dt * 1000;
          if (s.routerBurst.t >= ROUTER_DUR) {
            s.routerBurst = null;
          } else {
            const { x: rx, y: ry, t } = s.routerBurst;
            const prog   = t / ROUTER_DUR;
            const len    = 30 * prog;
            const fade   = 1 - prog;
            const angles = mob
              ? [-Math.PI / 2, Math.PI / 6, -5 * Math.PI / 6]
              : [-Math.PI / 4, 0, Math.PI / 4];
            ctx.save();
            STREAMS.forEach((str, i) => {
              const rgb = hexRgb(str.color);
              ctx.strokeStyle = `rgba(${rgb},${fade * 0.8})`;
              ctx.lineWidth   = 2;
              ctx.beginPath();
              ctx.moveTo(rx, ry);
              ctx.lineTo(rx + Math.cos(angles[i]) * len, ry + Math.sin(angles[i]) * len);
              ctx.stroke();
            });
            ctx.restore();
          }
        }

        // Bottleneck timer
        if (s.bottleneck) {
          s.bottleneck.t += dt * 1000;
          if (s.bottleneck.t >= s.bottleneck.dur) s.bottleneck = null;
        }

        // Dramatic events countdown
        s.dramaticNext -= dt * 1000;
        if (s.dramaticNext <= 0) {
          s.dramaticNext = DRAMATIC_INTERVAL + Math.random() * 3000;
          triggerDramatic();
        }
      } // end !prm

      rafRef.current = requestAnimationFrame(draw);
    }

    // ── stats count-up animation ──────────────────────────────────────────
    function animateStats() {
      const snap  = { ...st.current.counters };
      const dur   = 2000;
      const start = performance.now();
      function tick(now) {
        const raw = Math.min((now - start) / dur, 1);
        const t   = 1 - Math.pow(1 - raw, 3); // ease-out cubic
        if (cLeads.current) cLeads.current.textContent = Math.round(t * snap.leads).toLocaleString() + '+';
        if (cHours.current) cHours.current.textContent = Math.round(t * snap.hours);
        if (cRev.current)   cRev.current.textContent   = `$${(t * (snap.revenue / 1e6)).toFixed(1)}M`;
        if (raw < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    // ── init ─────────────────────────────────────────────────────────────
    setupLayout();
    updateCounters();
    rafRef.current = requestAnimationFrame(draw);

    // ── resize ───────────────────────────────────────────────────────────
    function onResize() {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(setupLayout, 200);
    }
    window.addEventListener('resize', onResize);

    // ── IntersectionObserver: restart count-up on each entry ─────────────
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) animateStats(); });
    }, { threshold: 0.15 });
    if (sect) observer.observe(sect);
    // If already visible on load
    if (sect) {
      const r = sect.getBoundingClientRect();
      if (r.top < window.innerHeight) animateStats();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer.current);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ background:'#080a0f', margin:'0', padding:'72px 0 0' }}>
      <style>{`
        .aiwf-inner   { max-width:1100px; margin:0 auto; padding:0 clamp(24px,5vw,72px); }
        .aiwf-tag     { display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#818cf8;margin-bottom:18px;font-family:'Exo',sans-serif; }
        .aiwf-hed     { font-family:'Exo',sans-serif;font-size:clamp(22px,3.2vw,38px);font-weight:800;letter-spacing:-1px;line-height:1.1;color:#fff;margin-bottom:36px;max-width:680px; }
        .aiwf-stats   { display:flex;margin-bottom:28px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;overflow:hidden; }
        .aiwf-sstat   { flex:1;padding:20px 24px;border-right:1px solid rgba(255,255,255,0.07); }
        .aiwf-sstat:last-child { border-right:none; }
        .aiwf-sv      { font-family:'Exo',sans-serif;font-size:clamp(22px,2.6vw,32px);font-weight:800;line-height:1;margin-bottom:6px; }
        .aiwf-sl      { font-size:11px;color:rgba(255,255,255,0.38);letter-spacing:0.3px; }
        .aiwf-cvs     { position:relative;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.07); }
        .aiwf-notif   { position:absolute;inset:0;pointer-events:none;overflow:hidden; }
        .aiwf-cta     { display:flex;justify-content:space-between;align-items:center;padding:40px clamp(24px,5vw,72px) 72px;max-width:1100px;margin:0 auto;gap:32px; }
        .aiwf-cta-h   { font-family:'Exo',sans-serif;font-size:clamp(18px,2.2vw,26px);font-weight:800;letter-spacing:-0.5px;color:#fff;margin-bottom:10px; }
        .aiwf-cta-s   { font-size:14px;color:rgba(255,255,255,0.42);font-weight:300;line-height:1.7;max-width:420px; }
        .aiwf-btns    { display:flex;gap:12px;flex-shrink:0; }
        .aiwf-btn-g   { border-color:#F5C540 !important; color:#F5C540 !important; }
        @media(max-width:768px){
          .aiwf-stats { flex-direction:column; }
          .aiwf-sstat { border-right:none;border-bottom:1px solid rgba(255,255,255,0.07); }
          .aiwf-sstat:last-child { border-bottom:none; }
          .aiwf-cta   { flex-direction:column;text-align:center; }
          .aiwf-cta-s { max-width:100%; }
          .aiwf-btns  { flex-direction:column;width:100%; }
          .aiwf-btns a{ display:block;text-align:center; }
        }
      `}</style>

      <div className="aiwf-inner">
        {/* Section tag */}
        <div className="aiwf-tag">
          <span style={{ width:18, height:1, background:'#818cf8', display:'inline-block' }} />
          See it in action
        </div>

        {/* Headline */}
        <h2 className="aiwf-hed">This is what your business looks like on autopilot.</h2>

        {/* Stats counters */}
        <div className="aiwf-stats">
          <div className="aiwf-sstat">
            <div className="aiwf-sv" style={{ color:'#fff' }}>
              <span ref={cLeads}>12,400+</span>
            </div>
            <div className="aiwf-sl">Leads processed</div>
          </div>
          <div className="aiwf-sstat">
            <div className="aiwf-sv" style={{ color:'#4ade80' }}>
              <span ref={cHours}>850</span>
            </div>
            <div className="aiwf-sl">Hours saved / mo</div>
          </div>
          <div className="aiwf-sstat">
            <div className="aiwf-sv" style={{ color:'#F5C540' }}>
              <span ref={cRev}>$2.1M</span>
            </div>
            <div className="aiwf-sl">Revenue potential</div>
          </div>
        </div>

        {/* Canvas */}
        <div ref={wrapRef} className="aiwf-cvs">
          <canvas ref={canvasRef} style={{ display:'block' }} />
          <div ref={notifRef} className="aiwf-notif" />
        </div>
      </div>

      {/* CTA footer */}
      <div className="aiwf-cta">
        <div>
          <div className="aiwf-cta-h">Ready to run this on your business?</div>
          <p className="aiwf-cta-s">We map your workflows, build the automations, and hand over a system that runs itself.</p>
        </div>
        <div className="aiwf-btns">
          <Link href="/contact" className="btn btn-y">Automate my business →</Link>
          <Link href="/services/ai-automation" className="btn btn-outline aiwf-btn-g">See how it works</Link>
        </div>
      </div>
    </section>
  );
}
