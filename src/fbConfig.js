import firebase from 'firebase'

const fbConfig = {
    apiKey: "AIzaSyD1WBq91YO4m0yf-lCcRyRBz171czZc5bA",
    authDomain: "simplevuejsblog.firebaseapp.com",
    databaseURL: "https://simplevuejsblog.firebaseio.com",
    projectId: "simplevuejsblog",
    storageBucket: "simplevuejsblog.appspot.com",
    messagingSenderId: "914074538645"
}

var fbApp = firebase.initializeApp(fbConfig);
export const fbDB = fbApp.database();