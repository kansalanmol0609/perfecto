//queries
import {readFeedbacks} from './queries/readFeedbacks';
import {readNewsLetterSubscribers} from './queries/readNewsLetterSubscribers';
import {readFoodItems} from './queries/readFoodItems';

//mutations
import {createNewsLetterSubscriber} from './mutations/createNewsLetterSubscriber';
import {deleteNewsLetterSubscriber} from './mutations/deleteNewsLetterSubscriber';
import {createFeedback} from './mutations/createFeedback';
import {createFood} from './mutations/createFood';
import {deleteFoodItem} from './mutations/deleteFoodItem';
import {sendEmailToNewsLetterSubscribers} from './mutations/sendEmailToNewsLetterSubscribers';

export const resolvers = {
  Query: {
    readFeedbacks,
    readNewsLetterSubscribers,
    readFoodItems,
  },

  Mutation: {
    createFeedback,
    createNewsLetterSubscriber,
    deleteNewsLetterSubscriber,
    sendEmailToNewsLetterSubscribers,
    createFood,
    deleteFoodItem,
  },
};
