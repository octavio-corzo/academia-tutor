// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEEDCsYeV3NEF_mXMKvHVDnKFjCQK3M64",
  authDomain: "academia-tutor.firebaseapp.com",
  projectId: "academia-tutor",
  storageBucket: "academia-tutor.appspot.com",
  messagingSenderId: "361496423755",
  appId: "1:361496423755:web:39614b7849b7bc18848cce",
  measurementId: "G-Y3D2XZE1N0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(firebaseApp);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export { auth, db, storage, messaging };
