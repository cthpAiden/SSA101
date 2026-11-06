// The particle choreography for the whole film, in one place, read from cues.json.
import cues from './cues.json';
import {F, pr, clamp01, EIO} from './lib';
import {Formation, Impact, V3, N, W, H, r, sampleText, sampleDiscs, noise2D, project} from './particles';

const P = cues.prologue;
const T = cues.title;
const S = cues.scale;
const R = cues.risk;
const Q = cues.practice;
const L = cues.learning;
const E = cues.epilogue;

export const PROMPT = 'Write my essay on AI ethics.';
export const PROMPT_POS = {x: 300, y: 318, size: 46};
export const FLAGGED = (i: number) => i % 23 === 0;

// ------------------------------------------------------------------ network (title)

export const LAYERS = [3, 5, 5, 2];
export const NET_C = {x: 1330, y: 560};
export const NODES: V3[] = LAYERS.flatMap((n, li) =>
  Array.from({length: n}, (_, j) => [li * 150 - 225, (j - (n - 1) / 2) * 92, (r('nz', li * 10 + j) - 0.5) * 260] as V3),
);
const nodeIndex = (li: number, j: number) => LAYERS.slice(0, li).reduce((a, b) => a + b, 0) + j;
export const EDGES: [number, number][] = LAYERS.slice(0, -1).flatMap((n, li) =>
  Array.from({length: n}, (_, i) => Array.from({length: LAYERS[li + 1]}, (_, j) => [nodeIndex(li, i), nodeIndex(li + 1, j)] as [number, number])).flat(),
);
export const netAngle = (t: number) => (t - T.start) * 0.22 + 0.35 * Math.sin((t - T.start) * 0.5);
/** Node position in world space after the slow turn. */
export const nodeWorld = (k: number, t: number): V3 => {
  const [x, y, z] = NODES[k];
  const a = netAngle(t);
  const xr = x * Math.cos(a) - z * Math.sin(a);
  const zr = x * Math.sin(a) + z * Math.cos(a);
  return [NET_C.x + xr, NET_C.y + y + Math.sin(t * 0.7 + k) * 4, zr];
};
export const pulsePath = (cycle: number) => LAYERS.map((n, li) => Math.floor(r(`pp${cycle}`, li) * n));
const PULSE_PERIOD = 1.4;
const HOP = 0.3;
/** Is edge e hot right now, and where along it is the pulse (0..1)? */
export const edgeHeat = (e: number, t: number): number => {
  if (t < T.pulse) return 0;
  const since = t - T.pulse;
  const cycle = Math.floor(since / PULSE_PERIOD);
  const phase = since - cycle * PULSE_PERIOD;
  const path = pulsePath(cycle);
  const [a, b] = EDGES[e];
  for (let li = 0; li < LAYERS.length - 1; li++) {
    if (nodeIndex(li, path[li]) === a && nodeIndex(li + 1, path[li + 1]) === b) {
      const u = (phase - li * HOP) / HOP;
      return u >= 0 && u <= 1.3 ? u : -1;
    }
  }
  return -1;
};

// ------------------------------------------------------------------ helpers

const dust = (seed: string, spread = 1.0, zmax = 900) => (i: number, t: number): V3 => [
  (r(`${seed}x`, i) - 0.5) * W * 1.5 * spread + W / 2 + noise2D(`${seed}dx`, i, t * 0.05) * 60,
  (r(`${seed}y`, i) - 0.5) * H * 1.6 * spread + H / 2 + noise2D(`${seed}dy`, i, t * 0.05) * 60,
  r(`${seed}z`, i) * zmax - 200,
];

export const RING_C = {x: 1300, y: 540};
export const RING_R = 280;

// ------------------------------------------------------------------ the plan

