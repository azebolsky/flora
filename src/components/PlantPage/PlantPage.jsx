import React, { useState, useEffect } from "react";

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
  const [currentPlant, setCurrentPlant] = useState();
  const currentPlantId = parseInt(props.match.params.id);

  console.log(currentPlant);

  useEffect(() => {
    const getPlantInfo = async (id) => {
      const result = await props.plantItems.filter(
        (plantItem) => plantItem.id === id
      );
      setCurrentPlant(result[0]);
      setLoading(false);
    };
    return getPlantInfo(currentPlantId);
  }, [props.plantItems, currentPlantId]);

  return loading && !currentPlant ? (
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
            <strong>Family:</strong> {currentPlant.family}
          </p>
          <p>
            <strong>genus:</strong> {currentPlant.genus}
          </p>
          <button>Add to Collection</button>
        </Divs>
      </Wrapper>
    </StyledPlantPage>
  );
};

export default PlantPage;
