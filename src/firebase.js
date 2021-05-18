import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
export const storage = firebase.storage();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // /** @type {firebase.auth.OAuthCredential} */
      // var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = credential.accessToken;
      // console.log(token);
      // The signed-in user info.
      var user = result.user;
      generateUserDocument(user);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(`error code: ${errorCode}`);
      console.log(`error message: ${errorMessage}`);
      console.log(`error email: ${email}`);
      console.log(`error credential: ${credential}`);
    });
};

// create a collection for the users which contains docs for each user
export const generateUserDocument = async (user, additionalData) => {
  console.log("heyyyy line 54");
  if (!user) return;
  // create reference to the user's document in the users collection
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, photoURL } = user;
    try {
      await userRef
        .set({
          displayName: additionalData
            ? additionalData.displayName
            : user.displayName,
          email: email,
          photoURL: photoURL,
          plants: [],
        })
        .then(
          await user.updateProfile({
            displayName: additionalData
              ? additionalData.displayName
              : user.displayName,
          })
        )
        .then(function () {
          console.log("profile updated");
        });
    } catch (error) {
      console.log("error firebase.js line 71: " + error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    console.log(userDocument);
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.log("error fetching firebase.js: " + error);
  }
};

export const deleteUserAccount = () => {
  let user = firebase.auth().currentUser;
  user
    .delete()
    .then(function () {
      console.log("user deleted");
      console.log(user);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteCurrentUsersPlant = async (plantId) => {
  console.log(plantId);
  const currentUser = firebase.auth().currentUser;
  const currentUserId = currentUser.uid;
  const userDoc = firebase.firestore().collection("users").doc(currentUserId);
  const response = await firestore.doc(`users/${currentUser.uid}`).get();
  if (response.exists) {
    const userInfo = response.data();
    return userDoc.update({
      plants: userInfo.plants.filter((plant) => plant.id !== plantId),
    });
  }
};

export const addToPlantCollection = (plantId, plantName, plantImage) => {
  const currentUserId = firebase.auth().currentUser.uid;
  const userDoc = firebase.firestore().collection("users").doc(currentUserId);
  console.log(`Adding ${plantId}-${plantName} to collection`);
  // adds plant to plant array
  // arrayUnion prevents a duplicate plant from being added
  userDoc.update({
    plants: firebase.firestore.FieldValue.arrayUnion({
      id: plantId,
      commonName: plantName,
      image: plantImage,
      userImages: {},
    }),
  });
};

// export const addPlantImage = (plantId, usersImage) => {
//   console.log(`image URL-${usersImage}`);
//   console.log(`id-${plantId}`);
//   const currentUserId = firebase.auth().currentUser.uid;
//   console.log(currentUserId);
//   const userDoc = firebase.firestore().collection("users").doc(currentUserId);
//   console.log(userDoc);
//   console.log(`Adding ${plantId}-${plantName} to collection`);
//   // adds plant to plant array
//   // arrayUnion prevents a duplicate plant from being added
//   userDoc.update({
//     plants: firebase.firestore.FieldValue.arrayUnion({
//       id: plantId,
//       commonName: plantName,
//       image: plantImage,
//     }),
//   });
// };

export const updateUserData = () => {
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser.uid;
  const userData = { lastLogInTime: new Date() };
  const updatePromise = firebase
    .firestore()
    .doc(`/users/${uid}`)
    .set(userData, { merge: true });
  firestore
    .doc(`users/${uid}`)
    .get()
    .then((doc) => {
      return doc.data();
    });
  return Promise.all([updatePromise]);
};
