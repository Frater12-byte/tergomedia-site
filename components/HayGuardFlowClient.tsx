'use client';
import { useState, useCallback, useRef } from 'react';

const STEPS: { ids: string[]; at: number }[] = [
  { ids: ['hubspot'],                                   at: 0    },
  { ids: ['arr1', 'n8n'],                              at: 650  },
  { ids: ['arr2', 'notion', 'docusign', 'calendar'],   at: 1300 },
  { ids: ['arr3', 'slack'],                            at: 2100 },
  { ids: ['arr4', 'result'],                           at: 2900 },
];
const DONE_AT = 3500;

type Phase = 'idle' | 'running' | 'done';

export default function HayGuardFlowClient() {
  const [active, setActive] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<Phase>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = useCallback(() => {
    if (phase === 'running') return;
    clearTimers();
    setActive(new Set());
    setPhase('running');

    STEPS.forEach(({ ids, at }) => {
      timers.current.push(setTimeout(() => {
        setActive(prev => new Set([...prev, ...ids]));
      }, at));
    });

    timers.current.push(setTimeout(() => setPhase('done'), DONE_AT));
  }, [phase]);

  const reset = useCallback(() => {
    clearTimers();
    setActive(new Set());
    setPhase('idle');
  }, []);

  const is = (id: string) => active.has(id);

  return (
    <>
      <style>{`
        /* ── flow nodes ── */
        .hg-flow { display:flex; align-items:stretch; width:100%; gap:0; }
        .hg-node {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,.08);
          padding: 22px 18px;
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; justify-content: center;
          transition: background .4s, border-color .4s, box-shadow .4s, transform .3s;
        }
        .hg-node-trigger { border-top: 2px solid rgba(249,202,0,.5); }
        .hg-node-result  { background: rgba(249,202,0,.06); border: 1px solid rgba(249,202,0,.2); }

        .hg-role { display:block; font-size:8px; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.2); margin-bottom:8px; font-weight:700; transition:color .3s; }
        .hg-node-trigger .hg-role,
        .hg-node-result  .hg-role { color:rgba(249,202,0,.6); }
        .hg-nname {
          font-family:'Exo 2',var(--font-exo2),sans-serif;
          font-size:14px; font-weight:700; color:rgba(255,255,255,.6);
          margin-bottom:5px; line-height:1.2;
          transition: color .3s;
        }
        .hg-node-result .hg-nname { font-size:24px; font-weight:900; color:rgba(249,202,0,.5); line-height:1; margin-bottom:4px; }
        .hg-nsub { font-size:10px; color:rgba(255,255,255,.2); line-height:1.45; transition:color .3s; }
        .hg-node-result .hg-nsub { color:rgba(249,202,0,.3); }

        /* ── parallel wrapper ── */
        .hg-parallel { display:flex; flex-direction:column; flex:1.2; background:rgba(255,255,255,.04); gap:1px; min-width:0; }
        .hg-parallel .hg-node { flex:1; padding:14px 18px; }

        /* ── arrow ── */
        .hg-arrow {
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; width:30px;
          color:rgba(255,255,255,.12); font-size:13px;
          background:var(--surface);
          border-top:1px solid rgba(255,255,255,.04);
          border-bottom:1px solid rgba(255,255,255,.04);
          transition: color .35s;
          position: relative; overflow: hidden;
        }
        .hg-arrow::before { content:'→'; position: relative; z-index: 1; }
        .hg-arrow::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(90deg, transparent, rgba(249,202,0,.06), transparent);
          transform: translateX(-100%);
          transition: none;
        }

        /* ── active states ── */
        .hg-node-active:not(.hg-node-trigger):not(.hg-node-result) {
          background: rgba(255,255,255,.07);
          border-color: rgba(255,255,255,.18);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(0,0,0,.25);
        }
        .hg-node-trigger.hg-node-active {
          background: rgba(249,202,0,.08);
          border-top-color: var(--y);
          transform: translateY(-1px);
          box-shadow: 0 0 24px rgba(249,202,0,.1);
        }
        .hg-node-result.hg-node-active {
          background: rgba(249,202,0,.14);
          border-color: rgba(249,202,0,.55);
          transform: translateY(-1px);
          box-shadow: 0 0 32px rgba(249,202,0,.18);
        }
        .hg-node-active .hg-nname { color: #fff; }
        .hg-node-result.hg-node-active .hg-nname { color: var(--y); }
        .hg-node-active .hg-role { color: rgba(249,202,0,.85); }
        .hg-node-active .hg-nsub { color: rgba(255,255,255,.45); }
        .hg-node-result.hg-node-active .hg-nsub { color: rgba(249,202,0,.5); }

        .hg-arrow-active { color: var(--y) !important; }
        @keyframes hg-sweep { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        .hg-arrow-active::after { animation: hg-sweep .5s ease-out forwards; }

        /* ── run button ── */
        .hg-run-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px; margin-bottom: 20px;
          font-family: 'Exo 2', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--y); background: transparent;
          border: 1px solid rgba(249,202,0,.35);
          cursor: pointer; transition: background .2s, border-color .2s, color .2s;
        }
        .hg-run-btn:hover:not(:disabled) { background: rgba(249,202,0,.07); border-color: rgba(249,202,0,.65); }
        .hg-run-btn:disabled { opacity: .45; cursor: default; }
        .hg-run-btn-reset { color: rgba(255,255,255,.45); border-color: rgba(255,255,255,.15); }
        .hg-run-btn-reset:hover:not(:disabled) { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.3); color: #fff; }

        /* ── status line ── */
        .hg-status { font-size:11px; color:rgba(255,255,255,.25); margin-top:14px; letter-spacing:.04em; min-height:18px; transition: color .4s; }
        .hg-status-done { color: rgba(249,202,0,.65); }

        /* ── mobile: vertical flow ── */
        @media(max-width:860px){
          .hg-flow { flex-direction:column; align-items:stretch; }
          .hg-arrow { width:auto; height:28px; border-top:none; border-bottom:none; border-left:1px solid rgba(255,255,255,.04); border-right:1px solid rgba(255,255,255,.04); }
          .hg-arrow::before { content:'↓'; }
          @keyframes hg-sweep { from{transform:translateY(-100%)} to{transform:translateY(100%)} }
          .hg-parallel { flex-direction:column; }
          .hg-parallel .hg-node { padding:18px; }
          .hg-node { padding:20px 18px; }
          .hg-node-result .hg-nname { font-size:28px; }
          .hg-node-active { transform: none !important; }
        }
      `}</style>

      {/* ── Run button ── */}
      <button
        onClick={phase === 'done' ? reset : run}
        disabled={phase === 'running'}
        className={`hg-run-btn${phase === 'done' ? ' hg-run-btn-reset' : ''}`}
      >
        {phase === 'running'
          ? '⟳ Running…'
          : phase === 'done'
          ? '↺ Reset'
          : '▶ Simulate run'}
      </button>

      {/* ── Flow diagram ── */}
      <div className="hg-flow">

        {/* 1 — HubSpot trigger */}
        <div className={`hg-node hg-node-trigger${is('hubspot') ? ' hg-node-active' : ''}`}>
          <span className="hg-role">Trigger</span>
          <div className="hg-nname">HubSpot</div>
          <div className="hg-nsub">Deal marked Won</div>
        </div>

        <div className={`hg-arrow${is('arr1') ? ' hg-arrow-active' : ''}`} />

        {/* 2 — n8n orchestrator */}
        <div className={`hg-node${is('n8n') ? ' hg-node-active' : ''}`}>
          <span className="hg-role">Orchestrator</span>
          <div className="hg-nname">n8n</div>
          <div className="hg-nsub">Parallel execution<br />Retry + error handling</div>
        </div>

        <div className={`hg-arrow${is('arr2') ? ' hg-arrow-active' : ''}`} />

        {/* 3 — Parallel outputs */}
        <div className="hg-parallel">
          <div className={`hg-node${is('notion') ? ' hg-node-active' : ''}`}>
            <span className="hg-role">Workspace</span>
            <div className="hg-nname">Notion</div>
            <div className="hg-nsub">Client workspace created</div>
          </div>
          <div className={`hg-node${is('docusign') ? ' hg-node-active' : ''}`}>
            <span className="hg-role">Contract</span>
            <div className="hg-nname">DocuSign</div>
            <div className="hg-nsub">Envelope dispatched</div>
          </div>
          <div className={`hg-node${is('calendar') ? ' hg-node-active' : ''}`}>
            <span className="hg-role">Scheduling</span>
            <div className="hg-nname">Calendar</div>
            <div className="hg-nsub">Kick-off invite sent</div>
          </div>
        </div>

        <div className={`hg-arrow${is('arr3') ? ' hg-arrow-active' : ''}`} />

        {/* 4 — Slack */}
        <div className={`hg-node${is('slack') ? ' hg-node-active' : ''}`}>
          <span className="hg-role">Notify</span>
          <div className="hg-nname">Slack</div>
          <div className="hg-nsub">Account manager alerted with full brief</div>
        </div>

        <div className={`hg-arrow${is('arr4') ? ' hg-arrow-active' : ''}`} />

        {/* 5 — Result */}
        <div className={`hg-node hg-node-result${is('result') ? ' hg-node-active' : ''}`}>
          <span className="hg-role">Result</span>
          <div className="hg-nname">≤ 2 min</div>
          <div className="hg-nsub">Zero manual steps</div>
        </div>
      </div>

      {/* ── Status line ── */}
      <p className={`hg-status${phase === 'done' ? ' hg-status-done' : ''}`}>
        {phase === 'idle' && 'Notion, DocuSign, and Calendar execute in parallel — not sequentially.'}
        {phase === 'running' && 'Workflow executing…'}
        {phase === 'done' && '✓ Client onboarded. Total time: under 2 minutes.'}
      </p>
    </>
  );
}
