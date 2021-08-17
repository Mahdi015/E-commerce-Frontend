  import firebase from "firebase/app"
  import "firebase/auth"
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCT0M2-umTmCKoZHlkcyQeHTL7cwu86NSU",
    authDomain: "e-commerce-app-7879d.firebaseapp.com",
    projectId: "e-commerce-app-7879d",
    storageBucket: "e-commerce-app-7879d.appspot.com",  
    messagingSenderId: "1077377269844",
    appId: "1:1077377269844:web:2e102cb26a3c94cca7adc1",
    measurementId: "G-58RTM7SRKT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  

export const auth = firebase.auth();
//export const provider = new firebase.auth.GoogleAuthProvider();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();