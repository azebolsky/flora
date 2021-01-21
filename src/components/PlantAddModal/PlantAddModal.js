import React from "react";
import styled from "styled-components";

const AddModal = styled.div`
  position: absolute;
  width: 150px;
  height: 70px;
  background-color: green;
  z-index: 500;
  font-size: 10px;
`;

const PlantAddModal = () => {
  return (
    <>
      <AddModal>
        <h1>Plant Added</h1>
      </AddModal>
    </>
  );
};

export default PlantAddModal;
