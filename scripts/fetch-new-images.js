/* Re-fetch 14 regenerated images (fair Pakistani actress look, covered shoulders). */
const sharp = require("sharp");
const path = require("path");

const C = "https://d8j0ntlcm91z4.cloudfront.net/user_37DILVqiW7dfub7Y3zgrbddlXQx";
const OUT = path.join(__dirname, "..", "assets", "img");

const imgs = [
  { file: "bride.jpg",          url: `${C}/hf_20260614_215909_5723f0ea-4afc-4ff4-877e-f1c24f7d7995.png`, w: 1200 },
  { file: "hair.jpg",           url: `${C}/hf_20260614_215916_76edf791-8330-48f5-9bd7-de84190ffa59.png`, w: 1200 },
  { file: "keratin.jpg",        url: `${C}/hf_20260614_215923_4dd5fcab-da92-42fd-883b-cee6b97dc8fb.png`, w: 1200 },
  { file: "facial.jpg",         url: `${C}/hf_20260614_215930_f7fd8427-3946-489e-90ba-a9cf5f20dd4a.png`, w: 1200 },
  { file: "party.jpg",          url: `${C}/hf_20260614_215941_b85d69f8-932b-4ba1-8447-e93c3551de38.png`, w: 1200 },
  { file: "gallery-bridal.jpg", url: `${C}/hf_20260614_215949_450ed9a5-4f10-4426-ac36-3e9180e2526e.png`, w: 1200 },
  { file: "gallery-hair.jpg",   url: `${C}/hf_20260614_215955_86339cbc-1a39-4c60-a52f-579df782b5f4.png`, w: 1200 },
  { file: "gallery-facial.jpg", url: `${C}/hf_20260614_220004_7cf00848-e694-41c5-bf56-09ef2de8f77c.png`, w: 1200 },
  { file: "gallery-glam.jpg",   url: `${C}/hf_20260614_220010_edd78922-8c50-43aa-a05c-fe6f4f9cbe72.png`, w: 1200 },
  { file: "insta-bridal.jpg",   url: `${C}/hf_20260614_220017_3e5211fe-3b51-4603-ac01-5ea391ad0c25.png`, w: 1000 },
  { file: "insta-hair.jpg",     url: `${C}/hf_20260614_220025_c0a06ef3-4f33-49a6-a423-e1e9252ae8b7.png`, w: 1000 },
  { file: "insta-skin.jpg",     url: `${C}/hf_20260614_220031_7a9096ac-d5af-44a1-aff6-95b4a5099a1d.png`, w: 1000 },
  { file: "insta-salon.jpg",    url: `${C}/hf_20260614_220037_023f7ce3-31af-44f9-9589-f7bf5ded195a.png`, w: 1000 },
  { file: "insta-glam.jpg",     url: `${C}/hf_20260614_220044_604661dd-d721-443c-89d5-38c6c0c82be3.png`, w: 1000 },
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
