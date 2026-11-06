import React from 'react';
import cues from '../cues.json';
import {Scene, Kicker} from '../frame';
import {C, EIO, F, FadeUp, Label, Letters, pr, sp, useT} from '../lib';

const L = cues.learning;

/** Two memory traces over time: what you wrote yourself stays, what AI wrote for you fades. */
const Curves: React.FC = () => {
  const t = useT();
  const draw = pr(t, L.curves, 2.2, EIO);
  const X0 = 1000;
  const X1 = 1740;
  const Y0 = 360;
  const Y1 = 780;
  const pts = (fn: (u: number) => number) =>
    Array.from({length: 61}, (_, i) => {
      const u = i / 60;
      return `${X0 + (X1 - X0) * u},${Y1 - (Y1 - Y0) * fn(u)}`;
    }).join(' ');
  const keep = (u: number) => 0.92 - 0.12 * u;
  const fade = (u: number) => 0.92 * Math.exp(-u * 3.4) + 0.06;
  const len = 1000;
  const endK = pr(t, L.curves + 1.9, 0.5);
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <line x1={X0} x2={X0 + (X1 - X0) * draw} y1={Y1} y2={Y1} stroke={C.white} strokeOpacity={0.35} />
      <line x1={X0} x2={X0} y1={Y1} y2={Y1 - (Y1 - Y0) * draw} stroke={C.white} strokeOpacity={0.35} />
      <text x={X1} y={Y1 + 40} textAnchor="end" fontFamily={F.mono} fontSize={22} letterSpacing={3} fill={C.soft} opacity={draw}>
        TIME
      </text>
      <text x={X0 - 14} y={Y0 + 8} textAnchor="end" fontFamily={F.mono} fontSize={22} letterSpacing={3} fill={C.soft} opacity={draw}>
        REMEMBERED
      </text>
      <polyline points={pts(fade)} fill="none" stroke={C.machine} strokeOpacity={0.8} strokeWidth={4} strokeDasharray={len} strokeDashoffset={len * (1 - draw)} pathLength={len} />
      <polyline points={pts(keep)} fill="none" stroke={C.amber} strokeWidth={5} strokeDasharray={len} strokeDashoffset={len * (1 - draw)} pathLength={len} style={{filter: `drop-shadow(0 0 10px ${C.amber})`}} />
      <g opacity={endK}>
        <circle cx={X1} cy={Y1 - (Y1 - Y0) * keep(1)} r={9} fill={C.amber} />
        <circle cx={X1} cy={Y1 - (Y1 - Y0) * fade(1)} r={7} fill={C.machine} />
        <text x={X1 - 10} y={Y1 - (Y1 - Y0) * keep(1) - 22} textAnchor="end" fontFamily={F.sans} fontWeight={500} fontSize={30} fill={C.amber}>
          Written by you
        </text>
        <text x={X1 - 10} y={Y1 - (Y1 - Y0) * fade(1) - 22} textAnchor="end" fontFamily={F.sans} fontWeight={500} fontSize={30} fill={C.machine}>
          Written by AI
        </text>
      </g>
    </svg>
  );
};

/** Two meters: effort with AI as a coach rises; effort with AI as a shortcut sinks. */
const Meters: React.FC = () => {
  const t = useT();
  const k = pr(t, L.meters, 1.6, EIO);
  const base = 560;
  const items = [
    {label: 'AI explains. You try again.', tag: 'HELP', color: C.amber, h: 110 + 220 * k, x: 1080},
    {label: 'AI answers. You stop trying.', tag: 'HINDER', color: C.machine, h: 110 - 70 * k, x: 1460},
  ];
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={980} x2={1760} y1={base + 150} y2={base + 150} stroke={C.white} strokeOpacity={0.35} />
        <text x={960} y={base + 150 - 128} fontFamily={F.mono} fontSize={22} letterSpacing={3} fill={C.soft} opacity={pr(t, L.meters, 0.5)}>
          EFFORT
        </text>
        {items.map((m) => (
          <g key={m.tag}>
            <rect x={m.x} y={base + 150 - m.h} width={200} height={m.h} fill={m.color} fillOpacity={m.tag === 'HELP' ? 0.95 : 0.55} style={m.tag === 'HELP' ? {filter: `drop-shadow(0 0 18px ${m.color})`} : undefined} />
            <text x={m.x + 100} y={base + 150 - m.h - 18} textAnchor="middle" fontFamily={F.black} fontSize={30} letterSpacing={3} fill={m.color}>
              {m.tag}
            </text>
          </g>
        ))}
      </svg>
      {items.map((m, i) => (
        <FadeUp key={m.tag} at={L.meters + 0.3 + i * 0.2} style={{position: 'absolute', left: m.x - 40, top: base + 170, width: 280, textAlign: 'center'}}>
          <div style={{fontFamily: F.sans, fontSize: 28, lineHeight: 1.3, color: C.white}}>{m.label}</div>
        </FadeUp>
      ))}
    </div>
  );
};

