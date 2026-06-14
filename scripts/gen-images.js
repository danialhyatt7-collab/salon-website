/* Generates rich, on-brand editorial placeholder artwork for Salon of Beauty.
   Swap these for real photography by replacing the same-named JPGs in /assets/img. */
const sharp = require("sharp");
const path = require("path");

const OUT = path.join(__dirname, "..", "assets", "img");
const esc = (s) => s.replace(/&/g, "&amp;");

/* tiny deterministic RNG so each image is varied but reproducible */
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function art({ w, h, label, sub, a1, a2, gx, gy, seed }) {
  const r = rng(seed);
  const min = Math.min(w, h);

  // soft bokeh discs
  let bokeh = "";
  const n = 9;
  for (let i = 0; i < n; i++) {
    const cx = Math.round(r() * w);
    const cy = Math.round(r() * h);
    const rad = Math.round(min * (0.04 + r() * 0.16));
    const op = (0.04 + r() * 0.09).toFixed(3);
    const col = r() > 0.5 ? "#e8d5b5" : a1;
    bokeh += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${col}" opacity="${op}" filter="url(#soft)"/>`;
  }

  // diagonal light streak
  const streak = `<polygon points="${w * 0.55},0 ${w * 0.72},0 ${w * 0.2},${h} ${w * 0.03},${h}" fill="url(#sheen)" opacity="0.7"/>`;

  // corner ticks
  const m = 26, t = Math.round(min * 0.05);
  const tick = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c9a24b" stroke-opacity="0.5" stroke-width="1.4"/>`;
  const corners =
    tick(m, m + t, m, m) + tick(m, m, m + t, m) +
    tick(w - m - t, m, w - m, m) + tick(w - m, m, w - m, m + t) +
    tick(m, h - m - t, m, h - m) + tick(m, h - m, m + t, h - m) +
    tick(w - m - t, h - m, w - m, h - m) + tick(w - m, h - m - t, w - m, h - m);

  const cy = h / 2;
  const big = Math.round(min * 0.105);
  const small = Math.round(min * 0.024);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#15100b"/><stop offset="50%" stop-color="#0d0908"/><stop offset="100%" stop-color="#060403"/>
    </linearGradient>
    <radialGradient id="bloom1" cx="${gx}%" cy="${gy}%" r="70%">
      <stop offset="0%" stop-color="${a1}" stop-opacity="0.6"/><stop offset="40%" stop-color="${a2}" stop-opacity="0.26"/><stop offset="100%" stop-color="#0a0807" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bloom2" cx="${100 - gx}%" cy="${gy + 22}%" r="55%">
      <stop offset="0%" stop-color="${a2}" stop-opacity="0.34"/><stop offset="100%" stop-color="#0a0807" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bloom3" cx="${gx + 10}%" cy="12%" r="40%">
      <stop offset="0%" stop-color="#f3ece0" stop-opacity="0.20"/><stop offset="100%" stop-color="#0a0807" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheen" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#e8d5b5" stop-opacity="0"/><stop offset="50%" stop-color="#f3ece0" stop-opacity="0.07"/><stop offset="100%" stop-color="#e8d5b5" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vig" cx="50%" cy="46%" r="75%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
    </radialGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${Math.round(min * 0.03)}"/></filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#base)"/>
  ${bokeh}
  <rect width="${w}" height="${h}" fill="url(#bloom2)"/>
  <rect width="${w}" height="${h}" fill="url(#bloom1)"/>
  <rect width="${w}" height="${h}" fill="url(#bloom3)"/>
  ${streak}
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect x="${m}" y="${m}" width="${w - m * 2}" height="${h - m * 2}" fill="none" stroke="#c9a24b" stroke-opacity="0.16" stroke-width="1"/>
  ${corners}

  <text x="50%" y="${Math.round(cy - big * 0.62)}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(min * 0.03)}" fill="#c9a24b" opacity="0.8" letter-spacing="6">SB</text>
  <line x1="${w / 2 - min * 0.07}" y1="${Math.round(cy - big * 0.42)}" x2="${w / 2 + min * 0.07}" y2="${Math.round(cy - big * 0.42)}" stroke="#c9a24b" stroke-opacity="0.45" stroke-width="1"/>
  <text x="50%" y="${Math.round(cy + big * 0.18)}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${big}" fill="#f5efe4" opacity="0.95">${esc(label)}</text>
  <text x="50%" y="${Math.round(cy + big * 0.8)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${small}" fill="#d9c39a" opacity="0.85" letter-spacing="${Math.round(min * 0.02)}">${esc(sub)}</text>
  <text x="50%" y="${h - Math.round(min * 0.05)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(min * 0.017)}" fill="#9a8b72" opacity="0.7" letter-spacing="${Math.round(min * 0.012)}">SALON OF BEAUTY · ISLAMABAD</text>
</svg>`;
}

const jobs = [
  { file: "hero.jpg", w: 1680, h: 945, label: "Where Beauty Becomes Ritual", sub: "ISLAMABAD", a1: "#c9a24b", a2: "#8a6a3c", gx: 70, gy: 34, seed: 11 },
  { file: "bride.jpg", w: 1200, h: 1500, label: "Bridal Couture", sub: "HD · AIRBRUSH", a1: "#e8d5b5", a2: "#b08d57", gx: 50, gy: 36, seed: 22 },
  { file: "hair.jpg", w: 1200, h: 1500, label: "Balayage", sub: "HAIR ATELIER", a1: "#caa45a", a2: "#7a5a32", gx: 56, gy: 44, seed: 33 },
  { file: "facial.jpg", w: 1200, h: 1500, label: "Glow Rituals", sub: "HYDRAFACIAL", a1: "#e9d9bf", a2: "#a98e63", gx: 44, gy: 40, seed: 44 },
  { file: "nails.jpg", w: 1200, h: 1200, label: "Nail Atelier", sub: "GEL · EXTENSIONS", a1: "#d9b878", a2: "#8a6a3c", gx: 52, gy: 46, seed: 55 },
  { file: "interior.jpg", w: 1600, h: 1100, label: "The Atelier", sub: "F-7 MARKAZ", a1: "#b89255", a2: "#6e5230", gx: 62, gy: 40, seed: 66 },
];

(async () => {
  for (const j of jobs) {
    await sharp(Buffer.from(art(j))).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(OUT, j.file));
    console.log("wrote", j.file);
  }
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
    <rect width="512" height="512" rx="110" fill="#0a0807"/>
    <rect x="40" y="40" width="432" height="432" rx="80" fill="none" stroke="#c9a24b" stroke-opacity="0.45" stroke-width="2"/>
    <text x="256" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="240" fill="#c9a24b">SB</text>
  </svg>`;
  await sharp(Buffer.from(icon)).png().toFile(path.join(OUT, "icon.png"));
  console.log("wrote icon.png");
})();
