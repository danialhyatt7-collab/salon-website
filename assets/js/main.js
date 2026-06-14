/* =========================================================
   SALON OF BEAUTY — interactions
   ========================================================= */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const WHATSAPP = "923365060785"; // salon's WhatsApp number

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    const pre = $("#preloader");
    if (pre) setTimeout(() => pre.classList.add("is-done"), 500);
    const hero = $("#hero");
    if (hero) requestAnimationFrame(() => hero.classList.add("is-in"));
  });

  /* ---------- Year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Header scroll + progress + dock ---------- */
  const header = $("#siteHeader");
  const progress = $(".scroll-progress span");
  const dock = $("#dock");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    dock.classList.toggle("is-visible", y > 600);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = $("#navToggle");
  const menu = $("#mobileMenu");
  const closeMenu = () => {
    toggle.classList.remove("is-open");
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$(".mobile-menu__links a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = $$("[data-count]");
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = target >= 1000 ? "+" : "";
        let start = 0;
        const dur = 1600;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + (p === 1 ? suffix : "");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => cio.observe(c));

  /* ---------- Hero parallax ---------- */
  const heroImg = $(".hero__img");
  if (heroImg && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroImg.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
      },
      { passive: true }
    );
  }

  /* ---------- Card tilt ---------- */
  if (matchMedia("(hover: hover)").matches) {
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${py * -4}deg) rotateY(${px * 5}deg)`;
        card.style.transformStyle = "preserve-3d";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Testimonials carousel ---------- */
  const track = $("#testiTrack");
  if (track) {
    const cards = $$(".testi__card", track);
    let i = 0;
    let timer;
    const go = (n) => {
      i = (n + cards.length) % cards.length;
      track.style.transform = `translateX(-${i * 100}%)`;
    };
    const next = () => go(i + 1);
    const auto = () => (timer = setInterval(next, 6000));
    const reset = () => {
      clearInterval(timer);
      auto();
    };
    $("#testiNext")?.addEventListener("click", () => {
      next();
      reset();
    });
    $("#testiPrev")?.addEventListener("click", () => {
      go(i - 1);
      reset();
    });
    auto();
  }

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lightboxImg");
  const openLb = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  $$("[data-lightbox]").forEach((el) =>
    el.addEventListener("click", () => openLb(el.dataset.lightbox, $("img", el)?.alt))
  );
  $("#lightboxClose")?.addEventListener("click", closeLb);
  lb?.addEventListener("click", (e) => {
    if (e.target === lb) closeLb();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLb();
      closeMenu();
    }
  });

  /* ---------- Smooth-scroll to booking from CTAs + prefill service ---------- */
  $$("[data-book]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const svc = btn.dataset.service;
      const target = $("#booking");
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      if (svc) {
        const sel = $("#bk-service");
        if (sel) {
          $$("option", sel).forEach((o) => {
            if (o.textContent.trim() === svc) o.selected = true;
          });
        }
      }
      setTimeout(() => $("#bk-name")?.focus({ preventScroll: true }), 700);
    });
  });

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-show");
    setTimeout(() => toast.classList.remove("is-show"), 4200);
  };

  /* ---------- Booking form -> WhatsApp ---------- */
  const form = $("#bookingForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    ["bk-name", "bk-phone", "bk-service"].forEach((id) => {
      const input = $("#" + id);
      const field = input.closest(".field");
      const valid = input.value.trim() !== "";
      field.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      showToast("Please add your name, number and a service.");
      return;
    }
    const data = new FormData(form);
    const msg =
      `*New Appointment Request — Salon of Beauty*%0A%0A` +
      `👤 Name: ${encodeURIComponent(data.get("name"))}%0A` +
      `📞 Phone: ${encodeURIComponent(data.get("phone"))}%0A` +
      `💎 Service: ${encodeURIComponent(data.get("service"))}%0A` +
      `📅 Date: ${encodeURIComponent(data.get("date") || "Flexible")}%0A` +
      `⏰ Time: ${encodeURIComponent(data.get("time") || "Any")}%0A` +
      `📝 Notes: ${encodeURIComponent(data.get("note") || "—")}`;
    showToast("Opening WhatsApp to confirm your booking…");
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank", "noopener");
    }, 700);
    form.reset();
  });

  /* ---------- Active nav link ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__links a");
  const navIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach((a) =>
            a.style.setProperty("color", a.getAttribute("href") === "#" + id ? "var(--cream)" : "")
          );
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => navIo.observe(s));
})();
