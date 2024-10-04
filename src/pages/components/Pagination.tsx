interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePreviousPage, handleNextPage }) => {
  return (
    <div className="mt-4 flex items-center">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-2 py-1 hover:bg-slate-400 text-xs bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        قبلی
      </button>
      <span className="mx-4 text-xs">
        صفحه {currentPage} از {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-2 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed text-xs"
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
