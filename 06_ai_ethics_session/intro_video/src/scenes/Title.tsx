import React from 'react';
import cues from '../cues.json';
import {EDGES, NET_C, NODES, edgeHeat, nodeWorld} from '../film';
import {Scene, Kicker} from '../frame';
import {C, EIO, F, FadeUp, Label, Letters, pr, useT} from '../lib';
import {project} from '../particles';

const T = cues.title;

const META: [string, string][] = [
  ['Presented by', 'Group 1'],
  ['Session', 'Week 6 · Slot 11'],
  ['Format', 'Talk · game · quiz'],
  ['Instructor', 'Ms. Trương Thanh Tuyền'],
];

/** Edges of the network drawn as thin lines under the particles, with the pulse highlighted. */
const Wire: React.FC = () => {
  const t = useT();
  const draw = pr(t, T.net + 0.3, 1.2, EIO);
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {EDGES.map(([a, b], e) => {
        const pa = project(nodeWorld(a, t));
        const pb = project(nodeWorld(b, t));
        const h = edgeHeat(e, t);
        const hot = h >= 0 && h <= 1;
        const d = Math.min(1, Math.max(0, draw * 1.6 - e / EDGES.length));
        return (
          <line
            key={e}
            x1={pa[0]}
            y1={pa[1]}
            x2={pa[0] + (pb[0] - pa[0]) * d}
            y2={pa[1] + (pb[1] - pa[1]) * d}
            stroke={hot ? C.amber : C.machine}
            strokeOpacity={hot ? 0.9 : 0.16}
            strokeWidth={hot ? 2 : 1}
          />
        );
      })}
      {NODES.map((_, k) => {
        const p = project(nodeWorld(k, t));
        const s = pr(t, T.net + 0.2 + k * 0.05, 0.5);
        return <circle key={k} cx={p[0]} cy={p[1]} r={7 * p[2] * s} fill="none" stroke={C.white} strokeOpacity={0.5} strokeWidth={1.2} />;
      })}
      {/* orbit ring for depth */}
      <ellipse
        cx={NET_C.x}
        cy={NET_C.y + 250}
        rx={330 * draw}
        ry={70 * draw}
        fill="none"
        stroke={C.machine}
        strokeOpacity={0.18}
        strokeDasharray="3 9"
        transform={`rotate(${Math.sin(t * 0.5) * 3} ${NET_C.x} ${NET_C.y + 250})`}
      />
    </svg>
  );
};

export const Title: React.FC = () => {
  const t = useT();
  const rule = pr(t, T.line1 - 0.2, 1.2, EIO);
  return (
    <Scene start={T.start} end={T.end}>
      <Wire />

      <div style={{position: 'absolute', left: 150, top: 262}}>
        <Kicker num="01" text="Week 6 · Slot 11 · 90-minute session" at={T.line1 - 0.3} />
        <div style={{marginTop: 26, width: 760 * rule, height: 2, background: C.white, opacity: 0.6}} />
        <div style={{marginTop: 34, fontFamily: F.black, fontSize: 158, lineHeight: 0.98, letterSpacing: '-0.025em', color: C.white, textShadow: '0 0 40px rgba(255,255,255,0.12)'}}>
          <Letters text="HOW TO" at={T.line1} mode="cascade" stagger={0.035} />
          <br />
          <Letters text="USE AI" at={T.line1 + 0.2} mode="cascade" stagger={0.035} />
        </div>
        <div style={{marginTop: 10, fontFamily: F.display, fontStyle: 'italic', fontSize: 150, lineHeight: 1, letterSpacing: '-0.02em'}}>
          <Letters text="& AI Ethics" at={T.line2} mode="rise" stagger={0.03} sweep={{at: T.sweep, color: C.amber}} />
        </div>
      </div>

      <div style={{position: 'absolute', left: 150, top: 846, display: 'flex', gap: 0}}>
        {META.map(([k, v], i) => (
          <FadeUp key={k} at={T.meta + i * 0.1} style={{width: 330, borderLeft: `1px solid rgba(255,255,255,0.18)`, paddingLeft: 18}}>
            <Label size={14}>{k}</Label>
            <div style={{marginTop: 10, fontFamily: F.deck, fontSize: 28, color: C.white}}>{v}</div>
          </FadeUp>
        ))}
      </div>
    </Scene>
  );
};
