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

  enum OrderStatus {
  PREPARING
  OUT_FOR_DELIVERY
  DELIVERED
  TERMINATED
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

  type Rating {
    id: String!
    rating: Int!
    comment: String!
    createdAt: String!
    updatedAt: String!
  }

  type OrderDTO{
    id: String!
    status:    OrderStatus
    createdAt: String!
    updatedAt: String!
    userId: String!
    address: Address!
    rating: Rating
  }

  type OrderItem {
    food: Food!
    count: Int!
  }

  type Order{
    id: String!
    status:    OrderStatus
    createdAt: String!
    updatedAt: String!
    user: User!
    address: Address!
    rating: Rating
    items: [OrderItem]!
  }

  enum TableBookingStatus {
    WAITING_FOR_CONFIRMATION
    CANCELLED
    CONFIRMED
  }

  enum UserRole {
    USER
    ADMIN
  }

  type Address {
    id: String!
    line1: String!
    line2: String
    city: String!
    state: String!
    country: String!
    pinCode: String!
    createdAt: String!
    updatedAt: String!
    userId: String!
  }

  type User {
    id: String!
    name: String
    email: String
    emailVerified: String
    image: String
    createdAt: String
    updatedAt: String
    role: UserRole!
    addresses: [Address]!
  }

  type TableBooking {
    id: String!
    date: String!
    numberOfPeople: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    tableBookingStatus: TableBookingStatus!
  }

  type NewsLetterSubscriber {
    email: String!
    createdAt: String!
  }

  type CartItem{
    food: Food!
    count: Int!
  }

  type Cart{
    id: String!
    items: [CartItem]!
    userId: String!
  }

  enum BookingType {
    UPCOMING
    PENDING
    PAST
    CANCELLED
  }


  type CompleteUser {
    id: String!
    name: String
    email: String
    emailVerified: String
    image: String
    createdAt: String
    updatedAt: String
    role: UserRole!
    addresses: [Address]!
    orders: [OrderDTO]!
    tableBookings: [TableBooking]!
  }


  type Query {
    readFeedbacks: [Feedback]!
    readNewsLetterSubscribers: [NewsLetterSubscriber]!
    readFoodItems: [Food]!
    readOrders: [Order]!
    fetchFoodItem(foodItemId: String!): Food
    fetchTableBookings(bookingType: BookingType!): [TableBooking]!
    readCartItems: Cart!
    fetchUserDetails: CompleteUser!
    readAddresses: [Address]!
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

  input CreateTableBookingInput {
    numberOfPeople: Int!
    date: String!
  }

  input AddressInput {
    line1: String!
    line2: String
    city: String!
    state: String!
    country: String!
    pinCode: String!
  }

  input OrderItemInput{
    foodId: String!
    count: Int!
  }

  type Mutation {
    createFeedback(feedbackInput: CreateFeedbackInput!): Feedback!
    createNewsLetterSubscriber(email: String!): NewsLetterSubscriber!
    deleteNewsLetterSubscriber(email: String!): NewsLetterSubscriber!
    sendEmailToNewsLetterSubscribers(sendEmailToNewsLetterSubscribersInput: SendEmailToNewsLetterSubscribersInput!): Boolean
    createFood(createFoodInput: CreateFoodInput!): Food!
    deleteFoodItem(foodItemId: String!): Food!
    updateFoodItem(updateFoodItemInput: UpdateFoodItemInput!): Food!
    createTableBooking(createTableBookingInput: CreateTableBookingInput!): TableBooking!
    cancelTableBooking(id: ID!): TableBooking!
    confirmTableBooking(id: ID!): TableBooking!
    addItemInCart(foodId: String!): Cart!
    removeItemFromCart(foodId: String!): Cart!
    addAddress(addressInput: AddressInput!): Address!
    updateAddress(addressId: String!, addressInput: AddressInput!): Address!
    removeAddress(addressId: String!): Address!
    placeOrder(addressId: String!, items: [OrderItemInput]!): Order!
  }
`;
