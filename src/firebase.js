// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  getFirestore,
  collection,
  updateDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  updatePassword,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  beforeAuthStateChanged,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDnh0sQLlHYO3vf_7t36kqm9XCd6bjnI5o",
  authDomain: "winbuddy-81c4b.firebaseapp.com",
  projectId: "winbuddy-81c4b",
  storageBucket: "winbuddy-81c4b.appspot.com",
  messagingSenderId: "400401613229",
  appId: "1:400401613229:web:9fda95449a1a488024a124",
  measurementId: "G-LG8VH3SQND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {
  app,
  auth,
  storage,
  getAuth,
  db,
  doc,
  getDoc,
  setDoc,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  updatePassword,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  listAll,
  deleteUser,
};
