const $template = document.createElement('template');
$template.innerHTML =
`
  <div class="comic-show">
    <div id="pages" class="pages">
        <div class="page">
          <img src="../images/hardworking/001.jpg">
        </div>
        <div class="page">
          <img src="../images/hardworking/002.jpg">
        </div>
        <div class="page">
          <img src="../images/hardworking/003.jpg">
        </div>
    </div>
  </div>
`

export default class ComicShow extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 

        // this.$leftPage = this.querySelector('.left-page');
        // this.$rightPage = this.querySelector('.right-page');

        // let url = window.location.href.toString();
        // let substr = url.substring(url.indexOf('?') + 1,url.length);        
        // let params = new URLSearchParams(substr);
        // let title = params.get("title");

        // this.$leftPage.src = `../images/${title}/001.jpg`
        // this.$rightPage.src = `../images/${title}/002.jpg`

        this.$pages = this.querySelectorAll(".page");
        console.log(this.$pages.length);
        
        for (let i = 0; i < this.$pages.length; i++) {
          let page = this.$pages[i];
          if (i % 2 === 0) {
            page.style.zIndex = this.$pages.length - i;
          }
        }
    }

    connectedCallback() {
      document.addEventListener("DOMContentLoaded", function () {
        for (let i = 0; i < this.$pages.length; i++) {
          //let page = this.$pages[i];
          this.$pages[i].pageNum = i + 1;
          this.$pages[i].onclick = function () {
            if (this.$pages[i].pageNum % 2 === 0) {
              this.$pages[i].classList.remove("flipped");
              this.$pages[i].previousElementSibling.classList.remove("flipped");
            } else {
              this.$pages[i].classList.add("flipped");
              this.$pages[i].nextElementSibling.classList.add("flipped");
            }
          };
        }
      });
    }
}

window.customElements.define('comic-show', ComicShow);

    // <img class="left-page" src="" alt="" />
    // <img class="right-page" src="" alt="" />