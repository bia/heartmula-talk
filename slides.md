# Same song, three systems
# Bianca Cheng — HeartMula talk · Festival Futuros Possíveis · Casa Firjan
#
# English version. Opened by index.html. Mirrors slides.pt-BR.md slide for slide —
# every content change goes into both files.
# Facts match the current bia-music-composer code
# (MERT instead of WavLM, 64 prefix tokens, melodic loss term, 16 pairs).

---
type: hero
photo: ./bianca-singing.png
photo-alt: Bianca Cheng singing live with the band, warm string lights overhead
eyebrow: Music, design and machines
title: |
  Teaching AI<br />to Make Music<br /><em>Like I Do</em>
meta-left: Bianca&nbsp;Cheng
meta-right: Futuros&nbsp;Possíveis&nbsp;· Casa&nbsp;Firjan
---
type: center
eyebrow: São Paulo
quote: |
  I was born<br />in <em>São&nbsp;Paulo.</em>
muted: A city that never stops — and the first soundtrack of my&nbsp;life.
photo-bg: ./media/bio-sao-paulo.jpg
photo-bg-alt: São Paulo at dusk, with Pico do Jaraguá in the distance
photo-bg-style: full
photo-bg-pos: 50% 62%
---
type: stack
eyebrow: Culture
heading: Three cultures, seven&nbsp;languages.
lede: Chinese mother, Italian&nbsp;father.
body: |
  I grew up and went to school in Italy and the US. Then Barcelona, Sweden and Germany&nbsp;—
  and back to Barcelona. I spent a lot of time in China, and travelled through many places
  I never got to live&nbsp;in.

  I think that's where I learned to hear things more than one&nbsp;way.
photo-bg: ./media/bio-infancia.jpg
photo-bg-alt: Baby Bianca, smiling, eating a piece of bread in a high chair
photo-bg-style: side
photo-bg-pos: 50% 30%
---
type: stack
eyebrow: MIT · Art and science
heading: Math, science… and&nbsp;art.
body: |
  At school, what I really loved was math and science — and that led me to study
  engineering at MIT.

  There I found a place where my love of technology and of art could
  coexist: I worked in <strong>Hiroshi Ishii</strong>'s
  <strong>Tangible Media Group</strong> at the MIT Media Lab — where the idea is to give
  information a physical form, so we can touch it. That work with Hiroshi was exhibited at
  <strong>Ars&nbsp;Electronica</strong>.
photo-bg: ./media/bio-mit-media-lab.jpg
photo-bg-alt: The MIT Media Lab building lit up at dusk
photo-bg-style: full
photo-bg-pos: 50% 45%
---
type: pipeline-step
eyebrow: Apple · Art and science
title: The MacBook's haptic&nbsp;trackpad.
sub: |
  While still at MIT, with the iPhone just launched, I got an offer from Apple's software
  prototyping group. There I invented the MacBook's haptic trackpad — once again,
  bringing my sense of touch into the digital world. Eleven US&nbsp;patents.
image: ./media/bio-apple-patentes.jpg
image-alt: Apple patent figures — a touch-sensitive surface, contact intensity and a musical interface
caption: Patent figures · Apple
---
type: center
eyebrow: The turn
quote: |
  From touch<br />to&nbsp;<em>sound.</em>
muted: I took the same sensory curiosity from touch into audio — technology and&nbsp;music.
photo-bg: ./media/bio-hoje.jpg
photo-bg-alt: Bianca wrapped in striped fabric that dissolves into particles
photo-bg-style: full
photo-bg-pos: 60% 40%
---
type: center
eyebrow: Music and technology
quote: |
  Music<br />and <em>technology.</em>
muted: The thread that ties together everything I do — even my AO stage outfits, which I design&nbsp;myself.
video-bg: ./media/bio-musica-tecnologia.mp4
photo-bg: ./media/bio-musica-tecnologia.jpg
photo-bg-alt: AI-generated portrait of two figures in orange costumes and headdresses
photo-bg-style: full
photo-bg-pos: 50% 35%
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
  - src: ./media/ao-moments-artificial.mp4
    tag: Now
    tag-class: ao
    caption: AO · Moments · Arteficial
---
type: center
eyebrow: The question that started this
quote: |
  Can a machine<br />learn to sound<br /><em>like me?</em>
