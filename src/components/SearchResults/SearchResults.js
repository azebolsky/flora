import React from "react";
import { Link } from "react-router-dom";
import { addToPlantCollection, deleteCurrentUsersPlant } from "../../firebase";
import altPlantImage from "../../Assets/alt-plant-image2.jpg";
import "firebase/auth";
import "firebase/firestore";
import styled from "styled-components";

const StyledResults = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  border-bottom: 1px solid grey;
  margin: 10px;
  h1 {
    text-align: left;
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px 0;

  div {
    min-width: 20%;
  }
`;

const StyledImage = styled.img`
  margin: 0 15px;
  border-radius: 5px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const PlantStatus = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  margin-right: 10px;
`;

const PlantIcon = styled.i`
  color: green;
  font-size: 22px;
`;

const SearchResults = (props) => {
  let currentId = props.id;
  let commonName = props.commonName;
  const usersPlants = props.userPlantList;

  const addToUsersPlants = async (e, id, plantName, plantImage) => {
    e.preventDefault();
    id = currentId;
    plantName = commonName;
    plantImage = props.image;
    try {
      addToPlantCollection(id, plantName, plantImage);
      await props.getUserData().then(() => {
        return props.addModalUpdate(e);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserPlant = async (e) => {
    e.preventDefault();
    try {
      await deleteCurrentUsersPlant(currentId);
      await props.getUserData().then(() => {
        props.deleteModalUpdate(e);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const plantStatus = () => {
    return usersPlants.some((plant) => plant.id === props.id);
  };

  return (
    <StyledResults>
      <StyledSection>
        <StyledImage
          // src={props.image ? props.image : altPlantImage}
          src={altPlantImage}
          alt={props.commonName}
        />
        <div>
          <h1>{props.commonName}</h1>
          <p>{props.familyCommonName}</p>
        </div>
        <Link to={`/plants/${props.id}`}>Plant Details</Link>
        {props.authStatus.authenticated ? (
          <PlantStatus
            onClick={plantStatus() ? deleteUserPlant : addToUsersPlants}
          >
            <PlantIcon
              className={plantStatus() ? "fa fa-leaf" : "far fa-leaf"}
            ></PlantIcon>
            {!plantStatus() ? "Add" : "Added"}
          </PlantStatus>
        ) : (
          ""
        )}
      </StyledSection>
    </StyledResults>
  );
};

export default SearchResults;
