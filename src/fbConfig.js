import firebase from 'firebase'

const fbConfig = {
    // insira suas configs do firebase aqui
}

var fbApp = firebase.initializeApp(fbConfig);
export const fbDB = fbApp.database();