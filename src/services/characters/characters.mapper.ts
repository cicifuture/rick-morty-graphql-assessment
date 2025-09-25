import type { GetCharactersQuery } from "@/api/generated/graphql";
import type { Character, Characters } from "./characters";

const FALLBACK_IMG = "https://rickandmortyapi.com/api/character/avatar/19.jpeg";

// Mapper: API → UI-safe model
export function mapToCharacters(data: GetCharactersQuery): Characters {
  const info = data.characters?.info;

  const items: Character[] =
    data.characters?.results
      ?.filter(
        (character): character is NonNullable<typeof character> => !!character
      )
      .map((character) => ({
        id: character.id ?? "",
        name: character.name ?? "Unknown",
        species: character.species ?? "Unknown",
        imageUrl: character.image ?? FALLBACK_IMG,
      })) ?? [];

  return {
    items,
    pages: info?.pages ?? 1,
    next: info?.next ?? null,
    prev: info?.prev ?? null,
  };
}
