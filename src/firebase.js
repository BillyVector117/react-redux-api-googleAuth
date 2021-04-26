import firebase from "firebase/app";
import "firebase/auth"; // Import auth methods
import "firebase/firestore"; // Import firestore methods
import "firebase/storage"; // Import storage methods

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7oXVmSkngjVDlOflZwr9vBCnj7qnklJY",
  authDomain: "redux-pokeducks.firebaseapp.com",
  projectId: "redux-pokeducks",
  storageBucket: "redux-pokeducks.appspot.com",
  messagingSenderId: "208850924413",
  appId: "1:208850924413:web:062811874c83c8053f5214",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export { auth, db, firebase, storage };
