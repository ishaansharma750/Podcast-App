// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcQ1mwJHV8rvC7DqUU5bYSgoTH-WMeOsQ",
    authDomain: "podcast-app-a63c4.firebaseapp.com",
    projectId: "podcast-app-a63c4",
    storageBucket: "podcast-app-a63c4.appspot.com",
    messagingSenderId: "1042431781502",
    appId: "1:1042431781502:web:eeed5a29fc5acba597862f",
    measurementId: "G-RJ4N357LX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth  = getAuth(app)

export{db,auth,storage};