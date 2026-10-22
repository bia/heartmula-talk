/* =========================================================
   Deck navigation — keyboard + buttons + counter + scrubber
   ========================================================= */

(function () {
    "use strict";

    function init() {
        const deck = document.getElementById("deck");
        if (!deck) return;

        const slides = Array.from(deck.querySelectorAll("section"));
        const counter = document.getElementById("slideCounter");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const scrubber = document.getElementById("scrubber");

        const total = slides.length;
        let current = 0;
        let navUntil = 0;

        // ----- build scrubber ----------------------------------------
        const scrubItems = [];
        if (scrubber) {
            scrubber.innerHTML = "";
            slides.forEach((slide, i) => {
                let title =
                    slide.querySelector("h1, h2")?.textContent.trim() ||
                    slide.querySelector(".eyebrow")?.textContent.trim() ||
                    `Slide ${i + 1}`;
                title = title.replace(/\s+/g, " ").slice(0, 80);

                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "hm-scrubber__item";
                btn.dataset.slide = i;
                btn.setAttribute("aria-label", `${i + 1}. ${title}`);

                const label = document.createElement("span");
                label.className = "hm-scrubber__label";
                label.textContent = `${String(i + 1).padStart(2, "0")} · ${title}`;
                btn.appendChild(label);

                btn.addEventListener("click", () => goTo(i));
                scrubber.appendChild(btn);
                scrubItems.push(btn);
            });
        }

        function pad(n) { return String(n).padStart(2, "0"); }

        function setActive(i) {
            i = Math.max(0, Math.min(total - 1, i));
            current = i;
            slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
            scrubItems.forEach((btn, idx) => btn.classList.toggle("is-active", idx === i));
            if (counter) counter.textContent = `${pad(i + 1)} / ${pad(total)}`;
        }

        function goTo(i) {
            i = Math.max(0, Math.min(total - 1, i));
            if (i === current && Math.abs(slides[i].getBoundingClientRect().top) < 2) return;
            navUntil = Date.now() + 900;   // ignore scroll-position updates while gliding
            slides[i].scrollIntoView({ behavior: "smooth", block: "start" });
            setActive(i);
            stopMedia(i);
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        // ----- keyboard + presentation clickers -------------------------
        // Clickers (Logitech R400/R500/Spotlight, Kensington, Targus…) send
        //   ›  PageDown / ArrowRight     ‹  PageUp / ArrowLeft
        //   ▶  F5 / Shift+F5 / Esc ("start slideshow", alternates)
        //   ■  B or . ("blank screen")
        // Next/previous always work, even if a player was clicked with the mouse.
        // ▶ plays/pauses the music or video on the current slide.
        // ■ blacks the screen out and back.  F toggles full screen.
        const CLICKER_KEYS = ["PageDown", "PageUp", "F5", "Escape"];
        document.addEventListener("keydown", (e) => {
            if (e.repeat) { if (["PageDown","PageUp","ArrowRight","ArrowLeft","ArrowDown","ArrowUp"," "].includes(e.key)) e.preventDefault(); return; }
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const inControl = e.target.closest && e.target.closest("audio, video, input, textarea, [data-scrub]");
            if (inControl && !CLICKER_KEYS.includes(e.key)) return;
            if (inControl && e.target.blur) e.target.blur();
            switch (e.key) {
                case "PageDown":
                case "ArrowRight":
                case "ArrowDown":
                case " ":
                    e.preventDefault(); if (blanked) unblank(); else next(); break;
                case "PageUp":
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault(); if (blanked) unblank(); else prev(); break;
                case "Home":
                    e.preventDefault(); goTo(0); break;
                case "End":
                    e.preventDefault(); goTo(total - 1); break;
                case "F5":
                case "Escape":
                    e.preventDefault(); togglePlay(); break;
                case "b": case "B": case ".": case "w": case "W":
                    e.preventDefault(); blanked ? unblank() : blank(); break;
                case "f": case "F":
                    e.preventDefault(); toggleFullscreen(); break;
            }
        });

        // ▶ on a slide with several players works through them in order:
        //   press → play the first · press → pause it · press → resume it…
        //   once one has finished, the next press starts the next player.
        // Starting one player pauses any other on the slide.
        function mediaOf(i) { return slides[i] ? Array.from(slides[i].querySelectorAll("audio, video:not(.slide-photo--video)")) : []; }
        const lastPlayed = new Map();   // slide index → index of its last player used
        function togglePlay() {
            const media = mediaOf(current);
            if (!media.length) return;
            const playing = media.findIndex(m => !m.paused);
            if (playing !== -1) { media[playing].pause(); lastPlayed.set(current, playing); return; }
            let k = lastPlayed.has(current) ? lastPlayed.get(current) : 0;
            if (media[k].ended) k = (k + 1) % media.length;
            media.forEach((m, j) => { if (j !== k && !m.paused) m.pause(); });
            if (media[k].ended) media[k].currentTime = 0;
            media[k].play().catch(() => {});
            lastPlayed.set(current, k);
        }
        // Moving to another slide stops what was playing on the previous one.
        function stopMedia(except) {
            slides.forEach((s, i) => { if (i !== except) mediaOf(i).forEach(m => { if (!m.paused) m.pause(); }); });
        }

        // Blank screen (clicker "B"/"." button).
        let blanked = false;
        const blankEl = document.createElement("div");
        blankEl.className = "hm-blank";
        blankEl.setAttribute("aria-hidden", "true");
        blankEl.style.cssText = "position:fixed;inset:0;background:#000;z-index:9999;opacity:0;pointer-events:none;transition:opacity .25s ease";
        document.body.appendChild(blankEl);
        function blank() { blanked = true; blankEl.style.opacity = "1"; blankEl.style.pointerEvents = "auto"; }
        function unblank() { blanked = false; blankEl.style.opacity = "0"; blankEl.style.pointerEvents = "none"; }
        blankEl.addEventListener("click", unblank);

        function toggleFullscreen() {
            const d = document;
            if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
            else { const r = d.documentElement; (r.requestFullscreen || r.webkitRequestFullscreen).call(r); }
        }

        // ----- buttons ------------------------------------------------
        if (prevBtn) prevBtn.addEventListener("click", prev);
        if (nextBtn) nextBtn.addEventListener("click", next);

        // ----- intersection observer ----------------------------------
        const io = new IntersectionObserver((entries) => {
            let best = null;
            for (const entry of entries) {
                if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
            }
            if (Date.now() < navUntil) return;
            if (best && best.intersectionRatio > 0.5) {
                const idx = slides.indexOf(best.target);
                if (idx !== -1 && idx !== current) setActive(idx);
            }
        }, { root: deck, threshold: [0.25, 0.5, 0.75] });
        slides.forEach((s) => io.observe(s));

        // ----- touch ----------------------------------------------------
        // Native scrolling (with scroll-snap) handles touch. A JS swipe-to-jump
        // used to fight it and made slides taller than the screen unreadable.

        // ----- init ---------------------------------------------------
        setActive(0);
        deck.focus();

        // ----- bootstrap hero canvas if HeroAnimation is loaded -------
        const heroCanvas = document.getElementById("heroCanvas");
        if (heroCanvas && window.HeroAnimation) {
            window.HeroAnimation.init(heroCanvas);
        }
    }

    // Wait for render.js to populate the deck
    window.addEventListener("deck:ready", init);
})();
