import InputWrapper from "./InputWrapper.js";
import { register } from "../models/user.js";


function authStateChanged(callback) {
  //dang ky dang nhap dang xuat
  firebase.auth().onAuthStateChanged((user) => {
    callback(user);
  });
}

const $template = document.createElement("template");
$template.innerHTML = `
    <form action="submit" class="register-form">
      <input-wrapper class="name" placeholder="Họ và Tên" type="text" error="" /></input-wrapper>
      <input-wrapper class="email" placeholder="Email" type="email" error="" /></input-wrapper>
      <input-wrapper class="password" placeholder="Mật khẩu" type="password" error="" /></input-wrapper>
      <input-wrapper
        class="password-confirmation"
        placeholder="Nhập lại mật khẩu"
        type="password"
        error=""/>
      </input-wrapper>
      <div class="tickbox">
        <input type="checkbox" id="tickbox1" />
        <label for="tickbox1">Bé hứa sẽ chăm ngoan học giỏi</label>
      </div>
      <button class="register-btn">Tạo tài khoản</button>
      <div class="flex-btw">
        <div>Bé đã có tài khoản?</div>
        <a href="#">Đăng nhập</a>
      </div>
    </form>
`;

export default class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$form = this.querySelector(".register-form");

    this.$name = this.querySelector(".name");
    this.$email = this.querySelector(".email");
    this.$password = this.querySelector(".password");
    this.$passwordConfirmation = this.querySelector(".password-confirmation");
  }


  connectedCallback() {
    this.$form.onsubmit = async (event) => {
      event.preventDefault();
      let name = this.$name.value;
      let email = this.$email.value;
      let password = this.$password.value;
      let passwordConfirmation = this.$passwordConfirmation.value;

      // callback
      let isPassed =
        this.$name.validate((value) => {
          return value != "";
        }, "Invalid name") &
        this.$email.validate((value) => {
          return value != "";
        }, "Invalid email") &
        this.$password.validate((value) => {
          return value != "";
        }, "Invalid password") &
        this.$passwordConfirmation.validate((value) => {
          return value != "" && value == password;
        }, "Invalid passsword confirmation");

      if (isPassed) {
        try {
          await register(name, email, password); // kha nang sinh loi
          alert("Register successfully");
        } catch (error) {
          //xu ly loi
          alert(error.message);
        }
      }
    }
  }
}

window.customElements.define("register-form", RegisterForm);
