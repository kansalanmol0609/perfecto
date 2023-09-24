//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {Order, OrderStatus} from '@prisma/client';

type PlaceOrderInput = {
  addressId: string;
  items: {
    foodId: string;
    count: number;
  }[];
};

export const placeOrder = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, args: PlaceOrderInput, ctx: GraphQLContext): Promise<Order> => {
  const {addressId, items} = args;
  const session = ctx.session;

  const [order] = await ctx.prisma.$transaction([
    ctx.prisma.order.create({
      data: {
        status: OrderStatus.PREPARING,
        user: {
          connect: {
            id: session!.user!.id,
          },
        },
        address: {
          connect: {
            id: addressId,
          },
        },
        items: {
          create: items.map((item) => ({
            food: {
              connect: {
                id: item.foodId,
              },
            },
            count: item.count,
          })),
        },
      },
      include: {
        address: true,
        items: {
          include: {
            food: true,
          },
        },
        rating: true,
      },
    }),
    ctx.prisma.cart.update({
      where: {
        userId: session!.user!.id,
      },
      data: {
        items: {
          deleteMany: {},
        },
      },
    }),
  ]);

  return order;
});
