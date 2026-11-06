"""Synthesizes the 90 s score for the G1 intro into public/score.wav (48 kHz stereo).

Scored to picture from src/cues.json, the same cue sheet the Remotion scenes read.
A minor (the machine, the risk) resolving to C major (the human answer). Felt piano,
warm pad and sub, a 96 bpm beat with a plucked arpeggio from the title on, and small sounds
for typing, data, the counter, the stamp and each habit in the loop.
Instruments and mastering are reused from the 30 s video abstract (video/src/score.py).
"""
import json
import os
import subprocess
from pathlib import Path

import numpy as np
from scipy.io import wavfile
from scipy.ndimage import maximum_filter1d
from scipy.signal import butter, fftconvolve, istft, lfilter, resample_poly, sosfilt, stft

SR = 48000
CUES = json.loads((Path(__file__).resolve().parent.parent / "src" / "cues.json").read_text(encoding="utf8"))
DUR = float(CUES["duration"])
N = int(SR * DUR)
HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "public" / "score.wav"
rng = np.random.default_rng(1954)

PITCH = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}


def midi(name):
    return 12 * (int(name[-1]) + 1) + PITCH[name[:-1]]


def hz(name):
    return 440.0 * 2 ** ((midi(name) - 69) / 12)


def lowpass(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x, axis=0)


def highpass(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x, axis=0)


def bandpass(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x, axis=0)


def pan(mono, p):
    """Equal-power pan, p from -1 (left) to 1 (right)."""
    a = (np.clip(p, -1, 1) + 1) * np.pi / 4
    return np.stack([mono * np.cos(a), mono * np.sin(a)], axis=1)


def place(bus, sig, at):
    i = int(round(at * SR))
    if i >= len(bus):
        return
    j = min(len(bus), i + len(sig))
    bus[i:j] += sig[: j - i]


def ramp(m, fade_in, fade_out):
    """Raised-cosine envelope of m samples."""
    env = np.ones(m)
    for n, rising in ((int(fade_in * SR), True), (int(fade_out * SR), False)):
        n = min(n, m)
        if n <= 0:
            continue
        curve = 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, n))
        if rising:
            env[:n] *= curve
        else:
            env[m - n:] *= curve[::-1]
    return env


# ------------------------------------------------------------------ instruments

def piano(name, vel, length=4.5):
    """Felt piano: stretched partials, two slightly detuned strings, soft hammer."""
    f = hz(name)
    m = int(length * SR)
    tt = np.arange(m) / SR
    tau = min(4.0, 2.0 * (440 / f) ** 0.5)
    stretch = 0.00025 * (f / 261.6)
    out = np.zeros(m)
    for k in range(1, 15):
        fk = k * f * np.sqrt(1 + stretch * k * k)
        if fk > 10000:
            break
        amp = k ** -1.2 * (0.25 + abs(np.sin(np.pi * k / 7.4)))
        tk = tau / (1 + 0.5 * (k - 1))
        env = 0.7 * np.exp(-tt / (0.28 * tk)) + 0.3 * np.exp(-tt / tk)
        ph = rng.uniform(0, 2 * np.pi, 2)
        out += amp * env * (np.sin(2 * np.pi * fk * tt + ph[0]) + 0.7 * np.sin(2 * np.pi * fk * 1.0006 * tt + ph[1]))
    out *= 1 - np.exp(-tt / 0.0035)
    thump = lowpass(rng.standard_normal(m) * np.exp(-tt / 0.009), 600) * 0.6
    out = lowpass(out / 1.7 + thump, 700 + 4000 * vel)
    out *= ramp(m, 0, 0.4)
    return pan(out * vel * 0.5, (midi(name) - 62) / 60)


