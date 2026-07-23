// Renders the Writing & Zines grids on writing.html
import { featured, others } from "./writing.js";

function createWritingCard(item) {
  const card = document.createElement("div");
  card.className = "project-card";

  if (item.link && item.link !== "#") {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      if (item.external) {
        window.open(item.link, "_blank");
      } else {
        window.location.href = item.link;
      }
    });
  }

  const imageContainer = document.createElement("div");
  imageContainer.className = "project-image-container";

  if (item.image && item.image !== "") {
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.className = "project-image";
    imageContainer.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "project-placeholder";
    placeholder.textContent = "📄";
    imageContainer.appendChild(placeholder);
  }

  const category = document.createElement("div");
  category.className = "project-category";
  category.textContent = item.category;

  const title = document.createElement("h3");
  title.className = "project-title";
  title.textContent = item.title;

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = item.description;

  card.appendChild(imageContainer);
  card.appendChild(category);
  card.appendChild(title);
  card.appendChild(description);

  return card;
}

function renderInto(id, items) {
  const grid = document.getElementById(id);
  if (!grid) return;
  items.forEach((item) => grid.appendChild(createWritingCard(item)));
}

renderInto("featured-grid", featured);
renderInto("others-grid", others);
