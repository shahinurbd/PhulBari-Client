
const Pagination = ({totalPages, currentPage, handlePageChange}) => {
    return (

    <div className="flex justify-center items-center space-x-2 p-4 mt-10">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="sm:w-10 w-8 sm:h-10 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* First page */}
        <button
        onClick={() => handlePageChange(1)}
        className={`sm:w-10 w-8 sm:h-10 h-8 flex items-center justify-center rounded-full ${
          currentPage === 1
            ? "bg-pink-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        1
      </button>

      {/* Current, Previous, Next */}
      {currentPage > 2 && <span className="px-2">...</span>}

      {currentPage !== 1 && currentPage !== totalPages && (
        <button
          className="sm:w-10 w-8 sm:h-10 h-8 flex items-center justify-center rounded-full bg-pink-500 text-white"
          onClick={() => handlePageChange(currentPage)}
        >
          {currentPage}
        </button>
      )}

      {currentPage < totalPages - 1 && <span className="px-2">...</span>}

      {/* Last page */}
      {totalPages > 1 && (
        <button
        onClick={() => handlePageChange(totalPages)}
        className={`sm:w-10 w-8 sm:h-10 h-8 flex items-center justify-center rounded-full ${
          currentPage === totalPages
            ? "bg-pink-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {totalPages}
      </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="sm:w-10 w-8 sm:h-10 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
    );
};

export default Pagination;