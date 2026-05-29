/*SmartCare— main.js */

/* ---- NAV SCROLL ---- */
const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  },
  { passive: true },
);

/* ---- MOBILE MENU ---- */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileNav.classList.toggle("open", menuOpen);
  document.body.style.overflow = menuOpen ? "hidden" : "";
});

function closeMobile() {
  menuOpen = false;
  mobileNav.classList.remove("open");
  document.body.style.overflow = "";
}

/* ---- REVEAL ON SCROLL ---- */
const revealEls = document.querySelectorAll(
  ".services-section, .service-featured, .service-card, .offer-card, .about-section .about-grid > *, .step, .review-card, .cta-section",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // add reveal class if not already there
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

// Add initial styles for elements we want to animate
const animateOnScroll = document.querySelectorAll(
  ".service-featured, .service-card, .offer-card, .feat, .step-body, .review-card",
);

animateOnScroll.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
  revealObserver.observe(el);
});

/* ---- COPY OFFER CODE ---- */
function copyOfferCode(el) {
  const code = el.dataset.code || el.textContent.trim();
  navigator.clipboard.writeText(code).catch(() => {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  });

  const original = el.innerHTML;
  const originalBg = el.style.background;
  el.innerHTML = "✓ Copied!";
  el.style.background = "#BAEE5A";
  el.style.color = "#1A2E1E";
  el.style.borderColor = "#BAEE5A";

  setTimeout(() => {
    el.innerHTML = original;
    el.style.background = originalBg;
    el.style.color = "";
    el.style.borderColor = "";
  }, 2000);
}

// Make copyOfferCode available globally (called from HTML onclick)
window.copyOfferCode = copyOfferCode;

/* ---- COUNTDOWN TIMER ---- */
function buildCountdown(containerId, hours) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const endTime = Date.now() + hours * 3600000;

  function tick() {
    const diff = Math.max(0, endTime - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    el.innerHTML = [
      { val: h, label: "HRS" },
      { val: m, label: "MIN" },
      { val: s, label: "SEC" },
    ]
      .map(
        ({ val, label }) => `
      <div class="cdown-box">
        <div class="cdown-num">${String(val).padStart(2, "0")}</div>
        <div class="cdown-label">${label}</div>
      </div>
    `,
      )
      .join("");

    if (diff > 0) setTimeout(tick, 1000);
  }

  tick();
}

buildCountdown("countdown1", 47);

/* ---- CTA FORM ---- */
function handleCTA() {
  const email = document.getElementById("ctaEmail");
  const service = document.getElementById("ctaService");
  const btn = document.getElementById("ctaBtn");

  const emailValid = email.value && email.value.includes("@");

  if (!emailValid) {
    email.style.borderColor = "#C85832";
    email.focus();
    setTimeout(() => {
      email.style.borderColor = "";
    }, 2500);
    return;
  }

  btn.textContent = "✓ Quote Sent — Check Your Inbox";
  btn.style.background = "#3a7a52";
  email.value = "";
  if (service) service.value = "";

  setTimeout(() => {
    btn.textContent = "Get Free Quote →";
    btn.style.background = "";
  }, 4000);
}

window.handleCTA = handleCTA;

/* ---- SMOOTH ANCHOR NAV ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
