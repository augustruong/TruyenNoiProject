import { authStateChanged, listenCurrentUser } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = `
    <div class="user-form-wrapper">
        <div class="info">
            <div class="avatar" >
                <img src="./images/avatar.jpg" alt="avt-alt" />
                <canvas class="exp-pie"></canvas>
                <div class="level">99</div>
            </div>

            <div class="info-text">
                <h2 class="name"></h2>
                <div>
                    Điểm kinh nghiệm: <span class="exp-point">-1</span> (LV
                    <span class="level">999 đóa hồng</span>)
                </div>
                <div>Số xu sở hữu: <span class="coin">nửa</span> xu</div>
            </div>
        </div>     
        
        <hr/>

        <div class="info-details">
            <table>
                <tr>
                    <td class="td-left">Họ tên</td>
                    <td>
                    <div class="name"></div>
                    <img id="name-edit" class="edit" src="" alt="" />
                    </td>
                </tr>
                <tr>
                    <td class="td-left">Email</td>
                    <td>
                    <div class="email">email@email.email</div>
                    <img id="email-edit" class="edit" src="" alt="" />
                    </td>
                </tr>
                <tr>
                    <td class="td-left">Mật khẩu</td>
                    <td>
                    <div class="password">**********</div>
                    <img id="password-edit" class="edit" src="" alt="" />
                    </td>
                </tr>
                <tr>
                    <td class="td-left"></td>
                    <td class="td-right date">
                    (Thay đổi lần cuối ngày 
                    <span class="date-modified"> dd/mm/yy</span>)
                    </td>
                </tr>
            </table>
        </div>
        <button id="logout">Đăng xuất</button>
    </div>
`;

export default class UserForm extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        let canvasExpPie = this.querySelector(".exp-pie");
        canvasExpPie.width = 114;
        canvasExpPie.height = 114;
        let ctx = canvasExpPie.getContext("2d");
        ctx.fillStyle = "darkblue";
        ctx.beginPath();
        ctx.moveTo(57, 57);
        ctx.arc(57, 57, 57, Math.PI + Math.PI / 2, Math.PI / 2 + Math.PI / 4);
        ctx.closePath();
        ctx.fill();
        
        this.$logOutBtn = this.querySelector('#logout');
        this.$name = this.querySelectorAll('.name');
        this.$expPoint = this.querySelector('.exp-point');
        this.$level = this.querySelector('.level');
        this.$coin = this.querySelector('.coin');
        this.$email = this.querySelector('.email');
        this.$password = this.querySelector('.password');

    }

    connectedCallback() {
        authStateChanged((user)=> {
            if (user) {
                let currentUser = firebase.auth().currentUser;
                listenCurrentUser(async (user) => {
                    this.$name.forEach((element) => {
                         element.innerHTML = `${user.name}` 
                    })
                    this.$expPoint.innerHTML = `${user.exp}`
                    this.$level.innerHTML = `${user.level}`
                    this.$coin.innerHTML = `${user.coin}`
                })
                
                this.$email.innerHTML = `${currentUser.email}`
                this.$password.innerHTML = `${currentUser.password}`
        
                this.$logOutBtn.addEventListener('click', () => {
                    firebase.auth().signOut();
                    document.getElementById('login-btn').style.display = 'inline';
                })
            } else {

            }
        })
        
    }
}

window.customElements.define("user-form", UserForm);