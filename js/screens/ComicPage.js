import CollectionPage from "./CollectionPage.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="comic-page">
        <comic-show></comic-show>
    </div> 
`;

export default class ComicPage extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));      
        
        this.$title = this.querySelector('.title');

        // let url = window.location.href.toString();
        // let substr = url.substring(url.indexOf('?') + 1,url.length);        
        // let params = new URLSearchParams(substr);
        // let title = params.get("title");

        
        //this.$title.innerHTML = title;
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
}

window.customElements.define('comic-page', ComicPage);