import { getComicByTitle } from "../models/comics.js";
import { authStateChanged, listenCurrentUser } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = `
    <div class="comic-thumbnail">
        <div class='title'></div>
        <img class="comic-image" src="" alt="" />
        <div class="action"></div>
    </div>
`;

export default class ComicThumbnail extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));      

        this.$title = this.querySelector('.title');
        this.$image = this.querySelector('img');
        this.$action = this.querySelector('.action')

        
    }

    static get observedAttributes() {
        return ['title','image','views','loves'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "title") {
            this.$title = newValue;
            this.$image.src = `../documents/${newValue}/images/1.jpg`
            this.$action.innerHTML = `<stats-bar title="${this.$title}"></stats-bar>`
        }
    }
}

window.customElements.define("comic-thumbnail", ComicThumbnail);