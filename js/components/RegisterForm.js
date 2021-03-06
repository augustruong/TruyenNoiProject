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
        <input type="checkbox" id="confirm-tickbox" />
        <label for="confirm-tickbox">Bé hứa sẽ chăm ngoan học giỏi</label>
      </div>
      <button class="register-btn">Tạo tài khoản</button>
      <div class="flex-btw">
        <div>Bé đã có tài khoản?</div>
        <a href="#" class="login-link">Đăng nhập</a> 
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
    this.$confirmTickbox = this.querySelector("#confirm-tickbox");

    this.$loginLink = this.querySelector(".login-link");
  }

  reset() {
    this.$email.setAttribute('error','');
    this.$password.setAttribute('error','');
    this.$name.setAttribute('error','');
    this.$passwordConfirmation.setAttribute('error','');
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
        

        isPassed &= this.$confirmTickbox.checked;
        if (!this.$confirmTickbox.checked) {
          alert('Please check the box~')
        }

      if (isPassed) {
        try {
          await register(name, email, password); // kha nang sinh loi

          //alert("Register successfully");
          let timerInterval;
          Swal.fire({
            title: `Chào bạn ${name}`,
            html: 'Đăng ký tài khoản thành công. Bạn xem truyện vui vẻ nhé!',
            timer: 2000,
            didOpen: () => {
              timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })

          //an Form, an nut login
          document.getElementById('auth-modal').visible = false;
          document.getElementById('login-btn').style.display = 'none';
        } catch (error) {
          //xu ly loi
          alert(error.message);
        }
      }
    }

    this.$loginLink.addEventListener('click', () => {
      document.getElementById('auth-modal').setAttribute('title', 'Đăng nhập');
  })
  }
}

window.customElements.define("register-form", RegisterForm);