photo-bg: ./media/bia-live-blue.jpg
photo-bg-alt: Bianca live, hands on the microphone, blue light
photo-bg-style: right
photo-bg-pos: 50% 35%
---
type: center
eyebrow: Part 1 · Same song, three systems
quote: |
  What happens when<br />I teach a machine<br />to make <em>my</em>&nbsp;music?
---
type: bullets
eyebrow: The experiment
heading: Same song, three systems.
heading-style: display-sm
lede: One song of mine, <em>Chuva</em>. Three ways of teaching a machine to play it like I&nbsp;do.
bullets:
  - <strong>HeartMula</strong> — my own pipeline. Early this year it was the only option — I built the fine-tuning of HeartMuLa-3B on my demo → arrangement pairs by&nbsp;hand.
  - <strong>ACE-Step 1.5</strong> — months later, what I did by hand comes built in. Two versions — with just a style reference, and with a LoRA trained on my 16&nbsp;songs.
  - <strong>Suno</strong> — the commercial tool millions of people use — and my partner for a live&nbsp;duet.
---
type: media-video
eyebrow: Composition journey · 01
title: It started as a sketch.
sub: |
  A song called <em>Chuva</em> ("rain") — about the first day of rain at the end of summer,
  the day one of my best friends moved away from Barcelona.
video: ./media/chuva-sketch.mov
caption-tag: Sketch
caption-text: Voice memo · piano · Barcelona, 2023
layout: split
---
type: media-audio
eyebrow: The song · the input
title: The demo all three get.
sub: |
  The demo of Chuva — fully arranged, sung in Portuguese.
  <em>Bm7(9) · Em6 · "dia de chuva e acabou o verão."</em>
sub-tight: true
audio: ./media/chuva.wav
caption-tag: Chuva
caption-text: All instruments, vocals — me.
bg-image: ./media/chuva-sheet-music.jpg
bg-image-alt: Handwritten chord chart for Chuva on staff paper, with Portuguese lyrics
wave-style: song
wave-gradient: mixed
---
type: stack
section-class: section--ao section--ao--photo
photo: ./media/ao-bmurals.jpg
photo-alt: AO sitting on the floor at B-Murals at dusk
heading: What I was actually asking.
lede: Not imitation. Evolution.
body: |
  I wasn't asking the model to imitate me. I was asking it to <em>evolve</em> me.

  To take Chuva — written in 2023, when I was still mostly bossa nova and MPB —
  and pull it forward into the neo-soul I'm writing now with <strong>AO</strong>,
  my band in Barcelona.
muted: Not "sound like me." More like — <em>keep up with me.</em>
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
type: center
eyebrow: System 1 / 3
quote: |
  HeartMula.<br /><em>My own model.</em>
muted: Fine-tuning an open 3-billion-parameter model on my demo → arrangement&nbsp;pairs.
photo-bg: ./media/ao-pink-wall.jpg
photo-bg-alt: AO in front of a pink wall, with keyboard, microphone, drumsticks and bass
photo-bg-style: full
photo-bg-pos: 50% 62%
---
type: bullets
eyebrow: System 1 · the project
heading: HeartMula
heading-style: display-sm
lede: An experiment in collaborative AI music-making, trained on my own catalog.
bullets:
  - Not a tool that generates music <em>at</em> me.
  - A partner that improvises <em>with</em> me.
  - A mirror — occasionally a stranger, occasionally exactly right.
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
type: model-stack
eyebrow: The stack
heading: Six models, one fine-tuned.
groups:
  - label: HeartMuLa project
    cards:
      - num: "01"
        name: HeartMuLa-oss-3B
        role: Music language model
        detail: 3 billion parameters · happy-new-year checkpoint (Feb 2026) · base frozen, LoRA adapter trains
        status: Adapted · LoRA r16
        featured: true
      - num: "02"
        name: HeartCodec
        role: Neural audio codec
        detail: 12.5 Hz · audio ↔ tokens
        status: Frozen
      - num: "03"
        name: HeartMuLaGen
        role: Tokenizer &amp; generation assets
        detail: Shared utilities
        status: Frozen
  - label: Auxiliary
    cards:
      - num: "04"
        name: MERT-v1-95M
        role: Music audio encoder
        detail: Pre-trained on music (replaced WavLM) · feeds the conditioning module
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
image-alt: Finder showing the data/paired/ folder with inputs, outputs, lyrics and tags subfolders
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
image-alt: VS Code editing annotate.py with Whisper language detection logic
caption: annotate.py · CLAP + Whisper
---
type: pipeline-step
eyebrow: Pipeline · 03 / 05
title: Condition the backbone.
sub: |
  <strong>MERT</strong> frame features → pooled to <strong>64 prefix tokens</strong> →
  projected to backbone dimension → prepended to the sequence in training;
  added as a global bias via a forward hook at generation.
