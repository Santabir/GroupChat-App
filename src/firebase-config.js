// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBr3y53Kdr3bGHBYi3lOewwJDqcrYzr0lA",
  authDomain: "chatapp-cse-ad4c4.firebaseapp.com",
  projectId: "chatapp-cse-ad4c4",
  storageBucket: "chatapp-cse-ad4c4.firebasestorage.app",
  messagingSenderId: "479996376676",
  appId: "1:479996376676:web:7f22dc2226acf8f32c1171",
  measurementId: "G-VTERG2NSQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();