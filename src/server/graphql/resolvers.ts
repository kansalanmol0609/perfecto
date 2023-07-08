//queries
import {readFeedbacks} from './queries/readFeedbacks';
import {readNewsLetterSubscribers} from './queries/readNewsLetterSubscribers';
import {readFoodItems} from './queries/readFoodItems';
import {readOrders} from './queries/readOrders';
import {fetchFoodItem} from './queries/fetchFoodItem';
import {fetchTableBookings} from './queries/fetchTableBookings';

//mutations
import {createNewsLetterSubscriber} from './mutations/createNewsLetterSubscriber';
import {deleteNewsLetterSubscriber} from './mutations/deleteNewsLetterSubscriber';
import {createFeedback} from './mutations/createFeedback';
import {createFood} from './mutations/createFood';
import {deleteFoodItem} from './mutations/deleteFoodItem';
import {updateFoodItem} from './mutations/updateFoodItem';
import {sendEmailToNewsLetterSubscribers} from './mutations/sendEmailToNewsLetterSubscribers';
import {createTableBooking} from './mutations/createTableBooking';
import {cancelTableBooking} from './mutations/cancelTableBooking';
import {confirmTableBooking} from './mutations/confirmTableBooking';

export const resolvers = {
  Query: {
    readFeedbacks,
    readNewsLetterSubscribers,
    readFoodItems,
    readOrders,
    fetchFoodItem,
    fetchTableBookings,
  },

  Mutation: {
    createFeedback,
    createNewsLetterSubscriber,
    deleteNewsLetterSubscriber,
    sendEmailToNewsLetterSubscribers,
    createFood,
    deleteFoodItem,
    updateFoodItem,
    createTableBooking,
    cancelTableBooking,
    confirmTableBooking,
  },
};
