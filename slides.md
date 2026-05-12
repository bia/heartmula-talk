# Teaching AI to Make Music Like I Do
# Bianca Cheng — HeartMula talk
#
# Each slide is a YAML block between --- delimiters.
# Edit text freely; the renderer (render.js) regenerates the deck on reload.
# Inline markdown: **bold** *italic* `code`. Raw HTML (<em>, <strong>, <br/>) also works.

---
type: hero
photo: ./bianca-singing.png
photo-alt: Bianca Cheng singing live with her band, warm string lights overhead
eyebrow: A talk in 30 tracks
title: |
  Teaching AI<br />to Make Music<br /><em>Like I Do</em>
meta-left: Bianca Cheng
meta-right: HeartMula

---
type: stack
eyebrow: Who am I?
heading: Bianca Cheng
heading-style: display
lede: Born in São Paulo — Chinese mother, Italian father. Polyglot in seven languages.
body: |
  MIT Media Lab → Apple (nine patents) → exhibited at Ars Electronica and the Met →
  now in Barcelona, leading <strong>AO</strong>, a neo-soul quartet rooted in
  jazz, funk, psychedelia, and Brazilian / Galician traditions.
muted: Currently somewhere between a recording booth and VSCode.
cards:
  - num: "01"
    title: Musician
    body: Songwriter and recording artist. Twelve years of demos, voice memos, late-night takes.
  - num: "02"
    title: Designer
    body: Shaping how products feel. Obsessed with the seam between tool and instrument.
  - num: "03"
    title: Technologist
    body: Computer scientist, application developer. Not an ML engineer — AI tools filled the gap.

---
type: center
eyebrow: The question that started this
quote: |
  Can a machine<br />learn to sound<br /><em>like me?</em>

---
type: bullets
eyebrow: The project
heading: HeartMula
heading-style: display-sm
lede: An experiment in collaborative AI music-making, trained on my own catalog.
bullets:
  - Not a tool that generates music <em>at</em> me.
  - A partner that improvises <em>with</em> me.
  - A mirror, occasionally a stranger, occasionally exactly right.

---
type: media-audio
eyebrow: HeartMula · day zero
title: Untrained. Untouched.
sub: The base model's first attempt — <em>before it had ever heard a note of mine.</em>
sub-tight: true
audio: ./media/first-output.wav
caption-tag: v0
caption-text: first-output.wav · pre-fine-tuning
style: raw
wave-style: noise
wave-gradient: lavender
tag-class: cool

---
type: stats
heading: The corpus is me
bg-image: ./media/voice-memos.jpg
bg-image-alt: macOS Voice Memos showing song titles like Voar, Nada tudo, Lutar
stats:
  - num: "47"
    label: songs
  - num: "12"
    label: years
  - num: "312"
    label: voice memos
  - num: "1"
    label: pianist I can't replicate (yet)
muted: |
  Finished records, half-baked demos, hummed melodies in airport bathrooms.
  Everything I've made, fed back to a system that was trying to become me.

---
type: stack
heading: How it actually works
lede: |
  I didn't start from scratch. I forked <strong>Christian</strong>'s open-source
  ML project — built for <em>education</em>, not music — and used it as
  scaffolding to figure out GCP and training infrastructure.
body: |
  On top of that I built a fine-tuning pipeline around the <strong>HeartMuLa</strong>
  open-weights music-model suite, with a <strong>3 billion parameter</strong>
  backbone adapted via <strong>LoRA</strong> on paired audio.
aside: |
  A "<strong>music language model</strong>" is a transformer LM — same architecture
  as GPT — but predicting <em>audio tokens</em> instead of text. HeartCodec
  discretizes a waveform into <strong>12.5 tokens per second</strong>; HeartMuLa-3B
  autoregressively predicts the next chunk of sound, just like GPT predicts the next word.
muted: Six models in. One gets fine-tuned. Five pipeline steps follow.

---
type: model-stack
eyebrow: The stack
heading: Six models, one fine-tuned.
groups:
  - label: HeartMuLa project
    cards:
      - num: "01"
        name: HeartMuLa-oss-3B
        role: Music language model
        detail: 3 billion parameters · base frozen, LoRA adapter trains
        status: Adapted · LoRA r16
        featured: true
      - num: "02"
        name: HeartCodec
        role: Neural audio codec
        detail: 12.5 Hz · audio ↔ tokens
        status: Frozen
      - num: "03"
        name: HeartMuLaGen
        role: Tokenizer & generation assets
        detail: Shared utilities
        status: Frozen
  - label: Auxiliary
    cards:
      - num: "04"
        name: WavLM
        role: Audio feature encoder
        detail: Feeds the conditioning module
        status: Frozen
      - num: "05"
        name: LAION CLAP
        role: Zero-shot tags
        detail: Genre · instrument · mood · tempo
        status: Frozen
      - num: "06"
        name: Whisper-large-v3
        role: Lyric transcription
        detail: Auto language detection
        status: Frozen

---
type: pipeline-step
eyebrow: Pipeline · 01 / 05
title: Pair the data.
sub: |
  Input WAVs (demos, sketches) matched to target WAVs (finished arrangements) by filename.
  The model learns the <em>move</em> between them — not just the catalog.
