
import { initializeApp } from "firebase/app";
import { getAuth, } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiYrNhORYQEDTjmIX16cTEBl3o0w3xHrw",
  authDomain: "multimart-bdcf8.firebaseapp.com",
  projectId: "multimart-bdcf8",
  storageBucket: "multimart-bdcf8.appspot.com",
  messagingSenderId: "357852119180",
  appId: "1:357852119180:web:c58ddbba5ca3312350bba9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;