// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPV4XP1EDEq4MI4FeB3B6eJL07qr7x_DY",
  authDomain: "gramcircle-b3eb5.firebaseapp.com",
  projectId: "gramcircle-b3eb5",
  storageBucket: "gramcircle-b3eb5.appspot.com",
  messagingSenderId: "215966535537",
  appId: "1:215966535537:web:a05165ac2bf3ee0a80f0d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);



const firebaseUtils = {
  app,
  firestore
};

// Export the initialized Firebase app
export default firebaseUtils;