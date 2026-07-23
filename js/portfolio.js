// imports
import { projects } from "./projects.js";

// constants
const projectsGrid = document.getElementById("projects-grid");

// functions
function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  // If there's a link, make the card clickable.
  // external: true opens in a new tab (attachments / off-site); internal pages
  // open in the same tab.
  if (project.link && project.link !== "#") {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      if (project.external) {
        window.open(project.link, "_blank");
      } else {
        window.location.href = project.link;
      }
    });
  }

  const imageContainer = document.createElement("div");
  imageContainer.className = "project-image-container";

  if (project.image && project.image !== "") {
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;
    img.className = "project-image";
    imageContainer.appendChild(img);
  } else {
    // Placeholder for projects without images
    const placeholder = document.createElement("div");
    placeholder.className = "project-placeholder";
    placeholder.textContent = "🎨";
    imageContainer.appendChild(placeholder);
  }

  const category = document.createElement("div");
  category.className = "project-category";
  category.textContent = project.category;

  const title = document.createElement("h3");
  title.className = "project-title";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description;

  card.appendChild(imageContainer);
  card.appendChild(category);
  card.appendChild(title);
  card.appendChild(description);

  return card;
}

function renderProjects() {
  projects.forEach((project) => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
}

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Initialize
renderProjects();
