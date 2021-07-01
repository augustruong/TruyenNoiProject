import ComicPage from "./ComicPage.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="collection-page">
        <img class="logo" src="./images/logo.png">
        <div class="body-container">
            <div class="title">DANH SÁCH TRUYỆN</div>
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
        
        this.$logo = this.querySelector('.logo');
        this.$comicCollection = this.querySelector('.comic-collection');
    }

    connectedCallback() {
        this.$logo.addEventListener('click', () => {
            router.navigate('/home');
        })

        this.$comicCollection.addEventListener('click', (e) => {
            if (e.target.tagName == 'DIV') { 
                this.$chosenTitle = e.target.parentNode.parentNode.title;
                router.navigate('/comic');   
                //document.getElementById('comic-title').setAttribute('title',this.$chosenTitle)    
            }  
        })
    }    
}

window.customElements.define('collection-page', CollectionPage);