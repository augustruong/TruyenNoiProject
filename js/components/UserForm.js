import {
    authStateChanged,
    listenCurrentUser,
    updateCurrentUser,
  } from "../models/user.js";
  
  const $template = document.createElement("template");
  $template.innerHTML = `
  <div class="container">
  <div class="content">
    <div class="info">
      <div class="avatar">
        <img id="avatar-img" src="" alt="avt-alt" />
        <div>
          <img src="../../images/icon/icons8_camera.ico" alt="avt-inp" />
          <input type="file" />
        </div>
        <canvas id="exp-pie"></canvas>
        <div class="level">99</div>
      </div>
      <div class="info-text">
        <h2 class="name"></h2>
        <p>
          Điểm kinh nghiệm: <span id="exp-point"></span> (LV
          <span class="level"></span>)
        </p>
        <p>Số xu sở hữu: <span id="coin"></span> xu</p>
      </div>
    </div>
    <hr />
    <!-- end div.info -->
    <div class="info-details">
      <h4>Thông tin tài khoản</h4>
      <table>
        <tr>
          <td class="td-left">Họ tên</td>
          <td>
            <p id="name" class="name"></p>
            <img
              id="name-edit"
              class="edit"
              src="../../images/icon/icons8_edit.ico"
              alt="edit"
            />
          </td>
        </tr>
        <tr>
          <td class="td-left">Email</td>
          <td>
            <p id="email"></p>
            <img
              id="email-edit"
              class="edit"
              src="../../images/icon/icons8_edit.ico"
              alt="edit"
            />
          </td>
        </tr>
        <tr>
          <td class="td-left">Mật khẩu</td>
          <td>
            <p id="password">**********</p>
            <img
              id="password-edit"
              class="edit"
              src="../../images/icon/icons8_edit.ico"
              alt="edit"
            />
          </td>
        </tr>
        <tr>
          <td class="td-left"></td>
          <td class="td-right date">
            <p id="date">
              (Thay đổi lần cuối ngày <span id="date-modified"></span>)
            </p>
            <input id="confirm-password" type="text" placeholder="Mật khẩu hiện tại" />
          </td>
        </tr>
        <tr>
          <td class="td-left"></td>
          <td>
            <button id="apply" type="button">Xác nhận</button>
          </td>
        </tr>
      </table>
    </div>
    <!-- end div.info-details -->
    <button id="logout">Đăng xuất</button>
  </div>
  </div>`;
  
  export default class UserForm extends HTMLElement {
    constructor() {
      super();
      this.appendChild($template.content.cloneNode(true));
    }
    $getId = (_id) => document.getElementById(_id);
    $getClass = (_class) => document.getElementsByClassName(_class);
  
    renderExpPie = (exp, id, color) => {
      let canvasExpPie = this.$getId(id);
      canvasExpPie.width = 114;
      canvasExpPie.height = 114;
      let ctx = canvasExpPie.getContext("2d");
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(57, 57);
      ctx.arc(57, 57, 57, Math.PI * 1.5, Math.PI * (1.5 + (exp % 100) * 0.02));
      ctx.closePath();
      ctx.fill();
    };
    renderUser = (user, currentUser) => {
      this.$getId("avatar-img").src = user.avatar;
      this.$getClass("name")[1].innerText = user.name;
      this.$getClass("name")[2].innerText = user.name;
      this.$getId("email").innerText = currentUser.email;
      this.$getId("date-modified").innerText = user.dateModified;
      this.$getId("coin").innerText = user.coin;
      this.$getId("exp-point").innerText = user.exp;
      this.$getClass("level")[0].innerText = Math.floor(user.exp / 100);
      this.$getClass("level")[1].innerText = Math.floor(user.exp / 100);
      this.renderExpPie(user.exp, "exp-pie", "darkblue");
    };
    activeEditEvent = (user) => {
      let inEdit = 0;
      let switchTyping = (e) => {
        let id = e.target.id;
        let sortId = id.split("-")[0];
  
        let isEdit = this.$getId(id).alt == "edit" ? false : true;
        this.$getId(sortId).innerHTML = isEdit
          ? sortId == "password"
            ? "**********"
            : user[sortId]
          : sortId == "password"
          ? `<input id="new-password" class="typing" type="password" placeholder="Mật khẩu mới"/> & <input id="reType-new-password" class="typing" type="password" placeholder="Nhập lại mật khẩu mới"/>`
          : `<input id="${sortId + "-change"}" class="typing" type="text"/>`;
        this.$getId(id).src = `../../images/icon/icons8_${
          isEdit ? "edit" : "cancel"
        }.ico`;
        this.$getId(id).alt = isEdit ? "edit" : "cancel";
  
        isEdit ? --inEdit : ++inEdit;
  
        this.$getId("date").style.display = inEdit ? "none" : "block";
        this.$getId("confirm-password").style.display = inEdit ? "block" : "none";
        this.$getId("apply").style.display = inEdit ? "block" : "none";
      };
      this.$getId("name-edit").addEventListener("click", switchTyping);
      this.$getId("email-edit").addEventListener("click", switchTyping);
      this.$getId("password-edit").addEventListener("click", switchTyping);
    };
    activeUpdateEvent = (user) => {
      let borderAlert = (id) => (this.$getId(id).style.border = "1px solid red");
      let resetBorder = (id) => (this.$getId(id).style.border = "none");
      let updateUser = () => {
        let newName = this.$getId("name-change")
          ? this.$getId("name-change").value
          : "";
        let newEmail = this.$getId("email-change")
          ? this.$getId("email-change").value
          : "";
  
        let newPassword = this.$getId("new-password");
        let reTypeNewPassword = this.$getId("reType-new-password");
        if (newPassword != reTypeNewPassword)
          return borderAlert("reType-new-password");
        else resetBorder("reType-new-password");
  
        let confirmPassword = this.$getId("confirm-password");
        if (confirmPassword != currentUser.password)
          return borderAlert("confirm-password");
        else resetBorder("confirm-password");
        
        let data = {
          name: newName || user.name,
          email: newEmail || user.email,
          password: newPassword || confirmPassword,
          dateModified: Date.now(),
        };
        updateCurrentUser(data);
      };
      this.$getId("apply").addEventListener("click", updateUser);
    };
    activeLogoutEvent = () =>
      this.$getId("logout").addEventListener("click", () => {
        firebase.auth().signOut();
        this.$getId("login-btn").style.display = "inline";
      });
  
    connectedCallback() {
      authStateChanged((user) => {
        if (!user) return;
        let currentUser = firebase.auth().currentUser;
        listenCurrentUser(async (user) => this.renderUser(user, currentUser));
  
        this.activeEditEvent(user);
        this.activeUpdateEvent(user);
        this.activeLogoutEvent();
      });
    }
  }
  
  window.customElements.define("user-form", UserForm);
  