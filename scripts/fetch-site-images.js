/* Pull the photorealistic Nano Banana Pro images into assets/img.
 * Requires network access "Full" (per-session) — run in a session that has it:
 *   npm install && node scripts/fetch-site-images.js
 * Then commit assets/img and push. If a link has expired, regenerate that one.
 */
const sharp = require("sharp");
const path = require("path");

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_37DILVqiW7dfub7Y3zgrbddlXQx";
const OUT = path.join(__dirname, "..", "assets", "img");

// file -> [url filename, max width]
const imgs = [
  ["hero.jpg",         "hf_20260619_063700_eae73e82-bf7f-4894-90e4-b187c6a9df2e.png", 1680],
  ["interior.jpg",     "hf_20260619_063701_85506fb8-d3c1-4f10-82c3-db8ec0ebc3bd.png", 1680],
  ["bride.jpg",        "hf_20260619_064944_a4959333-befb-4007-bfb7-b28d0540ea45.png", 1280],
  ["hair.jpg",         "hf_20260619_063712_b60ec50a-f8fd-4143-b3dd-034c12825afb.png", 1280],
  ["keratin.jpg",      "hf_20260619_063714_702fd52d-584c-4326-b97c-9655d30d9529.png", 1280],
  ["facial.jpg",       "hf_20260619_063715_f30c7243-16fa-42b0-8ddc-6c8f64463364.png", 1280],
  ["nails.jpg",        "hf_20260619_063722_7cd172e1-6d36-4c2d-b057-36a565e98e20.png", 1280],
  ["party.jpg",        "hf_20260619_063724_81911f81-38a1-4175-9996-6b2ec4fe8596.png", 1280],
  ["insta-bridal.jpg", "hf_20260619_063726_47005e80-f0e1-4659-9f47-1c99bb1ec8ed.png", 1080],
  ["insta-hair.jpg",   "hf_20260619_063840_ab6c02f1-8281-453d-8f0f-43a59bee55d4.png", 1080],
  ["insta-skin.jpg",   "hf_20260619_063842_b05c2337-b19a-477a-ac24-b72923de6f85.png", 1080],
  ["insta-nails.jpg",  "hf_20260619_063736_46f77b49-c631-4db9-a064-ca51857eed7b.png", 1080],
  ["insta-salon.jpg",  "hf_20260619_063701_85506fb8-d3c1-4f10-82c3-db8ec0ebc3bd.png", 1080],
  ["insta-glam.jpg",   "hf_20260619_063740_a888aa50-e1af-4c2f-8eea-8a3318aadda4.png", 1080],
];

(async () => {
  let ok = 0;
  for (const [file, name, w] of imgs) {
    try {
      const res = await fetch(`${CDN}/${name}`);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error("too small (" + buf.length + "B) — blocked or expired");
      await sharp(buf).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, file));
      console.log("✓", file);
      ok++;
    } catch (e) {
      console.error("✗", file, "—", e.message);
    }
  }
  console.log(`\n${ok}/${imgs.length} images saved.`);
})();
