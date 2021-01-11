import React from "react";
import { Link } from "react-router-dom";
import { addToPlantCollection } from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
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
  span > .add-btn {
    color: green;
  }
`;

const SearchResults = (props) => {
  let currentId = props.id;
  let commonName = props.commonName;

  const addToUsersPlants = (e, id, plantName, plantImage) => {
    e.preventDefault();
    id = currentId;
    plantName = commonName;
    plantImage = props.image;
    return addToPlantCollection(id, plantName, plantImage);
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
          <span onClick={addToUsersPlants}>
            <i className="add-btn far fa-leaf"></i>Add
          </span>
        ) : (
          ""
        )}
      </section>
    </StyledResults>
  );
};

export default SearchResults;
