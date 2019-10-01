import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    isAuth: Boolean!
    me: any!
  }
`;

export const resolvers = {};
