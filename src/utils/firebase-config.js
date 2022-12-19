import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDGeYaAjDf8AI_rp3ZIl4qqO0GrIlaQSYs",
    authDomain: "orderwise-8213e.firebaseapp.com",
    projectId: "orderwise-8213e",
    storageBucket: "orderwise-8213e.appspot.com",
    messagingSenderId: "355814784708",
    appId: "1:355814784708:web:f2a37326591757694b5391",
    measurementId: "G-L21K8ZEWBR"
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
export {db, storage, auth, logInWithEmailAndPassword, logout}