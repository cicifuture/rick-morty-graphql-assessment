import CharacterCard from "@/ui/components/CharacterCard";
import Pagination from "@/ui/components/Pagination";
import styles from "./CharactersPage.module.css";
import { useCharactersViewModel } from "@/ui/viewModel/characters.viewModel";
import type { CharactersViewModel } from "@/ui/viewModel/characters.viewModel";
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
    goToPage,
  }: CharactersViewModel = useCharactersViewModel();

  if (loading) {
    return <div className={styles.loading}>Loading characters…</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error loading characters.
        <button onClick={retry}>
          Retry
        </button>
      </div>
    );
  }

  if (!items.length) return null;

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
        onPageChange={goToPage}
      />
    </main>
  );
}
