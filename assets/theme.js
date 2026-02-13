(function () {
  const THEMES = ["light", "dark", "black"];
  let currentTheme = localStorage.getItem("theme") || "light";

  const root = document.documentElement;
  const body = document.body;

  function applyTheme(theme) {
    currentTheme = theme;
    root.setAttribute("data-theme", theme);
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const iconMap = {
      light: "☀️",
      dark: "🌙",
      black: "⚫"
    };
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.querySelectorAll("[data-theme-icon]").forEach((node) => {
        node.classList.toggle("hidden", node.dataset.themeIcon !== theme);
      });
      const activeIcon = toggle.querySelector(`[data-theme-icon="${theme}"]`);
      if (activeIcon) {
        activeIcon.textContent = iconMap[theme];
      }
    }
  }

  applyTheme(currentTheme);

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.innerHTML = `
        <span data-theme-icon="light" class="text-xl"></span>
        <span data-theme-icon="dark" class="text-xl hidden"></span>
        <span data-theme-icon="black" class="text-xl hidden"></span>
      `;
      applyTheme(currentTheme);
      toggle.addEventListener("click", () => {
        const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
        applyTheme(THEMES[nextIndex]);
      });
    }

    if (body.classList.contains("page-fade")) {
      requestAnimationFrame(() => body.classList.add("page-ready"));
    }

    const revealTargets = document.querySelectorAll(".reveal");
    if (revealTargets.length) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );

      revealTargets.forEach((el) => observer.observe(el));
    }

    const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
    const trackedSections = navLinks
      .map((link) => {
        const target = link.getAttribute("href");
        if (!target || !target.startsWith("#")) {
          return null;
        }
        return document.querySelector(target);
      })
      .filter(Boolean);

    if (trackedSections.length) {
      const updateActive = () => {
        let activeId = trackedSections[0].id;
        trackedSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 160) {
            activeId = section.id;
          }
        });

        navLinks.forEach((link) => {
          const target = link.getAttribute("href");
          const isActive = target === `#${activeId}`;
          link.classList.toggle("active", isActive);
          link.setAttribute("aria-current", isActive ? "page" : "false");
        });
      };

      updateActive();
      window.addEventListener("scroll", updateActive, { passive: true });
    }

    const currentYearTargets = document.querySelectorAll("#current-year, #year");
    currentYearTargets.forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  });
})();
