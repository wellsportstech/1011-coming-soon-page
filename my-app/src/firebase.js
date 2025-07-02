// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);
export default db; // 👈 default export