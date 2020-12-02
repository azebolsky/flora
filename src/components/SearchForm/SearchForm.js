import React from "react";

const SearchForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <input type="text" value={props.searchTerm} onChange={props.onChange} />
        <button onClick={props.clearSearchInput}>X</button>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default SearchForm;
