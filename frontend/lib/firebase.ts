import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC24AnPHoYvGVSX1O33R-5nOQE0rM9onYU",
  authDomain: "ecomchatbot-98e7a.firebaseapp.com",
  databaseURL:"https://ecomchatbot-98e7a-default-rtdb.firebaseio.com",
  projectId: "ecomchatbot-98e7a",
  storageBucket: "ecomchatbot-98e7a.firebasestorage.app",
  messagingSenderId: "796460172743",
  appId: "1:796460172743:web:3a35e9acbe7d9de44405e2",
};
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export { auth, provider, signInWithPopup, signOut, database };
