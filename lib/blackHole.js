/**
 * Black hole background — engine canvas 2D.
 *
 * Port dari Blackhole.zip (script.js) menjadi modul biasa, dengan tambahan:
 *  - parallax mengikuti pointer (dihaluskan), ditulis langsung ke style
 *    elemen sehingga tidak memicu re-render React
 *  - partikel punya kedalaman: partikel besar bergeser lebih jauh
 *  - di layar sentuh, parallax diganti gerak melayang pelan (tidak ada mouse)
 *  - animasi berbasis waktu (sama cepatnya di layar 60Hz maupun 120Hz)
 *  - cleanup lengkap (rAF + semua listener), aman untuk React / Next.js
 *  - tanpa dependency (easeInExpo ditulis langsung, bukan dari esm.sh)
 *  - menghormati prefers-reduced-motion (satu frame statis, tanpa parallax)
 *
 * Elemen lain bisa ikut parallax cukup dengan atribut:
 *   <div data-parallax="0.25">…</div>   (angka = kedalaman, makin besar makin jauh geser)
 */

const TOTAL_DISCS = 100;
const TOTAL_LINES = 100;
const TOTAL_PARTICLES = 100;
const TAU = Math.PI * 2;

// Parallax — jarak geser maksimum (px) saat pointer di tepi layar.
const RANGE = { x: 26, y: 18 };
// Kedalaman tiap layer. Makin besar = makin jauh bergeser.
const DEPTH = { canvas: 0.4, glow: 0.8, aura: 1.2 };
// 0–1: makin besar makin cepat menyusul pointer.
const SMOOTHING = 0.07;

const easeInExpo = (t) => (t <= 0 ? 0 : Math.pow(2, 10 * t - 10));
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/**
 * @param {{ root: HTMLElement, canvas: HTMLCanvasElement, glow: HTMLElement, aura: HTMLElement }} els
 * @returns {() => void} fungsi destroy
 */
