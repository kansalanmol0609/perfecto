//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const fetchOrderDetails = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, args: {orderId: string}, ctx: GraphQLContext) => {
  const {orderId} = args;

  const orderDetails = await ctx.prisma.order.findUnique({
    where: {
      id: orderId,
    },
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

  return orderDetails;
});
