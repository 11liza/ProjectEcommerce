
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBan03RDHqOvq7yRa-FwwCENNxapC-lyV8",
  authDomain: "frk23liza19.firebaseapp.com",
  databaseURL: "https://frk23liza19-default-rtdb.firebaseio.com",
  projectId: "frk23liza19",
  storageBucket: "frk23liza19.appspot.com",
  messagingSenderId: "256465097335",
  appId: "1:256465097335:web:c71ecedff4e849ddff2c72",
  measurementId: "G-67L03FLPHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
