'use client';

import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <ReactPaginate
        previousLabel={<ChevronLeft size={18} />}
        nextLabel={<ChevronRight size={18} />}
        breakLabel={'...'}
        pageCount={totalPages > 500 ? 500 : totalPages} // TMDB API limitation
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName={'flex items-center space-x-2 text-gray-300'}
        pageClassName={'w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-700 transition-colors'}
        pageLinkClassName={'w-full h-full flex items-center justify-center'}
        previousClassName={'w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-700 transition-colors'}
        nextClassName={'w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-700 transition-colors'}
        breakClassName={'w-9 h-9 flex items-center justify-center'}
        activeClassName={'bg-purple-600 text-white font-bold pointer-events-none'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
    </div>
  );
};

export default Pagination; 