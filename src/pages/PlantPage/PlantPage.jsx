import React, { useState, useEffect } from "react";
import * as plantsAPI from "../../services/plant-service";

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
  const currentPlantId = parseInt(props.match.params.id);

  useEffect(() => {
    const fetchIndividualPlant = async () => {
      const plantData = await plantsAPI.getIndividualPlant(currentPlantId);
      setCurrentPlant(plantData.data);
      setLoading(false);
    };
    return fetchIndividualPlant();
  }, [currentPlantId]);

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
          <button>Add to Collection</button>
        </Divs>
      </Wrapper>
    </StyledPlantPage>
  );
};

export default PlantPage;
