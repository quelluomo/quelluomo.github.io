// Theme management with localStorage persistence

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const html = document.documentElement;

// Get saved theme from localStorage or default to light
const savedTheme = localStorage.getItem("theme") || "light";

// Apply saved theme on page load
if (savedTheme === "dark") {
  html.setAttribute("data-theme", "dark");
  if (themeIcon) themeIcon.textContent = "☀️";
}

// Toggle theme function
function toggleTheme() {
  const currentTheme = html.getAttribute("data-theme");

  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    if (themeIcon) themeIcon.textContent = "🌙";
  } else {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    if (themeIcon) themeIcon.textContent = "☀️";
  }
}

// Add click event listener to theme toggle button
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

// Listen for system theme preference changes
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
darkModeMediaQuery.addEventListener("change", (e) => {
  // Only auto-switch if user hasn't manually set a preference
  if (!localStorage.getItem("theme")) {
    if (e.matches) {
      html.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "☀️";
    } else {
      html.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.textContent = "🌙";
    }
  }
});
