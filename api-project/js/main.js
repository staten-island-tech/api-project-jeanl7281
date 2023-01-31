import "../styles/style.css";

const objectID = x;
const URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + [objectID];

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const {} = await response.json();

    function displaydef() {
      forEach((word) => {
        document.getElementById("api-response").insertAdjacentElement(
          "afterbegin",
          `<div class="def-card"
          id="${word.word}">
          <div class="definition"
          id=${word.definition}">
          <div class="partOfSpeech"
          id="${word.partOfSpeech}
          <div class="examples" id="${word.example}"></div>
          `
        );
      });
    }
    displaydef();
  } catch (error) {
    console.log(error);
    alert("An error occured");
  }
}
getData(URL);
