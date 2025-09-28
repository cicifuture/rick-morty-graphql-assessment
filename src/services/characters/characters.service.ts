import { useQuery, type ApolloError } from "@apollo/client";
import {
  GetCharactersDocument,
  type GetCharactersQuery,
  type GetCharactersQueryVariables,
} from "@/api/generated/graphql";
import { mapToCharacters } from "./characters.mapper";
import type { Characters, CharactersError } from "./characters.type";

function normalizeError(error?: ApolloError): CharactersError | null {
  if (!error) {
    return null;
  }

  if (error.networkError) {
    return {
      type: "network",
      message: "Network error. Please check your connection and try again.",
    };
  }

  if (error.graphQLErrors.length > 0) {
    return {
      type: "graphql",
      message: "We couldn't process your request.",
      details: error.graphQLErrors.map((graphQLError) => graphQLError.message),
    };
  }

  if (error.clientErrors.length > 0) {
    return {
      type: "client",
      message: "Unexpected client error occurred.",
    };
  }

  return {
    type: "unknown",
    message: error.message,
  };
}

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
    error: normalizeError(query.error),
    refetch: query.refetch,
    data: characters,
  };
}
