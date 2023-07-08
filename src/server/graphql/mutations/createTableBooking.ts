//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {TableBooking, TableBookingStatus, User} from '@prisma/client';

type CreateTableBookingInput = {
  numberOfPeople: number;
  date: string;
};

type Result = Omit<TableBooking, 'userId'> & {user: User};

export const createTableBooking = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(
  async (
    _parent: any,
    args: {createTableBookingInput: CreateTableBookingInput},
    ctx: GraphQLContext,
  ): Promise<Result> => {
    const {createTableBookingInput} = args;
    const session = ctx.session;

    const tableBooking = await ctx.prisma.tableBooking.create({
      data: {
        date: new Date(createTableBookingInput.date),
        numberOfPeople: createTableBookingInput.numberOfPeople,
        userId: session!.user!.id,
        tableBookingStatus: TableBookingStatus.WAITING_FOR_CONFIRMATION,
      },
      include: {
        user: true, // Include the associated user data
      },
    });

    return tableBooking;
  },
);
