import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CutsomPagination = ({currentPage,totalResults,setCurrentPage}) => {
    const [totalPage, setTotalPage] = useState(0);
    const [pageItems, setPageItems] = useState([])

    useEffect(() => {
        setTotalPage(Math.floor(totalResults/10));
    }, [totalResults]);

    useEffect(() => {
        let tempPageList = [];
        let first = 1;
        let last = 10;
        if(totalPage < 10){
            first =1;
            if(totalPage === 0)
                last = 1
            else
                last = totalPage;
        }
        else if(currentPage<10){
             first = 1;
             last = 10;
        }
        else if(currentPage + 10 > totalPage ){
            last = totalPage;
            first = totalPage - 10;
        }
        else{
            first = currentPage - 4;
            last = currentPage + 5;
        }
        for (let page = first; page <= last; page++) {
            tempPageList.push(
            <Pagination.Item key={page} active={page === currentPage} onClick={()=>{setCurrentPage(page)}}>
                {page}
            </Pagination.Item>,
            );
        }
        setPageItems(tempPageList);
    }, [totalPage,currentPage]);

    return (
        < div className="absolute bottom-0 right-0 px-8 py-2 w-full flex justify-end bg-gray-100   items-center   z-10">
        <Pagination className="overflow-x-auto m-0">
            <Pagination.First onClick={()=>{setCurrentPage(1)}} />
            <Pagination.Prev onClick={()=>{setCurrentPage(currentPage - 1)}}/>
            {
                pageItems.map((item,index)=>{
                    return(item)
                })
            }
            <Pagination.Next onClick={()=>{setCurrentPage(currentPage + 1)}}/>
            <Pagination.Last onClick={()=>{setCurrentPage(totalPage)}}/>
        </Pagination>
            <span className="text-gray-700 text-center text-sm px-1 flex justify-items-center justify-center items-center w">{Math.max(totalPage,1)} pages</span>
        </div>
    )
}

export default CutsomPagination;
