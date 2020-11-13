import React from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../firebase";

const ProfilePage = ({ userStatus }) => {
  return userStatus.authenticated ? (
    <div>
      <h1>Hi {userStatus.displayName}!</h1>
      <img
        src={userStatus.photoURL}
        width="100px"
        height="100px"
        alt={userStatus.displayName}
      />
      <h2>{userStatus.email}</h2>
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProfilePage;
