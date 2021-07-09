import { getAllComics } from "../models/collection.js";
import ComicPage from "./ComicPage.js";


const $template = document.createElement('template');
$template.innerHTML = `
    <div class="collection-page">
        <div class="body-container">
            <div class="title" style="color:white">DANH SÁCH TRUYỆN</div>
            <div id="comic-collection"></div>
        </div>
    </div> 
`;

export default class CollectionPage extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));      
        
        this.$comicCollection = this.querySelector('#comic-collection');

        async function getCollectionData(collection) {
            let str='';
            let response = await getAllComics();

            response.forEach((element) => {
                str += `<comic-thumbnail title="${element.id}"></comic-thumbnail>`
            })
            collection.innerHTML = str;
        }

        getCollectionData(this.$comicCollection);
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