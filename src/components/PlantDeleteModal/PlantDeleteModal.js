import React from "react";
import styled from "styled-components";

const DeleteContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
`;

const DeleteModal = styled.div`
  width: 200px;
  height: 50px;
  font-size: 20px;
  background-color: var(--dark-shadow);
  opacity: 0.9;
  border-radius: 8px;
  border-left: 20px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlantDeleteModal = () => {
  return (
    <>
      <DeleteContainer>
        <DeleteModal>Plant Deleted</DeleteModal>
      </DeleteContainer>
    </>
  );
};

export default PlantDeleteModal;
