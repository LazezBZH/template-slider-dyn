import List from "/List.js";
import Article from "/Article.js";

fetch("data.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    console.log(response.json);
    return response.json();
  })
  .then(function (json) {
    let currentPage = 1;
    let numberTodisplay = 3;
    let totalArticles = json.articles.length;
    let firstArticle = 0;
    let lastArticle = 2;
    let numberOfPages = Math.ceil(totalArticles / numberTodisplay);

    const currentPageDisplay = document.querySelector(".current-page");
    const numberOfPagesDisplay = document.querySelector(".number-pages");
    const next = document.querySelector(".next");
    const previous = document.querySelector(".previous");

    currentPageDisplay.innerHTML = currentPage;
    numberOfPagesDisplay.innerHTML = numberOfPages;

    let articleArray = [];

    next.addEventListener("click", goNext);
    previous.addEventListener("click", goPrevious);

    function goNext() {
      if (currentPage === numberOfPages) {
        currentPage = 0;
      }
      currentPage = currentPage + 1;
      currentPageDisplay.innerHTML = currentPage;
      firstArticle = (currentPage - 1) * numberTodisplay;
      lastArticle = Math.min(
        totalArticles - 1,
        currentPage * (numberTodisplay - 1)
      );
      articleArray = [];
      displayAll();
    }
    function goPrevious() {
      if (currentPage === 1) {
        currentPage = numberOfPages + 1;
      }
      currentPage = currentPage - 1;
      console.log(currentPage);
      currentPageDisplay.innerHTML = currentPage;
      firstArticle = (currentPage - 1) * numberTodisplay;
      lastArticle = Math.min(
        totalArticles - 1,
        currentPage * (numberTodisplay - 1)
      );
      articleArray = [];
      displayAll();
    }

    function displayAll() {
      let list = new List();

      for (let i = firstArticle; i <= lastArticle; i++) {
        articleArray.push(i);
        console.log(articleArray);
      }
      articleArray.forEach((element) => {
        let article = new Article(json.articles[element]);
        list.add(article);
      });

      list.displayArticles(list.all);
      console.log(list.all);
    }
    displayAll();
  });
