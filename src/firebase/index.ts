import firebase from 'firebase';
import { firestorePlugin } from 'vuefire';
import Vue from 'vue';

Vue.use(firestorePlugin)

const firebaseConfig = {
    apiKey: "AIzaSyD7EDwH2LBj9SZV1WLKElAgNeLd97RTkdU",
    authDomain: "avueua.firebaseapp.com",
    databaseURL: "https://avueua.firebaseio.com",
    projectId: "avueua",
    storageBucket: "avueua.appspot.com",
    messagingSenderId: "246947567903",
    appId: "1:246947567903:web:ce5332c3ff8d9ced69782a"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
