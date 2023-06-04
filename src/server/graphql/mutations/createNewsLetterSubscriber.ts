//types
import {GraphQLContext} from '../context';

export const createNewsLetterSubscriber = async (
  _parent: any,
  args: {email: string},
  ctx: GraphQLContext,
) => {
  const {email} = args;

  const subscriber = await ctx.prisma.newsLetterSubscriber.create({
    data: {
      email,
    },
  });

  return subscriber;
};
