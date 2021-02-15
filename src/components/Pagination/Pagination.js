import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PaginatedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PageNumber = styled.div`
  background-color: white;
  border: 1px solid grey;
  height: 40px;
  width: 60px;
  padding: 5px;
  margin: 0 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevPageBtn = styled.button`
  margin: 20px;
  width: 10%;
  min-width: 80px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: var(--secondary-brand-color);
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: var(--hover-color);
  }
`;
const NextPageBtn = styled.button`
  margin: 20px;
  width: 10%;
  min-width: 80px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: blue;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: var(--hover-color);
  }
`;

const Pagination = ({ currentPage, changePageNumber, totalPosts }) => {
  // calculate total amount of pages possible
  // almost 19,000
  const totalPages = Math.round(totalPosts / 20);
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }
  const pagesDisplayed = range(currentPage, currentPage + 5);
  // how to take current page and display next 5
  // ex: << < 2 3 4 5 6 7 > >>

  const renderPages = pagesDisplayed.map((page) => {
    return (
      <PageNumber id={page} onClick={(e) => changePageNumber(e)}>
        {page}
      </PageNumber>
    );
  });

  return (
    <PaginatedContainer>
      <PrevPageBtn
        id={currentPage - 1}
        onClick={currentPage > 1 ? (e) => changePageNumber(e) : null}
      >
        Previous
      </PrevPageBtn>
      <pageNumber id="1" onClick={(e) => changePageNumber(e)}>
        First
      </pageNumber>
      {renderPages}
      <PageNumber id={currentPage + 6} onClick={(e) => changePageNumber(e)}>
        ...
      </PageNumber>
      <NextPageBtn id={currentPage + 1} onClick={(e) => changePageNumber(e)}>
        Next
      </NextPageBtn>
      <pageNumber id={totalPages} onClick={(e) => changePageNumber(e)}>
        Last
      </pageNumber>
    </PaginatedContainer>
  );
};

export default Pagination;
