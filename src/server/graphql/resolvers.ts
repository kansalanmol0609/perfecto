//queries
import {readFeedbacks} from './queries/readFeedbacks';
import {readNewsLetterSubscribers} from './queries/readNewsLetterSubscribers';
import {readFoodItems} from './queries/readFoodItems';
import {fetchFoodItem} from './queries/fetchFoodItem';

//mutations
import {createNewsLetterSubscriber} from './mutations/createNewsLetterSubscriber';
import {deleteNewsLetterSubscriber} from './mutations/deleteNewsLetterSubscriber';
import {createFeedback} from './mutations/createFeedback';
import {createFood} from './mutations/createFood';
import {deleteFoodItem} from './mutations/deleteFoodItem';
import {updateFoodItem} from './mutations/updateFoodItem';
import {sendEmailToNewsLetterSubscribers} from './mutations/sendEmailToNewsLetterSubscribers';

export const resolvers = {
  Query: {
    readFeedbacks,
    readNewsLetterSubscribers,
    readFoodItems,
    fetchFoodItem,
  },

  Mutation: {
    createFeedback,
    createNewsLetterSubscriber,
    deleteNewsLetterSubscriber,
    sendEmailToNewsLetterSubscribers,
    createFood,
    deleteFoodItem,
    updateFoodItem,
  },
};
