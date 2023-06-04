//types
import {GraphQLContext} from '../context';

export const readNewsLetterSubscribers = async (_parent: any, _args: any, ctx: GraphQLContext) => {
  const newsLetterSubscribers = await ctx.prisma.newsLetterSubscriber.findMany();

  return newsLetterSubscribers;
};
