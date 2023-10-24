// imports
import { links } from "./links.js";
//constants

const linkContainer = document.getElementById("links");

//functions

function addLink(name, link, image) {
  return `
  <a href="${link}" class="link" target="blank">
    <img src="${image}"/>
    <span>${name}  </span>
    <img class="linkIcon" src="./assets/link-solid.svg" alt=""/>
  </a>
  `;
}

// logic

let allLinks = "";

links.forEach((ele) => {
  let link = ele.link;
  let name = ele.name;
  let image = ele.image;

  allLinks += addLink(name, link, image);
});

linkContainer.innerHTML = allLinks;