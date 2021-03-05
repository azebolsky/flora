import React, { useState } from "react";
import FilterResults from "../FilterResults/FilterResults";
import styled from "styled-components";

const Filter = ({ filterFunc }) => {
  const [show, setShow] = useState({
    family: false,
    native: false,
  });

  return (
    <>
      <h1>Filter</h1>
      <FilterResults filterFunc={filterFunc} />
    </>
  );
};

export default Filter;
