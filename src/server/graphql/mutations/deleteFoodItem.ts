//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const deleteFoodItem = withAuthentication({
  apiType: API_TYPE.ADMIN,
})(async (_parent: any, args: {foodItemId: string}, ctx: GraphQLContext) => {
  const {foodItemId} = args;

  const deletedFoodItem = await ctx.prisma.food.delete({
    where: {
      id: foodItemId,
    },
  });

  return deletedFoodItem;
});
