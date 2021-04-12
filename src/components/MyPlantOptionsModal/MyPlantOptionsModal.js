import React from "react";
import styled from "styled-components";

const PlantOptions = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  margin: 0 auto !important;
  left: 20%;
  top: 55%;
  width: 65% !important;
  height: 100px;
  border-radius: 10px;
  background-color: white;
  color: black;
  padding: 50px 0;

  div {
    cursor: pointer;
    padding: 5px 0;
  }

  div:hover {
    background-color: #ccc;
  }
`;

const MyPlantOptionsModal = () => {
  return (
    <>
      <PlantOptions>
        <div>View Plant Timeline</div>
        <div>Add/Edit Pictures</div>
        <div>Remove Plant</div>
      </PlantOptions>
    </>
  );
};

export default MyPlantOptionsModal;
