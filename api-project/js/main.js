import "../styles/style.css";

const URL = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=8e9bab4593cb4aa5beeca8173fc5b948";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const articles = await response.json(); 
    function displayArticles() {
      articles.forEach((article) => {
        document.getElementById("api-response").insertAdjacentHTML(
          "afterbegin",
          `<div class= "article-card" id="${article.title}">
          <div class="article-imgBox">
          <h3 class= "article-title">${article.title}</h3>
                <img class="article-img" src=${article.imageUrl} alt="${article.title}"></div>
                <div class="article-info">             
                <h3 class="article-info">${article.author}</h3>
                <h3 class="article-info">${article.publishedAt}</h3>
                <h3 class="article-info">${article.content}</h3>
                <h5 class="article-link"><a href="${articles.url}"</a></h5></div>  
            </div>`
        );
      });
    }
    displayArticles();
  } catch (error) {
    console.log(error);
    alert("An error occured");
  }
}
getData(URL);