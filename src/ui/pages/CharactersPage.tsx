import CharacterCard from "@/ui/components/CharacterCard";
import Pagination from "@/ui/components/Pagination";
import styles from "./CharactersPage.module.css";
import { useCharactersViewModel } from "@/ui/viewModel/characters.viewModel";
import type { CharactersViewModel } from "@/ui/viewModel/characters.viewModel";

// Page displaying a grid of character cards with pagination controls
export default function CharactersPage() {
  const {
    page,
    items,
    loading,
    error,
    canNext,
    canPrev,
    totalPages,
    retry,
    goNext,
    goPrev,
  }: CharactersViewModel = useCharactersViewModel();

  // Loading state
  if (loading) {
    return <div className={styles.loading}>Loading characters…</div>;
  }

  // Error state
  if (error) {
    return (
      <div className={styles.error}>
        Error loading characters.
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  // Empty state
  if (!items.length)
    return <div className={styles.emptyList}>No characters found.</div>;

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {items.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        hasPrev={canPrev}
        hasNext={canNext}
        onPrev={goPrev}
        onNext={goNext}
      />
    </main>
  );
}
