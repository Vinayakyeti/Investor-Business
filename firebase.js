import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyANADXP7i0LlTRnB6mMyTFz5sofdtXdIT4",
  authDomain: "investor-business-6b578.firebaseapp.com",
  projectId: "investor-business-6b578",
  storageBucket: "investor-business-6b578.firebasestorage.app",
  messagingSenderId: "717775396283",
  appId: "1:717775396283:web:bcdce8cf0bb81755ab389e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('Firebase initialized successfully');
