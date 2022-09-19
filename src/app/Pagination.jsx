import React from 'react';

const createPagesArray = (pagesCount) => {
  const pagesArray = [];
  for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber += 1) {
    pagesArray.push(pageNumber);
  }
  return pagesArray;
};

const Pagination = ({ pages, currentPage, painationClickHandler }) => {
  const pagesArray = createPagesArray(pages);
  return (
    <ul className='d-flex justify-content-end pagination-list'>
      {pagesArray.map((page) => (
        <li
          key={page}
          className={
            page === currentPage
              ? 'pagination-list_item pagination-list_item-active'
              : 'pagination-list_item'
          }
          onClick={() => painationClickHandler(page)}>
          {page}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
