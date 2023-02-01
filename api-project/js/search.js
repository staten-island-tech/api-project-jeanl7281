import "../styles/style.css";

const DOMSelectors = {
  searchForm: document.querySelector(".search-form"),
  searchInput: document.querySelector(".search-bar"),
  searchResults: document.querySelector(".searched-article"),
  emptyInput: document.querySelector(".empty-input"),
  articleUnfound: document.querySelector(".article-not-found"),
  errorSection: document.querySelector(".errors"),
  resultSection: document.querySelector(".searching-results"),
};

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    DOMSelectors.searchResults.innerHTML = "";
    const searchParams = DOMSelectors.searchInput.value.trim();
    const searchQuery = async function () {
      try {
        const response = await fetch("https://newsapi.org/v2/everything?domains=wsj.com&apiKey=8e9bab4593cb4aa5beeca8173fc5b948");
        const articles = await response.json();
        const results = articles.results;

        function checkForBlanks() {
          if (searchParams === "") {
            DOMSelectors.resultSection.classList.add("hidden");
            DOMSelectors.emptyInput.classList.remove("hidden");
          } else {
            DOMSelectors.resultSection.classList.remove("hidden");
            DOMSelectors.emptyInput.classList.add("hidden");
          }
        }
        checkForBlanks();

        function noResults() {
          if (articles.num_results === 0) {
            DOMSelectors.articleUnfound.classList.remove("hidden");
          } else {
            DOMSelectors.articleUnfound.classList.add("hidden");
          }
        }
        noResults();

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
                    <h5 class="article-link"><a href="${article.url}"</a></h5></div>  
                </div>`
            );
          });
        }
        displayArticles();
      } catch (error) {
        console.log(error);
        alert("Search Error Occured, Please Try Again Later.");
      }
    };
    searchQuery();
  });
};
listen();