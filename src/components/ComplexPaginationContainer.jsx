import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export const ComplexPaginationContainer = () => {
  const {search, pathname} = useLocation();
  const navigate = useNavigate();
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const handlePageChange = (page) => {    
    const searchParams = new URLSearchParams(search);  
    searchParams.set('page', page);
    navigate(`${pathname}?${searchParams.toString()}`);         
  }

  const addPageButton = ({page, activeClass}) => {
    return (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`btn btn-xs sm:btn-md border-none join-item ${activeClass ? 'bg-base-300 border-base-300' : ''}`}
      >
        {page}
      </button>
    );
  };
    
  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(addPageButton({pageNumber: 1, activeClass: page === 1}));
    if (page > 2) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md border-none" key="dots-1">
          ...
        </button>
        );
    }
    if(page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({pageNumber: page, activeClass: true}));
    }
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md border-none" key="dots-2">
          ...
        </button>
        );
    }
    pageButtons.push(addPageButton({pageNumber: pageCount, activeClass: page === pageCount}));
    return pageButtons;
  }

  if (pageCount < 2) {
    return null;
  }
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;            
            handlePageChange(prevPage);
          }}
          className={`btn btn-xs sm:btn-md join-item ${page === 1 ? 'disabled:opacity-50' : ''}`}          
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
          className={`btn btn-xs sm:btn-md join-item ${page === pageCount ? 'disabled:opacity-50' : ''}`}
      </div>
    </div>
  );
    
}


  