export const Learning: React.FC = () => {
  const t = useT();
  const qOut = pr(t, L.qOut, 0.45, EIO);
  const memOut = pr(t, L.motivation - 0.4, 0.4, EIO);
  const k1 = sp(t, L.q1, 12, 240);
  const k2 = sp(t, L.q2, 12, 240);

  return (
    <Scene start={L.start} end={L.end}>
      {/* the question, large */}
      {t < L.qOut + 0.5 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            opacity: 1 - qOut,
            transform: `scale(${1 - 0.08 * qOut})`,
            filter: qOut > 0 ? `blur(${qOut * 12}px)` : undefined,
          }}
        >
          {t >= L.q1 && (
            <span style={{fontFamily: F.black, fontSize: 96, lineHeight: 1, color: C.white, transform: `scale(${2.2 - 1.2 * Math.min(1, k1)})`, opacity: Math.min(1, k1 * 3), textShadow: '0 0 40px rgba(255,255,255,0.18)'}}>
              IF AI WRITES IT,
            </span>
          )}
          {t >= L.q2 && (
            <span style={{fontFamily: F.black, fontSize: 128, lineHeight: 1, color: C.amber, transform: `scale(${2.4 - 1.4 * Math.min(1, k2)})`, opacity: Math.min(1, k2 * 3), textShadow: '0 0 70px rgba(255,180,92,0.6)'}}>
              DID YOU LEARN IT?
            </span>
          )}
        </div>
      )}

      {t >= L.header && (
        <>
          <div style={{position: 'absolute', left: 150, top: 150}}>
            <Kicker num="04" text="Learning" at={L.header} />
          </div>
          <div style={{position: 'absolute', left: 150, top: 196, fontFamily: F.display, fontSize: 68, letterSpacing: '-0.015em', color: C.white}}>
            <Letters text="Did you learn it?" at={L.header + 0.1} mode="rise" stagger={0.02} />
          </div>
        </>
      )}

      {/* memory */}
      {t >= L.memory && t < L.motivation && (
        <div style={{opacity: 1 - memOut, transform: `translateX(${-60 * memOut}px)`, filter: memOut > 0 ? `blur(${memOut * 8}px)` : undefined}}>
          <div style={{position: 'absolute', left: 150, top: 380, width: 720}}>
            <Label size={15} color={C.amber}>
              Memory
            </Label>
            <div style={{marginTop: 20, fontFamily: F.black, fontSize: 104, lineHeight: 0.95, color: C.white, letterSpacing: '-0.02em'}}>
              <Letters text="RETRIEVE" at={L.memory + 0.1} mode="slam" stagger={0.04} />
              <br />
              <span style={{color: C.amber}}>
                <Letters text="TO REMEMBER" at={L.memory + 0.4} mode="slam" stagger={0.035} />
              </span>
            </div>
            <FadeUp at={L.memory + 0.9} style={{marginTop: 30}}>
              <div style={{fontFamily: F.sans, fontSize: 32, lineHeight: 1.4, color: C.white, width: 680}}>
                You remember what you work to recall. What AI writes for you fades fast.
              </div>
            </FadeUp>
          </div>
          <Curves />
        </div>
      )}

      {/* motivation */}
      {t >= L.motivation && (
        <>
          <div style={{position: 'absolute', left: 150, top: 380, width: 720}}>
            <Label size={15} color={C.amber}>
              Motivation
            </Label>
            <div style={{marginTop: 20, fontFamily: F.black, fontSize: 104, lineHeight: 0.95, color: C.white, letterSpacing: '-0.02em'}}>
              <Letters text="EFFORT" at={L.motivation + 0.1} mode="slam" stagger={0.045} />
              <br />
              <span style={{color: C.amber}}>
                <Letters text="BUILDS YOU" at={L.motivation + 0.4} mode="slam" stagger={0.04} />
              </span>
            </div>
            <FadeUp at={L.motivation + 0.9} style={{marginTop: 30}}>
              <div style={{fontFamily: F.sans, fontSize: 32, lineHeight: 1.4, color: C.white, width: 680}}>
                Confidence comes from trying. A shortcut that skips the trying takes it away.
              </div>
            </FadeUp>
          </div>
          <Meters />
        </>
      )}

      {/* verdict */}
      <FadeUp at={L.verdict} style={{position: 'absolute', left: 150, top: 892, width: 1620, textAlign: 'center'}}>
        <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 50, color: C.amber, textShadow: '0 0 30px rgba(255,180,92,0.35)'}}>
          Same tool. The difference is how you use it.
        </div>
      </FadeUp>
    </Scene>
  );
};
