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

const Pagination = ({ currentPage, changePageNumber, totalPages }) => {
  // calculate total amount of pages possible
  // almost 19,000
  const [pagesDisplayed, setPagesDisplayed] = useState();
  const [newPages, setNewPages] = useState(true);

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  };

  useEffect(() => {
    if (totalPages) {
      const pages =
        totalPages >= 6
          ? range(currentPage, currentPage + 5)
          : range(1, totalPages);
      console.log(pages);
      setPagesDisplayed(pages);
      setNewPages(false);
    }
  }, [newPages, totalPages, currentPage]);

  const nextPageCheck = (e) => {
    e.preventDefault();
    if (currentPage === pagesDisplayed[5]) {
      setNewPages(true);
    }
  };

  const prevPageCheck = (e) => {
    e.preventDefault();
    if (currentPage === 1) return;
    if (currentPage === pagesDisplayed[0] && currentPage > 6) {
      const pages = range(currentPage - 6, currentPage - 1);
      setPagesDisplayed(pages);
    }
  };

  const renderPages =
    pagesDisplayed === undefined
      ? ""
      : pagesDisplayed.map((page) => {
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
        });

  return pagesDisplayed ? (
    <PaginatedContainer>
      <PageNumber id="1" onClick={(e) => changePageNumber(e)}>
        First
      </PageNumber>
      <PrevPageBtn
        id={currentPage === 1 ? currentPage : currentPage - 1}
        onClick={(e) => {
          changePageNumber(e);
          prevPageCheck(e);
        }}
      >
        Previous
      </PrevPageBtn>
      {renderPages}
      {totalPages > 7 ? (
        <PageNumber
          id={pagesDisplayed[5] + 1}
          onClick={(e) => {
            changePageNumber(e);
            setNewPages(true);
          }}
        >
          ...
        </PageNumber>
      ) : (
        ""
      )}
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
