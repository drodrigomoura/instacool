import * as firebase from 'firebase'


var config = {
    apiKey: "AIzaSyCYSyHk3f0WnTrJw16cZZg0butp_4h3Kso",
    appId: "1:63898009827:web:8cb06308e7b318c3bc45d6",
    authDomain: "instacool-8eeb8.firebaseapp.com",
    databaseURL: "https://instacool-8eeb8.firebaseio.com",
    measurementId: "G-GYHQYSSL69",
    messagingSenderId: "63898009827",
    projectId: "instacool-8eeb8",
    storageBucket: "instacool-8eeb8.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()