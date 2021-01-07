import React from "react";
import { Link } from "react-router-dom";
import { addToPlantCollection } from "../../firebase";
import styled from "styled-components";

const StyledResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px var(--light-shadow);
  background-color: var(--background-color);
  margin: 10px;
  min-width: 20%;
  max-width: 50%;
  &:hover {
    box-shadow: 1px 1px 8px 1px black;
  }
  /* display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  */
  section {
    display: flex;
    flex-direction: column;
    padding: 25px 0;
  }
  img {
    margin: 0 15px;
    border-radius: 5px;
  }
  h1 {
    text-align: left;
  }
`;

const SearchResults = (props) => {
  let currentId = props.id;
  const addToUsersPlants = (e, id) => {
    e.preventDefault();
    id = currentId;
    return addToPlantCollection(id);
  };

  return (
    <StyledResults>
      <img
        src={props.image}
        alt={props.commonName}
        width="100px"
        height="auto"
      />
      <section>
        <Link to={`/plants/${props.id}`}>
          <h1>{props.commonName}</h1>
          <p>{props.familyCommonName}</p>
        </Link>
        {props.authStatus.authenticated ? (
          <button onClick={addToUsersPlants}>Add to Collection</button>
        ) : (
          ""
        )}
      </section>
    </StyledResults>
  );
};

export default SearchResults;
