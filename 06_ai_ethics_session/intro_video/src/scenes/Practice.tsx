import React from 'react';
import cues from '../cues.json';
import {RING_C, RING_R} from '../film';
import {Scene, Kicker} from '../frame';
import {C, EIO, F, FadeUp, Label, Letters, hit, pr, useT} from '../lib';

const Q = cues.practice;

const STEPS = [
  {name: 'ASK', body: 'Give a clear task and enough context. Keep personal data out of the prompt.'},
  {name: 'CHECK', body: 'Verify every claim and every source against the original.'},
  {name: 'DISCLOSE', body: 'State which tool you used, and for which part of the work.'},
  {name: 'OWN', body: 'You are responsible for every word you submit.'},
];

const polar = (a: number, rad = RING_R) => ({x: RING_C.x + rad * Math.cos(a), y: RING_C.y + rad * Math.sin(a)});

export const Practice: React.FC = () => {
  const t = useT();
  const active = Q.steps.reduce((acc, at, i) => (t >= at ? i : acc), -1);
  const done = t >= Q.loop;
  const pulse = hit(t, Q.loop, 1.2);
  const ringIn = pr(t, Q.ring, 1.2, EIO);
  const arcLen = 2 * Math.PI * (RING_R + 40);
  const prog = Q.steps.reduce((a, at) => a + pr(t, at, 0.8, EIO) * 0.25, 0);

  return (
    <Scene start={Q.start} end={Q.end}>
      <div style={{position: 'absolute', left: 150, top: 150}}>
        <Kicker num="05" text="Practice" at={Q.start + 0.3} />
      </div>
      <div style={{position: 'absolute', left: 150, top: 196, fontFamily: F.display, fontSize: 68, letterSpacing: '-0.015em', color: C.white}}>
        <Letters text="Four habits for responsible use" at={Q.start + 0.5} mode="rise" stagger={0.016} />
      </div>

      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <circle cx={RING_C.x} cy={RING_C.y} r={RING_R + 40} fill="none" stroke={C.white} strokeOpacity={0.12} strokeDasharray={`${arcLen * ringIn} ${arcLen}`} transform={`rotate(-90 ${RING_C.x} ${RING_C.y})`} />
        <circle cx={RING_C.x} cy={RING_C.y} r={RING_R + 40} fill="none" stroke={C.amber} strokeWidth={3} strokeDasharray={`${arcLen * prog} ${arcLen}`} transform={`rotate(-90 ${RING_C.x} ${RING_C.y})`} style={{filter: `drop-shadow(0 0 10px ${C.amber})`}} />
        {Array.from({length: 48}, (_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const p1 = polar(a, RING_R + 58);
          const p2 = polar(a, RING_R + (i % 12 === 0 ? 80 : 68));
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.white} strokeOpacity={0.25 * pr(t, Q.ring + i * 0.015, 0.3)} />;
        })}
        {pulse > 0 && (
          <>
            <circle cx={RING_C.x} cy={RING_C.y} r={RING_R + 40 + (1 - pulse) * 500} fill="none" stroke={C.amber} strokeOpacity={pulse * 0.8} strokeWidth={3} />
            <circle cx={RING_C.x} cy={RING_C.y} r={RING_R + 40 + (1 - pulse) * 260} fill="none" stroke={C.white} strokeOpacity={pulse * 0.5} strokeWidth={2} />
          </>
        )}
      </svg>

      <div
        style={{
          position: 'absolute',
          left: RING_C.x - 150,
          top: RING_C.y - 50,
          width: 300,
          textAlign: 'center',
          fontFamily: F.display,
          fontStyle: 'italic',
          fontSize: 96,
          lineHeight: 1,
          color: done ? C.amber : C.white,
          textShadow: done ? `0 0 50px rgba(255,180,92,0.8)` : '0 0 30px rgba(255,255,255,0.3)',
          opacity: pr(t, Q.you, 0.7),
          transform: `scale(${1 + 0.12 * pulse})`,
        }}
      >
        You
      </div>

      {STEPS.map((s, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 2;
        const p = polar(a, RING_R + 40);
        const isDone = done || active > i;
        const isActive = active === i && !done;
        const appear = pr(t, Q.ring + 0.3 + i * 0.12, 0.6);
        const lx = i === 1 ? p.x + 58 : i === 3 ? p.x - 58 : p.x;
        const ly = i === 0 ? p.y - 62 : i === 2 ? p.y + 62 : p.y;
        return (
          <React.Fragment key={s.name}>
            <div
              style={{
                position: 'absolute',
                left: p.x - 30,
                top: p.y - 30,
                width: 60,
                height: 60,
                borderRadius: 30,
                background: isActive ? C.white : isDone ? C.amber : 'rgba(5,7,12,0.9)',
                border: `2px solid ${isActive || isDone ? C.amber : 'rgba(255,255,255,0.4)'}`,
                boxShadow: isActive ? `0 0 40px ${C.amber}` : isDone ? `0 0 20px rgba(255,180,92,0.5)` : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: F.mono,
                fontSize: 18,
                color: isActive || isDone ? C.void : C.white,
                transform: `scale(${appear * (isActive ? 1.15 : 1)})`,
              }}
            >
              0{i + 1}
            </div>
            <div
              style={{
                position: 'absolute',
                left: lx - 100,
                top: ly - 18,
                width: 200,
                textAlign: i === 1 ? 'left' : i === 3 ? 'right' : 'center',
                paddingLeft: i === 1 ? 100 : 0,
                paddingRight: i === 3 ? 100 : 0,
                boxSizing: 'border-box',
                fontFamily: F.mono,
                fontSize: 19,
                letterSpacing: '0.2em',
                color: isActive || isDone ? C.amber : C.soft,
                opacity: appear,
              }}
            >
              {s.name}
            </div>
          </React.Fragment>
        );
      })}

      {/* the active habit, left; it leaves before the next one (or the closing line) arrives */}
      {STEPS.map((s, i) => {
        const at = Q.steps[i];
        const outAt = i < 3 ? Q.steps[i + 1] - 0.35 : Q.loop - 0.35;
        if (t < at || t > outAt + 0.4) return null;
        const q = pr(t, outAt, 0.35, EIO);
        return (
          <div key={s.name} style={{position: 'absolute', left: 150, top: 380, width: 760, opacity: 1 - q, transform: `translateY(${q * -30}px)`, filter: q > 0 ? `blur(${q * 8}px)` : undefined}}>
            <Label size={15} color={C.amber}>
              Step 0{i + 1} / 04
            </Label>
            <div style={{marginTop: 14, fontFamily: F.black, fontSize: 124, lineHeight: 0.95, color: C.white, letterSpacing: '-0.02em', textShadow: '0 0 40px rgba(255,255,255,0.15)'}}>
              <Letters text={s.name} at={at} mode="slam" stagger={0.045} />
            </div>
            <FadeUp at={at + 0.4} style={{marginTop: 30}}>
              <div style={{fontFamily: F.sans, fontSize: 34, lineHeight: 1.42, color: C.white, width: 700}}>{s.body}</div>
            </FadeUp>
          </div>
        );
      })}
      {t >= Q.loop + 0.15 && (
        <div style={{position: 'absolute', left: 150, top: 400, fontFamily: F.display, fontStyle: 'italic', fontSize: 76, color: C.amber, lineHeight: 1.1, width: 760}}>
          <Letters text="One loop," at={Q.loop + 0.15} mode="rise" stagger={0.03} />
          <br />
          <Letters text="every assignment." at={Q.loop + 0.45} mode="rise" stagger={0.025} />
        </div>
      )}
    </Scene>
  );
};
