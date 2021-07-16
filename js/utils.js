// doc: tra ve tu cloud firestore
export function getDataFromDoc(doc) {
    let obj = doc.data();
    obj.id = doc.id;
    return obj
}

// docs: mang chua document tra ve tu cloud firestore
export function getDataFromDocs(docs) {
    let data = [];
    for(let doc of docs) {
        data.push(getDataFromDoc(doc));
    }
    return data
}

export function setCookie(name,value) {
    document.cookie = `${name} = ${value}`;
}

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function getTitle() {
    let url = window.location.href.toString();
    let substr = url.substring(url.indexOf('?') + 1,url.length);        
    let params = new URLSearchParams(substr);
    return params.get("title");
}

export function play(audioContainer,audio,playBtn) {
    audioContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
}

export function pause(audioContainer,audio,playBtn) {
    audioContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
}