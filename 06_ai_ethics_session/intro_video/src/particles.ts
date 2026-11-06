// A deterministic particle field: every frame is a pure function of time, so
// Remotion can render frames in any order on several browser tabs.
//
// The film is a list of formations. Each formation says where particle i sits
// once it is formed (`pos`), which palette entry it uses, and how long the
// morph into it takes. Between formations particles hold with a slight drift.
import {random} from 'remotion';
import {noise2D, noise3D} from '@remotion/noise';
import {EIO, clamp01} from './lib';

export const N = 5200;
export const W = 1920;
export const H = 1080;

export type V3 = [number, number, number];

export type Formation = {
  at: number; // time at which the formation is complete
  dur: number; // morph length ending at `at`
  pos: (i: number, t: number) => V3; // formed position (z for depth and projection)
  color: (i: number, t: number) => number; // palette index
  size?: (i: number, t: number) => number; // 1 = default
  alpha?: (i: number, t: number) => number;
  swoop?: number; // sideways arc while morphing, px
  stagger?: number; // fraction of dur spread across particles
};

export type Impact = {at: number; x: number; y: number; amp: number; dur?: number};

export const PALETTE: [number, number, number][] = [
  [125, 183, 255], // 0 machine blue
  [169, 196, 232], // 1 cold
  [255, 180, 92], // 2 amber
  [255, 122, 61], // 3 ember
  [255, 77, 58], // 4 red
  [245, 241, 232], // 5 white
  [60, 80, 140], // 6 dim blue
];

const FOCAL = 1100;

/** Perspective projection around the screen centre. */
export const project = (p: V3): [number, number, number] => {
  const s = FOCAL / (FOCAL + p[2]);
  return [W / 2 + (p[0] - W / 2) * s, H / 2 + (p[1] - H / 2) * s, s];
};

export const r = (seed: string | number, i: number) => random(`${seed}-${i}`);

// ------------------------------------------------------------------ sampling

/** Points inside glyphs of `text`, drawn with `font` and centred at (cx, cy). */
export const sampleText = (
  text: string,
  font: string,
  cx: number,
  cy: number,
  n: number,
  seed = 't',
  align: CanvasTextAlign = 'center',
): V3[] => {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(text, cx, cy);
  return sampleCanvas(ctx, n, seed);
};

export const sampleCanvas = (ctx: CanvasRenderingContext2D, n: number, seed: string): V3[] => {
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: V3[] = [];
  const step = 3;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 120) pts.push([x, y, 0]);
    }
  }
  if (pts.length === 0) return Array.from({length: n}, () => [W / 2, H / 2, 0] as V3);
  // pick n points with a seeded shuffle so the mapping is stable and unbanded
  const out: V3[] = [];
  for (let i = 0; i < n; i++) {
    const p = pts[Math.floor(random(`${seed}${i}`) * pts.length)];
    out.push([p[0] + (random(`${seed}x${i}`) - 0.5) * step, p[1] + (random(`${seed}y${i}`) - 0.5) * step, 0]);
  }
  return out;
};

/** Points filling an axis-aligned rectangle list (each rect gets a share proportional to area). */
export const sampleRects = (rects: {x: number; y: number; w: number; h: number}[], n: number, seed = 'r'): V3[] => {
  const area = rects.map((q) => q.w * q.h);
  const total = area.reduce((a, b) => a + b, 0);
  const out: V3[] = [];
  let k = 0;
  rects.forEach((q, j) => {
    const m = j === rects.length - 1 ? n - out.length : Math.round((n * area[j]) / total);
    for (let i = 0; i < m; i++, k++) {
      out.push([q.x + random(`${seed}x${k}`) * q.w, q.y + random(`${seed}y${k}`) * q.h, 0]);
    }
  });
  while (out.length < n) out.push(out[out.length - 1]);
  return out.slice(0, n);
};

/** Points in a cloud of discs. */
export const sampleDiscs = (discs: {x: number; y: number; r: number}[], n: number, seed = 'd'): V3[] => {
  const out: V3[] = [];
  const per = Math.floor(n / discs.length);
  let k = 0;
  discs.forEach((d, j) => {
    const m = j === discs.length - 1 ? n - out.length : per;
    for (let i = 0; i < m; i++, k++) {
      const a = random(`${seed}a${k}`) * Math.PI * 2;
      const rr = Math.sqrt(random(`${seed}r${k}`)) * d.r;
      out.push([d.x + Math.cos(a) * rr, d.y + Math.sin(a) * rr, 0]);
    }
  });
  return out;
};

// ------------------------------------------------------------------ evaluation

const smoothstep = (x: number) => {
  const k = clamp01(x);
  return k * k * (3 - 2 * k);
};

export type Sample = {x: number; y: number; s: number; c0: number; c1: number; mix: number; size: number; alpha: number};

