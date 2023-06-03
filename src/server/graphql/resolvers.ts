//queries
import {readFeedbacks} from './queries/readFeedbacks';

//mutations
import {createFeedback} from './mutations/createFeedback';

export const resolvers = {
  Query: {
    readFeedbacks,
  },
  Mutation: {
    createFeedback,
  },
};
