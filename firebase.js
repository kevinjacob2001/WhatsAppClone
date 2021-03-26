import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyALR-FtEvHyu-4Hy_Vr6PqOsObjsactFWQ",
  authDomain: "whatsappclonekj.firebaseapp.com",
  projectId: "whatsappclonekj",
  storageBucket: "whatsappclonekj.appspot.com",
  messagingSenderId: "779035078153",
  appId: "1:779035078153:web:5a70bccd29777dc41952d8",
  measurementId: "G-3ZLTS2VME4",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
