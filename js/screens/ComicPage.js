import CollectionPage from "./CollectionPage.js";
import { getTitle } from "../utils.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="comic-page">
        <div class="back-btn">
        <i class="fas fa-chevron-left"></i><span class="back-text">Back To Collection</span>
        </div>

        <div class="comic-container"></div>
        
    </div> 
`;

export default class ComicPage extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));      
        
        this.$comicContainer = this.querySelector('.comic-container');
        this.$backBtn = this.querySelector('.back-btn');
        this.$title = getTitle();

        this.$comicContainer.innerHTML = `
            <stats-bar title="${this.$title}"></stats-bar>
            <comic-show></comic-show>`
    } 

    connectedCallback() {
        this.$backBtn.addEventListener('click', () => {
            router.navigate(`/collection`);   
        })
    
    }
}

window.customElements.define('comic-page', ComicPage);