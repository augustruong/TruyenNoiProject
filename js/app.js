import HomePage from "./screens/HomePage.js";
import CollectionPage from "./screens/CollectionPage.js";
import ComicPage from "./screens/ComicPage.js";
import ComicThumbnail from "./components/ComicThumbnail.js";
import ComicShow from "./components/ComicShow.js";
import ToolBar from "./components/ToolBar.js";
import InputWrapper from "./components/InputWrapper.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginForm.js";
import UserForm from "./components/UserForm.js";
import Modal from "./components/Modal.js";
import StatsBar from "./components/StatsBar.js";
import { authStateChanged } from "./models/user.js";

import "./router.js";
import { setCookie } from "./utils.js";

let logo = document.querySelector('#logo');
logo.addEventListener('click', () => {
    router.navigate('/home');
})

let avatarThumb = document.querySelector('.avatar-thumb');
avatarThumb.addEventListener('click', () => {
    document.getElementById('user-modal').visible = true;
    document.getElementById('user-modal').setAttribute('title', 'Thông tin tài khoản');     
})


let userModal = document.querySelector('#user-modal'); 


authStateChanged((user) => {
    //console.log(user);
    if (user != null) {
        // set cookie user id = currentUser.uid
        document.querySelector('.avatar-thumb').style.display = 'block';
        setCookie('currentUserId',user.uid)
    } else {
        // set cookie user id = {} 
        setCookie('currentUserId','');
        document.querySelector('.avatar-thumb').style.display = 'none';
        document.getElementById('user-modal').visible = false;
    }
});


