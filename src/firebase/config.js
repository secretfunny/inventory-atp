import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDunbSMdBOnQLnhn_EP1cY7xzFNYKPwSI",
  authDomain: "inventory-atp.firebaseapp.com",
  projectId: "inventory-atp",
  storageBucket: "inventory-atp.firebasestorage.app",
  messagingSenderId: "507513820602",
  appId: "1:507513820602:web:863fca477144fa0a4ab983",
  measurementId: "G-BN7LXBVEZ4"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);