import React from "react";
import styled from "styled-components";

const StyledResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: lightgreen;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px black;
  margin: 10px;
  &:hover {
    box-shadow: 1px 1px 15px 1px black;
  }
`;

const SearchResults = (props) => {
  return (
    <StyledResults>
      <h1>{props.commonName}</h1>
      <img src={props.image} alt="plant" width="100px" height="auto" />
    </StyledResults>
  );
};

export default SearchResults;
