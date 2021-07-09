import { getComicById } from "../models/collection.js";

const $template = document.createElement('template');
$template.innerHTML =
`
  <div class="comic-show">
    <div id="pages" class="pages"> 
    </div>
  </div>
`

export default class ComicShow extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 

        let url = window.location.href.toString();
        let substr = url.substring(url.indexOf('?') + 1,url.length);        
        let params = new URLSearchParams(substr);
        let title = params.get("title");

        this.$pages = this.querySelector('#pages');

       
        async function getComicPages(id,pages) {
          //let str = '';
          let comic = await getComicById(id);
          for (let i = 0; i < comic.pageNumber; i++) {
            let newPage = document.createElement('img');
            newPage.classList.add("page");
            newPage.src = `../documents/${title}/images/${i+1}.jpg`
            pages.appendChild(newPage);
            //str += `<img class="page" src="../documents/${title}/images/${i+1}.jpg">`
          }
          //pages.innerHTML = str;
          console.log(pages);
        }

        getComicPages(title,this.$pages);       
        // let str='';
        // for (let i = 0; i < 8; i++) {
        //   str += `<img class="page" src="../documents/${title}/images/${i+1}.jpg">`
        // }
        // this.$pages.innerHTML = str;

        console.log(this.$pages);
    }

    connectedCallback() {
      document.addEventListener("DOMContentLoaded", function () {
        let pages = document.getElementsByClassName("page");
        console.log(pages);
        console.log(pages.length);

        for (let i = 0; i < pages.length; i++) {
          let page = pages[i];
          if (i % 2 === 0) {
            page.style.zIndex = pages.length - i;
          }
        }

        for (let i = 0; i < pages.length; i++) {
          pages[i].pageNum = i + 1;
          pages[i].onclick = function () {
            if (this.pageNum % 2 === 0) {
              this.classList.remove("flipped");
              this.previousElementSibling.classList.remove("flipped");
            } else {
              this.classList.add("flipped");
              this.nextElementSibling.classList.add("flipped");
            }
          };
        }
      });
    }
}

window.customElements.define('comic-show', ComicShow);

    // <img class="left-page" src="" alt="" />
    // <img class="right-page" src="" alt="" />