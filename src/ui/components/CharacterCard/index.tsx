import styles from "./CharacterCard.module.css";
import type { CharacterVM } from "@/services/characters/characters.mapper";

type Props = {
  character: CharacterVM;
};

export default function CharacterCard({ character }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={character.imageUrl}
          alt={character.name}
          width={300}
          height={300}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <h3 className={styles.name}>{character.name}</h3>
      <p className={styles.species}>{character.species}</p>
    </article>
  );
}
