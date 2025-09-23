import styles from "./Pagination.module.css";

type Props = {
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
}: Props) {
  return (
    <nav className={styles.pagination}>
      <button
        disabled={!hasPrev}
        onClick={() => {
          onPageChange(page - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        ◀ Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button
        disabled={!hasNext}
        onClick={() => {
          onPageChange(page + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Next ▶
      </button>
    </nav>
  );
}
