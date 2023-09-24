//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {Address, User as BaseUser, Order as BaseOrder, TableBooking, Rating} from '@prisma/client';

type User = BaseUser & {
  addresses: Address[];
  orders: Array<Omit<BaseOrder, 'ratingId'> & {rating: Rating | null}>;
  tableBookings: TableBooking[];
};

export const fetchUserDetails = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(async (_parent: any, _args: any, ctx: GraphQLContext): Promise<User | null> => {
  const session = ctx.session;

  //fetch user object from db
  let user = await ctx.prisma.user.findUnique({
    where: {
      id: session!.user!.id,
    },
    include: {
      addresses: true,
      orders: {
        include: {
          items: {
            include: {
              food: true,
            },
          },
          rating: true,
          address: true,
        },
      },
      tableBookings: {
        include: {
          user: true,
        },
      },
    },
  });

  return user;
});