image: ./media/pipeline-01-pair.jpg
image-alt: Finder showing the data/paired/ folder with inputs, outputs, lyrics, and tags subdirectories
caption: data/paired/ · matched by filename

---
type: pipeline-step
eyebrow: Pipeline · 02 / 05
title: Annotate automatically.
sub: |
  <strong>LAION CLAP</strong> zero-shots tags (genre, instrument, mood, tempo).
  <strong>Whisper-large-v3</strong> transcribes lyrics. No manual labels.
aside: |
  <strong>CLAP</strong> is <strong>CLIP</strong> for audio — sounds and words live in
  the same vector space, so <em>"is this Rhodes piano?"</em> becomes a cosine similarity
  check. <strong>HTSAT</strong> (Hierarchical Token-Semantic Audio Transformer) is the
  audio encoder under the hood.
image: ./media/pipeline-02-annotate.jpg
image-alt: VSCode editing annotate.py with Whisper language detection logic
caption: annotate.py · CLAP + Whisper

---
type: pipeline-step
eyebrow: Pipeline · 03 / 05
title: Condition the backbone.
sub: |
  WavLM frame features → pooled to <strong>32 prefix tokens</strong> →
  projected to backbone dimension → added as a global bias on every backbone
  forward pass via a forward hook.
aside: |
  Honest aside: I vibe-coded this bridge with AI — the
  <strong>AudioConditioningModule</strong> that connects WavLM to HeartMuLa's
  backbone wouldn't have come out of my head from scratch.
image: ./media/pipeline-03-condition.jpg
image-alt: Claude pane explaining the AudioConditioningModule architecture
caption: AudioConditioningModule · WavLM hook

---
type: pipeline-step
eyebrow: Pipeline · 04 / 05
title: Train with LoRA.
sub: |
  <strong>LoRA rank 16</strong> on the attention projections of
  HeartMuLa-3B's global backbone. The 3B base weights stay frozen.
aside: |
  <strong>LoRA</strong> = Low-Rank Adaptation. Instead of retraining all
  3 billion parameters, you train tiny <em>B × A</em> adapter matrices that
  nudge the model's behavior. Roughly <strong>10M trainable params</strong>
  at rank 16 — about <strong>300× fewer</strong> than full fine-tuning,
  fits on a single GPU, produces a <strong>10 MB</strong> adapter file you can swap.
  The small parameter count is also what makes <strong>few-shot training</strong>
  viable — <strong>47 paired songs</strong> is enough.
image: ./media/pipeline-04-train.jpg
image-alt: VSCode reviewing finetune_audio2audio_direct.py for performance optimization
caption: finetune_audio2audio_direct.py · LoRA rank 16

---
type: pipeline-step
eyebrow: Pipeline · 05 / 05
title: Generate.
sub: |
  Apply the LoRA adapter, install the conditioning hook, hand it a new input.
  Decode <strong>30 seconds</strong> of audio.
image: ./media/pipeline-05-generate.jpg
image-alt: VSCode and Claude pane working on generate_audio2audio.py inference pipeline
caption: generate_audio2audio.py · adapter + hook

---
type: center
eyebrow: Let's try it
quote: |
  On a song<br /><em>of mine.</em>
muted: Time to feed it a real composition and see what comes back.

---
type: media-video-pair
eyebrow: Some context, briefly
title: Two eras of me.
sub: |
  From bossa nova (<em>THIS IS BOSSA</em>) to neo-soul (<em>AO</em>) —
  the journey the model is trying to learn.
sub-tight: true
layout: split
videos:
  - src: ./media/bossa-fugaz.mp4
    tag: Then
    caption: THIS IS BOSSA · Fugaz
  - src: ./media/ao-moments.mp4
    tag: Now
    tag-class: ao
    caption: AO · Moments

---
type: media-video
eyebrow: Composition journey · 01
title: It started as a sketch.
sub: |
  A song called <em>Chuva</em> — about the first day of rain at the end of summer,
  the day a friend moved away from Barcelona.
video: ./media/chuva-sketch.mov
caption-tag: Sketch
caption-text: Voice memo · piano · Barcelona, 2023
layout: split

---
type: media-audio
eyebrow: Composition journey · 02
title: Using my own model.
sub: |
  I fed it the finished version of Chuva — fully arranged, sung in Portuguese.
  <em>Bm7(9) · Em6 · "dia de chuva e acabou o verão."</em>
sub-tight: true
audio: ./media/chuva.wav
caption-tag: Chuva
caption-text: All instruments, vocals — me.
bg-image: ./media/chuva-sheet-music.jpg
bg-image-alt: Handwritten chord chart for Chuva on staff paper with Portuguese lyrics
wave-style: song
wave-gradient: mixed

---
type: stack
section-class: section--ao section--ao--photo
photo: ./media/ao-band-wide.jpg
photo-alt: AO performing live, full band on stage with string lights overhead
heading: What I was actually asking.
lede: Not imitation. Evolution.
body: |
  I wasn't asking the model to imitate me. I was asking it to <em>evolve</em> me.

  To take Chuva — written in 2024, when I was still mostly bossa nova and MPB —
  and pull it forward into the neo-soul I'm writing now with <strong>AO</strong>,
  my band in Barcelona.
