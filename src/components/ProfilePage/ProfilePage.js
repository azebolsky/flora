import React from "react";
import { Redirect } from "react-router-dom";
import { auth, deleteUserAccount } from "../../firebase";

const ProfilePage = (props) => {
  console.log(props.authStatus.authenticated);
  const deleteUser = () => {
    deleteUserAccount();
  };
  return props.authStatus.authenticated ? (
    <div>
      <button onClick={deleteUser}>Delete User</button>
      <h1>Hi {props.authStatus.displayName}!</h1>
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
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProfilePage;
