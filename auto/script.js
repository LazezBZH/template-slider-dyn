import List from "/List.js";
import Article from "/Article.js";

fetch("/data.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }

    return response.json();
  })
  .then(function (json) {
    let numberTodisplay = 3;
    let firstArticle = 0;
    let autoInterval = "";
    let totalArticles = json.articles.length;
    const autoStop = document.querySelector(".auto-stop");
    let auto = true;
    let timing = 1500;

    autoStop.addEventListener("click", setRun);

    function showNext() {
      if (firstArticle == totalArticles - 1) firstArticle = -1;
      firstArticle++;
      init();
    }

    function setRun() {
      auto = !auto;
      if (auto) {
        runAuto();
      } else if (!auto) {
        stopAuto();
      }
    }
    function runAuto() {
      auto = true;
      autoStop.innerHTML = `STOP`;
      autoStop.style.color = "red";
      autoInterval = setInterval(showNext, timing);
    }
    runAuto();

    function stopAuto() {
      auto = false;
      autoStop.innerHTML = `AUTO`;
      autoStop.style.color = "rgb(1, 175, 175)";
      clearInterval(autoInterval);
    }
    function init() {
      let list = new List();
      let articleArray = [];
      if (window.innerWidth > 800) {
        for (let i = firstArticle; i < firstArticle + numberTodisplay; i++) {
          let j = "";
          if (i < 0) {
            j = i + totalArticles;
            articleArray.push(j);
          } else if (i > totalArticles - 1) {
            j = i - totalArticles;
            articleArray.push(j);
          } else articleArray.push(i);
        }
        articleArray.forEach((element) => {
          let article = new Article(json.articles[element]);
          list.add(article);
        });

        list.displayArticles(list.all);
        const article = document.querySelectorAll(".article");
        article.forEach((art) => {
          art.classList.add("rotate");
          setTimeout(() => {
            art.classList.remove("rotate");
          }, "20");
        });

        const cards = document.querySelectorAll(".article");
        cards.forEach((element) => {
          element.addEventListener("mouseenter", stopAuto);
          element.addEventListener("mouseleave", runAuto);
        });
      } else {
        let articleAlone = new Article(json.articles[firstArticle]);
        list.add(articleAlone);
        list.displayArticles(list.all);
        const article = document.querySelector(".article");
        article.classList.add("rotate");
        setTimeout(() => {
          article.classList.remove("rotate");
        }, "20");
      }
    }
    init();
  });
