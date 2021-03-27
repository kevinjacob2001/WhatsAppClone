import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import firebase from "firebase"
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import {
  MobileView,
  isMobile
} from "react-device-detect";
import Mobileview from '../components/MobileView'

function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth);

  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid).set({
        email:user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL:user.photoURL
      },{merge:true})
    }
  },[user])
  if (isMobile) {
    return <Mobileview/>
}

  if(loading) return <Loading/>

  if (!user) return <Login />;
  else return <Component {...pageProps} />;
}

export default MyApp;
