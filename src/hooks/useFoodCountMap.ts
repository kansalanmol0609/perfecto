//libs
import {useMemo} from 'react';
import {ApolloError, gql, useQuery} from '@apollo/client';
import {useSession} from 'next-auth/react';

//types
import {Food, Cart, CartItem} from '@prisma/client';

const READ_CART_ITEMS = gql`
  query ReadCartItems {
    readCartItems {
      id
      items {
        food {
          id
        }
        count
      }
      userId
    }
  }
`;

const useFoodCountMap = (): {
  foodCountMap: Record<string, number> | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} => {
  const session = useSession();

  const {data, loading, error} = useQuery<{
    readCartItems: Cart & {items: Array<Omit<CartItem, 'foodId'> & {food: Food}>};
  }>(READ_CART_ITEMS, {
    skip: session.status !== 'authenticated',
    fetchPolicy: 'cache-first',
  });

  const foodCountMap = useMemo(
    () =>
      data?.readCartItems?.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.food.id]: item.count,
        }),
        {},
      ),
    [data?.readCartItems?.items],
  );

  return {foodCountMap, loading, error};
};

export {useFoodCountMap};
