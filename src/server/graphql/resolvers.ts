//queries
import {readFeedbacks} from './queries/readFeedbacks';
import {readNewsLetterSubscribers} from './queries/readNewsLetterSubscribers';

//mutations
import {createNewsLetterSubscriber} from './mutations/createNewsLetterSubscriber';
import {deleteNewsLetterSubscriber} from './mutations/deleteNewsLetterSubscriber';
import {createFeedback} from './mutations/createFeedback';
import {sendEmailToNewsLetterSubscribers} from './mutations/sendEmailToNewsLetterSubscribers';

export const resolvers = {
  Query: {
    readFeedbacks,
    readNewsLetterSubscribers,
  },

  Mutation: {
    createFeedback,
    createNewsLetterSubscriber,
    deleteNewsLetterSubscriber,
    sendEmailToNewsLetterSubscribers,
  },
};
