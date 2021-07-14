import { getComicByTitle } from "../models/comics.js";
import { getTitle } from "../utils.js";

const $template = document.createElement('template');
$template.innerHTML =`
  <div class="comic-show">
    <div id="pages" class="pages"> 
    </div>
  </div>


`

export default class ComicShow extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 

        this.$title = getTitle();

        this.$pages = this.querySelector('#pages');
    }

    connectedCallback() {
      async function renderComicPages(title,pages) {
        let comic = await getComicByTitle(title);
        for (let i = 0; i < comic.pageNumber; i++) {
          let newPage = document.createElement('img');
          if (i<9) {
            pages.innerHTML += `<img class="page" src="../documents/${title}/images/00${i+1}.jpg">`
          } else {
            pages.innerHTML += `<img class="page" src="../documents/${title}/images/0${i+1}.jpg">`
          }
        }
        
        //flip pages
        pages = document.getElementsByClassName("page");

        for (let i = 0; i < comic.pageNumber; i++) {
          let page = pages[i];
          if (i % 2 === 0) {
            page.style.zIndex = comic.pageNumber - i;
          }
        }

        for (let i = 0; i < pages.length; i++) {
          pages[i].pageNum = i + 1;
          pages[i].onclick = function () {
            // if (i<9) {
            //   console.log(`../documents/${title}/audios/00${i+2}`);
            // }else{
            //   console.log(`../documents/${title}/audios/0${i+2}`);
            // }
            if (this.pageNum % 2 === 0) {
              if (this.pageNum == 2) {console.log(this.pageNum-1);}
              else {console.log(this.pageNum-2);}

              this.classList.remove("flipped");
              this.previousElementSibling.classList.remove("flipped");
            } else {
              console.log(this.pageNum+1);
              this.classList.add("flipped");
              this.nextElementSibling.classList.add("flipped");
            }
            
          };
        }
      }

      renderComicPages(this.$title,this.$pages);  
    }
}

window.customElements.define('comic-show', ComicShow);

 