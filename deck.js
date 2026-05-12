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
            slides[i].scrollIntoView({ behavior: "smooth", block: "start" });
            setActive(i);
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        // ----- keyboard -----------------------------------------------
        let keyLock = false;
        document.addEventListener("keydown", (e) => {
            if (keyLock) return;
            switch (e.key) {
                case "ArrowRight":
                case "ArrowDown":
                case "PageDown":
                case " ":
                    e.preventDefault(); next(); lockKeys(); break;
                case "ArrowLeft":
                case "ArrowUp":
                case "PageUp":
                    e.preventDefault(); prev(); lockKeys(); break;
                case "Home":
                    e.preventDefault(); goTo(0); lockKeys(); break;
                case "End":
                    e.preventDefault(); goTo(total - 1); lockKeys(); break;
            }
        });

        function lockKeys() {
            keyLock = true;
            setTimeout(() => { keyLock = false; }, 360);
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
            if (best && best.intersectionRatio > 0.5) {
                const idx = slides.indexOf(best.target);
                if (idx !== -1 && idx !== current) setActive(idx);
            }
        }, { root: deck, threshold: [0.25, 0.5, 0.75] });
        slides.forEach((s) => io.observe(s));

        // ----- swipe gestures (touch) ---------------------------------
        let touchStartY = null;
        deck.addEventListener("touchstart", (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
        deck.addEventListener("touchend", (e) => {
            if (touchStartY === null) return;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dy) > 60) { if (dy < 0) next(); else prev(); }
            touchStartY = null;
        }, { passive: true });

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
