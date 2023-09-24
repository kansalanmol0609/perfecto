//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const readFoodItems = withAuthentication({
  apiType: API_TYPE.PUBLIC,
})(async (_parent: any, _args: any, ctx: GraphQLContext) => {
  const foodItems = await ctx.prisma.food.findMany({
    where: {
      isDeleted: false,
    },
  });

  return foodItems;
});
