// TODO: Use GraphQL Codegen to generate types from schema and queries

export type Character = {
  id: string;
  name: string;
  species: string;
  image: string;
};

export type CharactersData = {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Character[];
  };
};

export type CharactersQueryVariables = {
  page: number;
};

export type CharactersVars = { page: number };
