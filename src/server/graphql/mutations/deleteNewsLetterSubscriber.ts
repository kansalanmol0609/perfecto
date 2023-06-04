//types
import {GraphQLContext} from '../context';

export const deleteNewsLetterSubscriber = async (
  _parent: any,
  args: {email: string},
  ctx: GraphQLContext,
) => {
  const {email} = args;

  const deletedSubscriber = await ctx.prisma.newsLetterSubscriber.delete({
    where: {
      email,
    },
  });

  return deletedSubscriber;
};
