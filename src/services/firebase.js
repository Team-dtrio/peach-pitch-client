import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

initializeApp(firebaseConfig);

export const firebaseAuth = getAuth();
