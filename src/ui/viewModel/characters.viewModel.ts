import { useCallback, useState, useEffect } from "react";
import { useCharactersService } from "@/services/characters/characters.service";
import type { Character } from "@/services/characters/characters.type";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPageState] = useState<number>(() => {
    const urlPage: string | null = searchParams.get("page");
    return urlPage ? Math.max(1, parseInt(urlPage, 10)) : 1;
  });

  const { loading, error, data, refetch } = useCharactersService(page);

  const items = data?.items ?? [];
  const totalPages = data?.pages ?? 1;
  const canPrev = data?.prev !== null && data?.prev !== undefined;
  const canNext = data?.next !== null && data?.next !== undefined;

  const goToPage = useCallback(
    (target: number) => {
      if (target > totalPages) {
        console.warn(`Page ${target} exceeds total pages ${totalPages}`);
        target = totalPages;
      }

      const clampedPage = Math.min(Math.max(1, target), totalPages);
      setPageState(clampedPage);

      setSearchParams((prev) => {
        if (clampedPage === 1) {
          prev.delete("page");
        } else {
          prev.set("page", clampedPage.toString());
        }
        return prev;
      });
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    [totalPages, setSearchParams]
  );

  useEffect(() => {
    const urlPage = searchParams.get("page");
    const pageFromUrl = urlPage ? Math.max(1, parseInt(urlPage, 10)) : 1;

    if (pageFromUrl !== page) {
      setPageState(pageFromUrl);
    }
  }, [searchParams, page]);

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
