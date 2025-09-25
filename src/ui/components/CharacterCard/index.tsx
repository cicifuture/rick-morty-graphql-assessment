import type { Character } from "@/services/characters/characters";
import styles from "./CharacterCard.module.css";


type Props = {
  character: Character;
};

export default function CharacterCard({ character }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* Reserve a square slot to avoid layout shift while the image streams in */}
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
