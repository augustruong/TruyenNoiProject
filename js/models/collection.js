import { getDataFromDoc, getDataFromDocs } from "../utils.js";

export async function getAllComics() {
    let response = await firebase.firestore().collection('comics').get();
    let data = getDataFromDocs(response.docs);
    return data;
}

export async function getComicById(id) {
    let response = await firebase.firestore().collection('comics').doc(id).get();
    return getDataFromDoc(response);
}