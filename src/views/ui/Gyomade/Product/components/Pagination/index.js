import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {getPageNumbers().map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              pageNumber === currentPage ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
