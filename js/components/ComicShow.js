import { getComicByTitle } from "../models/comics.js";
import { getTitle, play, pause } from "../utils.js";

const $template = document.createElement('template');
$template.innerHTML =`
  <div class="comic-show">
    <div id="pages" class="pages"> 
    </div>
    <audio id="flipping-sound" src="../audio/page-flip.mp3"></audio>
  </div>

  <tool-bar id="toolBar"></tool-bar>
`

export default class ComicShow extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 

        this.$title = getTitle();
        this.$toolBar = this.querySelector('#toolBar');
        this.$toolBar.setAttribute('title',this.$title);
       

        this.$pages = this.querySelector('#pages');
    }

    connectedCallback() {
      async function renderComicPages(title,pages) {
        let audioContainer = document.querySelector(".audio-container");
        let playBtn = document.querySelector("#play-btn");
        let audio = document.querySelector('#audio');
        let timestamp = document.querySelector('#timestamp');
        let flippingSound = document.querySelector('#flipping-sound');

        let comic = await getComicByTitle(title);
        for (let i = 0; i < comic.pageNumber; i++) {
          let newPage = document.createElement('img');
          if (i<9) {
            pages.innerHTML += `<img class="page" src="../documents/${title}/images/00${i+1}.jpg">`
          } else {
            pages.innerHTML += `<img class="page" src="../documents/${title}/images/0${i+1}.jpg">`
          }
        }

        //play the first page
        setTimeout(()=>{
          audio.src = `../documents/${title}/audios/001.mp3`;
          play(audioContainer, audio, playBtn);
          audio.onended = function() {
            pause(audioContainer, audio, playBtn);
          }
        },1000);
                
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
            //Flipping book sound effect
            flippingSound.play();
            audio.pause();

            let audioFiles = [];
            
            if (this.pageNum % 2 === 0) {
              if (this.pageNum == 2) {
                audioFiles.push(`../documents/${title}/audios/001.mp3`);
              } else {
                audioFiles.push(`../documents/${title}/audios/00${this.pageNum-2}.mp3`);
                audioFiles.push(`../documents/${title}/audios/00${this.pageNum-1}.mp3`);
              }
              this.classList.remove("flipped");
              this.previousElementSibling.classList.remove("flipped");
            } else {
              audioFiles.push(`../documents/${title}/audios/00${this.pageNum+1}.mp3`);
              audioFiles.push(`../documents/${title}/audios/00${this.pageNum+2}.mp3`);
              this.classList.add("flipped");
              this.nextElementSibling.classList.add("flipped");
            }
            
            setTimeout(()=>{
              //play
              let i = 0;
              // once the player ends, play the next one
              audio.onended = function() {
                i++;
                  if (i >= audioFiles.length) {
                      // end 
                      pause(audioContainer, audio, playBtn);
                      return;
                  }
                audio.src = audioFiles[i];
                play(audioContainer, audio, playBtn);
              };

              audio.src = audioFiles[i];
              play(audioContainer, audio, playBtn);
            },1000);
            
          };
        }
      }

      renderComicPages(this.$title,this.$pages);  
    }
}

window.customElements.define('comic-show', ComicShow);

