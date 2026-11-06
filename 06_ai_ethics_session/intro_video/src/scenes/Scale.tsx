import React from 'react';
import {interpolate} from 'remotion';
import cues from '../cues.json';
import {Scene, Kicker} from '../frame';
import {C, EIO, EO, F, FadeUp, Label, Letters, hit, pr, useT} from '../lib';

const S = cues.scale;
const BARS: [string, number][] = [
  ['ChatGPT', 2],
  ['TikTok', 9],
  ['Instagram', 30],
];
const BAR_X = 640;
const BAR_Y = [410, 530, 650];

export const Scale: React.FC = () => {
  const t = useT();
  const count = Math.round(interpolate(t, S.count, [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EO}));
  const phase1Out = S.bars - 0.4;
  const phase2Out = S.grid - 0.4;
  const phase3Out = S.takeaway - 0.3;
  return (
    <Scene start={S.start} end={S.end}>
      <div style={{position: 'absolute', left: 150, top: 150}}>
        <Kicker num="02" text="Scale" at={S.start + 0.3} />
      </div>

      {/* phase 1: the number is made of particles; the DOM carries the caption */}
      <FadeUp at={S.hundred} out={phase1Out} style={{position: 'absolute', left: 150, top: 220}}>
        <Label size={14} color={C.machine}>
          ChatGPT · January 2023
        </Label>
      </FadeUp>
      <FadeUp at={S.hundred} out={phase1Out} dist={40} style={{position: 'absolute', left: 130, top: 290}}>
        <div
          style={{
            fontFamily: F.black,
            fontSize: 400,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: C.white,
            fontVariantNumeric: 'tabular-nums',
            textShadow: `0 0 60px rgba(125,183,255,${0.35 + 0.35 * pr(t, S.count[1], 0.6)}), 0 0 140px rgba(125,183,255,0.25)`,
            transform: `scale(${1 + 0.03 * hit(t, S.count[1], 0.8)})`,
            transformOrigin: '0 50%',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{display: 'inline-block', minWidth: 760, textAlign: 'right'}}>{count}</span>
          <span style={{color: C.machine}}>M</span>
        </div>
      </FadeUp>
      <FadeUp at={S.count[0]} out={phase1Out} style={{position: 'absolute', left: 1410, top: 440}}>
        <div style={{fontFamily: F.mono, fontSize: 28, color: C.soft, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums'}}>
          {String(count).padStart(3, '0')}
          <span style={{opacity: 0.5}}> / 100</span>
        </div>
        <div style={{marginTop: 8, width: 300, height: 2, background: 'rgba(255,255,255,0.12)'}}>
          <div style={{width: `${count}%`, height: '100%', background: C.machine, boxShadow: `0 0 12px ${C.machine}`}} />
        </div>
      </FadeUp>
      <FadeUp at={S.label} out={phase1Out} style={{position: 'absolute', left: 150, top: 760, width: 1000}}>
        <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 54, color: C.white, lineHeight: 1.1}}>
          one hundred million monthly users,
        </div>
        <div style={{fontFamily: F.sans, fontSize: 28, color: C.soft, marginTop: 14}}>
          about two months after the public launch. The fastest consumer app on record.
          <sup style={{fontFamily: F.mono, fontSize: 15, color: C.ember, marginLeft: 5}}>1</sup>
        </div>
      </FadeUp>

      {/* phase 2: bars (particles) with labels and axis */}
      <FadeUp at={S.bars + 0.2} out={phase2Out} style={{position: 'absolute', left: 150, top: 220}}>
        <Label size={14} color={C.machine}>
          Fig. 1 · Months to reach 100 million users
        </Label>
      </FadeUp>
      {BARS.map(([name, months], j) => {
        const g = pr(t, S.barGrow[j], S.barDur[j], EIO);
        const w = months * 30 * g;
        const valueIn = pr(t, S.barGrow[j] + S.barDur[j] - 0.05, 0.3);
        return (
          <FadeUp key={name} at={S.barGrow[j] - 0.3} out={phase2Out} style={{position: 'absolute', left: 150, top: BAR_Y[j] - 2}}>
            <div style={{display: 'flex', alignItems: 'center', height: 60}}>
              <div style={{width: BAR_X - 150, fontFamily: F.deck, fontSize: 40, color: j === 0 ? C.ember : C.white}}>{name}</div>
              <div
                style={{
                  width: Math.max(0, w),
                  height: 44,
                  background: j === 0 ? `linear-gradient(90deg, ${C.ember}, ${C.amber})` : `linear-gradient(90deg, rgba(169,196,232,0.55), rgba(169,196,232,0.9))`,
                  boxShadow: j === 0 ? `0 0 30px rgba(255,122,61,0.55)` : '0 0 18px rgba(169,196,232,0.25)',
                  borderRadius: 2,
                }}
              />
              <div style={{marginLeft: 18, fontFamily: F.mono, fontSize: 34, color: j === 0 ? C.ember : C.cold, fontVariantNumeric: 'tabular-nums', opacity: valueIn, transform: `translateX(${(1 - valueIn) * -10}px)`}}>
                {months}
                <span style={{fontSize: 28, color: C.soft, marginLeft: 10}}>months</span>
              </div>
            </div>
          </FadeUp>
        );
      })}
      <FadeUp at={S.bars + 0.4} out={phase2Out} dist={0} style={{position: 'absolute', left: BAR_X, top: 740}}>
        <svg width={1200} height={50} style={{overflow: 'visible'}}>
          {[0, 6, 12, 18, 24, 30].map((m) => (
            <g key={m}>
              <line x1={m * 30} x2={m * 30} y1={0} y2={10} stroke={C.soft} strokeOpacity={0.6} />
              <text x={m * 30} y={32} textAnchor="middle" fontFamily={F.mono} fontSize={13} fill={C.soft}>
                {m}
              </text>
            </g>
          ))}
          <line x1={0} x2={30 * 30} y1={0} y2={0} stroke={C.soft} strokeOpacity={0.4} />
          <text x={30 * 30 + 20} y={6} fontFamily={F.mono} fontSize={11} fill={C.soft} letterSpacing={2}>
            MONTHS
          </text>
        </svg>
      </FadeUp>

      {/* phase 3: 1 in 10 */}
      <FadeUp at={S.grid + 0.3} out={phase3Out} style={{position: 'absolute', left: 150, top: 300, width: 760}}>
        <Label size={14} color={C.machine}>
          Schools and universities surveyed, 2023
        </Label>
        <div style={{marginTop: 26, fontFamily: F.black, fontSize: 104, lineHeight: 0.95, color: C.white, letterSpacing: '-0.02em'}}>
          FEWER THAN
          <br />
          <span style={{fontSize: 150, color: C.amber, textShadow: `0 0 40px rgba(255,180,92,0.5)`, opacity: pr(t, S.gridLit, 0.4)}}>1 IN 10</span>
        </div>
        <div style={{marginTop: 26, fontFamily: F.sans, fontSize: 32, color: C.white, lineHeight: 1.45, opacity: pr(t, S.gridLabel, 0.5)}}>
          had formal guidance on generative AI.
          <sup style={{fontFamily: F.mono, fontSize: 15, color: C.ember, marginLeft: 5}}>2</sup>
        </div>
      </FadeUp>

      {/* phase 4: takeaway */}
      {t >= S.takeaway && (
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: F.black, fontSize: 164, lineHeight: 0.95, color: C.white, letterSpacing: '-0.02em', textAlign: 'center'}}>
            <Letters text="ADOPTION" at={S.takeaway} mode="slam" stagger={0.03} />
            <br />
            <span style={{color: C.ember, textShadow: '0 0 50px rgba(255,122,61,0.5)'}}>
              <Letters text="OUTPACED" at={S.takeaway + 0.3} mode="slam" stagger={0.03} />
            </span>
            <br />
            <Letters text="GUIDANCE" at={S.takeaway + 0.6} mode="slam" stagger={0.03} />
          </div>
          <FadeUp at={S.survey + 0.3} style={{marginTop: 40}}>
            <div style={{fontFamily: F.sans, fontSize: 28, color: C.soft, textAlign: 'center', lineHeight: 1.4}}>
              <sup style={{fontFamily: F.mono, color: C.ember}}>1</sup> Reuters, UBS note, Feb 2023 &nbsp;·&nbsp; <sup style={{fontFamily: F.mono, color: C.ember}}>2</sup> UNESCO survey, May 2023
            </div>
          </FadeUp>
        </div>
      )}
    </Scene>
  );
};
