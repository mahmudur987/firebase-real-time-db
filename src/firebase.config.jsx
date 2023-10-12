// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyB1os-qi8hvg3s1yqSsH6kODzPnbpm1vtU",
  authDomain: "fir-realtime-db-8491a.firebaseapp.com",
  projectId: "fir-realtime-db-8491a",
  storageBucket: "fir-realtime-db-8491a.appspot.com",
  messagingSenderId: "548939423048",
  appId: "1:548939423048:web:57ad1afa980cda1106a77d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
