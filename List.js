const root = document.getElementById("root");

import Article from "/Article.js";
export default class List {
  constructor() {
    this.all = [];
  }
  add(article) {
    this.all.push(article);
  }

  displayArticles(articles) {
    let html = "";
    console.log("coucou", articles);
    for (let i = 0; i < articles.length; i++) {
      let article = new Article(articles[i]);
      html += article.render();
    }
    root.innerHTML = html;
  }
}
