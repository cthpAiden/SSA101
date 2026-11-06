import React from 'react';
import {Composition} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
import cues from './cues.json';
import {Intro} from './Intro';

const FONTS: [string, string, string, 'normal' | 'italic'][] = [
  ['Newsreader Display', 'NewsreaderDisplay-Regular.ttf', '400', 'normal'],
  ['Newsreader Display', 'NewsreaderDisplay-Medium.ttf', '500', 'normal'],
  ['Newsreader Display', 'NewsreaderDisplay-Italic.ttf', '400', 'italic'],
  ['Newsreader Deck', 'NewsreaderDeck-Regular.ttf', '400', 'normal'],
  ['Newsreader Deck', 'NewsreaderDeck-Italic.ttf', '400', 'italic'],
  ['Plex Sans', 'PlexSans-Regular.ttf', '400', 'normal'],
  ['Plex Sans', 'PlexSans-Italic.ttf', '400', 'italic'],
  ['Plex Sans', 'PlexSans-Medium.ttf', '500', 'normal'],
  ['Plex Sans', 'PlexSans-SemiBold.ttf', '600', 'normal'],
  ['Plex Mono', 'PlexMono-Regular.ttf', '400', 'normal'],
  ['Plex Mono', 'PlexMono-Medium.ttf', '500', 'normal'],
  ['Archivo Black', 'ArchivoBlack-Regular.ttf', '400', 'normal'],
];
for (const [family, file, weight, style] of FONTS) {
  loadFont({family, url: staticFile(`fonts/${file}`), weight, style});
}

export const Root: React.FC = () => (
  <Composition
    id="Intro"
    component={Intro}
    durationInFrames={cues.duration * cues.fps}
    fps={cues.fps}
    width={1920}
    height={1080}
  />
);
