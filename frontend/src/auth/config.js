import {initializeApp} from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBofcWTr5ZGBolYY2zCYWZiDWCfnGfRIxE",
  authDomain: "job-notifier-1ccee.firebaseapp.com",
  projectId: "job-notifier-1ccee",
  storageBucket: "job-notifier-1ccee.appspot.com",
  messagingSenderId: "170023016391",
  appId: "1:170023016391:web:eaee616b30b7db3ac66be2",
  measurementId: "G-C5F9LWKS1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider}