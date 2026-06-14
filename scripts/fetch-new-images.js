/* Re-fetch the 5 nano_banana_pro images (text-free). Overwrites same files. */
const sharp = require("sharp");
const path = require("path");

const C = "https://d8j0ntlcm91z4.cloudfront.net/user_37DILVqiW7dfub7Y3zgrbddlXQx";
const OUT = path.join(__dirname, "..", "assets", "img");

const imgs = [
  { file: "gallery-nails.jpg",  url: `${C}/hf_20260614_214745_d550f61e-8a2e-4547-80bc-399dfff981fc.png`, w: 1200 },
  { file: "gallery-glam.jpg",   url: `${C}/hf_20260614_214750_a9931836-1815-4d3d-b77e-024ac0fa4768.png`, w: 1200 },
  { file: "gallery-facial.jpg", url: `${C}/hf_20260614_214755_680b7b47-f10f-444b-930a-b8bb66e1ae56.png`, w: 1200 },
  { file: "insta-skin.jpg",     url: `${C}/hf_20260614_214800_2946ee74-4127-44f2-af3c-b9a4dcdeda19.png`, w: 1000 },
  { file: "insta-glam.jpg",     url: `${C}/hf_20260614_214805_414dacf9-7caa-4ba3-9cfa-1c6bc1c32c06.png`, w: 1000 },
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
