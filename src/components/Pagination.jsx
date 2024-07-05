import style from '../css/Pagination.module.css';
import { useEffect, useState } from 'react';
import { usePagination } from '../store/paginationStore';

function Pagination() {
  const { currentPage, setCurrentPage, groupSize, totalPages } =
    usePagination();

  const pageGroup = Math.ceil(currentPage / groupSize); // 현재 페이지 그룹
  const firstPage = (pageGroup - 1) * groupSize + 1; //페이지그룹 내 첫번째 페이지
  const lastPage = Math.min(totalPages, firstPage + groupSize - 1); //페이지그룹 내 마지막 페이지

  const moveToPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPgnationButtons = () => {
    let paginationButtons = [];
    for (let i = firstPage; i <= lastPage && i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          className={`${style.paginationButton} ${
            i === currentPage ? style.on : ''
          }`}
          onClick={() => moveToPage(i)}
        >
          {i}
        </button>
      );
    }
    return paginationButtons;
  };

  return (
    <div className={style.pgnationBtnCon}>
      <button
        disabled={pageGroup === 1 ? true : false}
        onClick={() => moveToPage(firstPage - groupSize)}
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button
        disabled={currentPage === firstPage && pageGroup === 1 ? true : false}
        onClick={() => moveToPage(currentPage - 1)}
      >
        <i className="fa-solid fa-caret-left"></i>
      </button>
      {renderPgnationButtons()}
      <button
        disabled={currentPage === totalPages ? true : false}
        onClick={() => moveToPage(currentPage + 1)}
      >
        <i className="fa-solid fa-caret-right"></i>
      </button>
      <button
        disabled={lastPage >= totalPages}
        onClick={() => moveToPage(lastPage + 1)}
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
