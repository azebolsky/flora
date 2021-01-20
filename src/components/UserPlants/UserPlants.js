import React from "react";
import styled from "styled-components";
import { deleteCurrentUsersPlant } from "../../firebase";

const UserPlant = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: 0.5px solid black;
  box-shadow: 1px 1px 3px 1px var(--light-shadow);

  img {
    width: 100px;
    height: auto;
  }

  .fa-trash-alt {
    cursor: pointer;
  }
`;

const UserPlants = ({ plantId, plantName, image, userData }) => {
  const deleteUserPlant = () => {
    deleteCurrentUsersPlant(plantId).then(function () {
      try {
        userData().then(function () {
          console.log("plant deleted");
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <UserPlant>
      <img src={image} alt={`${plantName}`} />
      <h1>{plantName}</h1>
      <section onClick={deleteUserPlant}>
        <i className="fas fa-trash-alt"></i>
      </section>
    </UserPlant>
  );
};

export default UserPlants;
