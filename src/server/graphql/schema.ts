export const typeDefs = `#graphql
  type Feedback {
    id: String!
    name: String!
    email: String!
    subject: String!
    message: String!
    createdAt: String
  }

  enum FoodCategory {
    BREAKFAST
    LUNCH
    DINNER
    DESSERT
    DRINK
  }

  type Price {
    amount: String!
    currency: String!
    precision: Int
  }

  type Food {
    id: String!
    name: String!
    description: String!
    pictures: String!
    isVeg: Boolean!
    inStock: Boolean!
    price: Price!
    category: FoodCategory!
    createdAt: String!
    updatedAt: String!
    userId: String!
  }

  type NewsLetterSubscriber {
    email: String!
    createdAt: String!
  }

  type Query {
    readFeedbacks: [Feedback]!
    readNewsLetterSubscribers: [NewsLetterSubscriber]!
    readFoodItems: [Food]!
    fetchFoodItem(foodItemId: String!): Food
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

  input PriceInput {
    amount: Int!
    currency: String!
    precision: Int
  }

  input CreateFoodInput {
    name: String!
    description: String!
    pictures: String!
    isVeg: Boolean!
    inStock: Boolean!
    price: PriceInput!
    category: FoodCategory!
  }

  input UpdateFoodItemInput {
    id: ID!
    name: String!
    description: String!
    pictures: String!
    isVeg: Boolean!
    inStock: Boolean!
    price: PriceInput!
    category: FoodCategory!
  }

  type Mutation {
    createFeedback(feedbackInput: CreateFeedbackInput!): Feedback!
    createNewsLetterSubscriber(email: String!): NewsLetterSubscriber!
    deleteNewsLetterSubscriber(email: String!): NewsLetterSubscriber!
    sendEmailToNewsLetterSubscribers(sendEmailToNewsLetterSubscribersInput: SendEmailToNewsLetterSubscribersInput!): Boolean
    createFood(createFoodInput: CreateFoodInput!): Food!
    deleteFoodItem(foodItemId: String!): Food!
    updateFoodItem(updateFoodItemInput: UpdateFoodItemInput!): Food!
  }
`;
