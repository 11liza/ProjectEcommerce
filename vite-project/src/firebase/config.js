import firebase from 'firebase/app'
import 'firebase/firestore'
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

  //init firebase
  firebase.initializeApp(firebaseConfig);

  // init firebase service
  const projectFirestore = firebase.firestore()

  export { projectFirestore}
