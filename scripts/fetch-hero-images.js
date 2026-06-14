/* Pulls the original cinematic Higgsfield images into assets/img.
 * Requires network access "Full" (or the CDN host allowlisted) — which only
 * applies in a NEW session. Run:  node scripts/fetch-hero-images.js
 * If the links have expired, regenerate a fresh set with Higgsfield instead.
 */
const sharp = require("sharp");
const path = require("path");

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_37DILVqiW7dfub7Y3zgrbddlXQx";
const OUT = path.join(__dirname, "..", "assets", "img");

// file -> [Higgsfield URL, max width]   (job IDs kept for regeneration)
const imgs = [
  // job c3e45081-7be0-4ebc-9922-4f9d13b38133
  { file: "hero.jpg", url: `${CDN}/hf_20260614_191434_c3e45081-7be0-4ebc-9922-4f9d13b38133.png`, w: 1680 },
  // job 79ae83a4-3ebd-4d36-a10e-2e3c205c1fc4
  { file: "bride.jpg", url: `${CDN}/hf_20260614_191435_79ae83a4-3ebd-4d36-a10e-2e3c205c1fc4.png`, w: 1200 },
  // job 103ae71d-d6bb-43df-8195-a969b80f4d30
  { file: "hair.jpg", url: `${CDN}/hf_20260614_191436_103ae71d-d6bb-43df-8195-a969b80f4d30.png`, w: 1200 },
  // job 57134f6d-a177-4848-9f3b-3257ccc42cc1
  { file: "facial.jpg", url: `${CDN}/hf_20260614_191441_57134f6d-a177-4848-9f3b-3257ccc42cc1.png`, w: 1200 },
  // job 39618b8a-9fc0-48eb-91ef-fc7dbe653179
  { file: "nails.jpg", url: `${CDN}/hf_20260614_191443_39618b8a-9fc0-48eb-91ef-fc7dbe653179.png`, w: 1200 },
  // job 39cb42cf-6e60-49fd-87f5-27c1dd4cb6a6
  { file: "interior.jpg", url: `${CDN}/hf_20260614_191444_39cb42cf-6e60-49fd-87f5-27c1dd4cb6a6.png`, w: 1680 },
];

(async () => {
  let ok = 0;
  for (const it of imgs) {
    try {
      const res = await fetch(it.url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error("suspiciously small (" + buf.length + "B) — likely blocked/expired");
      await sharp(buf).resize({ width: it.w, withoutEnlargement: true }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, it.file));
      console.log("✓", it.file);
      ok++;
    } catch (e) {
      console.error("✗", it.file, "—", e.message);
    }
  }
  console.log(`\n${ok}/${imgs.length} images saved.`);
  if (ok < imgs.length) console.log("If links expired, regenerate the set with Higgsfield, then rerun.");
})();
