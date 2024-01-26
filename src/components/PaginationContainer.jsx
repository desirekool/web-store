import { useLoaderData, useLocation, useNavigation } from "react-router-dom";



const PaginationContainer = () => {
  const {meta} = useLoaderData();
  const navigate = useNavigation();
  const {search, pathname} = useLocation();
  const {pageCount, page} = meta.pagination;

  const pages = Array.from({length: pageCount}, (_, i) => i + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  if ( pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button 
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }} 
        >Prev</button>
        {pages.map((pageNumber) => {                    
          return (
            <button 
              key={pageNumber} 
              className={`btn btn-xs sm:btn-md border-none join-item ${pageNumber === page ? 'bg-base-300' : ''}`} 
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
        <button 
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >Next</button>
      </div>
    </div>
  );
};

export default PaginationContainer;