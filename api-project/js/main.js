import "../styles/style.css";
const URL = "https://dictionaryapi.dev/";

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
