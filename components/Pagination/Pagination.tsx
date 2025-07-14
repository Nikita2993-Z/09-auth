import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  setPage,
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal);

  return (
    <ReactPaginate
      pageCount={safeTotal}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={safeCurrent - 1}

      containerClassName={styles.pagination}        // UL
      pageClassName={styles.pageItem}              // LI
      pageLinkClassName={styles.pageLink}          // A внутри LI

      previousClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles.pageLink}

      breakClassName={styles.pageItem}
      breakLinkClassName={styles.pageLink}

      activeClassName={styles.active}              // LI.active
      disabledClassName={styles.disabled}          // LI.disabled

      previousLabel="←"
      nextLabel="→"
    />
  );
}