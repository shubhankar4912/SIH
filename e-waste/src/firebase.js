import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi_NTebgos4QBd3lVqZRl03MdAU_cCjIc",
  authDomain: "wattre-a4fd7.firebaseapp.com",
  projectId: "wattre-a4fd7",
  storageBucket: "wattre-a4fd7.appspot.com",
  messagingSenderId: "933694443151",
  appId: "1:933694443151:web:6febeb7e0fdbbb99b7aafa"
};



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;

