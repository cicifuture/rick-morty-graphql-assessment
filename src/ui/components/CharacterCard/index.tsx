import styles from "./CharacterCard.module.css";
import type { CharacterVM } from "@/ui/viewModel/characters.viewModel";

type Props = {
  character: CharacterVM;
};

export default function CharacterCard({ character }: Props) {
  return (
    <article className={styles.card}>
      <img
        src={character.imageUrl}
        alt={character.name}
        className={styles.image}
        loading="lazy"
      />
      <h3 className={styles.name}>{character.name}</h3>
      <p className={styles.species}>{character.species}</p>
    </article>
  );
}
