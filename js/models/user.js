import { getDataFromDocs } from "../utils.js";

export async function register(name, email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email,password);
    await firebase.auth().currentUser.updateProfile({
        displayName: name
    });
    
    //Luu document voi id la uid cua user

    // await firebase.firestore().collection('users').add({ //auto generate id
    //     name: name,
    //     status: 'free',
    //     currentConversation: ''
    // });

    let docId = firebase.auth().currentUser.uid;
    //set = add || update
    await firebase.firestore().collection('users').doc(docId).set({
        name: name,
        status: 'free',
        currentConversation: ''
    });
}

export async function login(email,password) {
    await firebase.auth().signInWithEmailAndPassword(email,password);
}

export function authStateChanged(callback) {
    //dang ki, dang nhap, dang xuat
    firebase.auth().onAuthStateChanged((user) => {
        callback(user);
    });
}

export async function getAllUsers() {
    let response = await firebase.firestore().collection('users').get();
    let data = getDataFromDocs(response.docs);
    return data;
}

export function listenAllUsers(callback) {
    firebase.firestore().collection('users').onSnapshot(response => {
        callback(getDataFromDocs(response.docs));
    })
}

export async function updateUser(id,data) {
    await firebase.firestore().collection('users').doc(id).update(data);
}

export async function updateCurrentUser(data) {
    let currentUser = firebase.auth().currentUser;
    await updateUser(currentUser.uid, data);

}