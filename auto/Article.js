export default class Article {
  constructor(data) {
    this.src = data.src;
    this.url = data.url;
    this.year = data.year;
    this.desc = data.desc;
    this.alt = data.alt;
  }
  render() {
    return `
       <article class="article">
           
            <a href=${this.url} target="_blank">
            <figure>
                <img src=${this.src} alt=${this.alt} />
                <figcaption>
                    <p class="year">- ${this.year} -</p>
                    <p class="desc">${this.desc}</p>
                </figcaption>
            </figure>
            </a>
        
      </article>`;
  }
}
