// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxxDqAZ4gQoUk2Q2dZ-y-wTMnp6Q2MV7s",
  authDomain: "anonymousblogsposting.firebaseapp.com",
  projectId: "anonymousblogsposting",
  storageBucket: "anonymousblogsposting.firebasestorage.app",
  messagingSenderId: "709741573137",
  appId: "1:709741573137:web:f951a8ce94a0304c9c2db0",
  measurementId: "G-8DF631YG9X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
