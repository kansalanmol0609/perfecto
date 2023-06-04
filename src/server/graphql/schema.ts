export const typeDefs = `#graphql
  type Feedback {
    id: String!
    name: String!
    email: String!
    subject: String!
    message: String!
    createdAt: String
  }

  type NewsLetterSubscriber {
    email: String!
    createdAt: String!
  }

  input CreateFeedbackInput {
    name: String!
    email: String!
    subject: String!
    message: String!
  }

  input SendEmailToNewsLetterSubscribersInput {
    receiverEmailAddresses: [String]!
    subject: String!
    body: String!
  }

  type Query {
    readFeedbacks: [Feedback]!
    readNewsLetterSubscribers: [NewsLetterSubscriber]!
  }

  type Mutation {
    createFeedback(feedbackInput: CreateFeedbackInput!): Feedback!
    createNewsLetterSubscriber(email: String!): NewsLetterSubscriber!
    deleteNewsLetterSubscriber(email: String!): NewsLetterSubscriber!
    sendEmailToNewsLetterSubscribers(sendEmailToNewsLetterSubscribersInput: SendEmailToNewsLetterSubscribersInput!): Boolean
  }
`;
