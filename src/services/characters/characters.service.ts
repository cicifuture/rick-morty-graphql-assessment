import { useQuery } from "@apollo/client";
import {
  GetCharactersDocument,
  type GetCharactersQuery,
  type GetCharactersQueryVariables,
} from "@/api/generated/graphql";
import { mapToCharacters } from "./characters.mapper";
import type { Characters } from "./characters.type";

export function useCharactersService(page: number) {
  
  // Data fetching
  const query = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
    GetCharactersDocument,
    {
      variables: { page },
      fetchPolicy: "cache-first", 
      errorPolicy: "all",
    }
  );

 // Data transformation
  const characters: Characters | null = query.data
    ? mapToCharacters(query.data)
    : null;

  return {
    loading: query.loading,
    error: query.error,
    refetch: query.refetch,
    data: characters,
  };
}
