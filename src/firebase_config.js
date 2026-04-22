
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ FIXED

const firebaseConfig = {
  apiKey: "AIzaSyAqE2vj1DSba7Le1jjqnEvgTb2QbcMdexA",
  authDomain: "logintasktwo.firebaseapp.com",
  projectId: "logintasktwo",
  storageBucket: "logintasktwo.firebasestorage.app",
  messagingSenderId: "814486374013",
  appId: "1:814486374013:web:6f9ee8e36898f2d4a8d314",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();