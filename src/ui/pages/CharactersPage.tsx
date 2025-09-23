import { useState } from "react";
import { useCharacters } from "@/services/characters/characters.service";
import CharacterCard from "@/ui/components/CharacterCard";
import Pagination from "@/ui/components/Pagination";
import styles from "./CharactersPage.module.css";

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const { loading, error, data, refetch } = useCharacters(page);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error loading characters.
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {data.items.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={data.pages}
        hasPrev={!!data.prev}
        hasNext={!!data.next}
        onPageChange={setPage}
      />
    </main>
  );
}