aside: |
  Honest aside: I vibe-coded this bridge with AI — the
  <strong>AudioConditioningModule</strong> that connects the encoder to HeartMuLa's
  backbone wouldn't have come out of my head from scratch. I started with
  <strong>WavLM</strong> (built for speech) and swapped it for <strong>MERT</strong>, trained on music.
image: ./media/pipeline-03-condition.jpg
image-alt: Claude pane explaining the AudioConditioningModule architecture
caption: AudioConditioningModule · MERT hook
---
type: pipeline-step
eyebrow: Pipeline · 04 / 05
title: Train with LoRA.
sub: |
  <strong>LoRA rank 16</strong> on the attention projections of
  HeartMuLa-3B's global backbone. The 3B base weights stay frozen. On top of
  cross-entropy, a <strong>melodic term</strong> in the loss pulls the demo's
  representation toward the final arrangement's.
aside: |
  <strong>LoRA</strong> = Low-Rank Adaptation. Instead of retraining all
  3 billion parameters, you train tiny <em>B × A</em> adapter matrices that
  nudge the model's behavior. Roughly <strong>10M trainable params</strong>
  at rank 16 — about <strong>300× fewer</strong> than full fine-tuning; it fits on a
  single GPU and produces a <strong>~20 MB</strong> adapter you can swap like a plugin.
  That small count is what makes <strong>few-shot training</strong> viable —
  <strong>16 song pairs</strong> are enough to start.
image: ./media/pipeline-04-train.jpg
image-alt: VS Code reviewing finetune_audio2audio_direct.py for performance optimization
caption: finetune_audio2audio.py · LoRA rank 16 · melodic weight 0.1
---
type: pipeline-step
eyebrow: Pipeline · 05 / 05
title: Generate.
sub: |
  Apply the LoRA adapter, install the conditioning hook, hand it a new input.
  Decode <strong>30 seconds</strong> of audio.
image: ./media/pipeline-05-generate.jpg
image-alt: VS Code and Claude pane working on the generate_audio2audio.py inference pipeline
caption: generate_audio2audio.py · adapter + hook
---
# TODO: Lessons 01–02 are System 1 (HeartMula) results.
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
photo-bg: ./media/ao-rehearsal-bass.jpg
photo-bg-alt: AO rehearsal, bass in the foreground and Bianca singing behind
photo-bg-style: side
photo-bg-pos: 30% 40%
---
type: stack
eyebrow: Nine months later
heading: Why switch models?
lede: In AI music, nine months is a whole generation.
body: |
  When I started HeartMula, the open model I picked could sing whole songs —
  but couldn't take an audio reference. So I built that bridge by hand:
  a cloud GPU, out-of-memory errors, a vibe-coded conditioning module.

  Today, <strong>ACE-Step 1.5</strong> does it out of the box — and runs on my MacBook.
  The question is the same. Only the tool changed.
cards:
  - num: "01"
    title: HeartMula · 9 months ago
    body: My own pipeline on Google Cloud. Audio reference was still on the base model's to-do list — I had to build it.
  - num: "02"
    title: ACE-Step 1.5 · today
    body: A full song, with vocals and Portuguese lyrics. Reference, remix and LoRA training built into the UI — local, on a laptop.
  - num: "03"
    title: What didn't change
    body: The catalog. The same 16 songs, the same Chuva. That's what makes the comparison fair.
---
type: center
eyebrow: System 2 / 3
quote: |
  ACE-Step 1.5.<br /><em>Two versions.</em>
