import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { auth } from "../../firebase";

const ProfilePage = ({ userStatus }) => {
  const user = useContext(UserContext);
  return userStatus.authenticated ? (
    <div>
      <h1>Hi {userStatus.displayName}!</h1>
      <img src={userStatus.photoURL} width="100px" height="100px" />
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
