import React from "react";
import styled from "styled-components";
import { deleteCurrentUsersPlant } from "../../firebase";

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

const UserPlants = ({ plantId, plantName, image }) => {
  const deleteUserPlant = () => {
    return deleteCurrentUsersPlant(plantId);
  };

  return (
    <UserPlant>
      <img src={image} alt={`${plantName}`} />
      <h1>{plantName}</h1>
      <button onClick={deleteUserPlant}>X</button>
    </UserPlant>
  );
};

export default UserPlants;
