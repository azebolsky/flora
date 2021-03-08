import React from "react";
import FilterResults from "../FilterResults/FilterResults";
// import styled from "styled-components";

const Filter = ({ filterFunc }) => {
  return (
    <>
      <h1>Filter</h1>
      <FilterResults filterFunc={filterFunc} />
    </>
  );
};

export default Filter;
