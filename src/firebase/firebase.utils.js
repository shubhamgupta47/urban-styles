import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDBpbCoOA-kNMYCL1GJobb3_io8fxB1eRE",
  authDomain: "urbn-clothing-db.firebaseapp.com",
  databaseURL: "https://urbn-clothing-db.firebaseio.com",
  projectId: "urbn-clothing-db",
  storageBucket: "urbn-clothing-db.appspot.com",
  messagingSenderId: "911474299237",
  appId: "1:911474299237:web:3d916620c36cb35508118c",
  measurementId: "G-2XZNZNDM9E",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// access to GoogleAuthProvider class from 'auth' library
const provider = new firebase.auth.GoogleAuthProvider();

//to trigger Google pop up whenever we use Google Auth Provider for auth...
// ...and sign in
provider.setCustomParameters({ prompt: "select_account" });

/**
 *  Here, signInWithPopup() takes the provider class, however it can take
 * many different types of pop-ups like Twitter, Github etc
 */
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;