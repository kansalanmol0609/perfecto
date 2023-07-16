//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {Cart} from '@/types/Cart';

export const readCartItems = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, _args: any, ctx: GraphQLContext): Promise<Cart> => {
  const session = ctx.session;

  let cart = await ctx.prisma.cart.findUnique({
    where: {
      userId: session!.user!.id,
    },
    include: {
      items: {
        include: {
          food: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await ctx.prisma.cart.create({
      data: {
        userId: session!.user!.id,
      },
      include: {
        items: {
          include: {
            food: true,
          },
        },
      },
    });
  }

  return cart;
});
