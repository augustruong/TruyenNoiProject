import { getComicByTitle } from "../models/comics.js";
import { play, pause } from "../utils.js";

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
                <input type="range" id="slider" step="0.5" value="5" min="1" max="100"/>
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
        <audio id="audio" autoplay="true"></audio>

        <div class="tool-bar-items">
            <div id="timestamp"></div>
            
        </div>
    </div>
`;

export default class ToolBar extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 
        
        this.$audioContainer = this.querySelector(".audio-container");
        this.$volumeBtn = this.querySelector(".fa-volume-up");
        this.$volSlider = this.querySelector('#slider');
        this.$playBtn = this.querySelector("#play-btn");
        this.$expandBtn = this.querySelector("#expand-btn");
        this.$audioTitle = this.querySelector("#audio-title");
        this.$audio = this.querySelector("#audio");
        this.$progress = this.querySelector(".progress");
        this.$progressContainer = this.querySelector(".progress-container");
        this.$timestamp = this.querySelector('#timestamp'); 
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
        //play/pause Btn
        this.$playBtn.addEventListener("click", () => {
            let isPlaying = this.$audioContainer.classList.contains("play");
        
            if (isPlaying) {
                pause(this.$audioContainer, this.$audio,this.$playBtn)
            } else {
                play(this.$audioContainer, this.$audio,this.$playBtn)
            }
         });

        this.$audio.addEventListener("timeupdate", (e) => { //updateProgress
            let { duration, currentTime } = e.srcElement;
            let progressPercent = (currentTime / duration) * 100;
            this.$progress.style.width = `${progressPercent}%`;
            let durationStr = (duration < 10 ? `0:0${Math.round(duration)}` : `0:${Math.round(duration)}`); 
            let currentTimeStr = (currentTime < 10 ? `0:0${Math.round(currentTime)}` : `0:${Math.round(currentTime)}`); 
            this.$timestamp.innerHTML = `${currentTimeStr}/${durationStr}`;
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
                this.$volumeBtn.classList.remove("fa-volume-mute");
                this.$volumeBtn.classList.add("fa-volume-up");
              
                let currentAudio = document.getElementById("audio");
                currentAudio.muted = false;
            } else {
                //muteAudio();
                this.$audioContainer.classList.add("mute");
                this.$volumeBtn.classList.remove("fa-volume-up");
                this.$volumeBtn.classList.add("fa-volume-mute");

                let currentAudio = document.getElementById("audio");
                currentAudio.muted = true;
            }
        });

        this.$volSlider.addEventListener("change", function (e) {
            audio.volume = e.currentTarget.value / 100;
          });
    }
}

window.customElements.define('tool-bar', ToolBar);
