const $template = document.createElement('template');
$template.innerHTML = `
    <div class="home-page">
         <div class="body-illustration">
            <div class="masked">
                <img id="filter" src="./images/svg/filter.svg" alt="">
                <img id="boy-head" src="./images/svg/boy-head.svg" alt="">                
                <img id="stars" src="./images/svg/stars.svg" alt="">
                <img id="nori" src="./images/svg/nori.svg" alt="">
                <img id="cloud" src="./images/svg/cloud.svg" alt="">
                <img id="mountain" src="./images/svg/mountain.svg" alt="">
                <img id="path" src="./images/svg/path.svg" alt="">
                <div class="floating">
                    <img id="planet1" src="./images/svg/planet-1.svg" alt="">
                    <img id="planet2" src="./images/svg/planet-2.svg" alt="">
                    <img id="bubble" src="./images/svg/bubble.svg" alt="">
                </div>
            </div>
            <img id="boy-body" src="./images/svg/boy-body.svg" alt="">       
        </div>
        
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
                    <button id="view-now-btn">Xem ngay!</button>
                    <button id="login-btn">Đăng nhập</button>
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

        this.$viewNowBtn =  this.querySelector('#view-now-btn');
        this.$loginBtn =  this.querySelector('#login-btn');
        this.$modal = this.querySelector('x-modal');


        const randomX = random(10, 20);
        const randomY = random(10, 20);
        const randomDelay = random(0, 1);
        const randomTime = random(3, 5);
        const randomTime2 = random(5, 10);
        const randomAngle = random(-10, 10);    

        moveX('#planet1', 1);
        moveY('#planet1', -1);
        rotate('#planet1', 1);

        moveX('#planet2', 1);
        moveY('#planet2', -1);
        rotate('#planet2', 1);

        moveX('#bubble', 1);
        moveY('#bubble', -1);
        rotate('#bubble', 1);

        function rotate(target, direction) {
            TweenLite.to(target, randomTime2(), {
                rotation: randomAngle(direction),
                // delay: randomDelay(),
                ease: Sine.easeInOut,
                onComplete: rotate,
                onCompleteParams: [target, direction * -1]
            });
        }

        function moveX(target, direction) {
            TweenLite.to(target, randomTime(), {
                x: randomX(direction),
                ease: Sine.easeInOut,
                onComplete: moveX,
                onCompleteParams: [target, direction * -1]
            });
        }

        function moveY(target, direction) {
            TweenLite.to(target, randomTime(), {
                y: randomY(direction),
                ease: Sine.easeInOut,
                onComplete: moveY,
                onCompleteParams: [target, direction * -1]
            });
        }

        function random(min, max) {
            const delta = max - min;
            return (direction = 1) => (min + delta * Math.random()) * direction;
        }
    }

    connectedCallback() {   
        // get cookie userid
        // co user id -> an nut dang nhap, hien ava
             
        this.$loginBtn.addEventListener('click', () => {
            this.$modal.visible = true;
            document.getElementById('auth-modal').setAttribute('title', 'Đăng nhập');            
        }) 
        this.$viewNowBtn.addEventListener('click', () => {
            router.navigate('/collection');
        }) 

        window.addEventListener('mousemove', ({clientX,clientY}) => {
            const x = clientX - window.innerWidth/2;
            const y = clientY - window.innerHeight/2;

            TweenMax.to('#cloud', 1, {
                transform: `translate3d(${x / 50}px, ${y / 50}px, 0)`
            })
            TweenMax.to('#mountain', 1, {
                transform: `translate3d(${-x / 25}px, ${y / 15}px, 0)`
            })
            TweenMax.to('#stars', 1, {
                transform: `translate3d(${-x / 12}px, ${-y / 12}px, 0)`
            })
            TweenMax.to('#nori', 1, {
                transform: `translate3d(${x / 40}px, ${y / 60}px, 0)`
            })
            TweenMax.to('#path', 1, {
                transform: `translate3d(${-x / 50}px, ${-y / 50}px, 0)`
            })
        })
    }    
}

window.customElements.define('home-page', HomePage);