muted: An open full-song model, with vocals and lyrics (MIT license, runs on a MacBook M1). First with no training at all — then with my catalog.
photo-bg: ./media/ao-bmurals.jpg
photo-bg-alt: AO sitting on the floor at B-Murals at dusk
photo-bg-style: full
photo-bg-pos: 50% 70%
---
type: pipeline-step
eyebrow: System 2A · reference only
title: The demo, a reference, a description.
sub: |
  The <strong>Chuva demo</strong> as source, AO's <em>Moments</em> as <strong>reference</strong>,
  the Portuguese lyrics and a caption describing the sound.
image: ./media/ace-01-ref.jpg
image-alt: ACE-Step 1.5 interface with the Chuva demo as source, Moments as reference, a neo-soul caption and the Chuva lyrics
caption: ACE-Step 1.5 · Custom · turbo 2B · MacBook
---
type: media-audio
eyebrow: System 2A · result
title: Chuva, untrained.
sub: The model has never heard my catalog — just this demo and one AO song.
sub-tight: true
audio: ./media/chuva-ace-ref.mp3
caption-tag: 2A
caption-text: Chuva · ACE-Step 1.5 · reference only
wave-style: song
wave-gradient: mixed
---
type: center
eyebrow: System 2B
quote: |
  ACE-Step 1.5<br />+ <em>my catalog.</em>
muted: A LoRA trained on 16 of my songs, on an L4 GPU in Google Cloud.
photo-bg: ./media/ao-mural.jpg
photo-bg-alt: AO standing in front of a large painted mural
photo-bg-style: full
photo-bg-pos: 50% 82%
---
type: bullets
eyebrow: System 2B · the work
heading: From my catalog to a LoRA.
heading-style: display-sm
lede: An open full-song model, its web UI, and my 16 songs.
bullets:
  - <strong>Install</strong> — ACE-Step 1.5 on the MacBook, with the MLX backend for Apple Silicon.
  - <strong>Build the dataset</strong> — the 16 finished HeartMula songs — audio, lyrics with [Verse]/[Chorus] and a caption that starts with the trigger word <em>bia-style</em>.
  - <strong>Don't leave it instrumental</strong> — “All Instrumental” is on by default; switched off, the model also learns my voice and the lyrics.
  - <strong>Train the LoRA</strong> — in ACE-Step's own LoRA Training tab — scan, preprocess, train.
  - <strong>Generate</strong> — LoRA loaded and <em>bia-style</em> in the caption → neo-soul, in Portuguese, with rap.
---
type: pipeline-step
eyebrow: System 2B · the dataset
title: ACE-Step's Dataset Builder.
sub: |
  Scan the 16 songs, check lyrics and captions, preprocess, train.
  Watch out for <strong>All Instrumental</strong> — left on, the LoRA would ignore the lyrics and my voice.
image: ./media/ace-02-lora.jpg
image-alt: ACE-Step 1.5 LoRA Training tab, in the Dataset Builder, with the dataset fields and the All Instrumental option
caption: ACE-Step 1.5 · LoRA Training · Dataset Builder
---
type: media-audio
eyebrow: System 2B · result
title: Chuva, with my catalog.
sub: |
  Neo-soul, in Portuguese, with rap — ACE-Step 1.5 with the <em>bia-style</em> LoRA,
  trained on my 16 songs.
sub-tight: true
audio: ./media/bia-style-final.mp3
caption-tag: 2B
caption-text: Chuva · ACE-Step 1.5 · bia-style LoRA · 3:30
bg-image: ./media/ao-rehearsal-bass.jpg
bg-image-alt: AO rehearsal, bass in the foreground and Bianca singing behind
wave-style: song
wave-gradient: mixed
---
type: center
eyebrow: System 3 / 3
quote: |
  Suno.<br /><em>Everyone's tool.</em>
muted: No code, no training, no GPU — a prompt and some lyrics.
photo-bg: ./media/bia-live-garage.jpg
photo-bg-alt: Bianca singing live with AO in Barcelona
photo-bg-style: full
photo-bg-pos: 70% 30%
---
type: media-audio
eyebrow: System 3 · live
title: A duet with the machine.
sub: Suno plays. I sing on top — <em>right here, right now.</em>
sub-tight: true
audio: ./media/late-train-to-nowhere.mp3
caption-tag: Duet
caption-text: Late Train To Nowhere · Suno + Bianca,&nbsp;live
wave-style: song
wave-gradient: mixed
photo-bg: ./media/bia-live-bfv.jpg
photo-bg-alt: Bianca singing live, head back, eyes closed
photo-bg-style: full
photo-bg-pos: 62% 30%
---
type: stack
eyebrow: Side by side
heading: Same song. Three answers.
lede: What each system heard in Chuva — and what it left behind.
cards:
  - num: "01"
    title: HeartMula
    body: Pretty catchy — but lacking richness, in the instruments and the vocals.
  - num: "02"
    title: ACE-Step
    body: Reference only, a lot of intimacy! But none of my grit. With the LoRA, it misses my exact vocal tone.
  - num: "03"
    title: Suno
    body: It invented its own song — but, as we just saw, it can be a partner for&nbsp;me.
