//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {TableBooking, TableBookingStatus} from '@prisma/client';

type CreateTableBookingInput = {
  numberOfPeople: number;
  date: string;
};

export const createTableBooking = withAuthentication({
  apiType: API_TYPE.PRIVATE,
})(
  async (
    _parent: any,
    args: {createTableBookingInput: CreateTableBookingInput},
    ctx: GraphQLContext,
  ): Promise<TableBooking> => {
    const {createTableBookingInput} = args;
    const session = ctx.session;

    const tableBooking = await ctx.prisma.tableBooking.create({
      data: {
        date: new Date(createTableBookingInput.date),
        numberOfPeople: createTableBookingInput.numberOfPeople,
        userId: session!.user!.id,
        tableBookingStatus: TableBookingStatus.ACTIVE,
      },
    });

    return tableBooking;
  },
);
