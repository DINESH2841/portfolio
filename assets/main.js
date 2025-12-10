// Typing Effect
const phrases = [
  "Software Engineer",
  "Full-Stack Developer",
  "Enterprise Web App Builder"
];
let currentPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEffectElement = document.getElementById("typing-effect");

function type() {
  const currentPhrase = phrases[currentPhraseIndex];
  if (isDeleting) {
    typingEffectElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEffectElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => isDeleting = true, 1500);
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
  [themeToggleDesktop, themeToggleMobile].forEach(button => {
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
if (localStorage.getItem("theme") === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggleDesktop.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("dark"));
});
themeToggleMobile.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("dark"));
});

// Mobile Menu
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenuButton = document.getElementById("close-mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
});
closeMobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Dynamically set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Fetch GitHub Projects
async function fetchGitHubProjects() {
  const username = 'dinesh2841';
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = `
    <div class="col-span-full text-center text-gray-600 dark:text-gray-400">
      <i class="fas fa-spinner fa-spin text-4xl mb-4 text-blue-500"></i>
      <p>Loading projects from GitHub...</p>
    </div>
  `;
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const repos = await response.json();

    if (repos.length === 0) {
      projectsContainer.innerHTML = `<p class="col-span-full text-center text-gray-600 dark:text-gray-400">No public repositories found on GitHub.</p>`;
      return;
    }

    projectsContainer.innerHTML = '';
    repos.forEach(repo => {
      const projectCard = `
        <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-600 flex flex-col h-full">
          <h3 class="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">${repo.name.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">${repo.description || 'No description available.'}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${repo.language ? `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">${repo.language}</span>` : ''}
          </div>
          <div class="mt-auto flex justify-between items-center">
            <a href="${repo.html_url}" target="_blank" class="text-blue-500 hover:underline text-sm font-medium">
              View Project <i class="fas fa-external-link-alt ml-1"></i>
            </a>
            <span class="text-gray-500 dark:text-gray-400 text-xs">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      `;
      projectsContainer.insertAdjacentHTML('beforeend', projectCard);
    });
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    projectsContainer.innerHTML = `<p class="col-span-full text-center text-red-600 dark:text-red-400">Failed to load projects. Please check your internet connection or try again later.</p>`;
  }
}

// Certifications Carousel buttons
const carousel = document.getElementById('certifications-carousel');
const prevButton = document.getElementById('carousel-prev');
const nextButton = document.getElementById('carousel-next');
function wireCarouselButtons() {
  if (!(prevButton && nextButton && carousel)) return;
  prevButton.addEventListener('click', () => {
    carousel.scrollBy({ left: -350, behavior: 'smooth' });
  });
  nextButton.addEventListener('click', () => {
    carousel.scrollBy({ left: 350, behavior: 'smooth' });
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  type();
  fetchGitHubProjects();
  wireCarouselButtons();
  setTheme(document.documentElement.classList.contains("dark"));
});
