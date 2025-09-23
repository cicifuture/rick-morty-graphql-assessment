import type { Character } from "@/graphql/types";
import styles from "./CharacterCard.module.css";

type CharacterProps = {
  character: Character;
};
export default function CharacterCard({ character }: CharacterProps) {
  return (
    <article>
      <img
        src={character.image}
        alt={character.name}
        className={styles.image}
        loading="lazy"
      />
      <h3 className={styles.name}>{character.name}</h3>
      <p className={styles.species}>{character.species}</p>
    </article>
  );
}
