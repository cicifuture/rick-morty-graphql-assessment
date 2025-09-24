// // Apollo client initalization
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache();

await persistCache({ cache, storage: new LocalStorageWrapper(localStorage) });

export const client: ApolloClient = new ApolloClient({
  link: new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
  cache,
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-first", nextFetchPolicy: "cache-first" },
    query: { fetchPolicy: "cache-first" },
  },
});
