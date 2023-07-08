//decorators
import {API_TYPE, withAuthentication} from '@/server/decorators/withAuthentication';

//types
import {GraphQLContext} from '../context';
import {TableBookingStatus} from '@prisma/client';

enum BookingType {
  UPCOMING = 'UPCOMING',
  PENDING = 'PENDING',
  PAST = 'PAST',
  CANCELLED = 'CANCELLED',
}

export const fetchTableBookings = withAuthentication({
  apiType: API_TYPE.ADMIN,
})(async (_parent: any, {bookingType}: {bookingType: BookingType}, ctx: GraphQLContext) => {
  const currentDateTime = new Date();

  if (bookingType === BookingType.UPCOMING) {
    return await ctx.prisma.tableBooking.findMany({
      where: {
        tableBookingStatus: {
          equals: TableBookingStatus.CONFIRMED,
        },
        date: {
          gte: currentDateTime,
        },
      },
      include: {
        user: true, // Include the associated user data
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  if (bookingType === BookingType.PENDING) {
    return await ctx.prisma.tableBooking.findMany({
      where: {
        tableBookingStatus: {
          equals: TableBookingStatus.WAITING_FOR_CONFIRMATION,
        },
        date: {
          gte: currentDateTime,
        },
      },
      include: {
        user: true, // Include the associated user data
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  if (bookingType === BookingType.PAST) {
    return await ctx.prisma.tableBooking.findMany({
      where: {
        tableBookingStatus: {
          equals: TableBookingStatus.CONFIRMED,
        },
        date: {
          lt: currentDateTime,
        },
      },
      include: {
        user: true, // Include the associated user data
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  if (bookingType === BookingType.CANCELLED) {
    return await ctx.prisma.tableBooking.findMany({
      where: {
        tableBookingStatus: {
          equals: TableBookingStatus.CANCELLED,
        },
      },
      include: {
        user: true, // Include the associated user data
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  throw new Error('Invalid Request');
});
