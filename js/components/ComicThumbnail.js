const $template = document.createElement("template");
$template.innerHTML = `
    <div class="comic-thumbnail">
        <div class='title'></div>
        <img class="comic-image" src="" alt="" />
        <div class="action">
            <div class="stats">
              <i class="fas fa-eye"></i><span class="view-count">100</span>
              <i class="fas fa-heart"></i><span class="heart-count">10</span>
            </div>
        </div>
    </div>
`;

export default class ComicThumbnail extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));      

        this.$title = this.querySelector('.title');
        this.$image = this.querySelector('img');
        this.$viewCount = this.querySelector('.view-count');
        this.$heartCount = this.querySelector('.heart-count');
    }

    static get observedAttributes() {
        return ['title','image','views','loves'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "title") {
            this.$title = newValue;
            this.$image.src = `../images/${newValue}/001.jpg`
        }
    }

    
}

window.customElements.define("comic-thumbnail", ComicThumbnail);