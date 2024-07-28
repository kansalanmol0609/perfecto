//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {TableBooking, TableBooking_tableBookingStatus, User} from '@prisma/client';

type Result = Omit<TableBooking, 'userId'> & {user: User};

export const cancelTableBooking = withAuthentication({
  apiType: API_TYPE.ADMIN,
})(async (_parent: any, args: {id: string}, ctx: GraphQLContext): Promise<Result> => {
  const {id} = args;

  const tableBooking = await ctx.prisma.tableBooking.update({
    where: {
      id,
    },
    data: {
      tableBookingStatus: TableBooking_tableBookingStatus.CANCELLED,
    },
    include: {
      user: true, // Include the associated user data
    },
  });

  return tableBooking;
});
