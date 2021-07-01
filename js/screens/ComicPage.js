import CollectionPage from "./CollectionPage.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="comic-page">
    <img class="logo" src="./images/logo.png">
    <div class="body-container">
        <div class="title" id="comic-title"></div>
        
    </div>
    </div> 
`;

export default class ComicPage extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));      
        
        this.$logo = this.querySelector('.logo');
        this.$title = this.querySelector('.title');
    }

    get title() {
        return this.$title.toUpperCase();
    }
    
    set title(value) {
        this.setAttribute('title', value);
    }

    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'title') {
            this.$title.innerHTML = newValue;
        }
    }

    connectedCallback() {
        this.$logo.addEventListener('click', () => {
            router.navigate('/home');
        })
    }    
}

window.customElements.define('comic-page', ComicPage);