def pad(names, t0, t1, fade_in=0.9, fade_out=0.9, level=0.022):
    """Warm pad: three detuned band-limited saws per note, spread left to right."""
    start, end = max(0.0, t0 - fade_in / 2), min(DUR, t1 + fade_out / 2)
    m = int((end - start) * SR)
    tt = np.arange(m) / SR
    stereo = np.zeros((m, 2))
    for name in names:
        f = hz(name)
        for detune, side in ((-0.0035, -0.7), (0.0, 0.0), (0.0035, 0.7)):
            ff = f * (1 + detune)
            ph = rng.uniform(0, 2 * np.pi)
            voice = np.zeros(m)
            for k in range(1, int(2400 / ff) + 1):
                voice += np.sin(2 * np.pi * ff * k * tt + ph * k) / k ** 1.3
            stereo += pan(voice, side)
    breathe = 1 + 0.08 * np.sin(2 * np.pi * 0.15 * (tt + start))
    stereo = lowpass(stereo, 1500) * (breathe * ramp(m, fade_in, fade_out) * level)[:, None]
    return stereo, start


def sub(name, t0, t1, fade_in=0.6, fade_out=0.6, level=0.07):
    start, end = max(0.0, t0 - fade_in / 2), min(DUR, t1 + fade_out / 2)
    m = int((end - start) * SR)
    tt = np.arange(m) / SR
    f = hz(name)
    tone = np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2 * f * tt)
    return pan(tone * ramp(m, fade_in, fade_out) * level, 0), start


def plink(name, vel=0.5, length=1.2):
    """Glassy bell for the data moments."""
    f = hz(name)
    m = int(length * SR)
    tt = np.arange(m) / SR
    out = np.zeros(m)
    for ratio, amp, decay in ((1, 1, 0.45), (2.0, 0.35, 0.25), (3.01, 0.18, 0.15), (4.17, 0.08, 0.1)):
        out += amp * np.exp(-tt / decay) * np.sin(2 * np.pi * f * ratio * tt)
    out *= 1 - np.exp(-tt / 0.0015)
    return pan(out * vel * 0.12, (midi(name) - 76) / 40)


def tick(freq, level):
    m = int(0.05 * SR)
    tt = np.arange(m) / SR
    x = bandpass(rng.standard_normal(m) * np.exp(-tt / 0.0045), freq * 0.8, freq * 1.25)
    return pan(x * level, 0.15)


def wood(freq, level):
    m = int(0.08 * SR)
    tt = np.arange(m) / SR
    x = np.sin(2 * np.pi * freq * tt) * np.exp(-tt / 0.018) + 0.3 * rng.standard_normal(m) * np.exp(-tt / 0.003)
    return pan(x * level, (freq - 1100) / 800)


def whoosh(rise, fall, f0, f1, level):
    """Filtered noise swell whose band sweeps exponentially from f0 to f1."""
    m = int((rise + fall) * SR)
    freqs, frames, z = stft(rng.standard_normal(m), SR, nperseg=1024)
    fc = f0 * (f1 / f0) ** np.clip(frames / (rise + fall), 0, 1)
    band = np.exp(-0.5 * ((np.log(freqs[:, None] + 1) - np.log(fc[None, :])) / 0.35) ** 2)
    _, y = istft(z * band, SR, nperseg=1024)
    y = np.pad(y, (0, max(0, m - len(y))))[:m]
    tt = np.arange(m) / SR
    env = np.where(tt < rise, (tt / rise) ** 2, np.clip(1 - (tt - rise) / fall, 0, 1) ** 1.5)
    return pan(y * env * level / (np.abs(y).max() + 1e-9), 0)


def impulse(length=3.2):
    """Synthetic stereo hall: darker as it decays, 22 ms pre-delay."""
    m = int(length * SR)
    tt = np.arange(m) / SR
    chans = []
    for _ in range(2):
        noise = rng.standard_normal(m)
        ir = (0.7 * lowpass(noise, 700) * np.exp(-6.9 * tt / 2.4)
              + 0.8 * bandpass(noise, 700, 3500) * np.exp(-6.9 * tt / 2.1)
              + 0.45 * highpass(noise, 3500) * np.exp(-6.9 * tt / 1.1))
        ir *= np.minimum(1, tt / 0.012)
        chans.append(np.concatenate([np.zeros(int(0.022 * SR)), ir])[:m])
    ir = np.stack(chans, axis=1)
    return ir / np.sqrt((ir ** 2).sum() / 2)


