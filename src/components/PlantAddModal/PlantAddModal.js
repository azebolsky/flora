import React from "react";
import styled from "styled-components";

const AddContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
`;

const AddModal = styled.div`
  width: 200px;
  height: 50px;
  font-size: 20px;
  background-color: var(--dark-shadow);
  opacity: 0.9;
  border-radius: 8px;
  border-left: 20px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlantAddModal = () => {
  return (
    <>
      <AddContainer>
        <AddModal>Plant Added</AddModal>
      </AddContainer>
    </>
  );
};

export default PlantAddModal;
