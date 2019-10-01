import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { resolvers, typeDefs } from "../graphql/resolvers";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

declare global {
  interface Window {
    gapi: any;
  }
}

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "<insert-production-url>"
    : "http://localhost:4000/graphql";

const httpLink = createHttpLink({
  uri: BASE_URL
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export default () => {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...headers,
        authorization: token || ""
      }
    };
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    cache,
    resolvers,
    typeDefs,
    link: authLink.concat(link)
  });
};
