'use client';
import { useState, useCallback, useRef } from 'react';
import type { FlowStep } from '@/lib/automations';

interface Props {
  flowSteps: FlowStep[];
  platformColor?: string;
}

type Phase = 'idle' | 'running' | 'done';

export default function AutomationFlowClient({ flowSteps, platformColor = '#f9ca00' }: Props) {
  const [active, setActive] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<Phase>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = useCallback(() => {
    if (phase === 'running') return;
    clearTimers();
    setActive(new Set());
    setPhase('running');

    flowSteps.forEach(({ id }, i) => {
      timers.current.push(setTimeout(() => {
        setActive(prev => new Set([...prev, id, `arr${i}`]));
      }, i * 700));
    });

    timers.current.push(setTimeout(() => setPhase('done'), flowSteps.length * 700 + 400));
  }, [phase, flowSteps]);

  const reset = useCallback(() => {
    clearTimers();
    setActive(new Set());
    setPhase('idle');
  }, []);

  const is = (id: string) => active.has(id);

  const nodeTypeClass = (type: FlowStep['type']) => {
    if (type === 'trigger') return 'af-node af-node-trigger';
    if (type === 'result') return 'af-node af-node-result';
    return 'af-node';
  };

  return (
    <>
      <style>{`
        /* ── AF flow nodes ── */
        .af-flow { display:flex; align-items:stretch; width:100%; gap:0; }
        .af-node {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,.08);
          padding: 22px 18px;
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; justify-content: center;
          transition: background .4s, border-color .4s, box-shadow .4s, transform .3s;
        }
        .af-node-trigger { border-top: 2px solid rgba(249,202,0,.5); }
        .af-node-result  { background: rgba(249,202,0,.06); border: 1px solid rgba(249,202,0,.2); }

        .af-role { display:block; font-size:8px; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.2); margin-bottom:8px; font-weight:700; transition:color .3s; }
        .af-node-trigger .af-role,
        .af-node-result  .af-role { color:rgba(249,202,0,.6); }
        .af-nname {
          font-family:'Exo 2',var(--font-exo2),sans-serif;
          font-size:14px; font-weight:700; color:rgba(255,255,255,.6);
          margin-bottom:5px; line-height:1.2;
          transition: color .3s;
        }
        .af-node-result .af-nname { font-size:24px; font-weight:900; color:rgba(249,202,0,.5); line-height:1; margin-bottom:4px; }
        .af-nsub { font-size:10px; color:rgba(255,255,255,.2); line-height:1.45; transition:color .3s; }
        .af-node-result .af-nsub { color:rgba(249,202,0,.3); }

        /* ── arrow ── */
        .af-arrow {
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; width:30px;
          color:rgba(255,255,255,.12); font-size:13px;
          background:var(--surface);
          border-top:1px solid rgba(255,255,255,.04);
          border-bottom:1px solid rgba(255,255,255,.04);
          transition: color .35s;
          position: relative; overflow: hidden;
        }
        .af-arrow::before { content:'→'; position: relative; z-index: 1; }
        .af-arrow::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(90deg, transparent, rgba(249,202,0,.06), transparent);
          transform: translateX(-100%);
          transition: none;
        }

        /* ── active states ── */
        .af-node-active:not(.af-node-trigger):not(.af-node-result) {
          background: rgba(255,255,255,.07);
          border-color: rgba(255,255,255,.18);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(0,0,0,.25);
        }
        .af-node-trigger.af-node-active {
          background: rgba(249,202,0,.08);
          border-top-color: var(--y);
          transform: translateY(-1px);
          box-shadow: 0 0 24px rgba(249,202,0,.1);
        }
        .af-node-result.af-node-active {
          background: rgba(249,202,0,.14);
          border-color: rgba(249,202,0,.55);
          transform: translateY(-1px);
          box-shadow: 0 0 32px rgba(249,202,0,.18);
        }
        .af-node-active .af-nname { color: #fff; }
        .af-node-result.af-node-active .af-nname { color: var(--y); }
        .af-node-active .af-role { color: rgba(249,202,0,.85); }
        .af-node-active .af-nsub { color: rgba(255,255,255,.45); }
        .af-node-result.af-node-active .af-nsub { color: rgba(249,202,0,.5); }

        .af-arrow-active { color: var(--y) !important; }
        @keyframes af-sweep { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        .af-arrow-active::after { animation: af-sweep .5s ease-out forwards; }

        /* ── run button ── */
        .af-run-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px; margin-bottom: 20px;
          font-family: 'Exo 2', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--y); background: transparent;
          border: 1px solid rgba(249,202,0,.35);
          cursor: pointer; transition: background .2s, border-color .2s, color .2s;
        }
        .af-run-btn:hover:not(:disabled) { background: rgba(249,202,0,.07); border-color: rgba(249,202,0,.65); }
        .af-run-btn:disabled { opacity: .45; cursor: default; }
        .af-run-btn-reset { color: rgba(255,255,255,.45); border-color: rgba(255,255,255,.15); }
        .af-run-btn-reset:hover:not(:disabled) { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.3); color: #fff; }

        /* ── status line ── */
        .af-status { font-size:11px; color:rgba(255,255,255,.25); margin-top:14px; letter-spacing:.04em; min-height:18px; transition: color .4s; }
        .af-status-done { color: rgba(249,202,0,.65); }

        /* ── mobile: vertical flow ── */
        @media(max-width:860px){
          .af-flow { flex-direction:column; align-items:stretch; }
          .af-arrow { width:auto; height:28px; border-top:none; border-bottom:none; border-left:1px solid rgba(255,255,255,.04); border-right:1px solid rgba(255,255,255,.04); }
          .af-arrow::before { content:'↓'; }
          @keyframes af-sweep { from{transform:translateY(-100%)} to{transform:translateY(100%)} }
          .af-node { padding:20px 18px; }
          .af-node-result .af-nname { font-size:28px; }
          .af-node-active { transform: none !important; }
        }
      `}</style>

      {/* ── Run button ── */}
      <button
        onClick={phase === 'done' ? reset : run}
        disabled={phase === 'running'}
        className={`af-run-btn${phase === 'done' ? ' af-run-btn-reset' : ''}`}
      >
        {phase === 'running'
          ? '⟳ Running…'
          : phase === 'done'
          ? '↺ Reset'
          : '▶ Simulate run'}
      </button>

      {/* ── Flow diagram ── */}
      <div className="af-flow">
        {flowSteps.map((step, i) => (
          <>
            <div
              key={step.id}
              className={`${nodeTypeClass(step.type)}${is(step.id) ? ' af-node-active' : ''}`}
            >
              <span className="af-role">{step.type}</span>
              <div className="af-nname">{step.label}</div>
              {step.sublabel && <div className="af-nsub">{step.sublabel}</div>}
            </div>
            {i < flowSteps.length - 1 && (
              <div key={`arr${i}`} className={`af-arrow${is(`arr${i}`) ? ' af-arrow-active' : ''}`} />
            )}
          </>
        ))}
      </div>

      {/* ── Status line ── */}
      <p className={`af-status${phase === 'done' ? ' af-status-done' : ''}`}>
        {phase === 'idle' && 'Click "Simulate run" to see the automation sequence step by step.'}
        {phase === 'running' && 'Automation executing…'}
        {phase === 'done' && '✓ Automation complete. All steps executed successfully.'}
      </p>
    </>
  );
}
