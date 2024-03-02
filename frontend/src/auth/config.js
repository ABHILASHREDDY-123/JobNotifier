import {initializeApp} from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyAJIxbPFi7uWHBTJcnVMlHY7bXKQsz1RR8',
  authDomain: "job-notifier-6545f.firebaseapp.com",
  projectId: "job-notifier-6545f",
  storageBucket: "job-notifier-6545f.appspot.com",
  messagingSenderId: "661330958246",
  appId: "1:661330958246:web:c69fbb01d25a05c9efa167",
  measurementId: "G-FW0GGGNB2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider}