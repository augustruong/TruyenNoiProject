import LoginForm from "./LoginForm.js";

const $template = document.createElement("template");
$template.innerHTML = `
  <div class="modal-wrapper">
    <div class="modal-content">
      <div class='title'></div>
      <span class="close">&times;</span>
      <login-form></login-form>
      <register-form></register-form>
      <user-form></user-form>
    </div>
  </div>
`
export default class Modal extends HTMLElement {
    constructor() {
      super();
      this.appendChild($template.content.cloneNode(true));
      this.$modal = this.querySelector(".modal-wrapper");
      this.$closeBtn = this.querySelector(".close");
      this.$loginForm = this.querySelector("login-form");
      this.$registerForm = this.querySelector("register-form");
      this.$userForm = this.querySelector("user-form");
    }

    get title() {
      return this.getAttribute("title");
    }
  
    set title(value) {
      this.setAttribute("title", value);
    }

    get visible() {
      return this.hasAttribute("visible");
    }
  
    set visible(value) {
      if (value) {
        this.setAttribute("visible", "");
      } else {
        this.removeAttribute("visible");
      }
    }
  
    connectedCallback() {
      this.$closeBtn.addEventListener('click', e => {
        this.removeAttribute("visible");
        //remove invalid
        this.$loginForm.reset();
        this.$registerForm.reset();
      });
    }

    static get observedAttributes() {
      return ["visible", "title"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this.$loginForm.style.display = "none";
      this.$registerForm.style.display = "none";
      this.$userForm.style.display = "none";

      if (name == "title") {
        this.querySelector(".title").textContent = newValue;
        if (newValue == "Đăng nhập") {
          this.$loginForm.style.display = "block";
        } else if (newValue == "Đăng ký")  {
          this.$registerForm.style.display = "block";
        } else if (newValue == "Thông tin tài khoản") {
          this.$userForm.style.display = "block";
        }

      }
      if (name == "visible") {
        if (newValue == null) {
          this.querySelector(".modal-wrapper").classList.remove("visible");
        } else {
          this.querySelector(".modal-wrapper").classList.add("visible");
        }
      }
    }
  }
  window.customElements.define("x-modal", Modal);