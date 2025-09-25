import { useEffect, useCallback } from "react";
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = useCallback(() => {
    if (!hasPrev) return;
    onPageChange(page - 1);
    scrollToTop();
  }, [hasPrev, onPageChange, page]);

  const goNext = useCallback(() => {
    if (!hasNext) return;
    onPageChange(page + 1);
    scrollToTop();
  }, [hasNext, onPageChange, page]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          /^(input|textarea|select)$/i.test(target.tagName))
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrev]);

  return (
    <nav className={styles.pagination}>
      <button disabled={!hasPrev} onClick={goPrev}>
        ◀ Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button disabled={!hasNext} onClick={goNext}>
        Next ▶
      </button>
    </nav>
  );
}
