import { useMemo } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';

export const Pagination = ({
  currentPage,
  totalPage,
  setCurrentPage,
}: {
  currentPage: number;
  totalPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (!totalPage || totalPage <= 0) return null;

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPage) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPage <= 7) {
      for (let i = 0; i < totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      if (currentPage < 3) {
        pages.push(1, 2, 3);
        pages.push('ellipsis-end');
        pages.push(totalPage - 1);
      } else if (currentPage >= totalPage - 3) {
        pages.push('ellipsis-start');
        pages.push(totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1);
      } else {
        pages.push('ellipsis-start');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('ellipsis-end');
        pages.push(totalPage - 1);
      }
    }
    return pages;
  };

  const pages = useMemo(() => getPageNumbers(), [currentPage, totalPage]);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
          disabled={currentPage === 0}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium 
          ${
            currentPage === 1
              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}>
          Previous
        </button>
        <button
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPage - 1}
          className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
            currentPage === totalPage
              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}>
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md shadow-xs">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
              currentPage === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-400 hover:bg-gray-50'
            } ring-1 ring-inset ring-gray-300 focus:z-20`}>
            <span className="sr-only">Previous</span>
            <GrPrevious
              aria-hidden="true"
              className="size-5"
            />
          </button>

          {pages.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <span
                  key={`${page}-${index}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                  ...
                </span>
              );
            }
            return (
              <button
                onClick={() => handlePageChange(page)}
                key={`${page}-${index}`}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                }`}>
                {page + 1}
              </button>
            );
          })}

          <button
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPage - 1}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
              currentPage === totalPage - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-400 hover:bg-gray-50'
            } ring-1 ring-inset ring-gray-300 focus:z-20`}>
            <span className="sr-only">Next</span>
            <GrNext
              aria-hidden="true"
              className="size-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
