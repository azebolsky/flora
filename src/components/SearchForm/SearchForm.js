import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  margin: 25px 0 5px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    width: 50%;
    height: 40px;
    box-shadow: 1px 1px 2px 1px var(--light-shadow);
    border-radius: 5px;
    font-size: 20px;
    outline: none;
  }
  p {
    margin-left: 10px;
  }
`;

const SearchForm = ({ handleSubmit, searchTerm, onChange, clearSearch }) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={onChange}
      />
      <p onClick={clearSearch}>Reset</p>
    </StyledForm>
  );
};

export default SearchForm;
