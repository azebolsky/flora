import React from "react";
import styled from "styled-components";
import { deleteCurrentUsersPlant } from "../../firebase";

const UserPlant = styled.div`
  display: inline-block;
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 10px;
  border-radius: 10px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;

  h1 {
    opacity: 0;
    width: 90%;
    color: white;
    font-size: 30px;
    z-index: 2;
    text-align: left;
    margin-left: 10px;
  }

  section {
    opacity: 0;
    width: 10%;
    color: red;
    z-index: 2;
    margin-right: 10px;
  }

  .fa-trash-alt {
    cursor: pointer;
  }

  &:hover&::after {
    content: "";
    background-color: black;
    position: absolute;
    top: 0%;
    left: 0%;
    bottom: 0;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    opacity: 0.3;
  }
  &:hover {
    h1,
    section {
      opacity: 1;
    }
  }
`;

const OnHoverContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PlantImage = styled.img`
  display: block;
  opacity: 0;
  width: 100%;
`;

const UserPlants = ({ plantId, plantName, image, userData, deleteModal }) => {
  const deleteUserPlant = (e) => {
    deleteCurrentUsersPlant(plantId).then(function () {
      try {
        userData().then(function () {
          return deleteModal(e);
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <UserPlant img={image}>
      <PlantImage src={image} alt={`${plantName}`} />
      <OnHoverContainer>
        <h1>{plantName}</h1>
        <section onClick={deleteUserPlant}>
          <i className="fas fa-trash-alt"></i>
        </section>
      </OnHoverContainer>
    </UserPlant>
  );
};

export default UserPlants;
