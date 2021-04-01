import React from "react";
import { Redirect } from "react-router-dom";
import UserPlants from "../../components/UserPlants/UserPlants";
import styled from "styled-components";

const UserPlantContainer = styled.div`
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;

  -webkit-column-gap: 15px;
  -moz-column-gap: 15px;
  column-gap: 15px;
`;

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

  return authStatus.authenticated ? (
    <>
      <h1>{authStatus.displayName}'s Plants</h1>
      {usersPlants.length ? (
        <UserPlantContainer>{listUserPlants}</UserPlantContainer>
      ) : (
        <>
          <h3>No plants have been added :(</h3>
        </>
      )}
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default MyPlantsPage;
