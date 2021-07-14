import InputWrapper from "./InputWrapper.js";
import { login } from "../models/user.js";

function authStateChanged(callback) {
    //dang ky dang nhap dang xuat
    firebase.auth().onAuthStateChanged((user) => {
      callback(user);
    });
  }

const $template = document.createElement("template");
$template.innerHTML = `
    <form action="submit" class="login-form">
        <input-wrapper class="email" placeholder="Email" type="email" error="" /></input-wrapper>
        <input-wrapper class="password" placeholder="Mật khẩu" type="password" error="" /></input-wrapper>
    
        <div class="flex-btw">
            <div class="tickbox">
                <input type="checkbox" class="tickbox1" />
                <label for="tickbox1">Nhớ tui</label>
            </div>
            <a href="#">Quên mật khẩu?</a>
        </div>

        <button class="login-btn">Đăng nhập</button>

        <div class="flex-btw">
            <div>Bé chưa có tài khoản?</div>
            <a href="#" class="register-link">Tạo tài khoản</a>
        </div>
    </form>
`;

export default class LoginForm extends HTMLElement {
    constructor() {
      super();
      this.appendChild($template.content.cloneNode(true));

      this.$form = this.querySelector(".login-form");
      this.$email = this.querySelector(".email");
      this.$password = this.querySelector(".password");

      this.$registerLink = this.querySelector(".register-link");
    }

    connectedCallback() {
      this.$form.onsubmit = async (event) => {
        event.preventDefault();
        let email = this.$email.value;
        let password = this.$password.value;
    
        // callback
        let isPassed =
            this.$email.validate((value) => { return value != "";}, "Invalid email") &
            this.$password.validate((value) => { return value != "";}, "Invalid password"); 
    
        if (isPassed) {
          try {
            await login(email, password); // kha nang sinh loi
            //an Login Form, an nut login
            document.getElementById('auth-modal').visible = false;
            document.getElementById('login-btn').style.display = 'none';

          } catch (error) {
            //xu ly loi
            alert(error.message);
          }
        }
      }

      this.$registerLink.addEventListener('click', () => {
        //console.log("forgot pw");
      })

      this.$registerLink.addEventListener('click', () => {
          document.getElementById('auth-modal').setAttribute('title', 'Đăng ký');
      })
    }

    reset() {
      this.$email.setAttribute('error','');
      this.$password.setAttribute('error','');
    }
}

window.customElements.define("login-form", LoginForm);