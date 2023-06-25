//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const readNewsLetterSubscribers = withAuthentication({
  apiType: API_TYPE.ADMIN,
})(async (_parent: any, _args: any, ctx: GraphQLContext) => {
  const newsLetterSubscribers = await ctx.prisma.newsLetterSubscriber.findMany();

  return newsLetterSubscribers;
});