# ------------------------------------------------------------------ extra instruments (90 s cut)

def thump(level=0.16):
    """Soft heartbeat: a sine that drops from 90 to 48 Hz."""
    m = int(0.35 * SR)
    tt = np.arange(m) / SR
    f = 48 + 42 * np.exp(-tt / 0.03)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.11)
    x *= 1 - np.exp(-tt / 0.002)
    return pan(x * level, 0)


def kick(level=0.5):
    """Electronic kick: pitch drop from 160 to 45 Hz with a click."""
    m = int(0.4 * SR)
    tt = np.arange(m) / SR
    f = 45 + 115 * np.exp(-tt / 0.028)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.16)
    click = lowpass(rng.standard_normal(m) * np.exp(-tt / 0.004), 3000) * 0.5
    x = np.tanh((x + click) * 1.6)
    return pan(x * level, 0)


def hat(level=0.08, length=0.06, seed=0):
    r = np.random.default_rng(seed)
    m = int(length * SR)
    tt = np.arange(m) / SR
    x = highpass(r.standard_normal(m), 6000) * np.exp(-tt / (length * 0.35))
    return pan(x * level, 0.3)


def snap(level=0.2, seed=1):
    """Finger-snap style rim: short band-limited burst with a wooden body."""
    r = np.random.default_rng(seed)
    m = int(0.14 * SR)
    tt = np.arange(m) / SR
    x = bandpass(r.standard_normal(m), 1500, 5000) * np.exp(-tt / 0.02) + 0.4 * np.sin(2 * np.pi * 420 * tt) * np.exp(-tt / 0.03)
    return pan(x * level, -0.2)


def pluck(name, vel=0.4, length=0.9):
    """Short synth pluck for the arpeggio: detuned saws through a closing filter."""
    f = hz(name)
    m = int(length * SR)
    tt = np.arange(m) / SR
    out = np.zeros(m)
    for d in (-0.004, 0.0, 0.004):
        ph = rng.uniform(0, 2 * np.pi)
        for k in range(1, int(6000 / f) + 1):
            out += np.sin(2 * np.pi * f * (1 + d) * k * tt + ph * k) / k
    env = np.exp(-tt / 0.22)
    out = lowpass(out * env, 900) + 0.35 * lowpass(out * env, 2600) * np.exp(-tt / 0.08)
    return pan(out * vel * 0.09, (midi(name) - 69) / 40)


def key(level=0.05, seed=0):
    """Keyboard click: a bright tap with a short low body."""
    r = np.random.default_rng(seed)
    m = int(0.06 * SR)
    tt = np.arange(m) / SR
    tap = bandpass(r.standard_normal(m) * np.exp(-tt / 0.004), 1800, 6500)
    body = np.sin(2 * np.pi * (180 + 40 * r.random()) * tt) * np.exp(-tt / 0.012) * 0.5
    return pan((tap + body) * level, r.uniform(-0.25, 0.25))


def boom(level=0.5):
    """The stamp: a low sine drop plus a short dark noise burst."""
    m = int(1.8 * SR)
    tt = np.arange(m) / SR
    f = 36 + 80 * np.exp(-tt / 0.05)
    low = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.5)
    hit = lowpass(rng.standard_normal(m) * np.exp(-tt / 0.03), 1600)
    x = (low + 0.6 * hit) * (1 - np.exp(-tt / 0.001))
    return pan(x * level, 0)


def riser(length, f0, f1, level):
    """Noise sweep rising into a cut, with a pitched tone underneath."""
    m = int(length * SR)
    tt = np.arange(m) / SR
    freqs, frames, z = stft(rng.standard_normal(m), SR, nperseg=1024)
    fc = f0 * (f1 / f0) ** np.clip(frames / length, 0, 1)
    band = np.exp(-0.5 * ((np.log(freqs[:, None] + 1) - np.log(fc[None, :])) / 0.3) ** 2)
    _, y = istft(z * band, SR, nperseg=1024)
    y = np.pad(y, (0, max(0, m - len(y))))[:m]
    y /= np.abs(y).max() + 1e-9
    tone = np.sin(2 * np.pi * np.cumsum(110 * 2 ** (tt / length * 1.5)) / SR) * 0.4
    env = (tt / length) ** 2.2
    return pan((y + tone) * env * level, 0)


