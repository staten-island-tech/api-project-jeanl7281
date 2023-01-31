import "../styles/style.css";

const objectID = x;
const URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + [objectID];

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    alert("An error occured");
  }
}
getData(URL);
