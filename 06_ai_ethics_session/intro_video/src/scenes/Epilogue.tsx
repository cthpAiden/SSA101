import React from 'react';
import {AbsoluteFill} from 'remotion';
import cues from '../cues.json';
import {Scene} from '../frame';
import {C, Cursor, EIO, F, FadeUp, Label, Letters, Rise, hit, pr, typedChars, useT} from '../lib';

const E = cues.epilogue;
const QUESTION = 'Who is the author?';
const TEAM = ['Châu Trần Hoàng Phúc', 'Nguyễn Ngọc Hân', 'Phạm Thanh Huyền', 'Nguyễn Vũ Minh Ngọc', 'Nguyễn Võ Thanh Trúc'];

export const Epilogue: React.FC = () => {
  const t = useT();
  const typed = typedChars(t, E.prompt, E.charStep, QUESTION.length);
  const blink = Math.floor(t * 2.4) % 2 === 0;
  const typingDone = t >= E.prompt + QUESTION.length * E.charStep + 0.1;
  const bloom = pr(t, E.bloom, 0.9);
  const flood = pr(t, E.flood, 0.7, EIO);
  const promptOut = pr(t, E.answer - 0.15, 0.45, EIO);
  const answerIn = pr(t, E.answer, 0.9);
  const rule = pr(t, E.rule, 0.8, EIO);

  return (
    <Scene start={E.start} end={E.end}>
      {/* the question, typed again */}
      <div style={{position: 'absolute', left: 300, top: 300, opacity: 1 - promptOut, transform: `translateY(${promptOut * -40}px)`, filter: promptOut > 0 ? `blur(${promptOut * 8}px)` : undefined}}>
        <Label color={C.soft} size={13} style={{opacity: pr(t, E.prompt - 0.3, 0.4)}}>
          You
        </Label>
        <div style={{marginTop: 18, fontFamily: F.mono, fontSize: 46, color: C.white, display: 'flex', alignItems: 'center'}}>
          <span style={{color: C.machine, marginRight: 20, textShadow: `0 0 20px ${C.machine}`}}>›</span>
          {QUESTION.slice(0, typed)}
          <Cursor on={!typingDone || blink} />
        </div>
      </div>

      {/* the answer, crisp, then blooming with light */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: F.display,
          fontStyle: 'italic',
          fontSize: 300,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: C.white,
          opacity: answerIn * (1 - flood),
          textShadow: `0 0 ${20 + 60 * bloom}px rgba(255,200,120,${0.4 + 0.5 * bloom}), 0 0 ${200 * bloom}px rgba(255,160,80,${0.5 * bloom})`,
          transform: `translateY(${-6 + (1 - answerIn) * 30}px) scale(${0.94 + 0.06 * answerIn + hit(t, E.bloom, 1.0) * 0.03})`,
          filter: answerIn < 1 ? `blur(${(1 - answerIn) * 12}px)` : undefined,
        }}
      >
        You are<span style={{color: C.ember}}>.</span>
      </div>

      {/* the light floods in and leaves paper behind: the lead-in to the memory challenge */}
      {t >= E.flood - 0.3 && (
        <AbsoluteFill style={{background: C.paper, opacity: flood}}>
          <AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.8), rgba(255,255,255,0) 70%)'}} />
          <AbsoluteFill style={{background: `rgba(255,250,240,${hit(t, E.flood, 0.9) * 0.9})`}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center'}}>
            <FadeUp at={E.title - 0.2} dist={10}>
              <Label size={15} color="#6B7390" style={{letterSpacing: '0.28em'}}>
                SSL101 · Group 1 · Week 6 · Slot 11
              </Label>
            </FadeUp>
            <div style={{marginTop: 34, fontFamily: F.black, fontSize: 170, lineHeight: 1, letterSpacing: '-0.02em', color: C.ink}}>
              <Letters text="HELP," at={E.title} mode="cascade" stagger={0.05} />
            </div>
            <div style={{marginTop: 4, fontFamily: F.display, fontStyle: 'italic', fontSize: 170, lineHeight: 1, color: '#C8462B'}}>
              <Rise at={E.title + 0.35} dur={0.9}>
                or hinder?
              </Rise>
            </div>
            <div style={{margin: '42px auto 0', width: 160 * rule, height: 2, background: '#C8462B'}} />
            <FadeUp at={E.tagline} style={{marginTop: 30}}>
              <div style={{fontFamily: F.deck, fontStyle: 'italic', fontSize: 46, color: '#4E5872'}}>The memory challenge begins.</div>
            </FadeUp>
            <div style={{marginTop: 70, display: 'flex', justifyContent: 'center', gap: 40}}>
              {TEAM.map((name, i) => (
                <FadeUp key={name} at={E.names + i * 0.08} dist={12}>
                  <div style={{fontFamily: F.sans, fontSize: 28, color: C.ink}}>{name}</div>
                </FadeUp>
              ))}
            </div>
            <FadeUp at={E.begin} style={{marginTop: 56}}>
              <Label size={15} color="#C8462B" style={{letterSpacing: '0.32em'}}>
                Let us begin
              </Label>
            </FadeUp>
          </div>
        </AbsoluteFill>
      )}
    </Scene>
  );
};
