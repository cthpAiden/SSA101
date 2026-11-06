# G1 intro video: How to Use AI & AI Ethics

90 s, 1920x1080, 60 fps motion graphics intro for the Group 1 session (Week 6, Slot 11). Built with Remotion 4; the score is synthesized in Python.

Output: `out/G1_AI_Ethics_Intro_90s_v4.mp4` (earlier cuts: `out/G1_AI_Ethics_Intro.mp4`, 60 s; `out/G1_AI_Ethics_Intro_90s.mp4` and `_v2`, first 90 s versions).

## How it is built

One continuous dark world. A single field of 5,200 glowing particles runs through the whole film and morphs from one shape to the next (see `src/film.ts`): the typed prompt shatters into a token stream, gathers into a turning 3D neural network, forms the figure 100M, becomes three growing bars, a 10 x 10 grid of institutions, cold falling snow for the court case, warm rising dust for the learning scene, a ring of light around "You", and finally warm dust that lifts away as "You are." blooms. A handheld camera drifts the whole time, punches on every cut and shakes on impacts. Large type animates letter by letter.

## Storyboard

| Time | Section | What happens |
|---|---|---|
| 0:00 | Prologue | A cursor blinks. "Write my essay on AI ethics." is typed. On Enter the prompt bursts into a river of particles while the model streams 68 words in 2.6 s on a dark panel. "Smith (2021)" turns red: SOURCE NOT VERIFIED. WHO IS THE / AUTHOR? slams in word by word with camera shake. |
| 0:09 | Title | The particles form a 3D neural network with a pulse running through it. HOW TO USE AI cascades in; "& AI Ethics" rises with a light sweep. Session details. |
| 0:18 | Scale | A solid 100M counter runs up. Bars grow: ChatGPT 2 months, TikTok 9, Instagram 30 (values appear only when each bar is full). A grid of 100 institutions, 9 lit: FEWER THAN 1 IN 10 had formal guidance. ADOPTION OUTPACED GUIDANCE. |
| 0:32 | Risk | A court brief flies in with 3D perspective. The ChatGPT citation is typed, a scan beam checks it, "0 records found", FABRICATED stamps down with a red flash and shake, $5,000 fine. |
| 0:42 | Learning | IF AI WRITES IT, DID YOU LEARN IT? Memory: RETRIEVE TO REMEMBER, with two traces over time (written by you stays, written by AI fades). Motivation: EFFORT BUILDS YOU, with two effort meters (help rises, hinder sinks). "Same tool. The difference is how you use it." |
| 0:58 | Practice | A ring of particles around "You". ASK, CHECK, DISCLOSE, OWN, four seconds each; each quarter of the ring ignites amber. When the loop closes a shock ring expands: "One loop, every assignment." |
| 1:16 | Epilogue | "Who is the author?" is typed again. "You are." blooms with light, floods the screen, and leaves a paper card: HELP, or hinder? "The memory challenge begins." The five names. |

## Sources for on-screen facts

1. Reuters, "ChatGPT sets record for fastest-growing user base - analyst note", 1 Feb 2023 (UBS estimate; Sensor Tower figures for TikTok and Instagram).
2. UNESCO global survey of 450+ schools and universities, May 2023 (fewer than 10% had formal guidance on generative AI).
3. Mata v. Avianca, Inc., S.D.N.Y., opinion and sanctions order of 22 June 2023 ($5,000; fake cases including Varghese v. China Southern Airlines).
4. UNESCO Recommendation on the Ethics of Artificial Intelligence, adopted 23 Nov 2021 by all 193 Member States.
5. UNESCO, Guidance for generative AI in education and research, 7 Sep 2023.
6. Regulation (EU) 2024/1689 (AI Act), in force 1 Aug 2024.

"Smith (2021)" in the prologue is invented on purpose: it shows how a model can produce a source that does not exist. The Learning scene makes no numeric claims: the memory traces and effort meters are illustrations of the testing effect and of effort and confidence, not data.

## Editing

All timings live in `src/cues.json`; the scenes, the particle choreography and the score all read it, so picture and sound stay in sync when a time changes.

```bash
npm run studio
```

Opens Remotion Studio for live preview and scrubbing.

```bash
npm run score
```

Rebuilds `public/score.wav` after any change to `cues.json` (about 2 minutes).

```bash
npm run render
```

Renders the final MP4 (about 30 to 40 minutes on this laptop).

```bash
npm run stills -- 5.9 38.3 82.9
```

Renders half-size PNG stills at the given seconds into `out/stills/` for a quick check.

| File | Content |
|---|---|
| `src/cues.json` | Every timing in the film, in seconds |
| `src/lib.tsx` | Colors, fonts, easing, springs, shake, kinetic `Letters`, `Glitch`, `Rise`, `FadeUp` |
| `src/particles.ts` | The particle engine: formations, morphing, projection, canvas drawing |
| `src/film.ts` | The particle choreography for the whole film, plus the network geometry |
| `src/frame.tsx` | Camera, sky, flashes, grain, HUD chrome, scene shell |
| `src/scenes/*.tsx` | One file per section (DOM and SVG layers over the particle field) |
| `audio/score.py` | Score synthesis: piano, pad, sub, 96 bpm beat, plucked arpeggio, risers, hits |