closing: All of these are <em>tools.</em>
---
type: center
eyebrow: Your turn
quote: |
  Which one<br />sounds most <em>like me?</em>
muted: Raise your hand — 1, 2 or 3.
---
type: lesson
eyebrow: Lesson 03
heading: Voice isn't output
lede: Voice is the editing.
body: |
  The model can produce a thousand convincing Bianca-flavored loops in a minute.
  None of them are mine until I choose one and throw the other 999 away.
callout: Generation is cheap. <em>Curation is the artist.</em>
photo-bg: ./media/bia-live-garage.jpg
photo-bg-alt: Bianca singing live with AO in Barcelona
photo-bg-style: side
photo-bg-pos: 88% 30%
---
# TODO: revisit the callout after hearing all three systems — is the ceiling still the same?
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
  First attempt at tackling it: I swapped the speech encoder (WavLM) for
  <strong>MERT</strong>, trained on music, and added a <strong>melodic term</strong>
  to the loss — weighted at just <em>0.1</em>. Still too low. Raising that number is the next experiment.
---
type: stack
eyebrow: Beyond generation
heading: Generation is only part of the&nbsp;story.
lede: Training models is just one of the ways I make music with technology. I also play with it — through the body, the image and even&nbsp;taste.
cards:
  - num: "01"
    title: The glove
    body: An instrument I wear — one that recognizes my dance in real&nbsp;time.
  - num: "02"
    title: Live image
    body: Stable Diffusion turns the show's video, frame by frame, into an&nbsp;animation.
  - num: "03"
    title: Taste the music
    body: A popsicle that conducts the music — so you can taste each&nbsp;instrument.
---
type: bullets
eyebrow: The glove
heading: A glove that understands how I&nbsp;dance.
heading-style: display-sm
lede: An instrument I wear. Built with a team in San&nbsp;Francisco.
bullets:
  - <strong>Sensors</strong> — motion and flex sensors, plus hand tracking.
  - <strong>Machine learning</strong> — a model trained on my dance gestures, recognizing them in real time.
  - <strong>Output</strong> — each gesture lights the glove's LEDs and sends MIDI to sound and light.
  - <strong>On stage</strong> — the interface becomes the set — the audience watches the model recognize each gesture.
photo-bg: ./media/bia-live-blue.jpg
photo-bg-alt: Bianca live, hands outstretched, blue light
photo-bg-style: side
photo-bg-pos: 62% 35%
---
type: media-video
eyebrow: Real-time image
title: The music paints the screen.
sub: |
  A live video goes in, frame by frame, and comes out transformed by
  <strong>Stable Diffusion</strong> into a prompt-driven animation — in real time.
  I've used it in live shows in Barcelona and&nbsp;Paris.
youtube: 1joOZe2UyBA
caption-tag: Stable Diffusion
caption-text: VJ Stream Diffusion · Barcelona and Paris
layout: split
---
type: media-video
eyebrow: Taste the&nbsp;music
title: Tasting the&nbsp;music.
sub: |
  Ice conducts electricity. With <strong>Ableton Live</strong> and <strong>Arduino</strong>,
  each instrument in the song becomes an electrical signal — its own waveform —
  sent into the popsicle. You don't hear the music — you <em>taste</em> each&nbsp;instrument.
youtube: sItFOYjvQEs
portrait: true
caption-tag: Taste the&nbsp;music
caption-text: Music Popsicle · Ableton Live + Arduino
layout: split
---
type: center
eyebrow: The bigger question
quote: |
  What if my <em>voice</em><br />was never about its sound,<br />but about my <em>musical taste?</em>
