//libs
import {gql, useQuery} from '@apollo/client';

//types
import {Address, User as BaseUser, Order as BaseOrder, TableBooking, Rating} from '@prisma/client';

type User = BaseUser & {
  addresses: Address[];
  orders: Array<Omit<BaseOrder, 'ratingId'> & {rating: Rating | null}>;
  tableBookings: Array<Omit<TableBooking, 'userId'> & {user: User}>;
};

const FETCH_USER_DETAILS_QUERY = gql`
  query FetchUserDetails {
    fetchUserDetails {
      id
      name
      email
      emailVerified
      image
      createdAt
      updatedAt
      role
      addresses {
        id
        line1
        line2
        city
        state
        country
        pinCode
        createdAt
        updatedAt
      }
      orders {
        id
        status
        createdAt
        updatedAt
        userId
        address {
          id
          line1
          line2
          city
          state
          country
          pinCode
          createdAt
          updatedAt
        }
        rating {
          id
          rating
          comment
          createdAt
          updatedAt
        }
      }
      tableBookings {
        id
        date
        numberOfPeople
        createdAt
        updatedAt
        tableBookingStatus
        user {
          id
          name
          email
          emailVerified
          image
          createdAt
          updatedAt
          role
        }
      }
    }
  }
`;

export const useFetchUserDetails = () =>
  useQuery<{
    fetchUserDetails: User;
  }>(FETCH_USER_DETAILS_QUERY, {
    fetchPolicy: 'cache-first',
  });
