import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cosmic-blog.firebaseapp.com",
  projectId: "cosmic-blog",
  storageBucket: "cosmic-blog.appspot.com",
  messagingSenderId: "630803779611",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