quote-class: serif
photo-bg: ./media/bia-mural.jpg
photo-bg-alt: Bianca in front of a colorful mural in Barcelona
photo-bg-style: full
photo-bg-pos: 50% 28%
---
type: bullets
heading: What's&nbsp;next
lede: For my music, and for the tools I build for&nbsp;it.
bullets-class: roomy
bullets:
  - <strong>Live, in real time</strong> — Magenta RealTime 2 on a MacBook, played by my keys and the&nbsp;glove.
  - <strong>All on one stage</strong> — the glove, the visuals and the AI together in an AO&nbsp;show.
  - <strong>Open tools</strong> — the training pipeline, and whatever I learn along the way, for other&nbsp;artists.
  - <strong>More songs</strong> — the machine needs new material. So do&nbsp;I.
  - <strong>A record</strong> — co&#8209;produced with myself. Credits get&nbsp;philosophical.
---
type: open-source
eyebrow: It's open source
url: github.com/bia/bia-music-composer
url2: heartmula-talk.netlify.app
caption: 📷 &nbsp; Photograph this — the code and this talk's&nbsp;slides.
qrs:
  - src: ./media/qr-github.svg
    label: The code
    handle: github.com/bia/bia-music-composer
  - src: ./media/qr-talk-en.svg
    label: These slides
    handle: heartmula-talk.netlify.app
---
type: thank-you
eyebrow: Thank you
heading: Let's talk.
muted: I'm open to project ideas and creative collaborations. Questions, too — reach out anytime, I'd love to hear from&nbsp;you.
contact: bianca cheng&nbsp;costanzo <span class="bullet">·</span> get.bianca@gmail.com
qrs:
  - src: ./media/qr-instagram.svg
    label: Instagram
    handle: "@biancachenggg"
  - src: ./media/qr-linkedin.svg
    label: LinkedIn
    handle: in/biancacheng
photo-bg: ./media/ao-pink-wall.jpg
photo-bg-alt: AO in front of a pink wall
photo-bg-style: full
photo-bg-pos: 50% 62%
---
type: center
eyebrow: Appendix
quote: |
  The talk<br />ends&nbsp;<em>here.</em>
muted: What follows is an appendix for anyone reading these slides afterwards — behind the scenes of training HeartMula. It isn't part of the live&nbsp;talk.
---
type: pipeline-step
eyebrow: Appendix · Process · 01 / 04
title: GPU said no.
sub: Hour after hour of CUDA out-of-memory&nbsp;errors.
image: ./media/process-01-cuda-oom.jpg
image-alt: VS Code showing a CUDA out-of-memory error during training
caption: finetune_audio2audio.py · OOM
---
type: pipeline-step
eyebrow: Appendix · Process · 02 / 04
title: Training, finally.
sub: After enough yak-shaving, the model started learning.
image: ./media/process-02-training.jpg
image-alt: GCP Compute Engine logs as the heartmula-train VM loads checkpoint shards
caption: heartmula-train · GCP Compute
---
type: pipeline-step
eyebrow: Appendix · Process · 03 / 04
title: Teaching it Portuguese.
sub: WhisperX transcribing Chuva's lyrics. The model needed to know what it was hearing.
image: ./media/process-03-portuguese.jpg
image-alt: VS Code pair-programming with Claude on the finetune.py annotation pipeline
caption: annotate.py · WhisperX
---
type: stack
eyebrow: Appendix · A delightful side effect
heading: Whisper hallucinated.
lede: |
  I fed it a purely instrumental clip — no vocals at all — and Whisper-large-v3 confidently
  transcribed... lyrics.
audio:
  src: ./media/lyrics_input.wav
  tag: Input
  caption: lyrics_input.wav · purely instrumental
transcript: |
  [Verse]
  E aí E aí Legenda por Fábio Jr Laboratório Fantasma
body: |
  Trained on millions of hours of YouTube, Whisper has seen countless videos that open with
  someone saying <em>"E aí"</em> ("yo, what's up") and end with a subtitle-credit line.
  When there's nothing to transcribe, it falls back on those tropes — a slightly perfect
  glimpse into the model's mental dataset.
---
type: pipeline-step
eyebrow: Appendix · Process · 04 / 04
title: Training complete.
sub: First successful run. Eval losses landed where they were supposed to.
image: ./media/process-04-training-success.jpg
image-alt: Claude pane showing 'Training completed and successful' with the eval epoch summary
caption: v1 · 4 epochs
