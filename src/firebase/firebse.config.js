// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgpN4_lXSrxRCYLzyWc9zLFy5pwYUmyw8",
  authDomain: "ema-john-with-firebase-a-438f1.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-438f1",
  storageBucket: "ema-john-with-firebase-a-438f1.appspot.com",
  messagingSenderId: "289351929598",
  appId: "1:289351929598:web:d83c2c16632bc1f79c9faf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;