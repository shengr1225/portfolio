// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiMryQdZx79bGrwVAb4OJgNXMoLMvDySk",
  authDomain: "portfolio-8308d.firebaseapp.com",
  projectId: "portfolio-8308d",
  storageBucket: "portfolio-8308d.firebasestorage.app",
  messagingSenderId: "37041147853",
  appId: "1:37041147853:web:abf27948caa0a8ab60be84",
  measurementId: "G-VEZX6XK4ET",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
