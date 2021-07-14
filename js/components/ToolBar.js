import { getComicByTitle } from "../models/comics.js";

const $template = document.createElement('template');
$template.innerHTML =
`
    <div class="tool-bar-wrapper">
        <div class="tool-bar-items">
            <button id="play-btn">
                <i class="fas fa-play"></i>
            </button>
            
            <button id="volume-btn">
                <i class="fas fa-volume-up"></i>
                <input
                type="range"
                id="slider"
                step="0.5"
                value="5"
                min="1"
                max="10"
                />
            </button>
        </div>

        <div class="audio-container">
            <div class="audio-info">
                <h4 id="audio-title"></h4>
                <div class="progress-container">
                    <div class="progress"></div>
                </div>
            </div>
        </div>
        <audio id="audio"></audio>

        <div class="tool-bar-items">
            <div id="timestamp">0:15/2:00</div>
            <button id="expand-btn">
            <i class="fas fa-expand"></i>
            </button>
        </div>
    </div>
`;

export default class ToolBar extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 
        
        this.$audioContainer = this.querySelector(".audio-container");
        this.$volumeBtn = this.querySelector("#volume-btn");
        this.$playBtn = this.querySelector("#play-btn");
        this.$expandBtn = this.querySelector("#expand-btn");
        this.$audioTitle = this.querySelector("#audio-title");
        this.$audio = this.querySelector("#audio");
        this.$progress = this.querySelector(".progress");
        this.$progressContainer = this.querySelector(".progress-container");
    
        
    }

    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "title") {
           this.$title = newValue; 
           this.$audioTitle.innerText = newValue;
        }
    }

    connectedCallback() {
        //load audio
        this.$audio.src = "../audio/ukulele.mp3";

        async function loadAudioFiles(title) {
            //load audio files
            let audioFiles = [];
            let comic = await getComicByTitle(title);
            let audioNum = comic.pageNumber - 1;

            for (let i = 0; i < audioNum; i++) {
                audioFiles.push(`../documents/${title}/audios/00${i+1}`);
            }

            // let i = 0;
            // audioContainer.onended = function() {
            //     i++;
            //     if (i >= audioFiles.length) {
            //         // end 
            //         return;
            //     }
            //     play(i);
            // } 
        }

        //play function
        // function play(i) {
        //     if (i<10) {
        //         this.$audio.src = `../documents/${title}/audios/00${i}`
        //     } else {
        //         this.$audio.src = `../documents/${title}/audios/0${i}`
        //     }
            
        // }

        //play/pause Btn
        this.$playBtn.addEventListener("click", () => {
            let isPlaying = this.$audioContainer.classList.contains("play");
        
            if (isPlaying) {
                //pauseAudio();
                this.$audioContainer.classList.remove("play");
                this.$playBtn.querySelector("i.fas").classList.remove("fa-pause");
                this.$playBtn.querySelector("i.fas").classList.add("fa-play");
                this.$audio.pause();
            } else {
                //playAudio();
                this.$audioContainer.classList.add("play");
                this.$playBtn.querySelector("i.fas").classList.remove("fa-play");
                this.$playBtn.querySelector("i.fas").classList.add("fa-pause");
                this.$audio.play();
            }
         });

        this.$audio.addEventListener("timeupdate", (e) => { //updateProgress
            let { duration, currentTime } = e.srcElement;
            let progressPercent = (currentTime / duration) * 100;
            this.$progress.style.width = `${progressPercent}%`;
        });

        this.$progressContainer.addEventListener("click",(e) => { //setProgress
            let width = e.target.clientWidth;
            let clickX = e.offsetX;
            let duration = this.$audio.duration;
            this.$audio.currentTime = (clickX / width) * duration;
        });

        //Volumn adjustment
        this.$volumeBtn.addEventListener("click", () => {
            const isMute = this.$audioContainer.classList.contains("mute");
            if (isMute) {
                //unMuteAudio();
                this.$audioContainer.classList.remove("mute");
                this.$volumeBtn.querySelector("i.fas").classList.remove("fa-volume-mute");
                this.$volumeBtn.querySelector("i.fas").classList.add("fa-volume-up");
              
                let currentAudio = document.getElementById("audio");
                currentAudio.muted = false;
            } else {
                //muteAudio();
                this.$audioContainer.classList.add("mute");
                this.$volumeBtn.querySelector("i.fas").classList.remove("fa-volume-up");
                this.$volumeBtn.querySelector("i.fas").classList.add("fa-volume-mute");

                let currentAudio = document.getElementById("audio");
                currentAudio.muted = true;
            }
          });
    }
}

window.customElements.define('tool-bar', ToolBar);