export const buildFilm = (): {forms: Formation[]; impacts: Impact[]} => {
  const promptPts = sampleText(
    PROMPT,
    `${PROMPT_POS.size}px "${F.mono}"`,
    PROMPT_POS.x,
    PROMPT_POS.y,
    N,
    'prompt',
    'left',
  );

  const GRID = Array.from({length: 100}, (_, k) => ({x: 1000 + (k % 10) * 62, y: 290 + Math.floor(k / 10) * 62, r: 15}));
  const gridPts = sampleDiscs(GRID, N, 'grid');
  const LIT = new Set([3, 17, 28, 41, 55, 62, 74, 86, 99]);

  const forms: Formation[] = [
    {at: 0, dur: 0, pos: dust('d0'), color: () => 6, alpha: () => 0.5, size: () => 0.8},
    {
      at: P.burst,
      dur: 0.25,
      stagger: 0.3,
      swoop: 20,
      pos: (i) => promptPts[i],
      color: () => 0,
      size: () => 0.55,
    },
    {
      at: P.streamStart + 0.35,
      dur: 0.45,
      stagger: 0.5,
      swoop: 60,
      pos: (i, t) => {
        const tf = Math.min(t, P.freeze);
        const lane = i % 16;
        const v = 520 + 260 * r('sv', i);
        const span = W + 500;
        const x = ((r('sx', i) * span + (tf - P.streamStart) * v) % span) - 250;
        const y = 300 + lane * 32 + Math.sin(x * 0.01 + lane) * 6;
        return [x, y, (r('sz', i) - 0.5) * 120];
      },
      color: (i, t) => (FLAGGED(i) && t >= P.flag ? 4 : r('sc', i) < 0.25 ? 1 : 0),
      size: (i, t) => (FLAGGED(i) && t >= P.flag ? 1.6 + 0.4 * Math.sin((t - P.flag) * 12) : 0.75),
      alpha: (i, t) => (t >= P.flag && !FLAGGED(i) ? 0.45 : 1),
    },
    {
      at: P.slams[0] + 0.2,
      dur: 0.5,
      stagger: 0.3,
      swoop: 80,
      pos: dust('d1', 1.1, 700),
      color: (i) => (FLAGGED(i) ? 3 : 6),
      alpha: () => 0.6,
      size: () => 0.9,
    },
    // title: particles sit on the edges of a slowly turning network
    {
      at: T.net + 1.3,
      dur: 1.3,
      stagger: 0.45,
      swoop: 160,
      pos: (i, t) => {
        if (i % 9 === 0) {
          // node glow
          const k = i % NODES.length;
          const [x, y, z] = nodeWorld(k, t);
          const a = r('na', i) * Math.PI * 2;
          const rr = r('nr', i) * 14;
          return [x + Math.cos(a) * rr, y + Math.sin(a) * rr, z];
        }
        const e = i % EDGES.length;
        const u = r('eu', i);
        const [a, b] = EDGES[e];
        const pa = nodeWorld(a, t);
        const pb = nodeWorld(b, t);
        return [pa[0] + (pb[0] - pa[0]) * u, pa[1] + (pb[1] - pa[1]) * u, pa[2] + (pb[2] - pa[2]) * u];
      },
      color: (i, t) => {
        if (i % 9 === 0) return 5;
        const e = i % EDGES.length;
        const u = r('eu', i);
        const h = edgeHeat(e, t);
        return h >= 0 && Math.abs(h - u) < 0.14 ? 2 : 0;
      },
      size: (i, t) => {
        if (i % 9 === 0) return 0.9;
        const e = i % EDGES.length;
        const h = edgeHeat(e, t);
        return h >= 0 && Math.abs(h - r('eu', i)) < 0.14 ? 1.5 : 0.55;
      },
      alpha: (i, t) => (i % 9 === 0 ? 1 : 0.7),
    },
    // scale: a wide slow drift behind the solid number and bars
    {
      at: S.hundred + 1.0,
      dur: 1.0,
      stagger: 0.5,
      swoop: 220,
      pos: (i, t) => {
        const span = W + 600;
        return [((r('kx', i) * span + (t - S.start) * (12 + 24 * r('kv', i))) % span) - 300, r('ky', i) * (H + 200) - 100, r('kz', i) * 900 - 200];
      },
      color: (i) => (r('kc', i) < 0.2 ? 5 : 6),
      alpha: () => 0.55,
      size: () => 0.8,
    },
    // the grid of 100 institutions, 9 lit
    {
      at: S.grid + 0.9,
      dur: 0.9,
      stagger: 0.5,
      swoop: 100,
      pos: (i) => gridPts[i],
      color: (i, t) => {
        const cell = Math.floor((i / N) * 100);
        return LIT.has(cell) && t >= S.gridLit + cell * 0.006 ? 2 : 6;
      },
      size: (i, t) => {
        const cell = Math.floor((i / N) * 100);
        return LIT.has(cell) && t >= S.gridLit + cell * 0.006 ? 1.1 : 0.6;
      },
    },
    {at: S.takeaway + 0.5, dur: 0.6, stagger: 0.4, swoop: 200, pos: dust('d2', 1.1, 700), color: () => 6, alpha: () => 0.55, size: () => 0.9},
    // risk: cold slow snow
    {
      at: R.doc + 0.8,
      dur: 0.8,
      stagger: 0.4,
      pos: (i, t) => {
        const span = H + 300;
        return [
          r('rx', i) * (W + 400) - 200 + Math.sin(t * 0.4 + i) * 20,
          ((r('ry', i) * span + (t - R.start) * (18 + 30 * r('rv', i))) % span) - 150,
          r('rz', i) * 900 - 200,
        ];
      },
      color: () => 1,
      alpha: () => 0.35,
      size: () => 0.75,
    },
    // practice: the ring around You
    {
      at: Q.ring + 1.0,
      dur: 1.0,
      stagger: 0.5,
      swoop: 180,
      pos: (i, t) => {
        if (i % 6 === 0) {
          const a = r('ca', i) * Math.PI * 2 + t * 0.15;
          const rr = 70 + Math.sqrt(r('cr', i)) * 60;
          return [RING_C.x + Math.cos(a) * rr, RING_C.y + Math.sin(a) * rr, 0];
        }
        const a = r('ra', i) * Math.PI * 2 + (t - Q.start) * 0.35;
        const rr = RING_R + (r('rr', i) - 0.5) * 26 + noise2D('rn', i, t * 0.6) * 6;
        return [RING_C.x + Math.cos(a) * rr, RING_C.y + Math.sin(a) * rr, (r('rz2', i) - 0.5) * 80];
      },
      color: (i, t) => {
        if (i % 6 === 0) return t >= Q.loop ? 2 : 5;
        const a = ((r('ra', i) * Math.PI * 2 + (t - Q.start) * 0.35 + Math.PI / 2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const seg = Math.floor(a / (Math.PI / 2));
        return t >= Q.steps[seg] ? 2 : 6;
      },
      size: (i, t) => {
        if (i % 6 === 0) return 0.7;
        const a = ((r('ra', i) * Math.PI * 2 + (t - Q.start) * 0.35 + Math.PI / 2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const seg = Math.floor(a / (Math.PI / 2));
        return t >= Q.steps[seg] ? 0.9 : 0.55;
      },
      alpha: (i) => (i % 6 === 0 ? 0.3 : 0.9),
    },
    // learning: slow warm dust rising, like thoughts settling
    {
      at: L.start + 0.9,
      dur: 0.9,
      stagger: 0.5,
      swoop: 120,
      pos: (i, t) => {
        const span = H + 300;
        return [
          r('lx', i) * (W + 400) - 200 + Math.sin(t * 0.3 + i) * 24,
          span - 150 - (((r('ly', i) * span + (t - L.start) * (14 + 26 * r('lv', i))) % span)),
          r('lz', i) * 900 - 200,
        ];
      },
      color: (i) => (r('lc', i) < 0.3 ? 2 : 6),
      alpha: () => 0.5,
      size: () => 0.85,
    },
    {at: E.start + 0.7, dur: 0.7, stagger: 0.4, pos: dust('d3', 1.0, 800), color: () => 6, alpha: () => 0.5, size: () => 0.8},
    // epilogue: the dust warms and drifts upward as the answer appears, then fades into the light
    {
      at: E.answer + 1.0,
      dur: 1.0,
      stagger: 0.5,
      swoop: 60,
      pos: (i, t) => [
        (r('ex', i) - 0.5) * W * 1.5 + W / 2 + noise2D('edx', i, t * 0.05) * 60,
        (r('ey', i) - 0.5) * H * 1.6 + H / 2 - Math.max(0, t - E.answer) * (20 + 50 * r('ev', i)),
        r('ez', i) * 800 - 200,
      ],
      color: (i) => (r('ec', i) < 0.4 ? 2 : 6),
      alpha: (i, t) => 0.6 * (1 - pr(t, E.flood, 0.8)),
      size: () => 0.9,
    },
  ];

  const impacts: Impact[] = [
    ...P.slams.map((at) => ({at, x: W / 2, y: H / 2, amp: 1.6, dur: 1.0})),
    {at: R.stamp, x: 640, y: 560, amp: 3.2, dur: 1.4},
    {at: Q.loop, x: RING_C.x, y: RING_C.y, amp: 2.4, dur: 1.4},
    {at: E.bloom, x: 960, y: 540, amp: 1.2, dur: 1.2},
  ];
  // formations must be in time order, whatever order they are written in above
  forms.sort((a, b) => a.at - b.at);
  return {forms, impacts};
};

/** Field visibility across the film (the paper ending has no particles). */
export const fieldAlpha = (t: number) => 1 - pr(t, E.flood + 1.0, 0.4) * 1;
export const projectWorld = project;
export const clamp = clamp01;
