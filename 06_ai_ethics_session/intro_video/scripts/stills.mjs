// Renders stills at the given times (seconds) to out/stills/tXX.X.png.
// Usage: node scripts/stills.mjs 1.5 5.9 ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const times = process.argv.slice(2).map(Number);
const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'Intro'});
for (const s of times) {
  const frame = Math.min(composition.durationInFrames - 1, Math.round(s * composition.fps));
  const output = path.join(root, 'out/stills', `t${s.toFixed(1).padStart(4, '0')}.png`);
  await renderStill({serveUrl, composition, frame, output, scale: Number(process.env.SCALE ?? 0.5)});
  console.log(output);
}
