import HomePage from "./screens/HomePage.js";
import CollectionPage from "./screens/CollectionPage.js";
import ComicPage from "./screens/ComicPage.js";
import ComicThumbnail from "./components/ComicThumbnail.js";
import ComicShow from "./components/ComicShow.js";
import InputWrapper from "./components/InputWrapper.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginForm.js";
import Modal from "./components/Modal.js";
import { authStateChanged } from "./models/user.js";

import "./router.js";

let logo = document.querySelector('#logo');
logo.addEventListener('click', () => {
    router.navigate('/home');
})

authStateChanged((user) => {
    //console.log(user);
    if (user != null) {
        // set cookie user id = currentUser.uid
    } else {
        // set cookie user id = {} 
    }
});