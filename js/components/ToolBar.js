const $template = document.createElement('template');
$template.innerHTML =
`
    <div class="tool-bar-wrapper">
        <div class="stats">
            <span class="view-count"> <i class="fas fa-eye"></i>1000</span>
            <span class="heart-count">
            <i class="fas fa-heart"></i>1000</span>
        </div>

        <div class="audio-container">
            <div class="audio-info">
                <h4 id="title">Ukelele</h4>
                <div class="progress-container">
                    <div class="progress"></div>
                </div>
            </div>
        </div>
        <audio src="" id="audio"></audio>

        <div class="tool-bar-items">
            <a id="volume">
                <i class="fas fa-volume-up"></i>
                <input type="range" id="slider" />
            </a>
            <a id="reload">
                <i class="fas fa-undo-alt"></i>
            </a>
            <a id="play">
                <i class="fas fa-play"></i>
            </a>
            <a id="expand">
                <i class="fas fa-expand"></i>
            </a>
        </div>
    </div>
`;

export default class ToolBar extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true)); 
    }
}

window.customElements.define('tool-bar', ToolBar);