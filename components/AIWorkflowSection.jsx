'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── constants ────────────────────────────────────────────────────────────────
const NW = 108, NH = 54;
const NWM = 82, NHM = 42;
const SPEED_D = 90;
const SPEED_M = 65;
const MAX_NOTIFS = 2;
const COL_PCT_DESKTOP = [0.07, 0.20, 0.33, 0.50, 0.66, 0.84];
const TRAIL_LEN = 20;
const RING_DUR  = 600;
const ROUTER_DUR = 300;
const FINAL_RING_DUR = 700;
const DRAMATIC_INTERVAL = 8000;
const MOBILE_BP = 768;
const DOT_COUNT = 120;

// Mobile layout percentages (centers)
const MRY = [0.07, 0.19, 0.31, 0.47, 0.63, 0.79];
const MCX = [0.20, 0.50, 0.80];

// Desktop row centers
const DRY = [0.20, 0.50, 0.80];

// Light pools (drawn each frame over black)
const POOLS = [
  { x: 0.15, y: 0.3,  r: 0.22, c: '#4ade80', a: 0.04  },
  { x: 0.5,  y: 0.5,  r: 0.28, c: '#818cf8', a: 0.035 },
  { x: 0.82, y: 0.25, r: 0.2,  c: '#F5C540', a: 0.04  },
  { x: 0.65, y: 0.8,  r: 0.18, c: '#f472b6', a: 0.03  },
];

// Per-stream completion notifications
const COMPLETION_MSGS = [
  '🎯  Deal created — +$420 revenue',
  '⏱  1.4 hrs saved this cycle',
  '✉  Lead in nurture — re-scores in 30d',
];

// ─── node definitions ─────────────────────────────────────────────────────────
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
  { id:'green',  color:'#4ade80', nodeIds:['new-lead','ai-qualify','lead-router','enrich','route-agent','whatsapp-crm'],    notifs:['Score: 91 🔥','Agent assigned','WhatsApp sent ✓','Deal created! 🎯'], dc:{ leads:1, hours:2.5, revenue:420 } },
  { id:'yellow', color:'#fbbf24', nodeIds:['new-lead','ai-qualify','lead-router','log-contact','email-drip','pipeline-upd'], notifs:['Score: 58','Logged to Airtable','Email drip live','Pipeline updated'],   dc:{ leads:1, hours:1.4, revenue:190 } },
  { id:'red',    color:'#f87171', nodeIds:['new-lead','ai-qualify','lead-router','tag-low','nurture-30d','archive'],          notifs:['Score: 19','Tagged: nurture','30d sequence on','Watching…'],             dc:{ leads:1, hours:0.3, revenue:35  } },
];

