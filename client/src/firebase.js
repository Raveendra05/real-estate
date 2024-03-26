// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-4c2e3.firebaseapp.com",
  projectId: "real-estate-4c2e3",
  storageBucket: "real-estate-4c2e3.appspot.com",
  messagingSenderId: "111023068674",
  appId: "1:111023068674:web:07f2ef4e14b0fa5675791b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);