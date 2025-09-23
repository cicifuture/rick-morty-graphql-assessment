import CharacterCard from "@/components/CharacterCard";
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "@/graphql/queries";
import React, { useState } from "react";
import styles from "./CharactersPage.module.css";
import {
  type CharactersData,
  type CharactersQueryVariables,
} from "@/graphql/types";
import Pagination from "@/components/Pagination";
export default function CharactersPage() {
  const [page, setPage] = useState(1);

  // Not ideal to provide generic arguments to Apollo Client APIs
  const { loading, error, data, refetch } = useQuery<
    CharactersData,
    CharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        Error. <button onClick={() => refetch()}>Retry it</button>
      </div>
    );
  const info = data?.characters.info;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Rick & Morty</h1>
      </header>
      <div className={styles.grid}>
        {data?.characters.results.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={info?.pages || 0}
        hasPrev={!!info?.prev}
        hasNext={!!info?.next}
        onPageChange={setPage}
      />
    </main>
  );
}
