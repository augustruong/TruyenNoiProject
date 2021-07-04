const $template = document.createElement('template');
$template.innerHTML =
   `<div class="back-btn">
      <i class="fas fa-chevron-left"></i><span class="back-text">Back To Collection</span>
    </div>

    <div class="audio-container">
      <div class="comic-content">
        <img class="left-page" src="" alt="" />
        <img class="right-page" src="" alt="" />
      </div>

      <div class="footer">
        <div class="stats">
          <span class="view-count"> <i class="fas fa-eye"></i>1000 View </span>
          <span class="heart-count">
            <i class="fas fa-heart"></i>1000 Likes</span
          >
        </div>

        <div class="music-container">
          <div class="music-info">
            <h4 id="title">Ukelele</h4>
            <div class="progress-container">
              <div class="progress"></div>
            </div>
          </div>
        </div>
        <audio src="./music/ukulele.mp3" id="audio"></audio>

        <div class="tool-bar">
          <a id="volume">
            <i class="fas fa-volume-up"></i>
            <input type="range" id="slider" />
          </a>
          <a id="reload">
            <i class="fas fa-undo-alt"></i>
          </a>
          <a id="play">
            <i class="fas fa-play"></i>
          </a>
          <a id="expand">
            <i class="fas fa-expand"></i>
          </a>
        </div>
      </div>
    </div>
`

export default class ComicShow extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 

        this.$leftPage = this.querySelector('.left-page');
        this.$rightPage = this.querySelector('.right-page');

        this.$backBtn = this.querySelector('.back-btn')

        let url = window.location.href.toString();
        let substr = url.substring(url.indexOf('?') + 1,url.length);        
        let params = new URLSearchParams(substr);
        let title = params.get("title");

        this.$leftPage.src = `../images/${title}/001.jpg`
        this.$rightPage.src = `../images/${title}/002.jpg`
    }

    connectedCallback() {
        this.$backBtn.addEventListener('click', () => {
            router.navigate(`/collection`);   
        })
    }
}

window.customElements.define('comic-show', ComicShow);