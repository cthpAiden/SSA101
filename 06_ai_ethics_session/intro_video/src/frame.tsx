import React from 'react';
import {AbsoluteFill, interpolate, interpolateColors, useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import cues from './cues.json';
import {C, EIO, EO, F, Label, hit, pr, shake, useT} from './lib';

const P = cues.prologue;
const R = cues.risk;
const Q = cues.practice;
const E = cues.epilogue;

const SECTION_STARTS = [cues.title.start, cues.scale.start, R.start, cues.learning.start, Q.start, E.start];

/** The camera: slow handheld drift, a punch on every cut, shakes on impacts. */
export const camera = (t: number) => {
  const drift = {
    x: noise2D('cx', t * 0.11, 0) * 14,
    y: noise2D('cy', t * 0.13, 5) * 10,
    zoom: 1.015 + 0.012 * Math.sin(t * 0.37),
    rot: noise2D('cr', t * 0.07, 9) * 0.25,
  };
  let punch = 0;
  for (const s of SECTION_STARTS) punch += hit(t, s, 0.8) * 0.06;
  const sh = shake(t, [
    ...P.slams.map((at) => ({at, amp: 22, dur: 0.45})),
    {at: R.stamp, amp: 34, dur: 0.7},
    {at: Q.loop, amp: 10, dur: 0.6},
    {at: E.bloom, amp: 8, dur: 0.8},
  ]);
  // slow push-in across each section so the frame is never static
  let push = 0;
  for (const s of SECTION_STARTS) push += pr(t, s, 12, EO) * 0.025 - pr(t, s, 0.001) * 0.025 * 0; // accumulate
  const secIdx = SECTION_STARTS.reduce((a, s, i) => (t >= s ? i : a), -1);
  const secStart = secIdx < 0 ? 0 : SECTION_STARTS[secIdx];
  const creep = 0.035 * pr(t, secStart, 14, EO);
  return {
    x: drift.x + sh.x,
    y: drift.y + sh.y,
    zoom: drift.zoom + punch + creep,
    rot: drift.rot + sh.r,
  };
};

/** Wraps the whole picture in the camera transform. */
export const World: React.FC<{children: React.ReactNode}> = ({children}) => {
  const t = useT();
  const cam = camera(t);
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${cam.x}px, ${cam.y}px) rotate(${cam.rot}deg) scale(${cam.zoom})`,
        transformOrigin: '50% 50%',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Moving aurora blobs on near-black; hue shifts with the section. */
export const Sky: React.FC = () => {
  const t = useT();
  const warm = interpolate(t, [Q.start - 0.5, Q.start + 2, E.answer - 0.5, E.answer + 1.5], [0, 0.6, 0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cold = interpolate(t, [R.start, R.start + 1.5, R.end - 1, R.end], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const a = interpolateColors(warm, [0, 1], ['rgba(46,91,216,0.34)', 'rgba(255,140,60,0.30)']);
  const b = interpolateColors(cold, [0, 1], ['rgba(120,60,200,0.18)', 'rgba(60,140,220,0.22)']);
  const ax = 50 + noise2D('ax', t * 0.08, 0) * 28;
  const ay = 45 + noise2D('ay', t * 0.08, 3) * 22;
  const bx = 50 + noise2D('bx', t * 0.07, 7) * 34;
  const by = 55 + noise2D('by', t * 0.07, 11) * 26;
  const flash = (R.stamp <= t ? hit(t, R.stamp, 0.5) : 0) * 0.55;
  return (
    <AbsoluteFill style={{background: C.void}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 55% 50% at ${ax}% ${ay}%, ${a}, rgba(0,0,0,0) 70%), radial-gradient(ellipse 45% 60% at ${bx}% ${by}%, ${b}, rgba(0,0,0,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(180,200,235,0.13) 1.1px, transparent 1.3px)',
          backgroundSize: '44px 44px',
          backgroundPosition: `${(t * 6) % 44}px ${(t * 3) % 44}px`,
          opacity: 0.7,
        }}
      />
      {flash > 0 && <AbsoluteFill style={{background: `rgba(255,70,40,${flash})`}} />}
    </AbsoluteFill>
  );
};

/** A quick bright flash at every cut. */
export const Flashes: React.FC = () => {
  const t = useT();
  let a = 0;
  for (const s of SECTION_STARTS) a += hit(t, s, 0.45) * 0.55;
  a += hit(t, E.bloom, 0.9) * 0.5;
  if (a <= 0.005) return null;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,250,240,${Math.min(0.9, a)}), rgba(255,250,240,${a * 0.3}) 60%, rgba(0,0,0,0))`,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}
    />
  );
};

