import React, {createContext, useContext} from 'react';
import {Easing, interpolate, interpolateColors, random, spring} from 'remotion';
import {noise2D} from '@remotion/noise';
import cues from './cues.json';

// Global time in seconds, provided once at the top of the composition so every
// scene reads the same clock as cues.json (and as the score in audio/score.py).
export const TimeCtx = createContext(0);
export const useT = () => useContext(TimeCtx);
export const FPS = cues.fps;

export const C = {
  void: '#05070C',
  deep: '#0B1020',
  ink: '#0E1B2C',
  paper: '#F4EFE4',
  paperHi: '#FCFAF4',
  white: '#F5F1E8',
  soft: '#9AA4BD',
  mute: '#5C667F',
  machine: '#7DB7FF',
  machineDeep: '#2F6BFF',
  cold: '#A9C4E8',
  amber: '#FFB45C',
  ember: '#FF7A3D',
  red: '#FF4D3A',
  redDeep: '#B5261C',
};

export const F = {
  display: 'Newsreader Display',
  deck: 'Newsreader Deck',
  sans: 'Plex Sans',
  mono: 'Plex Mono',
  black: 'Archivo Black',
};

export const EO = Easing.bezier(0.16, 1, 0.3, 1);
export const EIO = Easing.bezier(0.65, 0, 0.35, 1);
export const EI = Easing.bezier(0.7, 0, 0.84, 0);
export const ESOFT = Easing.bezier(0.33, 1, 0.68, 1);

