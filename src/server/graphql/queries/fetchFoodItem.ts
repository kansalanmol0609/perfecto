//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const fetchFoodItem = withAuthentication({
  apiType: API_TYPE.PUBLIC,
})(async (_parent: any, _args: {foodItemId: string}, ctx: GraphQLContext) => {
  const foodItem = await ctx.prisma.food.findUnique({
    where: {
      id: _args.foodItemId,
    },
  });

  return foodItem;
});