/** Film grain and vignette on top of everything. */
export const Grain: React.FC<{dark: number}> = ({dark}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 80% 75% at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,${0.55 * dark + 0.12 * (1 - dark)}) 100%)`,
        }}
      />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: 0.09 * dark + 0.06 * (1 - dark), mixBlendMode: dark > 0.5 ? 'screen' : 'multiply'}}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={1} seed={frame % 12} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/** SVG colour filters used by the glitch effect. */
export const Defs: React.FC = () => (
  <svg width={0} height={0} style={{position: 'absolute'}}>
    <defs>
      <filter id="redOnly">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      </filter>
      <filter id="blueOnly">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0.6 0 0 0  0 0 1 0 0  0 0 0 1 0" />
      </filter>
    </defs>
  </svg>
);

/** Dark-theme amount of the chrome: 1 everywhere except the paper ending. */
export const darkness = (t: number) => 1 - pr(t, E.flood, 0.5, EIO);

const tc = (t: number) => {
  const s = Math.floor(t);
  const f = Math.floor((t - s) * cues.fps);
  return `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
};

/** Persistent HUD: timecode, course tag, section counter, progress rail. */
export const Chrome: React.FC = () => {
  const t = useT();
  const d = darkness(t);
  const ink = interpolateColors(d, [0, 1], [C.ink, C.white]);
  const soft = interpolateColors(d, [0, 1], ['#6B7390', C.soft]);
  const accent = interpolateColors(d, [0, 1], ['#C8462B', C.ember]);
  const appear = pr(t, 0.3, 1.0) * (1 - pr(t, E.fade, 0.8));
  const sections = cues.sections as [string, number, string][];
  const idx = sections.reduce((acc, [, s], i) => (t >= s ? i : acc), 0);
  const roll = idx === 0 ? 1 : pr(t, sections[idx][1], 0.5, EIO);
  const x0 = 96;
  const x1 = 1824;
  const xs = (s: number) => x0 + ((x1 - x0) * s) / cues.duration;
  return (
    <AbsoluteFill style={{opacity: appear, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: x0, top: 58, display: 'flex', gap: 26, alignItems: 'center'}}>
        <Label color={ink} size={13}>
          SSL101 <span style={{color: soft}}>/</span> Group 1
        </Label>
        <div style={{width: 1, height: 14, background: soft, opacity: 0.6}} />
        <div style={{fontFamily: F.mono, fontSize: 13, letterSpacing: '0.14em', color: soft, fontVariantNumeric: 'tabular-nums'}}>
          TC {tc(t)}
        </div>
        <div style={{width: 7, height: 7, borderRadius: 4, background: accent, opacity: 0.5 + 0.5 * Math.round(Math.sin(t * 6) * 0.5 + 0.5)}} />
      </div>
      <div style={{position: 'absolute', right: 1920 - x1, top: 56, height: 22, overflow: 'hidden', textAlign: 'right'}}>
        <div style={{transform: `translateY(${idx > 0 ? -roll * 22 : 0}px)`}}>
          {idx > 0 && (
            <Label color={ink} size={13} style={{height: 22, lineHeight: '22px', opacity: 1 - roll}}>
              § {sections[idx - 1][2]} <span style={{color: soft}}>&nbsp;{sections[idx - 1][0]}</span>
            </Label>
          )}
          <Label color={ink} size={13} style={{height: 22, lineHeight: '22px', opacity: idx > 0 ? roll : 1}}>
            § {sections[idx][2]} <span style={{color: soft}}>&nbsp;{sections[idx][0]}</span>
          </Label>
        </div>
      </div>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={x0} x2={x1} y1={1018} y2={1018} stroke={ink} strokeOpacity={0.22} />
        <line x1={x0} x2={xs(t)} y1={1018} y2={1018} stroke={accent} strokeWidth={2} />
        <circle cx={xs(t)} cy={1018} r={3.5} fill={accent} />
        {sections.map(([, s], i) => (
          <line key={i} x1={xs(s)} x2={xs(s)} y1={1013} y2={1023} stroke={ink} strokeOpacity={i <= idx ? 0.8 : 0.3} />
        ))}
      </svg>
      {sections.map(([name, s], i) => (
        <Label
          key={name}
          size={10.5}
          color={i === idx ? ink : soft}
          style={{position: 'absolute', left: xs(s) + 8, top: 994, opacity: i === idx ? 1 : 0.5, letterSpacing: '0.22em'}}
        >
          {name}
        </Label>
      ))}
    </AbsoluteFill>
  );
};

/** A section's visibility window with a soft push-back exit. */
export const Scene: React.FC<{start: number; end: number; children: React.ReactNode}> = ({start, end, children}) => {
  const t = useT();
  if (t < start || t > end) return null;
  const q = pr(t, end - 0.5, 0.5, EIO);
  return (
    <AbsoluteFill
      style={{
        opacity: 1 - q,
        transform: q > 0 ? `scale(${1 + 0.06 * q})` : undefined,
        filter: q > 0 ? `blur(${q * 10}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** "§ 02 · Scale" kicker plus a drawn rule. */
export const Kicker: React.FC<{num: string; text: string; at: number; style?: React.CSSProperties}> = ({num, text, at, style}) => {
  const t = useT();
  const k = pr(t, at, 0.6);
  const line = pr(t, at, 0.9, EIO);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: k, ...style}}>
      <Label color={C.ember} size={14}>
        § {num}
      </Label>
      <div style={{width: 60 * line, height: 1.5, background: C.ember, boxShadow: `0 0 10px ${C.ember}`}} />
      <Label color={C.soft} size={14}>
        {text}
      </Label>
    </div>
  );
};