/** Eased 0..1 progress of an animation that starts at `at` and lasts `dur` seconds. */
export const pr = (t: number, at: number, dur: number, easing = EO) =>
  interpolate(t, [at, at + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/** A spring that starts at `at`, 0 -> 1 with overshoot. */
export const sp = (t: number, at: number, damping = 14, stiffness = 180, mass = 1) =>
  t < at
    ? 0
    : spring({frame: (t - at) * FPS, fps: FPS, config: {damping, stiffness, mass}});

/** 1 at the moment of impact, decaying to 0 over `dur`. */
export const hit = (t: number, at: number, dur = 0.6) =>
  t < at ? 0 : Math.exp((-(t - at) / dur) * 4) * (1 - pr(t, at, dur, Easing.linear) * 0.2);

export const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => {
  const k = clamp01(x);
  return k * k * (3 - 2 * k);
};

/** Deterministic camera shake: amplitude in px, falls off after each impact. */
export const shake = (t: number, impacts: {at: number; amp: number; dur?: number}[]) => {
  let x = 0;
  let y = 0;
  let r = 0;
  for (const {at, amp, dur = 0.6} of impacts) {
    const k = hit(t, at, dur);
    if (k <= 0) continue;
    x += noise2D('sx', t * 28, at) * amp * k;
    y += noise2D('sy', t * 31, at) * amp * k;
    r += noise2D('sr', t * 19, at) * amp * 0.02 * k;
  }
  return {x, y, r};
};

/** Number of characters typed by time t, with a small deterministic rhythm. */
export const charTime = (start: number, step: number, i: number) =>
  start + i * step + 0.012 * Math.sin(i * 2.7);
export const typedChars = (t: number, start: number, step: number, length: number) => {
  let n = 0;
  for (let i = 0; i < length; i++) {
    if (t >= charTime(start, step, i)) n = i + 1;
  }
  return n;
};

export const Cursor: React.FC<{on: boolean; color?: string}> = ({on, color = C.machine}) => (
  <span
    style={{
      display: 'inline-block',
      width: '0.55em',
      height: '1.05em',
      marginLeft: 4,
      verticalAlign: '-0.18em',
      background: color,
      boxShadow: `0 0 18px ${color}`,
      opacity: on ? 1 : 0,
    }}
  />
);

/** A line whose content slides up from behind a mask. */
export const Rise: React.FC<{
  at: number;
  dur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  inline?: boolean;
}> = ({at, dur = 0.9, children, style, inline}) => {
  const t = useT();
  const k = pr(t, at, dur);
  return (
    <span
      style={{
        display: inline ? 'inline-block' : 'block',
        overflow: 'hidden',
        paddingBottom: '0.14em',
        marginBottom: '-0.14em',
        ...style,
      }}
    >
      <span
        style={{
          display: inline ? 'inline-block' : 'block',
          transform: `translateY(${(1 - k) * 125}%)`,
          visibility: k <= 0 ? 'hidden' : undefined,
        }}
      >
        {children}
      </span>
    </span>
  );
};

/** Fade in while drifting up a few pixels, with a slight blur. */
export const FadeUp: React.FC<{
  at: number;
  dur?: number;
  dist?: number;
  out?: number;
  outDur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({at, dur = 0.7, dist = 24, out, outDur = 0.4, children, style}) => {
  const t = useT();
  const k = pr(t, at, dur);
  const q = out === undefined ? 0 : pr(t, out, outDur, EIO);
  if (k <= 0 || q >= 1) return null;
  return (
    <div
      style={{
        opacity: k * (1 - q),
        transform: `translateY(${(1 - k) * dist - q * dist * 0.6}px)`,
        filter: k < 1 || q > 0 ? `blur(${(1 - k) * 6 + q * 6}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Small uppercase mono label. */
export const Label: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({children, color = C.soft, size = 15, style}) => (
  <div
    style={{
      fontFamily: F.mono,
      fontSize: size,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

type LetterMode = 'slam' | 'rise' | 'cascade' | 'scatter';

/**
 * Kinetic text: each letter animates on its own with a stagger.
 * slam: drops in from large scale with a spring; rise: slides up from a mask;
 * cascade: falls from above with rotation; scatter: flies in from random offsets.
 */
export const Letters: React.FC<{
  text: string;
  at: number;
  mode?: LetterMode;
  stagger?: number;
  out?: number;
  style?: React.CSSProperties;
  seed?: string;
  /** a bright band runs across the letters once, starting at sweep.at */
  sweep?: {at: number; dur?: number; color: string};
}> = ({text, at, mode = 'rise', stagger = 0.04, out, style, seed = 'l', sweep}) => {
  const t = useT();
  const q = out === undefined ? 0 : pr(t, out, 0.4, EI);
  if (t < at || q >= 1) return null;
  const sw = sweep ? pr(t, sweep.at, sweep.dur ?? 1.1, EIO) * (text.length + 6) - 3 : -99;
  return (
    <span style={{display: 'inline-block', whiteSpace: 'pre', ...style}}>
      {Array.from(text).map((ch, i) => {
        const a = at + i * stagger;
        let tr = '';
        let op = 1;
        let blur = 0;
        if (mode === 'slam') {
          const k = sp(t, a, 11, 260);
          const s = 2.2 - 1.2 * k;
          tr = `scale(${Math.max(1, s)})`;
          op = clamp01(k * 2.5);
          blur = Math.max(0, (1 - k) * 8);
        } else if (mode === 'rise') {
          const k = pr(t, a, 0.7);
          tr = `translateY(${(1 - k) * 60}px)`;
          op = k;
        } else if (mode === 'cascade') {
          const k = sp(t, a, 13, 170);
          tr = `translateY(${(1 - k) * -90}px) rotate(${(1 - k) * -14}deg)`;
          op = clamp01(k * 2);
        } else {
          const k = pr(t, a, 0.8);
          const dx = (random(`${seed}x${i}`) - 0.5) * 260;
          const dy = (random(`${seed}y${i}`) - 0.5) * 160;
          tr = `translate(${(1 - k) * dx}px, ${(1 - k) * dy}px) rotate(${(1 - k) * (random(`${seed}r${i}`) - 0.5) * 60}deg)`;
          op = k;
          blur = (1 - k) * 10;
        }
        const bright = sweep ? Math.exp(-((i - sw) ** 2) / 4.5) : 0;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `${tr} translateY(${q * -40}px)`,
              opacity: op * (1 - q),
              filter: blur > 0.2 || q > 0 ? `blur(${blur + q * 8}px)` : undefined,
              color: sweep ? interpolateColors(bright, [0, 1], [sweep.color, '#ffffff']) : undefined,
              textShadow: sweep && bright > 0.05 ? `0 0 ${30 * bright}px rgba(255,255,255,${0.8 * bright})` : undefined,
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
};

/** Digital glitch: the content is sliced and shifted sideways with an RGB split while `amount` > 0. */
export const Glitch: React.FC<{amount: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  amount,
  children,
  style,
}) => {
  const t = useT();
  if (amount <= 0.01) return <div style={style}>{children}</div>;
  const slices = Array.from({length: 7}, (_, i) => {
    const y0 = (i / 7) * 100;
    const y1 = ((i + 1) / 7) * 100;
    const dx = noise2D('g', i * 3.1, Math.floor(t * 24)) * 60 * amount;
    return {y0, y1, dx};
  });
  return (
    <div style={{position: 'relative', ...style}}>
      <div style={{opacity: 0.9}}>{children}</div>
      {slices.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(${s.y0}% 0 ${100 - s.y1}% 0)`,
            transform: `translateX(${s.dx}px)`,
          }}
        >
          {children}
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${-14 * amount}px)`,
          mixBlendMode: 'screen',
          opacity: 0.7 * amount,
          filter: 'url(#redOnly)',
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${14 * amount}px)`,
          mixBlendMode: 'screen',
          opacity: 0.7 * amount,
          filter: 'url(#blueOnly)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Text with a bright band sweeping across it once, starting at `at`. */
export const Sweep: React.FC<{at: number; dur?: number; color: string; children: React.ReactNode; style?: React.CSSProperties}> = ({
  at,
  dur = 1.2,
  color,
  children,
  style,
}) => {
  const t = useT();
  const k = pr(t, at, dur, EIO);
  const x = -40 + k * 180;
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(100deg, ${color} ${x - 30}%, #ffffff ${x}%, ${color} ${x + 30}%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        ...style,
      }}
    >
      {children}
    </span>
  );
};
