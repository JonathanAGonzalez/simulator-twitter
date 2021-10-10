import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  //Your Config
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };
