// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';  // Corrected import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0PPWL5GzzEURzSyCFb35Bf-nneOe5FdY",
    authDomain: "flashcards-ai-9131a.firebaseapp.com",
    projectId: "flashcards-ai-9131a",
    storageBucket: "flashcards-ai-9131a.appspot.com",
    messagingSenderId: "932749572495",
    appId: "1:932749572495:web:bcec0043bf9bcffb69f3fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Corrected initialization for Firestore

// Initialize Analytics only if it's supported and running on the client side
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { db };
