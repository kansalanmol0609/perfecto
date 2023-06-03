//types
import {GraphQLContext} from '../context';

export const readFeedbacks = async (_parent: any, _args: any, ctx: GraphQLContext) => {
  const feedbacks = await ctx.prisma.feedback.findMany();

  return feedbacks;
};
