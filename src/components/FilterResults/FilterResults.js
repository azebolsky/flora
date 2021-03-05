import React, { useState } from "react";
import styled from "styled-components";

const FilterButton = styled.button`
  background: none;
  border: none;
`;

const FilterContainer = styled.div`
  height: 100vh;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Families = styled.div`
  display: ${(props) => (props.showResults ? "flex" : "none")};
  flex-direction: row;
  align-items: center;
`;

const families = ["geranium family", "periwinkle family", "daisy family"];
const distributions = [
  "africa",
  "antarctica",
  "asia",
  "europe",
  "north america",
  "south america",
];

const FilterResults = ({ filterFunc }) => {
  const [showResults, setShowResults] = useState({
    family: false,
    native: false,
  });
  function handleClick(event) {
    let currentState = showResults[event.target.value];
    setShowResults({
      ...showResults,
      [event.target.value]: !currentState,
    });
  }

  const familyList = families.map((family) => {
    return (
      <Families showResults={showResults.family}>
        <input type="checkbox" id={family} onClick={(e) => filterFunc(e)} />
        <p>{family}</p>
      </Families>
    );
  });

  const distributionsList = distributions.map((distribution) => {
    return (
      <Families showResults={showResults.native}>
        <input
          type="checkbox"
          id={distribution}
          onClick={(e) => filterFunc(e)}
        />
        <p>{distribution}</p>
      </Families>
    );
  });

  return (
    <FilterContainer>
      <FilterButton
        value="family"
        onClick={(event) => {
          handleClick(event);
        }}
      >
        Family
      </FilterButton>
      <ResultList>{familyList}</ResultList>
      <FilterButton
        value="native"
        onClick={(event) => {
          handleClick(event);
        }}
      >
        Native
      </FilterButton>
      <ResultList>{distributionsList}</ResultList>
    </FilterContainer>
  );
};

export default FilterResults;
