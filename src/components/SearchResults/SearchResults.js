import React from "react";

const SearchResults = ({ resultItems, pages }) => {
  return (
    <div>
      <ul>
        {resultItems.map((item) => (
          <li key={item.id}>
            {item.common_name}
            <img src={item.image_url} alt="plant" width="100px" height="auto" />
          </li>
        ))}
      </ul>
      <button onClick={pages}>next page</button>
    </div>
  );
};

export default SearchResults;
