import { useCallback, useMemo, useState } from "react";
import { useCharacters } from "@/services/characters/characters.service";
import type { CharacterVM } from "@/services/characters/characters.mapper";

export type CharactersViewModel = {
  page: number;
  items: CharacterVM[];
  totalPages: number;
  canPrev: boolean;
  canNext: boolean;
  loading: boolean;
  error: Error | undefined;
  retry: () => void;
  goToPage: (nextPage: number) => void;
};

const clampPage = (page: number, max: number) => {
  if (page < 1) return 1;
  return max > 0 ? Math.min(page, max) : page;
};

export function useCharactersViewModel(): CharactersViewModel {
  const [page, setPage] = useState(1);
  const { loading, error, data, refetch } = useCharacters(page);

  const items = useMemo(() => data?.items ?? [], [data]);
  const totalPages = data?.pages ?? 1;
  const canPrev = !!data?.prev;
  const canNext = !!data?.next;

  const goToPage = useCallback(
    (target: number) => {
      setPage((current) => {
        const desired = Number.isFinite(target) ? target : current;
        // Guard against race conditions where pagination overshoots the server total
        return clampPage(desired, totalPages);
      });
    },
    [totalPages]
  );

  return {
    page,
    items,
    totalPages,
    canPrev,
    canNext,
    loading,
    error: error ?? undefined,
    retry: () => {
      void refetch();
    },
    goToPage,
  };
}
