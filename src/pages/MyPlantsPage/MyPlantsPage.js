import React from "react";
import { Redirect } from "react-router-dom";
import UserPlants from "../../components/UserPlants/UserPlants";

const MyPlantsPage = ({
  authStatus,
  usersPlants,
  retrieveUserData,
  deleteModalUpdate,
}) => {
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
  //   return <h1>Plant Page</h1>;

  return authStatus.authenticated ? (
    <>
      <div>
        <h1>{authStatus.displayName}'s Plants</h1>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "grey",
            marginBottom: "20px",
          }}
        ></div>
        {usersPlants.length ? (
          <>{listUserPlants}</>
        ) : (
          <>
            <h3>No plants have been added :(</h3>
          </>
        )}
      </div>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default MyPlantsPage;
