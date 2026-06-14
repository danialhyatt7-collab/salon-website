/* Fetch 6 new gallery images. */
const sharp = require("sharp");
const path = require("path");

const C = "https://d8j0ntlcm91z4.cloudfront.net/user_37DILVqiW7dfub7Y3zgrbddlXQx";
const OUT = path.join(__dirname, "..", "assets", "img");

const imgs = [
  { file: "gallery-mehndi.jpg",  url: `${C}/hf_20260614_224152_9c3e24f8-f589-4a7f-a441-e7f59ca894bc.png`, w: 1200 },
  { file: "gallery-updo.jpg",    url: `${C}/hf_20260614_224157_250bf245-788a-456f-9dfb-4f94237468e0.png`, w: 1200 },
  { file: "gallery-eyes.jpg",    url: `${C}/hf_20260614_224205_57cc8080-b7ad-4d15-9773-55926e807d36.png`, w: 1200 },
  { file: "gallery-sleek.jpg",   url: `${C}/hf_20260614_224211_98db061b-6cb8-44ac-afcd-7cbbebef5ac4.png`, w: 1680 },
  { file: "gallery-evening.jpg", url: `${C}/hf_20260614_224219_d1a25f98-68e0-4155-89f2-361c770940de.png`, w: 1200 },
  { file: "gallery-lips.jpg",    url: `${C}/hf_20260614_224227_549bc5d3-9797-475f-abb7-c7ed7dd3139c.png`, w: 1200 },
];

(async () => {
  let ok = 0;
  for (const it of imgs) {
    try {
      const res = await fetch(it.url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error("suspiciously small (" + buf.length + "B)");
      await sharp(buf).resize({ width: it.w, withoutEnlargement: true }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, it.file));
      console.log("✓", it.file);
      ok++;
    } catch (e) {
      console.error("✗", it.file, "—", e.message);
    }
  }
  console.log(`\n${ok}/${imgs.length} images saved.`);
})();
