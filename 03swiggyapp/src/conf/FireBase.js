import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBcFnrviTeR0gHqAHCPIobo8MKaQsHK9mA",
  authDomain: "swiggylogin-9b5f6.firebaseapp.com",
  projectId: "swiggylogin-9b5f6",
  storageBucket: "swiggylogin-9b5f6.appspot.com",
  messagingSenderId: "826560335287",
  appId: "1:826560335287:web:e7b51e33835e04d1a66c32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth ,  provider } 