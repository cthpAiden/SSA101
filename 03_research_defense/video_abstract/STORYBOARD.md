# Video abstract: storyboard and build spec

Group 1 · SSL101 · FPT University · Fall 2026
Topic: Peer Pressure on Self-Comparison in First-Year University Students
Purpose: a 30-second motion-graphics alternative to the poster. Audience: the instructor (Ms. Trương Thanh Tuyền) and classmates.
Stage: research proposal. No survey data yet (confirmed 9 Oct 2026), so the video shows the question, the evidence and the planned method, and reports no findings.

## Format

- 1920x1080, 60 fps, H.264 MP4 with AAC stereo audio, exactly 30.0 s
- English on-screen text, no voiceover, soft synthesized score
- Final frame doubles as a still poster (exported as PNG)

## Concept

One dot is one student. A single pool of dots re-forms into every figure, so the viewer follows the same marks from the hook to the graphical abstract.

## Visual system

- Ground: off-white paper `#F7F7F4` with a faint 24 px measurement grid
- Ink: navy `#13233F`; secondary text `#5B6577`; neutral dots `#A3ABB8`
- Highlight: orange `#EF6A1F`, one meaning per figure (you, screened positive, mediator, interviewees)
- Type: Newsreader for headlines and big numbers, IBM Plex Sans for body text, IBM Plex Mono for labels and citations
- Frame: running header "SSL101 · GROUP 1" at top left, figure label at top right, citation at bottom left, a ruler-style progress bar along the bottom edge
- Motion: dots morph between layouts with eased, staggered paths; text lines rise 24 px as they fade in; lines draw on; numbers count up

## Timeline

| Time (s) | Figure | Visual | On-screen text | Source |
|---|---|---|---|---|
| 0.0-3.6 | Fig. 1 | Dot field. The orange "you" dot holds still while the others drift upward. A yardstick runs beside the field. | Everyone seems *ahead.* | Hook, no claim |
| 3.6-8.0 | Fig. 1 | The yardstick ticks fall away. Lines run from "you" to dots above, beside and below. | Without an objective yardstick, we measure ourselves against others. Labels: upward, lateral, downward | Festinger (1954); APA Dictionary (three directions) |
| 8.0-12.5 | Fig. 2 | Dots snap into a 10x10 grid. 31 dots turn orange and the 32nd fills 40%. | 31.4% / of first-year students screened positive for a mental disorder in the past 12 months / each dot = 1% | Auerbach et al. (2018), n = 13,984, 19 colleges, 8 countries |
| 12.5-17.5 | Fig. 3 | Three nodes; dots stream from the first to the third through the middle one. | The link runs through upward comparison. Nodes: Social media use problems (day t), Upward comparison (mediator), Interpersonal adaptation (day t+1, worse) | Xiong et al. (2026), 317 first-years in China, 30 daily reports |
| 17.5-24.5 | Fig. 4 | 200 dots in a 20x10 grid (planned sample), 15 ringed (interviews). | Our study / RQ1 How does peer pressure shape self-comparison among first-year students? / RQ2 Which weighs more on comparison: social media use or academic results? / Tags: 200 first-years, 5-point online survey, 12 to 15 interviews, correlation analysis, cross-sectional: association, not cause | Proposal deck, 22 Sep 2026 |
| 24.5-30.0 | Graphical abstract | Title, three small figures, team, instructor, references. | Full title; 5 names with student IDs; Instructor: Ms. Trương Thanh Tuyền; SSL101 · FPT University · Fall 2026 | All of the above |

## Score

Scored to picture in A minor, resolving to C major. One chord per scene, changing on each cut: Am(add9), Fmaj7, Dm7, E7sus4 to E, F to G, Cmaj9. Felt-piano notes, a warm pad, a soft sub note on each root, and a quiet clock tick (2 per second) under figures 2 to 4. Loudness target about -16 LUFS, true peak below -1 dBTP.

## Sources used (all re-verified 9 Oct 2026, see `Fact_check_G1_2026-10-09.md`)

- Auerbach, R. P., Mortier, P., Bruffaerts, R., et al. (2018). WHO World Mental Health Surveys International College Student Project: Prevalence and distribution of mental disorders. *Journal of Abnormal Psychology, 127*(7), 623-638. https://doi.org/10.1037/abn0000362
- Festinger, L. (1954). A theory of social comparison processes. *Human Relations, 7*(2), 117-140. https://doi.org/10.1177/001872675400700202
- Xiong, S., Xu, Y., Xiong, G., & Zhang, B. (2026). Social media use intensity and social media use problems in relation to interpersonal adaptation during the transition to college: An intensive longitudinal study. *Journal of Youth and Adolescence, 55*(1), 106-118. https://doi.org/10.1007/s10964-025-02232-6
- APA Dictionary of Psychology, "social comparison theory" (upward, downward and lateral comparison).

## Left out on purpose

- The 1.86 workload figure (a typo in Nguyen et al., 2024; the paper's figure gives 2.87).
- β = .08 next to Z = .342: different metrics from different studies, and Z is about drinking norms. It needs a caveat that 30 seconds cannot carry.
- "Lateral comparison is most common" and "upward comparison dominates in year one": no source says either.

## Build

- `src/scenes.mjs`: the composition. `drawFrame(ctx, t)` paints any frame as a pure function of time.
- `src/engine.mjs`: easing, colour and text helpers. `src/fonts.mjs`: registers the font files.
- `src/render.mjs`: draws frames with Skia (`@napi-rs/canvas`, no browser) and pipes them to ffmpeg.
- `src/score.py`: numpy and scipy synthesis to a 48 kHz WAV, normalized to -16 LUFS.
- Outputs: `G1_video_abstract_30s.mp4` and `G1_graphical_abstract.png` (the final frame at 3840x2160).

To edit and re-render (Node 20+, Python 3 with numpy, scipy and fonttools, ffmpeg on PATH), run these in `video/src`:

```
npm install
npm run fonts
python make_fonts.py
python score.py
npm run video
npm run poster
```

`node render.mjs stills 10.5 21` writes single frames to `video/build/stills` for checking a change before a full render (about 45 s).

## Checks

- Stills at key times reviewed before the full render.
- ffprobe: 1920x1080, 60 fps, 30.0 s, one audio stream.
- Every number on screen matches the fact-check file.
