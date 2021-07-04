import ComicPage from "./ComicPage.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="collection-page">
        <div class="body-container">
            <div class="title" style="color:white">DANH SÁCH TRUYỆN</div>
            <div class="comic-collection">
                <comic-thumbnail title="hardworking"></comic-thumbnail>
                <comic-thumbnail title="nature"></comic-thumbnail>
                <comic-thumbnail title="patient"></comic-thumbnail>
                <comic-thumbnail title="sincere"></comic-thumbnail>
            </div>
        </div>
    </div> 
`;

export default class CollectionPage extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));      
        
        this.$comicCollection = this.querySelector('.comic-collection');
    }

    connectedCallback() {
        this.$comicCollection.addEventListener('click', (e) => {
            if (e.target.tagName == 'DIV') { 
                this.$chosenTitle = e.target.parentNode.parentNode.title;
                //console.log(this.$chosenTitle);
                router.navigate(`/comic?title=${this.$chosenTitle}`);   
            }  
        })
    }    
}

window.customElements.define('collection-page', CollectionPage);