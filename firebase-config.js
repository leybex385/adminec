import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, setDoc, getDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBQRl3toKm_L8Nzfi7_73Gl6lHcaJNv1bU",
    authDomain: "easycrypto-3d6bb.firebaseapp.com",
    projectId: "easycrypto-3d6bb",
    storageBucket: "easycrypto-3d6bb.firebasestorage.app",
    messagingSenderId: "498735794728",
    appId: "1:498735794728:web:5066d10f5d9454dc13431d",
    measurementId: "G-V98P8TMQW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Global Error Handler
function logError(msg) {
    console.error("[EasyCrypto ERROR]", msg);
    const overlay = document.getElementById('error-overlay');
    const details = document.getElementById('error-details');
    if (overlay && details) {
        overlay.style.display = 'flex';
        details.innerText = msg;
    }
}

// Session Check Helper
async function checkSession(redirectIfNoSession = true, redirectUrl = 'login.html') {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (!user && redirectIfNoSession) {
                window.location.href = redirectUrl;
            }
            resolve(user);
        });
    });
}

// Auth Helper: Logout
async function handleLogout() {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (err) {
        alert("Logout failed: " + err.message);
    }
}

window.handleLogout = handleLogout; // Expose for inline onclick handlers

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, collection, addDoc, getDocs, onSnapshot, doc, setDoc, getDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp, increment, checkSession, logError };
