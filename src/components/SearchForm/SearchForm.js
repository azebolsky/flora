import React from "react";

const SearchForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input type="text" value={props.searchTerm} onChange={props.onChange} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SearchForm;
