import React, {useLayoutEffect, useMemo, useRef} from 'react';
import {interpolate} from 'remotion';
import cues from './cues.json';
import {buildFilm, fieldAlpha} from './film';
import {useT} from './lib';
import {drawBokeh, drawField} from './particles';

/** The one particle field that runs through the whole film. */
export const ParticleField: React.FC = () => {
  const t = useT();
  const ref = useRef<HTMLCanvasElement>(null);
  const bokeh = useRef<HTMLCanvasElement>(null);
  const film = useMemo(() => buildFilm(), []);
  useLayoutEffect(() => {
    if (!ref.current || !bokeh.current) return;
    const warm = interpolate(t, [cues.learning.start, cues.learning.start + 2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const hue: [number, number, number] = [80 + 150 * warm, 120 + 40 * warm, 230 - 160 * warm];
    const ctx = bokeh.current.getContext('2d')!;
    ctx.clearRect(0, 0, 1920, 1080);
    drawBokeh(bokeh.current, t, hue, fieldAlpha(t), {x: 0, y: 0});
    drawField(ref.current, film.forms, film.impacts, t, fieldAlpha(t), {x: 0, y: 0, zoom: 1});
  }, [t, film]);
  return (
    <>
      <canvas ref={bokeh} width={1920} height={1080} style={{position: 'absolute', inset: 0}} />
      <canvas ref={ref} width={1920} height={1080} style={{position: 'absolute', inset: 0}} />
    </>
  );
};
