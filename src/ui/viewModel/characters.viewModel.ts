import { useCallback, useState } from "react";
import { useCharactersService } from "@/services/characters/characters.service";
import type { Character } from "@/services/characters/characters.type";

export type CharactersViewModel = {
  page: number;
  items: Character[];
  totalPages: number;
  canPrev: boolean;
  canNext: boolean;
  loading: boolean;
  error: Error | undefined;
  retry: () => void;
  goNext: () => void;
  goPrev: () => void;
};

export function useCharactersViewModel(): CharactersViewModel {
  const [page, setPage] = useState(1);
  const { loading, error, data, refetch } = useCharactersService(page);

  const items = data?.items ?? [];
  const totalPages = data?.pages ?? 1;
  const canPrev = data?.prev !== null && data?.prev !== undefined;
  const canNext = data?.next !== null && data?.next !== undefined;

  // For future improvements, we can use goToPage to implement more navigation methods
  const goToPage = useCallback(
    (target: number) => {
      if (
        typeof target !== "number" ||
        !Number.isFinite(target) ||
        target < 1
      ) {
        console.warn(`Invalid page: ${target}. Must be a positive number.`);
        return;
      }

      if (target > totalPages) {
        console.warn(`Page ${target} exceeds total pages ${totalPages}`);
        target = totalPages;
      }

      const clampPage = (page: number, max: number) => {
        if (page < 1) return 1;
        return max > 0 ? Math.min(page, max) : page;
      };

      setPage((current) => {
        const newPage = clampPage(target, totalPages);
        if (newPage !== current) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        }
        return newPage;
      });
    },
    [totalPages]
  );

  const goNext = useCallback(() => {
    if (canNext) {
      goToPage(page + 1);
    }
  }, [canNext, goToPage, page]);

  const goPrev = useCallback(() => {
    if (canPrev) {
      goToPage(page - 1);
    }
  }, [canPrev, goToPage, page]);

  const retry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    page,
    items,
    totalPages,
    canPrev,
    canNext,
    loading,
    error,
    retry,
    goNext,
    goPrev,
  };
}
