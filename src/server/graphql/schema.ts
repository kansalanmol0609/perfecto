export const typeDefs = `#graphql
  type Feedback {
    id: String!
    name: String!
    email: String!
    subject: String!
    message: String!
  }

  type Query {
    readFeedbacks: [Feedback]!
  }
`;
