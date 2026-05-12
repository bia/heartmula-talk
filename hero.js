/* =========================================================
   Hero animation — flowing audio waveforms
   Inspired by spectrograms, drawn live as overlapping sines.
   ========================================================= */

function startHeroAnimation() {
    "use strict";

    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let t = 0;

    // wave layers — each has its own frequency, amplitude, and color
    const waves = [
        { amp: 0.18, freq: 1.2, speed: 0.0035, phase: 0,         color: [255, 184, 156, 0.55] }, // peach
        { amp: 0.22, freq: 0.8, speed: 0.0022, phase: Math.PI/3, color: [200, 168, 233, 0.40] }, // lavender
        { amp: 0.14, freq: 1.6, speed: 0.0042, phase: Math.PI/2, color: [255, 123, 123, 0.35] }, // coral
        { amp: 0.30, freq: 0.5, speed: 0.0015, phase: Math.PI,   color: [255, 184, 156, 0.18] }, // peach soft
        { amp: 0.08, freq: 2.4, speed: 0.0055, phase: 0.7,       color: [200, 168, 233, 0.22] }  // lavender hi
    ];

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawWave(wave, time) {
        const points = 240;
        const cy = h * 0.55;
        const amp = h * wave.amp;

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
            const x = (i / points) * w;
            const u = i / points;
            // envelope: fades at the edges
            const env = Math.sin(u * Math.PI);
            const y = cy + Math.sin(u * Math.PI * 2 * wave.freq + time * wave.speed * 1000 + wave.phase) * amp * env;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        const [r, g, b, a] = wave.color;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
    }

    // tiny floating dots — like dust in a spotlight
    const particles = [];
    for (let i = 0; i < 24; i++) {
        particles.push({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.4 + 0.4,
            vy: (Math.random() - 0.5) * 0.00012,
            vx: (Math.random() - 0.5) * 0.00008,
            o: Math.random() * 0.6 + 0.2
        });
    }

    function drawParticles(time) {
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
            if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
            const px = p.x * w;
            const py = p.y * h;
            const flicker = 0.7 + Math.sin(time * 0.001 + p.x * 10) * 0.3;
            ctx.beginPath();
            ctx.arc(px, py, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 184, 156, ${p.o * flicker * 0.5})`;
            ctx.fill();
        }
    }

    function frame() {
        t = performance.now();
        ctx.clearRect(0, 0, w, h);

        // soft glow center
        const grad = ctx.createRadialGradient(w * 0.3, h * 0.55, 0, w * 0.3, h * 0.55, w * 0.6);
        grad.addColorStop(0, "rgba(255, 184, 156, 0.06)");
        grad.addColorStop(1, "rgba(255, 184, 156, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        for (const wave of waves) {
            drawWave(wave, t);
        }

        drawParticles(t);

        requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(frame);
}

window.HeroAnimation = { init: startHeroAnimation };
window.addEventListener("deck:ready", startHeroAnimation);
