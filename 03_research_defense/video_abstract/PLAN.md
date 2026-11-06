# Video abstract implementation plan

> Spec: `STORYBOARD.md`. Executed inline in one session (visual work needs one reviewer looking at every still).

**Goal:** a 30.0 s, 1920x1080, 60 fps MP4 video abstract plus a PNG graphical abstract, built from verified sources only.

**Architecture:** one canvas composition where every frame is a pure function of time (`drawFrame(ctx, t)`). A Node script draws each frame with Skia through `@napi-rs/canvas` and pipes raw pixels to ffmpeg. A Python script synthesizes the score, and ffmpeg muxes it in.

**Tech stack:** Node 24 with `@napi-rs/canvas`; ffmpeg 8.1; Python 3.14 with numpy, scipy and fonttools.

**Change during the build:** the first plan used headless Microsoft Edge with puppeteer-core. Edge cannot start inside the tool sandbox on this machine, so the renderer moved to Skia canvas, which needs no browser.

## Global constraints

- Duration 30.0 s, 1800 frames at 60 fps, 1920x1080
- Scene cuts at 3.6, 8.0, 12.5, 17.5 and 24.5 s
- Palette: ground `#F7F7F4`, ink `#13233F`, secondary `#5B6577`, neutral dot `#A3ABB8`, highlight `#EF6A1F`
- Fonts: Newsreader, IBM Plex Sans, IBM Plex Mono, all with Vietnamese glyphs, served locally
- On-screen numbers only from `Fact_check_G1_2026-10-09.md`; never 1.86
- No en or em dashes in on-screen copy

## Files

| File | Responsibility |
|---|---|
| `src/fetch-fonts.mjs` | Download the three font families (TTF, with Vietnamese) from google/fonts |
| `src/make_fonts.py` | Cut static instances (weight, italic, optical size) with fontTools |
| `src/fonts.mjs` | Register each instance under a fixed family alias |
| `src/engine.mjs` | Time helpers: easing, clamp, lerp, colour mix, seeded random, line reveal, type-on, shapes |
| `src/scenes.mjs` | Dot layouts, scene timings, all scene elements and the frame chrome; exports `drawFrame` |
| `src/render.mjs` | `stills`, `contact`, `video` and `poster` modes; ffmpeg encode and mux |
| `src/score.py` | Score synthesis to `build/score.wav` |

## Tasks

1. **Tooling.** Install puppeteer-core, fetch fonts, smoke-test one Edge screenshot. Check: a PNG of a test page with Vietnamese names renders in the right fonts; note ms per frame.
2. **Composition.** Write `index.html`, `engine.js`, `scenes.js`. Check: stills at 1.8, 5.0, 7.5, 10.4, 12.2, 15.5, 21.5, 24.0 and 29.9 s look right, with no overlaps, clipped text or missing glyphs.
3. **Renderer.** Parallel frame capture and encode. Check: ffprobe reports 1920x1080, 60 fps, 1800 frames, 30.0 s.
4. **Score.** Synthesize and check: 30.0 s, no clipping, integrated loudness near -16 LUFS after normalization.
5. **Deliver.** Mux, export the final frame as `G1_graphical_abstract.png`, scrub-check the MP4 at the cuts, send both files.
