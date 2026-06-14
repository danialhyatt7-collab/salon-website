/* Generates on-brand placeholder artwork for Salon of Beauty.
   Swap these for real photography by replacing the JPGs in /assets/img. */
const sharp = require("sharp");
const path = require("path");

const OUT = path.join(__dirname, "..", "assets", "img");

const esc = (s) => s.replace(/&/g, "&amp;");

function art({ w, h, label, sub, a1, a2, gx, gy }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="glow" cx="${gx}%" cy="${gy}%" r="78%">
      <stop offset="0%" stop-color="${a1}" stop-opacity="0.55"/>
      <stop offset="38%" stop-color="${a2}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#0a0807" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140e0a"/>
      <stop offset="55%" stop-color="#0d0908"/>
      <stop offset="100%" stop-color="#070504"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#e8d5b5" stop-opacity="0"/>
      <stop offset="50%" stop-color="#e8d5b5" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#e8d5b5" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vig" cx="50%" cy="50%" r="75%">
      <stop offset="60%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#base)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect width="${w}" height="${h}" fill="url(#sheen)"/>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <g fill="none" stroke="#c9a24b" stroke-opacity="0.22">
    <rect x="26" y="26" width="${w - 52}" height="${h - 52}" stroke-width="1"/>
  </g>
  <text x="50%" y="${h / 2 - 6}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="${Math.round(Math.min(w, h) * 0.11)}" fill="#f3ece0" opacity="0.92"
        font-style="italic">${esc(label)}</text>
  <text x="50%" y="${h / 2 + Math.round(Math.min(w, h) * 0.09)}" text-anchor="middle"
        font-family="Arial, sans-serif" letter-spacing="${Math.round(Math.min(w, h) * 0.02)}"
        font-size="${Math.round(Math.min(w, h) * 0.026)}" fill="#c9a24b" opacity="0.85">${esc(sub)}</text>
  <text x="50%" y="60" text-anchor="middle" font-family="Georgia, serif"
        font-size="26" fill="#c9a24b" opacity="0.7" letter-spacing="4">SB</text>
</svg>`;
}

const jobs = [
  { file: "hero.jpg", w: 1680, h: 945, label: "Salon of Beauty", sub: "ISLAMABAD", a1: "#c9a24b", a2: "#8a6a3c", gx: 70, gy: 35 },
  { file: "bride.jpg", w: 1200, h: 1500, label: "Bridal Couture", sub: "HD · AIRBRUSH", a1: "#e8d5b5", a2: "#b08d57", gx: 50, gy: 38 },
  { file: "hair.jpg", w: 1200, h: 1500, label: "Balayage", sub: "HAIR ATELIER", a1: "#caa45a", a2: "#7a5a32", gx: 55, gy: 45 },
  { file: "facial.jpg", w: 1200, h: 1500, label: "Glow Rituals", sub: "HYDRAFACIAL", a1: "#e9d9bf", a2: "#a98e63", gx: 45, gy: 40 },
  { file: "nails.jpg", w: 1200, h: 1200, label: "Nail Atelier", sub: "GEL · EXTENSIONS", a1: "#d9b878", a2: "#8a6a3c", gx: 52, gy: 48 },
  { file: "interior.jpg", w: 1600, h: 1100, label: "The Atelier", sub: "F-7 MARKAZ", a1: "#b89255", a2: "#6e5230", gx: 60, gy: 42 },
];

(async () => {
  for (const j of jobs) {
    const svg = Buffer.from(art(j));
    await sharp(svg).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, j.file));
    console.log("wrote", j.file);
  }
  // App icon
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
    <rect width="512" height="512" rx="110" fill="#0a0807"/>
    <rect x="40" y="40" width="432" height="432" rx="80" fill="none" stroke="#c9a24b" stroke-opacity="0.4" stroke-width="2"/>
    <text x="256" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="240" fill="#c9a24b">SB</text>
  </svg>`;
  await sharp(Buffer.from(icon)).png().toFile(path.join(OUT, "icon.png"));
  console.log("wrote icon.png");
})();
