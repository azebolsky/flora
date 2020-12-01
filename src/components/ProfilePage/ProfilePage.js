import React from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../firebase";

const ProfilePage = (props) => {
  return props.authStatus.authenticated ? (
    <div>
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