def bezier(x1, y1, x2, y2):
    def bx(u, a, b):
        return 3 * a * u * (1 - u) ** 2 + 3 * b * u * u * (1 - u) + u ** 3

    def f(x):
        lo, hi = 0.0, 1.0
        for _ in range(40):
            mid = (lo + hi) / 2
            if bx(mid, x1, x2) < x:
                lo = mid
            else:
                hi = mid
        return bx((lo + hi) / 2, y1, y2)
    return f


EO = bezier(0.16, 1, 0.3, 1)


def char_times(start, step, n):
    return [start + i * step + 0.012 * np.sin(i * 2.7) for i in range(n)]


P, T, S, R, L, Q, E = (CUES[k] for k in ("prologue", "title", "scale", "risk", "learning", "practice", "epilogue"))
PROMPT = "Write my essay on AI ethics."
CITATION = "See Varghese v. China Southern Airlines Co., 925 F.3d 1339 (11th Cir. 2019)."
QUESTION = "Who is the author?"
N_WORDS = 68
BPM = 96
BEAT = 60 / BPM

CHORDS = [  # (start, end, sub root, pad notes)
    (0.0, 5.6, "A1", ["A3", "C4", "E4", "B4"]),            # Am(add9): the prompt
    (5.6, 9.0, "F1", ["F3", "A3", "C4", "E4"]),            # Fmaj7: who is the author?
    (9.0, 17.6, "C2", ["C3", "G3", "B3", "D4", "E4"]),     # Cmaj9: title
    (17.6, 22.6, "D2", ["D3", "F3", "A3", "C4", "E4"]),    # Dm9: 100M
    (22.6, 26.4, "F1", ["F3", "A3", "C4", "E4"]),          # Fmaj7: bars
    (26.4, 29.4, "G1", ["G3", "B3", "D4", "A4"]),          # Gadd9: 1 in 10
    (29.4, 32.0, "A1", ["A3", "C4", "E4", "G4"]),          # Am7: takeaway
    (32.0, 37.9, "A1", ["A2", "E3", "A3", "C4"]),          # Am: the case
    (37.9, 42.0, "E2", ["E3", "G#3", "B3", "D4"]),         # E7: the stamp
    (42.0, 45.7, "A1", ["A3", "C4", "E4", "G4"]),          # Am7: the question
    (45.7, 51.8, "F1", ["F3", "A3", "C4", "E4", "G4"]),    # Fmaj9: memory
    (51.8, 56.2, "D2", ["D3", "F3", "A3", "C4", "E4"]),    # Dm9: motivation
    (56.2, 58.0, "G1", ["G3", "B3", "D4", "E4"]),          # G6: the verdict
    (58.0, 64.2, "F1", ["F3", "A3", "C4", "E4"]),          # Fmaj7: ask
    (64.2, 68.2, "G1", ["G3", "B3", "D4", "E4"]),          # G6: check
    (68.2, 72.2, "A1", ["A3", "C4", "E4", "G4"]),          # Am7: disclose
    (72.2, 76.0, "C2", ["C3", "G3", "B3", "D4", "E4"]),    # Cmaj9: own, loop closes
    (76.0, 78.8, "A1", ["A3", "C4", "E4"]),                # Am: the question again
    (78.8, 81.6, "F1", ["F3", "A3", "C4", "E4", "G4"]),    # Fmaj9: you are
    (81.6, DUR, "C2", ["C3", "G3", "B3", "D4", "E4"]),     # Cmaj9: help, or hinder?
]

# arpeggio pattern per bar, as indexes into the chord's pad notes, in 8ths
ARP = [0, 2, 1, 3, 2, 1, 3, 2]


def chord_at(t):
    for t0, t1, root, notes in CHORDS:
        if t0 <= t < t1:
            return notes
    return CHORDS[-1][3]


