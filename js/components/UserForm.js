const $template = document.createElement("template");
$template.innerHTML = `
    <div class="user-form-wrapper">
        <div class="user-profile">    
            <img src="">
            <span class="user-name">${}</span>
            <span class="exp-point">Điểm kinh nghiệm: ${}</span>
            <span class="bonus-coin">Số xu sở hữu: ${} xu</span> 
        </div>
        <div class="personal-info-edit">
             
        </div>
    </div>
`;

export default class UserForm extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        
    }
}

window.customElements.define("user-form", UserForm);