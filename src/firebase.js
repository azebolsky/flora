import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCqpLipWV13ISoPeiG9kz79lR9pl11wWRw",
  authDomain: "flora-409f7.firebaseapp.com",
  databaseURL: "https://flora-409f7.firebaseio.com",
  projectId: "flora-409f7",
  storageBucket: "flora-409f7.appspot.com",
  messagingSenderId: "531016039830",
  appId: "1:531016039830:web:7077b7cb2c358ecbd331b7",
  measurementId: "G-D7462NCQT8",
};

const provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

// create a collection for the users which contains docs for each user
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  // create reference to the user's document in the users collection
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.log("error firebase line 41: " + error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.log("error fetching: " + error);
  }
};
