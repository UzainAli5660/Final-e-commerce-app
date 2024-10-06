import { initializeApp } from "firebase/app";
import { getAuth , 
 } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVWbk-vNTItpDN9UOkRCvYpdEwVF7p5uM",
  authDomain: "react-project-a8550.firebaseapp.com",
  projectId: "react-project-a8550",
  storageBucket: "react-project-a8550.appspot.com",
  messagingSenderId: "1032822163804",
  appId: "1:1032822163804:web:4f154a614036ffe4c1d999"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };