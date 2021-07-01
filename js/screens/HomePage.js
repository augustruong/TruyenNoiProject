const $template = document.createElement('template');
$template.innerHTML = `
    <div class="home-page">
        <img class="body-illustration" src="./images/homepage-illustration.png" alt="">
        <img class="logo" src="./images/logo.png">
        <div class="body-container">
                <div class="body-text">
                    <p class="hello">Xin chào, mình là</p>
                    <h1>TRUYỆN NÓI</h1>
                    <p class="intro">
                        Ở đây có rất nhiều truyện song ngữ Anh Việt có giọng kể bằng tiếng Anh. <br>
                        Vừa xem truyện, vừa nghe tiếng Anh, go pro ngay thôi bé ơi!
                    </p>
                </div>
                <div class="cta-btn">
                    <button class="view-now-btn">Xem ngay!</button>
                    <button class="login-btn">Đăng nhập</button>
                </div>
        </div>

        <x-modal id="auth-modal" title="Đăng nhập"></x-modal>
        <x-modal id="auth-modal" title="Đăng nhập"></x-modal>
    </div> 
`;

export default class HomePage extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$logo = this.querySelector('.logo');
        this.$viewNowBtn =  this.querySelector('.view-now-btn');
        this.$loginBtn =  this.querySelector('.login-btn');
        this.$modal = this.querySelector('x-modal');
    }

    connectedCallback() {
        this.$logo.addEventListener('click', () => {
            router.navigate('/home');
        })
        this.$loginBtn.addEventListener('click', () => {
            this.$modal.visible = true;
            document.getElementById('auth-modal').setAttribute('title', 'Đăng nhập');            
        }) 
        this.$viewNowBtn.addEventListener('click', () => {
            router.navigate('/collection');
        }) 
    }    
}

window.customElements.define('home-page', HomePage);