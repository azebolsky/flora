import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserPlants from "../../components/UserPlants/UserPlants";
import { auth, deleteUserAccount } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const ProfilePage = (props) => {
  const [userPlants, setUserPlants] = useState([]);
  const firestore = firebase.firestore();

  useEffect(() => {
    const getUserData = async () => {
      if (firebase.auth().currentUser) {
        try {
          const currentUser = firebase.auth().currentUser;
          const response = await firestore
            .doc(`users/${currentUser.uid}`)
            .get();
          if (response.exists) {
            const userInfo = response.data();
            let userPlantList = userInfo.plants;
            setUserPlants(userPlantList);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("no user signed in yet");
      }
    };
    return getUserData();
  }, [firestore]);

  const deleteUser = () => {
    deleteUserAccount();
  };

  const listUserPlants = userPlants.map((plant, id) => {
    return (
      <UserPlants
        key={id}
        plantId={plant.id}
        plantName={plant.commonName}
        image={plant.image}
      />
    );
  });

  return props.authStatus.authenticated ? (
    <div>
      <button onClick={deleteUser}>Delete User</button>
      <h1>Hi {props.name}!</h1>
      <img
        src={props.authStatus.photoURL}
        width="100px"
        height="100px"
        alt={props.authStatus.displayName}
      />
      <h2>{props.authStatus.email}</h2>
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign Out
      </button>
      <h1>{props.authStatus.displayName}'s Plants</h1>
      {listUserPlants}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProfilePage;
