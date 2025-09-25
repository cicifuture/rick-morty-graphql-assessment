import { useQuery } from "@apollo/client";
import {
  GetCharactersDocument,
  type GetCharactersQuery,
  type GetCharactersQueryVariables,
} from "@/api/generated/graphql";
import { mapToCharactersVM, type CharactersVM } from "./characters.mapper";

export function useCharacters(page: number) {
  const query = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
    GetCharactersDocument,
    {
      variables: { page },
      fetchPolicy: "cache-and-network", 
    }
  );

  const vm: CharactersVM | null = query.data
    ? mapToCharactersVM(query.data)
    : null;

  return {
    loading: query.loading,
    error: query.error,
    refetch: query.refetch,
    data: vm,
  };
}
