import type { GetCharactersQuery } from "@/api/generated/graphql";

// UI-safe type (non-nullable, ready for rendering)
export type CharacterVM = {
  id: string;
  name: string;
  species: string;
  imageUrl: string;
};

export type CharactersVM = {
  items: CharacterVM[];
  pages: number;
  next: number | null;
  prev: number | null;
};

const FALLBACK_IMG = "https://rickandmortyapi.com/api/character/avatar/19.jpeg";

// Mapper: API → UI-safe model
export function mapToCharactersVM(data: GetCharactersQuery): CharactersVM {
  const info = data.characters?.info;

  const items: CharacterVM[] =
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
