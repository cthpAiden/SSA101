import React from 'react';
import cues from '../cues.json';
import {PROMPT, PROMPT_POS} from '../film';
import {Scene} from '../frame';
import {C, Cursor, EIO, F, Label, Letters, hit, pr, sp, typedChars, useT} from '../lib';

const P = cues.prologue;
const RESPONSE =
  'Artificial intelligence is changing how students learn. Used well, it can support research, writing and revision. However, it also raises serious questions about accuracy, bias, privacy and authorship. As Smith (2021) notes, "technology is never neutral." Universities must therefore set clear rules, and students must learn to use these tools with care. In conclusion, AI is neither good nor bad: its value depends on how we use it.';
export const WORDS = RESPONSE.split(' ');
const FLAG = new Set([WORDS.indexOf('Smith'), WORDS.indexOf('(2021)')]);
export const wordTime = (i: number) => P.streamStart + (i / (WORDS.length - 1)) * (P.streamEnd - P.streamStart);

const SLAM = ['WHO', 'IS', 'THE', 'AUTHOR?'];

export const Prologue: React.FC = () => {
  const t = useT();
  const typed = typedChars(t, P.promptStart, P.charStep, PROMPT.length);
  const blink = Math.floor(t * 2.4) % 2 === 0;
  const typing = t >= P.promptStart && t < P.enter;
  const gone = pr(t, P.burst - 0.05, 0.18, EIO);
  const words = WORDS.filter((_, i) => t >= wordTime(i)).length;
  const flagK = pr(t, P.flag, 0.35);
  const dim = pr(t, P.slams[0] - 0.25, 0.3, EIO);
  const streamIn = pr(t, P.streamStart - 0.1, 0.3);

  return (
    <Scene start={P.start} end={P.end}>
      {/* the prompt */}
      <div
        style={{
          position: 'absolute',
          left: PROMPT_POS.x - 50,
          top: PROMPT_POS.y - 72,
          opacity: 1 - gone,
          transform: `scale(${1 + gone * 0.08})`,
          filter: gone > 0 ? `blur(${gone * 10}px)` : undefined,
          transformOrigin: '0 50%',
        }}
      >
        <Label color={C.soft} size={13} style={{opacity: pr(t, 0.35, 0.5)}}>
          You
        </Label>
        <div style={{marginTop: 20, fontFamily: F.mono, fontSize: PROMPT_POS.size, color: C.white, lineHeight: 1, display: 'flex', alignItems: 'center'}}>
          <span style={{color: C.machine, marginRight: 20, textShadow: `0 0 20px ${C.machine}`}}>›</span>
          <span>{PROMPT.slice(0, typed)}</span>
          <Cursor on={typing || blink} />
        </div>
      </div>

      {/* enter: a ring expands from the prompt */}
      {t >= P.enter && t < P.enter + 1 && (
        <div
          style={{
            position: 'absolute',
            left: PROMPT_POS.x + 300,
            top: PROMPT_POS.y,
            width: 10,
            height: 10,
            borderRadius: '50%',
            border: `2px solid ${C.machine}`,
            transform: `translate(-50%, -50%) scale(${1 + pr(t, P.enter, 0.9, EIO) * 120})`,
            opacity: (1 - pr(t, P.enter, 0.9)) * 0.8,
          }}
        />
      )}

      {/* the generated essay, word by word, drifting right with the stream */}
      <div
        style={{
          position: 'absolute',
          left: 300 + (t - P.streamStart) * 14,
          top: 470,
          width: 1320,
          padding: '26px 34px 30px',
          marginLeft: -34,
          background: 'rgba(5,7,12,0.78)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 0 0 1px rgba(125,183,255,0.18), 0 30px 80px rgba(0,0,0,0.6)',
          fontFamily: F.mono,
          fontSize: 28,
          lineHeight: 1.7,
          color: '#E4EAF5',
          opacity: streamIn * (1 - dim),
          transform: `translateY(${dim * -40}px)`,
          filter: dim > 0 ? `blur(${dim * 12}px)` : undefined,
        }}
      >
        <Label color={C.machine} size={16} style={{marginBottom: 14, display: 'flex', gap: 18, alignItems: 'center'}}>
          Model
          <span style={{color: C.soft, letterSpacing: '0.1em', textTransform: 'none', fontSize: 28}}>
            {words} words · {Math.max(0, Math.min(P.streamEnd - P.streamStart, t - P.streamStart)).toFixed(1)} s
          </span>
        </Label>
        {WORDS.map((w, i) => {
          const at = wordTime(i);
          if (t < at) return null;
          const k = pr(t, at, 0.22);
          const flagged = FLAG.has(i);
          return (
            <React.Fragment key={i}>
              <span
                style={{
                  display: 'inline-block',
                  opacity: (0.3 + 0.7 * k) * (t >= P.flag && !flagged ? 0.45 : 1),
                  transform: `translateY(${(1 - k) * 10}px) scale(${1.25 - 0.25 * k})`,
                  filter: k < 1 ? `blur(${(1 - k) * 4}px)` : undefined,
                  color: flagged ? `rgba(255,${Math.round(220 - 140 * flagK)},${Math.round(220 - 160 * flagK)},1)` : undefined,
                  textShadow: flagged && flagK > 0 ? `0 0 ${18 * flagK}px rgba(255,77,58,0.9)` : undefined,
                  position: 'relative',
                }}
              >
                {w}
                {flagged && i === WORDS.indexOf('Smith') && flagK > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: '100%',
                      marginBottom: 6,
                      whiteSpace: 'nowrap',
                      fontFamily: F.mono,
                      fontSize: 16,
                      letterSpacing: '0.18em',
                      color: C.void,
                      background: C.red,
                      boxShadow: `0 0 24px ${C.red}`,
                      padding: '4px 9px 3px',
                      opacity: flagK,
                      transform: `translateY(${(1 - flagK) * 8}px)`,
                    }}
                  >
                    SOURCE NOT VERIFIED
                  </span>
                )}
              </span>{' '}
            </React.Fragment>
          );
        })}
      </div>

      {/* flag: a red frame flashes */}
      {t >= P.flag && t < P.flag + 0.6 && (
        <div
          style={{
            position: 'absolute',
            inset: 40,
            border: `2px solid ${C.red}`,
            opacity: hit(t, P.flag, 0.4) * 0.8,
            boxShadow: `inset 0 0 120px rgba(255,77,58,${hit(t, P.flag, 0.4) * 0.35})`,
          }}
        />
      )}

      {/* the question slams in, one word at a time */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: F.black,
          fontSize: 230,
          letterSpacing: '-0.02em',
          color: C.white,
          lineHeight: 1,
        }}
      >
        <div style={{display: 'flex', gap: 40, alignItems: 'baseline'}}>
          {SLAM.slice(0, 3).map((w, i) => {
            const at = P.slams[i];
            if (t < at) return null;
            const k = sp(t, at, 12, 240);
            return (
              <React.Fragment key={w}>
                <span
                  style={{
                    display: 'inline-block',
                    transform: `scale(${2.4 - 1.4 * Math.min(1, k)}) translateY(${(1 - Math.min(1, k)) * 20}px)`,
                    opacity: Math.min(1, k * 3),
                    color: C.white,
                    textShadow: '0 0 40px rgba(255,255,255,0.18)',
                    fontSize: i === 0 ? 200 : 120,
                    lineHeight: 1,
                  }}
                >
                  {w}
                </span>
              </React.Fragment>
            );
          })}
        </div>
        {t >= P.slams[3] && (
          <>
            <span
              style={{
                display: 'inline-block',
                transform: `scale(${2.6 - 1.6 * Math.min(1, sp(t, P.slams[3], 11, 230))})`,
                opacity: Math.min(1, sp(t, P.slams[3], 11, 230) * 3),
                color: C.ember,
                textShadow: `0 0 70px rgba(255,122,61,0.65)`,
                fontSize: 290,
                lineHeight: 1,
                marginTop: 10,
              }}
            >
              AUTHOR?
            </span>
          </>
        )}
      </div>
    </Scene>
  );
};
