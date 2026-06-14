# Salon of Beauty — Islamabad

A world-class, dark-luxury marketing site for **Salon of Beauty Islamabad** — built to
maximise appointment bookings and position the salon as a premier beauty destination.

Black · bronze · champagne · editorial typography · glassmorphism · cinematic.

## ✦ Highlights

- **Hero** with cinematic imagery, animated headline reveal and parallax
- **Signature Services** — glassmorphism cards with tilt micro-interactions
- **Bridal Couture packages** with 2026 Islamabad luxury pricing
- **Transparent à-la-carte price menu** (hair, skin, makeup, nails)
- **Sticky booking widget** → composes a **WhatsApp** message instantly
- **Floating WhatsApp + Book Now dock**
- **Gallery** with lightbox, **testimonials** carousel, **Instagram** grid
- **FAQ** accordion, full **contact** section
- Smooth scroll-reveal animations, scroll progress, animated counters
- **Fully responsive** + **SEO optimised** (meta, Open Graph, Twitter, JSON-LD `BeautySalon`, sitemap, robots, manifest)
- **No framework, no build step** — pure HTML/CSS/JS. Degrades gracefully without JS.

## ✦ Run it

Any static server works. For example:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open the printed URL. (Root-relative paths like `/assets/...` need a server, not `file://`.)

## ✦ Structure

```
index.html              # the whole site
assets/css/styles.css   # design system + components
assets/js/main.js       # interactions (reveal, carousel, booking, lightbox)
assets/img/             # imagery (see "Replacing imagery")
scripts/gen-images.js   # regenerates the on-brand placeholder art
robots.txt · sitemap.xml · site.webmanifest
```

## ✦ Before going live (3 quick edits)

1. **WhatsApp / phone number** — replace the placeholder `923000000000` in:
   - `assets/js/main.js` (`WHATSAPP` constant)
   - the `wa.me/` and `tel:` links in `index.html`
2. **Address, hours, email, Instagram** — update in the contact section, footer and JSON-LD.
3. **Domain** — replace `https://salonofbeautyisb.com/` in the canonical / Open Graph / sitemap tags.

## ✦ Replacing imagery

The images in `assets/img/*.jpg` are **art-directed placeholders** rendered from
`scripts/gen-images.js`. Drop real photography in using the **same filenames**
(`hero.jpg`, `bride.jpg`, `hair.jpg`, `facial.jpg`, `nails.jpg`, `interior.jpg`) and the
layout picks them up automatically — no code changes needed.

> Cinematic reference imagery was generated for this build, but the asset CDN is
> blocked by this environment's network egress allowlist, so the binaries couldn't be
> pulled into the repo. Replace the placeholders with the salon's real photography (or
> the generated set) for production.

To regenerate the placeholders: `npm install && node scripts/gen-images.js`.

## ✦ Pricing note

Prices reflect indicative **2026 Islamabad luxury-salon market rates** (PKR) and are
clearly framed as "from" / starting prices, confirmed in consultation.
