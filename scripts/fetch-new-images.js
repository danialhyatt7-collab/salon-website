/* Pulls the freshly generated Higgsfield images (unique photo per slot). */
const sharp = require("sharp");
const path = require("path");

const C = "https://d8j0ntlcm91z4.cloudfront.net/user_37DILVqiW7dfub7Y3zgrbddlXQx";
const OUT = path.join(__dirname, "..", "assets", "img");

const imgs = [
  { file: "gallery-bridal.jpg",   url: `${C}/hf_20260614_212634_e35fb87f-a1e2-47cc-9401-170d49f2dcf6.png`, w: 1200 },
  { file: "party.jpg",            url: `${C}/hf_20260614_212706_2bcf85ae-4572-48a6-80d0-490ed9db468b.png`, w: 1200 },
  { file: "keratin.jpg",          url: `${C}/hf_20260614_212712_d44027e6-74ee-4863-a958-0b6af1f220b1.png`, w: 1200 },
  { file: "gallery-hair.jpg",     url: `${C}/hf_20260614_212717_a5a47e25-6896-42b2-9cda-58f0d1b809c5.png`, w: 1200 },
  { file: "gallery-nails.jpg",    url: `${C}/hf_20260614_212722_f06017a3-09cc-43d5-8dcd-3d0da09a2685.png`, w: 1200 },
  { file: "gallery-interior.jpg", url: `${C}/hf_20260614_212726_0a0eed10-a471-4434-92d0-2ad52c7bb3de.png`, w: 1680 },
  { file: "gallery-facial.jpg",   url: `${C}/hf_20260614_212731_3d44e08a-6cfb-4955-b51b-b3cd36e22fb2.png`, w: 1200 },
  { file: "gallery-glam.jpg",     url: `${C}/hf_20260614_212735_693ee1ea-fad0-4cd4-b5b5-87c5d60fd36f.png`, w: 1200 },
  { file: "insta-bridal.jpg",     url: `${C}/hf_20260614_212740_29deeef5-38ef-4946-bda0-6909df0b26c1.png`, w: 1000 },
  { file: "insta-hair.jpg",       url: `${C}/hf_20260614_212745_865fa1a4-74ca-421a-bca4-532230a16d96.png`, w: 1000 },
  { file: "insta-skin.jpg",       url: `${C}/hf_20260614_212749_2514d5a0-2332-4af0-98b4-250e40b19902.png`, w: 1000 },
  { file: "insta-nails.jpg",      url: `${C}/hf_20260614_212753_b3d5494c-5e8c-4acb-9d15-8aad5f0a6dd3.png`, w: 1000 },
  { file: "insta-salon.jpg",      url: `${C}/hf_20260614_212800_b3bd3698-3d39-4f4a-a5be-1d7e00670d86.png`, w: 1000 },
  { file: "insta-glam.jpg",       url: `${C}/hf_20260614_212804_f4c74551-c892-4811-a5f3-646f4b250b39.png`, w: 1000 },
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