def build():
    piano_bus = np.zeros((N, 2))
    pad_bus = np.zeros((N, 2))
    fx_bus = np.zeros((N, 2))
    sub_bus = np.zeros((N, 2))
    drum_bus = np.zeros((N, 2))
    arp_bus = np.zeros((N, 2))
    dry_bus = np.zeros((N, 2))

    for k, (t0, t1, root, notes) in enumerate(CHORDS):
        first, last = k == 0, k == len(CHORDS) - 1
        lvl = 0.016 if t0 < 5 else 0.022
        sig, at = pad(notes, t0, t1, fade_in=2.0 if first else 0.6, fade_out=3.0 if last else 0.6, level=lvl)
        place(pad_bus, sig, at)
        sig, at = sub(root, t0, t1, fade_in=2.0 if first else 0.4, fade_out=3.0 if last else 0.4,
                      level=0.085 if last else 0.065)
        place(sub_bus, sig, at)

    # ---- the beat: starts at the title, drops out for the stamp and the final question
    def beat_gain(t):
        g = min(1.0, max(0.0, (t - T["start"]) / 2.0))
        if R["stamp"] - 0.75 < t < R["stamp"] + 1.5:
            g *= 0.0
        if t > E["start"] - 1.0:
            g *= max(0.0, 1 - (t - (E["start"] - 1.0)) / 1.0)
        if S["takeaway"] - 0.1 < t < S["takeaway"] + 1.2:
            g *= 0.25
        return g

    beat0 = T["start"]
    n_beats = int((DUR - beat0) / BEAT) + 1
    for b in range(n_beats):
        at = beat0 + b * BEAT
        g = beat_gain(at)
        if g <= 0:
            continue
        bar = b % 4
        if bar in (0, 2):
            place(drum_bus, kick(0.42 * g), at)
        if bar in (1, 3):
            place(drum_bus, snap(0.16 * g, seed=b), at)
        place(drum_bus, hat(0.05 * g, 0.05, seed=b * 2), at)
        place(drum_bus, hat(0.075 * g, 0.09, seed=b * 2 + 1), at + BEAT / 2)
        notes = chord_at(at)
        for s in range(2):
            ts = at + s * BEAT / 2
            idx = ARP[(b * 2 + s) % len(ARP)] % len(notes)
            name = notes[idx]
            up = name[:-1] + str(int(name[-1]) + 1)
            place(arp_bus, pluck(up, 0.35 * beat_gain(ts)), ts)

    # ---- risers into every cut
    for cut in (T["start"], S["start"], R["start"], L["start"], Q["start"], E["start"]):
        place(fx_bus, riser(1.4, 300, 3200, 0.05), cut - 1.4)
        place(drum_bus, kick(0.5), cut)
        place(fx_bus, whoosh(0.1, 0.7, 3000, 200, 0.04), cut)

    piano_notes = []
    # prologue
    for i, at in enumerate(char_times(P["promptStart"], P["charStep"], len(PROMPT))):
        place(dry_bus, key(0.05, i), at)
    place(dry_bus, key(0.09, 99), P["enter"])
    place(fx_bus, whoosh(0.15, 0.7, 400, 3200, 0.05), P["burst"] - 0.1)
    for i in range(N_WORDS):
        at = P["streamStart"] + i / (N_WORDS - 1) * (P["streamEnd"] - P["streamStart"])
        place(fx_bus, tick(2600 + 1800 * ((i * 7) % 5) / 4, 0.018), at)
    for j, note in enumerate(["E6", "F6"]):
        place(fx_bus, plink(note, 0.25), P["flag"] + j * 0.09)
    place(dry_bus, boom(0.22), P["flag"])
    for j, (at, note) in enumerate(zip(P["slams"], ["E5", "C5", "B4", "A4"])):
        piano_notes.append((at, note, 0.45))
        piano_notes.append((at, "A2", 0.4))
        place(dry_bus, kick(0.55), at)
        place(dry_bus, boom(0.25 if j < 3 else 0.5), at)
    place(fx_bus, whoosh(0.6, 0.5, 250, 2600, 0.04), T["start"] - 0.6)

    # title
    piano_notes += [(T["line1"], "C3", 0.5), (T["line1"], "G3", 0.4), (T["line1"], "E5", 0.45), (T["line2"], "G5", 0.42)]
    for c in range(5):
        at = T["pulse"] + c * 1.4
        for li, note in enumerate(["E6", "G6", "A6", "C7"]):
            place(fx_bus, plink(note, 0.08), at + li * 0.3)
    place(fx_bus, whoosh(0.5, 0.6, 500, 4000, 0.03), T["sweep"] - 0.3)

    # scale
    c0, c1 = S["count"]
    last = 0
    for tt in np.arange(c0, c1, 1 / 240):
        n = round(100 * EO((tt - c0) / (c1 - c0)))
        if n // 4 > last // 4:
            place(fx_bus, tick(3400 + 14 * n, 0.03), tt)
        last = n
    place(fx_bus, plink("A5", 0.45, 2.0), c1)
    piano_notes += [(S["hundred"], "D3", 0.4), (S["hundred"], "A3", 0.3)]
    for at, dur, note in zip(S["barGrow"], S["barDur"], ["A5", "D6", "F6"]):
        place(fx_bus, plink(note, 0.3), at + dur)
    for j in range(9):
        place(fx_bus, plink(["G5", "A5", "C6", "D6", "G6", "A6", "C7", "D7", "G7"][j], 0.14), S["gridLit"] + j * 0.07)
    for j, at in enumerate([S["takeaway"], S["takeaway"] + 0.3, S["takeaway"] + 0.6]):
        place(dry_bus, kick(0.5), at)
        piano_notes += [(at, ["A4", "C5", "E5"][j], 0.42), (at, "A2", 0.35)]

    # risk
    step = (R["cite"][1] - R["cite"][0]) / len(CITATION)
    for i, at in enumerate(char_times(R["cite"][0], step, len(CITATION))):
        if i % 2 == 0:
            place(dry_bus, key(0.035, 200 + i), at)
    s0, s1 = R["scan"]
    place(fx_bus, whoosh(s1 - s0, 0.2, 400, 3200, 0.025), s0)
    for k in range(7):
        place(fx_bus, plink("A6", 0.07), s0 + k * (s1 - s0) / 7)
    piano_notes += [(R["result"], "E3", 0.4), (R["result"], "F3", 0.32)]
    place(fx_bus, whoosh(0.5, 0.05, 200, 4000, 0.06), R["stamp"] - 0.5)
    place(dry_bus, boom(0.8), R["stamp"])
    place(dry_bus, kick(0.7), R["stamp"])

    # learning: two slams for the question, a chord for each idea, a chime as the curves finish
    for at, note in zip((L["q1"], L["q2"]), ("A4", "E5")):
        place(dry_bus, kick(0.55), at)
        piano_notes += [(at, note, 0.45), (at, "A2", 0.4)]
    piano_notes += [(L["memory"], "F3", 0.4), (L["memory"], "C5", 0.42), (L["memory"] + 0.3, "E5", 0.36)]
    place(fx_bus, whoosh(2.0, 0.3, 500, 2800, 0.02), L["curves"])
    place(fx_bus, plink("A6", 0.3, 2.0), L["curves"] + 2.1)
    piano_notes += [(L["motivation"], "D3", 0.4), (L["motivation"], "D5", 0.42), (L["motivation"] + 0.3, "F5", 0.36)]
    for j, note in enumerate(["D5", "F5", "A5", "C6"]):
        place(fx_bus, plink(note, 0.18), L["meters"] + j * 0.25)
    piano_notes += [(L["verdict"], "G3", 0.42), (L["verdict"], "B4", 0.38), (L["verdict"], "D5", 0.36)]

    # practice
    for at, (lo, note) in zip(Q["steps"], [("F3", "C5"), ("G3", "D5"), ("A3", "E5"), ("C3", "G5")]):
        piano_notes += [(at, lo, 0.4), (at, note, 0.45)]
        place(dry_bus, kick(0.45), at)
        place(fx_bus, whoosh(0.5, 0.25, 600, 2600, 0.016), at - 0.6)
    for j, note in enumerate(["C6", "D6", "E6", "G6", "C7"]):
        place(fx_bus, plink(note, 0.24), Q["loop"] + j * 0.07)
    piano_notes += [(Q["loop"], "C3", 0.5), (Q["loop"], "G3", 0.4), (Q["loop"], "E5", 0.4)]
    place(dry_bus, boom(0.3), Q["loop"])

    # epilogue
    for i, at in enumerate(char_times(E["prompt"], E["charStep"], len(QUESTION))):
        place(dry_bus, key(0.05, 300 + i), at)
    piano_notes += [(E["answer"], n, v) for n, v in (("F2", 0.5), ("C3", 0.4), ("A3", 0.36), ("E4", 0.4), ("A4", 0.42))]
    piano_notes += [(E["bloom"], n, v) for n, v in (("C3", 0.5), ("G3", 0.4), ("E4", 0.38), ("G4", 0.36), ("C5", 0.45))]
    place(fx_bus, whoosh(0.8, 0.8, 250, 3000, 0.05), E["bloom"] - 0.6)
    place(fx_bus, whoosh(0.7, 0.6, 250, 3200, 0.05), E["flood"] - 0.6)
    place(dry_bus, kick(0.4), E["flood"])
    for at, note in zip([E["title"], E["rule"], E["tagline"], E["names"]], ["C5", "D5", "E5", "G5"]):
        piano_notes.append((at, note, 0.4))
    piano_notes += [(E["begin"], n, 0.34) for n in ("C4", "E4", "G4", "B4", "D5")]
    place(fx_bus, plink("C7", 0.2, 2.5), E["begin"])

    for at, note, vel in piano_notes:
        place(piano_bus, piano(note, vel), at)

    ir = impulse()
    send = highpass(0.6 * piano_bus + 0.8 * fx_bus + 0.5 * pad_bus + 0.35 * arp_bus + 0.15 * drum_bus, 180)
    wet = np.stack([fftconvolve(send[:, c], ir[:, c])[:N] for c in range(2)], axis=1)
    mix = piano_bus + fx_bus + pad_bus + sub_bus + dry_bus + drum_bus + arp_bus + 0.3 * wet
    mix = highpass(mix, 28)
    mix *= ramp(N, 0.02, 1.0)[:, None]
    return mix