muted: Not "sound like me." More like: <em>keep up with me.</em>

---
type: lesson
eyebrow: Lesson 01
heading: AI is a mirror
lede: The model didn't invent my habits. It surfaced them.
body: |
  Every comfort note I overuse. Every minor 9 I default to at 2am.
  The model handed back a polished version of my unconscious choices —
  flattering, then unflattering, then flattering again.
audio:
  src: ./media/chuva-gen1.wav
  tag: Gen 01
  caption: My reflexes, sung back at me.
callout: Listening to my own habits sung back to me <em>changed</em> what I wrote next.

---
type: lesson
eyebrow: Lesson 02
heading: AI is a duet partner
lede: The best moments weren't generations. They were dialogues.
body: |
  I'd play eight bars. The model would answer. I'd disagree.
  We'd go back and forth until the song was something neither of us would have written alone.

  Replace "model" with "drummer I tour with" and the workflow is identical.
audio:
  src: ./media/chuva-gen2.wav
  tag: Gen 02
  caption: The take I didn't see coming.

---
type: lesson
eyebrow: Lesson 03
heading: Voice isn't output
lede: Voice is the editing.
body: |
  The model can produce a thousand convincing Bianca-flavored loops in a minute.
  None of them are mine until I choose one and throw the other 999 away.
audio-pair:
  - src: ./media/chuva-gen1.wav
    tag: Gen 01
    caption: The take I started with.
  - src: ./media/chuva-gen2.wav
    tag: Gen 02
    caption: The one I kept.
callout: Generation is cheap. <em>Curation is the artist.</em>

---
type: lesson
theme: ao
photo: ./media/ao-band-energy.jpg
photo-alt: Bianca performing with AO, hands raised mid-song, bandmates framing the moment
eyebrow: Lesson 04
heading: There's a ceiling I haven't broken.
lede: The model picks up timbre, mood, even some phrasing.
body: |
  What it doesn't catch — yet — is the melodic and harmonic depth
  <strong>Pablo Puentes</strong>, AO's keys player, brings to the band.
  Rich chord progressions. The note that surprises me. The line that sets up a
  moment three bars later.
callout: |
  Even the training config admitted it: I told the model that getting the melody right
  was worth only <em>30% of its attention</em> — too low. Bumping that number is one
  of the things I want to try next.

---
type: center
eyebrow: The bigger question
quote: |
  What if my <em>voice</em><br />was never about its sound,<br />but about my <em>musical taste?</em>
quote-class: serif

---
type: bullets
heading: What's next for HeartMula
bullets-class: roomy
bullets:
  - <strong>Live performance</strong> — bringing the model on stage as a third instrument.
  - <strong>Open toolkit</strong> — packaging the training pipeline for other artists' catalogs.
  - <strong>More songs</strong> — the model needs new material. So do I.
  - <strong>A record</strong> — co&#8209;produced with myself. Credits get philosophical.
  - <strong>Raise the melodic bar</strong> — richer melodic depth, surprises in the chord progression.

---
type: open-source
eyebrow: It's open source
pretitle: Fork it. Train it on your catalog.
url: github.com/bia/bia-music-composer
caption: 📷 &nbsp; Photograph this slide.

---
type: thank-you
eyebrow: Thank you
heading: Let's talk.
muted: Questions, collaborations, your own catalog — all welcome.
contact: bianca cheng <span class="bullet">·</span> heartmula <span class="bullet">·</span> get.bianca@gmail.com
qrs:
  - src: ./media/qr-instagram.svg
    label: Instagram
    handle: "@biancachenggg"
  - src: ./media/qr-linkedin.svg
    label: LinkedIn
    handle: in/biancacheng

---
type: pipeline-step
eyebrow: Process · 01 / 04
title: GPU said no.
sub: Hour after hour of CUDA out-of-memory errors.
image: ./media/process-01-cuda-oom.jpg
image-alt: VSCode showing a CUDA out-of-memory error during a training run
caption: finetune_audio2audio.py · OOM

---
type: pipeline-step
eyebrow: Process · 02 / 04
title: Training, finally.
sub: After enough yak-shaving, the model started learning.
image: ./media/process-02-training.jpg
image-alt: GCP Compute Engine logs streaming as the heartmula-train VM loads checkpoint shards
caption: heartmula-train · GCP Compute

---
type: pipeline-step
eyebrow: Process · 03 / 04
title: Teaching it Portuguese.
sub: WhisperX transcribing Chuva's lyrics. The model needed to know what it was hearing.
image: ./media/process-03-portuguese.jpg
image-alt: VSCode pair-programming with Claude on the finetune.py annotation pipeline
caption: annotate.py · WhisperX

---
type: pipeline-step
eyebrow: Process · 04 / 04
title: Training complete.
sub: First successful run. Eval losses landed where they were supposed to.
image: ./media/process-04-training-success.jpg
image-alt: Claude pane showing 'Training completed and successful' with eval epoch summaries
caption: v1 · 4 epochs
