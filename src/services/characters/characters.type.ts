// UI-safe type (non-nullable, ready for rendering)
export type Character = {
  id: string;
  name: string;
  species: string;
  imageUrl: string;
};

export type Characters = {
  items: Character[];
  pages: number;
  next: number | null;
  prev: number | null;
};

export type CharactersError =
  | { type: "network"; message: string }
  | { type: "graphql"; message: string; details: string[] }
  | { type: "client"; message: string }
  | { type: "unknown"; message: string };
