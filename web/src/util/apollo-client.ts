import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  HttpLink,
} from "@apollo/client";
import { getApiUrl } from "util/api";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";

const linkChain = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
}).concat(new HttpLink({ uri: "/api/graphql" }));

// Use to test disabled cache
const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
};

// Makes requests:
//   - Via graphql proxy endpoint
//   - With query persistance
// Used for:
//   - Unauthenticated client queries
export const apolloClientClient = new ApolloClient({
  uri: `/graphql`,
  cache: new InMemoryCache(),
  link: linkChain,
  defaultOptions,
});

// Makes requests:
//   - Directly to graphql server
// Used for:
//   - Build time and ISR queries
const apolloClientServer = new ApolloClient({
  uri: `${getApiUrl()}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default apolloClientServer;