// ─── pure helpers ─────────────────────────────────────────────────────────────
function hexRgb(h) {
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`;
}

function nodeRect(n, W, H, mob) {
  const narrow = !mob && W < 700;
  const nw = mob ? NWM : (narrow ? 88 : NW);
  const nh = mob ? NHM : (narrow ? 46 : NH);
  let cx, cy;
  if (mob) {
    cx = MCX[n.mc] * W;
    cy = MRY[n.mr] * H;
  } else {
    cx = COL_PCT_DESKTOP[n.dc] * W;
    cy = DRY[n.dr] * H;
  }
  return { lx: cx - nw / 2, ly: cy - nh / 2, cx, cy, nw, nh };
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
    const l = Math.hypot(pts[i+1][0]-pts[i][0], pts[i+1][1]-pts[i][1]);
    ls.push(l); tot += l;
  }
  return { ls, tot };
}

function posAt(pts, ls, d) {
  let acc = 0;
  for (let i = 0; i < ls.length; i++) {
    if (acc + ls[i] >= d - 0.001) {
      const t = ls[i] < 0.001 ? 0 : (d - acc) / ls[i];
      return [pts[i][0]+t*(pts[i+1][0]-pts[i][0]), pts[i][1]+t*(pts[i+1][1]-pts[i][1])];
    }
    acc += ls[i];
  }
  return [pts[pts.length-1][0], pts[pts.length-1][1]];
}

function getPos(p, segs) {
  if (p.si >= segs.length) { const s=segs[segs.length-1]; return [s.pts[s.pts.length-1][0],s.pts[s.pts.length-1][1]]; }
  const s = segs[p.si];
  return posAt(s.pts, s.ls, Math.min(p.d, s.tot));
}

function buildPaths(W, H, mob) {
  const pos = {};
  for (const n of NODES) { const r=nodeRect(n,W,H,mob); pos[n.id]=[r.cx,r.cy]; }
  return STREAMS.map(stream => {
    const segs = [];
    for (let i = 0; i < stream.nodeIds.length-1; i++) {
      const [ax,ay]=pos[stream.nodeIds[i]], [bx,by]=pos[stream.nodeIds[i+1]];
      const pts=mkWaypoints(ax,ay,bx,by,mob), {ls,tot}=segLens(pts);
      segs.push({pts,ls,tot,toId:stream.nodeIds[i+1]});
    }
    return {segs, totalLen:segs.reduce((s,g)=>s+g.tot,0)};
  });
}

function mkParticle(paths, si, frac, isVIP=false, isSurge=false) {
  const {segs,totalLen}=paths[si];
  let rem=(((frac%1)+1)%1)*totalLen, segI=0, d=rem;
  for(let i=0;i<segs.length;i++){if(d<=segs[i].tot){segI=i;break;}d-=segs[i].tot;segI=i+1;}
  if(segI>=segs.length){segI=segs.length-1;d=segs[segI].tot;}
  return {si:segI,d,trail:[],streamIdx:si,isVIP,isSurge,id:Math.random().toString(36).slice(2)};
}

// ─── canvas shape primitives ──────────────────────────────────────────────────
function rrect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
  ctx.closePath();
}

function pathHex(ctx,cx,cy,bw,bh){
  const rx=bw/2, ry=bh/2;
  ctx.beginPath();
  for(let i=0;i<6;i++){const a=(Math.PI/3)*i-Math.PI/6; i===0?ctx.moveTo(cx+rx*Math.cos(a),cy+ry*Math.sin(a)):ctx.lineTo(cx+rx*Math.cos(a),cy+ry*Math.sin(a));}
  ctx.closePath();
}

function pathDiamond(ctx,cx,cy,bw,bh){
  ctx.beginPath();
  ctx.moveTo(cx,cy-bh/2); ctx.lineTo(cx+bw/2,cy); ctx.lineTo(cx,cy+bh/2); ctx.lineTo(cx-bw/2,cy);
  ctx.closePath();
}

function pathPill(ctx,lx,ly,bw,bh){
  const r=bh/2;
  ctx.beginPath();
  ctx.moveTo(lx+r,ly); ctx.lineTo(lx+bw-r,ly); ctx.arcTo(lx+bw,ly,lx+bw,ly+bh,r); ctx.arcTo(lx+bw,ly+bh,lx,ly+bh,r); ctx.lineTo(lx+r,ly+bh); ctx.arcTo(lx,ly+bh,lx,ly,r); ctx.arcTo(lx,ly,lx+bw,ly,r);
  ctx.closePath();
}

function pathNotched(ctx,lx,ly,bw,bh,r,notch){
  ctx.beginPath();
  ctx.moveTo(lx+r,ly); ctx.lineTo(lx+bw-notch,ly); ctx.lineTo(lx+bw,ly+notch);
  ctx.lineTo(lx+bw,ly+bh-r); ctx.arcTo(lx+bw,ly+bh,lx+bw-r,ly+bh,r);
  ctx.lineTo(lx+r,ly+bh); ctx.arcTo(lx,ly+bh,lx,ly+bh-r,r);
  ctx.lineTo(lx,ly+r); ctx.arcTo(lx,ly,lx+r,ly,r);
  ctx.closePath();
}

// ─── node renderer ────────────────────────────────────────────────────────────
function drawNode(ctx, n, W, H, mob, isBN, tick) {
  const {lx,ly,cx,cy,nw,nh} = nodeRect(n,W,H,mob);
  const rgb = hexRgb(n.color);
  const fs  = mob ? 9 : 10;
  const fill = '#0c0d10';
  const STROKE = isBN ? (Math.sin(tick*0.25)>0?'#f87171':'#300') : `rgba(${rgb},0.35)`;
  const LWIDTH  = isBN ? 2 : 1;

  ctx.save();
  ctx.shadowColor = n.color; ctx.shadowBlur = 16;

  if (n.type === 'TRIGGER') {
    // Hexagon
    pathHex(ctx,cx,cy,nw,nh);
    ctx.fillStyle=fill; ctx.fill();
    ctx.strokeStyle=STROKE; ctx.lineWidth=LWIDTH; ctx.stroke();
    // Top tint
    ctx.save(); pathHex(ctx,cx,cy,nw,nh); ctx.clip();
    ctx.fillStyle=`rgba(${rgb},0.08)`; ctx.fillRect(lx,ly,nw,nh*0.38); ctx.restore();
    ctx.shadowBlur=0;
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top'; ctx.textAlign='center';
    ctx.fillText(n.type,cx,ly+nh*0.14);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs}px 'Exo',sans-serif`;
    ctx.fillText(n.label,cx,cy-fs*0.5);
    ctx.textAlign='left';

  } else if (n.type === 'ROUTER') {
    // Diamond
    pathDiamond(ctx,cx,cy,nw,nh);
    ctx.fillStyle=fill; ctx.fill();
    ctx.strokeStyle=STROKE; ctx.lineWidth=LWIDTH; ctx.stroke();
    ctx.save(); pathDiamond(ctx,cx,cy,nw,nh); ctx.clip();
    ctx.fillStyle=`rgba(${rgb},0.06)`; ctx.fillRect(lx,ly,nw,nh); ctx.restore();
    ctx.shadowBlur=0;
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top'; ctx.textAlign='center';
    ctx.fillText(n.type,cx,cy-nh/2+7);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs}px 'Exo',sans-serif`;
    ctx.fillText(n.label,cx,cy-fs*0.5);
    ctx.textAlign='left';

  } else if (n.type === 'TAG' || n.type === 'CRM') {
    // Circle
    const cr=Math.min(nw,nh)/2-1;
    ctx.beginPath(); ctx.arc(cx,cy,cr,0,Math.PI*2);
    ctx.fillStyle=fill; ctx.fill();
    ctx.strokeStyle=`rgba(${rgb},0.55)`; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,cr-1.5,0,Math.PI*2);
    ctx.fillStyle=`rgba(${rgb},0.07)`; ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top'; ctx.textAlign='center';
    ctx.fillText(n.type,cx,cy-cr*0.52);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs-1}px 'Exo',sans-serif`;
    ctx.fillText(n.label,cx,cy-fs*0.5+2);
    ctx.textAlign='left';

  } else if (n.type === 'LOG' || n.type === 'ROUTE') {
    // Pill / stadium
    pathPill(ctx,lx,ly,nw,nh);
    ctx.fillStyle=fill; ctx.fill();
    ctx.strokeStyle=`rgba(${rgb},0.3)`; ctx.lineWidth=1; ctx.stroke();
    // Left accent (tinted strip clipped to pill)
    ctx.save(); pathPill(ctx,lx,ly,nw,nh); ctx.clip();
    ctx.fillStyle=`rgba(${rgb},0.18)`; ctx.fillRect(lx,ly,5,nh); ctx.restore();
    ctx.shadowBlur=0;
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top';
    ctx.fillText(n.type,lx+nh/2+3,ly+5);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs}px 'Exo',sans-serif`;
    ctx.fillText(n.label,lx+nh/2+3,ly+18);

  } else if (n.type === 'ENRICH') {
    // Notched top-right
    pathNotched(ctx,lx,ly,nw,nh,5,11);
    ctx.fillStyle=fill; ctx.fill();
    ctx.strokeStyle=`rgba(${rgb},0.35)`; ctx.lineWidth=1; ctx.stroke();
    ctx.save(); pathNotched(ctx,lx,ly,nw,nh,5,11); ctx.clip();
    ctx.fillStyle=`rgba(${rgb},0.07)`; ctx.fillRect(lx,ly,nw,16); ctx.restore();
    ctx.fillStyle=n.color; ctx.fillRect(lx,ly,3,nh);
    ctx.shadowBlur=0;
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top';
    ctx.fillText(n.type,lx+8,ly+5);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs}px 'Exo',sans-serif`;
    ctx.fillText(n.label,lx+8,ly+18);

  } else if (n.type === 'EMAIL') {
    // Rounded rect + envelope icon
    rrect(ctx,lx,ly,nw,nh,5);
    ctx.fillStyle=fill; ctx.fill();
    ctx.strokeStyle=`rgba(${rgb},0.3)`; ctx.lineWidth=1; ctx.stroke();
    ctx.save(); rrect(ctx,lx,ly,nw,nh,5); ctx.clip();
    ctx.fillStyle=`rgba(${rgb},0.07)`; ctx.fillRect(lx,ly,nw,16); ctx.restore();
    ctx.fillStyle=n.color; ctx.fillRect(lx,ly,3,nh);
    ctx.shadowBlur=0;
    // Envelope icon
    const ex=lx+nw-22, ey=ly+nh/2-6, ew=16, eh=11;
    ctx.strokeStyle=`rgba(${rgb},0.65)`; ctx.lineWidth=1;
    ctx.strokeRect(ex,ey,ew,eh);
    ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(ex+ew/2,ey+eh*0.55); ctx.lineTo(ex+ew,ey); ctx.stroke();
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top';
    ctx.fillText(n.type,lx+8,ly+5);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs}px 'Exo',sans-serif`;
    ctx.fillText(n.label,lx+8,ly+18);

  } else if (n.type === 'ACTION') {
    // Rounded rect + lightning bolt
    rrect(ctx,lx,ly,nw,nh,5);
    ctx.fillStyle=fill; ctx.fill();
    ctx.strokeStyle=`rgba(${rgb},0.3)`; ctx.lineWidth=1; ctx.stroke();
    ctx.save(); rrect(ctx,lx,ly,nw,nh,5); ctx.clip();
    ctx.fillStyle=`rgba(${rgb},0.07)`; ctx.fillRect(lx,ly,nw,16); ctx.restore();
    ctx.fillStyle=n.color; ctx.fillRect(lx,ly,3,nh);
    ctx.shadowBlur=0;
    // Lightning bolt
    const bx=lx+nw-21, by=ly+8;
    ctx.fillStyle=`rgba(${rgb},0.75)`;
    ctx.beginPath();
    ctx.moveTo(bx+7,by); ctx.lineTo(bx+2,by+9); ctx.lineTo(bx+6,by+9);
    ctx.lineTo(bx+3,by+17); ctx.lineTo(bx+10,by+8); ctx.lineTo(bx+6,by+8); ctx.lineTo(bx+9,by);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top';
    ctx.fillText(n.type,lx+8,ly+5);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs}px 'Exo',sans-serif`;
    ctx.fillText(n.label,lx+8,ly+18);

  } else if (n.type === 'AI') {
    // Rounded rect + circuit arcs
    rrect(ctx,lx,ly,nw,nh,5);
    ctx.fillStyle=fill; ctx.fill();
    ctx.strokeStyle=STROKE; ctx.lineWidth=LWIDTH; ctx.stroke();
    ctx.save(); rrect(ctx,lx,ly,nw,nh,5); ctx.clip();
    ctx.fillStyle=`rgba(${rgb},0.07)`; ctx.fillRect(lx,ly,nw,16); ctx.restore();
    ctx.fillStyle=n.color; ctx.fillRect(lx,ly,3,nh);
    ctx.shadowBlur=0;
    // Circuit arcs
    ctx.strokeStyle=`rgba(${rgb},0.4)`; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(cx,ly+11,4,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx-15,ly+nh-13,3,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx+15,ly+nh-13,3,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top';
    ctx.fillText(n.type,lx+8,ly+5);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs}px 'Exo',sans-serif`;
    ctx.fillText(n.label,lx+8,ly+18);

  } else {
    // NURTURE / ARCHIVE / default: dashed-border rounded rect
    rrect(ctx,lx,ly,nw,nh,5);
    ctx.fillStyle=fill; ctx.fill();
    ctx.setLineDash([4,3]);
    ctx.strokeStyle=`rgba(${rgb},0.45)`; ctx.lineWidth=1; ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle=n.color; ctx.fillRect(lx,ly,3,nh);
    ctx.shadowBlur=0;
    ctx.fillStyle=n.color; ctx.font=`700 6.5px 'Exo',sans-serif`; ctx.textBaseline='top';
    ctx.fillText(n.type,lx+8,ly+5);
    ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.font=`600 ${fs}px 'Exo',sans-serif`;
    ctx.fillText(n.label,lx+8,ly+18);
  }

  ctx.restore();
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

  const cLeads = useRef(null);
  const cHours = useRef(null);
  const cRev   = useRef(null);

  const st = useRef({
    W:0, H:0, mob:false,
    paths:[],
    particles:[],
    dots:[],
    tick:0, lastTime:0,
    rings:[],
    routerBurst:null,
    bottleneck:null,
    counters:{ leads:12400, hours:850, revenue:2100000 },
    notifDb:{},
    completionNotifCount:[0,0,0],
    activeNotifCount:0,
    dramaticNext:DRAMATIC_INTERVAL,
    prm:false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    const sect   = sectionRef.current;
    if (!canvas || !wrap) return;

    st.current.prm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── layout ───────────────────────────────────────────────────────────
    function setupLayout() {
      const W   = wrap.offsetWidth;
      const mob = W < MOBILE_BP;
      const H   = mob ? Math.max(MRY.length * (NHM + 24) + 40, 520) : 480;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = '100%';
      canvas.style.height = `${H}px`;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;

      const s = st.current;
      s.W=W; s.H=H; s.mob=mob;
      s.paths=buildPaths(W,H,mob);
      s.rings=[]; s.routerBurst=null; s.bottleneck=null;
      s.completionNotifCount=[0,0,0];

      // Generate fixed micro-dots
      s.dots=[];
      for(let i=0;i<DOT_COUNT;i++){
        s.dots.push({x:Math.random()*W, y:Math.random()*H, r:0.8+Math.random()*0.4, a:0.06+Math.random()*0.06});
      }

      // 3 particles per stream
      const ps=[];
      for(let si=0;si<3;si++) [0,0.38,0.72].forEach(frac=>ps.push(mkParticle(s.paths,si,frac)));
      s.particles=ps;
    }

    // ── notifications ─────────────────────────────────────────────────────
    function spawnNotif(text, x, y, color, mob, onRemove) {
      const cont=notifRef.current; if(!cont) return;
      const el=document.createElement('div');
      el.textContent=text;
      const rgb=hexRgb(color);
      const transform=mob?'translateY(-50%)':'translateX(-50%)';
      const t1=mob?y-30:y-38;
      el.style.cssText=`position:absolute;left:${x}px;top:${y}px;background:rgba(${rgb},0.12);border:1px solid rgba(${rgb},0.4);color:${color};font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;pointer-events:none;transform:${transform};white-space:nowrap;font-family:'Exo',sans-serif;opacity:1;z-index:10;`;
      cont.appendChild(el);
      requestAnimationFrame(()=>{el.style.transition='opacity 1s,top 1s';el.style.opacity='0';el.style.top=`${t1}px`;});
      setTimeout(()=>{el.parentNode&&el.remove();if(onRemove)onRemove();},1100);
    }

    function tryShowNotif(text, x, y, color, mob) {
      const s=st.current;
      if(s.activeNotifCount>=MAX_NOTIFS) return;
      s.activeNotifCount++;
      spawnNotif(text,x,y,color,mob,()=>{s.activeNotifCount=Math.max(0,s.activeNotifCount-1);});
    }

    function spawnCompletionNotif(text, x, y, color, streamIdx) {
      const s=st.current;
      if(s.completionNotifCount[streamIdx]>=2) return;
      s.completionNotifCount[streamIdx]++;
      const cont=notifRef.current; if(!cont) return;
      const el=document.createElement('div');
      el.textContent=text;
      const rgb=hexRgb(color);
      el.style.cssText=`position:absolute;left:${x}px;top:${y}px;background:rgba(${rgb},0.15);border:1px solid rgba(${rgb},0.5);color:${color};font-size:11px;font-weight:700;padding:6px 14px;border-radius:24px;pointer-events:none;transform:translateX(-50%);white-space:nowrap;font-family:'Exo',sans-serif;opacity:1;z-index:15;`;
      cont.appendChild(el);
      requestAnimationFrame(()=>{el.style.transition='opacity 1.4s,top 1.4s';el.style.opacity='0';el.style.top=`${y-50}px`;});
      setTimeout(()=>{
        st.current.completionNotifCount[streamIdx]=Math.max(0,st.current.completionNotifCount[streamIdx]-1);
        el.parentNode&&el.remove();
      },1400);
    }

    function spawnSysNotif(text, color) {
      const cont=notifRef.current; if(!cont) return;
      const el=document.createElement('div');
      el.textContent=text;
      const rgb=hexRgb(color);
      el.style.cssText=`position:absolute;top:10px;left:50%;transform:translateX(-50%);background:rgba(${rgb},0.15);border:1px solid rgba(${rgb},0.5);color:${color};font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;pointer-events:none;white-space:nowrap;font-family:'Exo',sans-serif;z-index:20;opacity:1;transition:opacity 0.5s;`;
      cont.appendChild(el);
      setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.parentNode&&el.remove(),600);},2000);
    }

    // ── counter display ───────────────────────────────────────────────────
    function updateCounters() {
      const {leads,hours,revenue}=st.current.counters;
      if(cLeads.current) cLeads.current.textContent=Math.round(leads).toLocaleString()+'+';
      if(cHours.current) cHours.current.textContent=Math.round(hours);
      if(cRev.current)   cRev.current.textContent=revenue>=1e6?`$${(revenue/1e6).toFixed(1)}M`:`$${Math.round(revenue/1000)}K`;
    }

    // ── dramatic events ───────────────────────────────────────────────────
    function triggerDramatic() {
      const type=['surge','bottleneck','vip'][Math.floor(Math.random()*3)];
      if(type==='surge'){
        spawnSysNotif('Lead surge detected','#F5C540');
        [0,0.15].forEach(frac=>st.current.particles.push(mkParticle(st.current.paths,0,frac,false,true)));
        setTimeout(()=>{st.current.particles=st.current.particles.filter(p=>!p.isSurge);},4000);
      } else if(type==='bottleneck'){
        spawnSysNotif('AI processing at capacity','#f87171');
        st.current.bottleneck={t:0,dur:1500};
        setTimeout(()=>{spawnSysNotif('✓ Resolved','#4ade80');st.current.bottleneck=null;},1600);
      } else {
        spawnSysNotif('VIP lead detected 🌟','#FFD700');
        const vip=mkParticle(st.current.paths,0,Math.random(),true,false);
        vip.vipSpeed=2;
        st.current.particles.push(vip);
        setTimeout(()=>{st.current.particles=st.current.particles.filter(p=>!p.isVIP);},6000);
      }
    }

    // ── draw ─────────────────────────────────────────────────────────────
    function draw(timestamp) {
      const ctx=ctxRef.current, s=st.current;
      if(!ctx||!s.W){rafRef.current=requestAnimationFrame(draw);return;}

      const dt=Math.min(s.lastTime?(timestamp-s.lastTime)/1000:0.016,0.05);
      s.lastTime=timestamp; s.tick++;

      const {W,H,mob,paths,particles,dots}=s;
      const nw=mob?NWM:NW, nh=mob?NHM:NH;
      const speed=mob?SPEED_M:SPEED_D;

      // ── Black background ──
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='#000000';
      ctx.fillRect(0,0,W,H);

      // ── Radial light pools (pulsing) ──
      for(const pool of POOLS){
        const px=pool.x*W, py=pool.y*H, pr=pool.r*Math.max(W,H);
        const pulse=1+0.3*Math.sin(s.tick*0.008);
        const inner=pool.a*pulse;
        const g=ctx.createRadialGradient(px,py,0,px,py,pr);
        g.addColorStop(0,`rgba(${hexRgb(pool.c)},${inner})`);
        g.addColorStop(1,`rgba(${hexRgb(pool.c)},0)`);
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      }

      // ── Micro dots (fixed, brighten near particles) ──
      const ppos=particles.map(p=>getPos(p,paths[p.streamIdx].segs));
      for(const dot of dots){
        let alpha=dot.a;
        for(const pp of ppos){
          const d=Math.hypot(dot.x-pp[0],dot.y-pp[1]);
          if(d<80){alpha=Math.min(0.55,alpha+(1-d/80)*0.38);break;}
        }
        ctx.fillStyle=`rgba(255,255,255,${alpha})`;
        ctx.beginPath(); ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2); ctx.fill();
      }

      // ── Ghost connector trails ──
      for(let si=0;si<STREAMS.length;si++){
        const rgb=hexRgb(STREAMS[si].color);
        ctx.save();
        ctx.strokeStyle=`rgba(${rgb},0.1)`; ctx.lineWidth=1; ctx.setLineDash([3,9]);
        for(const seg of paths[si].segs){
          ctx.beginPath(); ctx.moveTo(seg.pts[0][0],seg.pts[0][1]);
          for(let i=1;i<seg.pts.length;i++) ctx.lineTo(seg.pts[i][0],seg.pts[i][1]);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── Lane separator lines (desktop only, behind nodes) ──
      if(!mob){
        ctx.save();
        ctx.strokeStyle='rgba(255,255,255,0.04)'; ctx.lineWidth=1; ctx.setLineDash([2,14]);
        for(const ry of DRY){
          const lineY=ry*H;
          ctx.beginPath(); ctx.moveTo(W*0.35,lineY); ctx.lineTo(W*0.96,lineY); ctx.stroke();
        }
        ctx.setLineDash([]); ctx.restore();
      }

      // ── Nodes ──
      for(const n of NODES){
        const isBN=!!(s.bottleneck&&n.id==='ai-qualify');
        drawNode(ctx,n,W,H,mob,isBN,s.tick);
      }

      // ── Particles + effects ──
      if(!s.prm){
        for(let pi=particles.length-1;pi>=0;pi--){
          const p=particles[pi];
          const stream=STREAMS[p.streamIdx], path=paths[p.streamIdx];
          const pSpeed=speed*(p.vipSpeed||1);
          const pColor=p.isVIP?'#FFD700':stream.color;
          const pRgb=p.isVIP?'255,215,0':hexRgb(stream.color);
          const pR=p.isVIP?5:4;

          const pos=getPos(p,path.segs);
          p.trail.push([pos[0],pos[1]]);
          if(p.trail.length>TRAIL_LEN) p.trail.shift();

          p.d+=pSpeed*dt;

          // Segment transitions
          while(p.si<path.segs.length&&p.d>=path.segs[p.si].tot){
            p.d-=path.segs[p.si].tot;
            const arrivedSeg=path.segs[p.si];
            p.si++;
            const arrivedNode=NODES.find(n=>n.id===arrivedSeg.toId);
            if(arrivedNode){
              const r=nodeRect(arrivedNode,W,H,mob);
              s.rings.push({x:r.cx,y:r.cy,color:stream.color,t:0,isFinal:false});
              if(arrivedSeg.toId==='lead-router') s.routerBurst={x:r.cx,y:r.cy,t:0};
              const isLate=mob?arrivedNode.mr>=4:arrivedNode.dc>=4;
              if(isLate&&!p.isSurge){
                const now=Date.now(), key=`${p.id}-${p.si}`;
                if(!s.notifDb[key]||now-s.notifDb[key]>4000){
                  s.notifDb[key]=now;
                  const idx=mob?arrivedNode.mr-4:arrivedNode.dc-4;
                  const msg=stream.notifs[idx];
                  const nx=mob?r.cx+r.nw/2+14:r.cx;
                  const ny=mob?r.cy:r.ly-20;
                  if(msg) tryShowNotif(msg,nx,ny,stream.color,mob);
                }
              }
            }
          }

          // Path complete
          if(p.si>=path.segs.length){
            if(p.isSurge||p.isVIP){particles.splice(pi,1);continue;}

            // Counters
            s.counters.leads+=stream.dc.leads;
            s.counters.hours+=stream.dc.hours;
            s.counters.revenue+=stream.dc.revenue;
            updateCounters();

            // Final node position for effects
            const finalId=stream.nodeIds[stream.nodeIds.length-1];
            const finalNode=NODES.find(n=>n.id===finalId);
            if(finalNode){
              const fr=nodeRect(finalNode,W,H,mob);
              // Large ring burst
              s.rings.push({x:fr.cx,y:fr.cy,color:stream.color,t:0,isFinal:true});
              // Completion notification at right edge of canvas, lane y
              const notifX=mob?W*0.5:W*0.91;
              const notifY=mob?fr.ly-10:DRY[finalNode.dr]*H;
              spawnCompletionNotif(COMPLETION_MSGS[p.streamIdx],notifX,notifY,stream.color,p.streamIdx);
            }

            p.si=0; p.d=0; p.trail=[];
            continue;
          }

          // Draw trail
          if(p.trail.length>1){
            ctx.save();
            for(let t=0;t<p.trail.length-1;t++){
              ctx.strokeStyle=`rgba(${pRgb},${(t/p.trail.length)*0.5})`;
              ctx.lineWidth=1.5*(t/p.trail.length);
              ctx.beginPath(); ctx.moveTo(p.trail[t][0],p.trail[t][1]); ctx.lineTo(p.trail[t+1][0],p.trail[t+1][1]); ctx.stroke();
            }
            ctx.restore();
          }

          // Draw particle
          const cur=getPos(p,path.segs);
          ctx.save();
          ctx.shadowColor=pColor; ctx.shadowBlur=7;
          ctx.fillStyle=`rgba(${pRgb},0.15)`;
          ctx.beginPath(); ctx.arc(cur[0],cur[1],7,0,Math.PI*2); ctx.fill();
          ctx.shadowBlur=p.isVIP?20:8;
          ctx.fillStyle=pColor;
          ctx.beginPath(); ctx.arc(cur[0],cur[1],pR,0,Math.PI*2); ctx.fill();
          ctx.shadowBlur=0;
          ctx.fillStyle='rgba(255,255,255,0.85)';
          ctx.beginPath(); ctx.arc(cur[0]-1,cur[1]-1.5,1.5,0,Math.PI*2); ctx.fill();
          ctx.restore();

          // AI Qualify thinking dots
          const aiNode=NODES.find(n=>n.id==='ai-qualify');
          if(aiNode){
            const ar=nodeRect(aiNode,W,H,mob);
            if(Math.hypot(cur[0]-ar.cx,cur[1]-ar.cy)<60){
              ctx.save();
              for(let d=0;d<4;d++){
                const a=0.2+0.7*((Math.sin(s.tick*0.05+d*1.4)+1)/2);
                ctx.fillStyle=`rgba(129,140,248,${a})`;
                ctx.beginPath();
                if(mob) ctx.arc(ar.lx+nw+6+d*6,ar.cy,1.8,0,Math.PI*2);
                else    ctx.arc(ar.cx-9+d*6,ar.ly-8,1.8,0,Math.PI*2);
                ctx.fill();
              }
              ctx.restore();
            }
          }
        } // end particle loop

        // ── Rings ──
        for(let ri=s.rings.length-1;ri>=0;ri--){
          const ring=s.rings[ri];
          const dur=ring.isFinal?FINAL_RING_DUR:RING_DUR;
          const startR=ring.isFinal?12:8, endR=ring.isFinal?55:30;
          ring.t+=dt*1000;
          if(ring.t>=dur){s.rings.splice(ri,1);continue;}
          const prog=ring.t/dur;
          const rgb=hexRgb(ring.color);
          const alpha=(ring.isFinal?0.8:0.7)*(1-prog);
          const lw=ring.isFinal?2-1.5*prog:1.5;
          ctx.save();
          ctx.strokeStyle=`rgba(${rgb},${alpha})`; ctx.lineWidth=Math.max(0.3,lw);
          ctx.beginPath(); ctx.arc(ring.x,ring.y,startR+(endR-startR)*prog,0,Math.PI*2); ctx.stroke();
          ctx.restore();
        }

        // ── Router burst ──
        if(s.routerBurst){
          s.routerBurst.t+=dt*1000;
          if(s.routerBurst.t>=ROUTER_DUR){s.routerBurst=null;}
          else{
            const {x:rx,y:ry,t}=s.routerBurst, prog=t/ROUTER_DUR, len=30*prog, fade=1-prog;
            const angles=mob?[-Math.PI/2,Math.PI/6,-5*Math.PI/6]:[-Math.PI/4,0,Math.PI/4];
            ctx.save();
            STREAMS.forEach((str,i)=>{
              const rgb=hexRgb(str.color);
              ctx.strokeStyle=`rgba(${rgb},${fade*0.8})`; ctx.lineWidth=2;
              ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx+Math.cos(angles[i])*len,ry+Math.sin(angles[i])*len); ctx.stroke();
            });
            ctx.restore();
          }
        }

        // ── Bottleneck timer ──
        if(s.bottleneck){
          s.bottleneck.t+=dt*1000;
          if(s.bottleneck.t>=s.bottleneck.dur) s.bottleneck=null;
        }

        // ── Dramatic events ──
        s.dramaticNext-=dt*1000;
        if(s.dramaticNext<=0){s.dramaticNext=DRAMATIC_INTERVAL+Math.random()*3000;triggerDramatic();}
      } // end !prm

      rafRef.current=requestAnimationFrame(draw);
    }

    // ── stats count-up ────────────────────────────────────────────────────
    function animateStats() {
      const snap={...st.current.counters};
      const dur=2000, start=performance.now();
      function tick(now){
        const raw=Math.min((now-start)/dur,1), t=1-Math.pow(1-raw,3);
        if(cLeads.current) cLeads.current.textContent=Math.round(t*snap.leads).toLocaleString()+'+';
        if(cHours.current) cHours.current.textContent=Math.round(t*snap.hours);
        if(cRev.current)   cRev.current.textContent=`$${(t*snap.revenue/1e6).toFixed(1)}M`;
        if(raw<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    // ── init ─────────────────────────────────────────────────────────────
    setupLayout();
    updateCounters();
    rafRef.current=requestAnimationFrame(draw);

    function onResize(){clearTimeout(resizeTimer.current);resizeTimer.current=setTimeout(setupLayout,200);}
    window.addEventListener('resize',onResize);

    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)animateStats();});},{threshold:0.15});
    if(sect) observer.observe(sect);
    if(sect){const r=sect.getBoundingClientRect();if(r.top<window.innerHeight)animateStats();}

    return()=>{cancelAnimationFrame(rafRef.current);clearTimeout(resizeTimer.current);window.removeEventListener('resize',onResize);observer.disconnect();};
  },[]);

  return (
    <section ref={sectionRef} style={{ background:'#000000', margin:'0', padding:'72px 0 0', overflowX:'hidden' }}>
      <style>{`
        .aiwf-inner { max-width:1100px; margin:0 auto; padding:0 clamp(24px,5vw,72px); }
        .aiwf-tag   { display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#818cf8;margin-bottom:18px;font-family:'Exo',sans-serif; }
        .aiwf-hed   { font-family:'Exo',sans-serif;font-size:clamp(22px,3.2vw,38px);font-weight:800;letter-spacing:-1px;line-height:1.1;color:#fff;margin-bottom:36px;max-width:680px; }
        .aiwf-stats { display:flex;margin-bottom:28px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;overflow:hidden; }
        .aiwf-sstat { flex:1;padding:20px 24px;border-right:1px solid rgba(255,255,255,0.07); }
        .aiwf-sstat:last-child { border-right:none; }
        .aiwf-sv    { font-family:'Exo',sans-serif;font-size:clamp(22px,2.6vw,32px);font-weight:800;line-height:1;margin-bottom:6px; }
        .aiwf-sl    { font-size:11px;color:rgba(255,255,255,0.38);letter-spacing:0.3px; }
        .aiwf-cvs   { position:relative;overflow:visible; }
        .aiwf-notif { position:absolute;inset:0;pointer-events:none;overflow:hidden; }
        .aiwf-cta   { display:flex;justify-content:space-between;align-items:center;padding:40px clamp(24px,5vw,72px) 72px;max-width:1100px;margin:0 auto;gap:32px; }
        .aiwf-cta-h { font-family:'Exo',sans-serif;font-size:clamp(18px,2.2vw,26px);font-weight:800;letter-spacing:-0.5px;color:#fff;margin-bottom:10px; }
        .aiwf-cta-s { font-size:14px;color:rgba(255,255,255,0.42);font-weight:300;line-height:1.7;max-width:420px; }
        .aiwf-btns  { display:flex;gap:12px;flex-shrink:0; }
        .aiwf-btn-g { border-color:#F5C540!important;color:#F5C540!important; }
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
        <div className="aiwf-tag">
          <span style={{width:18,height:1,background:'#818cf8',display:'inline-block'}}/>
          See it in action
        </div>
        <h2 className="aiwf-hed">This is what your business looks like on autopilot.</h2>

        <div className="aiwf-stats">
          <div className="aiwf-sstat">
            <div className="aiwf-sv" style={{color:'#fff'}}><span ref={cLeads}>12,400+</span></div>
            <div className="aiwf-sl">Leads processed</div>
          </div>
          <div className="aiwf-sstat">
            <div className="aiwf-sv" style={{color:'#4ade80'}}><span ref={cHours}>850</span></div>
            <div className="aiwf-sl">Hours saved / mo</div>
          </div>
          <div className="aiwf-sstat">
            <div className="aiwf-sv" style={{color:'#F5C540'}}><span ref={cRev}>$2.1M</span></div>
            <div className="aiwf-sl">Revenue potential</div>
          </div>
        </div>

        <div ref={wrapRef} className="aiwf-cvs">
          <canvas ref={canvasRef} style={{display:'block'}}/>
          <div ref={notifRef} className="aiwf-notif"/>
        </div>
      </div>

      <div className="aiwf-cta">
        <div>
          <div className="aiwf-cta-h">Ready to run this on your business?</div>
          <p className="aiwf-cta-s">We map your workflows, build the automations, and hand you a system that runs itself.</p>
        </div>
        <div className="aiwf-btns">
          <Link href="/contact" className="btn btn-y">Automate my business →</Link>
          <Link href="/services/ai-automation" className="btn btn-outline aiwf-btn-g">See how it works</Link>
        </div>
      </div>
    </section>
  );
}
