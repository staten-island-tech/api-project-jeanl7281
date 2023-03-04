import "../styles/style.css";
import "./api.js";
import { DOMselectors } from "./dom";
import { brawl } from "./api.js";

function say(name) {
  const sayPromise = new Promise(function (resolve, reject) {
    resolve(`hello ${name}`);
  });
  return sayPromise;
}

const John = say("John");
console.log(John);
John.then((value) => {
  console.log(value);
}); 

const filters = {
  removeCards: function () {
    const cards = document.querySelectorAll(".child");
    const cardsArray = Array.from(cards);
    cardsArray.forEach((cards) => {
      cards.remove();
    });
  },

  filterRarities: async function (cardName) {
    const response = await fetch(brawl);
    const data = await response.json();
    data.list
      .filter((character) => character.rarity.name.includes(cardName))
      .forEach((character) => {
        DOMselectors.parent.insertAdjacentHTML(
          "beforeend",
          `<div id="parent"><sub class="child" > <h2 class="name">${character.name}</h2> <img class="img" src="${character.imageUrl}" alt="Portrait Image of ${character.name} in game" > <h3 class="desc">${character.description}</h3> <a href="${character.link}"><button class="stats " confirm("Do you want to leave this page?")>Statistics</button></a></sub> </div>`
        );
      });
  },
  filterExact: async function (cardName) {
    const response = await fetch(brawl);
    const data = await response.json();
    data.list
      .filter((character) => character.rarity.name === cardName)
      .forEach((character) => {
        DOMselectors.parent.insertAdjacentHTML(
          "beforeend",
          `<div id="parent"><sub class="child" > <h2 class="name">${character.name}</h2> <img class="img" src="${character.imageUrl}" alt="Portrait Image of ${character.name} in game" > <h3 class="desc">${character.description}</h3> <a href="${character.link}"><button class="stats " confirm("Do you want to leave this page?")>Statistics</button></a></sub> </div>`
        );
      });
  },
};

const functions = {
  display: async function (brawl) {
    const response = await fetch(brawl);
    const data = await response.json();
    data.list.forEach((character) => {
      DOMselectors.parent.insertAdjacentHTML(
        "beforeend",
        `<div id="parent"><sub class="child" > <h2 class="name">${character.name}</h2> <img class="img" src="${character.imageUrl}" alt="Portrait Image of ${character.name} in game"> <h3 class="desc">${character.description}</h3> <a href="${character.link}" target = "_blank" rel="r"><button class="stats" onClick = "confirmFunction()">Statistics</button></a></sub> </div>`
      );
    });
  },

  all: DOMselectors.allBtn.addEventListener("click", function () {
    filters.removeCards();
    functions.display(brawl);
  }),
  chromatics: DOMselectors.chromaticBtn.addEventListener("click", function () {
    filters.removeCards();
    filters.filterRarities("Chromatic");
  }),
  legendaries: DOMselectors.legendaryBtn.addEventListener("click", function () {
    filters.removeCards();
    filters.filterRarities("Legendary");
  }),
  mythics: DOMselectors.mythicBtn.addEventListener("click", function () {
    filters.removeCards();
    filters.filterRarities("Mythic");
  }),
  epics: DOMselectors.epicBtn.addEventListener("click", function () {
    filters.removeCards();
    filters.filterRarities("Epic");
  }),
  superRares: DOMselectors.superRareBtn.addEventListener("click", function () {
    filters.removeCards();
    filters.filterRarities("Super Rare");
  }),
  rares: DOMselectors.rareBtn.addEventListener("click", function () {
    filters.removeCards();
    filters.filterExact("Rare");
  }),
};

functions.display(brawl);
