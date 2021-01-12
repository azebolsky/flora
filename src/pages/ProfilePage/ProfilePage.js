import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserPlants from "../../components/UserPlants/UserPlants";
import ProfileImage from "../../Assets/Profile Image.png";
import { auth } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import styled from "styled-components";

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
`;

const ProfilePage = ({ authStatus }) => {
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
  }, [firestore, userPlants]);

  // const deleteUser = () => {
  //   deleteUserAccount();
  // };

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

  return authStatus.authenticated ? (
    <>
      <UserSection>
        {/* <button onClick={deleteUser}>Delete User</button> */}
        <h1>Hi {authStatus.displayName}!</h1>
        <img
          src={authStatus.photoURL ? authStatus.photoURL : ProfileImage}
          alt={authStatus.displayName}
        />
        <h2>{authStatus.email}</h2>
        <button
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign Out
        </button>
        <h1>{authStatus.displayName}'s Plants</h1>
      </UserSection>
      <div>{listUserPlants}</div>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProfilePage;
