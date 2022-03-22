import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDxsQqyhyqAyCTw8x9YqefSfAhi1ylzZeo",
  authDomain: "crud-app-467df.firebaseapp.com",
  projectId: "crud-app-467df",
  storageBucket: "crud-app-467df.appspot.com",
  messagingSenderId: "889962096433",
  appId: "1:889962096433:web:10761bc47f1440332db210",
  measurementId: "G-9GHVQ7S7VB"
};

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)