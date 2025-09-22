import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css" 

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;
     
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
            pageCount={totalPages}                       
            onPageChange={(selectedItem: { selected: number }) => onPageChange(selectedItem.selected + 1) 
        }
        />
    );
}