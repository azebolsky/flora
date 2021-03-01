import React, { useState, useEffect } from "react";
import * as plantsAPI from "../../services/api-service";
import { addToPlantCollection, deleteCurrentUsersPlant } from "../../firebase";

import styled from "styled-components";

const StyledPlantPage = styled.div`
  min-height: 100%;
  min-width: 100vw;

  img {
    width: 90%;
    height: auto;
  }

  h1 {
    font-size: 40px;
  }
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
`;

const Divs = styled.div`
  width: 50%;
`;

const PlantPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentPlant, setCurrentPlant] = useState([]);
  const [plantAdded, setPlantAdded] = useState();
  const currentPlantId = parseInt(props.match.params.id);
  const usersPlants = props.userPlantList;

  useEffect(() => {
    const plantStatus = () => {
      return usersPlants.some((plant) => plant.id === currentPlantId);
    };
    const fetchIndividualPlant = async () => {
      const plantData = await plantsAPI.getIndividualPlant(currentPlantId);
      const currentPlantData = await JSON.parse(plantData);
      console.log(currentPlantData);
      setCurrentPlant(currentPlantData.data);
      setLoading(false);
      setPlantAdded(plantStatus);
    };
    return fetchIndividualPlant();
  }, [currentPlantId]);

  const addToUsersPlants = async (e, id, plantName, plantImage) => {
    e.preventDefault();
    id = currentPlantId;
    plantName = currentPlant.common_name;
    plantImage = currentPlant.image_url;
    try {
      addToPlantCollection(id, plantName, plantImage);
      await props.getUserData().then(() => {
        props.addModalUpdate(e);
        return setPlantAdded(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserPlant = async (e) => {
    e.preventDefault();
    try {
      await deleteCurrentUsersPlant(currentPlantId);
      await props.getUserData().then(() => {
        props.deleteModalUpdate(e);
        return setPlantAdded(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <>
      <h1>loading plant...</h1>
    </>
  ) : (
    <StyledPlantPage>
      <h1>{currentPlant.common_name}</h1>
      <Wrapper>
        <Divs>
          <img src={currentPlant.image_url} alt={currentPlant.common_name} />
        </Divs>
        <Divs>
          <p>
            <strong>Scientific Name:</strong> {currentPlant.scientific_name}
          </p>
          <p>
            <strong>Family Common Name:</strong>{" "}
            {currentPlant.family_common_name}
          </p>
          <p>
            <strong>Family:</strong> {currentPlant.main_species.family}
          </p>
          <p>
            <strong>genus:</strong> {currentPlant.main_species.genus}
          </p>
          {currentPlant.main_species.duration ? (
            <p>
              <strong>Duration:</strong> {currentPlant.main_species.duration[0]}
            </p>
          ) : (
            ""
          )}
          {currentPlant.main_species.specifications.average_height.cm ? (
            <p>
              <strong>Average Height:</strong>{" "}
              {currentPlant.main_species.specifications.average_height.cm} cm
            </p>
          ) : (
            ""
          )}
          {currentPlant.main_species.specifications.maximum_height.cm ? (
            <p>
              <strong>Maximum Height:</strong>{" "}
              {currentPlant.main_species.specifications.maximum_height.cm} cm
            </p>
          ) : (
            ""
          )}

          <button onClick={!plantAdded ? addToUsersPlants : deleteUserPlant}>
            {!plantAdded ? "Add" : "Added. Delete here."}
          </button>
        </Divs>
      </Wrapper>
    </StyledPlantPage>
  );
};

export default PlantPage;
