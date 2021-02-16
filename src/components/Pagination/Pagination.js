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
  background-color: ${(props) =>
    props.currentPg === "current" ? "green" : ""};
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
  const [pagesDisplayed, setPagesDisplayed] = useState();
  const [newPages, setNewPages] = useState(true);

  const totalPages = Math.round(totalPosts / 20);
  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  };
  useEffect(() => {
    const pages = range(currentPage, currentPage + 5);
    setPagesDisplayed(pages);
    setNewPages(false);
    console.log(">>>>>>>>>>>>");
  }, [newPages]);

  const nextPageCheck = (e) => {
    e.preventDefault();
    if (currentPage === pagesDisplayed[5]) {
      setNewPages(true);
    }
  };

  const prevPageCheck = (e) => {
    e.preventDefault();
    if (currentPage === pagesDisplayed[0] && currentPage !== 0) {
      const pages = range(currentPage - 5, currentPage - 1);
      setPagesDisplayed(pages);
    }
  };

  const renderPages = pagesDisplayed
    ? pagesDisplayed.map((page) => {
        return (
          <PageNumber
            key={page}
            currentPg={currentPage === page ? "current" : "no"}
            id={page}
            onClick={(e) => changePageNumber(e)}
          >
            {page}
          </PageNumber>
        );
      })
    : "";

  return pagesDisplayed ? (
    <PaginatedContainer>
      <PageNumber id="1" onClick={(e) => changePageNumber(e)}>
        First
      </PageNumber>
      <PrevPageBtn
        id={currentPage - 1}
        onClick={(e) => {
          changePageNumber(e);
          prevPageCheck(e);
        }}
      >
        Previous
      </PrevPageBtn>
      {renderPages}
      <PageNumber
        id={pagesDisplayed[5] + 1}
        onClick={(e) => {
          changePageNumber(e);
          setNewPages(true);
        }}
      >
        ...
      </PageNumber>
      <NextPageBtn
        id={currentPage + 1}
        onClick={(e) => {
          changePageNumber(e);
          nextPageCheck(e);
        }}
      >
        Next
      </NextPageBtn>
      <PageNumber id={totalPages} onClick={(e) => changePageNumber(e)}>
        Last
      </PageNumber>
    </PaginatedContainer>
  ) : (
    ""
  );
};

export default Pagination;
