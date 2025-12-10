// Typing Effect
const phrases = [
  "Software Engineer",
  "Full-Stack Developer",
  "Enterprise Web App Builder"
];
let currentPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const typingEffectElement = document.getElementById("typing-effect");
  if (!typingEffectElement) return;
  const currentPhrase = phrases[currentPhraseIndex];
  if (isDeleting) {
    typingEffectElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEffectElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => (isDeleting = true), 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
  }
  const typingSpeed = isDeleting ? 70 : 150;
  setTimeout(type, typingSpeed);
}

// Theme Toggle (with icon updates)
const themeToggleDesktop = document.getElementById("theme-toggle-desktop");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");

function setTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  [themeToggleDesktop, themeToggleMobile].forEach((button) => {
    if (!button) return;
    const moon = button.querySelector(".fa-moon");
    const sun = button.querySelector(".fa-sun");
    if (moon && sun) {
      moon.style.display = isDark ? "inline-block" : "none";
      sun.style.display = isDark ? "none" : "inline-block";
    }
  });
}

// Check for saved theme on load
function initTheme() {
  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setTheme(true);
  } else {
    setTheme(false);
  }
}

function wireThemeToggle() {
  if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener("click", () => {
      setTheme(!document.documentElement.classList.contains("dark"));
    });
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", () => {
      setTheme(!document.documentElement.classList.contains("dark"));
    });
  }
}

// Mobile Menu
function wireMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMobileMenuButton = document.getElementById("close-mobile-menu");
  if (!(mobileMenuButton && mobileMenu && closeMobileMenuButton)) return;
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
  });
  closeMobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Smooth scrolling for navigation links
function wireSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Footer year
function setFooterYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

// Fetch GitHub Projects
async function fetchGitHubProjects() {
  const username = "dinesh2841";
  const projectsContainer = document.getElementById("projects-container");
  if (!projectsContainer) return;
  projectsContainer.innerHTML = `
    <div class="col-span-full text-center text-gray-600 dark:text-gray-400">
      <i class="fas fa-spinner fa-spin text-4xl mb-4 text-blue-500"></i>
      <p>Loading projects from GitHub...</p>
      <p class="text-sm mt-2 text-red-500 dark:text-red-400">
        Note: Project details from LinkedIn cannot be fetched due to API restrictions. Please check GitHub repositories for more info.
      </p>
    </div>
  `;
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=9`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
    const repos = await response.json();
    if (repos.length === 0) {
      projectsContainer.innerHTML = `<p class="col-span-full text-center text-gray-600 dark:text-gray-400">No public repositories found on GitHub.</p>`;
      return;
    }
    projectsContainer.innerHTML = "";
    // Optional impact one-liners per repo (edit keys to match your repos)
    const impact = {
      attendance_calculator: "Automates student attendance percentage calculation",
      erp_system: "Role-based academic ERP with admin & student views",
      dreamnest: "Real-estate listing UI with responsive filtering",
    };

    repos.forEach((repo) => {
      const key = repo.name.toLowerCase();
      const oneLine = impact[key] || (repo.description ? repo.description : "Personal project");
      const projectCard = `
        <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-600 flex flex-col h-full">
          <h3 class="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">${repo.name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}</h3>
          <p class="text-gray-700 dark:text-gray-300 text-sm mb-2">${oneLine}</p>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">${repo.description || "No description available."}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${repo.language ? `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">${repo.language}</span>` : ""}
          </div>
          <div class="mt-auto flex justify-between items-center">
            <div class="flex items-center gap-2">
              <a href="${repo.html_url}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
                <i class="fas fa-code"></i><span>View Project</span>
              </a>
              ${repo.homepage && String(repo.homepage).trim() !== "" ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition">
                <span>Live Demo ↗</span>
              </a>` : ""}
            </div>
            <span class="text-gray-500 dark:text-gray-400 text-xs">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      `;
      projectsContainer.insertAdjacentHTML("beforeend", projectCard);
    });
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    projectsContainer.innerHTML = `<p class="col-span-full text-center text-red-600 dark:text-red-400">Failed to load projects. Please check your internet connection or try again later.</p>`;
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  type();
  fetchGitHubProjects();
  wireMobileMenu();
  wireSmoothScroll();
  initTheme();
  wireThemeToggle();
  setFooterYear();
  // Active section highlight
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("header nav a");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = Array.from(navLinks).find((a) => a.getAttribute("href") === `#${id}`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("text-blue-600"));
          link.classList.add("text-blue-600");
        }
      });
    },
    { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
  );
  sections.forEach((sec) => observer.observe(sec));
});
