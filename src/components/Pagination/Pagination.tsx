import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css" 

interface PaginationProps {
    currentPage: number;
    totalNumberOfPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalNumberOfPages, onPageChange }: PaginationProps) {
    if (totalNumberOfPages <= 1) return null;
    return (
        <ReactPaginate
            className={css.pagination}
            pageClassName={css.pageItem}
            pageLinkClassName={css.pageLink}
            activeClassName={css.active}
            previousClassName={css.pageItem}
            nextClassName={css.pageItem}               
            previousLabel="←"                  
            breakClassName={css.pageItem}                
            breakLabel="..."                            
            nextLabel="→"                           
            forcePage={currentPage - 1}                  
            pageCount={totalNumberOfPages}                       
            onPageChange={(selectedItem: { selected: number }) => onPageChange(selectedItem.selected + 1) 
        }
        />
    );
}