export function createBlackHole({ root, canvas, glow, aura }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  const followers = Array.from(document.querySelectorAll("[data-parallax]")).map((el) => ({
    el,
    depth: parseFloat(el.dataset.parallax) || 0,
  }));

  let width = 0;
  let height = 0;
  let dpi = 1;

  let startDisc = null;
  let endDisc = null;
  let discs = [];
  let clip = null;
  let linesCanvas = null;
  let particles = [];
  let particleArea = null;

  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  let raf = 0;
  let resizeTimer = 0;
  let lastTime = 0;
  let paused = false;

  /* ------------------------------------------------------------------ */
  /* Setup                                                              */
  /* ------------------------------------------------------------------ */

  function setSize() {
    width = root.clientWidth;
    height = root.clientHeight;
    dpi = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpi);
    canvas.height = Math.round(height * dpi);
  }

  function tweenDisc(disc) {
    disc.x = lerp(startDisc.x, endDisc.x, disc.p);
    disc.y = lerp(startDisc.y, endDisc.y, easeInExpo(disc.p));
    disc.w = lerp(startDisc.w, endDisc.w, disc.p);
    disc.h = lerp(startDisc.h, endDisc.h, disc.p);
    return disc;
  }

  function setDiscs() {
    // The "camera angle" of the tunnel comes from the disc's w:h ratio.
    // Deriving h from the container's height made that ratio change with
    // every screen size (tall on mobile, flat on desktop) — the "seen from
    // above" vs "seen from the side" mismatch. Fix the ratio to width only,
    // so the funnel looks like the same shot on every device; height is
    // only used to place it vertically on the page.
    const ellipseW = width * 0.75;
    const ellipseH = ellipseW * 0.45;

    startDisc = { x: width * 0.5, y: height * 0.45, w: ellipseW, h: ellipseH };
    endDisc = { x: width * 0.5, y: height * 0.95, w: 0, h: 0 };

    discs = [];
    let prevBottom = height;
    let clipDisc = null;

    for (let i = 0; i < TOTAL_DISCS; i++) {
      const disc = tweenDisc({ p: i / TOTAL_DISCS });
      const bottom = disc.y + disc.h;

      if (bottom <= prevBottom) clipDisc = { ...disc };
      prevBottom = bottom;

      discs.push(disc);
    }

    if (!clipDisc) clipDisc = { ...discs[0] };

    const path = new Path2D();
    path.ellipse(clipDisc.x, clipDisc.y, clipDisc.w, clipDisc.h, 0, 0, TAU);
    path.rect(clipDisc.x - clipDisc.w, 0, clipDisc.w * 2, clipDisc.y);

    clip = { disc: clipDisc, path };
  }

  // Garis radial dihitung sekali ke canvas terpisah, lalu di-blit tiap frame.
  function setLines() {
    const lines = Array.from({ length: TOTAL_LINES }, () => []);
    const step = TAU / TOTAL_LINES;

    discs.forEach((disc) => {
      for (let i = 0; i < TOTAL_LINES; i++) {
        const angle = i * step;
        lines[i].push({
          x: disc.x + Math.cos(angle) * disc.w,
          y: disc.y + Math.sin(angle) * disc.h,
        });
      }
    });

    linesCanvas = document.createElement("canvas");
    linesCanvas.width = canvas.width;
    linesCanvas.height = canvas.height;

    const lctx = linesCanvas.getContext("2d");
    lctx.scale(dpi, dpi);
    lctx.strokeStyle = "#444";
    lctx.lineWidth = 2;

    // Hit-test butuh konteks tanpa transform (isPointInPath tidak ikut ter-scale).
    const hit = document.createElement("canvas").getContext("2d");
    hit.lineWidth = 2;

    lines.forEach((line) => {
      lctx.save();

      let lineIsIn = false;
      for (let j = 1; j < line.length; j++) {
        const p0 = line[j - 1];
        const p1 = line[j];

        if (
          !lineIsIn &&
          (hit.isPointInPath(clip.path, p1.x, p1.y) || hit.isPointInStroke(clip.path, p1.x, p1.y))
        ) {
          lineIsIn = true;
        } else if (lineIsIn) {
          lctx.clip(clip.path);
        }

        lctx.beginPath();
        lctx.moveTo(p0.x, p0.y);
        lctx.lineTo(p1.x, p1.y);
        lctx.stroke();
      }

      lctx.restore();
    });
  }

  function initParticle(start = false) {
    const sx = particleArea.sx + particleArea.sw * Math.random();
    const ex = particleArea.ex + particleArea.ew * Math.random();

    return {
      x: sx,
      sx,
      dx: ex - sx,
      y: start ? particleArea.h * Math.random() : particleArea.h,
      vy: 0.5 + Math.random(),
      p: 0,
      r: 0.5 + Math.random() * 4,
      c: `rgba(255, 255, 255, ${Math.random()})`,
    };
  }

  function setParticles() {
    particleArea = {
      sw: clip.disc.w * 0.5,
      ew: clip.disc.w * 2,
      h: height * 0.85,
    };
    particleArea.sx = (width - particleArea.sw) / 2;
    particleArea.ex = (width - particleArea.ew) / 2;

    particles = Array.from({ length: TOTAL_PARTICLES }, () => initParticle(true));
  }

  function build() {
    setSize();
    setDiscs();
    setLines();
    setParticles();
  }

  /* ------------------------------------------------------------------ */
  /* Update                                                             */
  /* ------------------------------------------------------------------ */

  // k = jumlah "frame 60fps" yang berlalu, supaya kecepatan sama di semua refresh rate.
  function moveDiscs(k) {
    discs.forEach((disc) => {
      disc.p = (disc.p + 0.001 * k) % 1;
      tweenDisc(disc);
    });
  }

  function moveParticles(k) {
    particles.forEach((particle) => {
      particle.p = 1 - particle.y / particleArea.h;
      particle.x = particle.sx + particle.dx * particle.p;
      particle.y -= particle.vy * k;

      if (particle.y < 0) Object.assign(particle, initParticle());
    });
  }

  function applyParallax() {
    const { x, y } = current;
    const tx = (depth) => (-x * RANGE.x * depth).toFixed(2);
    const ty = (depth) => (-y * RANGE.y * depth).toFixed(2);

    canvas.style.transform = `translate3d(${tx(DEPTH.canvas)}px, ${ty(DEPTH.canvas)}px, 0) scale(1.06)`;
    glow.style.transform = `translate3d(${tx(DEPTH.glow)}px, ${ty(DEPTH.glow)}px, 0)`;
    aura.style.transform = `translate3d(calc(-50% + ${tx(DEPTH.aura)}px), ${ty(DEPTH.aura)}px, 0)`;

    followers.forEach(({ el, depth }) => {
      el.style.transform = `translate3d(${tx(depth)}px, ${ty(depth)}px, 0)`;
    });
  }

  /* ------------------------------------------------------------------ */
  /* Draw                                                               */
  /* ------------------------------------------------------------------ */

  function drawDiscs() {
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;

    // Cincin terluar
    ctx.beginPath();
    ctx.ellipse(startDisc.x, startDisc.y, startDisc.w, startDisc.h, 0, 0, TAU);
    ctx.stroke();

    // Cincin dalam (tiap ke-5)
    discs.forEach((disc, i) => {
      if (i % 5 !== 0) return;

      const clipped = disc.w < clip.disc.w - 5;
      if (clipped) {
        ctx.save();
        ctx.clip(clip.path);
      }

      ctx.beginPath();
      ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, TAU);
      ctx.stroke();

      if (clipped) ctx.restore();
    });
  }

  function drawParticles() {
    ctx.save();
    ctx.clip(clip.path);

    particles.forEach((particle) => {
      // Parallax per partikel: makin besar (makin "dekat") makin jauh bergeser.
      const ox = -current.x * particle.r * 3;
      const oy = -current.y * particle.r * 2;

      ctx.fillStyle = particle.c;
      ctx.fillRect(particle.x + ox, particle.y + oy, particle.r, particle.r);
    });

    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(dpi, dpi);
    drawDiscs();
    ctx.restore();

    // linesCanvas sudah dalam piksel perangkat → blit tanpa scale
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(linesCanvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.scale(dpi, dpi);
    drawParticles();
    ctx.restore();
  }

  /* ------------------------------------------------------------------ */
  /* Loop & events                                                      */
  /* ------------------------------------------------------------------ */

  function tick(now) {
    raf = requestAnimationFrame(tick);

    if (!lastTime) lastTime = now;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    if (paused) return;

    const k = dt * 60;

    if (coarsePointer) {
      // Tidak ada mouse → melayang pelan supaya efek kedalaman tetap terasa.
      target.x = Math.sin(now * 0.00035) * 0.6;
      target.y = Math.cos(now * 0.00028) * 0.5;
    }

    const ease = 1 - Math.pow(1 - SMOOTHING, k);
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;

    applyParallax();
    moveDiscs(k);
    moveParticles(k);
    draw();
  }

  function onPointerMove(e) {
    if (e.pointerType === "touch") return;
    target.x = clamp((e.clientX / window.innerWidth - 0.5) * 2, -1, 1);
    target.y = clamp((e.clientY / window.innerHeight - 0.5) * 2, -1, 1);
  }

  function onPointerLeave() {
    target.x = 0;
    target.y = 0;
  }

  // Latar memudar saat scroll meninggalkan hero, dan berhenti dihitung kalau sudah jauh.
  function onScroll() {
    const vh = window.innerHeight || 1;
    const t = clamp(window.scrollY / vh, 0, 1);

    root.style.opacity = (1 - t * 0.8).toFixed(3);
    paused = window.scrollY > vh * 2.5;
  }

  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const w = root.clientWidth;
      const h = root.clientHeight;

      // Abaikan perubahan tinggi kecil (address bar HP naik-turun).
      if (w === width && Math.abs(h - height) < 150) return;

      build();
      if (reduceMotion) draw();
    }, 150);
  }

  /* ------------------------------------------------------------------ */
  /* Start                                                              */
  /* ------------------------------------------------------------------ */

  build();
  onScroll();
  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", onScroll, { passive: true });

  if (reduceMotion) {
    draw();
  } else {
    if (!coarsePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);
    }
    raf = requestAnimationFrame(tick);
  }

  return function destroy() {
    cancelAnimationFrame(raf);
    window.clearTimeout(resizeTimer);

    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointerMove);
    document.documentElement.removeEventListener("mouseleave", onPointerLeave);

    canvas.style.transform = "";
    glow.style.transform = "";
    aura.style.transform = "";
    root.style.opacity = "";
    followers.forEach(({ el }) => {
      el.style.transform = "";
    });
  };
}
