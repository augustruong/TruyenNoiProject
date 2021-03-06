import { getTitle } from "../utils.js";
import { authStateChanged, listenCurrentUser } from "../models/user.js";
import { getComicByTitle } from "../models/comics.js";

const $template = document.createElement('template');
$template.innerHTML =`
    <div class="stats-bar">
        <i class="fas fa-eye"></i><span class="view-count"></span>
        <i class="fas fa-heart"></i><span class="heart-count"></span>
    </div>
`;

export default class StatsBar extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 

        this.$viewCount = this.querySelector('.view-count');
        this.$heartCount = this.querySelector('.heart-count');
        this.$heart = this.querySelector('.fa-heart');
    } 

    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "title") {
           this.$title = newValue;
        }
    }

    connectedCallback() {
        async function renderStats(title,viewCount,heartCount) {
            let comic = await getComicByTitle(title);
            viewCount.innerHTML = `${comic.viewCount}`;
            heartCount.innerHTML = `${comic.heartCount}`;
        }
        renderStats(this.$title,this.$viewCount,this.$heartCount);

        //check favorite
        authStateChanged((user) => {
            if (user) {
                let currentUser = firebase.auth().currentUser;
                this.$currentUserId = currentUser.uid;

                listenCurrentUser((user) => {
                    if (user.favorite.includes(`${this.$title}`)) {
                        this.$heart.classList.add('loved');
                    }  
                })
            } else {

            }
        })
        this.$heart.addEventListener('click', async() => {
            if (this.$currentUserId) {
                let comic = await getComicByTitle(this.$title);
                let usersRef = await firebase.firestore().collection('users').doc(this.$currentUserId);
                
                let comicsRef = await firebase.firestore().collection('comics').doc(this.$title);
                let heartCount; 
                if (this.$heart.classList.contains('loved')) {
                    // --love
                    this.$heart.classList.remove('loved');
                    heartCount = --comic.heartCount;
    
                    //remove fromfavorite of user
                    usersRef.update({
                        favorite: firebase.firestore.FieldValue.arrayRemove(`${this.$title}`)
                    });
    
                } else {
                    // ++love
                    this.$heart.classList.add('loved');
                    heartCount = ++comic.heartCount;
    
                    //add to favorite of user
                    usersRef.update({
                        favorite: firebase.firestore.FieldValue.arrayUnion(`${this.$title}`)
                    });
                }
                this.$heartCount.innerHTML = `${heartCount}`
                comicsRef.update({heartCount: heartCount});
            } else {
                alert('Quay l???i trang ch??? ????ng nh???p ??i r???i m???i th??ch ???????c')
            }
            
        })
    }
}

window.customElements.define('stats-bar', StatsBar);