def measure(path):
    """Integrated loudness and true peak via ffmpeg's loudnorm analysis."""
    result = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", str(path),
         "-af", "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
        capture_output=True, text=True, check=True)
    text = result.stderr
    stats = json.loads(text[text.rindex("{"):text.rindex("}") + 1])
    return float(stats["input_i"]), float(stats["input_tp"])


def limit(x, ceiling_db=-1.5):
    """Soft look-ahead peak limiter on 4x oversampled peaks."""
    ceiling = 10 ** (ceiling_db / 20)
    peaks = np.abs(resample_poly(x, 4, 1, axis=0)).max(axis=1).reshape(-1, 4).max(axis=1)[: len(x)]
    look = int(0.003 * SR)
    peaks = maximum_filter1d(peaks, size=2 * look + 1)
    gain = np.minimum(1.0, ceiling / np.maximum(peaks, 1e-9))
    release = np.exp(-1 / (0.08 * SR))
    smooth, _ = lfilter([1 - release], [1, -release], gain, zi=[release * gain[0]])
    return x * np.minimum(gain, smooth)[:, None]


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    mix = build()
    raw = OUT.with_name("score_raw.wav")
    wavfile.write(raw, SR, mix.astype(np.float32))
    loudness, _ = measure(raw)
    mix *= 10 ** ((-16 - loudness) / 20)
    mix = limit(mix)
    out = OUT
    wavfile.write(out, SR, mix.astype(np.float32))
    raw.unlink()
    final_i, final_tp = measure(out)
    print(f"{out}  {len(mix) / SR:.2f} s  {final_i:.1f} LUFS  true peak {final_tp:.1f} dBTP")


if __name__ == "__main__":
    main()
