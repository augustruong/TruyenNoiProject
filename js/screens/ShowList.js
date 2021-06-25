const $template = document.createElement("template");
$template.innerHTML = `

`;

export default class ShowList extends HTMLElement {
    constructor() {
      super();
      this.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define("show-list", ShowList);