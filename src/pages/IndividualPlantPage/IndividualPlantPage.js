import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PlantsContainer = styled.section`
  flex: 1 0 auto;
`;

const StyledHeader = styled.h1`
  color: black;
`;

const StyledPlant = styled.div`
  width: 100%;
`;

const IndividualPlantPage = (props) => {
  const [currentPlant, setCurrentPlant] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const plantId = parseInt(props.match.params.plantid);
    const plants = props.usersPlants;
    const plantData = plants.filter((plant) => {
      return plant.id === plantId;
    });
    setCurrentPlant(plantData[0]);
    setLoading(false);
  }, []);

  return !loading ? (
    <PlantsContainer>
      <StyledHeader>{currentPlant.commonName}</StyledHeader>
      <StyledPlant>Your Photos</StyledPlant>
    </PlantsContainer>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default IndividualPlantPage;
