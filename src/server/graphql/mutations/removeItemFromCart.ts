//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const removeItemFromCart = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, _args: {foodId: string}, ctx: GraphQLContext) => {
  const session = ctx.session;
  const {foodId} = _args;

  let previousCart = await ctx.prisma.cart.findUnique({
    where: {
      userId: session!.user!.id,
    },
  });

  if (!previousCart) {
    previousCart = await ctx.prisma.cart.create({
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

  const existingCartItem = await ctx.prisma.cartItem.findFirst({
    where: {
      foodId,
      cart: {
        is: {
          userId: session!.user!.id,
        },
      },
    },
  });

  if (existingCartItem) {
    // Case 1: Only one food item in the cart
    if (existingCartItem.count === 1) {
      await ctx.prisma.cartItem.delete({
        where: {
          foodId_cartId: {
            foodId: existingCartItem.foodId,
            cartId: previousCart.id,
          },
        },
      });
    } // Case 2: Multiple food items in the cart
    else {
      await ctx.prisma.cartItem.update({
        where: {
          foodId_cartId: {
            foodId: existingCartItem.foodId,
            cartId: previousCart.id,
          },
        },
        data: {
          count: {
            decrement: 1,
          },
        },
      });
    }
  }

  const nextCart = await ctx.prisma.cart.findUnique({
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

  return nextCart;
});
