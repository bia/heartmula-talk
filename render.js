/* =========================================================
   render.js — Parses slides.md and renders the deck.
   Each slide is a YAML frontmatter block separated by ---.
   ========================================================= */

(function () {
    "use strict";

    /* ----- minimal YAML parser (handles the slides.md schema) -- */
    // Supports: flat keys, nested objects, arrays of objects,
    // multi-line strings via `|` and `>`, quoted strings.
    function parseYaml(text) {
        const lines = text.split("\n");
        const root = {};
        const stack = [{ obj: root, indent: -1 }];

        let i = 0;
        while (i < lines.length) {
            const raw = lines[i];
            const trimmed = raw.replace(/\s+$/, "");
            if (!trimmed.trim() || trimmed.trim().startsWith("#")) { i++; continue; }
            const indent = raw.length - raw.trimStart().length;

            // Pop stack until parent indent < current indent
            while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
                stack.pop();
            }
            const parent = stack[stack.length - 1].obj;

            const line = trimmed.trim();

            // Array item starting with "- "
            if (line.startsWith("- ")) {
                const item = line.slice(2);
                let parentArr;
                if (Array.isArray(parent)) {
                    parentArr = parent;
                } else if (stack.length > 1 && Array.isArray(stack[stack.length - 1].obj)) {
                    parentArr = stack[stack.length - 1].obj;
                } else {
                    // Convert the most recent key into an array
                    parentArr = stack[stack.length - 1].pendingArr;
                    if (!parentArr) { i++; continue; }
                }
                // If item is a kv pair, item becomes an object
                if (item.includes(":") && !item.startsWith('"') && !item.startsWith("'")) {
                    const idx = item.indexOf(":");
                    const key = item.slice(0, idx).trim();
                    const value = parseValue(item.slice(idx + 1).trim());
                    const obj = {};
                    if (value !== undefined && value !== "") obj[key] = value;
                    else obj[key] = null;
                    parentArr.push(obj);
                    stack.push({ obj: obj, indent });
                } else {
                    parentArr.push(parseValue(item));
                }
                i++;
                continue;
            }

            // Key-value at this indent
            const colonIdx = line.indexOf(":");
            if (colonIdx === -1) { i++; continue; }
            const key = line.slice(0, colonIdx).trim();
            let after = line.slice(colonIdx + 1).trim();

            if (after === "|" || after === ">") {
                // Multi-line block string
                const block = [];
                i++;
                let blockIndent = -1;
                while (i < lines.length) {
                    const blRaw = lines[i];
                    const blStripped = blRaw.replace(/\s+$/, "");
                    if (!blStripped.length) { block.push(""); i++; continue; }
                    const blIndent = blRaw.length - blRaw.trimStart().length;
                    if (blIndent <= indent) break;
                    if (blockIndent < 0) blockIndent = blIndent;
                    block.push(blRaw.slice(blockIndent));
                    i++;
                }
                // strip trailing empties
                while (block.length && block[block.length - 1] === "") block.pop();
                const joined = after === "|" ? block.join("\n") : block.join(" ").replace(/\s+/g, " ").trim();
                if (Array.isArray(parent)) parent.push({ [key]: joined });
                else parent[key] = joined;
                continue;
            }

            if (after === "") {
                // Either an object or array follows
                const container = {};
                if (Array.isArray(parent)) {
                    const obj = {};
                    obj[key] = container;
                    parent.push(obj);
                    stack.push({ obj: container, indent, pendingArr: null });
                } else {
                    parent[key] = container;
                    stack.push({ obj: container, indent, pendingArr: container });
                }
                // Peek next non-empty line: if it starts with "- ", convert to array
                let j = i + 1;
                while (j < lines.length && !lines[j].trim()) j++;
                if (j < lines.length) {
                    const peekRaw = lines[j];
                    const peekIndent = peekRaw.length - peekRaw.trimStart().length;
                    const peekLine = peekRaw.trim();
                    if (peekIndent > indent && peekLine.startsWith("- ")) {
                        // Make this key hold an array
                        const arr = [];
                        if (Array.isArray(parent)) {
                            // shouldn't happen here
                        } else {
                            parent[key] = arr;
                        }
                        // Replace top of stack
                        stack[stack.length - 1] = { obj: arr, indent, pendingArr: arr };
                    }
                }
                i++;
                continue;
            }

            // Inline value
            const value = parseValue(after);
            if (Array.isArray(parent)) {
                parent.push({ [key]: value });
            } else {
                parent[key] = value;
            }
            i++;
        }

        return root;
    }

    function parseValue(s) {
        if (s === "" || s === "null" || s === "~") return null;
        if (s === "true") return true;
        if (s === "false") return false;
        if (/^-?\d+$/.test(s)) return parseInt(s, 10);
        if (/^-?\d*\.\d+$/.test(s)) return parseFloat(s);
        if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
            return s.slice(1, -1);
        }
        return s;
    }

    /* ----- parse slides.md ---------------------------------- */
    function parseSlidesMd(text) {
        // Split into frontmatter blocks: --- ... ---
        // Format: each slide is bounded by --- lines. First block before first --- is ignored (could be header).
        const blocks = [];
        const lines = text.split("\n");
        let current = null;
        for (const line of lines) {
            if (line.trim() === "---") {
                if (current !== null) {
                    if (current.length) blocks.push(current.join("\n"));
                    current = [];
                } else {
                    current = [];
                }
                continue;
            }
            if (current === null) continue;
            current.push(line);
        }
        if (current && current.length) blocks.push(current.join("\n"));
        return blocks.map(parseYaml).filter(s => s && s.type);
    }

    /* ----- inline markdown → HTML --------------------------- */
    function md(text) {
        if (text == null) return "";
        let s = String(text);
        // Code spans (do first, to protect from other replacements)
        s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Bold (**text**)
        s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        // Italic (*text*) — careful, must not match ** already replaced
        s = s.replace(/(^|[^*])\*([^*\n]+)\*([^*]|$)/g, "$1<em>$2</em>$3");
        // Links [text](url)
        s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        return s;
    }

    /* ----- paragraph splitter for body fields -------------- */
    function paras(text) {
        if (!text) return "";
        return text
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(Boolean)
            .map(p => `<p>${flow(p)}</p>`)
            .join("\n");
    }

    /* ----- waveform SVG presets ----------------------------- */
    const WAVE_PATTERNS = {
        // Decaying song-like waveform that fades at the end
        song: (() => {
            const bars = [];
            const cnt = 100;
            for (let i = 0; i < cnt; i++) {
                const x = i * 6;
                const envelope = 1 - Math.pow(i / cnt, 1.8);
                const h = Math.max(4, Math.round((10 + Math.random() * 60) * envelope));
                const y = (80 - h) / 2;
                bars.push(`<rect x="${x}" y="${y}" width="3" height="${h}" rx="1.5"/>`);
            }
            return bars.join("");
        })(),
        // Dense uniform noise
        noise: (() => {
            const bars = [];
            const cnt = 120;
            for (let i = 0; i < cnt; i++) {
                const x = i * 5;
                const h = 8 + Math.round(Math.random() * 56);
                const y = (80 - h) / 2;
                bars.push(`<rect x="${x}" y="${y}" width="3" height="${h}" rx="1.5"/>`);
            }
            return bars.join("");
        })(),
        // Soft decaying
        soft: (() => {
            const bars = [];
            const cnt = 70;
            for (let i = 0; i < cnt; i++) {
                const x = i * 6;
                const env = 1 - Math.pow(i / cnt, 1.5);
                const h = Math.max(4, Math.round((10 + Math.random() * 50) * env));
                const y = (80 - h) / 2;
                bars.push(`<rect x="${x}" y="${y}" width="3" height="${h}" rx="1.5"/>`);
            }
            return bars.join("");
        })(),
        // Strong dynamic
        dynamic: (() => {
            const bars = [];
            const cnt = 70;
            for (let i = 0; i < cnt; i++) {
                const x = i * 6;
                const env = 1 - Math.pow(i / cnt, 2.2);
                const h = Math.max(4, Math.round((6 + Math.random() * 68) * env));
                const y = (80 - h) / 2;
                bars.push(`<rect x="${x}" y="${y}" width="3" height="${h}" rx="1.5"/>`);
            }
            return bars.join("");
        })(),
    };

    let gradId = 0;
    function waveSvg(pattern, gradient) {
        const gid = `wg${++gradId}`;
        const [c1, c2] = gradient;
        const bars = WAVE_PATTERNS[pattern] || WAVE_PATTERNS.song;
        return `<svg viewBox="0 0 600 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <g fill="url(#${gid})">${bars}</g>
            <defs>
                <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="${c1}" stop-opacity="0.85"/>
                    <stop offset="1" stop-color="${c2}" stop-opacity="0.40"/>
                </linearGradient>
            </defs>
        </svg>`;
    }

    const GRADIENTS = {
        peach: ["#ffc6ad", "#ffc6ad"],
        mixed: ["#ffc6ad", "#c8a8e9"],
        lavender: ["#d8baf2", "#a89eb5"],
        "ao-soft": ["#7a9ec8", "#7a9ec8"],
        ao: ["#3d6aff", "#1a4dff"],
    };

    /* ----- helpers ------------------------------------------ */
    function attr(name, val) {
        return val ? `${name}="${val}"` : "";
    }
    function classes(...c) {
        return c.filter(Boolean).join(" ");
    }
    function eyebrow(s, klass) {
        if (!s) return "";
        return `<div class="eyebrow${klass ? " " + klass : ""}">${md(s)}</div>`;
    }
    // Collapse internal newlines into spaces; preserve explicit <br/> markup
    function flow(s) {
        if (s == null) return "";
        return md(String(s).replace(/\n/g, " ").replace(/\s+/g, " ").trim());
    }
    // Multi-paragraph rendering (blank line separates paragraphs, single newlines collapse)
    function multi(s, tag = "p", klass = "") {
        if (!s) return "";
        return s.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map(p =>
            `<${tag}${klass ? ` class="${klass}"` : ""}>${flow(p)}</${tag}>`
        ).join("\n");
    }
    function muted(s) {
        if (!s) return "";
        // Preserve paragraph breaks but join within a paragraph
        const html = multi(s, "p", "muted");
        return html;
    }
    function lede(s) {
        if (!s) return "";
        return `<p class="lede">${flow(s)}</p>`;
    }
    function callout(s) {
        if (!s) return "";
        return `<p class="callout">${flow(s)}</p>`;
    }
    function aside(s) {
        if (!s) return "";
        return `<p class="process-slide__aside">${flow(s)}</p>`;
    }

    /* ----- slide renderers ---------------------------------- */
    const RENDERERS = {

        hero(s) {
            return `<section class="hero">
                ${s.photo ? `<img class="hero__photo" src="${s.photo}" alt="${s["photo-alt"] || ""}" />` : ""}
                <div class="hero__veil" aria-hidden="true"></div>
                <canvas id="heroCanvas"></canvas>
                <div class="hero__inner">
                    ${eyebrow(s.eyebrow)}
                    <h1 class="hero__title">${s.title || ""}</h1>
                    ${(s["meta-left"] || s["meta-right"]) ? `<div class="hero__meta">
                        <span>${s["meta-left"] || ""}</span>
                        <span class="hero__dot"></span>
                        <span>${s["meta-right"] || ""}</span>
                    </div>` : ""}
                </div>
            </section>`;
        },

        stack(s) {
            const cards = (s.cards || []).map(c => `
                <div class="card">
                    <div class="card__num">${c.num || ""}</div>
                    <h3>${md(c.title || "")}</h3>
                    <p>${md(c.body || "")}</p>
                </div>`).join("");
            const headingCls = s["heading-style"] === "display"
                ? "display"
                : s["heading-style"] === "display-sm"
                    ? "display-sm"
                    : "";
            const audioBlock = s.audio ? `
                <figure class="lesson-audio">
                    <audio controls preload="metadata" src="${s.audio.src}"></audio>
                    <figcaption class="lesson-audio__caption">
                        ${s.audio.tag ? `<span class="lesson-audio__tag">${md(s.audio.tag)}</span>` : ""}
                        ${s.audio.caption ? `<span>${md(s.audio.caption)}</span>` : ""}
                    </figcaption>
                </figure>` : "";
            const transcriptBlock = s.transcript ? `
                <pre class="transcript-block">${String(s.transcript).trim()}</pre>` : "";
            return `<section class="${s["section-class"] || ""}">
                ${s.photo ? `<img class="ao-photo" src="${s.photo}" alt="${s["photo-alt"] || ""}" />` : ""}
                ${s.photo ? `<div class="ao-veil" aria-hidden="true"></div>` : ""}
                <div class="slide stack">
                    ${eyebrow(s.eyebrow)}
                    ${s.heading ? `<h2 class="${headingCls}">${md(s.heading)}</h2>` : ""}
                    ${lede(s.lede)}
                    ${paras(s.body)}
                    ${aside(s.aside)}
                    ${audioBlock}
                    ${transcriptBlock}
                    ${muted(s.muted)}
                    ${callout(s.callout)}
                    ${cards ? `<div class="three-up">${cards}</div>` : ""}
                </div>
            </section>`;
        },

        "open-source"(s) {
            // Renders the github URL with the existing oss styling (peach→lavender gradient on the repo path)
            const url = s.url || "";
            const m = url.match(/^([^\/]+\/[^\/]+\/)(.+)$/);
            const scheme = m ? m[1] : "github.com/";
            const path = m ? m[2] : url;
            return `<section class="oss-section">
                <div class="slide center oss">
                    ${eyebrow(s.eyebrow)}
                    ${s.pretitle ? `<p class="oss__pretitle">${flow(s.pretitle)}</p>` : ""}
                    <div class="oss__url">
                        <svg class="oss__url-svg" viewBox="0 0 2000 130" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-label="${url}">
                            <defs>
                                <linearGradient id="ossGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0" stop-color="#ffb89c"/>
                                    <stop offset="1" stop-color="#c8a8e9"/>
                                </linearGradient>
                            </defs>
                            <text x="1000" y="98" text-anchor="middle" textLength="1920" lengthAdjust="spacingAndGlyphs"
                                  font-family="JetBrains Mono, ui-monospace, monospace" font-size="100" font-weight="500"
                                  letter-spacing="-1">
                                <tspan fill="#8a8194">${scheme}</tspan><tspan fill="url(#ossGrad)" font-weight="700">${path}</tspan>
                            </text>
                        </svg>
                    </div>
                    ${s.caption ? `<p class="oss__caption">${flow(s.caption)}</p>` : ""}
                </div>
            </section>`;
        },

        center(s) {
            return `<section class="${s["section-class"] || ""}">
                <div class="slide center">
                    ${eyebrow(s.eyebrow, s["eyebrow-class"])}
                    ${s.quote ? `<p class="bigquote${s["quote-class"] ? " " + s["quote-class"] : ""}">${s.quote}</p>` : ""}
                    ${s.heading ? `<h2 class="${s["heading-style"] === "display" ? "display" : ""}">${md(s.heading)}</h2>` : ""}
                    ${muted(s.muted)}
                    ${s.contact ? `<p class="contact">${s.contact}</p>` : ""}
                </div>
            </section>`;
        },

        bullets(s) {
            const items = (s.bullets || []).map(b => `<li>${md(b)}</li>`).join("");
            return `<section class="${s["section-class"] || ""}">
                <div class="slide">
                    ${eyebrow(s.eyebrow)}
                    ${s.heading ? `<h2 class="${s["heading-style"] === "display-sm" ? "display-sm" : ""}">${md(s.heading)}</h2>` : ""}
                    ${lede(s.lede)}
                    ${paras(s["body-prefix"])}
                    ${items ? `<ul class="clean ${s["bullets-class"] || ""}">${items}</ul>` : ""}
                    ${muted(s.muted)}
                </div>
            </section>`;
        },

        stats(s) {
            const tiles = (s.stats || []).map(t => `
                <div class="stat">
                    <div class="stat__num">${t.num}</div>
                    <div class="stat__label">${t.label}</div>
                </div>`).join("");
            const sectionClass = s["section-class"] || (s["bg-image"] ? "corpus-section" : "");
            return `<section class="${sectionClass}">
                ${s["bg-image"] ? `<img class="corpus-bg" src="${s["bg-image"]}" alt="${s["bg-image-alt"] || ""}" />` : ""}
                ${s["bg-image"] ? `<div class="corpus-veil" aria-hidden="true"></div>` : ""}
                <div class="slide">
                    ${eyebrow(s.eyebrow)}
                    ${s.heading ? `<h2>${md(s.heading)}</h2>` : ""}
                    <div class="stats">${tiles}</div>
                    ${muted(s.muted)}
                </div>
            </section>`;
        },

        "pipeline-step"(s) {
            return `<section class="process-section">
                <div class="slide process-slide">
                    <div class="process-slide__head">
                        ${eyebrow(s.eyebrow, s["eyebrow-class"])}
                        ${s.title ? `<h2 class="process-slide__title">${md(s.title)}</h2>` : ""}
                        ${s.sub ? `<p class="process-slide__sub">${md(s.sub)}</p>` : ""}
                        ${aside(s.aside)}
                    </div>
                    ${s.image ? `<figure class="process-frame">
                        <img class="process-image" src="${s.image}" alt="${s["image-alt"] || ""}" />
                        ${s.caption ? `<figcaption class="process-caption"><span class="process-caption__file">${md(s.caption)}</span></figcaption>` : ""}
                    </figure>` : ""}
                </div>
            </section>`;
        },

        "media-video"(s) {
            const split = s.layout === "split";
            return `<section class="media-section">
                <div class="slide media-slide${split ? " media-slide--split" : ""}">
                    <div class="media-slide__head">
                        ${eyebrow(s.eyebrow)}
                        <h2 class="media-slide__title">${md(s.title || "")}</h2>
                        ${s.sub ? `<p class="media-slide__sub${s["sub-tight"] ? " media-slide__sub--tight" : ""}">${md(s.sub)}</p>` : ""}
                    </div>
                    <figure class="player player--video${split ? " player--video-large" : ""}">
                        <video class="player__video" controls preload="metadata" playsinline src="${s.video}"></video>
                        ${s["caption-tag"] || s["caption-text"] ? `<figcaption class="player__caption">
                            ${s["caption-tag"] ? `<span class="player__tag">${md(s["caption-tag"])}</span>` : ""}
                            ${s["caption-text"] ? `<span>${md(s["caption-text"])}</span>` : ""}
                        </figcaption>` : ""}
                    </figure>
                </div>
            </section>`;
        },

        "media-audio"(s) {
            const rawStyle = s.style === "raw";
            const sectionClasses = ["media-section"];
            if (s["bg-image"]) sectionClasses.push("media-section--audio");
            if (rawStyle) sectionClasses.push("media-section--raw");

            const wavePattern = s["wave-style"] || (rawStyle ? "noise" : "song");
            const waveGradient = s["wave-gradient"] || (rawStyle ? "lavender" : "mixed");
            const tagClass = s["tag-class"] ? ` player__tag--${s["tag-class"]}` : "";

            return `<section class="${sectionClasses.join(" ")}">
                ${s["bg-image"] ? `<img class="audio-bg" src="${s["bg-image"]}" alt="${s["bg-image-alt"] || ""}" />` : ""}
                ${s["bg-image"] ? `<div class="audio-veil" aria-hidden="true"></div>` : ""}
                ${rawStyle ? `<div class="raw-bg" aria-hidden="true"></div>` : ""}
                <div class="slide media-slide">
                    <div class="media-slide__head">
                        ${eyebrow(s.eyebrow, rawStyle ? "eyebrow--cool" : null)}
                        <h2 class="media-slide__title">${md(s.title || "")}</h2>
                        ${s.sub ? `<p class="media-slide__sub${s["sub-tight"] ? " media-slide__sub--tight" : ""}">${md(s.sub)}</p>` : ""}
                    </div>
                    <figure class="player player--audio${rawStyle ? " player--raw" : ""}">
                        <div class="player__waves" aria-hidden="true">${waveSvg(wavePattern, GRADIENTS[waveGradient])}</div>
                        <audio class="player__audio" controls preload="metadata" src="${s.audio}"></audio>
                        ${(s["caption-tag"] || s["caption-text"]) ? `<figcaption class="player__caption">
                            ${s["caption-tag"] ? `<span class="player__tag${tagClass}">${md(s["caption-tag"])}</span>` : ""}
                            ${s["caption-text"] ? `<span>${md(s["caption-text"])}</span>` : ""}
                        </figcaption>` : ""}
                    </figure>
                </div>
            </section>`;
        },

        "media-video-pair"(s) {
            const videos = (s.videos || []).map(v => `
                <figure class="player player--video">
                    <video class="player__video player__video--portrait" controls preload="metadata" playsinline src="${v.src}"></video>
                    <figcaption class="player__caption">
                        ${v.tag ? `<span class="player__tag${v["tag-class"] ? " player__tag--" + v["tag-class"] : ""}">${md(v.tag)}</span>` : ""}
                        ${v.caption ? `<span>${md(v.caption)}</span>` : ""}
                    </figcaption>
                </figure>`).join("");
            const split = s.layout === "split";
            return `<section class="media-section">
                <div class="slide media-slide${split ? " media-slide--split" : ""}">
                    <div class="media-slide__head">
                        ${eyebrow(s.eyebrow)}
                        <h2 class="media-slide__title">${md(s.title || "")}</h2>
                        ${s.sub ? `<p class="media-slide__sub${s["sub-tight"] ? " media-slide__sub--tight" : ""}">${md(s.sub)}</p>` : ""}
                    </div>
                    <div class="video-pair">${videos}</div>
                </div>
            </section>`;
        },

        lesson(s) {
            const sectionClass = classes(
                s.theme === "ao" ? "section--ao" : "",
                s.theme === "ao" && s.photo ? "section--ao--photo" : ""
            );
            const audioBlock = (audio) => audio ? `
                <figure class="lesson-audio">
                    <audio controls preload="metadata" src="${audio.src}"></audio>
                    <figcaption class="lesson-audio__caption">
                        ${audio.tag ? `<span class="lesson-audio__tag">${md(audio.tag)}</span>` : ""}
                        ${audio.caption ? `<span>${md(audio.caption)}</span>` : ""}
                    </figcaption>
                </figure>` : "";
            const audioPair = (s["audio-pair"] || []).length ? `
                <div class="lesson-audio-pair">
                    ${s["audio-pair"].map(a => audioBlock(a)).join("")}
                </div>` : "";
            return `<section class="${sectionClass}">
                ${s.theme === "ao" && s.photo ? `<img class="ao-photo" src="${s.photo}" alt="${s["photo-alt"] || ""}" />` : ""}
                ${s.theme === "ao" && s.photo ? `<div class="ao-veil" aria-hidden="true"></div>` : ""}
                <div class="slide">
                    ${eyebrow(s.eyebrow)}
                    <h2>${md(s.heading || "")}</h2>
                    ${lede(s.lede)}
                    ${paras(s.body)}
                    ${audioBlock(s.audio)}
                    ${audioPair}
                    ${callout(s.callout)}
                </div>
            </section>`;
        },

        "model-stack"(s) {
            const groups = (s.groups || []).map(g => `
                <div class="model-group">
                    ${g.label ? `<p class="model-group__label">${md(g.label)}</p>` : ""}
                    <div class="model-row">
                        ${(g.cards || []).map(c => `
                            <div class="model-card${c.featured ? " model-card--featured" : ""}">
                                <div class="model-card__num">${c.num}</div>
                                <h3 class="model-card__name">${md(c.name || "")}</h3>
                                <p class="model-card__role">${md(c.role || "")}</p>
                                <p class="model-card__detail">${md(c.detail || "")}</p>
                                <div class="model-card__status${c.featured ? " model-card__status--featured" : ""}">${md(c.status || "")}</div>
                            </div>`).join("")}
                    </div>
                </div>`).join("");
            return `<section>
                <div class="slide">
                    ${eyebrow(s.eyebrow)}
                    ${s.heading ? `<h2>${md(s.heading)}</h2>` : ""}
                    <div class="model-grid">${groups}</div>
                </div>
            </section>`;
        },

        "thank-you"(s) {
            const qrs = (s.qrs || []).map(q => `
                <div class="qr-card">
                    <img class="qr-card__img" src="${q.src}" alt="${q.label} QR — ${q.handle}" />
                    <div class="qr-card__label">${md(q.label || "")}</div>
                    <div class="qr-card__handle">${md(q.handle || "")}</div>
                </div>`).join("");
            return `<section>
                <div class="slide center">
                    ${eyebrow(s.eyebrow)}
                    ${s.heading ? `<h2 class="display">${md(s.heading)}</h2>` : ""}
                    ${muted(s.muted)}
                    ${s.contact ? `<p class="contact">${s.contact}</p>` : ""}
                    ${qrs ? `<div class="qr-row">${qrs}</div>` : ""}
                </div>
            </section>`;
        }
    };

    /* ----- public ------------------------------------------- */
    async function loadAndRender() {
        const deck = document.getElementById("deck");
        if (!deck) return;
        try {
            const res = await fetch("./slides.md");
            if (!res.ok) throw new Error("Failed to load slides.md: " + res.status);
            const text = await res.text();
            const slides = parseSlidesMd(text);
            deck.innerHTML = slides.map(s => {
                const renderer = RENDERERS[s.type];
                if (!renderer) {
                    console.warn("Unknown slide type:", s.type, s);
                    return `<section><div class="slide"><h2>Unknown slide type: ${s.type}</h2></div></section>`;
                }
                return renderer(s);
            }).join("\n");
            // Notify other modules that the deck is ready
            window.dispatchEvent(new CustomEvent("deck:ready"));
        } catch (err) {
            console.error("Render error:", err);
            deck.innerHTML = `<section><div class="slide center"><h2>Couldn't load slides.md</h2><p class="muted">${err.message}<br/>Run a local server: <code>python3 -m http.server</code></p></div></section>`;
            window.dispatchEvent(new CustomEvent("deck:ready"));
        }
    }

    window.HeartMulaRender = { loadAndRender };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadAndRender);
    } else {
        loadAndRender();
    }
})();
