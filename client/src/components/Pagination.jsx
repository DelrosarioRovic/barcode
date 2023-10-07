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
    <div className="flex justify-between mt-5 px-2">
      <div>
        <p className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md">
          Showing {startRange} - {endRange} of {totalProducts} results | Page{" "}
          {currentPage}
        </p>
      </div>
      <div>
        <button
          className={`${
            hasPreviousPage ? "bg-gray-300 hover:bg-gray-500" : "bg-gray-100"
          } text-gray-600 px-4 py-2 rounded-l mr-1`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
        >
          Previous
        </button>

        <button
          className={`${
            hasNextPage ? "bg-gray-300 hover:bg-gray-500" : "bg-gray-100"
          } text-gray-600 px-4 py-2 rounded-r ml-1`}
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
