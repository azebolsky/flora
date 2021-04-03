import React from "react";
import { Redirect } from "react-router-dom";
import UserPlants from "../../components/UserPlants/UserPlants";
import styled from "styled-components";

const MyPlantContainer = styled.section`
  flex: 1 0 auto;
  text-align: center;
`;

const UserPlantContainer = styled.div`
  width: 90%;
  margin: 0 auto;

  -webkit-column-count: 4;
  -moz-column-count: 4;
  column-count: 4;

  -webkit-column-gap: 15px;
  -moz-column-gap: 15px;
  column-gap: 15px;

  @media (max-width: 1000px) {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }

  @media (max-width: 800px) {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
`;

const MyPlantsPage = ({
  authStatus,
  usersPlants,
  retrieveUserData,
  deleteModalUpdate,
}) => {
  const listUserPlants = usersPlants.map((plant, id) => {
    const img = new Image();
    img.onload = function () {
      console.log(this.width + "x" + this.height);
    };
    img.src = `${plant.image}`;
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
    <MyPlantContainer>
      <h1>{authStatus.displayName}'s Plants</h1>
      {usersPlants.length ? (
        <UserPlantContainer>{listUserPlants}</UserPlantContainer>
      ) : (
        <>
          <h3>No plants have been added :(</h3>
        </>
      )}
    </MyPlantContainer>
  ) : (
    <Redirect to="/login" />
  );
};

export default MyPlantsPage;
