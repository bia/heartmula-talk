/* =========================================================
   scrub.js — turns every <audio> in the deck into a scrubbable
   waveform: click or drag to seek, hover to preview the time,
   ←/→ (±5 s, Shift ±15 s), Home/End and Space when focused.
   The bars are drawn from the real audio (decoded lazily when
   the slide comes near); if decoding fails the decorative bars stay.
   ========================================================= */
(function () {
    "use strict";

    const BARS = 140;
    const peakCache = new Map();

    const fmt = (t) => {
        if (!isFinite(t) || t < 0) t = 0;
        const m = Math.floor(t / 60), s = Math.floor(t % 60);
        return `${m}:${String(s).padStart(2, "0")}`;
    };

    // Fetch the whole file once. Returns a blob: URL (always seekable, even on
    // servers without HTTP Range support such as `python3 -m http.server`)
    // plus a promise of the waveform peaks.
    const blobCache = new Map();
    function load(src) {
        if (!blobCache.has(src)) {
            blobCache.set(src, fetch(src).then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.blob();
            }));
        }
        return blobCache.get(src);
    }

    async function peaks(src) {
        if (peakCache.has(src)) return peakCache.get(src);
        const job = (async () => {
            const buf = await (await load(src)).arrayBuffer();
            const Ctx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
            const audio = await new Ctx(1, 1, 44100).decodeAudioData(buf);
            const chans = Array.from({ length: audio.numberOfChannels }, (_, c) => audio.getChannelData(c));
            const step = Math.floor(audio.length / BARS) || 1;
            const out = new Array(BARS).fill(0);
            for (let b = 0; b < BARS; b++) {
                let sum = 0, n = 0;
                const end = Math.min(audio.length, (b + 1) * step);
                for (let i = b * step; i < end; i += 16) {
                    let v = 0;
                    for (const ch of chans) v += Math.abs(ch[i]);
                    sum += (v / chans.length) ** 2; n++;
                }
                out[b] = Math.sqrt(sum / (n || 1));        // RMS per bar
            }
            const max = Math.max(...out) || 1;
            return out.map(v => v / max);
        })();
        peakCache.set(src, job);
        return job;
    }

    function barsSvg(values, fill) {
        const w = 4, gap = 1.5, H = 80;
        const rects = values.map((v, i) => {
            const h = Math.max(3, Math.round(v * (H - 6)));
            return `<rect x="${(i * (w + gap)).toFixed(1)}" y="${(H - h) / 2}" width="${w}" height="${h}" rx="1.5"/>`;
        }).join("");
        return `<svg viewBox="0 0 ${(values.length * (w + gap)).toFixed(1)} ${H}" preserveAspectRatio="none"
                     xmlns="http://www.w3.org/2000/svg"><g fill="${fill}">${rects}</g></svg>`;
    }

    function enhance(audio) {
        if (audio.dataset.scrub) return;
        audio.dataset.scrub = "1";
        const host = audio.closest("figure") || audio.parentElement;

        // Waveform container: reuse the slide's decorative one, or add a compact one.
        let waves = host.querySelector(".player__waves");
        if (!waves) {
            waves = document.createElement("div");
            waves.className = "scrub-waves--compact";
            waves.innerHTML = barsSvg(new Array(BARS).fill(0.15), "currentColor");
            audio.before(waves);
        }
        waves.classList.add("scrub");
        waves.setAttribute("data-scrub", "");
        waves.tabIndex = 0;
        waves.setAttribute("role", "slider");
        waves.setAttribute("aria-label", "Posição da faixa");
        waves.setAttribute("aria-valuemin", "0");

        const played = document.createElement("div");
        played.className = "scrub__played";
        const playedInner = document.createElement("div");
        playedInner.className = "scrub__played-inner";
        played.appendChild(playedInner);
        const head = document.createElement("div");
        head.className = "scrub__head";
        const hover = document.createElement("div");
        hover.className = "scrub__hover";
        const tip = document.createElement("div");
        tip.className = "scrub__tip";
        waves.append(played, hover, head, tip);

        const syncPlayedArt = () => {
            const svg = waves.querySelector(":scope > svg");
            playedInner.innerHTML = svg ? svg.outerHTML : "";
            const s = playedInner.querySelector("svg");
            if (s) {
                s.querySelectorAll("g").forEach(g => { g.removeAttribute("fill"); g.style.fill = "var(--scrub-played, #ffc6ad)"; });
                s.querySelectorAll("defs").forEach(d => d.remove());
            }
        };
        syncPlayedArt();

        // Size the inner copy to the full waveform width so the clip lines up.
        const ro = new ResizeObserver(() => {
            const svg = waves.querySelector(":scope > svg");
            if (!svg) return;
            const r = svg.getBoundingClientRect(), p = waves.getBoundingClientRect();
            Object.assign(playedInner.style, {
                width: `${r.width}px`, height: `${r.height}px`,
                left: `${r.left - p.left}px`, top: `${r.top - p.top}px`,
            });
            played.style.setProperty("--scrub-x0", `${r.left - p.left}px`);
            waves._svgBox = { left: r.left - p.left, width: r.width };
        });
        ro.observe(waves);

        const box = () => waves._svgBox || { left: 0, width: waves.clientWidth };
        const frac = (clientX) => {
            const p = waves.getBoundingClientRect(), b = box();
            return Math.min(1, Math.max(0, (clientX - p.left - b.left) / b.width));
        };
        const render = () => {
            const d = audio.duration, f = d ? audio.currentTime / d : 0, b = box();
            played.style.width = `${b.left + f * b.width}px`;
            head.style.left = `${b.left + f * b.width}px`;
            waves.setAttribute("aria-valuemax", String(Math.round(d || 0)));
            waves.setAttribute("aria-valuenow", String(Math.round(audio.currentTime)));
            waves.setAttribute("aria-valuetext", `${fmt(audio.currentTime)} de ${fmt(d)}`);
        };
        const seekTo = (f) => {
            if (!isFinite(audio.duration)) return;
            audio.currentTime = f * audio.duration;
            render();
        };

        let dragging = false;
        waves.addEventListener("pointerdown", (e) => {
            if (e.button !== 0) return;
            dragging = true;
            waves.setPointerCapture(e.pointerId);
            waves.classList.add("is-dragging");
            seekTo(frac(e.clientX));
            e.preventDefault();
        });
        waves.addEventListener("pointermove", (e) => {
            const f = frac(e.clientX), b = box();
            hover.style.left = `${b.left}px`;
            hover.style.width = `${f * b.width}px`;
            tip.style.left = `${b.left + f * b.width}px`;
            tip.textContent = fmt(f * (audio.duration || 0));
            if (dragging) seekTo(f);
        });
        const end = (e) => {
            if (!dragging) return;
            dragging = false;
            waves.classList.remove("is-dragging");
            try { waves.releasePointerCapture(e.pointerId); } catch (_) {}
        };
        waves.addEventListener("pointerup", end);
        waves.addEventListener("pointercancel", end);

        waves.addEventListener("keydown", (e) => {
            const d = audio.duration;
            let handled = true;
            switch (e.key) {
                case "ArrowRight": audio.currentTime = Math.min(d || 0, audio.currentTime + (e.shiftKey ? 15 : 5)); break;
                case "ArrowLeft": audio.currentTime = Math.max(0, audio.currentTime - (e.shiftKey ? 15 : 5)); break;
                case "Home": audio.currentTime = 0; break;
                case "End": if (d) audio.currentTime = d - 0.1; break;
                case " ": case "Enter": audio.paused ? audio.play() : audio.pause(); break;
                default: handled = false;
            }
            if (handled) { e.preventDefault(); e.stopPropagation(); render(); }
        });

        ["timeupdate", "loadedmetadata", "seeked", "durationchange"].forEach(ev => audio.addEventListener(ev, render));
        audio.addEventListener("play", () => {
            waves.classList.add("is-playing");
            const tick = () => { if (!audio.paused) { render(); requestAnimationFrame(tick); } };
            requestAnimationFrame(tick);
            // Only one track plays at a time.
            document.querySelectorAll("audio").forEach(a => { if (a !== audio && !a.paused) a.pause(); });
        });
        audio.addEventListener("pause", () => waves.classList.remove("is-playing"));
        render();

        // Swap in the real waveform when the slide gets close.
        const io = new IntersectionObserver(async (entries) => {
            if (!entries.some(en => en.isIntersecting)) return;
            io.disconnect();
            const src = audio.getAttribute("src");
            try {
                const blob = await load(src);
                if (audio.paused && audio.currentTime === 0) {
                    audio.src = URL.createObjectURL(blob);
                }
            } catch (err) {
                console.warn("scrub: could not preload", src, err);
                return;
            }
            try {
                const vals = await peaks(src);
                const old = waves.querySelector(":scope > svg");
                const fill = old?.querySelector("g")?.getAttribute("fill") || "currentColor";
                const defs = old?.querySelector("defs")?.outerHTML || "";
                const tmp = document.createElement("div");
                tmp.innerHTML = barsSvg(vals, fill);
                const svg = tmp.firstElementChild;
                if (defs) svg.insertAdjacentHTML("beforeend", defs);
                if (old) old.replaceWith(svg); else waves.prepend(svg);
                syncPlayedArt();
                ro.disconnect(); ro.observe(waves);
                render();
            } catch (err) {
                console.warn("scrub: kept decorative waveform for", audio.src, err);
            }
        }, { rootMargin: "200% 0px" });
        io.observe(host);
    }

    /* ----- videos: keep the native controls seekable ------- */
    // Browsers can only seek a video when the server answers HTTP Range
    // requests. Netlify does; `python3 -m http.server` doesn't, so there the
    // video is fetched once as a blob (always seekable) when its slide nears.
    let rangeSupport;
    function serverHasRanges(src) {
        if (!rangeSupport) {
            rangeSupport = fetch(src, { method: "HEAD", cache: "no-store" })
                .then(r => /bytes/i.test(r.headers.get("accept-ranges") || ""))
                .catch(() => true);
        }
        return rangeSupport;
    }
    function seekableVideo(video) {
        const src = video.getAttribute("src");
        if (!src || src.startsWith("blob:")) return;
        const io = new IntersectionObserver(async (entries) => {
            if (!entries.some(en => en.isIntersecting)) return;
            io.disconnect();
            if (await serverHasRanges(src)) return;
            try {
                const blob = await load(src);
                const t = video.currentTime, wasPlaying = !video.paused;
                video.src = URL.createObjectURL(blob);
                video.addEventListener("loadedmetadata", () => {
                    if (t) video.currentTime = t;
                    if (wasPlaying) video.play().catch(() => {});
                }, { once: true });
            } catch (err) {
                console.warn("scrub: could not preload video", src, err);
            }
        }, { rootMargin: "100% 0px" });
        io.observe(video);
    }

    function init() {
        document.querySelectorAll("#deck audio").forEach(enhance);
        document.querySelectorAll("#deck video").forEach(seekableVideo);
    }
    window.addEventListener("deck:ready", init);
})();
