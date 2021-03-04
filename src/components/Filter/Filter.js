import React, { useState } from "react";
import styled from "styled-components";
import * as plantsAPI from "../../services/api-service";

const FilterContainer = styled.div`
  height: 100vh;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
`;

const FamilyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Families = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: row;
  align-items: center;
`;

const families = ["geranium family", "periwinkle family", "daisy family"];

const Filter = ({ filterFunc }) => {
  const [show, setShow] = useState(false);

  const showFamily = () => {
    setShow(!show);
  };

  // const filterFunc = async (e) => {
  //   e.preventDefault();
  //   console.log("hi there buddy");
  //   const family = e.target.id;
  //   const filterData = await plantsAPI.familyFilter(family);
  //   console.log(filterData);
  // };

  const familyList = families.map((family) => {
    return (
      <Families show={show}>
        <input type="checkbox" id={family} onClick={(e) => filterFunc(e)} />
        <p>{family}</p>
      </Families>
    );
  });

  return (
    <FilterContainer>
      <h1>Filter</h1>
      <FilterButton onClick={showFamily}>Family</FilterButton>
      <FamilyContainer>{familyList}</FamilyContainer>
    </FilterContainer>
  );
};

export default Filter;