/** State of particle i at time t. */
export const evaluate = (forms: Formation[], impacts: Impact[], i: number, t: number, out: Sample) => {
  // which formation are we in or morphing towards
  let k = 0;
  for (let j = 0; j < forms.length; j++) {
    if (t >= forms[j].at - forms[j].dur) k = j;
  }
  const B = forms[k];
  const A = forms[Math.max(0, k - 1)];
  const stag = B.stagger ?? 0.4;
  const d = r('st', i) * stag * B.dur;
  const start = B.at - B.dur + d;
  const u = k === 0 ? 1 : clamp01((t - start) / (B.dur * (1 - stag)));
  const e = EIO(u);

  let p: V3;
  const pb = B.pos(i, t);
  if (u >= 1) {
    p = pb;
  } else {
    const pa = A.pos(i, t);
    const sw = (B.swoop ?? 120) * (r('sw', i) - 0.5) * 2 * Math.sin(Math.PI * e);
    const dx = pb[0] - pa[0];
    const dy = pb[1] - pa[1];
    const len = Math.hypot(dx, dy) || 1;
    p = [pa[0] + dx * e - (dy / len) * sw, pa[1] + dy * e + (dx / len) * sw, pa[2] + (pb[2] - pa[2]) * e];
  }

  // idle drift so nothing ever sits still
  const drift = 3 + 4 * r('dr', i);
  p = [
    p[0] + noise3D('px', i * 0.37, t * 0.35, 0) * drift,
    p[1] + noise3D('py', i * 0.37, t * 0.35, 7) * drift,
    p[2],
  ];

  // impacts push particles outward in a decaying ring
  for (const im of impacts) {
    if (t < im.at) continue;
    const age = t - im.at;
    const dur = im.dur ?? 1.2;
    if (age > dur) continue;
    const dx = p[0] - im.x;
    const dy = p[1] - im.y;
    const dist = Math.hypot(dx, dy) || 1;
    const env = Math.exp((-age / dur) * 3.5) * Math.sin(Math.min(1, age / 0.25) * Math.PI * 0.5);
    const push = (im.amp * env * 420) / (dist + 160);
    p = [p[0] + (dx / dist) * push, p[1] + (dy / dist) * push, p[2]];
  }

  const [x, y, s] = project(p);
  out.x = x;
  out.y = y;
  out.s = s;
  out.c0 = u >= 1 ? B.color(i, t) : A.color(i, t);
  out.c1 = B.color(i, t);
  out.mix = u >= 1 ? 1 : smoothstep(e);
  const sz = u >= 1 ? (B.size ? B.size(i, t) : 1) : (A.size ? A.size(i, t) : 1) * (1 - e) + (B.size ? B.size(i, t) : 1) * e;
  out.size = sz * (0.6 + 0.9 * r('sz', i)) * s;
  const al = u >= 1 ? (B.alpha ? B.alpha(i, t) : 1) : (A.alpha ? A.alpha(i, t) : 1) * (1 - e) + (B.alpha ? B.alpha(i, t) : 1) * e;
  out.alpha = al * (0.55 + 0.45 * r('al', i)) * Math.min(1, s * 1.1);
};

// ------------------------------------------------------------------ drawing

let sprites: HTMLCanvasElement[] | null = null;
const SPR = 64;

const makeSprites = () => {
  sprites = PALETTE.map(([rr, gg, bb]) => {
    const c = document.createElement('canvas');
    c.width = SPR;
    c.height = SPR;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(SPR / 2, SPR / 2, 0, SPR / 2, SPR / 2, SPR / 2);
    g.addColorStop(0, `rgba(${rr},${gg},${bb},1)`);
    g.addColorStop(0.18, `rgba(${rr},${gg},${bb},0.85)`);
    g.addColorStop(0.5, `rgba(${rr},${gg},${bb},0.22)`);
    g.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, SPR, SPR);
    return c;
  });
};

const tmp: Sample = {x: 0, y: 0, s: 1, c0: 0, c1: 0, mix: 1, size: 1, alpha: 1};

export const drawField = (
  canvas: HTMLCanvasElement,
  forms: Formation[],
  impacts: Impact[],
  t: number,
  globalAlpha: number,
  cam: {x: number; y: number; zoom: number},
) => {
  if (!sprites) makeSprites();
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, W, H);
  if (globalAlpha <= 0.001) return;
  ctx.save();
  ctx.translate(W / 2 + cam.x, H / 2 + cam.y);
  ctx.scale(cam.zoom, cam.zoom);
  ctx.translate(-W / 2, -H / 2);
  ctx.globalCompositeOperation = 'lighter';
  const base = 9;
  for (let i = 0; i < N; i++) {
    evaluate(forms, impacts, i, t, tmp);
    if (tmp.alpha <= 0.01) continue;
    const d = base * tmp.size;
    if (tmp.x < -d || tmp.x > W + d || tmp.y < -d || tmp.y > H + d) continue;
    const a = tmp.alpha * globalAlpha;
    if (tmp.mix >= 1 || tmp.c0 === tmp.c1) {
      ctx.globalAlpha = a;
      ctx.drawImage(sprites![tmp.c1], tmp.x - d, tmp.y - d, d * 2, d * 2);
    } else {
      ctx.globalAlpha = a * (1 - tmp.mix);
      ctx.drawImage(sprites![tmp.c0], tmp.x - d, tmp.y - d, d * 2, d * 2);
      ctx.globalAlpha = a * tmp.mix;
      ctx.drawImage(sprites![tmp.c1], tmp.x - d, tmp.y - d, d * 2, d * 2);
    }
  }
  ctx.restore();
};

/** Slow large bokeh discs for depth, drawn under the field. */
export const drawBokeh = (canvas: HTMLCanvasElement, t: number, hue: [number, number, number], alpha: number, cam: {x: number; y: number}) => {
  const ctx = canvas.getContext('2d')!;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 26; i++) {
    const z = 0.3 + r('bz', i) * 0.7; // parallax depth
    const x = ((r('bx', i) * (W + 600) + t * (6 + 10 * z) + cam.x * z * 0.5) % (W + 600)) - 300;
    const y = r('by', i) * (H + 300) - 150 + Math.sin(t * 0.3 + i) * 30 + cam.y * z * 0.5;
    const rad = 40 + r('br', i) * 110 * z;
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    const a = alpha * (0.05 + 0.08 * r('ba', i)) * z;
    g.addColorStop(0, `rgba(${hue[0]},${hue[1]},${hue[2]},${a})`);
    g.addColorStop(1, `rgba(${hue[0]},${hue[1]},${hue[2]},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  ctx.restore();
};

export {noise2D, noise3D};
