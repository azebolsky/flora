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

const StyledButton = styled.button`
  width: 10px;
  height: 10px;
  border: 1px solid black;
  background-color: ${(props) => (props.showActive ? "blue" : "none")};
  border-radius: 3px;
  margin-right: 5px;
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
  const [filtersToPass, setFiltersToPass] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    family: { 0: false, 1: false, 2: false },
    native: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
  });
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

  const updateFilters = (e, index) => {
    const currentFilterType = e.target.value;
    const currentFilterName = e.target.id;
    // console.log(currentFilterName);
    // if (activeFilters.family[index]) {
    //   setFiltersToPass(
    //     filtersToPass.filter((item) => item !== currentFilterName)
    //   );
    // } else {
    //   setFiltersToPass([...filtersToPass, currentFilterName]);
    // }
    if (currentFilterType === "family") {
      setActiveFilters({
        ...activeFilters,
        family: {
          ...activeFilters.family,
          [index]: !activeFilters.family[index],
        },
      });
      setFiltersToPass([...filtersToPass, currentFilterName]);
      console.log(filtersToPass);
    } else {
      setActiveFilters({
        ...activeFilters,
        native: {
          ...activeFilters.native,
          [index]: !activeFilters.native[index],
        },
      });
    }
    return filterFunc(e, activeFilters.family[index]);
  };

  const familyList = families.map((family, index) => {
    return (
      <Families key={family} showResults={showResults.family}>
        <StyledButton
          value={"family"}
          showActive={activeFilters.family[index]}
          id={family}
          onClick={(e) => {
            updateFilters(e, index);
          }}
        ></StyledButton>
        <p>{family}</p>
      </Families>
    );
  });

  const distributionsList = distributions.map((distribution, index) => {
    return (
      <Families
        value={index}
        key={distribution}
        showResults={showResults.native}
      >
        <StyledButton
          showActive={activeFilters.native[index]}
          value={index}
          id={distribution}
          onClick={(e) => {
            filterFunc(e, index);
            // setActiveFilters({
            //   ...activeFilters,
            //   native: {
            //     ...activeFilters.native,
            //     [index]: !activeFilters.native[index],
            //   },
            // });
          }}
        ></StyledButton>
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
        Native Country
      </FilterButton>
      <ResultList>{distributionsList}</ResultList>
    </FilterContainer>
  );
};

export default FilterResults;
