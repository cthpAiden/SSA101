import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Chrome, Defs, Flashes, Grain, Sky, World, darkness} from './frame';
import {ParticleField} from './ParticleField';
import {TimeCtx} from './lib';
import {Epilogue} from './scenes/Epilogue';
import {Learning} from './scenes/Learning';
import {Practice} from './scenes/Practice';
import {Prologue} from './scenes/Prologue';
import {Risk} from './scenes/Risk';
import {Scale} from './scenes/Scale';
import {Title} from './scenes/Title';
import cues from './cues.json';
import {pr} from './lib';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const fade = 1 - pr(t, cues.epilogue.fade, 1.0);
  return (
    <TimeCtx.Provider value={t}>
      <AbsoluteFill style={{background: '#000'}}>
        <Defs />
        <AbsoluteFill style={{opacity: fade}}>
          <World>
            <Sky />
            <ParticleField />
            <Prologue />
            <Title />
            <Scale />
            <Risk />
            <Learning />
            <Practice />
            <Epilogue />
          </World>
          <Flashes />
          <Grain dark={darkness(t)} />
          <Chrome />
        </AbsoluteFill>
        <Audio src={staticFile('score.wav')} />
      </AbsoluteFill>
    </TimeCtx.Provider>
  );
};
