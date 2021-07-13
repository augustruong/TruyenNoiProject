import { getDataFromDoc, getDataFromDocs } from "../utils.js";

export async function getAllComics() {
    let response = await firebase.firestore().collection('comics').get();
    let data = getDataFromDocs(response.docs);
    return data;
}

export async function getComicByTitle(title) {
    let response = await firebase.firestore().collection('comics').doc(title).get();
    return getDataFromDoc(response);
}

