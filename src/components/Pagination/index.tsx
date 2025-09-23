import styles from "./Pagination.module.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  hasPrev,
  hasNext,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className={styles.nav}>
      <button disabled={!hasPrev} onClick={() => onPageChange(page - 1)}>
        ◀ Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button disabled={!hasNext} onClick={() => onPageChange(page + 1)}>
        Next ▶
      </button>
    </nav>
  );
}
