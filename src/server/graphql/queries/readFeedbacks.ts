//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const readFeedbacks = withAuthentication({
  apiType: API_TYPE.ADMIN,
})(async (_parent: any, _args: any, ctx: GraphQLContext) => {
  const feedbacks = await ctx.prisma.feedback.findMany();

  return feedbacks;
});
