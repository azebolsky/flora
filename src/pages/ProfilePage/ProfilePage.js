import React from "react";
import { Redirect, Link } from "react-router-dom";
import UserPlants from "../../components/UserPlants/UserPlants";
import ProfileImage from "../../Assets/Profile Image.png";
import { auth } from "../../firebase";
// import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import styled from "styled-components";

const ProfileWrapper = styled.section`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  flex: 1 0 auto;

  h3 {
    color: red;
  }
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  box-shadow: 1px 1px 3px 1px var(--light-shadow);
  padding: 5px;
  margin-bottom: 5px;

  img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
`;

const BtnContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPlantsBtn = styled.a`
  width: 40%;
  min-width: 200px;
  height: 75px;
  border: 2px solid var(--primary-color);
  background-color: white;
  border-radius: 5px;
  font-size: 20px;
  color: var(--primary-color);
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ProfilePage = ({
  authStatus,
  usersPlants,
  retrieveUserData,
  deleteModalUpdate,
}) => {
  // const deleteUser = () => {
  //   deleteUserAccount();
  // };

  const listUserPlants = usersPlants.map((plant, id) => {
    return (
      <UserPlants
        key={id}
        plantId={plant.id}
        plantName={plant.commonName}
        image={plant.image}
        userData={retrieveUserData}
        deleteModal={deleteModalUpdate}
      />
    );
  });

  return authStatus.authenticated ? (
    <ProfileWrapper>
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
      </UserSection>
      <BtnContainer>
        <Link to={`/user/${authStatus.id}/plants`}>Check Out Your Garden!</Link>
      </BtnContainer>
    </ProfileWrapper>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProfilePage;
