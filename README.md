# HeartMula talk

## Files

```
slides.md      ← all the content (edit this)
index.html     ← shell — empty deck container
style.css      ← all styling (rarely needs edits)
render.js      ← parses slides.md and generates the deck DOM
deck.js        ← keyboard nav, scrubber, slide tracking
hero.js        ← canvas waveform animation behind the first slide
media/         ← audio, video, images, QR codes
```

## Editing the talk

Everything textual lives in **`slides.md`**. It's a sequence of YAML frontmatter blocks separated by `---`. Edit any field, save the file, reload the browser — the change appears.

Inline markdown works in any text field: `**bold**`, `*italic*`, `` `code` ``. Raw HTML (`<em>`, `<strong>`, `<br/>`) is also accepted.

## Previewing

Browsers block `file://` access to other files, so you need a local server. From this folder:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Edit `slides.md`, reload the page.

## Slide types

| `type:` | What it renders |
|---|---|
| `hero` | First slide — photo + canvas + big title |
| `stack` | Generic vertical stack: eyebrow + heading + lede + body + muted + callout + three-up cards |
| `center` | Center-aligned slide, optionally with a `bigquote` |
| `bullets` | Heading + lede + list (`bullets:` field) |
| `stats` | Big numbers in a 4-up grid; optional `bg-image` |
| `model-stack` | The six-model grid (HeartMuLa + auxiliary) |
| `pipeline-step` | Eyebrow + title + sub + optional aside + image + caption |
| `media-video` | Text + single video player (use `layout: split` for side-by-side) |
| `media-audio` | Text + audio player; optional `bg-image`; `style: raw` for the day-zero look |
| `media-video-pair` | Two videos side-by-side |
| `lesson` | A Lesson slide with optional inline audio (`audio:`) or pair (`audio-pair:`); `theme: ao` swaps to the AO blue palette + Cormorant serif |
| `open-source` | The github URL slide with the SVG one-line treatment |
| `thank-you` | Final slide with contact line + QR cards |

## Adding a new slide

Insert a new YAML block anywhere in `slides.md`:

```yaml
---
type: center
eyebrow: A new beat
quote: |
  Something<br/>worth <em>saying.</em>
muted: Optional fine print.
```

Available fields per type are documented inline in `render.js` (the `RENDERERS` object).

## Reordering slides

Just cut and paste the block. Slide numbers in the HUD and scrubber tooltips update automatically.

## License

Unless otherwise noted, all non-music source code and project files in this repository are licensed under the Apache License 2.0. See `LICENSE`.

All music in this repository (including compositions, recordings, and audio exports in `media/`) is owned by Bianca and is **not** licensed under Apache 2.0. See `MUSIC-LICENSE.txt`.
