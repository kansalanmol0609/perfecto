//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {Order} from '@prisma/client';

export const readOrders = withAuthentication({
  apiType: API_TYPE.PUBLIC,
})(async (_parent: any, _args: any, ctx: GraphQLContext): Promise<Order[]> => {
  const orders = await ctx.prisma.order.findMany({
    include: {
      address: true,
      rating: true,
      items: {
        include: {
          food: true,
        },
      },
    },
  });

  return orders;
});
