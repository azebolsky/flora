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
  console.log("line 28");
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
      console.log("error firebase.js line 41: " + error);
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
    console.log("error fetching firebase.js: " + error);
  }
};

export const updateUserInfo = async (item) => {
  const currentUser = await firebase.auth().currentUser;
  // const uid = currentUser.uid;
  console.log(currentUser);
  // const userData = {
  //   favorites: [item.id],
  // };
  // return firebase
  //   .firestore()
  //   .doc(`/users/${uid}`)
  //   .set(userData, { merge: true });
};

export const getUserPlants = async (uid, commonName, familyCommonName) => {
  if (!uid) return null;
  try {
    await firestore
      .collection("plants")
      .add({
        name: commonName,
        family: familyCommonName,
      })
      .then(function (docRef) {
        console.log("document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.log("error adding document: ", error);
      });
  } catch (error) {
    console.log("error fetching firebase.js: ", error);
  }
};
