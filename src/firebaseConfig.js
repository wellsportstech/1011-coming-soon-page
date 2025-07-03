// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
// Import Firestore services
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // If you plan to use Analytics

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpA6VW-RsZt-GndDjL-swZ44rsV882NDQ",
  authDomain: "sports-chatbot-responses.firebaseapp.com",
  projectId: "sports-chatbot-responses",
  storageBucket: "sports-chatbot-responses.firebasestorage.app",
  messagingSenderId: "255238804250",
  appId: "1:255238804250:web:77a2e38ecc134421bc52a3",
  measurementId: "G-N45ZC3PTS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Analytics (optional)
export const analytics = getAnalytics(app); // Only if you are using analytics