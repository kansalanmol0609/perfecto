//libs
import {gql, useMutation} from '@apollo/client';

//types
import {Address, Order} from '@prisma/client';

//hooks
import {useToast} from '@chakra-ui/react';

const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder($addressId: String!, $items: [OrderItemInput]!) {
    placeOrder(addressId: $addressId, items: $items) {
      id
      status
      createdAt
      updatedAt

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
        userId
      }
      rating {
        id
        rating
        comment
        createdAt
        updatedAt
      }
      items {
        food {
          id
          name
          description
          pictures
          isVeg
          inStock
          price {
            amount
            currency
            precision
          }
          category
          createdAt
          updatedAt
          userId
        }
        count
      }
    }
  }
`;

export const usePlaceOrder = () => {
  const toast = useToast();

  const [placeOrder, {loading}] = useMutation<
    {
      placeOrder: Order;
    },
    {
      addressId: string;
      items: {
        foodId: string;
        count: number;
      }[];
    }
  >(PLACE_ORDER_MUTATION, {
    onCompleted(data, clientOptions) {
      toast({
        title: 'Successful',
        description: 'Order Placed Successfully.',
        status: 'success',
      });
    },

    onError(error) {
      toast({
        title: 'Failed',
        description: 'Failed to place order!',
        status: 'error',
      });
    },
  });

  return {placeOrder, loading};
};
