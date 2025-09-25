import { ApolloProvider as Provider } from "@apollo/client";
import { client } from "@/apollo/client";

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider client={client}>{children}</Provider>;
};
