import { getAllComics,getComicByTitle } from "../models/comics.js";

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
    }

    connectedCallback() {
        async function renderCollection(collection) {
            let str='';
            let response = await getAllComics();

            response.forEach((comic) => {
                str += `<comic-thumbnail title="${comic.id}"></comic-thumbnail>`
            })
            collection.innerHTML = str;
        }

        renderCollection(this.$comicCollection);

        this.$comicCollection.addEventListener('click', async (e) => {
            if (e.target.tagName == 'DIV') { 
                this.$chosenTitle = e.target.parentNode.parentNode.title;
                let comic = await getComicByTitle(this.$chosenTitle);
                // +1 view
                let viewCount = ++comic.viewCount;
                await firebase.firestore().collection('comics').doc(this.$chosenTitle).update({viewCount: viewCount});

                router.navigate(`/comic?title=${this.$chosenTitle}`);  
            }  
        })
    }    
}

window.customElements.define('collection-page', CollectionPage);