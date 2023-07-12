//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';

export const addItemInCart = withAuthentication({
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
    // Case 1: Food item already present in the cart
    await ctx.prisma.cartItem.update({
      where: {
        foodId_cartId: {
          foodId: existingCartItem.foodId,
          cartId: previousCart.id,
        },
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  } // Case 2: Food item not present in the cart
  else {
    await ctx.prisma.cartItem.create({
      data: {
        food: {
          connect: {
            id: foodId,
          },
        },
        cart: {
          connect: {
            userId: session!.user!.id,
          },
        },
        count: 1,
      },
    });
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
