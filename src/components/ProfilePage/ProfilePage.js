import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { auth, deleteUserAccount } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import styled from "styled-components";

const UserPlant = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  margin-bottom: 10px;
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;
  background-color: lightgoldenrodyellow;

  img {
    width: 100px;
    height: auto;
  }
`;

const ProfilePage = (props) => {
  const [userPlants, setUserPlants] = useState([]);
  const firestore = firebase.firestore();

  useEffect(() => {
    const getUserData = () => {
      const currentUser = firebase.auth().currentUser;
      const uid = currentUser.uid;
      firestore
        .doc(`users/${uid}`)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const userInfo = doc.data();
            let userPlantList = userInfo.plants;
            setUserPlants(userPlantList);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
    };
    return getUserData();
  }, [firestore]);

  const deleteUser = () => {
    deleteUserAccount();
  };

  // const showUserData = (e) => {
  //   e.preventDefault();
  //   return getUserData();
  // };

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

      {userPlants.map((plant) => {
        return (
          <UserPlant>
            <img src={plant.image} alt={`${plant.commonName}`} />
            <h1>{plant.commonName}</h1>
          </UserPlant>
        );
      })}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProfilePage;
