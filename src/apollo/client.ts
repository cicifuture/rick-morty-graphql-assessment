// Apollo client initalization
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache();

(async () => {
  try {
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
  } catch (error) {
    console.error("Error restoring Apollo cache", error);
  }
})();

export const client: ApolloClient = new ApolloClient({
  link: new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
  cache,
});
