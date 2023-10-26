import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCVPtIiPuIAmmj3wAestjmsTV49e7bexAE",
    authDomain: "directtable-pap.firebaseapp.com",
    projectId: "directtable-pap",
    storageBucket: "directtable-pap.appspot.com",
    messagingSenderId: "858845601151",
    appId: "1:858845601151:web:584c3a272d7b7698d18e4a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);