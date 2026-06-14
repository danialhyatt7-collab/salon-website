/* Re-fetch interior images matched to the real salon. Overwrites same files. */
const sharp = require("sharp");
const path = require("path");

const C = "https://d8j0ntlcm91z4.cloudfront.net/user_37DILVqiW7dfub7Y3zgrbddlXQx";
const OUT = path.join(__dirname, "..", "assets", "img");

const imgs = [
  { file: "interior.jpg",         url: `${C}/hf_20260614_215330_87ce3839-ae2d-4a9f-82eb-c22af694d988.png`, w: 1680 },
  { file: "gallery-interior.jpg", url: `${C}/hf_20260614_215338_ab36ecdc-3027-4a5f-9fb2-7eb5737dac6b.png`, w: 1680 },
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
