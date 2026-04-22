import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalItems);

  /* Smart page list with ellipsis */
  const getPageList = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 4) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 3) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const base =
    "min-w-[36px] h-9 px-2 rounded-xl border text-sm transition-all duration-150 flex items-center justify-center select-none";
  const inactiveBtn =
    "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95";
  const activeBtn =
    "border-gray-900 bg-gray-900 text-white font-semibold cursor-default";
  const arrowBtn =
    "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white";

  return (
    <div className="flex flex-col items-start gap-2 mt-8 select-none">
      <div className="flex items-center gap-1 flex-wrap">
        {/* Prev */}
        <button
          className={`${base} ${arrowBtn}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Page numbers */}
        {getPageList().map((page, idx) =>
          page === "..." ? (
            <span
              key={`dots-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm tracking-widest"
            >
              ···
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${base} ${page === currentPage ? activeBtn : inactiveBtn}`}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          className={`${base} ${arrowBtn}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06L7.28 11.78a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Info label */}
      <p className="text-xs text-gray-400">
        Showing{" "}
        <span className="text-gray-600 font-medium">
          {from}–{to}
        </span>{" "}
        of <span className="text-gray-600 font-medium">{totalItems}</span>{" "}
        products
      </p>
    </div>
  );
};

export default Pagination;
