import { useEffect } from "react";

const Pagination = ({
  currentPage,
  totalProducts,
  setCurrentPage,
  currentProductsPg,
  setCurrentProductsPg,
}) => {
  const totalPages = Math.ceil(totalProducts / currentProductsPg);

  let startRange = (currentPage - 1) * currentProductsPg + 1;
  let endRange = startRange + currentProductsPg - 1;

  if (endRange > totalProducts) {
    endRange = totalProducts;
  } else if (endRange < totalProducts && currentPage === 1) {
    endRange = currentPage * 10;
    startRange = 1;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (endRange < totalProducts && currentPage === 1) {
      setCurrentProductsPg(10);
    }
  };

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="gradientBtn text-white font-bold px-12 py-3 rounded-md text-xl">
          Showing {startRange} - {endRange} of {totalProducts} results | Page{" "}
          {currentPage}
        </p>
      </div>
      <div>
        <button
          className={`${
            hasPreviousPage ? "" : "bg-gray-100"
          }  gradientBtnPrev px-10 py-3 rounded-lg mr-1 text-white font-bold text-xl`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
        >
          Previous
        </button>

        <button
          className={`${
            hasNextPage ? "" : "bg-gray-100"
          } gradientBtn px-12 py-3 rounded-lg ml-1 text-white font-bold text-xl`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
